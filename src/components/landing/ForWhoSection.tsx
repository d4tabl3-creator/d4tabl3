import { motion } from "framer-motion";
import { MessageSquare, Repeat, User, TrendingUp } from "lucide-react";

const items = [
  { icon: MessageSquare, text: "Venden por WhatsApp o Instagram y sienten caos." },
  { icon: Repeat, text: "Repiten las mismas respuestas todos los días." },
  { icon: User, text: "No tienen sistema y todo depende de ellos." },
  { icon: TrendingUp, text: "Quieren crecer sin contratar más personal." },
];

export default function ForWhoSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-display font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ¿Para quién es <span className="gradient-rainbow-text">esto</span>?
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Datable es para dueños de negocio que:
        </motion.p>

        <div className="grid gap-5 max-w-xl mx-auto text-left">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="glass-rainbow rounded-xl p-5 flex items-center gap-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <item.icon className="h-6 w-6 text-cta-green flex-shrink-0" />
              <span className="text-foreground text-base md:text-lg">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-10 text-lg font-display font-semibold text-cta-green"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Si ese eres tú, esto te sirve.
        </motion.p>
      </div>
    </section>
  );
}
