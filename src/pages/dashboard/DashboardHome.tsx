import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Zap, BarChart3, CheckCircle, ArrowRight, CreditCard, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    title: "Automatizaciones",
    description: "Flujos prediseñados para optimizar tu operación diaria.",
    icon: Zap,
    url: "/dashboard/automations",
    count: "6 flujos",
  },
  {
    title: "Métricas KPI",
    description: "Tableros de rendimiento para tomar decisiones informadas.",
    icon: BarChart3,
    url: "/dashboard/metrics",
    count: "4 indicadores",
  },
  {
    title: "Gestión de procesos",
    description: "Organiza tareas y da seguimiento a cada etapa.",
    icon: CheckCircle,
    url: "/dashboard/processes",
    count: "3 columnas",
  },
];

export default function DashboardHome() {
  const { subscribed, subscriptionEnd, checkSubscription, checkingSubscription } = useAuth();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      toast({ title: "¡Pago exitoso!", description: "Tu suscripción está activa." });
      checkSubscription();
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setCheckoutLoading(false);
  };

  if (!subscribed) {
    return (
      <div className="max-w-lg mx-auto mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-8 text-center space-y-6"
        >
          <Lock className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-2xl font-display font-bold">Activa tu plataforma</h2>
          <p className="text-sm text-muted-foreground">
            Accede a todas las herramientas para implementar las recomendaciones de tu diagnóstico: automatizaciones, métricas, gestión de procesos y soporte de nuestro equipo.
          </p>

          <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-4">
            <p className="text-3xl font-display font-bold">
              $300 <span className="text-base text-muted-foreground font-normal">MXN/mes</span>
            </p>
            <ul className="text-sm text-left space-y-2">
              {[
                "Automatizaciones prediseñadas para tu negocio",
                "Tableros de métricas y KPIs en tiempo real",
                "Gestión de tareas y procesos internos",
                "Soporte dedicado de nuestro equipo",
                "Infraestructura y servidores incluidos",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" onClick={handleCheckout} disabled={checkoutLoading}>
              {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CreditCard className="h-4 w-4 mr-2" />}
              Suscribirme ahora
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={() => checkSubscription()} disabled={checkingSubscription}>
            {checkingSubscription && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
            Verificar suscripción
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold">Bienvenido a tu plataforma</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Aquí implementamos las recomendaciones de tu diagnóstico. Selecciona un módulo para comenzar.
        </p>
      </div>

      {subscriptionEnd && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-card/50 px-5 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Plan activo</p>
            <p className="text-sm font-medium">D4tabl3 Plataforma</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Renueva: {new Date(subscriptionEnd).toLocaleDateString("es-MX")}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {modules.map((mod, i) => (
          <motion.button
            key={mod.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => navigate(mod.url)}
            className="group rounded-xl border border-border bg-card/50 p-5 text-left hover:border-primary/30 hover:bg-card transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <mod.icon className="h-4 w-4 text-primary" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-display font-semibold text-sm">{mod.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{mod.description}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-3">{mod.count}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
