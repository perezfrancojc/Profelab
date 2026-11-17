
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

  // Detectamos el desplazamiento usando un punto de referencia
  // independiente del menú sticky.
  useEffect(() => {
    let animationFrame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const sentinel = document.getElementById('home-nav-sentinel');

        if (!sentinel) return;

        const sentinelTop = sentinel.getBoundingClientRect().top;

        setExpanded((current) => {
          if (!current && sentinelTop <= 80) return true;
          if (current && sentinelTop > 105) return false;
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

  // Identificamos la sección que está recorriendo el usuario.
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
            className={`shrink-0 rounded-lg font-bold whitespace-nowrap transition-all duration-300 ${
              compact
                ? 'px-2 py-2 text-[10px] sm:px-3 sm:text-xs'
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
        className={`shrink-0 rounded-lg bg-red-600 text-white font-bold uppercase tracking-wide hover:bg-red-700 transition-all shadow-sm whitespace-nowrap ${
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
      {/* Cabecera principal */}
      <header className="sticky top-0 z-50 w-full bg-[#F1EFE8]/95 backdrop-blur-xl border-b border-slate-200/70">

        {/* Información inicial: desaparece al integrar el menú */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            expanded
              ? 'max-h-0 opacity-0'
              : 'max-h-12 opacity-100'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-slate-600 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">
                Clases de apoyo y material actualizado para el curso 2026/2027
              </span>
            </span>

            <a
              href="#contacto"
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">
                Resuelve tus dudas con un docente
              </span>
              <span className="sm:hidden">Contacto</span>
            </a>
          </div>
        </div>

        {/* Marca y navegación integrada */}
        <div
          className={`mx-auto px-4 sm:px-6 h-20 flex items-center gap-2 sm:gap-4 transition-[max-width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            expanded ? 'max-w-[1500px]' : 'max-w-6xl'
          }`}
        >
          {/* Identidad de JuancaEduca: permanece siempre visible */}
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

          {/* El menú se incorpora progresivamente a la derecha */}
          <nav
            aria-label="Navegación principal integrada"
            className={`min-w-0 flex-1 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              expanded
                ? 'max-w-[1000px] opacity-100 translate-y-0'
                : 'max-w-0 opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-end sm:justify-center gap-0.5 sm:gap-1 whitespace-nowrap overflow-x-auto">
              {renderLinks(true)}
            </div>
          </nav>
        </div>
      </header>

      {/* Punto de referencia: permite detectar también el desplazamiento hacia arriba */}
      <div id="home-nav-sentinel" className="h-px w-full" />

      {/* Menú independiente */}
      <nav
        aria-label="Navegación por la página principal"
        className={`sticky z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
        }`}
        style={{ top: expanded ? '80px' : '120px' }}
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
