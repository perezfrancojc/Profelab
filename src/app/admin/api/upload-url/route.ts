import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const BUCKETS: Record<string, string> = {
  exercises: 'resueltos',
  materials: 'documents',
};

export async function POST(req: Request) {
  try {
    const { bucket, ext } = await req.json();

    if (!BUCKETS[bucket]) {
      return NextResponse.json({ error: 'Bucket no permitido' }, { status: 400 });
    }

    const safeExt =
      String(ext || 'pdf').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5) || 'pdf';
    const path = `${BUCKETS[bucket]}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)}.${safeExt}`;

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUploadUrl(path);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ path: data.path, token: data.token });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Error interno' }, { status: 500 });
  }
}