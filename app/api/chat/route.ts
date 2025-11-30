import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensaje inválido" },
        { status: 400 }
      );
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "Eres el asistente oficial de B-cita Soluciones. Respondes en español, de forma clara, profesional y enfocada en automatización, Power Platform, SharePoint, n8n e Inteligencia Artificial aplicada a negocios.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = (response as any).output_text || "No pude generar respuesta.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu mensaje." },
      { status: 500 }
    );
  }
}
