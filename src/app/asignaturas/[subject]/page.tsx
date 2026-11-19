import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { SITE_URL } from '@/lib/config';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { SectionFusionHeader, FusionSection } from '@/components/SectionFusionHeader';
import { GlassBadge } from '@/components/GlassBadge';
import { themeFor } from '@/lib/subjectTheme';

export const revalidate = 3600;

interface Props {
  params: Promise<{
    subject: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject } = await params;

  const isPhysics = subject.toLowerCase().includes('fisica');

  const title = isPhysics
    ? 'Física y Química ESO y Bachillerato | Apuntes y ejercicios | JuancaEduca'
    : 'Matemáticas ESO y Bachillerato | Apuntes y ejercicios | JuancaEduca';

  const description = isPhysics
    ? 'Aprende Física y Química de ESO y Bachillerato con apuntes, ejercicios resueltos en PDF, explicaciones en vídeo y tests de autoevaluación.'
    : 'Aprende Matemáticas de ESO y Bachillerato con apuntes, ejercicios resueltos en PDF, explicaciones en vídeo y tests de autoevaluación.';

  const canonical = `${SITE_URL}/asignaturas/${encodeURIComponent(subject)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'JuancaEduca',
      locale: 'es_ES',
      type: 'website',
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params;

  const cleanSubject = subject.toLowerCase();
  const isPhysics = cleanSubject.includes('fisica');
  const prefix = isPhysics ? 'fq' : 'mat';
  const subjectKey = isPhysics ? 'fq' : 'mat';
  const subjectTitle = isPhysics ? 'Física y Química' : 'Matemáticas';
  const theme = themeFor(subject);

  const { data: dbSubjects } = await supabase
    .from('subjects')
    .select('*')
    .like('id', `${prefix}-%`);

  if (!dbSubjects || dbSubjects.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased selection:bg-red-100 selection:text-red-900">

      <SectionFusionHeader
        title={subjectTitle}
        compactTitle={`Cursos de ${subjectTitle}`}
        backHref="/"
        backLabel="Inicio"
        triggerId="subject-heading"
      />
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <FusionSection id="subject-heading">
          <div className="border-b border-slate-200/80 pb-8">
            <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${theme.accent}`}>
              Selecciona tu curso
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Cursos de {subjectTitle}
            </h1>
          </div>
        </FusionSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dbSubjects.map((subItem) => {
            const coursePath = subItem.slug || subItem.id;
            const levelLabel = String(subItem.level || '')
              .replace(/^(\d)-eso$/i, '$1º ESO')
              .replace(/^(\d)-bachillerato$/i, '$1º Bachillerato')
              .replace(/-/g, ' ');

            return (
              <Link
                key={subItem.id}
                href={`/asignaturas/${subject}/${coursePath}`}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm group flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.28)]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center border shrink-0 ${theme.iconBox}`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <GlassBadge subject={subjectKey}>{levelLabel}</GlassBadge>
                  </div>
                  <h2
                    className={`text-xl font-extrabold text-slate-900 mb-2 transition-colors uppercase ${theme.accentHover}`}
                  >
                    {subItem.name}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {subItem.description || 'Temas y materiales resueltos para este curso.'}
                  </p>
                </div>

                <div
                  className={`flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-800 ${theme.accentHover}`}
                >
                  <span>Ver temas del curso</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform ${theme.accentHover}`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}