
'use client';

import { useEffect, useState } from 'react';

interface Props {
  hasContent: boolean;
}

const activeGlassClass =
  'text-red-700 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,245,246,0.72)_55%,rgba(254,226,226,0.48))] border border-red-200/70 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(220,38,38,0.08),0_2px_6px_rgba(127,29,29,0.06)]';

const inactiveGlassClass =
  'text-slate-600 border border-transparent hover:text-red-700 hover:bg-white/45 hover:border-white/70 hover:backdrop-blur-lg';

export function TopicSectionNav({ hasContent }: Props) {
  const [activeSection, setActiveSection] = useState(
    hasContent ? 'sobre-el-tema' : 'videos'
  );

  const [headerExpanded, setHeaderExpanded] = useState(false);

  const items = [
    ...(hasContent
      ? [{ id: 'sobre-el-tema', label: 'Sobre este tema' }]
      : []),
    { id: 'videos', label: 'Vídeos explicativos' },
    { id: 'ejercicios-pdf', label: 'Ejercicios PDF' },
    { id: 'autoevaluacion', label: 'Tests' },
    { id: 'material-pdf', label: 'Apuntes PDF' },
  ];

  useEffect(() => {
    const handleHeader = (event: Event) => {
      const customEvent = event as CustomEvent<{ expanded: boolean }>;
      setHeaderExpanded(customEvent.detail.expanded);
    };

    window.addEventListener('topic-header-compact', handleHeader);

    return () => {
      window.removeEventListener('topic-header-compact', handleHeader);
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
        rootMargin: '-110px 0px -65% 0px',
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
    <nav
      id="topic-section-nav"
      aria-label="Navegación por los contenidos del tema"
      className={`sticky top-[72px] z-40 -mx-6 px-6 py-3 bg-[#FAF9F5]/95 backdrop-blur-md border-y border-slate-200/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        headerExpanded
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
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
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all duration-300 ease-out ${
                isActive ? activeGlassClass : inactiveGlassClass
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

