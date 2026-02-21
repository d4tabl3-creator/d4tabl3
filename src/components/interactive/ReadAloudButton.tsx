import { useState, useRef, useCallback } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_TEXTS = [
  "¡Hola! Bienvenido a Datable. Déjame contarte de qué va todo esto.",
  "¿Y si pudieras ver el futuro de tu negocio en 30 segundos?",
  "Sube una foto de tu negocio y nuestra inteligencia artificial te dirá exactamente cómo mejorarlo. 100% gratis. Sin registro. Sin trucos.",
  "Automatización Real. Eliminamos tareas repetitivas con flujos inteligentes.",
  "Impacto en el Mundo Real. Soluciones que se miden en resultados, no en promesas.",
  "Sistemas Inteligentes. Inteligencia artificial que entiende tu negocio y evoluciona contigo.",
  "Integración Total. Conectamos todas tus herramientas en un solo ecosistema.",
  "Tu negocio tiene potencial escondido. Nosotros lo encontramos.",
  "Para continuar, solo presiona el botón que dice Probar gratis ahora, o baja hasta la sección donde puedes subir tu foto.",
];

export default function ReadAloudButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggle = useCallback(async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    try {
      const text = PAGE_TEXTS.join(". ");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) throw new Error("TTS failed");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("TTS error:", err);
      // Fallback to browser speech synthesis
      const text = PAGE_TEXTS.join(". ");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-MX";
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith("es"));
      if (spanishVoice) utterance.voice = spanishVoice;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying]);

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
