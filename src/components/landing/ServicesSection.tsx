import { motion } from "framer-motion";

const services = [
  { emoji: "⚡", title: "Automatización Real", desc: "Eliminamos tareas repetitivas con flujos inteligentes que se adaptan a tu operación." },
  { emoji: "🚀", title: "Impacto en el Mundo Real", desc: "Soluciones que se miden en resultados, no en promesas. ROI desde el día uno." },
  { emoji: "🧠", title: "Sistemas Inteligentes", desc: "IA que entiende tu negocio y evoluciona contigo. Sin configuraciones eternas." },
  { emoji: "🔗", title: "Integración Total", desc: "Conectamos todas tus herramientas en un solo ecosistema fluido y potente." },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Habilidades & <span className="gradient-rainbow-text">Magia</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-16 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Lo que hacemos, hecho simple.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform inline-block">{s.emoji}</span>
              <h3 className="text-lg font-display font-semibold mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
