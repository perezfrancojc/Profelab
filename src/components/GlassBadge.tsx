import type { ReactNode } from 'react';
import { THEME, type SubjectKey } from '@/lib/subjectTheme';

// Debe estar dentro de un elemento con la clase "group"
export function GlassBadge({
  children,
  dot = true,
  subject = 'mat',
}: {
  children: ReactNode;
  dot?: boolean;
  subject?: SubjectKey;
}) {
  const t = THEME[subject];

  return (
    <span
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full px-3.5 py-1.5
                 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600
                 bg-white/70 backdrop-blur-md ring-1 ring-inset ring-slate-900/10
                 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(15,23,42,0.05)]
                 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                 ${t.badgeHoverText} ${t.badgeHoverBg} ${t.badgeHoverRing} ${t.badgeHoverShadow}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={`absolute inset-0 rounded-full bg-slate-400 transition-colors duration-500 ${t.dot}`} />
          <span className={`absolute inset-0 rounded-full ${t.ping} opacity-0 group-hover:opacity-60 group-hover:animate-ping`} />
        </span>
      )}

      <span className="relative">{children}</span>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12
                   bg-gradient-to-r from-transparent via-white/90 to-transparent
                   transition-transform duration-1000 ease-out
                   group-hover:translate-x-[500%]"
      />
    </span>
  );
}