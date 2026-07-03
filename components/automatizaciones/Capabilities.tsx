"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FileCheck2,
  BellRing,
  ClipboardList,
  RefreshCcw,
  BarChart3,
  MessageCircle,
  FileSearch,
  Target,
  type LucideIcon,
} from "lucide-react";

type Cap = {
  icon: LucideIcon;
  title: string;
  desc: string;
  example: string;
};

const CAPS: Cap[] = [
  {
    icon: FileCheck2,
    title: "Aprobaciones y documentos",
    desc: "Flujos de aprobación que avanzan solos, con firmas y registro.",
    example: "Ej: una factura llega, se aprueba y se archiva sin correos de ida y vuelta.",
  },
  {
    icon: BellRing,
    title: "Notificaciones y recordatorios",
    desc: "Avisos automáticos en el momento justo, a la persona correcta.",
    example: "Ej: recordar un vencimiento 3 días antes por correo y WhatsApp.",
  },
  {
    icon: ClipboardList,
    title: "Captura de formularios",
    desc: "Los datos entran directo a tus sistemas, sin transcribir nada.",
    example: "Ej: un formulario web crea el registro y notifica al vendedor.",
  },
  {
    icon: RefreshCcw,
    title: "Sincronización entre sistemas",
    desc: "ERP, CRM y hojas de cálculo siempre con la misma información.",
    example: "Ej: una venta en el CRM actualiza el inventario y la contabilidad.",
  },
  {
    icon: BarChart3,
    title: "Reportes automáticos",
    desc: "Informes que se arman y se envían solos, cada semana o mes.",
    example: "Ej: el reporte de ventas del lunes llega listo a tu correo a las 7 a.m.",
  },
  {
    icon: MessageCircle,
    title: "Atención por WhatsApp con IA",
    desc: "Un asistente responde, agenda y clasifica conversaciones 24/7.",
    example: "Ej: responde preguntas frecuentes y pasa al humano solo lo importante.",
  },
  {
    icon: FileSearch,
    title: "Lectura de documentos con IA",
    desc: "Extraemos datos de PDFs, contratos y facturas en segundos.",
    example: "Ej: leer 300 páginas de un contrato y sacar cláusulas clave en minutos.",
  },
  {
    icon: Target,
    title: "Prospección y seguimiento",
    desc: "Identificación de clientes y seguimiento comercial automático.",
    example: "Ej: detectar prospectos, enviar el primer mensaje y agendar el recordatorio.",
  },
];

export default function Capabilities() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-24 bg-white" aria-labelledby="cap-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="cap-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
          >
            ¿Qué se puede automatizar?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Si es repetitivo y sigue reglas, probablemente ya lo podemos hacer por
            ti. Pasa el cursor sobre cada tarjeta para ver un ejemplo real.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPS.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.article
                key={cap.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                className="cap group"
              >
                <div className="cap__icon">
                  <Icon size={24} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="cap__title">{cap.title}</h3>
                <p className="cap__desc">{cap.desc}</p>
                <p className="cap__example">{cap.example}</p>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .cap {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1.4rem;
          background: #fff;
          border: 1px solid #eef1f4;
          border-radius: 18px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          overflow: hidden;
        }
        .cap:hover {
          transform: translateY(-4px);
          border-color: #c7f0dd;
          box-shadow: 0 22px 44px -20px rgba(5, 150, 105, 0.35);
        }
        .cap__icon {
          display: grid;
          place-items: center;
          width: 50px;
          height: 50px;
          border-radius: 13px;
          background: linear-gradient(135deg, #ecfdf5, #e0f2fe);
          color: #059669;
          margin-bottom: 1rem;
          transition: transform 0.35s ease;
        }
        .cap:hover .cap__icon {
          transform: scale(1.08) rotate(-4deg);
        }
        .cap__title {
          font-size: 1.02rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.4rem;
          line-height: 1.25;
        }
        .cap__desc {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.5;
        }
        .cap__example {
          font-size: 0.82rem;
          color: #047857;
          line-height: 1.45;
          margin-top: 0.7rem;
          padding-top: 0.7rem;
          border-top: 1px dashed #d1fae5;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateY(4px);
          transition: max-height 0.35s ease, opacity 0.3s ease,
            transform 0.3s ease, margin 0.3s ease, padding 0.3s ease;
          margin-top: 0;
          padding-top: 0;
          border-top-color: transparent;
        }
        .cap:hover .cap__example,
        .cap:focus-within .cap__example {
          max-height: 120px;
          opacity: 1;
          transform: translateY(0);
          margin-top: 0.7rem;
          padding-top: 0.7rem;
          border-top-color: #d1fae5;
        }
        /* En táctil/reduced-motion mostramos el ejemplo siempre */
        @media (prefers-reduced-motion: reduce), (hover: none) {
          .cap__example {
            max-height: 120px;
            opacity: 1;
            transform: none;
            margin-top: 0.7rem;
            padding-top: 0.7rem;
            border-top-color: #d1fae5;
          }
        }
      `}</style>
    </section>
  );
}
