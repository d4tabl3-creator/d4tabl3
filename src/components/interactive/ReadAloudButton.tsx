import { useState, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_TEXTS = [
  "¿Y si pudieras ver el futuro de tu negocio en 30 segundos?",
  "Sube una foto de tu negocio y nuestra inteligencia artificial te dirá exactamente cómo mejorarlo. 100% gratis. Sin registro. Sin trucos.",
  "Automatización Real. Eliminamos tareas repetitivas con flujos inteligentes.",
  "Impacto en el Mundo Real. Soluciones que se miden en resultados, no en promesas.",
  "Sistemas Inteligentes. Inteligencia artificial que entiende tu negocio y evoluciona contigo.",
  "Integración Total. Conectamos todas tus herramientas en un solo ecosistema.",
  "Tu negocio tiene potencial escondido. Nosotros lo encontramos.",
  "Sube una foto de tu negocio para recibir un diagnóstico gratuito con inteligencia artificial.",
  "Para continuar, solo presiona el botón que dice Probar gratis ahora, o baja hasta la sección donde puedes subir tu foto.",
];

export default function ReadAloudButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleToggle = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const text = PAGE_TEXTS.join(". ");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-MX";
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance;

    // Try to pick a Spanish voice
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith("es"));
    if (spanishVoice) utterance.voice = spanishVoice;

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [isPlaying]);

  // Check if speech synthesis is supported
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
      aria-label={isPlaying ? "Detener lectura" : "Leer página en voz alta"}
      title={isPlaying ? "Detener lectura" : "🔊 Escuchar esta página"}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div key="stop" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <VolumeX className="w-6 h-6 text-destructive" />
          </motion.div>
        ) : (
          <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Volume2 className="w-6 h-6 text-primary" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      {!isPlaying && (
        <motion.span
          className="absolute right-16 bg-card/90 backdrop-blur-md text-foreground text-xs px-3 py-2 rounded-xl border border-border/50 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          🔊 Escuchar esta página
        </motion.span>
      )}

      {/* Pulsing ring when playing */}
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
