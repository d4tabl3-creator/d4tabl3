import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, CheckCircle, Wrench, DollarSign } from "lucide-react";
import type { AnalysisResult } from "./ImageUpload";

interface Props {
  result: AnalysisResult;
}

export default function ProposalGenerator({ result }: Props) {
  const tools = [
    { name: "Automatización de documentos", price: "$2,500 MXN/mes" },
    { name: "Dashboard de métricas en tiempo real", price: "$1,800 MXN/mes" },
    { name: "Integración con sistemas existentes", price: "$3,200 MXN/mes" },
    { name: "Asistente IA personalizado", price: "$4,000 MXN/mes" },
  ];

  const handleDownload = () => {
    const content = `
PLAN DE DIGITALIZACIÓN - dªtªblɛ
=================================

RESUMEN: ${result.summary}

PUNTUACIÓN DE DIGITALIZACIÓN: ${result.digitalizationScore}%

DATOS EXTRAÍDOS:
${result.extractedData.map((d) => `  • ${d.label}: ${d.value}`).join("\n")}

PROCESOS IDENTIFICADOS:
${result.processes.map((p) => `  • ${p}`).join("\n")}

RECOMENDACIONES:
${result.recommendations.map((r) => `  • ${r}`).join("\n")}

HERRAMIENTAS RECOMENDADAS:
${tools.map((t) => `  • ${t.name} - ${t.price}`).join("\n")}

---
Generado por dªtªblɛ | contacto@datable.com | Ciudad de México
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plan-digitalizacion-datable.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold">
              Tu Plan de <span className="gradient-rainbow-text">Digitalización</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Personalizado basado en el análisis de tu negocio
            </p>
          </div>

          {/* Score */}
          <div className="text-center">
            <p className="text-6xl font-display font-bold gradient-rainbow-text">
              {result.digitalizationScore}%
            </p>
            <p className="text-sm text-muted-foreground mt-1">Potencial de mejora con digitalización</p>
          </div>

          {/* Key findings */}
          <div>
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Hallazgos Clave
            </h3>
            <ul className="space-y-2">
              {result.recommendations.map((r, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Herramientas Recomendadas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tools.map((t) => (
                <div key={t.name} className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <DollarSign className="h-3 w-3" />
                    {t.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleDownload}
              className="flex-1 gradient-rainbow text-primary-foreground font-display font-semibold rounded-xl py-5 hover:opacity-90 transition-opacity"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar Plan
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-border/60 font-display rounded-xl py-5"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Plan de Digitalización dªtªblɛ", text: result.summary });
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
