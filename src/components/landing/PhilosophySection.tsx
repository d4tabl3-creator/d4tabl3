import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section className="py-24 px-6 sm:px-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          className="glass-rainbow rounded-3xl p-10 md:p-16 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-24 h-24 bg-destructive/15 rounded-full blur-[40px]" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/15 rounded-full blur-[40px]" />

          <p className="text-2xl md:text-3xl font-display font-semibold text-foreground leading-snug relative z-10">
            "Tu operación tiene potencial oculto.{" "}
            <span className="gradient-rainbow-text">Nosotros lo detectamos.</span>"
          </p>
          <p className="mt-6 text-muted-foreground relative z-10">
            Nuestro diagnóstico convierte una captura de tu proceso en una estrategia clara de optimización.
            Ya lo hicimos con más de 120 empresas.
          </p>
          <Button
            className="mt-8 bg-cta-green hover:bg-cta-green/90 text-background font-display font-bold rounded-2xl px-10 py-6 shadow-[0_0_30px_hsl(var(--cta-green)/0.4)] hover:shadow-[0_0_50px_hsl(var(--cta-green)/0.6)] transition-all hover:scale-105 relative z-10 text-lg"
            onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
          >
            Obtener mi diagnóstico gratis <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
