"use client";
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/b-cita1.png"
              alt="BCITA Soluciones y Automatización"
              width={140}
              height={140}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 leading-relaxed">
              Automatizamos procesos para que tu empresa trabaje sola. Más tiempo para lo importante.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white text-xl mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <a
                  href="tel:+573142539496"
                  className="flex items-center gap-3 hover:text-emerald-600 transition"
                  aria-label="Llamar al número +57 314 253 9496"
                >
                  <Phone className="w-5 h-5 text-emerald-500" />
                  <span>+57 314 253 9496</span>
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:soluciones@bcita.com.co"
                  className="flex items-center gap-3 hover:text-emerald-600 transition"
                >
                  <Mail className="w-5 h-5 text-emerald-500" />
                  <span>soluciones@bcita.com.co</span>
                </a>

              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <span>Colombia</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white text-xl mb-4">Horario</h3>
            <p className="text-gray-400">
              Lunes a Viernes<br />
              8:00 AM - 6:00 PM<br />
              <span className="text-emerald-500">Asesoría gratuita disponible</span>
            </p>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 space-y-2">
          <p>
            <a href="/politica-datos/index.html" className="underline hover:text-gray-300 transition text-sm">
              Política de Tratamiento de Datos Personales
            </a>
          </p>
          <p>© 2026 B-cita Soluciones y Automatización. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
