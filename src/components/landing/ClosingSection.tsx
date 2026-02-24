import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ClosingSection() {
  return (
    <section className="py-28 px-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cta-green/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-display font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Tu negocio no necesita más esfuerzo.
          <br />
          <span className="gradient-rainbow-text">Necesita sistema.</span>
        </motion.h2>

        <motion.p
          className="mt-6 text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Haz la prueba gratis ahora y descubre qué automatizar primero.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button
            size="lg"
            className="bg-cta-green hover:bg-cta-green/90 text-background font-display font-bold text-lg px-10 py-7 rounded-2xl shadow-[0_0_30px_hsl(var(--cta-green)/0.4)] hover:shadow-[0_0_50px_hsl(var(--cta-green)/0.6)] transition-all hover:scale-105"
            onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
          >
            👉 Generar mi plan en 30 segundos
          </Button>
          <span className="text-xs text-muted-foreground italic">
            Si el plan no te sirve, no pasa nada. No te pedimos datos.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
