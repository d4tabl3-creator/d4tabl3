import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MetricsSection from "@/components/dashboard/MetricsSection";

export default function DashboardMetrics() {
  const { subscribed } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!subscribed) navigate("/dashboard"); }, [subscribed]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Métricas KPI</h1>
        <p className="text-sm text-muted-foreground mt-1">Tableros de rendimiento para tomar mejores decisiones.</p>
      </div>
      <MetricsSection />
    </div>
  );
}
