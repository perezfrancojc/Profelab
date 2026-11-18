import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, ChevronRight, GraduationCap } from 'lucide-react';
import {SectionFusionHeader, FusionSection,} from '@/components/SectionFusionHeader';
import { GlassBadge } from '@/components/GlassBadge';
export const revalidate = 3600;

interface Props {
  params: Promise<{
    subject: string;
  }>;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject } = await params;

  const cleanSubject = subject.toLowerCase();
  const isPhysics = cleanSubject.includes('fisica');

  const subjectTitle = isPhysics
    ? 'Física y Química'
    : 'Matemáticas';

  const title = isPhysics
    ? 'Física y Química ESO y Bachillerato | Apuntes y ejercicios | JuancaEduca'
    : 'Matemáticas ESO y Bachillerato | Apuntes y ejercicios | JuancaEduca';

  const description = isPhysics
    ? 'Aprende Física y Química de ESO y Bachillerato con apuntes, ejercicios resueltos en PDF, explicaciones en vídeo y tests de autoevaluación.'
    : 'Aprende Matemáticas de ESO y Bachillerato con apuntes, ejercicios resueltos en PDF, explicaciones en vídeo y tests de autoevaluación.';

  const canonical =
    `https://profelabjuancaeduca.vercel.app/asignaturas/${encodeURIComponent(subject)}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'JuancaEduca',
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}


export default async function SubjectPage({ params }: Props) {
  const { subject } = await params;

  const cleanSubject = subject.toLowerCase();
  const prefix = cleanSubject.includes('fisica') ? 'fq' : 'mat';
  const subjectTitle = cleanSubject.includes('fisica') ? 'Física y Química' : 'Matemáticas';

  // Consultar directamente las asignaturas de Supabase filtrando por prefijo (mat- o fq-)
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
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
              Selecciona tu curso
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Cursos de {subjectTitle}
            </h1>
          </div>
        </FusionSection>

        {/* Tarjetas de Cursos obtenidas dinámicamente de Supabase */}
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
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <GlassBadge>{levelLabel}</GlassBadge>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-red-600 transition-colors uppercase">
                    {subItem.name}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {subItem.description || 'Temas y materiales resueltos para este curso.'}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-800 group-hover:text-red-600">
                  <span>Ver temas del curso</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}