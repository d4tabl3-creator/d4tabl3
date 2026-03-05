import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, UserPlus, Users, Shield, ToggleLeft, ToggleRight, Key } from "lucide-react";

interface Agent {
  id: string;
  user_id: string;
  ref_code: string;
  display_name: string | null;
  phone: string | null;
  commission_rate: number | null;
  active: boolean | null;
  created_at: string;
}

interface AgentWithStats extends Agent {
  referral_count: number;
  active_clients: number;
  total_earned: number;
}

export default function DashboardAdminAgents() {
  const { isAdmin } = useAuth();
  const [agents, setAgents] = useState<AgentWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    loadAgents();
  }, [isAdmin]);

  async function loadAgents() {
    setLoading(true);
    const { data: agentsData } = await supabase
      .from("sales_agents")
      .select("*")
      .order("created_at", { ascending: false });

    if (agentsData) {
      const enriched: AgentWithStats[] = await Promise.all(
        (agentsData as Agent[]).map(async (agent) => {
          const { data: refs } = await supabase
            .from("referrals")
            .select("status, total_earned")
            .eq("agent_id", agent.id);
          
          return {
            ...agent,
            referral_count: refs?.length || 0,
            active_clients: refs?.filter((r: any) => r.status === "subscribed").length || 0,
            total_earned: refs?.reduce((sum: number, r: any) => sum + (r.total_earned || 0), 0) || 0,
          };
        })
      );
      setAgents(enriched);
    }
    setLoading(false);
  }

  const generateRefCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  };

  const handleAddAgent = async () => {
    if (!newEmail.trim() || !newName.trim()) return;
    setAdding(true);

    // Look up user by email in profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("user_id")
      .eq("email", newEmail.trim())
      .single();

    if (!profile) {
      toast({
        title: "Usuario no encontrado",
        description: "El email no está registrado. El vendedor debe crear su cuenta primero.",
        variant: "destructive",
      });
      setAdding(false);
      return;
    }

    // Check if already an agent
    const { data: existing } = await supabase
      .from("sales_agents")
      .select("id")
      .eq("user_id", profile.user_id);

    if (existing && existing.length > 0) {
      toast({ title: "Ya existe", description: "Este usuario ya es vendedor.", variant: "destructive" });
      setAdding(false);
      return;
    }

    const refCode = generateRefCode();
    const { error } = await supabase.from("sales_agents").insert({
      user_id: profile.user_id,
      ref_code: refCode,
      display_name: newName.trim(),
      phone: newPhone.trim() || null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "🎉 Vendedor agregado", description: `${newName} ahora puede registrar clientes.` });
      setNewEmail("");
      setNewName("");
      setNewPhone("");
      loadAgents();
    }
    setAdding(false);
  };

  const toggleAgent = async (agent: AgentWithStats) => {
    const { error } = await supabase
      .from("sales_agents")
      .update({ active: !agent.active })
      .eq("id", agent.id);

    if (!error) {
      toast({ title: agent.active ? "Vendedor desactivado" : "Vendedor activado" });
      loadAgents();
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center space-y-4 rounded-xl border border-border bg-card/50 p-8">
        <Shield className="h-12 w-12 text-muted-foreground mx-auto" />
        <h2 className="text-xl font-display font-bold">Acceso restringido</h2>
        <p className="text-sm text-muted-foreground">Solo administradores pueden gestionar vendedores.</p>
      </div>
    );
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Gestión de Vendedores
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Da de alta vendedores, revisa su estatus y rendimiento.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Vendedores activos", value: agents.filter((a) => a.active).length },
          { label: "Clientes totales", value: agents.reduce((s, a) => s + a.referral_count, 0) },
          { label: "Ganancia total equipo", value: `$${agents.reduce((s, a) => s + a.total_earned, 0).toLocaleString()} MXN` },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card/50 p-4 text-center"
          >
            <p className="text-2xl font-display font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Add agent form */}
      <div className="rounded-xl border border-border bg-card/50 p-5 space-y-4">
        <h3 className="font-display font-semibold flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary" /> Dar de alta vendedor
        </h3>
        <p className="text-xs text-muted-foreground">
          El vendedor debe tener una cuenta registrada en d4tabl3 primero.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input placeholder="Email del vendedor" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <Input placeholder="Nombre" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <Input placeholder="Teléfono (opcional)" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        </div>
        <Button onClick={handleAddAgent} disabled={adding || !newEmail.trim() || !newName.trim()}>
          {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Agregar vendedor"}
        </Button>
      </div>

      {/* Agent list */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-sm">Equipo de ventas ({agents.length})</h3>
        {agents.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Aún no tienes vendedores. Agrega el primero arriba.</p>
        ) : (
          <div className="space-y-2">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-xl border bg-card/30 px-5 py-4 space-y-3 ${agent.active ? "border-border" : "border-destructive/30 opacity-60"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{agent.display_name || "Sin nombre"}</p>
                    {agent.phone && <p className="text-xs text-muted-foreground">{agent.phone}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded flex items-center gap-1">
                      <Key className="h-3 w-3" />
                      {agent.ref_code}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => toggleAgent(agent)}>
                      {agent.active ? (
                        <ToggleRight className="h-5 w-5 text-primary" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-muted/30 p-2">
                    <p className="text-sm font-bold">{agent.referral_count}</p>
                    <p className="text-[10px] text-muted-foreground">Clientes</p>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-2">
                    <p className="text-sm font-bold">{agent.active_clients}</p>
                    <p className="text-[10px] text-muted-foreground">Activos</p>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-2">
                    <p className="text-sm font-bold">${agent.total_earned.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Ganado</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
