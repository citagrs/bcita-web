import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#003862] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Columna 1 */}
        <div>
          <Image
  src="/b-cita1.png"
  alt="B-cita Logo"
  width={160}
  height={160}
  className="h-14 w-auto mb-4"
  priority={false}
/>

          <p className="text-gray-300 text-sm">
            Automatización, Inteligencia Artificial y Soluciones Low-Code para empresas que quieren avanzar.
          </p>
        </div>

        {/* Columna 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Servicios</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Automatización Empresarial</li>
            <li>• Apps internas con Power Apps</li>
            <li>• Arquitectura documental con SharePoint</li>
            <li>• IA para procesos internos</li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contacto</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email: <a href="mailto:soluciones@bcita.com.co" className="underline">soluciones@bcita.com.co</a></li>
            <li>(+57) 314 253 9496</li>
            <li>Colombia 🇨🇴</li>
            <li>Disponible Lunes–Sábado</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs mt-12">
        © {new Date().getFullYear()} B-cita Soluciones y Automatización. Todos los derechos reservados.
      </p>
    </footer>
  );
}
