import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Zap, BarChart3, CheckCircle, ArrowRight, CreditCard, Loader2, Lock, Sparkles, Rocket, Star, Gift, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import GamifiedChecklist from "@/components/dashboard/GamifiedChecklist";
import BlueprintCodeInput from "@/components/dashboard/BlueprintCodeInput";
import BlueprintPreview from "@/components/dashboard/BlueprintPreview";
import OnboardingGuide from "@/components/dashboard/OnboardingGuide";
import { fireFireworks } from "@/components/effects/useFireworks";

const modules = [
  {
    title: "Automatizaciones",
    description: "Flujos prediseñados para optimizar tu operación diaria.",
    icon: Zap,
    url: "/dashboard/automations",
    count: "6 flujos",
    color: "var(--rainbow-3)",
    emoji: "⚡",
  },
  {
    title: "Métricas KPI",
    description: "Tableros de rendimiento para tomar decisiones informadas.",
    icon: BarChart3,
    url: "/dashboard/metrics",
    count: "4 indicadores",
    color: "var(--rainbow-5)",
    emoji: "📊",
  },
  {
    title: "Gestión de procesos",
    description: "Organiza tareas y da seguimiento a cada etapa.",
    icon: CheckCircle,
    url: "/dashboard/processes",
    count: "3 columnas",
    color: "var(--rainbow-6)",
    emoji: "✅",
  },
];

