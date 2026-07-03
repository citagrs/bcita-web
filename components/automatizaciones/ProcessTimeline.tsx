"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search, PenTool, Wrench, LineChart, type LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  n: string;
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    icon: Search,
    n: "01",
    title: "Diagnóstico",
    desc: "Entendemos tu operación en una sesión de 30 minutos, gratis. Identificamos qué tarea te está costando más tiempo.",
  },
  {
    icon: PenTool,
    n: "02",
    title: "Diseño de la solución",
    desc: "Te mostramos el flujo dibujado antes de construir nada. Sabes exactamente qué vas a recibir y cómo va a funcionar.",
  },
  {
    icon: Wrench,
    n: "03",
    title: "Implementación",
    desc: "Construimos e integramos con las herramientas que ya usas. Sin migraciones traumáticas ni cambiar todo de golpe.",
  },
  {
    icon: LineChart,
    n: "04",
    title: "Entrega y medición",
    desc: "Te entregamos funcionando y con métricas reales: cuánto tiempo ahorras y cuántos errores desaparecen.",
  },
];

export default function ProcessTimeline() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-24 bg-white" aria-labelledby="proc-title">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="proc-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
          >
            Cómo trabajamos
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Un proceso claro, sin sorpresas. Del problema a la solución medible.
          </p>
        </div>

        <div className="relative">
          {/* Línea vertical */}
          <div className="tl-line" aria-hidden="true">
            <motion.div
              className="tl-line__fill"
              initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          </div>

          <ol className="space-y-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.n}
                  initial={reduce ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="tl-item"
                >
                  <div className="tl-marker">
                    <Icon size={22} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div className="tl-card">
                    <span className="tl-num">{step.n}</span>
                    <h3 className="tl-title">{step.title}</h3>
                    <p className="tl-desc">{step.desc}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>

      <style jsx>{`
        .tl-line {
          position: absolute;
          left: 27px;
          top: 10px;
          bottom: 10px;
          width: 3px;
          background: #e6eaf0;
          border-radius: 2px;
          overflow: hidden;
        }
        .tl-line__fill {
          position: absolute;
          inset: 0;
          transform-origin: top;
          background: linear-gradient(180deg, #0066b3, #059669);
          border-radius: 2px;
        }
        :global(.tl-item) {
          position: relative;
          display: flex;
          gap: 1.3rem;
          align-items: flex-start;
          list-style: none;
        }
        .tl-marker {
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, #0066b3, #059669);
          color: #fff;
          box-shadow: 0 14px 30px -12px rgba(5, 150, 105, 0.6);
        }
        .tl-card {
          background: #fff;
          border: 1px solid #eef1f4;
          border-radius: 16px;
          padding: 1.25rem 1.4rem;
          flex: 1;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
        }
        .tl-num {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #94a3b8;
        }
        .tl-title {
          font-size: 1.18rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0.15rem 0 0.4rem;
        }
        .tl-desc {
          font-size: 0.94rem;
          color: #64748b;
          line-height: 1.55;
        }
        @media (max-width: 500px) {
          .tl-marker {
            width: 48px;
            height: 48px;
          }
          .tl-line {
            left: 23px;
          }
        }
      `}</style>
    </section>
  );
}
