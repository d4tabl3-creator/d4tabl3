import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { image, mimeType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Eres un experto analista de negocios de dªtªblɛ. Analiza imágenes de documentos de negocio (facturas, organigramas, diagramas, catálogos) y extrae información relevante para proponer soluciones de digitalización.

DEBES responder usando la función proporcionada.`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analiza esta imagen de negocio. Extrae datos clave, identifica procesos y sugiere recomendaciones de digitalización.",
              },
              {
                type: "image_url",
                image_url: { url: `data:${mimeType};base64,${image}` },
              },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_business_document",
              description: "Retorna el análisis estructurado del documento de negocio",
              parameters: {
                type: "object",
                properties: {
                  summary: { type: "string", description: "Resumen breve del documento analizado (1-2 frases)" },
                  extractedData: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        label: { type: "string" },
                        value: { type: "string" },
                      },
                      required: ["label", "value"],
                    },
                    description: "Datos clave extraídos (mínimo 4 items)",
                  },
                  recommendations: {
                    type: "array",
                    items: { type: "string" },
                    description: "3-5 recomendaciones de digitalización",
                  },
                  processes: {
                    type: "array",
                    items: { type: "string" },
                    description: "Procesos de negocio identificados",
                  },
                  digitalizationScore: {
                    type: "number",
                    description: "Puntuación del 0-100 del potencial de digitalización",
                  },
                },
                required: ["summary", "extractedData", "recommendations", "processes", "digitalizationScore"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_business_document" } },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Límite de solicitudes alcanzado. Intenta de nuevo en unos momentos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-image error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
