"use client";
import { motion } from 'framer-motion';
import { Zap, Smartphone, Brain, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Automatización de procesos',
    description: 'Eliminamos tareas repetitivas como registros, correos, aprobaciones y reportes.',
    color: 'blue',
  },
  {
    icon: Smartphone,
    title: 'Aplicaciones empresariales',
    description: 'Apps simples para pedidos, control y gestión interna. Sin papel ni Excel desordenado.',
    color: 'emerald',
  },
  {
    icon: Brain,
    title: 'Inteligencia Artificial aplicada',
    description: 'Lectura automática de documentos, correos y datos para ahorrar tiempo y reducir errores.',
    color: 'purple',
  },
];

export default function Services() {
  const handleServiceClick = (serviceName: string) => {
    const message = `Hola, estoy interesado en: ${serviceName}`;
    window.open(`https://wa.me/573024446047?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="servicios" className="py-20 bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl mb-4 text-gray-900">
            Nuestros servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones diseñadas para empresas que quieren crecer sin complicaciones
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              emerald: 'bg-emerald-100 text-emerald-600',
              purple: 'bg-purple-100 text-purple-600',
            }[service.color];

            const hoverBorderClasses = {
              blue: 'hover:border-blue-400',
              emerald: 'hover:border-emerald-400',
              purple: 'hover:border-purple-400',
            }[service.color];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100 ${hoverBorderClasses} transition-all duration-300 hover:shadow-xl flex flex-col`}
              >
                <div className={`w-16 h-16 ${colorClasses} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl mb-4 text-gray-900">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                  {service.description}
                </p>

                <button
                  onClick={() => handleServiceClick(service.title)}
                  className="group text-blue-600 font-medium flex items-center gap-2 hover:gap-3 transition-all duration-200"
                >
                  Quiero este servicio
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}