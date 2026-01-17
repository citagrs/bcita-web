"use client";
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Target, TrendingDown } from 'lucide-react';

const cases = [
  {
    icon: Clock,
    before: '2 horas diarias en tareas manuales',
    after: '15 minutos con automatización',
    benefit: 'Ahorro de 7.5 horas semanales',
    color: 'blue',
    backgroundImage: 'https://images.unsplash.com/photo-1762500825366-ba34b0c5352e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aW1lJTIwc2F2aW5nJTIwcHJvZHVjdGl2aXR5fGVufDF8fHx8MTc2ODQxNjIyMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: TrendingDown,
    before: '15% de errores en registros manuales',
    after: '0.5% de errores con sistemas automatizados',
    benefit: 'Reducción del 97% en errores',
    color: 'emerald',
    backgroundImage: 'https://images.unsplash.com/photo-1726056652752-58303aafa0c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGVmZmljaWVuY3klMjBncm93dGh8ZW58MXx8fHwxNzY4NDI2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Target,
    before: 'Procesos confusos y sin claridad',
    after: 'Flujos claros y medibles',
    benefit: 'Mayor control y visibilidad',
    color: 'purple',
    backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2ODMwNzc1OHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function BeforeAfter() {
  return (
    <section id="resultados" className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl mb-4 text-gray-900">
            Resultados reales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Así transformamos empresas como la tuya
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((item, index) => {
            const Icon = item.icon;
            const iconBgClasses = {
              blue: 'bg-blue-100 text-blue-600',
              emerald: 'bg-emerald-100 text-emerald-600',
              purple: 'bg-purple-100 text-purple-600',
            }[item.color];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden bg-white rounded-2xl shadow-sm border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-xl"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10"
                  style={{ backgroundImage: `url('${item.backgroundImage}')` }}
                ></div>
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  <div className={`w-16 h-16 ${iconBgClasses} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-500 uppercase tracking-wide">Antes</span>
                      </div>
                      <p className="text-gray-700">{item.before}</p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-gray-500 uppercase tracking-wide">Después</span>
                      </div>
                      <p className="text-gray-900 font-medium">{item.after}</p>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-800 font-medium">{item.benefit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}