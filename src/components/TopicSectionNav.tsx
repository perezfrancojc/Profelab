
'use client';

import { useEffect, useState } from 'react';

interface Props {
  hasContent: boolean;
}

const activeGlassClass =
  'text-[#a51f2b] bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(255,255,255,0.66)_48%,rgba(255,239,241,0.78))] border border-white/75 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.98),inset_0_-1px_1px_rgba(255,255,255,0.45),0_3px_10px_rgba(100,30,40,0.07)]';

const inactiveGlassClass =
  'text-slate-600 border border-transparent hover:text-[#a51f2b] hover:bg-white/35 hover:backdrop-blur-xl hover:backdrop-saturate-150';

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
              className={`shrink-0 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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


