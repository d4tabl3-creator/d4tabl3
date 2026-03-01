import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProcessSection from "@/components/dashboard/ProcessSection";

export default function DashboardProcesses() {
  const { subscribed, isAdmin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!subscribed && !isAdmin) navigate("/dashboard"); }, [subscribed, isAdmin]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Gestión de Procesos</h1>
        <p className="text-sm text-muted-foreground mt-1">Organiza tareas y da seguimiento a cada etapa de tu operación.</p>
      </div>
      <ProcessSection />
    </div>
  );
}
