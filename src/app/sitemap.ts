import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { SITE_URL } from '@/lib/config';
import { SIMULATORS } from '@/data/simulators';

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

// Mismo criterio que usan las páginas: ids fq-* => física y química
function groupOf(subjectId: string) {
  return subjectId.startsWith('fq-') ? 'fisica-y-quimica' : 'matematicas';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [subjectsRes, topicsRes] = await Promise.all([
    supabase.from('subjects').select('id, slug'),
    supabase.from('topics').select('id, subject_id, slug, title'),
  ]);

  if (subjectsRes.error) {
    console.error('Error obteniendo asignaturas para el sitemap:', subjectsRes.error);
  }
  if (topicsRes.error) {
    console.error('Error obteniendo temas para el sitemap:', topicsRes.error);
  }

  const subjectsList = subjectsRes.data || [];
  const topicsList = topicsRes.data || [];

  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/asignaturas/matematicas`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/asignaturas/fisica-y-quimica`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/aviso-legal`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacidad`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Páginas de cada curso (misma ruta que enlazan las tarjetas de la web)
  for (const subject of subjectsList) {
    const coursePath = subject.slug || subject.id;

    entries.push({
      url: `${SITE_URL}/asignaturas/${groupOf(subject.id)}/${encodeURIComponent(coursePath)}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Páginas de cada tema
  const subjectsById = new Map(subjectsList.map((s) => [s.id, s]));

  for (const topic of topicsList) {
    const subject = subjectsById.get(topic.subject_id);
    if (!subject) continue; // tema huérfano: sin curso, no se incluye

    const coursePath = subject.slug || subject.id;
    const topicPath = topic.slug || createSlug(topic.title || '') || String(topic.id);

    entries.push({
      url: `${SITE_URL}/asignaturas/${groupOf(subject.id)}/${encodeURIComponent(coursePath)}/${encodeURIComponent(topicPath)}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Simuladores
  entries.push({ url: `${SITE_URL}/simuladores`, changeFrequency: 'monthly', priority: 0.8 });
  for (const s of SIMULATORS) {
    entries.push({
      url: `${SITE_URL}/simuladores/${s.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}