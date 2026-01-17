"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

const questions = [
  '¿Usas Excel para casi todo?',
  '¿Tu equipo repite las mismas tareas todos los días?',
  '¿Dependes de personas para revisar correos o documentos?',
];

export default function AutoDiagnostic() {
  const [answers, setAnswers] = useState<(boolean | null)[]>([null, null, null]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number, answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);

    // Show result when all questions are answered
    if (newAnswers.every(a => a !== null)) {
      setTimeout(() => setShowResult(true), 300);
    } else {
      setShowResult(false);
    }
  };

  const yesCount = answers.filter(a => a === true).length;
  const savings = yesCount === 0 ? 20 : yesCount === 1 ? 30 : yesCount === 2 ? 35 : 40;

  const handleContactClick = () => {
    window.open('https://wa.me/573024446047?text=Hola, completé el autodiagnóstico y quiero una asesoría gratuita', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl mb-4 text-gray-900">
            ¿Qué tan manual es tu empresa?
          </h2>
          <p className="text-xl text-gray-600">
            Responde estas 3 preguntas y descubre tu potencial de ahorro
          </p>
        </motion.div>

        <div className="space-y-6 mb-8">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200"
            >
              <p className="text-lg text-gray-900 mb-4">{question}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleAnswer(index, true)}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    answers[index] === true
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Sí
                </button>
                <button
                  onClick={() => handleAnswer(index, false)}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    answers[index] === false
                      ? 'bg-gray-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <XCircle className="w-5 h-5" />
                  No
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 border-2 border-emerald-200 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-emerald-100 rounded-full p-4">
                  <TrendingUp className="w-12 h-12 text-emerald-600" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl mb-4 text-gray-900">
                ¡Excelente noticia!
              </h3>

              <p className="text-xl sm:text-2xl text-gray-700 mb-6">
                Tu empresa podría ahorrar entre un{' '}
                <span className="text-emerald-600 font-bold">{savings}%</span> y{' '}
                <span className="text-emerald-600 font-bold">{Math.min(savings + 10, 50)}%</span> de tiempo operativo con automatización.
              </p>

              <div className="bg-white rounded-xl p-6 mb-6 border-2 border-blue-100">
                <p className="text-lg text-gray-700 mb-2">
                  🎁 <span className="font-bold text-blue-600">Beneficio exclusivo:</span>
                </p>
                <p className="text-gray-600">
                  Agenda tu asesoría gratuita ahora y recibe un <span className="font-bold text-emerald-600">análisis personalizado de automatización</span> para tu empresa, sin costo y sin compromiso.
                </p>
              </div>

              <button
                onClick={handleContactClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Recibir asesoría gratuita
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}