import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { FileText, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  onClaimed: () => void;
  alreadyClaimed: boolean;
}

export default function BlueprintCodeInput({ onClaimed, alreadyClaimed }: Props) {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (alreadyClaimed) {
    return (
      <motion.div
        className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <p className="text-sm font-medium">Blueprint vinculado ✓</p>
      </motion.div>
    );
  }

  const handleClaim = async () => {
    if (!code.trim() || !user) return;
    setLoading(true);

    try {
      // Look up code
      const { data: existing, error: lookupErr } = await supabase
        .from("blueprint_codes")
        .select("*")
        .eq("code", code.trim().toUpperCase())
        .single();

      if (lookupErr || !existing) {
        toast({ title: "Código no encontrado", description: "Verifica que el código sea correcto.", variant: "destructive" });
        setLoading(false);
        return;
      }

      if (existing.claimed_by) {
        toast({ title: "Código ya usado", description: "Este código ya fue reclamado.", variant: "destructive" });
        setLoading(false);
        return;
      }

      // Claim it
      const { error: claimErr } = await supabase
        .from("blueprint_codes")
        .update({ claimed_by: user.id, claimed_at: new Date().toISOString() })
        .eq("id", existing.id);

      if (claimErr) throw claimErr;

      // Save blueprint data to profile
      await supabase
        .from("profiles")
        .update({ blueprint_data: existing.blueprint_data })
        .eq("user_id", user.id);

      toast({ title: "¡Blueprint vinculado!", description: "Tu diagnóstico ya está conectado a tu cuenta." });
      onClaimed();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="rounded-2xl border border-border bg-card/50 p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg gradient-rainbow flex items-center justify-center">
          <FileText className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display font-bold text-sm">¿Tienes un código Blueprint?</h3>
          <p className="text-xs text-muted-foreground">Ingresa el código que recibiste en tu diagnóstico gratuito.</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="DTB-XXXXXX"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="font-mono tracking-wider"
          maxLength={10}
        />
        <Button onClick={handleClaim} disabled={loading || !code.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Vincular"}
        </Button>
      </div>
    </motion.div>
  );
}
