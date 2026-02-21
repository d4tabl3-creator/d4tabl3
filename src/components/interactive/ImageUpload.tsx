import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export interface AnalysisResult {
  summary: string;
  extractedData: { label: string; value: string }[];
  recommendations: string[];
  processes: string[];
  digitalizationScore: number;
}

const examples = [
  "📸 Una foto de tu local o negocio",
  "📱 Un screenshot de tu página web o redes sociales",
  "📋 Una factura, un menú o una lista de precios",
  "🏷️ Tu logotipo o tarjeta de presentación",
  "📝 El nombre de tu negocio o tu nombre profesional",
  "🔧 Una imagen del rubro al que te dedicas",
  "👤 Tu foto de perfil si tú eres tu propia marca",
  "📊 Un organigrama, un diagrama o cualquier documento",
];

export default function ImageUpload({ onAnalysisComplete }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [context, setContext] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const analyze = async () => {
    if (!file || !preview) return;
    setAnalyzing(true);
    setProgress(10);

    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 85));
    }, 500);

    try {
      const base64 = preview.split(",")[1];
      const { data, error } = await supabase.functions.invoke("analyze-image", {
        body: { image: base64, mimeType: file.type, context },
      });

      clearInterval(interval);
      setProgress(100);

      if (error) throw error;
      onAnalysisComplete(data as AnalysisResult);
    } catch (err) {
      console.error("Analysis error:", err);
      clearInterval(interval);
    } finally {
      setTimeout(() => setAnalyzing(false), 500);
    }
  };

  const clear = () => {
    setFile(null);
    setPreview(null);
    setContext("");
    setProgress(0);
  };

  return (
    <section id="upload" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="inline-block gradient-rainbow text-primary-foreground font-display font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            ✨ 100% GRATIS — Sin registro
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Paso 1: Sube <span className="gradient-rainbow-text">cualquier imagen</span> de lo que haces
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            No importa si tienes empresa, eres freelancer, o apenas estás empezando.
            <span className="font-semibold text-foreground"> Si haces algo, esto es para ti.</span>
          </p>
        </motion.div>

        {/* Examples grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {examples.map((ex, i) => (
            <span
              key={i}
              className="text-xs bg-secondary/60 text-secondary-foreground px-3 py-1.5 rounded-full"
            >
              {ex}
            </span>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="dropzone"
              className={`glass rounded-3xl p-12 text-center cursor-pointer transition-colors ${
                dragOver ? "border-primary bg-primary/5" : "hover:border-primary/30"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const f = (e.target as HTMLInputElement).files?.[0];
                  if (f) handleFile(f);
                };
                input.click();
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-display font-semibold text-foreground">
                👆 Arrastra tu imagen aquí
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                o haz clic para seleccionar — vale cualquier foto, screenshot o imagen
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                No necesitas datos sensibles. Con una simple imagen del rubro basta.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              className="glass rounded-3xl p-6 space-y-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-80 object-contain rounded-xl"
                />
                {!analyzing && (
                  <button
                    onClick={clear}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
                <span>{file?.name}</span>
              </div>

              {/* Context field */}
              {!analyzing && (
                <div className="space-y-2">
                  <label className="text-sm font-display font-medium text-foreground">
                    Cuéntanos más (opcional)
                  </label>
                  <Textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Ej: Soy fotógrafa freelance y quiero automatizar cómo consigo clientes... / Este es mi restaurante, quiero mejorar mis pedidos..."
                    className="bg-background/50 rounded-xl text-sm min-h-[80px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Entre más nos cuentes, mejor será tu Blueprint. Pero si prefieres no escribir nada, también funciona.
                  </p>
                </div>
              )}

              {analyzing && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generando tu Blueprint...
                  </p>
                </div>
              )}
              {!analyzing && (
                <Button
                  onClick={analyze}
                  className="w-full btn-glow gradient-rainbow text-primary-foreground font-display font-semibold rounded-xl py-5 hover:opacity-90 transition-opacity"
                >
                  Generar mi Blueprint
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}