import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, Edit2, Lightbulb, Settings, BarChart3 } from "lucide-react";
import type { AnalysisResult } from "./ImageUpload";

interface Props {
  result: AnalysisResult;
  onUpdate: (result: AnalysisResult) => void;
}

export default function AnalysisResults({ result, onUpdate }: Props) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const updateField = (idx: number, value: string) => {
    const updated = { ...result, extractedData: [...result.extractedData] };
    updated.extractedData[idx] = { ...updated.extractedData[idx], value };
    onUpdate(updated);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-display font-bold">
            Análisis <span className="gradient-rainbow-text">Completado</span>
          </h2>
          <p className="text-muted-foreground mt-2">{result.summary}</p>
        </motion.div>

        {/* Score */}
        <motion.div
          className="glass rounded-2xl p-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <BarChart3 className="mx-auto h-8 w-8 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Potencial de Digitalización</p>
          <p className="text-5xl font-display font-bold gradient-rainbow-text mt-1">
            {result.digitalizationScore}%
          </p>
        </motion.div>

        {/* Extracted data cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.extractedData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card className="glass border-border/50 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center justify-between">
                    {item.label}
                    <button
                      onClick={() => setEditingIdx(editingIdx === i ? null : i)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {editingIdx === i ? <CheckCircle className="h-4 w-4 text-primary" /> : <Edit2 className="h-4 w-4" />}
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {editingIdx === i ? (
                    <Input
                      value={item.value}
                      onChange={(e) => updateField(i, e.target.value)}
                      className="bg-background/50"
                      autoFocus
                    />
                  ) : (
                    <p className="text-foreground font-medium">{item.value}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Processes */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Procesos Identificados
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.processes.map((p, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
                {p}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Recomendaciones
          </h3>
          <ul className="space-y-3">
            {result.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
