import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, Check, Megaphone, Receipt, Package, Users, BarChart3, Calculator, Zap } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Megaphone, Receipt, Package, Users, BarChart3, Calculator, Zap,
};

interface AddOn {
  id: string;
  name: string;
  description: string;
  price_mxn: number;
  icon: string;
}

export default function AddOnsMarketplace() {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [owned, setOwned] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: catalog }, { data: mine }] = await Promise.all([
        supabase.from("add_ons").select("*").eq("active", true),
        supabase.from("user_add_ons").select("add_on_id"),
      ]);
      if (catalog) setAddOns(catalog as AddOn[]);
      if (mine) setOwned(new Set(mine.map((m: any) => m.add_on_id)));
      setLoading(false);
    }
    load();
  }, []);

  const handlePurchase = async (addOnId: string) => {
    // For now, mark as purchased directly (Stripe integration for add-ons can come later)
    const { error } = await supabase.from("user_add_ons").insert({ add_on_id: addOnId, user_id: (await supabase.auth.getUser()).data.user!.id });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setOwned((prev) => new Set([...prev, addOnId]));
      toast({ title: "¡Módulo activado!", description: "Ya tienes acceso a esta herramienta." });
    }
  };

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-bold">Bolsa de Trucos</h2>
        <p className="text-sm text-muted-foreground mt-1">Tunea tu plataforma con módulos adicionales para potenciar tu negocio.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addOns.map((addon, i) => {
          const Icon = iconMap[addon.icon] || Zap;
          const isOwned = owned.has(addon.id);
          return (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-xl border p-5 space-y-3 transition-all ${
                isOwned ? "border-primary/30 bg-primary/5" : "border-border bg-card/50 hover:border-primary/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                {isOwned && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="h-3 w-3" /> Activo
                  </span>
                )}
              </div>
              <h3 className="font-display font-semibold text-sm">{addon.name}</h3>
              <p className="text-xs text-muted-foreground">{addon.description}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-bold">${addon.price_mxn} <span className="text-xs font-normal text-muted-foreground">MXN/mes</span></span>
                {!isOwned && (
                  <Button size="sm" variant="outline" onClick={() => handlePurchase(addon.id)}>
                    Activar
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
