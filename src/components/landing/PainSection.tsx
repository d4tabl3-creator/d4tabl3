import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const pains = [
  "Pierdes ventas por no responder a tiempo.",
  "Olvidas seguimientos.",
  "Trabajas más horas sin ganar más dinero.",
  "Tu negocio depende solo de ti.",
];

export default function PainSection() {
  return (
    <section className="py-24 px-6 sm:px-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 via-transparent to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-display font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Si no automatizas, <span className="text-destructive">esto pasa:</span>
        </motion.h2>

        <div className="mt-12 grid gap-4 max-w-xl mx-auto text-left">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
              <span className="text-foreground text-base md:text-lg">{pain}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-10 text-xl font-display font-bold text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Automatizar no es lujo.{" "}
          <span className="gradient-rainbow-text">Es supervivencia.</span>
        </motion.p>
      </div>
    </section>
  );
}
