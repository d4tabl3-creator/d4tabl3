import { motion } from "framer-motion";
import { Zap, BarChart3, CheckCircle, TrendingUp, Clock, DollarSign, Users, Lock, Sparkles, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface BlueprintData {
  [key: string]: any;
}

interface Props {
  blueprintData: BlueprintData;
  onSubscribe: () => void;
  checkoutLoading: boolean;
  isExpired: boolean;
}

const simulatedAutomations = [
  { name: "Seguimiento automático de clientes", status: "Activo", saves: "3.5 hrs/semana", icon: Users },
  { name: "Facturación y cobranza recurrente", status: "Activo", saves: "5 hrs/semana", icon: DollarSign },
  { name: "Recordatorios de citas/entregas", status: "Activo", saves: "2 hrs/semana", icon: Clock },
];

const simulatedMetrics = [
  { label: "Tiempo ahorrado", value: "10.5 hrs", change: "+34%", color: "var(--rainbow-1)" },
  { label: "Tareas automatizadas", value: "24", change: "+12", color: "var(--rainbow-3)" },
  { label: "Eficiencia operativa", value: "87%", change: "+15%", color: "var(--rainbow-4)" },
  { label: "ROI estimado", value: "4.2x", change: "↑", color: "var(--rainbow-5)" },
];

export default function BlueprintPreview({ blueprintData, onSubscribe, checkoutLoading, isExpired }: Props) {
  const businessName = (blueprintData as any)?.business_name || (blueprintData as any)?.businessName || "Tu negocio";

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Overlay for expired preview */}
      {isExpired && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="max-w-md w-full rounded-2xl border border-primary/30 bg-card p-8 text-center space-y-6 shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="h-16 w-16 rounded-2xl gradient-rainbow flex items-center justify-center mx-auto">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold">¿Te gustó lo que viste?</h2>
            <p className="text-sm text-muted-foreground">
              Todo esto puede estar funcionando en <strong className="text-foreground">{businessName}</strong> hoy mismo. 
              Activa tu plataforma y ponemos manos a la obra.
            </p>
            <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-3">
              <p className="text-3xl font-display font-bold">
                $300 <span className="text-base text-muted-foreground font-normal">MXN/mes</span>
              </p>
              <ul className="text-sm text-left space-y-2">
                {[
                  "Todo lo que viste, personalizado para tu negocio",
                  "Automatizaciones funcionando en tiempo real",
                  "Métricas y KPIs actualizados automáticamente",
                  "Soporte dedicado de nuestro equipo",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" size="lg" onClick={onSubscribe} disabled={checkoutLoading}>
                {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CreditCard className="h-4 w-4 mr-2" />}
                Activar mi plataforma
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Cancela cuando quieras. Sin compromisos.</p>
          </motion.div>
        </motion.div>
      )}

      {/* Preview Header */}
      <motion.div
        className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 to-transparent p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Vista previa de tu Blueprint</span>
        </div>
        <h1 className="text-xl font-display font-bold">
          Así se verá la plataforma de <span className="gradient-rainbow-text">{businessName}</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Estos datos son simulados basados en tu diagnóstico. Al suscribirte, todo se configura con datos reales.
        </p>
      </motion.div>

      {/* Simulated Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {simulatedMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="rounded-xl border border-border bg-card/50 p-4 space-y-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{metric.label}</p>
            <p className="text-2xl font-display font-bold">{metric.value}</p>
            <p className="text-xs font-semibold text-primary">{metric.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Simulated Automations */}
      <motion.div
        className="rounded-2xl border border-border bg-card/50 p-6 space-y-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold">Automatizaciones recomendadas</h2>
        </div>
        <div className="space-y-3">
          {simulatedAutomations.map((auto, i) => (
            <motion.div
              key={auto.name}
              className="flex items-center justify-between rounded-xl border border-border bg-muted/10 px-4 py-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <auto.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{auto.name}</p>
                  <p className="text-xs text-muted-foreground">Ahorra {auto.saves}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                {auto.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Simulated Process Board */}
      <motion.div
        className="rounded-2xl border border-border bg-card/50 p-6 space-y-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold">Gestión de procesos</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: "Por hacer", count: 5, pct: 30 },
            { title: "En progreso", count: 3, pct: 55 },
            { title: "Completado", count: 8, pct: 100 },
          ].map((col) => (
            <div key={col.title} className="rounded-xl border border-border bg-muted/10 p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{col.title}</p>
              <p className="text-2xl font-display font-bold">{col.count}</p>
              <Progress value={col.pct} className="h-1.5" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA (visible during active preview) */}
      {!isExpired && (
        <motion.div
          className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground">
            ¿Listo para que esto funcione de verdad en tu negocio?
          </p>
          <Button onClick={onSubscribe} disabled={checkoutLoading} size="lg">
            {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CreditCard className="h-4 w-4 mr-2" />}
            Activar mi plataforma — $300 MXN/mes
          </Button>
        </motion.div>
      )}
    </div>
  );
}
