'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface SiteHeaderProps {
  title: string;
  backHref: string;
  backLabel?: string;
}

export function SiteHeader({
  title,
  backHref,
  backLabel = 'Volver',
}: SiteHeaderProps) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
   const handleScroll = () => {
    const currentScrollY = window.scrollY;
    let nextVisible = visibleRef.current;

    if (currentScrollY < 80) {
        nextVisible = true;
    } else if (currentScrollY > lastScrollY.current + 5) {
        nextVisible = false;
    } else if (currentScrollY < lastScrollY.current - 5) {
        nextVisible = true;
    }

    if (nextVisible !== visibleRef.current) {
        visibleRef.current = nextVisible;
        setVisible(nextVisible);

        window.dispatchEvent(
        new CustomEvent('site-header-visibility', {
            detail: { visible: nextVisible },
        })
        );
    }

    lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/70 bg-[#F1EFE8]/90 backdrop-blur-xl shadow-sm transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between gap-4">

        <Link
          href="/"
          className="font-serif italic font-bold text-2xl text-red-600 tracking-tight hover:text-red-700 transition-colors shrink-0"
        >
          JuancaEduca
        </Link>

        <div className="flex items-center gap-4 min-w-0">
          <span className="hidden sm:block text-sm font-semibold text-slate-700 truncate">
            {title}
          </span>

          <Link
            href={backHref}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{backLabel}</span>
            <span className="sm:hidden">Volver</span>
          </Link>
        </div>
      </div>
    </header>
  );
}