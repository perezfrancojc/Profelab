import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://profelabjuancaeduca.vercel.app';

// Actualizar el sitemap como máximo cada hora.
export const revalidate = 3600;

function createSlug(text: string) {
  if (!text) return '';

  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Obtener los cursos de Supabase.
  const { data: subjects, error: subjectsError } = await supabase
    .from('subjects')
    .select('id, slug');

  if (subjectsError) {
    console.error('Error obteniendo asignaturas para el sitemap:', subjectsError);
  }

  // 2. Obtener los temas de Supabase.
  const { data: topics, error: topicsError } = await supabase
    .from('topics')
    .select('id, subject_id, slug, title');

  if (topicsError) {
    console.error('Error obteniendo temas para el sitemap:', topicsError);
  }

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/asignaturas/matematicas`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/asignaturas/fisica-quimica`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/aviso-legal`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacidad`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 3. Añadir las páginas de cada curso.
  const subjectsList = subjects || [];

  for (const subject of subjectsList) {
    const subjectGroup = subject.id.startsWith('fq-')
      ? 'fisica-quimica'
      : 'matematicas';

    // Mantener el mismo criterio que utiliza tu página de asignaturas.
    const coursePath = subject.slug || subject.id;

    sitemapEntries.push({
      url: `${BASE_URL}/asignaturas/${subjectGroup}/${encodeURIComponent(coursePath)}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // 4. Añadir las páginas individuales de cada tema.
  const topicsList = topics || [];

  for (const topic of topicsList) {
    const subject = subjectsList.find(
      (item) => item.id === topic.subject_id
    );

    // Evitar incluir temas cuyo curso no exista.
    if (!subject) continue;

    const subjectGroup = subject.id.startsWith('fq-')
      ? 'fisica-quimica'
      : 'matematicas';

    const coursePath = subject.slug || subject.id;
    const topicPath = topic.slug || createSlug(topic.title || '') || String(topic.id);

    sitemapEntries.push({
      url: `${BASE_URL}/asignaturas/${subjectGroup}/${encodeURIComponent(coursePath)}/${encodeURIComponent(topicPath)}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return sitemapEntries;
}