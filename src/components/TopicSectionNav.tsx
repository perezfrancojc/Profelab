
'use client';

import { useEffect, useState } from 'react';

interface Props {
  hasContent: boolean;
}

const activeGlassClass = `
  text-red-700
  border border-red-300/90
  ring-1 ring-red-200/70
  bg-gradient-to-br from-white/90 via-rose-50/85 to-red-100/80
  backdrop-blur-2xl
  shadow-[0_4px_14px_rgba(190,24,93,0.16),0_1px_4px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(225,29,72,0.18)]
  before:absolute before:inset-x-1 before:top-0 before:h-1/2
  before:rounded-t-[inherit]
  before:bg-gradient-to-b before:from-white/95 before:via-white/45 before:to-transparent
  before:pointer-events-none
  after:absolute after:inset-x-2 after:bottom-0 after:h-px
  after:bg-gradient-to-r after:from-transparent after:via-red-400/70 after:to-transparent
  after:pointer-events-none
`;

const inactiveGlassClass = `
  border border-transparent
  text-slate-600
  hover:text-red-700
  hover:border-red-200/80
  hover:bg-gradient-to-br hover:from-white/75 hover:via-rose-50/45 hover:to-red-100/40
  hover:backdrop-blur-xl
  hover:shadow-[0_3px_10px_rgba(190,24,93,0.09),inset_0_1px_0_rgba(255,255,255,0.9)]
`;

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
      <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => setActiveSection(item.id)}
              className={`relative isolate overflow-hidden shrink-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-500 ease-out ${
                isActive ? activeGlassClass : inactiveGlassClass
              }`}
            >
              <span className="relative z-10">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
