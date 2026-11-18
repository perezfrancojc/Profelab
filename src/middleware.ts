import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function unauthorized() {
  return new NextResponse('Acceso Denegado', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Panel de Administracion Profelab"',
    },
  });
}

export function middleware(req: NextRequest) {
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  // Sin variables configuradas, se bloquea todo (nunca hay credenciales por defecto)
  if (!ADMIN_USER || !ADMIN_PASSWORD) return unauthorized();

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) return unauthorized();

  try {
    const decoded = atob(authHeader.split(' ')[1]);
    const sep = decoded.indexOf(':'); // permite ':' dentro de la contraseña
    if (sep === -1) return unauthorized();

    const user = decoded.slice(0, sep);
    const pwd = decoded.slice(sep + 1);

    if (user === ADMIN_USER && pwd === ADMIN_PASSWORD) {
      return NextResponse.next();
    }
  } catch {
    // header malformado
  }

  return unauthorized();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};