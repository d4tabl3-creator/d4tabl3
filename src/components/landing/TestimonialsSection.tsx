import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Juan Pérez",
    role: "Dueño de Maki Sushi Restaurant",
    text: "Datable me ayudó a digitalizar mi negocio por completo. Ahora todo fluye en una sola plataforma: pedidos, inventario y nómina. He dejado de necesitar personal extra para tareas administrativas.",
    stars: 5,
  },
  {
    name: "María González",
    role: "Directora de Clínica Dental Sonríe",
    text: "Antes llevábamos las citas en papel y perdíamos pacientes por errores. Con la automatización que nos implementaron, las cancelaciones bajaron un 40% y la experiencia del paciente mejoró muchísimo.",
    stars: 5,
  },
  {
    name: "Carlos Mendoza",
    role: "Fundador de Logística Express MX",
    text: "Teníamos 5 sistemas diferentes que no se hablaban entre sí. Datable los integró todos en uno. Ahora veo el estado de cada envío en tiempo real desde mi celular.",
    stars: 5,
  },
  {
    name: "Ana Lucía Ramírez",
    role: "CEO de Boutique Flores & Co.",
    text: "No sabía nada de tecnología y tenía miedo de dar el paso. El equipo de Datable me guió en cada etapa. Hoy mi tienda en línea genera el 60% de mis ventas totales.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--rainbow-6)/0.08)] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Lo que dicen nuestros{" "}
            <span className="gradient-rainbow-text">clientes</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Negocios reales que transformaron su operación con nuestra ayuda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 relative group hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/15 group-hover:text-primary/25 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-[hsl(var(--rainbow-3))] text-[hsl(var(--rainbow-3))]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/90 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-rainbow flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
