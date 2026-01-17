"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function FinalCTA() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    problema: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleWhatsAppClick = () => {
    const msg = `Hola, quiero que me ayuden con la automatización de mi empresa`;
    window.open(`https://wa.me/573024446047?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // POST con timeout para evitar que el usuario se quede esperando
  const postWithTimeout = async (url: string, data: any, ms = 12000) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);

    try {
      return await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const flowUrl = process.env.NEXT_PUBLIC_CONTACT_FLOW_URL;

    // Payload que recibe Power Automate
    const payload = {
      ...formData,
      source: "web-bcita",
      createdAt: new Date().toISOString(),
    };

    // Si no existe la variable, no bloqueamos: mandamos al usuario a WhatsApp como fallback
    if (!flowUrl) {
      const msg =
        `Hola B-cita 👋\n` +
        `Soy ${formData.nombre} de ${formData.empresa}.\n\n` +
        `Mi correo: ${formData.email}\n\n` +
        `Quiero automatizar este proceso:\n${formData.problema}`;
      window.open(`https://wa.me/573024446047?text=${encodeURIComponent(msg)}`, "_blank");

      setTimeout(() => {
        setStatus("success");
        setFormData({ nombre: "", empresa: "", email: "", problema: "" });
      }, 1200);
      return;
    }

    try {
      // Disparamos el envío al Flow (idealmente responde 200, pero no dependemos de eso para el "gracias")
      const resPromise = postWithTimeout(flowUrl, payload, 12000);

      // UX: a los 2s mostramos “Gracias” para que se sienta instantáneo
      setTimeout(() => {
        setStatus("success");
        setFormData({ nombre: "", empresa: "", email: "", problema: "" });
      }, 2000);

      const res = await resPromise;

      // Si el Flow respondió con error real, avisamos (sin “romper” la UX)
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.warn("Flow respondió con error:", res.status, text);
        setErrorMsg(
          "Recibimos tu solicitud, pero hubo un problema confirmando el envío. Si no te llega el correo, escríbenos por WhatsApp."
        );
      }
    } catch (err: any) {
      // Si aborta por timeout o falla la red, mostramos éxito (optimista) pero con aviso y fallback
      console.warn("Error llamando al Flow:", err);
      setStatus("success");
      setErrorMsg(
        "Recibimos tu solicitud. Si no te llega el correo de confirmación, escríbenos por WhatsApp y te atendemos de inmediato."
      );
    }
  };

  return (
    <section
      id="contacto"
      className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-emerald-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-white">
            Cuéntanos tu proceso y te mostramos cómo automatizarlo
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sin compromiso. Sin letra pequeña. Solo soluciones reales para tu empresa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* WhatsApp Option */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <div className="bg-emerald-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <MessageCircle className="w-8 h-8 text-emerald-600" />
            </div>

            <h3 className="text-2xl mb-4 text-gray-900">Chatea con nosotros</h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Respuesta inmediata por WhatsApp. Cuéntanos tu caso y te ayudamos al instante.
            </p>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Abrir WhatsApp
            </button>
          </motion.div>

          {/* Form Option */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <div className="bg-emerald-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Send className="w-8 h-8 text-emerald-600" />
            </div>

            <h3 className="text-2xl mb-4 text-gray-900">Déjanos un mensaje</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Tu empresa"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Tu correo"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <textarea
                  placeholder="¿Qué proceso quieres automatizar?"
                  value={formData.problema}
                  onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                  status === "sending"
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                <Send className="w-5 h-5" />
              </button>

              {status === "success" && (
                <p className="text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  ¡Gracias! Recibimos tu solicitud. Te enviaremos una respuesta al correo pronto.
                </p>
              )}

              {status === "error" && (
                <p className="text-red-800 bg-red-50 border border-red-200 rounded-lg p-3">
                  No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.
                </p>
              )}

              {errorMsg && (
                <p className="text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  {errorMsg}
                </p>
              )}
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300 text-lg">
            🇨🇴 Orgullosamente colombianos • Asesoría 100% gratuita • Resultados garantizados
          </p>
        </motion.div>
      </div>
    </section>
  );
}