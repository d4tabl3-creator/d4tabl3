import { motion } from "framer-motion";
import { CheckCircle2, Circle, Trophy, Zap, BarChart3, FileText, MessageSquare, Star, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ChecklistItem {
  id: string;
  label: string;
  icon: React.ElementType;
  done: boolean;
  color: string;
  emoji: string;
}

interface Props {
  hasBlueprintCode: boolean;
  hasAutomations: boolean;
  hasMetrics: boolean;
  hasProcesses: boolean;
}

export default function GamifiedChecklist({ hasBlueprintCode, hasAutomations, hasMetrics, hasProcesses }: Props) {
  const items: ChecklistItem[] = [
    { id: "code", label: "Ingresa tu código Blueprint", icon: FileText, done: hasBlueprintCode, color: "var(--rainbow-1)", emoji: "📋" },
    { id: "auto", label: "Explora Automatizaciones", icon: Zap, done: hasAutomations, color: "var(--rainbow-3)", emoji: "⚡" },
    { id: "metrics", label: "Revisa tus Métricas", icon: BarChart3, done: hasMetrics, color: "var(--rainbow-5)", emoji: "📊" },
    { id: "processes", label: "Organiza tus Procesos", icon: MessageSquare, done: hasProcesses, color: "var(--rainbow-6)", emoji: "✅" },
  ];

  const completed = items.filter(i => i.done).length;
  const pct = (completed / items.length) * 100;

  const levelLabels = ["🌱 Novato", "🔍 Explorador", "🧠 Estratega", "🤖 Automatizador", "🏆 Master"];
  const level = Math.min(completed, levelLabels.length - 1);

  return (
    <motion.div
      className="rounded-3xl border-2 border-border bg-card/50 p-6 space-y-5 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Rainbow top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-rainbow" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            className="h-12 w-12 rounded-2xl gradient-rainbow flex items-center justify-center"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </motion.div>
          <div>
            <h3 className="font-display font-bold text-base">Tu progreso</h3>
            <p className="text-xs text-muted-foreground">Nivel: <span className="gradient-rainbow-text font-bold">{levelLabels[level]}</span></p>
          </div>
        </div>
        <motion.span 
          className="text-3xl font-display font-bold gradient-rainbow-text"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Math.round(pct)}%
        </motion.span>
      </div>

      <div className="relative">
        <Progress value={pct} className="h-4 rounded-full" />
        {/* Progress emoji indicator */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 text-lg"
          style={{ left: `calc(${Math.max(pct, 5)}% - 12px)` }}
          animate={{ y: [-2, -8, -2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {pct === 100 ? "🏆" : "🚀"}
        </motion.div>
      </div>

      <div className="grid gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 border-2 transition-all ${
              item.done
                ? "bg-card/80"
                : "border-border bg-card/30"
            }`}
            style={{
              borderColor: item.done ? `hsl(${item.color} / 0.4)` : undefined,
              backgroundColor: item.done ? `hsl(${item.color} / 0.05)` : undefined,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            whileHover={{ x: 4 }}
          >
            <span className="text-xl">{item.emoji}</span>
            {item.done ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: `hsl(${item.color})` }} />
              </motion.div>
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
            )}
            <span className={`text-sm flex-1 ${item.done ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              {item.label}
            </span>
            {item.done && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring" }}
              >
                <Star className="h-5 w-5" style={{ color: `hsl(${item.color})`, fill: `hsl(${item.color})` }} />
              </motion.div>
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
          <p className="text-base font-display font-bold gradient-rainbow-text">
            🎉 ¡Completaste todos los pasos! Estás listo para escalar. 🚀
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
