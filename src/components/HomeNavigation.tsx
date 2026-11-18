
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

const navigationItems = [
  { id: 'asignaturas', label: 'Asignaturas', short: 'Materias' },
  { id: 'metodo', label: 'Metodología', short: 'Método' },
  { id: 'videos', label: 'Vídeos', short: 'Vídeos' },
];

export function HomeNavigation() {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('asignaturas');

  useEffect(() => {
    let animationFrame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;

        setExpanded((current) => {
          if (!current && scrollPosition > 90) return true;
          if (current && scrollPosition < 35) return false;
          return current;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: '-120px 0px -65% 0px',
        threshold: 0,
      }
    );

    navigationItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const renderLinks = (compact = false) => (
    <>
      {navigationItems.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? 'location' : undefined}
            className={`relative isolate shrink-0 rounded-xl font-bold whitespace-nowrap transition-all duration-500 ease-out ${
              compact
                ? 'px-2 py-2 text-[10px] sm:px-3 sm:text-xs'
                : 'px-3 py-2 text-xs'
            } ${
              isActive
                ? 'text-red-700 bg-white/35 backdrop-blur-xl border border-white/70 shadow-[0_2px_12px_rgba(15,23,42,0.07),inset_0_1px_1px_rgba(255,255,255,0.85)] before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-br before:from-white/55 before:via-white/15 before:to-red-100/25 max-sm:after:absolute max-sm:after:inset-0 max-sm:after:-z-20 max-sm:after:rounded-xl max-sm:after:bg-red-500/5'
                : 'border border-transparent text-slate-600 hover:text-red-600 hover:bg-white/30 hover:backdrop-blur-md'
            }`}
          >
            <span className="hidden sm:inline">{item.label}</span>
            <span className="sm:hidden">{item.short}</span>
          </a>
        );
      })}

      <a
        href="#asignaturas"
        className={`hidden sm:inline-flex shrink-0 rounded-lg bg-red-600 text-white font-bold uppercase tracking-wide hover:bg-red-700 transition-all shadow-sm whitespace-nowrap ${
          compact
            ? 'px-2.5 py-2 text-[9px] sm:px-4 sm:text-[11px]'
            : 'px-5 py-2.5 text-xs'
        }`}
      >
        <span className="hidden sm:inline">Explorar cursos</span>
        <span className="sm:hidden">Cursos</span>
      </a>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#F1EFE8]/95 backdrop-blur-xl border-b border-slate-200/70">
        <div
          className={`mx-auto h-20 px-4 sm:px-6 flex items-center gap-3 max-sm:gap-4 max-sm:overflow-x-auto max-sm:flex-nowrap max-sm:justify-start max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden transition-[max-width,padding,gap] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            expanded
              ? 'max-w-[1500px] max-sm:px-2 max-sm:gap-0'
              : 'max-w-6xl'
          }`}
        >
          <Link
            href="/"
            aria-label="JuancaEduca - Inicio"
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 text-white rounded-xl font-extrabold text-lg flex items-center justify-center shadow-sm group-hover:bg-red-700 transition-colors">
              JE
            </div>

            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-none whitespace-nowrap">
                JuancaEduca
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-red-600 tracking-wider whitespace-nowrap">
                Academia de Ciencias
              </span>
            </div>
          </Link>

          <div
            className={`min-w-0 flex-1 flex items-center justify-center max-sm:flex-none transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              expanded
                ? 'max-w-0 opacity-0 scale-95 overflow-hidden'
                : 'max-w-[700px] opacity-100 scale-100'
            }`}
          >
            <div className="flex items-center gap-3 sm:gap-4 max-sm:gap-1.5">
              <div className="flex flex-col shrink-0">
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Curso académico
                </span>
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
                  2026/2027
                </span>
              </div>

              <div className="w-px h-8 bg-slate-300/80 shrink-0" />

              <div className="hidden sm:flex flex-col gap-0.5 min-w-0">
                <span className="text-xs font-semibold text-slate-700">
                  Contenidos actualizados
                </span>
                <span className="text-[10px] text-slate-500">
                  Temarios y recursos educativos
                </span>
              </div>
            </div>
          </div>

          <a
            href="#contacto"
            className={`shrink-0 flex items-center gap-2 max-sm:gap-1 rounded-xl px-3 py-2.5 max-sm:px-0.5 max-sm:ml-[-10px] text-xs font-bold text-slate-700 hover:text-red-600 hover:bg-red-50 transition-all duration-500 ${
              expanded
                ? 'max-w-0 opacity-0 px-0 overflow-hidden pointer-events-none'
                : 'max-w-[230px] opacity-100'
            }`}
          >
            <Phone className="w-4 h-4 text-red-500 shrink-0" />
            <span className="hidden lg:inline whitespace-nowrap">
              Resuelve tus dudas
            </span>
            <span className="lg:hidden whitespace-nowrap">Contacto</span>
          </a>

          <nav
            aria-label="Navegación principal integrada"
            className={`min-w-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              expanded
                ? 'flex-1 max-w-[1000px] max-sm:flex-none max-sm:w-max max-sm:max-w-none max-sm:min-w-max max-sm:ml-[-30px] opacity-100 translate-y-0'
                : 'max-w-0 opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-end gap-0.5 sm:gap-1 max-sm:justify-start max-sm:gap-0 whitespace-nowrap max-sm:w-max">
              {renderLinks(true)}
            </div>
          </nav>
        </div>
      </header>

      <nav
        aria-label="Navegación por la página principal"
        className={`sticky top-20 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-center gap-2 overflow-x-auto max-sm:justify-start max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden">
            {renderLinks(false)}
          </div>
        </div>
      </nav>
    </>
  );
}
