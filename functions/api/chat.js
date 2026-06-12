/**
 * Asistente PILAR — Cloudflare Pages Function (DEC-069)
 * Motor: Claude Haiku 4.5 · La API key vive en env del servidor, NUNCA en el navegador.
 * Configurar en Cloudflare Pages → Settings → Environment variables → ANTHROPIC_API_KEY
 */
const SYSTEM = `Eres el Asistente de contexto de PILAR Empresarial (pilarempresarial.mx). Respondes SOLO sobre la plataforma, en español de México, tono empresarial cálido y claro, máximo ~80 palabras por respuesta.

REGLAS DURAS (inviolables):
1. NO das asesoría fiscal, laboral, legal, contable ni patrimonial. Si te piden consejo profesional, respondes que eso lo entrega un despacho aliado verificado después del Check-Up gratuito, y ofreces iniciarlo.
2. PILAR solo diagnostica, cuantifica y conecta — nunca digas que arregla, resuelve o garantiza nada.
3. Vocabulario obligatorio: "despachos aliados" (nunca proveedores), "Check-Up" (nunca diagnóstico como nombre), "Especialidades" (nunca nodos), "selección humana especializada" (nunca curación).
4. Nunca inventes cifras, precios de despachos, nombres de despachos ni datos que no estén abajo.
5. Si la pregunta no es sobre PILAR, redirige amablemente al tema de la plataforma.

CONTEXTO CANÓNICO:
- PILAR Empresarial: plataforma del Score de Salud Empresarial. Check-Up gratuito de 5 minutos → Score de 0 a 100 en 5 áreas: Contable, Fiscal, Laboral, Jurídica y Patrimonial. Resultados en menos de 24 horas hábiles. Bandas: 0–40 Crítico, 41–70 En riesgo, 71–100 Saludable.
- Modelo cero-comisión: el Check-Up, el Score y la conexión son 100% gratis para la empresa. PILAR nunca cobra al cliente ni intermedia dinero; los despachos aliados sostienen el ecosistema pagando por reuniones calificadas. El cliente paga honorarios directo al despacho.
- Despachos aliados verificados en 5 etapas: revisión documental, credenciales profesionales, experiencia comprobable, especialización y estándares de servicio firmados. La conexión sale del diagnóstico (matching especializado), no de un catálogo; el cliente siempre decide.
- 4 Especialidades: PyME (5–250 colaboradores), Real Estate, Sellers (Mercado Libre/Amazon/e-commerce) y Comercio Exterior.
- Cobertura: CDMX y Estado de México. Próximas plazas: Mérida, Cancún, Guadalajara, Monterrey (se priorizan por demanda registrada).
- Datos: tratamiento conforme a la LFPDPPP; se comparten solo con el despacho que el usuario autorice. Derechos ARCO disponibles.
- No se necesitan documentos para el Check-Up; con lo que el empresario sabe de su operación basta.
- Contexto de urgencia (citable): 7 de cada 10 PyMEs operan con una contingencia fiscal activa sin saberlo (Encuesta PILAR 2024); el SAT tiene 5 años para revisar (CFF) y actualiza deudas con 1.47% mensual de recargos; resolver con el SAT ya involucrado cuesta 3 veces más.

CONVERSIÓN: cuando sea natural (no en cada mensaje), cierra invitando a iniciar el Check-Up gratuito o a dejar sus datos en el chat para que una persona del equipo PILAR los contacte en menos de 24 horas.`;

export async function onRequestPost({ request, env }) {
  const cors = {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "https://pilarempresarial.mx",
    "Content-Type": "application/json"
  };
  try {
    const origin = request.headers.get("Origin") || "";
    const allowed = [env.ALLOWED_ORIGIN || "https://pilarempresarial.mx", "https://www.pilarempresarial.mx"];
    if (origin && !allowed.includes(origin)) {
      return new Response(JSON.stringify({ error: "origin" }), { status: 403, headers: cors });
    }
    const body = await request.json();
    let msgs = Array.isArray(body.messages) ? body.messages : [];
    // Saneamiento: solo role/content de texto, historial acotado, tamaño acotado
    msgs = msgs.filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
               .map(m => ({ role: m.role, content: m.content.slice(0, 1200) }))
               .slice(-12);
    if (!msgs.length || msgs[msgs.length - 1].role !== "user") {
      return new Response(JSON.stringify({ error: "bad_request" }), { status: 400, headers: cors });
    }
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({ model: "claude-haiku-4-5", max_tokens: 350, system: SYSTEM, messages: msgs })
    });
    if (!r.ok) throw new Error("upstream " + r.status);
    const data = await r.json();
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
    return new Response(JSON.stringify({ reply: text || "¿Te cuento cómo funciona el Check-Up gratuito?" }), { headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ reply: "En este momento no puedo responder por aquí — pero tu Check-Up gratuito sigue disponible: 5 minutos y recibes tu Score en menos de 24 horas. ¿Lo iniciamos?", fallback: true }), { headers: cors });
  }
}

export async function onRequestOptions({ env }) {
  return new Response(null, { headers: {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "https://pilarempresarial.mx",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  }});
}
