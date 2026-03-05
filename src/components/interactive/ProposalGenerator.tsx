import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, CheckCircle, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { AnalysisResult } from "./ImageUpload";

interface Props {
  result: AnalysisResult;
}

export default function ProposalGenerator({ result }: Props) {
  const handleDownload = () => {
    const content = `
AUTOMATION BLUEPRINT - dªtªblɛ
=================================

RESUMEN: ${result.summary}

PUNTUACIÓN DE DIGITALIZACIÓN: ${result.digitalizationScore}%

DATOS EXTRAÍDOS:
${result.extractedData.map((d) => `  • ${d.label}: ${d.value}`).join("\n")}

PROCESOS IDENTIFICADOS:
${result.processes.map((p) => `  • ${p}`).join("\n")}

RECOMENDACIONES:
${result.recommendations.map((r) => `  • ${r}`).join("\n")}

---
Generado por dªtªblɛ | contacto@datable.com | Ciudad de México
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "automation-blueprint-datable.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold">
              Tu <span className="gradient-rainbow-text">Automation Blueprint</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Estrategia personalizada generada por el motor exclusivo de dªtªblɛ
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

        {/* CTA to register */}
        <motion.div
          className="glass-rainbow rounded-3xl p-8 text-center space-y-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket className="h-12 w-12 text-primary mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-display font-bold">
            ¿Te gustó tu <span className="gradient-rainbow-text">Blueprint</span>?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            ¡Excelente! Ahora imagina tener todas estas soluciones <strong className="text-foreground">funcionando en automático</strong> para tu negocio. 
            Regístrate y activa tu plan personalizado en minutos.
          </p>
          <Button
            asChild
            size="lg"
            className="btn-glow rounded-xl font-display font-semibold gap-2 px-8"
          >
            <Link to="/auth">
              Crear mi cuenta gratis
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            🔒 Sin tarjeta de crédito · Diagnóstico incluido · Cancela cuando quieras
          </p>
        </motion.div>
      </div>
    </section>
  );
}
