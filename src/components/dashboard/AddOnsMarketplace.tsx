import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, Check, Megaphone, Receipt, Package, Users, BarChart3, Calculator, Zap, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Megaphone, Receipt, Package, Users, BarChart3, Calculator, Zap,
};

const colorMap: Record<string, string> = {
  Megaphone: "var(--rainbow-1)",
  Receipt: "var(--rainbow-2)",
  Package: "var(--rainbow-3)",
  Users: "var(--fun-sky)",
  BarChart3: "var(--rainbow-5)",
  Calculator: "var(--rainbow-6)",
  Zap: "var(--rainbow-4)",
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
    const { error } = await supabase.from("user_add_ons").insert({ add_on_id: addOnId, user_id: (await supabase.auth.getUser()).data.user!.id });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setOwned((prev) => new Set([...prev, addOnId]));
      toast({ title: "¡Módulo activado! 🎉", description: "Ya tienes acceso a esta herramienta." });
    }
  };

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <motion.div 
          className="h-12 w-12 rounded-2xl gradient-rainbow flex items-center justify-center"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </motion.div>
        <div>
          <h2 className="text-xl font-display font-bold gradient-rainbow-text">Bolsa de Trucos</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Tunea tu plataforma con poderes extra 🚀</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {addOns.map((addon, i) => {
          const Icon = iconMap[addon.icon] || Zap;
          const color = colorMap[addon.icon] || "var(--rainbow-4)";
          const isOwned = owned.has(addon.id);
          return (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`card-fun rounded-2xl border-2 p-5 space-y-4 ${
                isOwned ? "border-primary/40 bg-primary/5" : "border-border bg-card/60"
              }`}
              style={{
                borderTopColor: isOwned ? undefined : `hsl(${color})`,
                borderTopWidth: '3px',
              }}
            >
              <div className="flex items-center justify-between">
                <motion.div
                  className="h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `hsl(${color} / 0.15)` }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                >
                  <Icon className="h-6 w-6" style={{ color: `hsl(${color})` }} />
                </motion.div>
                {isOwned && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xs bg-primary/15 text-primary px-3 py-1 rounded-full flex items-center gap-1 font-semibold"
                  >
                    <Check className="h-3 w-3" /> ¡Activo!
                  </motion.span>
                )}
              </div>
              <div>
                <h3 className="font-display font-bold text-base">{addon.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{addon.description}</p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-lg font-display font-bold" style={{ color: `hsl(${color})` }}>
                    ${addon.price_mxn}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">MXN/mes</span>
                </div>
                {!isOwned && (
                  <Button 
                    size="sm" 
                    onClick={() => handlePurchase(addon.id)}
                    className="rounded-xl font-semibold"
                    style={{ 
                      backgroundColor: `hsl(${color})`,
                      color: 'white',
                    }}
                  >
                    ✨ Activar
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
