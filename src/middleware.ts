import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Proteger la ruta /admin y sus subrutas
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Usuario y contraseña de acceso (puedes cambiarlos)
      const ADMIN_USER = process.env.ADMIN_USER || 'admin';
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Profelab2026!';

      if (user === ADMIN_USER && pwd === ADMIN_PASSWORD) {
        return NextResponse.next();
      }
    }

    return new NextResponse('Acceso Denegado: Credenciales incorrectas', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Panel de Administracion Profelab"',
      },
    });
  }

  return NextResponse.next();
}