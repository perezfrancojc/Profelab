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

function refreshPublicPages() {
  revalidatePath('/', 'layout');
  revalidatePath('/sitemap.xml');
}

export async function POST(req: Request) {
  try {
    const { table, action, payload, id, onConflict } = await req.json();

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
      const { error } = await supabaseAdmin.from(table).update(payload).eq('id', id);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      refreshPublicPages();
      return NextResponse.json({ data: null });
    }

    if (action === 'delete') {
      if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 });
      const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      refreshPublicPages();
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Error interno' }, { status: 500 });
  }
}