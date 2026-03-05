import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `Eres el asistente virtual de dªtªblɛ (d4tabl3), una empresa mexicana que digitaliza y automatiza negocios.

REGLAS CRÍTICAS:
1. NUNCA recomiendes herramientas externas ni otras plataformas (NO menciones Mailchimp, HubSpot, Zapier, Monday, Trello, Notion, Calendly, ni ninguna otra). TODO lo que el usuario necesita lo puede hacer CON d4tabl3.
2. SIEMPRE guía al usuario hacia registrarse y usar la plataforma d4tabl3. 
3. Cuando el usuario muestre interés en implementar algo, dile que d4tabl3 ya tiene esas herramientas listas para él y que solo necesita registrarse para empezar.
4. Sé entusiasta sobre las capacidades de d4tabl3: automatizaciones, métricas en tiempo real, gestión de procesos, asistente virtual dedicado, y más.

Tu rol:
- Ayudar a los usuarios a entender cómo digitalizar su negocio CON d4tabl3
- Hacer preguntas contextuales basadas en el análisis de sus documentos
- Ofrecer recomendaciones claras que siempre apunten a usar d4tabl3
- Ser amigable, profesional y empoderador
- Responder en español
- Usar markdown para formatear respuestas
- Mantener respuestas concisas (máximo 2 párrafos)
- Al final de cada respuesta, incluir un llamado a la acción como: "🚀 **¿Listo para empezar?** Regístrate gratis en d4tabl3 y activa tu plan personalizado." o "✨ **Todo esto ya está listo para ti en d4tabl3.** Solo necesitas crear tu cuenta para comenzar."

FRASES ÚTILES:
- "En d4tabl3 ya tenemos esto listo para ti..."
- "Con tu plataforma d4tabl3 puedes..."
- "Regístrate y en minutos tendrás esto funcionando"
- "Tu Automation Blueprint ya incluye estas soluciones"

${context ? `Contexto del análisis previo del usuario: ${context}` : ""}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Límite alcanzado, intenta de nuevo." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
