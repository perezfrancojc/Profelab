
import Link from 'next/link';
import { Phone } from 'lucide-react';

export function SiteHeader() {
  return (
    <>
      {/* Barra superior */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2.5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Clases de apoyo y material actualizado para el curso 2026/2027
          </span>

          <Link
            href="/#contacto"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-400" />
            <span>Resuelve tus dudas con un docente</span>
          </Link>
        </div>
      </div>

      {/* Encabezado principal */}
      <header className="bg-[#FAF9F5]/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

          <Link href="/" className="group flex flex-col">
            <span className="font-serif italic font-normal text-2xl text-red-600 tracking-tight leading-none group-hover:text-red-700 transition-colors">
              JuancaEduca
            </span>

            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">
              Matemáticas · Física · Química
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Inicio
            </Link>

            <Link href="/#asignaturas" className="hover:text-red-600 transition-colors">
              Asignaturas
            </Link>

            <Link
              href="/#videos"
              className="hover:text-red-600 transition-colors"
            >
              Vídeos
            </Link>

            <Link
              href="/#asignaturas"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-xs uppercase font-bold tracking-wider transition-all shadow-sm"
            >
              Explorar cursos
            </Link>
          </nav>

        </div>
      </header>
    </>
  );
}
