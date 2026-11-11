import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, BookOpen, ChevronRight, Layers } from 'lucide-react';

interface Props {
  params: Promise<{
    subject: string;
    level: string;
  }>;
}

// Mapa de conversión universal para ESO y Bachillerato
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

function createSlug(text: string) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default async function SubjectLevelPage({ params }: Props) {
  const resolvedParams = await params;
  const { subject, level } = resolvedParams;

  const rawLevel = level.toLowerCase().trim();
  const prefix = subject.toLowerCase().includes('fisica') ? 'fq' : 'mat';
  const mappedLevel = LEVEL_MAP[rawLevel] || rawLevel.replace('bachillerato', 'bach').replace('-', '');
  
  // Detectar si rawLevel o mappedLevel ya incluye el ID completo de Supabase (ej: mat-1bachccss)
  const targetSubjectId = mappedLevel.startsWith(prefix) ? mappedLevel : `${prefix}-${mappedLevel}`;

  // Consultar Supabase abarcando todos los formatos posibles de subject_id
  const { data: dbTopicsRaw } = await supabase
    .from('topics')
    .select('*')
    .or(`subject_id.eq.${targetSubjectId},subject_id.eq.${rawLevel},subject_id.eq.${mappedLevel},subject_id.eq.${prefix}-${rawLevel}`);

  const dbTopics = dbTopicsRaw || [];

  // Deduplicar temas por slug
  const topicsMap = new Map<string, any>();

  dbTopics.forEach((t: any) => {
    const slug = t.slug || createSlug(t.title) || String(t.id);
    topicsMap.set(slug, {
      id: t.id,
      subjectId: t.subject_id,
      title: t.title,
      slug: slug,
      description: t.description,
    });
  });

  const allTopics = Array.from(topicsMap.values());

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased">
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/asignaturas/${subject}`} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition">
            <ArrowLeft className="w-4 h-4" /> Volver a asignaturas
          </Link>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-lg">
            {level.replace('-', ' ')}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="border-b border-slate-200/80 pb-6">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">Temario Oficial</span>
          <h1 className="text-3xl font-black text-slate-900 capitalize">
            {subject.replace('-', ' ')} ({level.replace('-', ' ')})
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Selecciona una unidad didáctica para acceder a los contenidos explicados y ejercicios resueltos.
          </p>
        </div>

        {allTopics.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {allTopics.map((t: any) => (
              <Link
                key={t.id}
                href={`/asignaturas/${subject}/${level}/${t.slug}`}
                className="group bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-red-500/40 hover:shadow-md transition flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-red-600 transition">
                      {t.title}
                    </h3>
                    {t.description && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{t.description}</p>}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition" />
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