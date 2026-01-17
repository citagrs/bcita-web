import Hero from "../components/v2/Hero";
import IsThisForYou from "../components/v2/IsThisForYou";
import AIAssistantCTA from "../components/v2/AIAssistantCTA";
import Services from "../components/v2/Services";
import AutoDiagnostic from "../components/v2/AutoDiagnostic";
import BeforeAfter from "../components/v2/BeforeAfter";
import FinalCTA from "../components/v2/FinalCTA";
import Footer from "../components/v2/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* ========================= */}
      {/* HERO PRINCIPAL */}
      {/* ========================= */}
      <Hero />

      {/* ========================= */}
      {/* ¿ESTO ES PARA TI? */}
      {/* ========================= */}
      <IsThisForYou />

      <AIAssistantCTA />

      {/* ========================= */}
      {/* SERVICIOS */}
      {/* ========================= */}
      <Services />

      {/* ========================= */}
      {/* AUTODIAGNÓSTICO */}
      {/* ========================= */}
      <AutoDiagnostic />

      {/* ========================= */}
      {/* ANTES / DESPUÉS */}
      {/* ========================= */}
      <BeforeAfter />

      {/* ========================= */}
      {/* CTA FINAL */}
      {/* ========================= */}
      <FinalCTA />

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}
      <Footer />

    </main>
  );
}
