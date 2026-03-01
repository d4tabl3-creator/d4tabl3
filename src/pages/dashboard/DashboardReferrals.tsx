import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Gift, Users, Copy, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ClientReferral {
  id: string;
  referred_email: string | null;
  status: string;
  completed_analysis: boolean;
  subscribed: boolean;
  reward_granted: boolean;
  created_at: string;
}

export default function DashboardReferrals() {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState<ClientReferral[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("client_referrals")
      .select("*")
      .eq("referrer_user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setReferrals(data as ClientReferral[]);
        setLoading(false);
      });
  }, [user]);

  const refLink = `${window.location.origin}/?ref=client_${user?.id?.slice(0, 8)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Link copiado", description: "Compártelo con otros dueños de negocio." });
  };

  const subscribedCount = referrals.filter((r) => r.subscribed).length;
  const analysisCount = referrals.filter((r) => r.completed_analysis).length;
  const rewardsEarned = subscribedCount; // 1 free month per subscribed referral

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold">Tus Referidos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Invita a otros dueños de negocio y gana meses gratis.
        </p>
      </div>

      {/* Rewards info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3"
      >
        <div className="flex items-center gap-3">
          <Gift className="h-6 w-6 text-primary" />
          <h3 className="font-display font-semibold">Programa de Recompensas</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-card/50 p-3">
            <p className="text-muted-foreground text-xs mb-1">Por cada referido que se suscriba</p>
            <p className="font-bold text-primary">1 mes gratis</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3">
            <p className="text-muted-foreground text-xs mb-1">Por cada 10 que hagan su análisis</p>
            <p className="font-bold text-primary">1 mes gratis</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Invitados", value: referrals.length, icon: Share2 },
          { label: "Análisis completados", value: analysisCount, icon: Users },
          { label: "Meses ganados", value: rewardsEarned + Math.floor(analysisCount / 10), icon: Gift },
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

      {/* Share link */}
      <div className="rounded-xl border border-border bg-card/50 p-4 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">Tu link de referido</p>
          <p className="text-sm font-mono truncate">{refLink}</p>
        </div>
        <Button variant="outline" size="sm" onClick={copyLink}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      {/* List */}
      {referrals.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-sm">Historial de referidos</h3>
          {referrals.map((ref) => (
            <div key={ref.id} className="rounded-lg border border-border bg-card/30 px-4 py-3 flex items-center justify-between">
              <p className="text-sm">{ref.referred_email || "Invitación pendiente"}</p>
              <div className="flex items-center gap-2">
                {ref.subscribed && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Suscrito</span>}
                {ref.completed_analysis && !ref.subscribed && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Análisis hecho</span>}
                {!ref.completed_analysis && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Invitado</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
