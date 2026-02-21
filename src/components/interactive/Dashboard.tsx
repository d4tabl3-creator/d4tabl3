import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Trophy, Star, Zap, Target } from "lucide-react";
import type { AnalysisResult } from "./ImageUpload";

interface Props {
  result: AnalysisResult;
  chatStarted: boolean;
}

const badges = [
  { icon: Star, label: "Imagen cargada", earned: true },
  { icon: Zap, label: "Análisis completado", earned: true },
  { icon: Target, label: "Chat iniciado", earned: false },
  { icon: Trophy, label: "Plan generado", earned: false },
];

export default function Dashboard({ result, chatStarted }: Props) {
  const steps = [
    { name: "Carga", done: true },
    { name: "Análisis", done: true },
    { name: "Chat", done: chatStarted },
    { name: "Plan", done: false },
  ];
  const completedSteps = steps.filter((s) => s.done).length;
  const progressPct = (completedSteps / steps.length) * 100;

  const chartData = result.recommendations.map((r, i) => ({
    name: `R${i + 1}`,
    impacto: Math.floor(60 + Math.random() * 40),
  }));

  const colors = [
    "hsl(0, 85%, 60%)",
    "hsl(30, 90%, 55%)",
    "hsl(55, 85%, 55%)",
    "hsl(155, 70%, 45%)",
    "hsl(210, 80%, 55%)",
    "hsl(270, 60%, 55%)",
  ];

  const updatedBadges = badges.map((b) =>
    b.label === "Chat iniciado" ? { ...b, earned: chatStarted } : b
  );

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.h2
          className="text-3xl font-display font-bold text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Tu <span className="gradient-rainbow-text">Automation Blueprint</span>
        </motion.h2>

        {/* Progress bar */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between text-sm text-muted-foreground mb-3">
            <span>Progreso de tu Blueprint</span>
            <span>{Math.round(progressPct)}%</span>
          </div>
          <Progress value={progressPct} className="h-3" />
          <div className="flex justify-between mt-4">
            {steps.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-1">
                <div className={`h-3 w-3 rounded-full ${s.done ? "bg-primary" : "bg-muted"}`} />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <div className="flex flex-wrap gap-4 justify-center">
          {updatedBadges.map((b, i) => (
            <motion.div
              key={b.label}
              className={`glass rounded-xl p-4 flex flex-col items-center gap-2 w-28 ${
                b.earned ? "border-primary/40" : "opacity-40"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: b.earned ? 1 : 0.4, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <b.icon className={`h-6 w-6 ${b.earned ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs text-center text-muted-foreground">{b.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-semibold mb-4">Impacto estimado por recomendación</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fill: "hsl(260, 10%, 55%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(260, 10%, 55%)", fontSize: 12 }} />
                <Bar dataKey="impacto" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
