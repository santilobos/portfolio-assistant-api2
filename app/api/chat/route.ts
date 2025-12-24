import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { BASE_SYSTEM_PROMPT } from "../../lib/constants";

// 1. Configuramos el cliente con la Gateway de Helicone (como antes)
const heliconeOpenAI = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://ai-gateway.helicone.ai/v1",
  headers: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

export const runtime = 'edge';

export async function POST(req: Request) {
  // 2. Extraemos los mensajes del body (igual que en tu código anterior)
  const body = await req.json().catch(() => ({}));
  const incoming = body.messages || [];
  
  // 3. Tu lógica de captura de pregunta que ya funcionaba
  const lastUser = incoming.findLast((m: any) => m.role === "user")?.content || "Pregunta no encontrada";

  // 4. Activamos el streaming para evitar el timeout de Vercel
  const result = await streamText({
    model: heliconeOpenAI('gpt-4o-mini'),
    messages: [
      { role: "system", content: BASE_SYSTEM_PROMPT },
      ...incoming
    ],
    temperature: 0.7,
    headers: {
      // Tu propiedad personalizada de Helicone
      "Helicone-Property-User-Question": lastUser,
    },
  });

  // 5. Devolvemos un flujo de texto en lugar de un JSON estático
  return result.toTextStreamResponse();
}