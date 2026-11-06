import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SUBJECTS } from '@/data/educationalData';
import { ArrowLeft, ChevronRight, GraduationCap } from 'lucide-react';

interface Props {
  params: Promise<{
    subject: string;
  }>;
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params;

  // Filtrar los cursos/niveles pertenecientes a la asignatura
  const availableSubjects = SUBJECTS.filter((s) => {
    const cleanSubject = subject.toLowerCase();
    const slugMatch = s.slug?.toLowerCase() === cleanSubject;
    const idMatch = s.id?.toLowerCase().includes(cleanSubject);
    const nameMatch = s.name
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .includes(cleanSubject);

    return slugMatch || idMatch || nameMatch;
  });

  if (availableSubjects.length === 0) {
    notFound();
  }

  const subjectTitle = subject.includes('fisica') ? 'Física y Química' : 'Matemáticas';

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased selection:bg-red-100 selection:text-red-900">
      
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
            {subjectTitle}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="border-b border-slate-200/80 pb-8">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
            Selecciona tu curso
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Cursos de {subjectTitle}
          </h1>
          <p className="text-slate-600 mt-2 text-sm leading-relaxed">
            Elige tu nivel educativo para acceder a la lista de temas y materiales de estudio.
          </p>
        </div>

        {/* Tarjetas de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableSubjects.map((subItem) => (
            <Link 
              key={subItem.id} 
              href={`/asignaturas/${subject}/${subItem.level}`}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 font-bold flex items-center justify-center border border-red-100 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-md bg-slate-100 text-slate-700 uppercase tracking-wider border border-slate-200/50">
                    {subItem.level.replace('-', ' ')}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-red-600 transition-colors uppercase">
                  {subItem.level.replace('-', ' ')}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {subItem.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-800 group-hover:text-red-600">
                <span>Ver temas del curso</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}