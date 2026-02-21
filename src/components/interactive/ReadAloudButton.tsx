import { useState, useRef, useCallback, useEffect } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_TEXTS = [
  "¡Holaaa! ¡Bienvenido a Datable! Qué gusto tenerte por aquí. Déjame contarte de qué va todo esto.",
  "¿Y si pudieras ver el futuro de tu negocio... en solo 30 segundos? Suena loco, ¿verdad? Pero es real.",
  "Sube una foto de tu negocio, y nuestra inteligencia artificial te dice exactamente cómo mejorarlo. ¡Gratis! Sin registro. Sin trucos. ¡Así de fácil!",
  "Tenemos Automatización Real: eliminamos esas tareas repetitivas que te quitan el tiempo, con flujos inteligentes.",
  "Impacto en el Mundo Real: soluciones que se miden en resultados, ¡no en promesas vacías!",
  "Sistemas Inteligentes que entienden tu negocio y evolucionan contigo. ¡Como un socio que nunca duerme!",
  "Y la mejor parte: Integración Total. Conectamos todas tus herramientas en un solo ecosistema.",
  "Tu negocio tiene potencial escondido. ¡Y nosotros lo encontramos!",
  "Para empezar, solo presiona el botón que dice Probar gratis ahora, o baja hasta donde puedes subir tu foto. ¡Te va a encantar!",
];

export default function ReadAloudButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Preload voices
  useEffect(() => {
    window.speechSynthesis?.getVoices();
  }, []);

  const handleToggle = useCallback(async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    try {
      // Try ElevenLabs first
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: PAGE_TEXTS.join(" ") }),
        }
      );

      if (!response.ok) throw new Error("TTS API unavailable");

      const audioBlob = await response.blob();
      if (audioBlob.type.includes("json")) throw new Error("TTS error response");

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      await audio.play();
      setIsPlaying(true);
    } catch {
      // Fallback: browser speech with warm, expressive settings
      const text = PAGE_TEXTS.join(" ");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-MX";
      utterance.rate = 1.05;
      utterance.pitch = 1.3;
      utterance.volume = 1;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      utteranceRef.current = utterance;

      const voices = window.speechSynthesis.getVoices();
      // Prefer a female Mexican voice for warmth
      const preferred = voices.find(v => v.lang === "es-MX" && v.name.toLowerCase().includes("female")) 
        || voices.find(v => v.lang === "es-MX")
        || voices.find(v => v.lang.startsWith("es") && v.name.toLowerCase().includes("female"))
        || voices.find(v => v.lang.startsWith("es"));
      if (preferred) utterance.voice = preferred;

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying]);

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }

  return (
    <motion.button
      onClick={handleToggle}
      disabled={isLoading}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
      aria-label={isPlaying ? "Detener lectura" : "Leer página en voz alta"}
      title={isPlaying ? "Detener lectura" : "🔊 Escuchar esta página"}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loading" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </motion.div>
        ) : isPlaying ? (
          <motion.div key="stop" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <VolumeX className="w-6 h-6 text-destructive" />
          </motion.div>
        ) : (
          <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Volume2 className="w-6 h-6 text-primary" />
          </motion.div>
        )}
      </AnimatePresence>

      {!isPlaying && !isLoading && (
        <motion.span
          className="absolute right-16 bg-card/90 backdrop-blur-md text-foreground text-xs px-3 py-2 rounded-xl border border-border/50 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          🔊 Escuchar esta página
        </motion.span>
      )}

      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
    </motion.button>
  );
}
