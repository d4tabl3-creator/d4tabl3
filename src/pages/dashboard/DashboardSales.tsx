import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, UserPlus, Trophy, DollarSign, Users, Copy, Check } from "lucide-react";
import { useEffect as useEffectOnce } from "react";
import ConfettiBackground from "@/components/effects/ConfettiBackground";

interface Referral {
  id: string;
  client_name: string;
  client_business: string;
  status: string;
  created_at: string;
  subscribed_at: string | null;
  total_earned: number;
}

interface AgentProfile {
  id: string;
  ref_code: string;
  display_name: string;
  commission_rate: number;
}

export default function DashboardSales() {
  const { user, isAdmin } = useAuth();
  const [agent, setAgent] = useState<AgentProfile | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState("");
  const [clientBusiness, setClientBusiness] = useState("");
  const [adding, setAdding] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  async function loadData() {
    setLoading(true);
    const { data: agentData } = await supabase
      .from("sales_agents")
      .select("*")
      .eq("user_id", user!.id)
      .single();

    if (agentData) {
      setAgent(agentData as AgentProfile);
      const { data: refs } = await supabase
        .from("referrals")
        .select("*")
        .eq("agent_id", agentData.id)
        .order("created_at", { ascending: false });
      if (refs) setReferrals(refs as Referral[]);
    }
    setLoading(false);
  }

  const handleAddReferral = async () => {
    if (!agent || !clientName.trim()) return;
    setAdding(true);
    const { error } = await supabase.from("referrals").insert({
      agent_id: agent.id,
      client_name: clientName.trim(),
      client_business: clientBusiness.trim() || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      toast({ title: "🎉 ¡Cliente registrado!", description: `${clientName} ha sido añadido a tu cartera.` });
      setClientName("");
      setClientBusiness("");
      loadData();
    }
    setAdding(false);
  };

  const copyLink = () => {
    if (!agent) return;
    navigator.clipboard.writeText(`${window.location.origin}/?ref=${agent.ref_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Link copiado", description: "Comparte este link con tus prospectos." });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  if (!agent) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center space-y-4 rounded-xl border border-border bg-card/50 p-8">
        <Users className="h-12 w-12 text-muted-foreground mx-auto" />
        <h2 className="text-xl font-display font-bold">Panel de Ventas</h2>
        <p className="text-sm text-muted-foreground">
          Aún no tienes acceso al panel de ventas. Contacta al administrador para activar tu cuenta de asesor.
        </p>
      </div>
    );
  }

  const totalEarned = referrals.reduce((sum, r) => sum + (r.total_earned || 0), 0);
  const activeClients = referrals.filter((r) => r.status === "subscribed").length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {showConfetti && <ConfettiBackground />}

      <div>
        <h1 className="text-2xl font-display font-bold">Tu Escritorio de Ventas</h1>
        <p className="text-sm text-muted-foreground mt-1">Registra clientes, comparte tu link y gana comisiones.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Users, label: "Clientes registrados", value: referrals.length },
          { icon: Trophy, label: "Clientes activos", value: activeClients },
          { icon: DollarSign, label: "Ganado total", value: `$${totalEarned.toLocaleString()} MXN` },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card/50 p-4 text-center"
          >
            <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-display font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Ref link */}
      <div className="rounded-xl border border-border bg-card/50 p-4 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">Tu link de referido</p>
          <p className="text-sm font-mono truncate">{window.location.origin}/?ref={agent.ref_code}</p>
        </div>
        <Button variant="outline" size="sm" onClick={copyLink}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      {/* Register client */}
      <div className="rounded-xl border border-border bg-card/50 p-5 space-y-4">
        <h3 className="font-display font-semibold flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary" /> Registrar nuevo cliente
        </h3>
        <div className="flex gap-3">
          <Input placeholder="Nombre del cliente" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <Input placeholder="Nombre del negocio (opcional)" value={clientBusiness} onChange={(e) => setClientBusiness(e.target.value)} />
          <Button onClick={handleAddReferral} disabled={adding || !clientName.trim()}>
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Registrar"}
          </Button>
        </div>
      </div>

      {/* Referral list */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-sm">Tus clientes</h3>
        {referrals.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Aún no tienes clientes registrados. ¡Empieza a compartir tu link!</p>
        ) : (
          <div className="space-y-2">
            {referrals.map((ref) => (
              <div key={ref.id} className="rounded-lg border border-border bg-card/30 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{ref.client_name}</p>
                  {ref.client_business && <p className="text-xs text-muted-foreground">{ref.client_business}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    ref.status === "subscribed" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {ref.status === "subscribed" ? "Suscrito" : "Registrado"}
                  </span>
                  {ref.total_earned > 0 && (
                    <span className="text-xs font-medium text-primary">${ref.total_earned} MXN</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
