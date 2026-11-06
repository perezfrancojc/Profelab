import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { YouTubeFacade } from '@/components/YouTubeFacade';
import { QuizRunner } from '@/components/QuizRunner';
import { VIDEOS, MATERIALS } from '@/data/educationalData';
import { ALL_QUIZZES as QUIZZES } from '@/data/quizzes';
import { 
  FileText, 
  Lock, 
  Download, 
  ArrowLeft, 
  PlayCircle, 
  BookOpen, 
  CheckCircle2, 
  Inbox,
  FolderDown,
  FileCode2
} from 'lucide-react';

interface Props {
  params: Promise<{
    level: string;
    subject: string;
    topic: string;
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

export default async function TopicPage({ params }: Props) {
  const resolvedParams = await params;
  const { subject, level, topic: rawTopic } = resolvedParams;
  const rawTopicParam = decodeURIComponent(rawTopic).toLowerCase().trim();

  // 1. Identificar la asignatura exacta
  const prefix = subject.toLowerCase().includes('fisica') ? 'fq' : 'mat';
  const cleanLevel = LEVEL_MAP[level.toLowerCase()] || level.replace('bachillerato', 'bach').replace('-', '');
  const targetSubjectId = `${prefix}-${cleanLevel}`;

  // 2. Traer el tema de Supabase
  const { data: dbTopicsRaw } = await supabase
    .from('topics')
    .select('*')
    .or(`subject_id.eq.${targetSubjectId},subject_id.eq.${prefix}-${level}`);

  const dbTopic = (dbTopicsRaw || []).find((t) => {
    const tId = String(t.id || '').toLowerCase().trim();
    const tSlug = String(t.slug || '').toLowerCase().trim();
    const tTitleSlug = createSlug(t.title || '');

    return (
      tSlug === rawTopicParam ||
      tId === rawTopicParam ||
      tTitleSlug === rawTopicParam
    );
  });

  if (!dbTopic) {
    notFound();
  }

  const currentTopic = {
    id: String(dbTopic.id),
    title: dbTopic.title,
    description: dbTopic.description,
    slug: dbTopic.slug || createSlug(dbTopic.title || ''),
    subjectId: dbTopic.subject_id,
  };

  const currentTopicId = currentTopic.id;

  // 3. Consultar contenidos incluyendo los APARTADOS y PDFs RESUELTOS de ejercicios
  const [dbVidRes, dbSectionsRes, dbMatRes, dbQuizRes] = await Promise.all([
    supabase.from('videos').select('*').eq('topic_id', currentTopicId),
    supabase
      .from('exercise_sections')
      .select('*, exercise_files(*)')
      .eq('topic_id', currentTopicId)
      .order('created_at', { ascending: true }),
    supabase.from('materials').select('*').eq('topic_id', currentTopicId),
    supabase.from('quizzes').select('*').eq('topic_id', currentTopicId),
  ]);

  // Vídeos locales + Supabase
  const topicVideos = VIDEOS.filter(
    (v) => String(v.topicId) === currentTopicId || createSlug(String(v.topicId)) === createSlug(currentTopic.slug)
  );
  const allVideos = [
    ...topicVideos,
    ...(dbVidRes.data || []).map((v) => ({
      id: v.id,
      topicId: v.topic_id || v.topicId,
      title: v.title,
      youtubeId: v.youtube_id || v.video_url || v.youtube_url || v.url || v.youtubeId || v.link || '',
      description: v.description,
    })),
  ];

  // Materiales locales + Supabase
  const topicMaterials = MATERIALS.filter(
    (m) => String(m.topicId) === currentTopicId || createSlug(String(m.topicId)) === createSlug(currentTopic.slug)
  );
  const allMaterials = [
    ...topicMaterials,
    ...(dbMatRes.data || []).map((m) => ({
      id: m.id,
      topicId: m.topic_id || m.topicId,
      title: m.title,
      type: m.type,
      fileUrl: m.file_url || m.fileUrl || m.url,
      isPremium: m.is_premium || m.isPremium,
    })),
  ];

  // Cuestionarios
  const topicQuizzes = QUIZZES.filter((q) => {
    const qTopic = String(q.topicId || '').toLowerCase().trim();
    return (
      qTopic === currentTopicId.toLowerCase().trim() ||
      createSlug(qTopic) === createSlug(currentTopic.slug) ||
      createSlug(qTopic) === createSlug(currentTopic.title)
    );
  });
  const allQuizzes = [
    ...topicQuizzes,
    ...(dbQuizRes.data || []).map((q) => ({
      id: q.id,
      topicId: q.topic_id || q.topicId,
      title: q.title,
      description: q.description || 'Comprueba tus conocimientos con este test.',
      estimatedMinutes: q.estimated_minutes || 5,
      questions: q.questions,
    })),
  ];

  const exerciseSections = dbSectionsRes.data || [];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased selection:bg-red-100 selection:text-red-900">
      
      {/* Navegación */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href={`/asignaturas/${subject}/${level}`} 
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al temario
          </Link>

          <nav className="text-xs font-bold text-slate-500 flex items-center gap-2">
            <span className="uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {level.replace('-', ' ')}
            </span>
            <span>/</span>
            <span className="capitalize">{subject.replace('-', ' ')}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        
        {/* Encabezado Principal */}
        <div className="border-b border-slate-200/80 pb-8">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
            Unidad Didáctica
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {currentTopic.title}
          </h1>
          {currentTopic.description && (
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              {currentTopic.description}
            </p>
          )}
        </div>

        {/* 1. SECCIÓN: VÍDEOS EXPLICATIVOS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-black text-xl tracking-tight">
            <PlayCircle className="w-5 h-5 text-red-600" />
            <h2>Vídeos Explicativos</h2>
          </div>

          {allVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allVideos.map((v) => (
                <div key={v.id} className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
                  <div className="rounded-xl overflow-hidden border border-slate-100">
                    <YouTubeFacade youtubeId={v.youtubeId} title={v.title} />
                  </div>
                  <p className="font-bold text-sm mt-3 text-slate-900">{v.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 flex items-center gap-3 text-slate-500">
              <Inbox className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-xs font-medium">Aún no hay vídeos explicativos añadidos para esta unidad.</p>
            </div>
          )}
        </section>

        {/* 2. SECCIÓN: EJERCICIOS RESUELTOS EN PDF POR APARTADOS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 text-slate-900 font-black text-xl tracking-tight">
            <BookOpen className="w-5 h-5 text-red-600" />
            <h2>Ejercicios Resueltos a Mano (PDF)</h2>
          </div>

          {exerciseSections.length > 0 ? (
            <div className="space-y-6">
              {exerciseSections.map((sec) => (
                <div key={sec.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base border-b border-slate-100 pb-3">
                    <FolderDown className="w-5 h-5 text-amber-500 shrink-0" />
                    <h3>{sec.title}</h3>
                  </div>

                  {sec.exercise_files && sec.exercise_files.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sec.exercise_files.map((file: any) => (
                        <div key={file.id} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-center justify-between hover:border-slate-300 transition">
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                              <FileCode2 className="w-4 h-4" />
                            </div>
                            <p className="text-xs font-bold text-slate-800 truncate" title={file.title}>
                              {file.title}
                            </p>
                          </div>

                          {file.is_premium ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-md shrink-0">
                              <Lock className="w-3 h-3" /> Plus
                            </span>
                          ) : (
                            <a
                              href={file.file_url}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="p-2 rounded-lg bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition shrink-0"
                              title="Ver o Descargar PDF"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No hay archivos PDF disponibles en este apartado.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 flex items-center gap-3 text-slate-500">
              <Inbox className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-xs font-medium">Aún no se han publicado apartados con ejercicios resueltos.</p>
            </div>
          )}
        </section>

        {/* 3. SECCIÓN: AUTOEVALUACIÓN EN LÍNEA */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-black text-xl tracking-tight">
            <CheckCircle2 className="w-5 h-5 text-red-600" />
            <h2>Autoevaluación en Línea</h2>
          </div>

          {allQuizzes.length > 0 ? (
            allQuizzes.map((q) => <QuizRunner key={q.id} quiz={q} />)
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 flex items-center gap-3 text-slate-500">
              <Inbox className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-xs font-medium">Próximamente estará disponible el test interactivo de autoevaluación.</p>
            </div>
          )}
        </section>

        {/* 4. SECCIÓN: MATERIAL Y DOCUMENTOS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-black text-xl tracking-tight">
            <FileText className="w-5 h-5 text-red-600" />
            <h2>Material y Documentos</h2>
          </div>

          {allMaterials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allMaterials.map((m) => (
                <div 
                  key={m.id} 
                  className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between transition hover:border-slate-300"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0 border border-red-100">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{m.title}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">{m.type}</span>
                    </div>
                  </div>
                  {m.isPremium ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-lg">
                      <Lock className="w-3.5 h-3.5" /> Plus
                    </span>
                  ) : (
                    <a 
                      href={m.fileUrl} 
                      target="_blank"
                      rel="noreferrer"
                      download 
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 transition border border-slate-200/60"
                      title="Descargar archivo"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 flex items-center gap-3 text-slate-500">
              <Inbox className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-xs font-medium">Aún no hay esquemas o resúmenes en PDF subidos para descargar.</p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}