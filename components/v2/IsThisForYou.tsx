"use client";

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const points = [
  'Usas Excel para controlar procesos',
  'Recibes pedidos o información por WhatsApp',
  'Tu equipo repite tareas todos los días',
  'Pierdes tiempo por errores y reprocesos',
];

export default function IsThisForYou() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl mb-4 text-gray-900">
            ¿Esto es para ti?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 bg-blue-50 p-6 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-200"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-lg">{point}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xl text-gray-700 font-medium"
        >
          Si te identificas con alguno de estos puntos, podemos ayudarte.
        </motion.p>
      </div>
    </section>
  );
}