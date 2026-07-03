import type { Metadata } from "next";

import FlowHero from "../../components/automatizaciones/FlowHero";
import Counters from "../../components/automatizaciones/Counters";
import Capabilities from "../../components/automatizaciones/Capabilities";
import BeforeAfter from "../../components/automatizaciones/BeforeAfter";
import TechStack from "../../components/automatizaciones/TechStack";
import ProcessTimeline from "../../components/automatizaciones/ProcessTimeline";
import Cases from "../../components/automatizaciones/Cases";
import ContactForm from "../../components/automatizaciones/ContactForm";
import Footer from "../../components/v2/Footer";

export const metadata: Metadata = {
  title: "Automatización de procesos para empresas | BCITA",
  description:
    "Automatización de procesos en Colombia: flujos automáticos, integración de sistemas e IA para empresas. Automatiza tu negocio y ahorra horas de trabajo manual cada semana.",
  keywords: [
    "automatización de procesos Colombia",
    "automatizar negocio",
    "flujos automáticos",
    "IA para empresas",
    "Power Automate Colombia",
    "integración de sistemas",
  ],
  alternates: { canonical: "https://bcita.com.co/automatizaciones" },
  openGraph: {
    title: "Automatización de procesos para empresas | BCITA",
    description:
      "Flujos automáticos, integración de sistemas e IA para que tu empresa trabaje sola. Diagnóstico gratuito.",
    url: "https://bcita.com.co/automatizaciones",
    type: "website",
    locale: "es_CO",
  },
};

export default function AutomatizacionesPage() {
  return (
    <main className="bg-white text-gray-900">
      <FlowHero />
      <Counters />
      <Capabilities />
      <BeforeAfter />
      <TechStack />
      <ProcessTimeline />
      <Cases />
      <ContactForm />
      <Footer />
    </main>
  );
}
