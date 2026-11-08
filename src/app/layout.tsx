import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profelab - Plataforma Educativa",
  description: "Apuntes, vídeos y resoluciones en PDF",
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
                PL
              </div>
              <div>
                <span className="font-bold text-white text-base block">ProfeLab</span>
                <p className="text-xs text-slate-400 mt-0.5">Material de apoyo para estudiantes de ESO y Bachillerato.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 text-xs text-slate-400">
              <div className="flex gap-4">
                <a href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</a>
                <a href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</a>
              </div>
              <span>© 2026 ProfeLab. Hecho con vocación docente.</span>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}