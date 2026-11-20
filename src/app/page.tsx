import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { VIDEOS } from '@/data/educationalData';
import { ALL_QUIZZES } from '@/data/quizzes';
import { YouTubeFacade } from '@/components/YouTubeFacade';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { ContactSection } from '@/components/ContactSection';
import { HomeNavigation } from '@/components/HomeNavigation';
import { GlassBadge } from '@/components/GlassBadge';
import { THEME } from '@/lib/subjectTheme';
import { SIMULATORS } from '@/data/simulators';
import { SlidersHorizontal } from 'lucide-react';

export const revalidate = 3600;

async function getStats() {
  const count = async (table: string) => {
    const { count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    return count ?? 0;
  };

  const [topics, videos, exerciseFiles, materials, dbQuizzes] = await Promise.all([
    count('topics'),
    count('videos'),
    count('exercise_files'),
    count('materials'),
    count('quizzes'),
  ]);

  return {
    topics,
    tests: ALL_QUIZZES.length + dbQuizzes,
    videos: videos + VIDEOS.length,
    pdfs: exerciseFiles + materials,
  };
}

const CARD =
  'bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 shadow-sm flex flex-col justify-between group transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.28)]';

export default async function HomePage() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased selection:bg-red-100 selection:text-red-900">

      <HomeNavigation />

      {/* Hero Principal */}
      <section className="relative py-20 px-6 border-b border-slate-200/60 overflow-hidden">
        <div aria-hidden className="hero-dots absolute inset-0 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="w-8 h-[2px] bg-red-600" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
              Aprendizaje · Claridad · Rigor
            </span>
            <span className="w-8 h-[2px] bg-red-600" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Matemáticas, Física y Química

            <span className="block mt-4 sm:mt-6">
              <span className="font-serif italic font-normal text-red-600 relative inline-block">
                sin rodeos.

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

      {/* Cifras */}
      <section className="bg-white py-8 px-6 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { n: stats.topics, label: 'Temas' },
            { n: stats.tests, label: 'Tests' },
            { n: stats.videos, label: 'Vídeos' },
            { n: stats.pdfs, label: 'PDFs resueltos' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{s.n}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Asignaturas */}
      <section id="asignaturas" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="max-w-xl mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Plan de estudios</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Asignaturas y Bloques</h2>
          <p className="text-sm text-slate-600 mt-2">Selecciona la materia que necesitas reforzar para ver los cursos académicos disponibles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Matemáticas */}
          <Link href="/asignaturas/matematicas" className={CARD}>
            <div>
              <div className="mb-4">
                <GlassBadge subject="mat">Materia</GlassBadge>
              </div>
              <h3 className={`text-2xl font-extrabold text-slate-900 mb-2 transition-colors ${THEME.mat.accentHover}`}>
                Matemáticas
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Álgebra, geometría, funciones, cálculo y estadística organizados por curso académico.
              </p>
            </div>
            <div className={`flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-bold text-slate-800 transition-colors ${THEME.mat.accentHover}`}>
              <span>Seleccionar curso</span>
              <ArrowRight className={`w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all ${THEME.mat.accentHover}`} />
            </div>
          </Link>

          {/* Física y Química */}
          <Link href="/asignaturas/fisica-y-quimica" className={CARD}>
            <div>
              <div className="mb-4">
                <GlassBadge subject="fq">Materia</GlassBadge>
              </div>
              <h3 className={`text-2xl font-extrabold text-slate-900 mb-2 transition-colors ${THEME.fq.accentHover}`}>
                Física y Química
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Estudio de la materia, movimiento, fuerzas, energía y reacciones químicas por nivel.
              </p>
            </div>
            <div className={`flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-bold text-slate-800 transition-colors ${THEME.fq.accentHover}`}>
              <span>Seleccionar curso</span>
              <ArrowRight className={`w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all ${THEME.fq.accentHover}`} />
            </div>
          </Link>

        </div>
      </section>

            {/* Simuladores */}
      <section id="simuladores" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="max-w-xl mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Aprende explorando</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Simuladores interactivos</h2>
          <p className="text-sm text-slate-600 mt-2">Mueve los parámetros, observa qué cambia y entiende cada concepto de forma visual.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {([
            { key: 'mat', title: 'Matemáticas', text: 'Funciones, ecuaciones, trigonometría y más, en gráficas que puedes manipular.' },
            { key: 'fq', title: 'Física y Química', text: 'Movimiento, fuerzas, gases y reacciones, simulados paso a paso.' },
          ] as const).map((s) => {
            const n = SIMULATORS.filter((x) => x.subject === s.key).length;
            return (
              <Link key={s.key} href={`/simuladores#${s.key}`} className={CARD}>
                <div>
                  <div className="mb-4">
                    <GlassBadge subject={s.key}>{n > 0 ? `${n} ${n === 1 ? 'simulador' : 'simuladores'}` : 'Próximamente'}</GlassBadge>
                  </div>
                  <h3 className={`text-2xl font-extrabold text-slate-900 mb-2 transition-colors ${THEME[s.key].accentHover}`}>
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">{s.text}</p>
                </div>
                <div className={`flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-bold text-slate-800 transition-colors ${THEME[s.key].accentHover}`}>
                  <span>Ver simuladores</span>
                  <ArrowRight className={`w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all ${THEME[s.key].accentHover}`} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Metodología */}
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
              <p className="text-sm text-slate-600 leading-relaxed">
                Navega por la asignatura según tu curso (ESO o Bachillerato) y encuentra el tema exacto que estás dando en el colegio o instituto.
              </p>
            </div>

            <div className="relative">
              <span className="text-5xl font-black text-slate-200 font-serif block mb-3">02</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Repasa la teoría esencial</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mira las lecciones en vídeo donde resumimos las fórmulas clave y los conceptos teóricos imprescindibles sin rodeos.
              </p>
            </div>

            <div className="relative">
              <span className="text-5xl font-black text-slate-200 font-serif block mb-3">03</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Domina los ejercicios</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Practica con ejercicios resueltos paso a paso donde te explicamos el razonamiento detrás de cada cálculo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vídeos */}
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
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{vid.description}</p>
            </div>
          ))}
        </div>
      </section>
      <ContactSection />
    </div>
  );
}