import OpenAI from 'openai';
import { BASE_SYSTEM_PROMPT } from "../../lib/constants";

// Configuramos el cliente original de OpenAI con la Gateway de Helicone
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://ai-gateway.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    
    // 1. Extraemos los mensajes (la clave para que Helicone registre)
    const incoming = body.messages || [];
    
    // 2. Capturamos la última pregunta para tu dashboard
    const lastUser = incoming.findLast((m: any) => m.role === "user")?.content || "Pregunta no encontrada";

    // 3. Llamada directa a OpenAI (sin streaming para asegurar el registro)
    const completion = await client.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: BASE_SYSTEM_PROMPT },
          ...incoming
        ],
        temperature: 0.7,
      },
      {
        headers: {
          // Esto es lo que llenaba tu columna en Helicone
          "Helicone-Property-User-Question": lastUser,
        },
      } as any // El 'as any' evita que TS se queje en tu versión actual
    );

    // 4. Devolvemos el JSON que tu page.tsx original sabía leer
    return Response.json({
      reply: completion.choices[0]?.message?.content?.trim() ?? "",
    });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}