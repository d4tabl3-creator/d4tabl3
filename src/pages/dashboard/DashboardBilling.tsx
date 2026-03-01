import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Settings, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function DashboardBilling() {
  const { subscribed, subscriptionEnd } = useAuth();
  const [portalLoading, setPortalLoading] = useState(false);

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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Suscripción</h1>
        <p className="text-sm text-muted-foreground mt-1">Gestiona tu plan y método de pago.</p>
      </div>

      <div className="rounded-xl border border-border bg-card/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Estado</p>
            <p className="font-display font-semibold">{subscribed ? "Activa" : "Inactiva"}</p>
          </div>
          {subscribed && subscriptionEnd && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Renovación</p>
              <p className="font-display font-semibold text-sm">
                {new Date(subscriptionEnd).toLocaleDateString("es-MX")}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground mb-1">Plan</p>
          <p className="font-medium">D4tabl3 Plataforma — $300 MXN/mes</p>
          <p className="text-xs text-muted-foreground mt-1">
            Incluye infraestructura, servidores, automatizaciones y soporte de nuestro equipo.
          </p>
        </div>

        {subscribed && (
          <Button variant="outline" size="sm" onClick={handlePortal} disabled={portalLoading}>
            {portalLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Settings className="h-4 w-4 mr-2" />}
            Gestionar suscripción
          </Button>
        )}
      </div>
    </div>
  );
}
