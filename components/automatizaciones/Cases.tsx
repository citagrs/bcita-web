"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, ScanLine, MessageCircleHeart, ArrowRight, type LucideIcon } from "lucide-react";

type Case = {
  icon: LucideIcon;
  tag: string;
  problem: string;
  solution: string;
  metric: string;
  metricLabel: string;
};

const CASES: Case[] = [
  {
    icon: FileText,
    tag: "Seguros",
    problem: "Renovar pólizas tomaba hasta 2 días por agencia, con datos copiados a mano.",
    solution: "Automatizamos la captura, el cálculo y la generación de documentos.",
    metric: "10 min",
    metricLabel: "por renovación, antes 2 días",
  },
  {
    icon: ScanLine,
    tag: "Legal · IA",
    problem: "Revisar contratos de 300 páginas tomaba una tarde entera de lectura.",
    solution: "Un modelo de IA extrae cláusulas, fechas y riesgos automáticamente.",
    metric: "4–10 min",
    metricLabel: "por contrato, antes 6 horas",
  },
  {
    icon: MessageCircleHeart,
    tag: "Atención al cliente",
    problem: "El feedback por WhatsApp se perdía y nadie lo analizaba a tiempo.",
    solution: "Captura automática con análisis de sentimiento en tiempo real.",
    metric: "24/7",
    metricLabel: "sin intervención manual",
  },
];

export default function Cases() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-24 bg-slate-50" aria-labelledby="cases-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="cases-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
          >
            Resultados reales
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Casos que ya están en producción. Números, no promesas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CASES.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.tag}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col rounded-2xl bg-white border border-gray-100 p-7 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 grid place-items-center text-emerald-600">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {c.tag}
                  </span>
                </div>

                <div className="mb-5">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent leading-none">
                    {c.metric}
                  </div>
                  <div className="text-xs text-slate-500 mt-1.5">
                    {c.metricLabel}
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                  <span className="font-semibold text-slate-700">Antes: </span>
                  {c.problem}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-emerald-700">Ahora: </span>
                  {c.solution}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:gap-3 transition-all"
          >
            Cuéntanos tu proceso y te decimos cómo automatizarlo
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
