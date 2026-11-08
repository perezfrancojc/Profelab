import Link from 'next/link';
import { SUBJECTS, TOPICS, VIDEOS } from '@/data/educationalData';
import { YouTubeFacade } from '@/components/YouTubeFacade';
import { Phone, ArrowRight, CheckCircle2, BookOpen, PlayCircle, Sparkles, HelpCircle } from 'lucide-react';
import { ContactSection } from '@/components/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased selection:bg-red-100 selection:text-red-900">
      
      {/* Barra superior sutil */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2.5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Clases de apoyo y material actualizado para el curso 2026/2027
          </span>
          <a href="#contacto" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-red-400" />
            <span>Resuelve tus dudas con un docente</span>
          </a>
        </div>
      </div>

      {/* Navegación estilo editorial */}
      <header className="bg-[#FAF9F5]/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-red-600 text-white rounded-xl font-extrabold text-lg flex items-center justify-center shadow-sm group-hover:bg-red-700 transition-colors">
              PL
            </div>
            <div>
              <span className="font-black text-xl text-slate-900 tracking-tight block leading-none">ProfeLab</span>
              <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">Academia de Ciencias</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link href="#asignaturas" className="hover:text-red-600 transition-colors">Asignaturas</Link>
            <Link href="#metodo" className="hover:text-red-600 transition-colors">Metodología</Link>
            <Link href="#videos" className="hover:text-red-600 transition-colors">Vídeos</Link>
            <Link 
              href="#asignaturas" 
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-xs uppercase font-bold tracking-wider transition-all shadow-sm"
            >
              Explorar Cursos
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Principal con aire de publicación cuidada */}
      <section className="py-20 px-6 border-b border-slate-200/60">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-700 bg-red-50 border border-red-100 px-3.5 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-red-600" /> Refuerzo Escolar de Alto Nivel
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Matemáticas, Física y Química
            
            {/* Salto de línea obligado con margen superior */}
            <span className="block mt-4 sm:mt-6">
              <span className="font-serif italic font-normal text-red-600 relative inline-block">
                sin rodeos.
                
                {/* Subrayado orgánico ajustado a la anchura del texto */}
                <svg 
                  className="absolute -bottom-2 left-0 w-full h-3.5 text-red-500/80 pointer-events-none" 
                  viewBox="0 0 200 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M 4 14 C 55 4, 145 4, 196 14" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                </svg>
              </span>
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Todo el temario oficial organizado bloque a bloque. Teoría clara, ejemplos resueltos paso a paso y colecciones de ejercicios para preparar tus exámenes con seguridad.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a 
              href="#asignaturas" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-7 rounded-xl transition shadow-sm text-sm"
            >
              Ver Temarios Disponibles
            </a>
            <a 
              href="#videos" 
              className="bg-white hover:bg-slate-100 text-slate-800 font-semibold py-3.5 px-7 rounded-xl transition border border-slate-200 text-sm flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-red-600" /> Ver Clases de Muestra
            </a>
          </div>
        </div>
      </section>

      {/* Píldoras de confianza con diseño orgánico */}
      <section className="bg-white py-6 px-6 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
            <span>Explicaciones adaptadas al currículo oficial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
            <span>Paso a paso en problemas tipo examen</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
            <span>Sin registros ni suscripciones complejas</span>
          </div>
        </div>
      </section>

      {/* Bloque de Asignaturas (Selección de materia principal) */}
      <section id="asignaturas" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="max-w-xl mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Plan de estudios</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Asignaturas y Bloques</h2>
          <p className="text-sm text-slate-600 mt-2">Selecciona la materia que necesitas reforzar para ver los cursos académicos disponibles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Tarjeta Matemáticas */}
          <Link
            href="/asignaturas/matematicas"
            className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-slate-300"
          >
            <div>
              <span className="inline-block text-[11px] font-extrabold px-3 py-1 rounded-md bg-slate-100 text-slate-700 uppercase tracking-wider border border-slate-200/50 mb-4">
                Materia
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                Matemáticas
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Álgebra, geometría, funciones, cálculo y estadística organizados por curso académico.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-bold text-slate-800 group-hover:text-red-600">
              <span>Seleccionar curso</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Tarjeta Física y Química */}
          <Link
            href="/asignaturas/fisica-y-quimica"
            className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-slate-300"
          >
            <div>
              <span className="inline-block text-[11px] font-extrabold px-3 py-1 rounded-md bg-slate-100 text-slate-700 uppercase tracking-wider border border-slate-200/50 mb-4">
                Materia
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                Física y Química
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Estudio de la materia, movimiento, fuerzas, energía y reacciones químicas por nivel.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-bold text-slate-800 group-hover:text-red-600">
              <span>Seleccionar curso</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

        </div>
      </section>

      {/* Metodología en 3 pasos */}
      <section id="metodo" className="bg-white py-20 px-6 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Cómo funciona</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Un método pensado para entender, no solo memorizar</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="relative">
              <span className="text-5xl font-black text-slate-200 font-serif block mb-3">01</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ubica tu tema</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Navega por la asignatura según tu curso (ESO o Bachillerato) y encuentra el tema exacto que estás dando en el colegio o instituto.
              </p>
            </div>

            <div className="relative">
              <span className="text-5xl font-black text-slate-200 font-serif block mb-3">02</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Repasa la teoría esencial</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mira las lecciones en vídeo donde resumimos las fórmulas clave y los conceptos teóricos imprescindibles sin rodeos.
              </p>
            </div>

            <div className="relative">
              <span className="text-5xl font-black text-slate-200 font-serif block mb-3">03</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Domina los ejercicios</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Practica con ejercicios resueltos paso a paso donde te explicamos el razonamiento detrás de cada cálculo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Vídeos Destacados */}
      <section id="videos" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="max-w-xl mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Clases abiertas</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Aulas en Vídeo</h2>
          <p className="text-sm text-slate-600 mt-2">Ejemplos explicados de forma clara para resolver las dudas más frecuentes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIDEOS.map((vid) => (
            <div key={vid.id} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <YouTubeFacade youtubeId={vid.youtubeId} title={vid.title} />
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-4">{vid.title}</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{vid.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-slate-900 text-white py-12 px-6 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 text-white rounded-lg font-black text-base flex items-center justify-center">
              PL
            </div>
            <div>
              <span className="font-bold text-white text-base block">ProfeLab</span>
              <p className="text-xs text-slate-400 mt-0.5">Material de apoyo para estudiantes de ESO y Bachillerato.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">© 2026 ProfeLab. Hecho con vocación docente.</p>
        </div>
      </footer>
      <ContactSection />
    </div>
    
  );
}