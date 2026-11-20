import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { SectionFusionHeader, FusionSection } from '@/components/SectionFusionHeader';
import { SIMULATORS } from '@/data/simulators';
import { THEME } from '@/lib/subjectTheme';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Simuladores interactivos de Matemáticas y Física | JuancaEduca',
  description:
    'Simuladores interactivos para entender Matemáticas y Física y Química: mueve los parámetros y observa qué ocurre.',
  alternates: { canonical: `${SITE_URL}/simuladores` },
};

const SECTIONS = [
  { key: 'mat' as const, title: 'Matemáticas' },
  { key: 'fq' as const, title: 'Física y Química' },
];

export default function SimulatorsHub() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased">
      <SectionFusionHeader
        title="Simuladores"
        compactTitle="Simuladores interactivos"
        backHref="/"
        backLabel="Inicio"
        triggerId="sim-heading"
      />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <FusionSection id="sim-heading">
          <div className="border-b border-slate-200/80 pb-8">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
              Aprende explorando
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Simuladores interactivos
            </h1>
            <p className="text-slate-600 mt-3 text-base leading-relaxed max-w-2xl">
              Mueve los parámetros, observa qué cambia y descubre por qué funciona cada concepto.
            </p>
          </div>
        </FusionSection>

        {SECTIONS.map((section) => {
          const items = SIMULATORS.filter((s) => s.subject === section.key);
          const theme = THEME[section.key];

          return (
            <section key={section.key} id={section.key} className="space-y-4 scroll-mt-28">
              <h2 className={`text-xl font-black tracking-tight ${theme.accent}`}>{section.title}</h2>

              {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/simuladores/${s.slug}`}
                      className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm group flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.28)]"
                    >
                      <div>
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition ${theme.iconBox} ${theme.iconBoxHover}`}>
                          <SlidersHorizontal className="w-5 h-5" />
                        </div>
                        <h3 className={`text-lg font-extrabold text-slate-900 mb-2 transition-colors ${theme.accentHover}`}>
                          {s.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.description}</p>
                        <p className="text-xs font-semibold text-slate-500 mb-6">{s.levels}</p>
                      </div>
                      <div className={`flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-800 transition-colors ${theme.accentHover}`}>
                        <span>Abrir simulador</span>
                        <ArrowRight className={`w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all ${theme.accentHover}`} />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-sm text-slate-500">
                  Próximamente.
                </div>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}