import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          className="glass rounded-3xl p-10 md:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl font-display font-semibold text-foreground leading-snug">
            "Sabemos lo que hacemos, pero nos encanta{" "}
            <span className="gradient-rainbow-text">divertirnos</span> haciéndolo."
          </p>
          <p className="mt-6 text-muted-foreground">
            En dªtªblɛ combinamos expertise técnico con creatividad radical. Tu negocio merece
            soluciones que funcionen y que inspiren.
          </p>
          <Button
            className="mt-8 gradient-rainbow text-primary-foreground font-display font-semibold rounded-xl px-8 py-5 hover:opacity-90 transition-opacity"
            onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
          >
            Descubre tu potencial <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
