"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
  src="/b-cita1.png"
  alt="B-cita Logo"
  width={120}
  height={120}
  className="h-10 w-auto"
  priority
/>

        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <li><a href="#servicios" className="hover:text-[#0066B3]">Servicios</a></li>
          <li><a href="#resultados" className="hover:text-[#0066B3]">Resultados</a></li>
          <li><a href="#contacto" className="hover:text-[#0066B3]">Contacto</a></li>
          <li>
            <a 
              href="https://beacons.ai/b_cita/mediakit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#0066B3]"
            >
              Portafolio de Servicios
            </a>
          </li>

        </ul>

        {/* Botón CTA */}
        <a
          href="mailto:soluciones@bcita.com.co"
          className="hidden md:block px-5 py-2 bg-[#0066B3] text-white rounded-full hover:bg-[#003862] transition"
        >
          Escríbenos
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 hover:text-[#0066B3] transition"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            <li><a href="#servicios" onClick={() => setOpen(false)}>Servicios</a></li>
            <li><a href="#por-que" onClick={() => setOpen(false)}>¿Por qué B-cita?</a></li>
            <li><a href="#contacto" onClick={() => setOpen(false)}>Contacto</a></li>
            <li>
              <a
                href="https://beacons.ai/b_cita/mediakit"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
    Portafolio de Servicios
  </a>
</li>

          </ul>
        </div>
      )}
    </header>
  );
}
