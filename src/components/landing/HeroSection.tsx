import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

const Logo = () => (
  <span className="text-5xl md:text-7xl font-display font-bold tracking-tight">
    <span className="text-[hsl(var(--rainbow-1))]">d</span>
    <span className="text-[hsl(var(--rainbow-2))]">ª</span>
    <span className="text-[hsl(var(--rainbow-3))]">t</span>
    <span className="text-[hsl(var(--rainbow-4))]">ª</span>
    <span className="text-[hsl(var(--rainbow-5))]">b</span>
    <span className="text-[hsl(var(--rainbow-6))]">l</span>
    <span className="text-[hsl(var(--rainbow-1))]">ɛ</span>
  </span>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(270_60%_15%/0.4),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(155_70%_20%/0.15),transparent_60%)]" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Logo />
        </motion.div>

        <motion.h1
          className="mt-8 text-2xl md:text-4xl font-display font-semibold text-foreground text-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Del prototipo a la plataforma.{" "}
          <span className="gradient-rainbow-text">Sin caos.</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Digitalizamos y automatizamos tu negocio. Sube una imagen de tu empresa y
          descubre cómo transformarla con inteligencia artificial.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="gradient-rainbow text-primary-foreground font-display font-semibold text-lg px-8 py-6 rounded-xl hover:opacity-90 transition-opacity"
            onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Solicitar Demo Express
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/60 text-foreground font-display text-lg px-8 py-6 rounded-xl hover:bg-card/50"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Cuéntanos tu historia
          </Button>
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
