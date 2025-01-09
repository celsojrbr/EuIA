# Assistente Pessoal com IA

Um assistente pessoal baseado em IA que responde perguntas sobre o seu perfil, curiosidades e outras informações personalizadas. O projeto utiliza **Next.js 15.1**, **Google Generative AI (Gemini)** e dados JSON para criar respostas ricas e contextuais.

---

## 🚀 Funcionalidades

- **Perfil Personalizado**: Responde perguntas sobre informações pessoais (idade, data de nascimento, endereço, hobbies, etc.) baseadas em um arquivo JSON.
- **Curiosidades**: Reconhece palavras-chave e retorna curiosidades pré-definidas.
- **IA Generativa**: Gera respostas dinâmicas utilizando o modelo Gemini da Google Generative AI.
- **Histórico de Conversas**: Mantém o contexto de mensagens para respostas mais relevantes.

---

## 🛠️ Tecnologias Utilizadas

- **Front-End**: React com Next.js 15.1
- **Back-End**: Next.js API Route
- **IA**: Google Generative AI (Gemini)
- **Estilização**: TailwindCSS
- **Gerenciamento de Dados**: JSON para informações de perfil e curiosidades

---

## 📂 Estrutura do Projeto

├── src │ ├── app │ │ ├── api │ │ │ ├── generate │ │ │ │ ├── route.js # Lógica da API para o assistente │ ├── data │ │ ├── perfil.json # Dados do perfil │ │ ├── curiosidades.json # Dados de curiosidades


---

## ⚙️ Pré-Requisitos

- **Node.js** (v18 ou superior)
- **NPM** ou **Yarn**
- Conta no Google Cloud com acesso ao **Google Generative AI API (Gemini)**

---

## 🛠️ Configuração do Projeto

### 1. Clone o Repositório
```bash
git clone https://github.com/celsojrbr/EuIA
cd NOME_DO_REPOSITORIO
