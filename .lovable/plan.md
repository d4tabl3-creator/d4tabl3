
# Plan: Plataforma Interactiva dªtªblɛ

## Visión General
Una plataforma web responsive que guía a los usuarios a descubrir cómo dªtªblɛ puede digitalizar y automatizar su negocio, usando IA real para analizar imágenes de documentos de negocio y ofrecer recomendaciones personalizadas.

---

## 1. Landing Page con Branding dªtªblɛ
- **Hero animado** con el logotipo colorido de dªtªblɛ (estilizado con letras multicolor como en el sitio actual)
- Fondo oscuro con gradientes sutiles púrpura/negro, acentos en verde esmeralda y arcoíris
- Headline principal: "Del prototipo a la plataforma. Sin caos."
- CTAs prominentes: "Solicitar Demo Express" y "Cuéntanos tu historia"
- Animaciones de entrada suaves (fade-in, scale-in)

## 2. Sección de Servicios ("Habilidades & Magia")
- Tarjetas con borde glassmorphism sobre fondo oscuro
- ⚡ Automatización Real, 🚀 Impacto en el Mundo Real, 🧠 Sistemas Inteligentes, 🔗 Integración Total
- Cada tarjeta con emoji, título y descripción concisa

## 3. Sección Filosofía dªtªblɛ
- Bloque destacado: "Sabemos lo que hacemos, pero nos encanta divertirnos"
- Botón con gradiente arcoíris hacia la siguiente sección

## 4. Módulo de Carga de Imágenes + Análisis IA
- Zona de drag & drop para cargar imágenes de negocio (facturas, organigramas, procesos)
- Barra de progreso animada durante el análisis
- La IA (Lovable AI con modelo Gemini) analiza la imagen y extrae información clave
- Visualización interactiva de los datos extraídos en tarjetas editables por el usuario

## 5. Chat con Asistente Virtual IA
- Chat en vivo con streaming de respuestas en tiempo real
- El asistente hace preguntas contextuales basadas en la imagen analizada
- Markdown rendering para respuestas ricas
- Diseño integrado en la experiencia (panel lateral o modal)

## 6. Panel de Descubrimiento / Dashboard
- Visualización del progreso de digitalización con barras y gráficos (recharts)
- Recomendaciones de soluciones dªtªblɛ generadas por la IA
- Elementos de gamificación: barra de progreso del "plan de digitalización", insignias al completar pasos

## 7. Generador de Propuesta de Digitalización
- Al final del flujo, se genera automáticamente un "Plan de Digitalización" personalizado
- Incluye herramientas recomendadas, procesos identificados y precios estimados
- Botón para descargar o compartir la propuesta

## 8. Sección de Contacto / CTA Final
- "¿Listo para escalar?" con botones para iniciar chat o enviar correo
- Footer con datos de dªtªblɛ (Ciudad de México, contacto@datable.com)

## 9. Backend (Lovable Cloud)
- Edge function para chat con IA (streaming SSE via Lovable AI Gateway)
- Edge function para análisis de imágenes (envío a modelo multimodal Gemini)
- Storage para imágenes cargadas por usuarios

## Stack Técnico
- Frontend: React + Tailwind + animaciones personalizadas
- IA: Lovable AI Gateway (Gemini 3 Flash)
- Backend: Lovable Cloud (edge functions + storage)
- Gráficos: Recharts para visualizaciones de datos
- Responsive: diseño mobile-first que se adapta a desktop
