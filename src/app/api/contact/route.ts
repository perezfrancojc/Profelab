import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Imprime en la consola si la API key se cargó bien
    if (!process.env.RESEND_API_KEY) {
      console.error('ERROR: No se ha detectado RESEND_API_KEY en .env.local');
      return NextResponse.json({ error: 'Falta la API Key' }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // No cambiar en cuenta gratuita
      to: ['perezfrancojc@gmail.com'], // Debe ser el correo exacto de tu cuenta de Resend
      subject: `Nueva solicitud de tutoría: ${name}`,
      html: `
        <h2>Nueva solicitud de tutoría</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('ERROR DE RESEND:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('ERROR EN SERVIDOR:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}