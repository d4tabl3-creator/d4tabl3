import { motion } from "framer-motion";
import { CheckCircle2, Circle, Trophy, Zap, BarChart3, FileText, MessageSquare, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ChecklistItem {
  id: string;
  label: string;
  icon: React.ElementType;
  done: boolean;
  color: string;
}

interface Props {
  hasBlueprintCode: boolean;
  hasAutomations: boolean;
  hasMetrics: boolean;
  hasProcesses: boolean;
}

export default function GamifiedChecklist({ hasBlueprintCode, hasAutomations, hasMetrics, hasProcesses }: Props) {
  const items: ChecklistItem[] = [
    { id: "code", label: "Ingresa tu código Blueprint", icon: FileText, done: hasBlueprintCode, color: "var(--rainbow-1)" },
    { id: "auto", label: "Explora Automatizaciones", icon: Zap, done: hasAutomations, color: "var(--rainbow-3)" },
    { id: "metrics", label: "Revisa tus Métricas", icon: BarChart3, done: hasMetrics, color: "var(--rainbow-4)" },
    { id: "processes", label: "Organiza tus Procesos", icon: MessageSquare, done: hasProcesses, color: "var(--rainbow-5)" },
  ];

  const completed = items.filter(i => i.done).length;
  const pct = (completed / items.length) * 100;

  const levelLabels = ["Novato", "Explorador", "Estratega", "Automatizador", "🏆 Master"];
  const level = Math.min(completed, levelLabels.length - 1);

  return (
    <motion.div
      className="rounded-2xl border border-border bg-card/50 p-6 space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-rainbow flex items-center justify-center">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm">Tu progreso</h3>
            <p className="text-xs text-muted-foreground">Nivel: <span className="gradient-rainbow-text font-semibold">{levelLabels[level]}</span></p>
          </div>
        </div>
        <span className="text-2xl font-display font-bold gradient-rainbow-text">{Math.round(pct)}%</span>
      </div>

      <Progress value={pct} className="h-3" />

      <div className="grid gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-all ${
              item.done
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-card/30"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            {item.done ? (
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
            <item.icon className="h-4 w-4 shrink-0" style={{ color: `hsl(${item.color})` }} />
            <span className={`text-sm ${item.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              {item.label}
            </span>
            {item.done && (
              <Star className="h-4 w-4 ml-auto" style={{ color: `hsl(${item.color})` }} />
            )}
          </motion.div>
        ))}
      </div>

      {completed === items.length && (
        <motion.div
          className="text-center py-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm font-display font-bold gradient-rainbow-text">
            🎉 ¡Completaste todos los pasos! Estás listo para escalar.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
