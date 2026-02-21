import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

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
        className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight text-3d-letter cursor-pointer select-none"
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

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Colorful background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-destructive/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-accent/20 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-secondary/15 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Rainbow line accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 gradient-rainbow"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto" style={{ perspective: "1000px" }}>
        <Logo />

        <motion.h1
          className="mt-8 text-2xl md:text-4xl font-display font-semibold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          ¿Y si pudieras ver el futuro de tu negocio{" "}
          <span className="gradient-rainbow-text font-bold">en 30 segundos?</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Sube una foto de tu negocio y nuestra IA te dirá exactamente cómo mejorarlo.
          <span className="block mt-2 text-emerald font-semibold">100% gratis. Sin registro. Sin trucos.</span>
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="gradient-rainbow text-primary-foreground font-display font-bold text-lg px-10 py-7 rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-destructive/30 animate-pulse hover:animate-none hover:scale-105"
            onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Probar gratis ahora →
          </Button>
          <span className="text-xs text-muted-foreground">Sin tarjeta · Sin registro · 30 segundos</span>
        </motion.div>

        <motion.div
          className="mt-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="mx-auto h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
