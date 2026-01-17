"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AIAssistantCTA() {
  const openChat = () => {
    // Dispara un evento global para que ChatWidget se abra
    document.dispatchEvent(new Event("open-bcita-chat"));
  };

  const scrollToContacto = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* decor */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-overlay filter blur-3xl opacity-15"></div>
        <div className="absolute -bottom-24 left-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-overlay filter blur-3xl opacity-15"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-200 px-3 py-1.5 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Prueba de concepto en vivo
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
              Descubre en <span className="text-emerald-300">2 minutos</span> cómo automatizar tu proceso
            </h2>

            <p className="mt-4 text-lg text-gray-200 leading-relaxed">
              Habla con nuestro asistente con IA. Te hace pocas preguntas y te devuelve{" "}
              <span className="text-white font-semibold">1–2 automatizaciones</span> aplicables a tu empresa.
            </p>

            <div className="mt-6 space-y-3 text-gray-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 mt-0.5" />
                <span>Diagnóstico rápido (sin llamadas ni registros)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 mt-0.5" />
                <span>Propuesta concreta (WhatsApp/Excel/correos → flujo automatizado)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 mt-0.5" />
                <span>Si te interesa, te enviamos un resumen al correo y te contactamos</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openChat}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                <Bot className="w-5 h-5" />
                Hablar con el asistente IA
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={scrollToContacto}
                className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-medium border border-white/20 transition flex items-center justify-center gap-2"
              >
                Prefiero dejar mis datos
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-300">
              Tip: también puedes abrir el chat desde la esquina inferior derecha 👇
            </p>
          </motion.div>

          {/* Tarjeta demo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Bot className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <div className="text-gray-900 font-semibold">Ejemplo de diagnóstico</div>
                <div className="text-gray-500 text-sm">Así se ve la experiencia</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-100 text-gray-900 rounded-xl p-3 text-sm whitespace-pre-line">
                Hola 👋 Soy el asistente de B-cita. En 2 minutos te propongo 1–2 automatizaciones.
                {"\n\n"}¿Qué proceso quieres automatizar primero?
              </div>

              <div className="bg-[#0066B3] text-white rounded-xl p-3 text-sm ml-auto max-w-[85%]">
                Tengo pedidos por WhatsApp y luego los paso a Excel.
              </div>

              <div className="bg-gray-100 text-gray-900 rounded-xl p-3 text-sm whitespace-pre-line">
                Perfecto. Con ese flujo, podrías:
                {"\n"}• Capturar pedidos automáticamente
                {"\n"}• Evitar duplicados
                {"\n"}• Enviar resumen a cocina/ventas
                {"\n\n"}¿Te envío un resumen al correo?
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
              <span>Sin compromiso</span>
              <span>Hecho para pymes 🇨🇴</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
