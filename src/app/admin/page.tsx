'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  PlusCircle, Edit, Trash2, CheckCircle, AlertCircle, 
  Video, BookOpen, FileText, Layers, HelpCircle, Loader2, Upload, FolderPlus
} from 'lucide-react';

const INITIAL_COURSES = [
  { id: 'mat-1eso', label: 'Matemáticas 1º ESO' },
  { id: 'mat-2eso', label: 'Matemáticas 2º ESO' },
  { id: 'mat-3eso', label: 'Matemáticas 3º ESO' },
  { id: 'mat-4eso', label: 'Matemáticas 4º ESO' },
  { id: 'mat-1bach', label: 'Matemáticas I (1º Bach)' },
  { id: 'mat-1bachccss', label: 'Matemáticas I CCSS (1º Bachillerato)' },
  { id: 'mat-2bach', label: 'Matemáticas II (2º Bach)' },
  { id: 'mat-2bachccss', label: 'Matemáticas II CCSS (2º Bachillerato)' },
  { id: 'fq-2eso', label: 'Física y Química 2º ESO' },
  { id: 'fq-3eso', label: 'Física y Química 3º ESO' },
  { id: 'fq-4eso', label: 'Física y Química 4º ESO' },
  { id: 'fq-1bach', label: 'Física y Química 1º Bach' },
  { id: 'fq-2bach', label: 'Física y Química 2º Bach' },
];

