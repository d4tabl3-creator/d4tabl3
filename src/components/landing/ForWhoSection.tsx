import { motion } from "framer-motion";
import { Settings, Users, Table2, RefreshCw } from "lucide-react";

const items = [
  { icon: Settings, text: "Empresas con procesos manuales que ya no escalan." },
  { icon: Users, text: "Negocios que dependen de demasiadas personas para tareas repetitivas." },
  { icon: Table2, text: "Equipos que usan Excel, sistemas viejos o procesos improvisados." },
  { icon: RefreshCw, text: "Empresas que quieren modernizar sin rehacer todo desde cero." },
];

export default function ForWhoSection() {
  return (
    <section className="py-24 px-6 sm:px-8 relative">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-display font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Diseñado para negocios que ya facturan{" "}
          <span className="gradient-rainbow-text">y quieren optimizar</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Datable es para:
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
          Si tu negocio ya genera ingresos pero opera como hace 10 años, aquí empiezas.
        </motion.p>
      </div>
    </section>
  );
}
