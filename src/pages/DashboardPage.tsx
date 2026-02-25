import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut, CreditCard, Settings, Loader2, Lock, Zap, BarChart3, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { user, loading, subscribed, subscriptionEnd, signOut, checkSubscription, checkingSubscription } = useAuth();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [loading, user, navigate]);

  // Check on mount & after checkout redirect
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

  const handlePortal = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setPortalLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-display font-bold gradient-rainbow-text">D4tabl3</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button variant="ghost" size="icon" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        {!subscribed ? (
          /* Paywall */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 text-center space-y-6">
            <Lock className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-3xl font-display font-bold">Activa tu suscripción</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Accede a todas las herramientas de automatización, dashboards de métricas, gestión de procesos y asistencia virtual.
            </p>

            <div className="glass-rainbow rounded-2xl p-6 max-w-sm mx-auto space-y-4">
              <p className="text-4xl font-display font-bold">$300 <span className="text-lg text-muted-foreground">MXN/mes</span></p>
              <ul className="text-sm text-left space-y-2">
                {["Automatizaciones prediseñadas", "Tableros de métricas KPI", "Gestión de tareas y procesos", "Asistencia virtual dedicada", "Módulos de cobranza y cotización"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0" />{f}</li>
                ))}
              </ul>
              <Button className="w-full btn-glow" onClick={handleCheckout} disabled={checkoutLoading}>
                {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                Suscribirme ahora
              </Button>
            </div>

            <Button variant="ghost" size="sm" onClick={() => checkSubscription()} disabled={checkingSubscription}>
              {checkingSubscription ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Verificar suscripción
            </Button>
          </motion.div>
        ) : (
          /* Active Dashboard */
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Suscripción activa</p>
                <p className="font-display font-bold text-lg">Plan D4tabl3</p>
                {subscriptionEnd && (
                  <p className="text-xs text-muted-foreground">Renueva: {new Date(subscriptionEnd).toLocaleDateString("es-MX")}</p>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={handlePortal} disabled={portalLoading}>
                {portalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Settings className="h-4 w-4" />}
                Gestionar suscripción
              </Button>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Zap, title: "Automatizaciones", desc: "Configura flujos automáticos" },
                { icon: BarChart3, title: "Métricas KPI", desc: "Monitorea tu rendimiento" },
                { icon: CheckCircle, title: "Gestión de procesos", desc: "Organiza tareas y seguimiento" },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-6 space-y-3 hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <card.icon className="h-8 w-8 text-primary" />
                  <h3 className="font-display font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
