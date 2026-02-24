import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle2 } from "lucide-react";

const letters = [
  { char: "d", color: "--rainbow-1" },
  { char: "ª", color: "--rainbow-2" },
  { char: "t", color: "--rainbow-3" },
  { char: "ª", color: "--rainbow-4" },
  { char: "b", color: "--rainbow-5" },
  { char: "l", color: "--rainbow-6" },
  { char: "ɛ", color: "--rainbow-1" },
];

const Logo = () => (
  <div className="flex items-center justify-center gap-1">
    {letters.map((l, i) => (
      <motion.span
        key={i}
        className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight text-3d-letter cursor-pointer select-none"
        style={{
          color: `hsl(var(${l.color}))`,
          textShadow: `
            0 2px 0 hsl(var(${l.color}) / 0.6),
            0 4px 0 hsl(var(${l.color}) / 0.4),
            0 6px 0 hsl(var(${l.color}) / 0.2),
            0 8px 15px rgba(0,0,0,0.4),
            0 0 30px hsl(var(${l.color}) / 0.3)
          `,
        }}
        initial={{ opacity: 0, y: 60, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          delay: 0.15 * i,
          duration: 0.7,
          type: "spring",
          stiffness: 120,
        }}
        whileHover={{
          y: -12,
          scale: 1.25,
          rotateZ: [-5, 5, 0],
          transition: { duration: 0.3 },
        }}
      >
        {l.char}
      </motion.span>
    ))}
  </div>
);

const benefits = [
  "Detecta ineficiencias ocultas",
  "Reduce costos operativos",
  "Mejora tiempos de respuesta y seguimiento",
  "Escala sin aumentar nómina",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 sm:px-8">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-accent/15 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
      </div>

      <motion.div
        className="absolute top-0 left-0 right-0 h-1 gradient-rainbow"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto" style={{ perspective: "1000px" }}>
        <Logo />

        <motion.h1
          className="mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Descubre dónde tu negocio está perdiendo dinero —{" "}
          <span className="gradient-rainbow-text">y qué automatizar para escalar sin contratar más personal.</span>
        </motion.h1>

        <motion.p
          className="mt-5 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Sube una captura de tu operación actual (sistema, Excel, software, agenda o proceso interno) y recibe un diagnóstico claro con <span className="font-semibold text-foreground">oportunidades reales de automatización.</span>
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col items-start sm:items-center gap-2 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-5 w-5 text-cta-green flex-shrink-0" />
              <span className="text-sm md:text-lg">{b}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="mt-6 text-xs sm:text-sm font-semibold text-cta-green px-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          100% gratuito · Sin registro · Diagnóstico en 30 segundos
        </motion.p>

        <motion.p
          className="mt-4 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65, duration: 0.5 }}
        >
          Más de 120 empresas ya optimizaron su operación.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-cta-green hover:bg-cta-green/90 text-background font-display font-bold text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 rounded-2xl shadow-[0_0_30px_hsl(var(--cta-green)/0.4)] hover:shadow-[0_0_50px_hsl(var(--cta-green)/0.6)] transition-all hover:scale-105 w-full sm:w-auto"
            onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
          >
            👉 Obtener diagnóstico ahora
          </Button>
          <span className="text-xs text-muted-foreground italic">
            Sin consultoría costosa. Sin reuniones. Sin compromiso.
          </span>
        </motion.div>

        <motion.div
          className="mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="mx-auto h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
