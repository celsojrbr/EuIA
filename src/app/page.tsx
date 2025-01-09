'use client';
import React, { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Desculpe, houve um erro ao processar sua mensagem.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <div className="overflow-y-auto max-h-96 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-3 rounded ${
                msg.role === 'ai' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow border rounded-l p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`bg-blue-500 text-white px-4 py-2 rounded-r ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
}