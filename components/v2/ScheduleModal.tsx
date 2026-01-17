"use client";
import { useEffect } from "react";

export default function ScheduleModal({
  open,
  onClose,
  onGoForm,
}: {
  open: boolean;
  onClose: () => void;
  onGoForm: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    // Carga script de Calendly una sola vez
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, [open]);

  if (!open) return null;

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/573024446047?text=Hola%20B-cita%20%F0%9F%91%8B%20Quiero%20agendar%20una%20asesor%C3%ADa%20gratuita",
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Agenda una asesoría gratuita</h3>
            <p className="text-sm text-gray-600">Elige la forma más rápida para ti.</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-sm">
            Cerrar
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Calendly */}
          <div className="p-4 border-b md:border-b-0 md:border-r">
            <div className="text-sm font-semibold text-gray-900 mb-2">📅 Agendar en calendario</div>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/oscar-cita-bcita/30min"
              style={{ minWidth: "320px", height: "520px" }}
            />
          </div>

          {/* Alternativas */}
          <div className="p-5">
            <div className="text-sm font-semibold text-gray-900 mb-3">🚀 Alternativas</div>

            <button
              onClick={handleWhatsApp}
              className="w-full mb-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl font-medium"
            >
              Coordinar por WhatsApp
            </button>

            <button
              onClick={() => {
                onClose();
                onGoForm();
              }}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-xl font-medium"
            >
              Prefiero dejar mis datos (formulario)
            </button>

            <p className="text-xs text-gray-500 mt-3">
              Si eliges formulario, te contactamos y agendamos contigo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
