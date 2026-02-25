import { motion } from "framer-motion";
import { Zap, Play, Pause, Clock, CheckCircle, ArrowRight, Mail, FileText, DollarSign, Users, MessageSquare, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface Automation {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  active: boolean;
  runs: number;
  lastRun: string;
}

const initialAutomations: Automation[] = [
  {
    id: "1",
    name: "Seguimiento de prospectos",
    description: "Envía emails automáticos a nuevos leads 24h después del primer contacto",
    icon: Mail,
    category: "Ventas",
    active: true,
    runs: 142,
    lastRun: "Hace 2 horas",
  },
  {
    id: "2",
    name: "Generación de cotizaciones",
    description: "Crea cotizaciones PDF a partir de datos del CRM y las envía al cliente",
    icon: FileText,
    category: "Cotización",
    active: true,
    runs: 87,
    lastRun: "Hace 5 horas",
  },
  {
    id: "3",
    name: "Recordatorio de cobranza",
    description: "Notifica a clientes con facturas vencidas por email y WhatsApp",
    icon: DollarSign,
    category: "Cobranza",
    active: false,
    runs: 56,
    lastRun: "Hace 1 día",
  },
  {
    id: "4",
    name: "Onboarding de clientes",
    description: "Secuencia de bienvenida: accesos, documentos y primer meeting agendado",
    icon: Users,
    category: "Operaciones",
    active: true,
    runs: 34,
    lastRun: "Hace 8 horas",
  },
  {
    id: "5",
    name: "Reporte semanal",
    description: "Genera y envía un resumen de KPIs cada lunes a las 8am",
    icon: CalendarDays,
    category: "Reportes",
    active: true,
    runs: 23,
    lastRun: "Hace 3 días",
  },
  {
    id: "6",
    name: "Encuesta de satisfacción",
    description: "Envía NPS survey 7 días después de cerrar un proyecto",
    icon: MessageSquare,
    category: "Feedback",
    active: false,
    runs: 19,
    lastRun: "Hace 5 días",
  },
];

export default function AutomationsSection() {
  const [automations, setAutomations] = useState(initialAutomations);

  const toggle = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const activeCount = automations.filter((a) => a.active).length;
  const totalRuns = automations.reduce((sum, a) => sum + a.runs, 0);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Activas", value: activeCount, icon: Play, color: "text-primary" },
          { label: "Ejecuciones totales", value: totalRuns, icon: CheckCircle, color: "text-accent" },
          { label: "Pausadas", value: automations.length - activeCount, icon: Pause, color: "text-muted-foreground" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4 flex items-center gap-4"
          >
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Automation list */}
      <div className="space-y-3">
        {automations.map((auto, i) => (
          <motion.div
            key={auto.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass rounded-xl p-4 flex items-center gap-4 transition-colors ${
              auto.active ? "border-primary/20" : "opacity-60"
            }`}
          >
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <auto.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-display font-semibold text-sm truncate">{auto.name}</h4>
                <Badge variant="secondary" className="text-[10px] shrink-0">{auto.category}</Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{auto.description}</p>
              <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" />{auto.runs} ejecuciones</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{auto.lastRun}</span>
              </div>
            </div>
            <Switch checked={auto.active} onCheckedChange={() => toggle(auto.id)} />
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        <Zap className="h-4 w-4 mr-2" />
        Crear nueva automatización
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
