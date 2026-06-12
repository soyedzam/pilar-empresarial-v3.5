# PILAR Empresarial — Kit de Deploy v3.1 (Plataforma multi-página + Chat IA + Score Exprés)
**Dominio:** https://pilarempresarial.mx/ · **Arquitectura:** 42 páginas HTML reales + `assets/` + `functions/api/chat.js`

## 1. Estructura
- 42 archivos `.html` en la raíz (41 originales + `score-expres.html`)
- `assets/styles.css` · `assets/app.js` · `assets/chat.js` (Asistente PILAR)
- `functions/api/chat.js` — backend del chat (Cloudflare Pages Functions)
- `_headers` (seguridad Cloudflare) · `vercel.json` (alternativa con headers equivalentes)
- `sitemap.xml` (41 URLs) · `robots.txt` · `llms.txt`

## 2. Deploy recomendado: GitHub → Cloudflare Pages (DEC-072)
1. Crear repo en GitHub y subir la carpeta completa.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → conectar el repo. Build: ninguno (sitio estático); output: raíz.
3. **Variables de entorno** (Settings → Environment variables, Production):
   - `ANTHROPIC_API_KEY` = tu API key (Secret — nunca va al navegador)
   - `ALLOWED_ORIGIN` = `https://pilarempresarial.mx`
4. Custom domain → pilarempresarial.mx (DNS en Cloudflare = WAF, anti-DDoS y bot management activos).
5. Seguridad extra (5 min): Security → WAF → rate limiting rule en `/api/chat` (sugerido: 20 req/min por IP).
6. Clean URLs: Cloudflare Pages las sirve nativo (`/checkup` → checkup.html).

**Alternativa Vercel:** mismo repo; `vercel.json` ya trae cleanUrls + headers. El chat requeriría mover `functions/api/chat.js` a `api/chat.js` formato Vercel (avisar a Claude para convertirlo).

**Supabase: no se usa en esta fase.** Los leads viven en CX; el chat es stateless. Se incorpora base de datos solo cuando llegue el Expediente de Salud Empresarial.

## 3. Activaciones pendientes
| Pendiente | Dónde | Acción |
|---|---|---|
| **GA4** | `G-XXXXXXX` en TODAS las páginas (head) | Buscar y reemplazar global. analytics.google.com → Administrar → Flujos de datos → flujo Web. Eventos cableados: `checkup_completed`, `lead_submit`, `whatsapp_click`, `chat_open`, `chat_message`, `chat_lead_submit`, `score_expres_started`, `score_expres_completed`. |
| **API key Anthropic** | Variable de entorno en Cloudflare | Crear key en console.anthropic.com → pegar como `ANTHROPIC_API_KEY`. Modelo: claude-haiku-4-5 (bajo costo). |
| **Webhooks CX** | `form[data-cx-form]` (22 formularios) + `<!-- CX WEBHOOK: chat-lead -->` en assets/chat.js | Conectar envío al webhook CX de cada tipo. |
| ~~WhatsApp~~ | ✅ CONECTADO (v3.0.2) | wa.me/525574250656 activo en todas las páginas con tracking `whatsapp_click`. |
| **VSL** | comentario `<!-- VSL (YouTube):` en index.html | Insertar embed del video. |
| Imagen OG | `/assets/og-pilar.jpg` | Crear y subir 1200×630. |

## 4. Testimonios WhatsApp (§2b heredado)
Los 3 chats y 6 testimonios son contenido semilla de maqueta. Reemplazar por reales autorizados antes del go-live (política de honestidad, Brand Messaging §17). ⚠ Incluye el subtítulo "Conversaciones reales…" de la sección.

## 5. Checklist post-deploy
1. Probar 5 páginas al azar + score-expres (flujo completo) + el chat (pregunta y captura de lead).
2. Enviar `sitemap.xml` en Search Console.
3. Validar schemas en validator.schema.org y headers en observatory.mozilla.org (objetivo A+).
4. Envío de prueba por formulario y por chat → verificar eventos en GA4 tiempo real.

---
Designed by [Soul Lens](https://soullensstudios.live) · Powered by [Xplorers Startups](https://xplorerstartups.ai)


## VSL (YouTube)
1. Sube el video a YouTube (no listado está bien).
2. Copia el ID (lo que va después de `v=` en la URL).
3. En `index.html`, busca `id="vslBox"` y reemplaza `data-yt="PENDIENTE"` por `data-yt="TU_ID"`.
4. Poster del video: guarda la imagen del equipo como `assets/equipo-pilar.jpg` (16:9). El player carga YouTube solo al hacer clic (cero peso en la carga inicial) y dispara el evento GA4 `vsl_play`.

## Conexión de leads (CX) — 1 sola constante
Todos los formularios (22) y el lead del chat envían a UNA constante:
1. En CX crea un Inbound Webhook y copia la URL.
2. Abre `assets/app.js` línea 2: pega la URL en `CX_WEBHOOK_URL = "..."`.
3. Listo: cada envío llega como JSON con `_form` (cuál formulario), `_page` (desde qué página), `_ts` y los campos del usuario.
⚠ Hasta no pegar esa URL, los leads de formularios NO se guardan (solo evento GA4). Conectar ANTES de mandar tráfico.

## Checklist final de credenciales para go-live
| Credencial | Dónde se pega | Estado |
|---|---|---|
| GA4 `G-XXXXXXX` | buscar y reemplazar en las 42 páginas (2 lugares por página) | PENDIENTE |
| Webhook CX | `assets/app.js` → `CX_WEBHOOK_URL` | PENDIENTE |
| `ANTHROPIC_API_KEY` | Cloudflare Pages → Settings → Environment variables | PENDIENTE |
| `ALLOWED_ORIGIN` | misma sección → `https://pilarempresarial.mx` | PENDIENTE |
| ID YouTube del VSL | `index.html` → `data-yt="..."` | PENDIENTE (opcional al launch) |
| Email real | confirmar que `info@pilarempresarial.mx` existe como buzón | PENDIENTE |
| Teléfono para schema/GMB | confirmar si 55 7425 0656 es también la línea oficial | PENDIENTE |

## PILAR Motion System v1 (DEC-075)
- `assets/motion.js` (6 KB, cero dependencias) + tokens en styles.css. Capa progresiva: sin JS la página es 100% funcional.
- Auto-detección: `prefers-reduced-motion` → estático equivalente · gama baja/ahorro de datos → modo lite automático.
- Overrides de demo/QA: `?motion=full` y `?motion=lite`.
- Efectos: tipografía cinética en héroe (demo reel 1 vez por sesión), spotlight reactivo al cursor, reveals escalonados con pase de rescate, botones magnéticos, tilt en cards (delegado), header liquid glass, View Transitions entre páginas, easter egg (4 clics al ISO).
- Presupuesto CWV validado: LCP 292ms · CLS 0 (antes 552ms · 0).

## Medición — GTM (DEC-077, sustituye GA4 directo)
- Contenedor `GTM-WNWC499F` instalado en las 42 páginas (head + noscript). CONECTADO ✓
- Dentro de GTM falta configurar: (1) etiqueta "Google Analytics: GA4" con tu Measurement ID, disparador All Pages; (2) los 9 eventos llegan al dataLayer con estos nombres — crear triggers de Evento personalizado: lead_submit, checkup_completed, whatsapp_click, chat_open, chat_message, chat_lead_submit, score_expres_started, score_expres_completed, vsl_play.
- Publicar el contenedor (botón Enviar) para que todo quede en vivo.
