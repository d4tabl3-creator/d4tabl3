import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--rainbow-6)/0.05)] to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          className="glass-rainbow rounded-3xl p-10 md:p-16 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Corner color accents */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-[hsl(var(--rainbow-1)/0.15)] rounded-full blur-[40px]" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-[hsl(var(--rainbow-5)/0.15)] rounded-full blur-[40px]" />

          <p className="text-2xl md:text-3xl font-display font-semibold text-foreground leading-snug relative z-10">
            "Sabemos lo que hacemos, pero nos encanta{" "}
            <span className="gradient-rainbow-text">divertirnos</span> haciéndolo."
          </p>
          <p className="mt-6 text-muted-foreground relative z-10">
            En dªtªblɛ combinamos expertise técnico con creatividad radical. Tu negocio merece
            soluciones que funcionen y que inspiren.
          </p>
          <Button
            className="mt-8 gradient-rainbow text-primary-foreground font-display font-semibold rounded-xl px-8 py-5 hover:opacity-90 transition-opacity shadow-lg shadow-[hsl(var(--rainbow-4)/0.3)] relative z-10"
            onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
          >
            Descubre tu potencial <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
