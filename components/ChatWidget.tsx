"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(uuidv4());

  const sendMessage = async () => {
    if (!input.trim()) return;

    const msg = input;
    setInput("");

    setMessages((prev) => [...prev, { from: "user", text: msg }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, sessionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: data?.error || "Error inesperado." },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Hubo un problema de conexión. Intenta nuevamente.",
        },
      ]);
    }
  };

  return (
    <>
      {/* Botón flotante premium */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#0066B3] shadow-2xl w-16 h-16 rounded-full flex items-center justify-center hover:bg-[#004a84] transition-all"
      >
        {/* Nuevo icono IA premium */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c1.657 0 3-.895 3-2s-1.343-2-3-2-3 .895-3 2 1.343 2 3 2zm0 2c-2.667 0-8 1.334-8 4v2h16v-2c0-2.666-5.333-4-8-4z"
          />
          <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      {/* Ventana del chat */}
      {open && (
        <div className="fixed bottom-28 right-6 w-96 bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden animate-[fadeIn_0.2s_ease-out]">
          {/* Header */}
          <div className="bg-[#0066B3] text-white px-5 py-3 font-semibold text-lg flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            Asistente IA — B-cita
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-sm leading-relaxed shadow-sm ${
                  msg.from === "user"
                    ? "bg-[#0066B3] text-white ml-auto max-w-[80%]"
                    : "bg-gray-100 text-gray-900 mr-auto max-w-[80%]"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex items-center gap-3 bg-gray-50">
            <input
              className="flex-1 border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:border-[#0066B3] outline-none"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="bg-[#0066B3] text-white px-4 py-2 rounded-xl hover:bg-[#004a84] transition text-sm"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

