import { motion } from "framer-motion";
import { Plus, GripVertical, Clock, AlertTriangle, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

type Priority = "alta" | "media" | "baja";
type Status = "pendiente" | "en_progreso" | "completada";

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  progress: number;
}

const initialTasks: Task[] = [
  { id: "1", title: "Migrar base de datos de clientes", assignee: "Carlos M.", priority: "alta", status: "en_progreso", dueDate: "28 Feb", progress: 65 },
  { id: "2", title: "Configurar flujo de onboarding", assignee: "Ana G.", priority: "alta", status: "en_progreso", dueDate: "1 Mar", progress: 40 },
  { id: "3", title: "Diseñar plantilla de cotización", assignee: "Luis R.", priority: "media", status: "pendiente", dueDate: "5 Mar", progress: 0 },
  { id: "4", title: "Integrar pasarela de pagos", assignee: "Carlos M.", priority: "alta", status: "pendiente", dueDate: "3 Mar", progress: 0 },
  { id: "5", title: "Crear dashboard de ventas", assignee: "Ana G.", priority: "media", status: "pendiente", dueDate: "7 Mar", progress: 0 },
  { id: "6", title: "Automatizar reportes semanales", assignee: "Luis R.", priority: "baja", status: "completada", dueDate: "20 Feb", progress: 100 },
  { id: "7", title: "Setup email marketing", assignee: "Ana G.", priority: "media", status: "completada", dueDate: "18 Feb", progress: 100 },
];

const priorityConfig: Record<Priority, { color: string; label: string }> = {
  alta: { color: "text-destructive", label: "Alta" },
  media: { color: "text-accent", label: "Media" },
  baja: { color: "text-muted-foreground", label: "Baja" },
};

const statusConfig: Record<Status, { icon: React.ElementType; label: string }> = {
  pendiente: { icon: Circle, label: "Pendiente" },
  en_progreso: { icon: Clock, label: "En progreso" },
  completada: { icon: CheckCircle2, label: "Completada" },
};

const columns: { key: Status; label: string }[] = [
  { key: "pendiente", label: "Pendientes" },
  { key: "en_progreso", label: "En progreso" },
  { key: "completada", label: "Completadas" },
];

export default function ProcessSection() {
  const [tasks] = useState(initialTasks);

  const grouped = columns.map((col) => ({
    ...col,
    tasks: tasks.filter((t) => t.status === col.key),
  }));

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {grouped.map((col, i) => {
          const StatusIcon = statusConfig[col.key].icon;
          return (
            <motion.div
              key={col.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-4 text-center"
            >
              <StatusIcon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-display font-bold">{col.tasks.length}</p>
              <p className="text-[11px] text-muted-foreground">{col.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Kanban-style columns */}
      <div className="grid md:grid-cols-3 gap-4">
        {grouped.map((col) => (
          <div key={col.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm">{col.label}</h3>
              <Badge variant="secondary" className="text-[10px]">{col.tasks.length}</Badge>
            </div>
            {col.tasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-lg p-3 space-y-2 hover:border-primary/20 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-muted-foreground">{task.assignee}</span>
                      <span className={`text-[10px] font-medium ${priorityConfig[task.priority].color}`}>
                        {task.priority === "alta" && <AlertTriangle className="inline h-3 w-3 mr-0.5" />}
                        {priorityConfig[task.priority].label}
                      </span>
                    </div>
                  </div>
                </div>
                {task.status !== "completada" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>Progreso</span>
                      <span>{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-1.5" />
                  </div>
                )}
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{task.dueDate}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Agregar nueva tarea
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
