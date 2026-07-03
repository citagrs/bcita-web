"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  ShieldCheck,
  Sparkles,
  BellRing,
  Database,
  ArrowRight,
} from "lucide-react";

const NODES = [
  {
    icon: ClipboardList,
    label: "Formulario",
    tip: "Entra un dato: un cliente llena un formulario o llega un correo.",
  },
  {
    icon: ShieldCheck,
    label: "Validación",
    tip: "El sistema revisa y organiza la información automáticamente.",
  },
  {
    icon: Sparkles,
    label: "IA",
    tip: "La inteligencia artificial lee, clasifica o redacta según tus reglas.",
  },
  {
    icon: BellRing,
    label: "Notificación",
    tip: "Se avisa al equipo o al cliente por correo o WhatsApp, al instante.",
  },
  {
    icon: Database,
    label: "Base de datos",
    tip: "Todo queda guardado y listo para tus reportes. Sin escribir nada a mano.",
  },
];

export default function FlowHero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % NODES.length);
    }, 950);
    return () => clearInterval(id);
  }, [reduce]);

  const scrollToForm = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flow-hero -mt-24 pt-24">
      {/* Fondo con nodos tenues */}
      <div className="flow-hero__bg" aria-hidden="true">
        <div className="flow-hero__glow flow-hero__glow--a" />
        <div className="flow-hero__glow flow-hero__glow--b" />
        <div className="flow-hero__grid" />
      </div>

      <div className="flow-hero__inner">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flow-hero__badge"
        >
          <span className="flow-hero__pulse-dot" aria-hidden="true" />
          Automatización de procesos
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="flow-hero__title"
        >
          Tu negocio trabajando solo.{" "}
          <span className="flow-hero__title-accent">Literalmente.</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="flow-hero__sub"
        >
          Conectamos tus sistemas para que los datos y las tareas se muevan
          solos: sin copiar y pegar, sin tareas repetitivas, sin errores.
        </motion.p>

        {/* ── EL FLUJO VIVO ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="flow"
          role="img"
          aria-label="Diagrama de un flujo automatizado: un formulario pasa por validación, inteligencia artificial y notificación, y termina en la base de datos."
        >
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const isActive = reduce || i === active;
            return (
              <div className="flow__step" key={node.label}>
                <div
                  className={`flow__node ${isActive ? "is-active" : ""}`}
                  tabIndex={0}
                >
                  <div className="flow__node-icon">
                    <Icon size={26} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <span className="flow__node-label">{node.label}</span>
                  <span className="flow__tip" role="tooltip">
                    {node.tip}
                  </span>
                </div>

                {i < NODES.length - 1 && (
                  <div className="flow__link" aria-hidden="true">
                    <span className="flow__pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="flow-hero__cta-row"
        >
          <button onClick={scrollToForm} className="flow-hero__cta">
            Quiero automatizar mi negocio
            <ArrowRight size={20} />
          </button>
          <span className="flow-hero__cta-note">
            Diagnóstico gratuito · Sin compromiso
          </span>
        </motion.div>
      </div>

      <style jsx>{`
        .flow-hero {
          position: relative;
          overflow: hidden;
          background: radial-gradient(
              1200px 600px at 50% -10%,
              #0b3a63 0%,
              transparent 60%
            ),
            linear-gradient(180deg, #071a2b 0%, #0a1220 100%);
          color: #fff;
        }
        .flow-hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .flow-hero__grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(
            900px 500px at 50% 20%,
            #000 0%,
            transparent 75%
          );
        }
        .flow-hero__glow {
          position: absolute;
          width: 460px;
          height: 460px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.5;
        }
        .flow-hero__glow--a {
          top: -140px;
          left: -80px;
          background: #0066b3;
          animation: floatA 14s ease-in-out infinite;
        }
        .flow-hero__glow--b {
          bottom: -180px;
          right: -100px;
          background: #059669;
          animation: floatB 16s ease-in-out infinite;
        }
        .flow-hero__inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 3.2rem 1.5rem 4.2rem;
          text-align: center;
        }
        .flow-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #a7f3d0;
          background: rgba(5, 150, 105, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.4rem;
        }
        .flow-hero__pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6);
          animation: pulseDot 1.8s ease-out infinite;
        }
        .flow-hero__title {
          font-size: clamp(2.1rem, 5.4vw, 3.7rem);
          line-height: 1.06;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 auto 1rem;
          max-width: 15ch;
        }
        .flow-hero__title-accent {
          background: linear-gradient(120deg, #34d399, #38bdf8);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .flow-hero__sub {
          font-size: clamp(1rem, 2vw, 1.22rem);
          color: #c3d0dc;
          max-width: 56ch;
          margin: 0 auto 2.6rem;
          line-height: 1.55;
        }

        /* ── FLUJO ── */
        .flow {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 0;
          max-width: 340px;
          margin: 0 auto 2.8rem;
        }
        .flow__step {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .flow__node {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 0.85rem 1.1rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: border-color 0.35s, background 0.35s, transform 0.35s,
            box-shadow 0.35s;
          cursor: default;
          outline: none;
        }
        .flow__node.is-active {
          border-color: rgba(52, 211, 153, 0.8);
          background: rgba(5, 150, 105, 0.16);
          box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.4),
            0 12px 34px -10px rgba(16, 185, 129, 0.55);
          transform: translateY(-1px);
        }
        .flow__node-icon {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.06);
          color: #93c5fd;
          flex-shrink: 0;
          transition: color 0.35s, background 0.35s;
        }
        .flow__node.is-active .flow__node-icon {
          color: #34d399;
          background: rgba(52, 211, 153, 0.14);
        }
        .flow__node-label {
          font-size: 0.98rem;
          font-weight: 600;
          color: #eaf2f8;
        }
        .flow__tip {
          position: absolute;
          left: 50%;
          top: calc(100% + 10px);
          transform: translateX(-50%) translateY(6px);
          width: max-content;
          max-width: 240px;
          background: #0f2438;
          border: 1px solid rgba(148, 197, 253, 0.35);
          color: #d7e6f2;
          font-size: 0.78rem;
          line-height: 1.4;
          text-align: left;
          padding: 0.6rem 0.75rem;
          border-radius: 10px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
          z-index: 5;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.7);
        }
        .flow__node:hover .flow__tip,
        .flow__node:focus-visible .flow__tip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .flow__link {
          position: relative;
          width: 2px;
          height: 30px;
          background: linear-gradient(
            180deg,
            rgba(148, 197, 253, 0.15),
            rgba(52, 211, 153, 0.35)
          );
          overflow: hidden;
        }
        .flow__pulse {
          position: absolute;
          left: 50%;
          top: 0;
          width: 7px;
          height: 7px;
          margin-left: -3.5px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 10px 2px rgba(52, 211, 153, 0.8);
          animation: travelY 1.6s linear infinite;
        }

        /* Horizontal en pantallas medianas+ */
        @media (min-width: 760px) {
          .flow {
            flex-direction: row;
            align-items: center;
            max-width: 980px;
          }
          .flow__step {
            flex-direction: row;
            flex: 1;
          }
          .flow__node {
            flex-direction: column;
            gap: 8px;
            text-align: center;
            padding: 1.1rem 0.6rem;
          }
          .flow__node-label {
            font-size: 0.88rem;
          }
          .flow__tip {
            max-width: 200px;
          }
          .flow__link {
            width: 100%;
            height: 2px;
            flex: 1;
            background: linear-gradient(
              90deg,
              rgba(148, 197, 253, 0.15),
              rgba(52, 211, 153, 0.35)
            );
          }
          .flow__pulse {
            left: 0;
            top: 50%;
            margin-left: 0;
            margin-top: -3.5px;
            animation: travelX 1.6s linear infinite;
          }
        }

        .flow-hero__cta-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
        }
        .flow-hero__cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #059669;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 1.05rem;
          font-weight: 600;
          padding: 0.95rem 1.8rem;
          border-radius: 999px;
          box-shadow: 0 16px 40px -12px rgba(5, 150, 105, 0.8);
          transition: background 0.2s, transform 0.2s;
        }
        .flow-hero__cta:hover {
          background: #047857;
          transform: translateY(-2px);
        }
        .flow-hero__cta-note {
          font-size: 0.82rem;
          color: #9fb3c2;
        }

        @keyframes travelX {
          from {
            left: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            left: 100%;
            opacity: 0;
          }
        }
        @keyframes travelY {
          from {
            top: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            top: 100%;
            opacity: 0;
          }
        }
        @keyframes pulseDot {
          0% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.55);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(52, 211, 153, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
          }
        }
        @keyframes floatA {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, 26px);
          }
        }
        @keyframes floatB {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-26px, -22px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .flow__pulse,
          .flow-hero__pulse-dot,
          .flow-hero__glow--a,
          .flow-hero__glow--b {
            animation: none;
          }
          .flow__pulse {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
