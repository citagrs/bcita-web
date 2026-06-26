"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="navbar-logo" aria-label="Inicio BCITA">
            <Image
              src="/b-cita1.png"
              alt="BCITA Soluciones y Automatización"
              width={140}
              height={140}
              priority
            />
          </Link>

          <nav className="navbar-links">
            <a href="#servicios">Servicios</a>
            <a href="#resultados">Resultados</a>
            <a href="#contacto">Contacto</a>
            <a href="/servicios/index.html">Soluciones</a>
          </nav>

          <a
            href="https://wa.me/573142539496?text=Hola,%20quiero%20hablar%20con%20un%20asesor"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-cta"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Hablar con un asesor
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="navbar-burger"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="navbar-mobile">
            <a href="#servicios" onClick={() => setOpen(false)}>Servicios</a>
            <a href="#resultados" onClick={() => setOpen(false)}>Resultados</a>
            <a href="#contacto" onClick={() => setOpen(false)}>Contacto</a>
            <a href="/servicios/index.html" onClick={() => setOpen(false)}>Soluciones</a>
            <a
              href="https://wa.me/573142539496?text=Hola,%20quiero%20hablar%20con%20un%20asesor"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="navbar-mobile-cta"
            >
              Hablar con un asesor
            </a>
          </div>
        )}
      </header>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(229, 231, 235, 0.7);
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.9rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
        }
        .navbar-logo :global(img) {
          height: 38px;
          width: auto;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .navbar-links a {
          font-size: 0.9rem;
          font-weight: 500;
          color: #4b5563;
          text-decoration: none;
          transition: color 0.2s;
        }
        .navbar-links a:hover {
          color: #0066b3;
        }
        .navbar-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #0066b3;
          color: #fff !important;
          text-decoration: none;
          padding: 0.55rem 1.1rem;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 600;
          transition: background 0.2s, transform 0.2s;
        }
        .navbar-cta:hover {
          background: #003862;
          transform: translateY(-1px);
        }
        .navbar-burger {
          display: none;
          background: none;
          border: none;
          font-size: 1.4rem;
          color: #4b5563;
          cursor: pointer;
        }
        .navbar-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .navbar-links,
          .navbar-cta {
            display: none;
          }
          .navbar-burger {
            display: block;
          }
          .navbar-mobile {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 1.5rem 1.5rem;
            background: #fff;
            border-top: 1px solid #e5e7eb;
          }
          .navbar-mobile a {
            font-size: 0.95rem;
            font-weight: 500;
            color: #374151;
            text-decoration: none;
          }
          .navbar-mobile-cta {
            display: inline-block;
            background: #0066b3;
            color: #fff !important;
            padding: 0.6rem 1.2rem;
            border-radius: 999px;
            text-align: center;
            font-weight: 600;
            width: fit-content;
          }
        }
      `}</style>
    </>
  );
}
