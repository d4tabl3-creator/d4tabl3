import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LineChart, Line, Tooltip, AreaChart, Area } from "recharts";

const revenueData = [
  { mes: "Sep", valor: 42000 },
  { mes: "Oct", valor: 51000 },
  { mes: "Nov", valor: 48000 },
  { mes: "Dic", valor: 63000 },
  { mes: "Ene", valor: 58000 },
  { mes: "Feb", valor: 72000 },
];

const conversionData = [
  { sem: "S1", tasa: 12 },
  { sem: "S2", tasa: 15 },
  { sem: "S3", tasa: 18 },
  { sem: "S4", tasa: 14 },
  { sem: "S5", tasa: 22 },
  { sem: "S6", tasa: 19 },
  { sem: "S7", tasa: 25 },
  { sem: "S8", tasa: 28 },
];

const taskCompletionData = [
  { dia: "Lun", completadas: 8, pendientes: 3 },
  { dia: "Mar", completadas: 12, pendientes: 5 },
  { dia: "Mié", completadas: 6, pendientes: 2 },
  { dia: "Jue", completadas: 15, pendientes: 4 },
  { dia: "Vie", completadas: 10, pendientes: 1 },
];

const kpis = [
  { label: "Ingresos mensuales", value: "$72,000", change: "+24%", up: true, icon: DollarSign },
  { label: "Clientes activos", value: "148", change: "+12", up: true, icon: Users },
  { label: "Tasa de conversión", value: "28%", change: "+6%", up: true, icon: Target },
  { label: "Tiempo promedio cierre", value: "4.2 días", change: "-1.3", up: true, icon: Clock },
];

export default function MetricsSection() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
              <span className={`text-xs font-medium flex items-center gap-1 ${kpi.up ? "text-primary" : "text-destructive"}`}>
                {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-display font-bold">{kpi.value}</p>
            <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Revenue chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-5"
        >
          <h3 className="font-display font-semibold text-sm mb-4">Ingresos mensuales (MXN)</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(145, 80%, 42%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(145, 80%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" tick={{ fill: "hsl(250, 10%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(250, 10%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "hsl(250, 13%, 16%)", border: "1px solid hsl(250, 12%, 22%)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Ingresos"]}
                />
                <Area type="monotone" dataKey="valor" stroke="hsl(145, 80%, 42%)" strokeWidth={2} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Conversion chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-5"
        >
          <h3 className="font-display font-semibold text-sm mb-4">Tasa de conversión (%)</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <XAxis dataKey="sem" tick={{ fill: "hsl(250, 10%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(250, 10%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(250, 13%, 16%)", border: "1px solid hsl(250, 12%, 22%)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => [`${v}%`, "Conversión"]}
                />
                <Line type="monotone" dataKey="tasa" stroke="hsl(270, 60%, 55%)" strokeWidth={2} dot={{ fill: "hsl(270, 60%, 55%)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Task completion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-5"
      >
        <h3 className="font-display font-semibold text-sm mb-4">Tareas completadas esta semana</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taskCompletionData}>
              <XAxis dataKey="dia" tick={{ fill: "hsl(250, 10%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(250, 10%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(250, 13%, 16%)", border: "1px solid hsl(250, 12%, 22%)", borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="completadas" fill="hsl(145, 80%, 42%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pendientes" fill="hsl(250, 12%, 30%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Completadas</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-muted" /> Pendientes</span>
        </div>
      </motion.div>
    </div>
  );
}
