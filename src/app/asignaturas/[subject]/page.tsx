import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { SITE_URL } from '@/lib/config';
import { ChevronRight } from 'lucide-react';
import { SectionFusionHeader, FusionSection } from '@/components/SectionFusionHeader';
import { GlassBadge } from '@/components/GlassBadge';
import { themeFor } from '@/lib/subjectTheme';
import { ALL_QUIZZES } from '@/data/quizzes';
import { JsonLd } from '@/components/JsonLd';

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

  const [subjectsRes, topicsRes, dbQuizzesRes] = await Promise.all([
    supabase.from('subjects').select('*').like('id', `${prefix}-%`),
    supabase.from('topics').select('id, subject_id').like('subject_id', `${prefix}-%`),
    supabase.from('quizzes').select('topic_id'),
  ]);

  const dbSubjects = subjectsRes.data;

  if (!dbSubjects || dbSubjects.length === 0) {
    notFound();
  }

  const topics = topicsRes.data || [];
  const topicSubject = new Map(topics.map((t) => [String(t.id), t.subject_id as string]));

  const topicsCount: Record<string, number> = {};
  topics.forEach((t) => {
    topicsCount[t.subject_id] = (topicsCount[t.subject_id] || 0) + 1;
  });

  const testsCount: Record<string, number> = {};
  ALL_QUIZZES.forEach((q) => {
    if (q.subjectId) testsCount[q.subjectId] = (testsCount[q.subjectId] || 0) + 1;
  });
  (dbQuizzesRes.data || []).forEach((q) => {
    const sid = topicSubject.get(String(q.topic_id));
    if (sid) testsCount[sid] = (testsCount[sid] || 0) + 1;
  });

  const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased selection:bg-red-100 selection:text-red-900">

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
            {
              '@type': 'ListItem',
              position: 2,
              name: subjectTitle,
              item: `${SITE_URL}/asignaturas/${subject}`,
            },
          ],
        }}
      />
      
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

            const nTopics = topicsCount[subItem.id] || 0;
            const nTests = testsCount[subItem.id] || 0;

            return (
              <Link
                key={subItem.id}
                href={`/asignaturas/${subject}/${coursePath}`}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm group flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.28)]"
              >
                <div>
                  <div className="mb-4">
                    <GlassBadge subject={subjectKey}>{levelLabel}</GlassBadge>
                  </div>
                  <h2
                    className={`text-xl font-extrabold text-slate-900 mb-2 transition-colors uppercase ${theme.accentHover}`}
                  >
                    {subItem.name}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {subItem.description || 'Temas y materiales resueltos para este curso.'}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 mb-6">
                    {plural(nTopics, 'tema', 'temas')}
                    <span className="mx-1.5 text-slate-300">·</span>
                    {plural(nTests, 'test', 'tests')}
                  </p>
                </div>

                <div
                  className={`flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-800 transition-colors ${theme.accentHover}`}
                >
                  <span>Ver temas del curso</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all ${theme.accentHover}`}
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