export default function DashboardHome() {
  const { user, subscribed, isAdmin, subscriptionEnd, checkSubscription, checkingSubscription } = useAuth();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [hasBlueprintCode, setHasBlueprintCode] = useState(false);
  const [visitedModules, setVisitedModules] = useState<Record<string, boolean>>({});
  const [blueprintData, setBlueprintData] = useState<any>(null);
  const [previewUsedAt, setPreviewUsedAt] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("blueprint_data, preview_used_at")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.blueprint_data) {
          setHasBlueprintCode(true);
          setBlueprintData(data.blueprint_data);
        }
        setPreviewUsedAt(data?.preview_used_at ?? null);
      });
    const visited = JSON.parse(localStorage.getItem("dtb_visited_modules") || "{}");
    setVisitedModules(visited);
  }, [user]);

  useEffect(() => {
    if (!user || !blueprintData || previewUsedAt !== null || subscribed || isAdmin) return;
    if (previewUsedAt === null && blueprintData) {
      supabase
        .from("profiles")
        .update({ preview_used_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .then(() => {
          setPreviewUsedAt(new Date().toISOString());
        });
    }
  }, [user, blueprintData, previewUsedAt, subscribed, isAdmin]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      toast({ title: "¡Pago exitoso! 🎉", description: "Tu suscripción está activa." });
      checkSubscription();
      fireFireworks();
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setCheckoutLoading(false);
  };

  const handleModuleClick = (url: string) => {
    const key = url.split("/").pop() || "";
    const visited = { ...visitedModules, [key]: true };
    setVisitedModules(visited);
    localStorage.setItem("dtb_visited_modules", JSON.stringify(visited));
    navigate(url);
  };

  const handleBlueprintClaimed = () => {
    setHasBlueprintCode(true);
    fireFireworks();
    if (user) {
      supabase
        .from("profiles")
        .select("blueprint_data, preview_used_at")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data?.blueprint_data) setBlueprintData(data.blueprint_data);
          setPreviewUsedAt(data?.preview_used_at ?? null);
        });
    }
  };

  const hasAccess = subscribed || isAdmin;

  // --- PREVIEW MODE ---
  if (!hasAccess && blueprintData && previewUsedAt !== undefined) {
    const isExpired = previewUsedAt !== null;
    return (
      <BlueprintPreview
        blueprintData={blueprintData}
        onSubscribe={handleCheckout}
        checkoutLoading={checkoutLoading}
        isExpired={isExpired}
      />
    );
  }

  // --- NO BLUEPRINT: WELCOME SCREEN (no price wall!) ---
  if (!hasAccess) {
    return (
      <div className="max-w-lg mx-auto mt-8 space-y-6">
        {/* Welcome celebration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border-2 border-primary/30 bg-card p-8 text-center space-y-5"
        >
          <motion.div
            className="h-20 w-20 rounded-3xl gradient-rainbow flex items-center justify-center mx-auto"
            animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <PartyPopper className="h-10 w-10 text-primary-foreground" />
          </motion.div>
          
          <h2 className="text-2xl font-display font-bold">
            ¡Bienvenido a <span className="gradient-rainbow-text">d4tabl3</span>!
          </h2>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tu plataforma para hacer crecer tu negocio está lista. 
            El primer paso es hacer tu <strong className="text-foreground">diagnóstico gratuito</strong> para 
            crear tu plan personalizado.
          </p>

          <div className="space-y-3 pt-2">
            <Button 
              asChild
              size="lg" 
              className="w-full rounded-xl font-semibold gap-2 btn-glow"
            >
              <a href="/#image-upload">
                <Rocket className="h-5 w-5" />
                Hacer mi diagnóstico GRATIS
              </a>
            </Button>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs text-muted-foreground">o si ya tienes tu código</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blueprint code input */}
        <BlueprintCodeInput onClaimed={handleBlueprintClaimed} alreadyClaimed={hasBlueprintCode} />

        {/* Fun benefits - not price focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card/50 p-6 space-y-4"
        >
          <h3 className="font-display font-semibold text-sm text-center">¿Qué incluye tu plataforma?</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "⚡", label: "Automatizaciones", color: "var(--rainbow-3)" },
              { emoji: "📊", label: "Métricas en tiempo real", color: "var(--rainbow-5)" },
              { emoji: "✅", label: "Gestión de tareas", color: "var(--rainbow-4)" },
              { emoji: "🛟", label: "Soporte dedicado", color: "var(--fun-sky)" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="rounded-xl border border-border bg-muted/20 p-3 text-center space-y-1"
              >
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Button variant="ghost" size="sm" className="w-full" onClick={() => checkSubscription()} disabled={checkingSubscription}>
          {checkingSubscription && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
          Ya tengo suscripción — Verificar
        </Button>
      </div>
    );
  }

  // --- FULL ACCESS ---
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <OnboardingGuide />
      
      <div>
        <h1 className="text-2xl font-display font-bold">
          ¡Hola! 👋 Bienvenido a tu plataforma
          {isAdmin && (
            <span className="ml-2 text-xs gradient-rainbow text-primary-foreground px-2 py-0.5 rounded-full font-normal">
              ADMIN
            </span>
          )}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Aquí implementamos las recomendaciones de tu diagnóstico. Selecciona un módulo para comenzar.
        </p>
      </div>

      {subscriptionEnd && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Star className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Plan activo</p>
              <p className="text-sm font-medium">d4tabl3 Plataforma ✨</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Renueva: {new Date(subscriptionEnd).toLocaleDateString("es-MX")}
          </p>
        </motion.div>
      )}

      <BlueprintCodeInput onClaimed={handleBlueprintClaimed} alreadyClaimed={hasBlueprintCode} />

      <GamifiedChecklist
        hasBlueprintCode={hasBlueprintCode}
        hasAutomations={!!visitedModules.automations}
        hasMetrics={!!visitedModules.metrics}
        hasProcesses={!!visitedModules.processes}
      />

      <div className="grid md:grid-cols-3 gap-5">
        {modules.map((mod, i) => (
          <motion.button
            key={mod.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => handleModuleClick(mod.url)}
            className="group card-fun rounded-2xl border-2 border-border bg-card/50 p-5 text-left transition-all"
            style={{ borderTopColor: `hsl(${mod.color})`, borderTopWidth: '3px' }}
          >
            <div className="flex items-center justify-between mb-3">
              <motion.div 
                className="h-11 w-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `hsl(${mod.color} / 0.15)` }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              >
                <mod.icon className="h-5 w-5" style={{ color: `hsl(${mod.color})` }} />
              </motion.div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{mod.emoji}</span>
              <h3 className="font-display font-bold text-sm">{mod.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{mod.description}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-3 font-medium">{mod.count}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
