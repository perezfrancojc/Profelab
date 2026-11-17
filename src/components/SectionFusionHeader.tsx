
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

interface SectionFusionHeaderProps {
  title: string;
  compactTitle: string;
  backHref: string;
  backLabel?: string;
  triggerId: string;
}

interface FusionSectionProps {
  id: string;
  children: ReactNode;
}

export function SectionFusionHeader({
  title,
  compactTitle,
  backHref,
  backLabel = 'Volver',
  triggerId,
}: SectionFusionHeaderProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let animationFrame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const section = document.getElementById(triggerId);
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top;

        setExpanded((current) => {
          if (!current && sectionTop <= 76) return true;
          if (current && sectionTop > 105) return false;
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
  }, [triggerId]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('section-header-fusion', {
        detail: { expanded },
      })
    );
  }, [expanded]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F1EFE8]/95 backdrop-blur-xl border-b border-slate-200/70">
      <div
        className={`mx-auto h-[72px] px-4 sm:px-6 flex items-center gap-3 transition-[max-width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded ? 'max-w-[1500px]' : 'max-w-6xl'
        }`}
      >
        <Link
          href="/"
          className="font-serif italic font-bold text-xl sm:text-2xl text-red-600 tracking-tight hover:text-red-700 transition-colors shrink-0"
        >
          JuancaEduca
        </Link>

        <span
          className={`min-w-0 truncate text-xs sm:text-sm font-semibold text-slate-700 transition-all duration-500 ease-out ${
            expanded
              ? 'opacity-100 translate-y-0 max-w-[600px] ml-2'
              : 'opacity-0 -translate-y-1 max-w-0 ml-0'
          }`}
        >
          {compactTitle}
        </span>

        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors shrink-0 ml-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">Volver</span>
        </Link>
      </div>
    </header>
  );
}

export function FusionSection({ id, children }: FusionSectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleFusion = (event: Event) => {
      const customEvent = event as CustomEvent<{ expanded: boolean }>;
      setCollapsed(customEvent.detail.expanded);
    };

    window.addEventListener('section-header-fusion', handleFusion);

    return () => {
      window.removeEventListener('section-header-fusion', handleFusion);
    };
  }, []);

  return (
    <div
      id={id}
      className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        collapsed
          ? 'max-h-0 opacity-0 -translate-y-3 pointer-events-none'
          : 'max-h-[300px] opacity-100 translate-y-0'
      }`}
      aria-hidden={collapsed}
    >
      {children}
    </div>
  );
}
