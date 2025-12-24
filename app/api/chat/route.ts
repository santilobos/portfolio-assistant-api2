import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { BASE_SYSTEM_PROMPT } from "../../lib/constants";

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // Extraemos la última pregunta para Helicone
  const lastUser = messages.findLast((m: any) => m.role === "user")?.content || "";

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      { role: "system", content: BASE_SYSTEM_PROMPT },
      ...messages
    ],
    temperature: 0.7,
    // Headers de Helicone para analítica
    headers: {
      "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
      "Helicone-Property-User-Question": lastUser,
    },
  });

  // ESTA ES LA FUNCIÓN CORRECTA PARA TU VERSIÓN
  return result.toTextStreamResponse();
}