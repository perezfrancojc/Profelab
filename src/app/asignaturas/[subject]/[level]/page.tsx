import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { SITE_URL } from '@/lib/config';
import { ChevronRight, Layers } from 'lucide-react';
import { Metadata } from 'next';
import { SectionFusionHeader, FusionSection } from '@/components/SectionFusionHeader';
import { TopicIcon } from '@/components/TopicIcon';
import { themeFor } from '@/lib/subjectTheme';

export const revalidate = 3600;

interface Props {
  params: Promise<{
    subject: string;
    level: string;
  }>;
}

const LEVEL_MAP: Record<string, string> = {
  '1-eso': '1eso',
  '2-eso': '2eso',
  '3-eso': '3eso',
  '4-eso': '4eso',
  '1-bachillerato': '1bach',
  '2-bachillerato': '2bach',
  '1-bach': '1bach',
  '2-bach': '2bach',
  '1-bach-ccss': '1bachccss',
  '2-bach-ccss': '2bachccss',
  '1-bachillerato-ccss': '1bachccss',
  '2-bachillerato-ccss': '2bachccss',
  '1-bachccss': '1bachccss',
  '2-bachccss': '2bachccss',
};

const LEVEL_DISPLAY_MAP: Record<string, string> = {
  '1-eso': '1.º ESO',
  '2-eso': '2.º ESO',
  '3-eso': '3.º ESO',
  '4-eso': '4.º ESO',
  '1-bachillerato': '1.º Bachillerato',
  '2-bachillerato': '2.º Bachillerato',
  '1-bach': '1.º Bachillerato',
  '2-bach': '2.º Bachillerato',
  '1-bach-ccss': '1.º Bachillerato CCSS',
  '2-bach-ccss': '2.º Bachillerato CCSS',
  '1-bachillerato-ccss': '1.º Bachillerato CCSS',
  '2-bachillerato-ccss': '2.º Bachillerato CCSS',
  '1-bachccss': '1.º Bachillerato CCSS',
  '2-bachccss': '2.º Bachillerato CCSS',
  '1eso': '1.º ESO',
  '2eso': '2.º ESO',
  '3eso': '3.º ESO',
  '4eso': '4.º ESO',
  '1bach': '1.º Bachillerato',
  '2bach': '2.º Bachillerato',
  '1bachccss': '1.º Bachillerato CCSS',
  '2bachccss': '2.º Bachillerato CCSS',
};

function createSlug(text: string) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, level } = await params;

  const rawLevel = level.toLowerCase().trim();
  const prefix = subject.toLowerCase().includes('fisica') ? 'fq' : 'mat';

  const mappedLevel =
    LEVEL_MAP[rawLevel] ||
    rawLevel.replace('bachillerato', 'bach').replace('-', '');

  const targetSubjectId = mappedLevel.startsWith(prefix)
    ? mappedLevel
    : `${prefix}-${mappedLevel}`;

  const { data: dbSubject } = await supabase
    .from('subjects')
    .select('name, description')
    .eq('id', targetSubjectId)
    .maybeSingle();

  const levelNames: Record<string, string> = {
    '1eso': '1º ESO',
    '2eso': '2º ESO',
    '3eso': '3º ESO',
    '4eso': '4º ESO',
    '1bach': '1º Bachillerato',
    '2bach': '2º Bachillerato',
    '1bachccss': '1º Bachillerato CCSS',
    '2bachccss': '2º Bachillerato CCSS',
  };

  const subjectName = prefix === 'fq' ? 'Física y Química' : 'Matemáticas';

  const courseName =
    dbSubject?.name ||
    `${subjectName} ${levelNames[mappedLevel] || level}`;

  const title = `${courseName} | Apuntes y ejercicios resueltos | JuancaEduca`;

  const descriptionBase =
    dbSubject?.description?.trim() ||
    `Consulta el temario de ${courseName} con apuntes, ejercicios resueltos en PDF, explicaciones en vídeo y tests de autoevaluación.`;

  const description =
    descriptionBase.length > 160
      ? `${descriptionBase.slice(0, 157).trimEnd()}...`
      : descriptionBase;

  const canonical = `${SITE_URL}/asignaturas/${encodeURIComponent(subject)}/${encodeURIComponent(level)}`;

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

export default async function SubjectLevelPage({ params }: Props) {
  const { subject, level } = await params;

  const rawLevel = level.toLowerCase().trim();
  const prefix = subject.toLowerCase().includes('fisica') ? 'fq' : 'mat';
  const mappedLevel =
    LEVEL_MAP[rawLevel] || rawLevel.replace('bachillerato', 'bach').replace('-', '');

  const targetSubjectId = mappedLevel.startsWith(prefix)
    ? mappedLevel
    : `${prefix}-${mappedLevel}`;

  const theme = themeFor(subject);

  const { data: dbTopicsRaw } = await supabase
    .from('topics')
    .select('*')
    .or(
      `subject_id.eq.${targetSubjectId},subject_id.eq.${rawLevel},subject_id.eq.${mappedLevel},subject_id.eq.${prefix}-${rawLevel}`
    );

  const dbTopics = dbTopicsRaw || [];

  const topicsMap = new Map<string, any>();

  dbTopics.forEach((t: any) => {
    const slug = t.slug || createSlug(t.title) || String(t.id);
    topicsMap.set(slug, {
      id: t.id,
      subjectId: t.subject_id,
      title: t.title,
      slug,
      description: t.description,
      icon: t.icon,
    });
  });

  const allTopics = Array.from(topicsMap.values());
  const subjectTitle = prefix === 'fq' ? 'Física y Química' : 'Matemáticas';
  const normalizedDisplayLevel = rawLevel.replace(/^(mat|fq)-/, '');
  const displayLevel =
    LEVEL_DISPLAY_MAP[rawLevel] ||
    LEVEL_DISPLAY_MAP[normalizedDisplayLevel] ||
    level.replace(/-/g, ' ');
  const courseTitle = `${subjectTitle} ${displayLevel}`;

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased">
      <SectionFusionHeader
        title={courseTitle}
        compactTitle={`Temario Oficial · ${courseTitle}`}
        backHref={`/asignaturas/${subject}`}
        backLabel={subjectTitle}
        triggerId="course-heading"
      />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <FusionSection id="course-heading">
          <div className="border-b border-slate-200/80 pb-6">
            <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${theme.accent}`}>
              Temario Oficial
            </span>
            <h1 className="text-3xl font-black text-slate-900">
              {courseTitle}
            </h1>
          </div>
        </FusionSection>

        {allTopics.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {allTopics.map((t: any) => (
              <Link
                key={t.id}
                href={`/asignaturas/${subject}/${level}/${t.slug}`}
                className={`group bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition flex items-center justify-between ${theme.topicHoverBorder}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition group-hover:scale-105 ${theme.iconBox} ${theme.iconBoxHover}`}
                  >
                    <TopicIcon slug={t.slug} title={t.title} name={t.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-slate-900 text-base transition ${theme.accentHover}`}>
                      {t.title}
                    </h3>
                    {t.description && (
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">{t.description}</p>
                    )}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-slate-400 transition ${theme.accentHover}`} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-600">Aún no hay temas subidos para este curso.</p>
            <p className="text-xs text-slate-400">Puedes añadirlos desde el panel de administración (/admin).</p>
          </div>
        )}
      </main>
    </div>
  );
}