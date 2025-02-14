import perfil from '@/data/perfil.json';
import curiosidades from '@/data/curiosidades.json';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

let history = []; // Histórico temporário

// Função para buscar curiosidades
function buscarCuriosidade(message) {
  const palavras = message.toLowerCase().split(' ');
  for (const palavra of palavras) {
    const curiosidadeEncontrada = curiosidades.find(
      (item) => item.palavraChave.toLowerCase() === palavra
    );
    if (curiosidadeEncontrada) {
      return curiosidadeEncontrada.curiosidade;
    }
  }
  return null;
}

// Função para buscar informações do perfil
function buscarInformacao(message) {
  const mensagemLower = message.toLowerCase();

  if (mensagemLower.includes('idade')) {
    return `Minha idade é ${perfil.idade}.`;
  }

  if (mensagemLower.includes('data de nascimento') || mensagemLower.includes('nascimento')) {
    return `Minha data de nascimento é ${perfil.datanascimento}.`;
  }

  if (mensagemLower.includes('endereço')) {
    return `Meu endereço é ${perfil.endereço}.`;
  }

  if (mensagemLower.includes('hobbies') || mensagemLower.includes('hobby')) {
    return `Meus hobbies incluem: ${perfil.hobbies.join(', ')}.`;
  }
  if (mensagemLower.includes('cor') || mensagemLower.includes('cor')) {
    return `Minha cor de pele é ${perfil.cor}.`;
  }

  return null; // Retorna null se nenhuma palavra-chave for encontrada
}

export async function POST(req) {
  try {
    // Obter dados do corpo da requisição
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Mensagem ausente" }, { status: 400 });
    }

    // Adicionar mensagem do usuário ao histórico
    history.push({ role: "user", content: message });

    // Verificar se existe uma curiosidade relacionada
    const curiosidade = buscarCuriosidade(message);
    if (curiosidade) {
      return NextResponse.json({ reply: curiosidade });
    }

    // Verificar se existe uma informação do perfil relacionada
    const informacao = buscarInformacao(message);
    if (informacao) {
      return NextResponse.json({ reply: informacao });
    }

    // Criar o prompt combinando o perfil com a mensagem do usuário
    const prompt = `
      Aqui estão os dados do meu perfil:
      Nome: ${perfil.nome}
      Profissão: ${perfil.profissao}
      Experiência profissional:
      ${perfil.experiencia.map((exp) => `- ${exp.cargo} na ${exp.empresa} (${exp.periodo}): ${exp.descricao}`).join('\n')}
      Habilidades: ${perfil.habilidades.join(', ')}
      Educação: ${perfil.educacao.map((edu) => `${edu.curso} na ${edu.instituicao} (${edu.periodo})`).join(', ')}

      Usuário: ${message}
    `;

    // Instanciar o cliente Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Obter o modelo especificado
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Gerar conteúdo com o prompt personalizado
    const result = await model.generateContent(prompt);

    const reply = result.response.candidates[0].content.parts[0].text || "Desculpe, não consegui gerar uma resposta.";

    // Adicionar a resposta da IA ao histórico
    history.push({ role: "ai", content: reply });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    return NextResponse.json({ error: "Erro ao processar a requisição." }, { status: 500 });
  }
}
