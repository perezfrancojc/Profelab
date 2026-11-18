import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const TABLES = [
  'subjects',
  'topics',
  'videos',
  'materials',
  'quizzes',
  'exercise_sections',
  'exercise_files',
];

const BUCKETS = ['exercises', 'materials'];

function refreshPublicPages() {
  revalidatePath('/', 'layout');
  revalidatePath('/sitemap.xml');
}

// https://xxx.supabase.co/storage/v1/object/public/<bucket>/<ruta>
function parseStorageUrl(url?: string | null) {
  if (!url) return null;
  const m = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
  if (!m || !BUCKETS.includes(m[1])) return null;
  return { bucket: m[1], path: decodeURIComponent(m[2].split('?')[0]) };
}

async function removeFiles(urls: (string | null | undefined)[]) {
  const byBucket: Record<string, string[]> = {};
  for (const u of urls) {
    const p = parseStorageUrl(u);
    if (p) (byBucket[p.bucket] ||= []).push(p.path);
  }
  for (const [bucket, paths] of Object.entries(byBucket)) {
    const { error } = await supabaseAdmin.storage.from(bucket).remove(paths);
    if (error) console.error('Error borrando archivos de Storage:', error.message);
  }
}

// Archivos que dependen de una fila (para borrarlos junto con ella)
async function collectFileUrls(table: string, id: string) {
  const urls: (string | null)[] = [];

  if (table === 'exercise_files' || table === 'materials') {
    const { data } = await supabaseAdmin.from(table).select('file_url').eq('id', id);
    (data || []).forEach((r: any) => urls.push(r.file_url));
  }

  if (table === 'exercise_sections') {
    const { data } = await supabaseAdmin
      .from('exercise_files')
      .select('file_url')
      .eq('section_id', id);
    (data || []).forEach((r: any) => urls.push(r.file_url));
  }

  if (table === 'topics') {
    const [ex, mat] = await Promise.all([
      supabaseAdmin.from('exercise_files').select('file_url').eq('topic_id', id),
      supabaseAdmin.from('materials').select('file_url').eq('topic_id', id),
    ]);
    (ex.data || []).forEach((r: any) => urls.push(r.file_url));
    (mat.data || []).forEach((r: any) => urls.push(r.file_url));
  }

  return urls;
}

export async function POST(req: Request) {
  try {
    const { table, action, payload, id, onConflict } = await req.json();

    // Limpieza de un archivo subido cuyo guardado falló
    if (action === 'cleanup') {
      await removeFiles([payload?.fileUrl]);
      return NextResponse.json({ data: null });
    }

    if (!TABLES.includes(table)) {
      return NextResponse.json({ error: 'Tabla no permitida' }, { status: 400 });
    }

    if (action === 'insert') {
      const { data, error } = await supabaseAdmin
        .from(table)
        .insert([payload])
        .select()
        .single();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      refreshPublicPages();
      return NextResponse.json({ data });
    }

    if (action === 'upsert') {
      const { error } = await supabaseAdmin
        .from(table)
        .upsert([payload], { onConflict });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      refreshPublicPages();
      return NextResponse.json({ data: null });
    }

    if (action === 'update') {
      if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 });

      // Si se reemplaza el archivo, guardamos el antiguo para borrarlo después
      let oldUrl: string | null = null;
      if ((table === 'exercise_files' || table === 'materials') && payload?.file_url) {
        const { data: old } = await supabaseAdmin
          .from(table)
          .select('file_url')
          .eq('id', id)
          .maybeSingle();
        oldUrl = (old as any)?.file_url ?? null;
      }

      const { error } = await supabaseAdmin.from(table).update(payload).eq('id', id);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });

      if (oldUrl && oldUrl !== payload.file_url) await removeFiles([oldUrl]);

      refreshPublicPages();
      return NextResponse.json({ data: null });
    }

    if (action === 'delete') {
      if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 });

      const urls = await collectFileUrls(table, id);

      const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });

      await removeFiles(urls);

      refreshPublicPages();
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Error interno' }, { status: 500 });
  }
}