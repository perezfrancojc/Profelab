import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Analytics } from '@vercel/analytics/react';
import { SITE_URL } from '@/lib/config';
import { JsonLd } from '@/components/JsonLd';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "JuancaEduca - Plataforma Educativa",
  description: "Apuntes, vídeos y resoluciones en PDF",
  verification: {
    google: "FrzYWFdaXXRO0hNozcbDzEBulH2vFJUEj2elL1na5WQ"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/* El contenido de cada página se renderiza aquí */}
        <div className="flex-1">
          {children}
        </div>

        {/* Footer Global para toda la plataforma */}
        <footer className="bg-slate-900 text-white py-12 px-6 text-sm">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-600 text-white rounded-lg font-black text-base flex items-center justify-center">
                JE
              </div>
              <div>
                <span className="font-bold text-white text-base block">JuancaEduca</span>
                <p className="text-xs text-slate-400 mt-0.5">Material de apoyo para estudiantes de ESO y Bachillerato.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 text-xs text-slate-400">
              <div className="flex gap-4">
                <a href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</a>
                <a href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</a>
              </div>
              <span>© 2026 JuancaEduca. Hecho con vocación docente.</span>
            </div>
          </div>
        </footer>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: 'JuancaEduca',
                url: SITE_URL,
                logo: `${SITE_URL}/icon`,
              },
              {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: 'JuancaEduca',
                inLanguage: 'es-ES',
                publisher: { '@id': `${SITE_URL}/#organization` },
              },
            ],
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}