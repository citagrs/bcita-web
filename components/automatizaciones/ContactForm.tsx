"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const POWER_AUTOMATE_URL =
  "https://default2788c22b48a84e06b329e8d0623d6b.17.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/dfc580603f0f4a749828e6f81fc18d8a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iFmidZYEu7NN4XvlAWOqxki9_Zf3iVxp9JtRwEJDdY0";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const payload = {
      nombre: String(data.get("nombre") || "").trim(),
      negocio: String(data.get("negocio") || "").trim(),
      whatsapp: String(data.get("whatsapp") || "").trim(),
      interes: String(data.get("interes") || "").trim(),
      autoriza_whatsapp: data.get("autoriza_whatsapp") === "si",
      sector: "Automatización",
      pagina_origen: "/automatizaciones",
    };

    setStatus("loading");
    try {
      const res = await fetch(POWER_AUTOMATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok || res.status === 202) {
        setStatus("success");
      } else {
        throw new Error("HTTP " + res.status);
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="cta-section" aria-labelledby="cta-title">
      <div className="cta-section__bg" aria-hidden="true">
        <div className="cta-section__grid" />
        <div className="cta-section__glow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Copy / CTA */}
          <div className="text-white">
            <h2
              id="cta-title"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
            >
              Automaticemos ese proceso que te está quitando tiempo
            </h2>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Cuéntanos qué tarea repetitiva quieres quitarte de encima. En el
              diagnóstico gratuito te decimos si se puede, cómo y cuánto tiempo
              ahorrarías.
            </p>
            <ul className="mt-7 space-y-3 text-slate-200">
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                Diagnóstico gratuito, sin compromiso
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                Te mostramos el flujo antes de construir
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                Respuesta en menos de 24 horas
              </li>
            </ul>
          </div>

          {/* Formulario */}
          <div className="cta-card">
            {status === "success" ? (
              <div className="text-center py-6" role="alert" aria-live="polite">
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 grid place-items-center mb-4">
                  <CheckCircle2 size={34} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ¡Listo! Te contactamos pronto
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Recibimos tu mensaje. Te escribimos por WhatsApp dentro de las
                  próximas 24 horas. Si prefieres, también puedes escribirnos al{" "}
                  <strong>314 253 9496</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="cta-field">
                  <label htmlFor="nombre">Nombre *</label>
                  <input id="nombre" name="nombre" type="text" required autoComplete="name" placeholder="Tu nombre" />
                </div>

                <div className="cta-field">
                  <label htmlFor="negocio">Empresa *</label>
                  <input id="negocio" name="negocio" type="text" required autoComplete="organization" placeholder="Nombre de tu empresa" />
                </div>

                <div className="cta-field">
                  <label htmlFor="whatsapp">WhatsApp *</label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[\d\s\+\-]{7,15}"
                    placeholder="300 000 0000"
                  />
                </div>

                <div className="cta-field">
                  <label htmlFor="interes">¿Qué proceso te gustaría automatizar? *</label>
                  <textarea
                    id="interes"
                    name="interes"
                    required
                    rows={3}
                    placeholder="Ej: cada mes armo el reporte de ventas a mano en Excel…"
                  />
                </div>

                <label className="cta-check">
                  <input type="checkbox" name="autoriza_whatsapp" value="si" required />
                  <span>
                    Autorizo a <strong>BCITA Soluciones y Automatización S.A.S.</strong>{" "}
                    (NIT 902031908-7) a contactarme por WhatsApp sobre sus servicios.
                    Puedo revocar esta autorización cuando quiera. <em>(Requerido)</em>
                  </span>
                </label>

                <button type="submit" className="cta-submit" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Enviando…
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Quiero mi diagnóstico gratuito
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="cta-error" role="alert">
                    Hubo un problema al enviar. Intenta de nuevo o escríbenos al{" "}
                    <strong>314 253 9496</strong>.
                  </p>
                )}

                <p className="cta-legal">
                  Tus datos se tratan conforme a nuestra{" "}
                  <a href="/politica-datos" target="_blank" rel="noopener">
                    Política de Tratamiento de Datos Personales
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #0a1220 0%, #071a2b 100%);
        }
        .cta-section__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .cta-section__grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(700px 400px at 20% 30%, #000, transparent 70%);
        }
        .cta-section__glow {
          position: absolute;
          top: 20%;
          left: 10%;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: #059669;
          filter: blur(120px);
          opacity: 0.28;
        }
        .cta-card {
          background: #fff;
          border-radius: 22px;
          padding: 1.8rem;
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.55);
        }
        .cta-field {
          margin-bottom: 1rem;
        }
        .cta-field label {
          display: block;
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.35rem;
        }
        .cta-field input,
        .cta-field textarea {
          width: 100%;
          border: 1px solid #d8dee6;
          border-radius: 11px;
          padding: 0.7rem 0.85rem;
          font-size: 0.95rem;
          color: #0f172a;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: vertical;
        }
        .cta-field input:focus,
        .cta-field textarea:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
        }
        .cta-check {
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
          font-size: 0.78rem;
          color: #4b5563;
          line-height: 1.45;
          margin: 0.4rem 0 1.2rem;
        }
        .cta-check input {
          margin-top: 3px;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          accent-color: #059669;
        }
        .cta-submit {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          background: #059669;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.9rem 1.2rem;
          border-radius: 12px;
          transition: background 0.2s, transform 0.15s;
        }
        .cta-submit:hover:not(:disabled) {
          background: #047857;
          transform: translateY(-1px);
        }
        .cta-submit:disabled {
          opacity: 0.75;
          cursor: default;
        }
        .cta-error {
          margin-top: 0.9rem;
          font-size: 0.82rem;
          color: #dc2626;
          background: #fef2f2;
          border: 1px solid #fecaca;
          padding: 0.6rem 0.75rem;
          border-radius: 9px;
        }
        .cta-legal {
          margin-top: 1rem;
          font-size: 0.74rem;
          color: #94a3b8;
          text-align: center;
        }
        .cta-legal a {
          color: #059669;
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
