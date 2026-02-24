import { motion } from "framer-motion";

const services = [
  { emoji: "⚡", title: "Automatización Real", desc: "Eliminamos tareas repetitivas con flujos inteligentes que se adaptan a tu operación.", color: "--rainbow-2" },
  { emoji: "🚀", title: "Impacto en el Mundo Real", desc: "Soluciones que se miden en resultados, no en promesas. ROI desde el día uno.", color: "--rainbow-1" },
  { emoji: "🧠", title: "Sistemas Inteligentes", desc: "IA que entiende tu negocio y evoluciona contigo. Sin configuraciones eternas.", color: "--rainbow-5" },
  { emoji: "🔗", title: "Integración Total", desc: "Conectamos todas tus herramientas en un solo ecosistema fluido y potente.", color: "--rainbow-4" },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-6 sm:px-8 relative">
      {/* Background color blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-display font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ¿Qué hacemos por <span className="gradient-rainbow-text">tu negocio</span>?
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-16 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Automatizamos lo aburrido para que tú te enfoques en crecer.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="glass-rainbow rounded-2xl p-6 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <motion.span
                className="text-5xl block mb-4"
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {s.emoji}
              </motion.span>
              <h3
                className="text-lg font-display font-semibold mb-2"
                style={{ color: `hsl(var(${s.color}))` }}
              >
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div
                className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `hsl(var(${s.color}))` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
