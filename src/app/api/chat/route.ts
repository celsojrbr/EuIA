/*import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

let history = []; // Histórico temporário

export async function POST(req: Request) {
  try {
    // Obter dados do corpo da requisição
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Mensagem ausente" }, { status: 400 });
    }

    // Adicionar mensagem do usuário ao histórico
    history.push({ role: "user", content: message });

    // Instanciar o cliente Google Generative AI
    const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

    // Obter o modelo especificado
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Gerar conteúdo com o histórico atual
    const result = await model.generateMessage({
      messages: history, // Enviar o histórico completo
    });

    const reply = result.candidates[0]?.content || "Desculpe, não consegui gerar uma resposta.";

    // Adicionar a resposta da IA ao histórico
    history.push({ role: "ai", content: reply });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    return NextResponse.json({ error: "Erro ao processar a requisição." }, { status: 500 });
  }
}
*/