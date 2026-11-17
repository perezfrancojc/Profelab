
import Link from 'next/link';
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
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F1EFE8]/95 backdrop-blur-xl border-b border-slate-200/70">
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
