
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
        const originalNav = document.getElementById('home-section-nav');

        if (!originalNav) return;

        const navTop = originalNav.getBoundingClientRect().top;

        setExpanded((current) => {
          if (!current && navTop <= 82) return true;
          if (current && navTop > 110) return false;
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
            className={`shrink-0 rounded-lg font-bold transition-all duration-300 ${
              compact
                ? 'px-2 py-2 text-[11px] sm:text-xs'
                : 'px-3 py-2 text-xs'
            } ${
              isActive
                ? 'text-red-600 bg-red-50'
                : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <span className="hidden sm:inline">{item.label}</span>
            <span className="sm:hidden">{item.short}</span>
          </a>
        );
      })}

      <a
        href="#asignaturas"
        className={`shrink-0 rounded-lg bg-red-600 text-white font-bold uppercase tracking-wide hover:bg-red-700 transition-all shadow-sm ${
          compact
            ? 'px-2.5 py-2 text-[10px] sm:px-4 sm:text-[11px]'
            : 'px-5 py-2.5 text-xs'
        }`}
      >
        Explorar cursos
      </a>
    </>
  );

  return (
    <>
      {/* Barra informativa superior */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2.5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            Clases de apoyo y material actualizado para el curso 2026/2027
          </span>

          <a
            href="#contacto"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-400" />
            <span>Resuelve tus dudas con un docente</span>
          </a>
        </div>
      </div>

      {/* Cabecera principal dinámica */}
      <header className="sticky top-0 z-50 w-full bg-[#F1EFE8]/95 backdrop-blur-xl border-b border-slate-200/70">
        <div
          className={`mx-auto h-20 px-4 sm:px-6 flex items-center gap-2 sm:gap-3 transition-[max-width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            expanded ? 'max-w-[1500px]' : 'max-w-6xl'
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

            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                expanded
                  ? 'max-w-0 opacity-0 sm:max-w-[150px] sm:opacity-100'
                  : 'max-w-[160px] opacity-100'
              }`}
            >
              <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight block leading-none whitespace-nowrap">
                JuancaEduca
              </span>
              <span
                className={`text-[10px] uppercase font-bold text-red-600 tracking-wider whitespace-nowrap transition-all duration-300 ${
                  expanded ? 'opacity-0' : 'opacity-100'
                }`}
              >
                Academia de Ciencias
              </span>
            </div>
          </Link>

          {/* Los enlaces se incorporan a la cabecera al bajar */}
          <nav
            aria-label="Navegación principal integrada"
            className={`min-w-0 flex-1 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              expanded
                ? 'max-w-[900px] opacity-100 translate-y-0'
                : 'max-w-0 opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-end sm:justify-center gap-0.5 sm:gap-1 whitespace-nowrap">
              {renderLinks(true)}
            </div>
          </nav>
        </div>
      </header>

      {/* Menú independiente: se integra en la cabecera al bajar */}
      <nav
        id="home-section-nav"
        aria-label="Navegación por la página principal"
        className={`sticky top-20 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {renderLinks(false)}
          </div>
        </div>
      </nav>
    </>
  );
}
