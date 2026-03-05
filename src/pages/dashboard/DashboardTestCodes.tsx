import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, Copy, Check, Shield, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardTestCodes() {
  const { isAdmin } = useAuth();
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center space-y-4 rounded-xl border border-border bg-card/50 p-8">
        <Shield className="h-12 w-12 text-muted-foreground mx-auto" />
        <h2 className="text-xl font-display font-bold">Acceso restringido</h2>
        <p className="text-sm text-muted-foreground">Solo administradores pueden generar códigos de prueba.</p>
      </div>
    );
  }

  const generateCode = async () => {
    if (!businessName.trim()) return;
    setGenerating(true);

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "DTB-";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];

    const blueprintData = {
      summary: `Diagnóstico de prueba para ${businessName}${businessType ? ` (${businessType})` : ""}`,
      digitalizationScore: Math.floor(55 + Math.random() * 35),
      extractedData: [
        { label: "Negocio", value: businessName },
        { label: "Tipo", value: businessType || "General" },
        { label: "Estado", value: "Código de prueba" },
      ],
      processes: [
        "Registro de clientes",
        "Facturación",
        "Inventario",
        "Marketing digital",
      ],
      recommendations: [
        "Implementar sistema de registro digital de clientes",
        "Automatizar proceso de facturación",
        "Crear dashboard de métricas de ventas",
        "Activar campañas de marketing automatizado",
      ],
    };

    const { error } = await supabase.from("blueprint_codes").insert({
      code,
      blueprint_data: blueprintData as any,
    });

    if (error) {
      // Try via edge function if RLS blocks direct insert
      const { data, error: fnError } = await supabase.functions.invoke("generate-blueprint-code", {
        body: { blueprintData },
      });
      if (fnError) {
        toast({ title: "Error", description: fnError.message, variant: "destructive" });
        setGenerating(false);
        return;
      }
      setGeneratedCode(data.code);
    } else {
      setGeneratedCode(code);
    }

    toast({ title: "🧪 Código generado", description: `Código: ${generatedCode || code}` });
    setGenerating(false);
  };

  const copyCode = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-lg mx-auto space-y-8 mt-4">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <FlaskConical className="h-6 w-6 text-primary" />
          Generador de Códigos de Prueba
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Crea códigos Blueprint para probar el flujo completo.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card/50 p-5 space-y-4">
        <Input
          placeholder="Nombre del negocio (ej: Café Luna)"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <Input
          placeholder="Tipo de negocio (opcional, ej: Restaurante)"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
        />
        <Button onClick={generateCode} disabled={generating || !businessName.trim()} className="w-full">
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generar código"}
        </Button>
      </div>

      {generatedCode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 text-center space-y-3"
        >
          <p className="text-xs text-muted-foreground">Tu código de prueba:</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl font-mono font-bold tracking-widest gradient-rainbow-text">
              {generatedCode}
            </span>
            <Button variant="ghost" size="icon" onClick={copyCode}>
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Úsalo en el dashboard → sección "Código Blueprint"
          </p>
        </motion.div>
      )}
    </div>
  );
}