export default function AdminPage() {
  const [actionMode, setActionMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [activeTab, setActiveTab] = useState<'topic' | 'video' | 'exercise' | 'material' | 'quiz'>('topic');
  
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);

  // Lista dinámica de asignaturas cargadas desde Supabase
  const [coursesList, setCoursesList] = useState<{ id: string; label: string }[]>(INITIAL_COURSES);
  const [selectedCourse, setSelectedCourse] = useState('mat-1eso');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  
  const [allTopicsList, setAllTopicsList] = useState<{ id: string; title: string; subjectId: string }[]>([]);
  const [fetchedItems, setFetchedItems] = useState<any[]>([]);

  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Campos de Formularios Generales
  const [topicTitle, setTopicTitle] = useState('');
  const [topicSlug, setTopicSlug] = useState('');
  const [topicDescription, setTopicDescription] = useState('');

  const [videoTitle, setVideoTitle] = useState('');
  const [youtubeId, setYoutubeId] = useState('');

  // --- ESTRUCTURA DE EJERCICIOS (APARTADOS + PDFS RESUELTOS) ---
  const [exerciseSections, setExerciseSections] = useState<any[]>([]);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [exPdfTitle, setExPdfTitle] = useState('');
  const [exPdfFile, setExPdfFile] = useState<File | null>(null);
  const [exPdfIsPremium, setExPdfIsPremium] = useState(false);

  // Material
  const [matTitle, setMatTitle] = useState('');
  const [matUrl, setMatUrl] = useState('');
  const [matFile, setMatFile] = useState<File | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  // Quiz
  const [quizTitle, setQuizTitle] = useState('');
  const [qStatement, setQStatement] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctOpt, setCorrectOpt] = useState(0);
  const [explanation, setExplanation] = useState('');

  // Cargar asignaturas dinámicamente desde Supabase
  const loadCourses = useCallback(async () => {
    const { data: dbSubjects } = await supabase
      .from('subjects')
      .select('id, name')
      .order('id', { ascending: true });

    if (dbSubjects && dbSubjects.length > 0) {
      const formatted = dbSubjects.map((s) => ({
        id: s.id,
        label: s.name || s.id,
      }));
      setCoursesList(formatted);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const loadTopics = useCallback(async () => {
    const { data: dbTopics, error } = await supabase
      .from('topics')
      .select('id, title, subject_id');

    if (error) {
      console.error('Error al cargar temas de Supabase:', error);
      return;
    }

    const formattedTopics = (dbTopics || []).map((t) => ({
      id: t.id,
      title: t.title,
      subjectId: t.subject_id,
    }));

    setAllTopicsList(formattedTopics);
  }, []);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  const filteredTopics = allTopicsList.filter((t) => t.subjectId === selectedCourse);

  useEffect(() => {
    if (filteredTopics.length > 0) {
      if (!filteredTopics.some((t) => t.id === selectedTopicId)) {
        setSelectedTopicId(filteredTopics[0].id);
      }
    } else {
      setSelectedTopicId('');
    }
  }, [selectedCourse, filteredTopics, selectedTopicId]);

  // Cargar apartados del tema seleccionado para Ejercicios
  const loadExerciseSections = useCallback(async () => {
    if (!selectedTopicId) {
      setExerciseSections([]);
      return;
    }
    const { data: sections } = await supabase
      .from('exercise_sections')
      .select('*, exercise_files(*)')
      .eq('topic_id', selectedTopicId)
      .order('created_at', { ascending: true });

    setExerciseSections(sections || []);
    if (sections && sections.length > 0 && !selectedSectionId) {
      setSelectedSectionId(sections[0].id);
    }
  }, [selectedTopicId, selectedSectionId]);

  useEffect(() => {
    if (activeTab === 'exercise') {
      loadExerciseSections();
    }
  }, [activeTab, selectedTopicId, loadExerciseSections]);

  const loadResourceItems = useCallback(async () => {
    if (actionMode === 'create') return;
    setLoading(true);
    setFetchedItems([]);
    setEditingItemId(null);

    let data: any[] | null = [];
    if (activeTab === 'topic') {
      const { data: topics } = await supabase.from('topics').select('*').eq('subject_id', selectedCourse);
      data = topics;
    } else if (selectedTopicId) {
      if (activeTab === 'video') {
        const { data: videos } = await supabase.from('videos').select('*').eq('topic_id', selectedTopicId);
        data = videos;
      } else if (activeTab === 'exercise') {
        const { data: files } = await supabase.from('exercise_files').select('*, exercise_sections(title)').eq('topic_id', selectedTopicId);
        data = files;
      } else if (activeTab === 'material') {
        const { data: materials } = await supabase.from('materials').select('*').eq('topic_id', selectedTopicId);
        data = materials;
      } else if (activeTab === 'quiz') {
        const { data: quizzes } = await supabase.from('quizzes').select('*').eq('topic_id', selectedTopicId);
        data = quizzes;
      }
    }
    setFetchedItems(data || []);
    setLoading(false);
  }, [actionMode, activeTab, selectedCourse, selectedTopicId]);

  useEffect(() => {
    loadResourceItems();
  }, [loadResourceItems]);

  const ensureSubjectExists = async (courseId: string) => {
    const courseObj = coursesList.find((c) => c.id === courseId);
    const name = courseObj ? courseObj.label : courseId;
    await supabase.from('subjects').upsert([{ id: courseId, name }], { onConflict: 'id' });
  };

  // --- CREACIÓN DE APARTADO DE EJERCICIOS ---
  const handleCreateExerciseSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId) return setStatus({ type: 'error', message: 'Selecciona un tema primero.' });
    if (!newSectionTitle.trim()) return;

    setStatus({ type: 'loading', message: 'Creando apartado...' });
    const { data, error } = await supabase
      .from('exercise_sections')
      .insert([{ topic_id: selectedTopicId, title: newSectionTitle }])
      .select()
      .single();

    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setStatus({ type: 'success', message: '¡Apartado creado correctamente!' });
      setNewSectionTitle('');
      await loadExerciseSections();
      if (data) setSelectedSectionId(data.id);
    }
  };

  // --- SUBIDA DE PDF RESUELTO A UN APARTADO DE EJERCICIOS ---
  const handleSaveExercisePdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId) return setStatus({ type: 'error', message: 'Selecciona un tema.' });
    if (!selectedSectionId) return setStatus({ type: 'error', message: 'Crea o selecciona un apartado primero.' });
    if (!exPdfFile && !editingItemId) return setStatus({ type: 'error', message: 'Selecciona un archivo PDF resuelto.' });

    setStatus({ type: 'loading', message: 'Subiendo archivo de ejercicios...' });

    let finalUrl = '';
    if (exPdfFile) {
      const fileExt = exPdfFile.name.split('.').pop() || 'pdf';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `resueltos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('exercises')
        .upload(filePath, exPdfFile);

      if (uploadError) {
        return setStatus({ type: 'error', message: `Error al subir: ${uploadError.message}` });
      }

      const { data: publicUrlData } = supabase.storage
        .from('exercises')
        .getPublicUrl(filePath);

      finalUrl = publicUrlData.publicUrl;
    }

    const payload: any = {
      section_id: selectedSectionId,
      topic_id: selectedTopicId,
      title: exPdfTitle,
      is_premium: exPdfIsPremium
    };

    if (finalUrl) payload.file_url = finalUrl;

    const { error } = editingItemId
      ? await supabase.from('exercise_files').update(payload).eq('id', editingItemId)
      : await supabase.from('exercise_files').insert([payload]);

    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setStatus({ type: 'success', message: editingItemId ? '¡PDF actualizado!' : '¡PDF resuelto añadido con éxito!' });
      resetForm();
      await loadExerciseSections();
      if (actionMode !== 'create') loadResourceItems();
    }
  };

  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Guardando Tema...' });
    await ensureSubjectExists(selectedCourse);

    const id = editingItemId || `${selectedCourse}-${topicSlug}`;
    const payload = { id, subject_id: selectedCourse, title: topicTitle, slug: topicSlug, description: topicDescription };

    const { error } = editingItemId
      ? await supabase.from('topics').update(payload).eq('id', editingItemId)
      : await supabase.from('topics').insert([payload]);

    if (error) setStatus({ type: 'error', message: error.message });
    else {
      setStatus({ type: 'success', message: editingItemId ? '¡Tema actualizado!' : '¡Tema creado con éxito!' });
      resetForm();
      await loadTopics();
      if (actionMode !== 'create') loadResourceItems();
    }
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId) return setStatus({ type: 'error', message: 'Selecciona un tema primero.' });
    setStatus({ type: 'loading', message: 'Guardando Vídeo...' });

    const payload = { topic_id: selectedTopicId, title: videoTitle, youtube_id: youtubeId };

    const { error } = editingItemId
      ? await supabase.from('videos').update(payload).eq('id', editingItemId)
      : await supabase.from('videos').insert([payload]);

    if (error) setStatus({ type: 'error', message: error.message });
    else {
      setStatus({ type: 'success', message: editingItemId ? '¡Vídeo actualizado!' : '¡Vídeo guardado!' });
      resetForm();
      if (actionMode !== 'create') loadResourceItems();
    }
  };

  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId) return setStatus({ type: 'error', message: 'Selecciona un tema primero.' });
    
    let finalUrl = matUrl;
    let fileType = 'PDF';

    if (matFile) {
      setStatus({ type: 'loading', message: 'Subiendo archivo...' });
      const fileExt = matFile.name.split('.').pop() || 'pdf';
      fileType = fileExt.toUpperCase();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('materials')
        .upload(filePath, matFile);

      if (uploadError) return setStatus({ type: 'error', message: `Error: ${uploadError.message}` });

      const { data: publicUrlData } = supabase.storage.from('materials').getPublicUrl(filePath);
      finalUrl = publicUrlData.publicUrl;
    }

    if (!finalUrl) return setStatus({ type: 'error', message: 'Selecciona un archivo o pega una URL.' });

    const payload = { topic_id: selectedTopicId, title: matTitle, file_url: finalUrl, is_premium: isPremium, type: fileType };

    const { error } = editingItemId
      ? await supabase.from('materials').update(payload).eq('id', editingItemId)
      : await supabase.from('materials').insert([payload]);

    if (error) setStatus({ type: 'error', message: error.message });
    else {
      setStatus({ type: 'success', message: editingItemId ? '¡Documento actualizado!' : '¡Documento guardado!' });
      resetForm();
      if (actionMode !== 'create') loadResourceItems();
    }
  };

  const handleSaveQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId) return setStatus({ type: 'error', message: 'Selecciona un tema primero.' });

    const questionsArray = [{ id: 'q1', question: qStatement, options: [opt0, opt1, opt2, opt3], correctAnswer: correctOpt, explanation }];
    const payload = { topic_id: selectedTopicId, title: quizTitle, questions: questionsArray };

    const { error } = editingItemId
      ? await supabase.from('quizzes').update(payload).eq('id', editingItemId)
      : await supabase.from('quizzes').insert([payload]);

    if (error) setStatus({ type: 'error', message: error.message });
    else {
      setStatus({ type: 'success', message: editingItemId ? '¡Test actualizado!' : '¡Test publicado!' });
      resetForm();
      if (actionMode !== 'create') loadResourceItems();
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este elemento?')) return;
    setStatus({ type: 'loading', message: 'Eliminando...' });

    const tableMap = {
      topic: 'topics',
      video: 'videos',
      exercise: 'exercise_files',
      material: 'materials',
      quiz: 'quizzes',
    };

    const { error } = await supabase.from(tableMap[activeTab]).delete().eq('id', id);

    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setStatus({ type: 'success', message: 'Elemento eliminado correctamente.' });
      if (activeTab === 'topic') await loadTopics();
      if (activeTab === 'exercise') await loadExerciseSections();
      loadResourceItems();
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('¿Seguro que quieres eliminar este apartado y todos sus PDFs asociados?')) return;
    const { error } = await supabase.from('exercise_sections').delete().eq('id', sectionId);
    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setStatus({ type: 'success', message: 'Apartado eliminado.' });
      await loadExerciseSections();
    }
  };

  const startEditing = (item: any) => {
    setEditingItemId(item.id);
    if (activeTab === 'topic') {
      setTopicTitle(item.title || '');
      setTopicSlug(item.slug || '');
      setTopicDescription(item.description || '');
    } else if (activeTab === 'video') {
      setVideoTitle(item.title || '');
      setYoutubeId(item.youtube_id || '');
    } else if (activeTab === 'exercise') {
      setExPdfTitle(item.title || '');
      setSelectedSectionId(item.section_id || '');
      setExPdfIsPremium(item.is_premium || false);
    } else if (activeTab === 'material') {
      setMatTitle(item.title || '');
      setMatUrl(item.file_url || '');
      setMatFile(null);
      setIsPremium(item.is_premium || false);
    } else if (activeTab === 'quiz') {
      setQuizTitle(item.title || '');
      const q = item.questions?.[0];
      if (q) {
        setQStatement(q.question || '');
        setOpt0(q.options?.[0] || '');
        setOpt1(q.options?.[1] || '');
        setOpt2(q.options?.[2] || '');
        setOpt3(q.options?.[3] || '');
        setCorrectOpt(q.correctAnswer || 0);
        setExplanation(q.explanation || '');
      }
    }
  };

  const resetForm = () => {
    setEditingItemId(null);
    setTopicTitle(''); setTopicSlug(''); setTopicDescription('');
    setVideoTitle(''); setYoutubeId('');
    setExPdfTitle(''); setExPdfFile(null); setExPdfIsPremium(false);
    setMatTitle(''); setMatUrl(''); setMatFile(null); setIsPremium(false);
    setQuizTitle(''); setQStatement(''); setOpt0(''); setOpt1(''); setOpt2(''); setOpt3(''); setExplanation('');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] p-4 sm:p-10 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        
        {/* ENCABEZADO */}
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-600 block mb-1">Panel de Control</span>
          <h1 className="text-2xl font-black">Gestor de Contenidos Académicos</h1>
        </div>

        {/* PASO 1: SELECCIONAR ACCIÓN */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400">PASO 1: Selecciona la Acción</label>
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => { setActionMode('create'); resetForm(); setStatus({ type: 'idle', message: '' }); }}
              className={`py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${actionMode === 'create' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <PlusCircle className="w-4 h-4" /> Agregar
            </button>
            <button
              type="button"
              onClick={() => { setActionMode('edit'); resetForm(); setStatus({ type: 'idle', message: '' }); }}
              className={`py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${actionMode === 'edit' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Edit className="w-4 h-4" /> Modificar
            </button>
            <button
              type="button"
              onClick={() => { setActionMode('delete'); resetForm(); setStatus({ type: 'idle', message: '' }); }}
              className={`py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${actionMode === 'delete' ? 'bg-rose-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Trash2 className="w-4 h-4" /> Eliminar
            </button>
          </div>
        </div>

        {/* PASO 2: SELECCIONAR TIPO DE ELEMENTO */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400">PASO 2: Selecciona el Tipo de Contenido</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
            <button type="button" onClick={() => { setActiveTab('topic'); resetForm(); }} className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${activeTab === 'topic' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>
              <Layers className="w-4 h-4 text-red-500" /> Tema
            </button>
            <button type="button" onClick={() => { setActiveTab('video'); resetForm(); }} className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${activeTab === 'video' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>
              <Video className="w-4 h-4 text-red-500" /> Vídeo
            </button>
            <button type="button" onClick={() => { setActiveTab('exercise'); resetForm(); }} className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${activeTab === 'exercise' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>
              <BookOpen className="w-4 h-4 text-red-500" /> Ejercicios PDF
            </button>
            <button type="button" onClick={() => { setActiveTab('material'); resetForm(); }} className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${activeTab === 'material' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>
              <FileText className="w-4 h-4 text-red-500" /> PDF Apuntes
            </button>
            <button type="button" onClick={() => { setActiveTab('quiz'); resetForm(); }} className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${activeTab === 'quiz' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>
              <HelpCircle className="w-4 h-4 text-red-500" /> Test
            </button>
          </div>
        </div>

        {/* PASO 3: FILTROS */}
        <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200 space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500">PASO 3: Filtrar por Curso y Tema</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Curso / Asignatura</label>
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-bold shadow-sm">
                {coursesList.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {activeTab !== 'topic' && (
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Tema del Curso</label>
                {filteredTopics.length > 0 ? (
                  <select value={selectedTopicId} onChange={(e) => setSelectedTopicId(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-bold shadow-sm">
                    {filteredTopics.map((t) => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl font-bold border border-amber-200">
                    ⚠️ No hay temas en este curso.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SECCIÓN LISTAR PARA MODIFICAR O ELIMINAR */}
        {(actionMode === 'edit' || actionMode === 'delete') && (
          <div className="border border-slate-200 p-4 rounded-2xl space-y-3 bg-slate-50">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase text-slate-600">
                {actionMode === 'edit' ? 'Selecciona un elemento para editar' : 'Elementos disponibles para eliminar'}
              </h3>
              {loading && <Loader2 className="w-4 h-4 animate-spin text-red-600" />}
            </div>

            {fetchedItems.length === 0 && !loading ? (
              <p className="text-xs text-slate-500 italic p-2">No se encontraron elementos registrados para este filtro.</p>
            ) : (
              <div className="divide-y divide-slate-200 max-h-52 overflow-y-auto">
                {fetchedItems.map((item) => (
                  <div key={item.id} className="py-2.5 px-2 flex items-center justify-between hover:bg-white rounded-lg transition">
                    <div className="pr-4">
                      <p className="text-xs font-bold text-slate-900">{item.title || item.slug || item.id}</p>
                      {item.exercise_sections?.title && (
                        <p className="text-[10px] text-red-600 font-semibold">Apartado: {item.exercise_sections.title}</p>
                      )}
                    </div>

                    {actionMode === 'edit' && (
                      <button
                        type="button"
                        onClick={() => startEditing(item)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-extrabold transition ${editingItemId === item.id ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-amber-100'}`}
                      >
                        {editingItemId === item.id ? 'Editando' : 'Editar'}
                      </button>
                    )}

                    {actionMode === 'delete' && (
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-xs px-3 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white rounded-lg font-extrabold transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Eliminar PDF
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FORMULARIOS */}
        {(actionMode === 'create' || (actionMode === 'edit' && editingItemId)) && (
          <div className="border-t border-slate-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-red-600">
                {editingItemId ? `Editando ${activeTab}` : `Gestión de ${activeTab}`}
              </h2>
              {editingItemId && (
                <button type="button" onClick={resetForm} className="text-xs text-slate-500 underline font-semibold">
                  Cancelar edición
                </button>
              )}
            </div>

            {/* FORMULARIO: TEMA */}
            {activeTab === 'topic' && (
              <form onSubmit={handleSaveTopic} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Título del Tema</label>
                  <input type="text" placeholder="Ej. Ecuaciones de Primer Grado" value={topicTitle} onChange={(e) => { setTopicTitle(e.target.value); if (!editingItemId) setTopicSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")); }} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Slug (URL)</label>
                  <input type="text" value={topicSlug} onChange={(e) => setTopicSlug(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Descripción</label>
                  <textarea placeholder="Resumen del tema..." value={topicDescription} onChange={(e) => setTopicDescription(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium h-20" />
                </div>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs transition">
                  {editingItemId ? 'Guardar Cambios del Tema' : 'Publicar Tema'}
                </button>
              </form>
            )}

            {/* FORMULARIO: VÍDEO */}
            {activeTab === 'video' && (
              <form onSubmit={handleSaveVideo} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Título del Vídeo</label>
                  <input type="text" placeholder="Ej. Explicación Completa Paso a Paso" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">ID o Enlace del Vídeo de YouTube</label>
                  <input type="text" placeholder="Ej. DYRnCpqmTRo" value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono" required />
                </div>
                <button type="submit" disabled={!selectedTopicId} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs transition">
                  {editingItemId ? 'Guardar Cambios del Vídeo' : 'Guardar Vídeo'}
                </button>
              </form>
            )}

            {/* FORMULARIO: EJERCICIOS RESUELTOS EN PDF CON APARTADOS */}
            {activeTab === 'exercise' && (
              <div className="space-y-6">
                
                {/* 1. CREAR APARTADO EN ESTE TEMA */}
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <FolderPlus className="w-4 h-4 text-amber-600" />
                    1. Crear un Apartado / Subtema
                  </label>
                  <form onSubmit={handleCreateExerciseSection} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ej. Relación 1: Sistemas No Lineales o Exámenes Anteriores"
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      className="flex-1 p-2.5 rounded-xl border border-amber-300 text-xs font-medium bg-white"
                      required
                    />
                    <button type="submit" disabled={!selectedTopicId} className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 rounded-xl text-xs transition">
                      Crear Apartado
                    </button>
                  </form>
                </div>

                {/* 2. SUBIR PDF DE EJERCICIOS A UN APARTADO */}
                <form onSubmit={handleSaveExercisePdf} className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-red-600" />
                    2. Subir PDF con Ejercicios Resueltos a Mano
                  </label>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Selecciona el Apartado donde irá el PDF</label>
                    {exerciseSections.length > 0 ? (
                      <select
                        value={selectedSectionId}
                        onChange={(e) => setSelectedSectionId(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold"
                        required
                      >
                        {exerciseSections.map((sec) => (
                          <option key={sec.id} value={sec.id}>📁 {sec.title}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-xs text-amber-800 bg-amber-100 p-2.5 rounded-xl font-bold">
                        ⚠️ Primero debes crear al menos un apartado arriba para guardar el PDF.
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Nombre o Título del Documento PDF</label>
                    <input
                      type="text"
                      placeholder="Ej. Soluciones Ejercicios 1 al 15 (Hecho a mano)"
                      value={exPdfTitle}
                      onChange={(e) => setExPdfTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Archivo PDF</label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => setExPdfFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="exPremium"
                      checked={exPdfIsPremium}
                      onChange={(e) => setExPdfIsPremium(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <label htmlFor="exPremium" className="text-xs font-bold text-slate-700">Contenido Plus</label>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedTopicId || !selectedSectionId}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs transition"
                  >
                    {editingItemId ? 'Guardar Cambios del PDF' : 'Subir y Asociar PDF al Apartado'}
                  </button>
                </form>

                {/* VISUALIZACIÓN PREVIA DE APARTADOS Y PDFS EN ESTE TEMA */}
                <div className="space-y-3 border-t border-slate-200 pt-4">
                  <h4 className="text-xs font-black uppercase text-slate-500">Estructura actual de este Tema:</h4>
                  {exerciseSections.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No hay apartados ni ejercicios creados aún.</p>
                  ) : (
                    exerciseSections.map((sec) => (
                      <div key={sec.id} className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-slate-800">📁 {sec.title}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteSection(sec.id)}
                            className="text-[10px] text-rose-600 hover:underline font-bold"
                          >
                            Eliminar apartado
                          </button>
                        </div>
                        <ul className="pl-4 space-y-1">
                          {sec.exercise_files?.length > 0 ? (
                            sec.exercise_files.map((file: any) => (
                              <li key={file.id} className="text-xs text-slate-600 flex items-center gap-2">
                                📄 <a href={file.file_url} target="_blank" rel="noreferrer" className="hover:underline font-medium text-slate-900">{file.title}</a>
                                {file.is_premium && <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded">PLUS</span>}
                              </li>
                            ))
                          ) : (
                            <li className="text-[11px] text-slate-400 italic">Sin PDFs subidos todavía.</li>
                          )}
                        </ul>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

            {/* FORMULARIO: MATERIAL PDF */}
            {activeTab === 'material' && (
              <form onSubmit={handleSaveMaterial} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Título del Documento</label>
                  <input type="text" placeholder="Ej. Resumen de Fórmulas" value={matTitle} onChange={(e) => setMatTitle(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium" required />
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-dashed border-slate-300 space-y-2">
                  <label className="block text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-red-600" />
                    Subir archivo (PDF, Word, Imagen)
                  </label>
                  <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip" onChange={(e) => setMatFile(e.target.files?.[0] || null)} className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">O pegar URL externa</label>
                  <input type="url" placeholder="https://..." value={matUrl} onChange={(e) => setMatUrl(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="premium" checked={isPremium} onChange={(e) => setIsPremium(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                  <label htmlFor="premium" className="text-xs font-bold text-slate-700">Contenido Plus</label>
                </div>
                <button type="submit" disabled={!selectedTopicId} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs transition">
                  {editingItemId ? 'Guardar Cambios del Documento' : 'Subir y Publicar Documento'}
                </button>
              </form>
            )}

            {/* FORMULARIO: TEST */}
            {activeTab === 'quiz' && (
              <form onSubmit={handleSaveQuiz} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Título del Test</label>
                  <input type="text" placeholder="Ej. Test de Autoevaluación" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium" required />
                </div>
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <label className="block text-xs font-bold text-red-600 uppercase">Pregunta</label>
                  <input type="text" placeholder="Pregunta..." value={qStatement} onChange={(e) => setQStatement(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium" required />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Opción A" value={opt0} onChange={(e) => setOpt0(e.target.value)} className="p-2.5 rounded-xl border border-slate-200 text-xs" required />
                    <input type="text" placeholder="Opción B" value={opt1} onChange={(e) => setOpt1(e.target.value)} className="p-2.5 rounded-xl border border-slate-200 text-xs" required />
                    <input type="text" placeholder="Opción C" value={opt2} onChange={(e) => setOpt2(e.target.value)} className="p-2.5 rounded-xl border border-slate-200 text-xs" required />
                    <input type="text" placeholder="Opción D" value={opt3} onChange={(e) => setOpt3(e.target.value)} className="p-2.5 rounded-xl border border-slate-200 text-xs" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Respuesta Correcta</label>
                    <select value={correctOpt} onChange={(e) => setCorrectOpt(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold">
                      <option value={0}>Opción A</option>
                      <option value={1}>Opción B</option>
                      <option value={2}>Opción C</option>
                      <option value={3}>Opción D</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Explicación breve" value={explanation} onChange={(e) => setExplanation(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 text-xs" />
                </div>
                <button type="submit" disabled={!selectedTopicId} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs transition">
                  {editingItemId ? 'Guardar Cambios del Test' : 'Publicar Test'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* NOTIFICACIONES DE ESTADO */}
        {status.message && (
          <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : status.type === 'error' ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-slate-100'}`}>
            {status.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
            <span>{status.message}</span>
          </div>
        )}

      </div>
    </div>
  );
}