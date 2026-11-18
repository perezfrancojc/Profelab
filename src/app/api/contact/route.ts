import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'perezfrancojc@gmail.com';

const LIMITS = { name: 100, email: 150, phone: 30, message: 2000 };

// Rate limit en memoria: 3 envíos por IP cada 10 minutos.
// Es por instancia (en serverless no es perfecto), pero frena el abuso básico.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);

  // Limpieza para que el Map no crezca indefinidamente
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Evita inyección de cabeceras / saltos de línea en el asunto
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Inténtalo de nuevo en unos minutos.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Petición no válida' }, { status: 400 });
    }

    const { name, email, phone, message } = body as Record<string, unknown>;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof phone !== 'string' ||
      typeof message !== 'string'
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const clean = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    };

    if (!clean.name || !clean.email || !clean.phone || !clean.message) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    if (
      clean.name.length > LIMITS.name ||
      clean.email.length > LIMITS.email ||
      clean.phone.length > LIMITS.phone ||
      clean.message.length > LIMITS.message
    ) {
      return NextResponse.json({ error: 'Algún campo es demasiado largo' }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(clean.email)) {
      return NextResponse.json({ error: 'Correo electrónico no válido' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('ERROR: No se ha detectado RESEND_API_KEY');
      return NextResponse.json({ error: 'Error de configuración' }, { status: 500 });
    }

    const { error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // No cambiar en cuenta gratuita
      to: [TO_EMAIL],
      replyTo: clean.email,
      subject: `Nueva solicitud de tutoría: ${singleLine(clean.name)}`,
      html: `
        <h2>Nueva solicitud de tutoría</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(clean.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(clean.email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(clean.phone)}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(clean.message)}</p>
      `,
    });

    if (error) {
      console.error('ERROR DE RESEND:', error);
      return NextResponse.json({ error: 'No se pudo enviar el mensaje' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('ERROR EN SERVIDOR:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}