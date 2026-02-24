import { motion } from "framer-motion";
import { Target, TrendingDown, BarChart3, ArrowRight } from "lucide-react";

const results = [
  { icon: Target, title: "Áreas críticas que puedes automatizar", color: "--rainbow-2" },
  { icon: TrendingDown, title: "Impacto potencial en tiempo y costos", color: "--rainbow-1" },
  { icon: BarChart3, title: "Nivel de prioridad de cada mejora", color: "--rainbow-5" },
  { icon: ArrowRight, title: "Siguiente paso claro", color: "--rainbow-4" },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-6 sm:px-8 relative">
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
          En 30 segundos <span className="gradient-rainbow-text">obtienes:</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-16 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Sin consultoría costosa. Sin reuniones. Sin compromiso.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((s, i) => (
            <motion.div
              key={s.title}
              className="glass-rainbow rounded-2xl p-6 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.4 }}
              >
                <s.icon
                  className="h-10 w-10"
                  style={{ color: `hsl(var(${s.color}))` }}
                />
              </motion.div>
              <h3
                className="text-lg font-display font-semibold"
                style={{ color: `hsl(var(${s.color}))` }}
              >
                {s.title}
              </h3>
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
