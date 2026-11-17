'use client';

import { useEffect, useState } from 'react';

interface Props {
  hasContent: boolean;
}

export function TopicSectionNav({ hasContent }: Props) {
  const [activeSection, setActiveSection] = useState(
    hasContent ? 'sobre-el-tema' : 'videos'
  );

  const [headerVisible, setHeaderVisible] = useState(true);

  const items = [
    ...(hasContent
      ? [{ id: 'sobre-el-tema', label: 'Sobre este tema' }]
      : []),
    { id: 'videos', label: 'Vídeos explicativos' },
    { id: 'ejercicios-pdf', label: 'Ejercicios PDF' },
    { id: 'autoevaluacion', label: 'Tests' },
    { id: 'material-pdf', label: 'Apuntes PDF' },
  ];

  // Sincronizar la visibilidad con SiteHeader
  useEffect(() => {
    const handleHeaderVisibility = (event: Event) => {
      const customEvent = event as CustomEvent<{ visible: boolean }>;
      setHeaderVisible(customEvent.detail.visible);
    };

    window.addEventListener(
      'site-header-visibility',
      handleHeaderVisibility
    );

    return () => {
      window.removeEventListener(
        'site-header-visibility',
        handleHeaderVisibility
      );
    };
  }, []);

  // Detectar la sección activa
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
        rootMargin: '-110px 0px -65% 0px',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const section = document.getElementById(item.id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [hasContent]);

  return (
    <nav
      aria-label="Navegación por los contenidos del tema"
      className={`sticky top-16 z-40 -mx-6 px-6 py-3 bg-[#FAF9F5]/95 backdrop-blur-md border-y border-slate-200/80 transition-transform duration-300 ease-in-out ${
        headerVisible
          ? 'translate-y-0'
          : '-translate-y-[140px]'
      }`}
    >
      <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
        {items.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => setActiveSection(item.id)}
              className={`shrink-0 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-red-600 bg-red-50'
                  : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}