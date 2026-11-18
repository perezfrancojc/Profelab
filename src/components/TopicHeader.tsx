
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface TopicHeaderProps {
  title: string;
  backHref: string;
  backLabel?: string;
  hasContent: boolean;
}

export function TopicHeader({
  title,
  backHref,
  backLabel = 'Volver',
  hasContent,
}: TopicHeaderProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(
    hasContent ? 'sobre-el-tema' : 'videos'
  );

  const items = [
    ...(hasContent
      ? [{ id: 'sobre-el-tema', label: 'Sobre el tema', short: 'Tema' }]
      : []),
    { id: 'videos', label: 'Vídeos explicativos', short: 'Vídeos' },
    { id: 'ejercicios-pdf', label: 'Ejercicios PDF', short: 'Ejercicios' },
    { id: 'autoevaluacion', label: 'Tests', short: 'Tests' },
    { id: 'material-pdf', label: 'Apuntes PDF', short: 'Apuntes' },
  ];

  useEffect(() => {
    let animationFrame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const originalNav = document.getElementById('topic-section-nav');

        if (!originalNav) return;

        const navTop = originalNav.getBoundingClientRect().top;

        setExpanded((current) => {
          if (!current && navTop <= 76) return true;
          if (current && navTop > 105) return false;
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
    window.dispatchEvent(
      new CustomEvent('topic-header-compact', {
        detail: { expanded },
      })
    );
  }, [expanded]);

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
        rootMargin: '-125px 0px -65% 0px',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [hasContent]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F1EFE8]/95 backdrop-blur-xl border-b border-slate-200/70">
      <div
        className={`mx-auto h-[72px] px-4 sm:px-6 flex items-center gap-3 max-sm:gap-1.5 max-sm:px-3 max-sm:overflow-x-auto max-sm:flex-nowrap max-sm:justify-start max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden transition-[max-width,padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded ? 'max-w-[1500px]' : 'max-w-6xl'
        }`}
      >
        <Link
          href="/"
          aria-label="JuancaEduca - Inicio"
          className="relative flex items-center shrink-0"
        >
          <span
            className={`font-serif italic font-bold text-xl sm:text-2xl text-red-600 tracking-tight hover:text-red-700 transition-all duration-300 whitespace-nowrap ${
              expanded
                ? 'max-sm:max-w-0 max-sm:opacity-0 max-sm:overflow-hidden'
                : 'max-w-[200px] opacity-100'
            }`}
          >
            JuancaEduca
          </span>

          <span
            className={`hidden max-sm:flex w-9 h-9 items-center justify-center rounded-xl bg-red-600 text-white font-extrabold text-lg shadow-sm transition-all duration-300 ${
              expanded
                ? 'opacity-100 scale-100'
                : 'absolute opacity-0 scale-75 pointer-events-none'
            }`}
          >
            JE
          </span>
        </Link>

        <span
          className={`hidden lg:block text-xs font-semibold text-slate-700 truncate transition-all duration-500 ${
            expanded ? 'max-w-[150px] opacity-100' : 'max-w-[260px] opacity-100'
          }`}
        >
          {title}
        </span>

        <nav
          aria-label="Navegación rápida del tema"
          className={`min-w-0 flex-1 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            expanded
              ? 'max-w-[900px] max-sm:flex-none max-sm:w-max max-sm:max-w-none max-sm:min-w-max opacity-100 translate-y-0'
              : 'max-w-0 opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 max-sm:gap-0 whitespace-nowrap">
            {items.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setActiveSection(item.id)}
                  className={`shrink-0 px-2 py-2 max-sm:px-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.short}</span>
                </a>
              );
            })}
          </div>
        </nav>

        <Link
          href={backHref}
          className="flex items-center gap-1.5 max-sm:gap-0.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors shrink-0 ml-auto"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">Volver</span>
        </Link>
      </div>
    </header>
  );
}




