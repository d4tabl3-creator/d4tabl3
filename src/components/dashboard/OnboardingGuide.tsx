import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Sparkles, Rocket, Star, PartyPopper, HandMetal } from "lucide-react";

interface Step {
  title: string;
  message: string;
  icon: React.ElementType;
  color: string;
  emoji: string;
}

const steps: Step[] = [
  {
    title: "¡Bienvenido a tu plataforma! 🎉",
    message: "Estás en el lugar correcto para hacer crecer tu negocio. Te vamos a guiar paso a paso — sin prisas, sin líos.",
    icon: PartyPopper,
    color: "var(--rainbow-3)",
    emoji: "🥳",
  },
  {
    title: "Tu Blueprint ya está listo",
    message: "Tu diagnóstico ya generó un plan personalizado para tu negocio. Aquí puedes ver tus métricas, automatizaciones y tareas en un solo lugar.",
    icon: Star,
    color: "var(--rainbow-5)",
    emoji: "⭐",
  },
  {
    title: "Explora la Bolsa de Trucos",
    message: "Encuentra módulos extra como Marketing, Facturación, Inventario y más. Activa solo lo que necesites — ¡tú decides!",
    icon: Sparkles,
    color: "var(--rainbow-6)",
    emoji: "✨",
  },
  {
    title: "¡Listo para despegar!",
    message: "Empieza explorando tus módulos. Si necesitas ayuda, usa el botón de SOS en la esquina. ¡Éxito!",
    icon: Rocket,
    color: "var(--rainbow-4)",
    emoji: "🚀",
  },
];

export default function OnboardingGuide() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem("dtb_onboarding_done");
    if (!seen) {
      // Small delay so UI loads first
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("dtb_onboarding_done", "1");
  };

  if (!show) return null;

  const current = steps[step];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={handleClose} />

        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md rounded-3xl border-2 bg-card p-8 shadow-2xl space-y-5 z-10"
          style={{ borderColor: `hsl(${current.color} / 0.4)` }}
        >
          {/* Close */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Step indicator */}
          <div className="flex gap-2 justify-center">
            {steps.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? '32px' : '8px',
                  backgroundColor: i <= step ? `hsl(${steps[i].color})` : 'hsl(var(--muted))',
                }}
              />
            ))}
          </div>

          {/* Icon */}
          <motion.div 
            className="mx-auto h-20 w-20 rounded-3xl flex items-center justify-center"
            style={{ backgroundColor: `hsl(${current.color} / 0.15)` }}
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, -3, 3, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-10 w-10" style={{ color: `hsl(${current.color})` }} />
          </motion.div>

          {/* Content */}
          <div className="text-center space-y-3">
            <h2 className="text-xl font-display font-bold">{current.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{current.message}</p>
          </div>

          {/* Action */}
          <div className="flex justify-center pt-2">
            <Button 
              onClick={handleNext}
              size="lg"
              className="rounded-xl font-semibold gap-2 px-8"
              style={{
                backgroundColor: `hsl(${current.color})`,
                color: 'white',
              }}
            >
              {step < steps.length - 1 ? (
                <>
                  Siguiente <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  ¡Vamos! <Rocket className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Paso {step + 1} de {steps.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
