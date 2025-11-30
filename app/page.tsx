import HeroTitle from "../components/HeroTitle";


export default function Home() {
  return (
<main className="min-h-screen bg-white text-gray-900">
  {/* Hero con fondo */}
  <section
  className="relative flex flex-col items-center text-center py-32 px-6 overflow-hidden"
  style={{
    backgroundImage: "url('https://plus.unsplash.com/premium_photo-1664304165765-30919f4f2211?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Capa oscura para contraste */}
  <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

  {/* Contenido */}
  <div className="relative z-10 max-w-3xl mx-auto">
    <HeroTitle />

    <p className="text-xl text-gray-700 mt-6 max-w-2xl leading-relaxed mx-auto">
      En B-cita Soluciones transformamos procesos manuales en flujos automáticos,
      integrando IA y herramientas low-code.
    </p>

    <div className="mt-10 flex gap-4 flex-wrap justify-center">
      <a
        href="#servicios"
        className="px-6 py-3 bg-[#0066B3] text-white rounded-full text-lg font-medium hover:bg-[#003862] transition-all shadow-md hover:shadow-lg"
      >
        Ver servicios
      </a>

      <a
        href="#contacto"
        className="px-6 py-3 border border-black text-gray-700 rounded-full text-lg font-medium hover:bg-white/20 transition-all"
      >
        Contacto
      </a>
    </div>
  </div>
</section>


{/* Benefits */}
<section id="por-que" className="py-20 px-6 bg-gray-50">
  <h2 className="text-4xl font-bold text-center mb-16">
    ¿Por qué elegir soluciones low-code con B-cita?
  </h2>

  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
    
    <div className="p-8 bg-white rounded-2xl shadow-sm border hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-3">Implementación en tiempo récord</h3>
      <p className="text-gray-600">
        Construimos automatizaciones y apps internas en días, no meses. 
        Resultados rápidos y medibles.
      </p>
    </div>

    <div className="p-8 bg-white rounded-2xl shadow-sm border hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-3">Concreto y práctico</h3>
      <p className="text-gray-600">
        Diseñamos soluciones simples de usar, alineadas a tus procesos reales
        y sin dependencia constante del área de TI.
      </p>
    </div>

    <div className="p-8 bg-white rounded-2xl shadow-sm border hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-3">Integración profunda con Microsoft 365</h3>
      <p className="text-gray-600">
        SharePoint, Power Apps, Power Automate y Teams trabajando como una 
        estructura digital unificada para tu empresa.
      </p>
    </div>

  </div>
</section>


{/* Services */}
<section id="servicios" className="py-24 px-6">
  <h2 className="text-4xl font-bold text-center mb-12">
    Servicios B-cita Soluciones
  </h2>

  <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

    {/* Servicio 1 */}
    <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl border transition">
      <h3 className="text-2xl font-bold mb-4">
        Automatización Empresarial
      </h3>
      <p className="text-gray-600 mb-4">
        Optimiza tareas repetitivas con flujos inteligentes.
      </p>
      <ul className="text-gray-600 space-y-2 text-sm">
        <li>• Power Automate</li>
        <li>• n8n</li>
        <li>• IA para documentos y correos</li>
      </ul>
    </div>

    {/* Servicio 2 */}
    <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl border transition">
      <h3 className="text-2xl font-bold mb-4">
        Apps internas low-code
      </h3>
      <p className="text-gray-600 mb-4">
        Digitalizamos procesos con apps rápidas y seguras.
      </p>
      <ul className="text-gray-600 space-y-2 text-sm">
        <li>• Power Apps</li>
        <li>• Formularios modernos</li>
        <li>• Automatización conectada a Microsoft 365</li>
      </ul>
    </div>

    {/* Servicio 3 */}
    <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl border transition">
      <h3 className="text-2xl font-bold mb-4">
        Portales y Gestión documental
      </h3>
      <p className="text-gray-600 mb-4">
        Estructura tu información con herramientas colaborativas.
      </p>
      <ul className="text-gray-600 space-y-2 text-sm">
        <li>• SharePoint Online</li>
        <li>• Bibliotecas y flujos de aprobación</li>
        <li>• Integración con Teams y Power Automate</li>
      </ul>
    </div>

  </div>
</section>


      {/* CTA Final */}
      <section id="contacto" className="py-32 px-6 text-center bg-black text-white">
        <h2 className="text-5xl font-bold">¿Listo para empezar?</h2>
        <p className="text-gray-300 mt-4 text-lg max-w-xl mx-auto">
          Agenda una asesoría o cuéntanos tu necesidad. Diseñaremos una
          solución real para tu empresa.
        </p>

        <a
          href="mailto:soluciones@bcita.com.co"
          className="inline-block mt-10 px-10 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition"
        >
          Contáctanos
        </a>
      </section>
    </main>
  );
}
