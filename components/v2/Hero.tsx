"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import ScheduleModal from "./ScheduleModal"; // <-- ajusta la ruta si está en otra carpeta

export default function Hero() {
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/573024446047?text=Hola, quiero automatizar mi empresa",
      "_blank"
    );
  };

  const goToContact = () => {
    // ✅ tu sección real es "contacto"
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1573757056004-065ad36e2cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW5ub3ZhdGlvbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2ODQyNjU5NHww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        {/* Gradient overlay - warmer tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-slate-800/80 to-emerald-900/85"></div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-6 h-6 text-emerald-400" />
          <span className="text-emerald-300 font-medium">
            B-cita Soluciones y Automatización
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-white max-w-4xl mx-auto leading-tight"
        >
          Automatizamos procesos para que tu empresa{" "}
          <span className="text-emerald-400">trabaje sola</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto"
        >
          Menos trabajo manual, menos errores y más tiempo para crecer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={handleWhatsAppClick}
            className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            Quiero automatizar mi empresa
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setScheduleOpen(true)} // ✅ abre el modal
            className="group bg-white hover:bg-gray-50 text-emerald-700 px-8 py-4 rounded-lg text-lg font-medium border-2 border-white transition-all duration-200 flex items-center gap-2 hover:shadow-lg w-full sm:w-auto justify-center"
          >
            Agenda una asesoría gratuita
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-300"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>Sin contratos largos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>Asesoría gratuita</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>Resultados en semanas</span>
          </div>
        </motion.div>
      </div>

      {/* ✅ Modal de agenda */}
      <ScheduleModal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        onGoForm={goToContact}
      />
    </section>
  );
}