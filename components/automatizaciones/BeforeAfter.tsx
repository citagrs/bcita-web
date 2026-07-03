"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, FileWarning, Sheet, MessageSquare, Zap, CheckCircle2 } from "lucide-react";

export default function BeforeAfter() {
  const reduce = useReducedMotion();
  const [view, setView] = useState<"antes" | "despues">("antes");

  return (
    <section className="py-20 sm:py-24 bg-slate-50" aria-labelledby="ba-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="ba-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
          >
            El mismo proceso, antes y después
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Un proceso manual salta entre personas, correos y planillas. Uno
            automatizado simplemente fluye.
          </p>
        </div>

        {/* Toggle (móvil) */}
        <div className="flex md:hidden justify-center mb-6">
          <div className="inline-flex bg-white border border-gray-200 rounded-full p-1">
            <button
              onClick={() => setView("antes")}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
                view === "antes" ? "bg-rose-500 text-white" : "text-gray-500"
              }`}
            >
              Antes
            </button>
            <button
              onClick={() => setView("despues")}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
                view === "despues" ? "bg-emerald-600 text-white" : "text-gray-500"
              }`}
            >
              Después
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* ANTES */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className={`${view === "antes" ? "block" : "hidden"} md:block`}
          >
            <div className="h-full rounded-2xl border border-rose-100 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-2 text-rose-600 font-semibold text-sm bg-rose-50 px-3 py-1 rounded-full">
                  <FileWarning size={16} /> Proceso manual
                </span>
                <span className="inline-flex items-center gap-1.5 text-rose-600 font-bold">
                  <Clock size={18} /> 6 horas
                </span>
              </div>

              <div className="relative h-44 rounded-xl bg-rose-50/60 border border-dashed border-rose-200 overflow-hidden mb-6">
                {/* Íconos dispersos = caos */}
                <span className="ba-chaos" style={{ top: "18%", left: "12%" }}>
                  <Sheet size={22} />
                </span>
                <span className="ba-chaos" style={{ top: "55%", left: "28%", animationDelay: ".4s" }}>
                  <MessageSquare size={22} />
                </span>
                <span className="ba-chaos" style={{ top: "30%", left: "62%", animationDelay: ".8s" }}>
                  <FileWarning size={22} />
                </span>
                <span className="ba-chaos" style={{ top: "64%", left: "78%", animationDelay: "1.2s" }}>
                  <Clock size={22} />
                </span>
                {/* flechas desordenadas */}
                <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <path d="M60 50 L180 110 L110 130 L260 60" fill="none" stroke="#fda4af" strokeWidth="2" strokeDasharray="5 5" />
                </svg>
              </div>

              <ul className="space-y-2.5 text-sm text-gray-600">
                <li>• Copiar y pegar entre Excel, correo y WhatsApp</li>
                <li>• Esperar respuestas y hacer seguimiento a mano</li>
                <li>• Errores de digitación y datos que se pierden</li>
              </ul>
            </div>
          </motion.div>

          {/* DESPUÉS */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${view === "despues" ? "block" : "hidden"} md:block`}
          >
            <div className="h-full rounded-2xl border border-emerald-100 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                  <Zap size={16} /> Proceso automatizado
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                  <Clock size={18} /> 10 minutos
                </span>
              </div>

              <div className="relative h-44 rounded-xl bg-emerald-50/60 border border-emerald-100 overflow-hidden mb-6 flex items-center justify-center">
                {/* flujo limpio: 3 nodos alineados */}
                <div className="flex items-center gap-3">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="flex items-center gap-3">
                      <span className="ba-node" style={{ animationDelay: `${k * 0.3}s` }} />
                      {k < 2 && <span className="ba-line" />}
                    </div>
                  ))}
                </div>
              </div>

              <ul className="space-y-2.5 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" /> Los datos entran una sola vez y viajan solos</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" /> Cada paso ocurre al instante, sin recordatorios</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" /> Cero errores de transcripción, todo queda registrado</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .ba-chaos {
          position: absolute;
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: #fff;
          border: 1px solid #fecdd3;
          color: #e11d48;
          box-shadow: 0 6px 16px -8px rgba(225, 29, 72, 0.5);
          animation: jitter 2.4s ease-in-out infinite;
        }
        .ba-node {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #059669;
          box-shadow: 0 0 0 6px rgba(5, 150, 105, 0.14);
          animation: nodePulse 1.8s ease-in-out infinite;
        }
        .ba-line {
          width: 34px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #34d399, #059669);
        }
        @keyframes jitter {
          0%, 100% { transform: translate(0, 0) rotate(-2deg); }
          50% { transform: translate(2px, -3px) rotate(3deg); }
        }
        @keyframes nodePulse {
          0%, 100% { box-shadow: 0 0 0 6px rgba(5, 150, 105, 0.14); }
          50% { box-shadow: 0 0 0 10px rgba(5, 150, 105, 0.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ba-chaos,
          .ba-node {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
