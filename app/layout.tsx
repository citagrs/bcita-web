import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Componentes
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";


// Fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata del sitio
export const metadata: Metadata = {
  title: "B-Cita Soluciones y Automatización",
  description:
    "Automatización empresarial, Inteligencia Artificial, Power Platform y soluciones low-code para empresas en Colombia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* NAVBAR */}
        <Navbar />

        {/* Contenido principal con espacio para el navbar fijo */}
        <div className="pt-24">{children}</div>

        {/* Chat */}
        <ChatWidget />



      </body>
    </html>
  );
}
