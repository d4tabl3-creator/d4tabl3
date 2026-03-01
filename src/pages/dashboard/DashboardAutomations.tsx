import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AutomationsSection from "@/components/dashboard/AutomationsSection";

export default function DashboardAutomations() {
  const { subscribed } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!subscribed) navigate("/dashboard"); }, [subscribed]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Automatizaciones</h1>
        <p className="text-sm text-muted-foreground mt-1">Flujos prediseñados para optimizar la operación de tu negocio.</p>
      </div>
      <AutomationsSection />
    </div>
  );
}
