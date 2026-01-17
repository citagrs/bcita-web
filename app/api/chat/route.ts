import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatMsg = { role: "user" | "assistant"; content: string };

function isValidChatMsg(m: any): m is ChatMsg {
  return (
    m &&
    (m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string" &&
    m.content.trim().length > 0
  );
}

function hasMinimumLead(lead: any) {
  return !!(
    lead &&
    typeof lead.nombre === "string" &&
    lead.nombre.trim() &&
    typeof lead.empresa === "string" &&
    lead.empresa.trim() &&
    typeof lead.email === "string" &&
    lead.email.trim() &&
    typeof lead.problema === "string" &&
    lead.problema.trim()
  );
}

function extractFirstJsonObject(text: string) {
  const start = text.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    if (depth === 0) {
      const candidate = text.slice(start, i + 1);
      try {
        return JSON.parse(candidate);
      } catch {
        return null;
      }
    }
  }
  return null;
}


export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
    }

    // ✅ Compatibilidad: acepta message(string) o messages(array)
    let userMessages: ChatMsg[] = [];

    if (typeof (body as any).message === "string") {
      const text = (body as any).message.trim();
      if (!text) {
        return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
      }
      userMessages = [{ role: "user", content: text }];
    } else if (Array.isArray((body as any).messages)) {
      const msgs = (body as any).messages;
      const ok = msgs.every(isValidChatMsg);
      if (!ok) {
        return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
      }
      userMessages = msgs.map((m: any) => ({
        role: m.role,
        content: String(m.content),
      }));
    } else {
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
    }

    const lead = (body as any).lead ?? {};
    const sessionId = typeof (body as any).sessionId === "string" ? (body as any).sessionId : "";

    // Prompt: más orientado a diagnóstico + demo + captura
    const systemPrompt = `
Eres el Asistente de B-cita Soluciones y Automatización (Colombia).

OBJETIVO
En máximo 4–5 turnos:
1) Entender el problema principal del negocio
2) Proponer 1–2 automatizaciones concretas
3) Captar un lead calificado (nombre, empresa, email)

TONO
Cercano, profesional, claro, enfocado en resultados.
Habla como asesor, no como entrevistador.

ESTRUCTURA OBLIGATORIA (NO TE SALTES PASOS)

ETAPA 1 – CONTEXTO (máx. 2 preguntas)
Obtén SOLO:
- Tipo de negocio
- Canal por donde ocurre el proceso (ej. WhatsApp)
- Cómo se hace hoy (Excel, cuaderno, manual)

ETAPA 2 – IMPACTO (máx. 2 preguntas)
Obtén SOLO:
- Volumen aproximado (día O semana, no ambos)
- Urgencia (baja / media / alta)

ETAPA 3 – CIERRE (OBLIGATORIO)
Cuando ya tengas:
- canal
- forma actual
- volumen aproximado
- urgencia

DEBES:
1) Resumir el problema en 2–3 líneas
2) Proponer 1–2 automatizaciones concretas y simples
3) Pedir nombre, empresa y correo para enviar el resumen

REGLAS ESTRICTAS (MUY IMPORTANTES)
- NO repitas preguntas ya respondidas por el usuario.
- NO preguntes volumen más de una vez.
- NO preguntes día Y semana: elige una sola.
- NO sigas preguntando después de conocer la urgencia.
- NUNCA pidas confirmación más de una vez.
- Si el usuario responde “sí”, “ok”, “de acuerdo” o similar a una solicitud de envío, procede directamente al envío.
- NO vuelvas a pedir confirmación.
- NO hagas más de 1 pregunta por mensaje.
- NO preguntes por “otros procesos” antes de captar el lead.
- Si el usuario muestra urgencia alta, pasa DIRECTAMENTE a propuesta y cierre.
- Si ya hiciste 4–5 preguntas, CIERRA aunque falte detalle menor.

CAPTURA DE LEAD
Si faltan nombre, empresa o email:
- Pídelos de forma directa y amable.
- No sigas preguntando nada técnico.

ENVÍO
- Solo establece shouldSendLead = true cuando el usuario confirme que desea enviar el resumen (ej. “sí”, “enviar”, “ok”).
- Considera “sí”, “ok”, “confirmo” o “de acuerdo” como autorización explícita para enviar el resumen.
- Cuando shouldSendLead sea true, NO incluyas mensajes de cierre como “ya envié”, “listo” o “te contactaremos”.
  El mensaje final de confirmación lo maneja el sistema, no tú.


FORMATO DE RESPUESTA (OBLIGATORIO)
Responde SIEMPRE en JSON ESTRICTO con esta estructura exacta:

{
  "reply": "Texto breve y claro para el usuario",
  "extracted": {
    "nombre": "",
    "empresa": "",
    "email": "",
    "problema": "",
    "herramientas": [],
    "urgencia": "",
    "chatSummary": "",
    "chatProposals": []
  },
  "shouldSendLead": false
}

IMPORTANTE
- El campo reply NUNCA debe incluir JSON, código ni bloques técnicos.
- El reply debe confirmar primero y luego preguntar o cerrar.


`.trim();

    // Le pasamos contexto de lead ya capturado (para no preguntar de nuevo)
    const leadContext = {
      role: "user" as const,
      content:
        `Contexto previo (si existe):\n` +
        `sessionId: ${sessionId || "N/A"}\n` +
        `leadActual: ${JSON.stringify(lead)}\n\n` +
        `Ahora continúa la conversación y genera salida JSON estricta.`,
    };

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: systemPrompt },
        leadContext,
        ...userMessages,
      ],
    });

    const raw = (response as any).output_text || "";

    // Intentamos parsear el JSON estricto que pedimos
    let parsed: any = null;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = extractFirstJsonObject(raw);
    }

    if (!parsed) {
      // Fallback: devolvemos texto, pero NUNCA "pegamos" JSON al usuario
      return NextResponse.json({
        reply: raw?.replace(/```json[\s\S]*?```/g, "").trim() || "No pude generar respuesta.",
        extracted: {},
        shouldSendLead: false,
      });
    }


    const reply = typeof parsed.reply === "string" ? parsed.reply : "No pude generar respuesta.";
    const extracted = parsed.extracted && typeof parsed.extracted === "object" ? parsed.extracted : {};
    let shouldSendLead = !!parsed.shouldSendLead;

    // Capa de seguridad: solo permitimos shouldSendLead si hay mínimos
    const mergedLead = { ...lead, ...extracted };
    if (shouldSendLead && !hasMinimumLead(mergedLead)) {
      shouldSendLead = false;
    }

    return NextResponse.json({ reply, extracted, shouldSendLead });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu mensaje." },
      { status: 500 }
    );
  }
}
