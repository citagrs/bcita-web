"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Lead = {
  nombre?: string;
  empresa?: string;
  email?: string;
  problema?: string;
  chatSummary?: string;
  chatProposals?: string[];
  herramientas?: string[];
  urgencia?: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([
    {
      from: "bot",
      text:
        "Hola 👋 Soy el asistente de B-cita. En 2 minutos te propongo 1–2 automatizaciones.\n\n" +
        "1) ¿Qué tipo de negocio tienes y qué proceso quieres automatizar primero?\n" +
        "2) ¿Hoy lo hacen en Excel/WhatsApp/correo o en algún sistema?",
    },
  ]);

  const [input, setInput] = useState("");
  const [sessionId] = useState(uuidv4());

  const [lead, setLead] = useState<Lead>({});
  const [closing, setClosing] = useState(false);

  const flowUrl = process.env.NEXT_PUBLIC_CONTACT_FLOW_URL;

  // ✅ Auto-scroll
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // ✅ Candados (NO dependen de renders)
  const leadSentRef = useRef(false);     // evita doble disparo al Flow
  const sendingMsgRef = useRef(false);   // evita doble envío al /api/chat (Enter/click rápido)

  const sendToFlow = async (mergedLead: Lead) => {
    // 🔒 Candado real: si ya enviamos una vez, no volvemos a enviar
    if (leadSentRef.current) return;

    // Si no hay Flow URL, no hacemos nada (puedes hacer fallback a WhatsApp si quieres)
    if (!flowUrl) return;

    // mínimos requeridos por tu trigger
    if (!mergedLead.nombre || !mergedLead.empresa || !mergedLead.email || !mergedLead.problema) return;

    // 🔒 Marcar como enviado ANTES del fetch (idempotencia)
    leadSentRef.current = true;

    const payload = {
      nombre: mergedLead.nombre,
      empresa: mergedLead.empresa,
      email: mergedLead.email,
      problema: mergedLead.problema,
      source: "web-bcita-chat",
      createdAt: new Date().toISOString(),
      conversationId: sessionId,
      chatSummary: mergedLead.chatSummary || "",
      chatProposals: mergedLead.chatProposals || [],
      herramientas: mergedLead.herramientas || [],
      urgencia: mergedLead.urgencia || "",
    };

    try {
      const res = await fetch(flowUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // ✅ Cierre UX (solo una vez)
      setClosing(true);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: res.ok
            ? "✅ Listo. Ya envié tu resumen al equipo.\n\nTe contactaremos pronto por correo. Si quieres atención inmediata, escríbenos por WhatsApp."
            : "Recibimos tu solicitud, pero hubo un problema confirmando el envío.\n\nSi no te llega el correo, escríbenos por WhatsApp y te atendemos de inmediato.",
        },
      ]);

      // Si NO fue ok y quieres permitir reintento, descomenta:
      // if (!res.ok) leadSentRef.current = false;
    } catch (e) {
      // Si falla red, permitimos reintento liberando candado
      leadSentRef.current = false;
      console.warn("Error enviando lead al Flow:", e);

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Tuvimos un problema de conexión enviando tu solicitud.\n\nPor favor intenta de nuevo o escríbenos por WhatsApp.",
        },
      ]);
    }
  };

  const sendMessage = async () => {
    if (closing) return;

    const msg = input.trim();
    if (!msg) return;

    // 🔒 evita doble envío por Enter + click rápido
    if (sendingMsgRef.current) return;
    sendingMsgRef.current = true;

    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: msg }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, sessionId, lead }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: data?.error || "Error inesperado." },
        ]);
        return;
      }

      // ✅ muestra solo el reply (sin JSON)
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);

      // ✅ Merge de lead (sin side-effects dentro del setState)
      let mergedLead = lead;

      if (data.extracted && typeof data.extracted === "object") {
        mergedLead = { ...lead, ...data.extracted };
        setLead(mergedLead);
      }

      // ✅ Disparo del Flow SOLO aquí, una vez, con candado
      if (data.shouldSendLead === true) {
        sendToFlow(mergedLead);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Hubo un problema de conexión. Intenta nuevamente." },
      ]);
    } finally {
      sendingMsgRef.current = false;
    }
  };

  const handleWhatsApp = () => {
    const msg =
      `Hola B-cita 👋\n` +
      `Quiero confirmar mi solicitud.\n` +
      (lead.nombre ? `Nombre: ${lead.nombre}\n` : "") +
      (lead.empresa ? `Empresa: ${lead.empresa}\n` : "") +
      (lead.email ? `Email: ${lead.email}\n` : "") +
      (lead.problema ? `Proceso: ${lead.problema}\n` : "");

    window.open(`https://wa.me/573142539496?text=${encodeURIComponent(msg)}`, "_blank");
  };

  useEffect(() => {
  const handler = () => setOpen(true);
  document.addEventListener("open-bcita-chat", handler);
  return () => document.removeEventListener("open-bcita-chat", handler);
}, []);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] bg-[#0066B3] shadow-2xl w-16 h-16 rounded-full flex items-center justify-center hover:bg-[#004a84] transition-all"
      >
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
        <div className="fixed bottom-28 right-6 z-[9999] w-96 bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-[#0066B3] text-white px-5 py-3 font-semibold text-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              Asistente IA — B-cita
            </div>

            {closing && (
              <button
                onClick={handleWhatsApp}
                className="text-xs bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded-full"
              >
                WhatsApp
              </button>
            )}
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                  msg.from === "user"
                    ? "bg-[#0066B3] text-white ml-auto max-w-[80%]"
                    : "bg-gray-100 text-gray-900 mr-auto max-w-[80%]"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-4 border-t flex items-center gap-3 bg-gray-50">
            <input
              disabled={closing}
              className={`flex-1 border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:border-[#0066B3] outline-none ${
                closing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder={closing ? "Conversación finalizada ✅" : "Escribe tu mensaje..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              disabled={closing}
              onClick={sendMessage}
              className={`px-4 py-2 rounded-xl transition text-sm ${
                closing
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#0066B3] text-white hover:bg-[#004a84]"
              }`}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
