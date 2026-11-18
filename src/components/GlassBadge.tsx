import type { ReactNode } from 'react';

export function GlassBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="relative inline-flex items-center overflow-hidden rounded-full px-3.5 py-1.5
                 text-[11px] font-extrabold uppercase tracking-wider text-slate-800
                 border border-white/90 ring-1 ring-slate-900/10
                 bg-gradient-to-br from-white/90 via-rose-50/70 to-orange-100/70
                 shadow-[inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(220,38,38,0.12),0_1px_2px_rgba(15,23,42,0.1),0_6px_14px_-6px_rgba(220,38,38,0.35)]"
    >
      {/* Luz refractada interna */}
      <span aria-hidden className="absolute -left-3 -bottom-4 h-8 w-14 rounded-full bg-red-400/40 blur-md" />
      <span aria-hidden className="absolute -right-2 -top-4 h-7 w-12 rounded-full bg-orange-300/50 blur-md" />
      {/* Reflejo especular superior */}
      <span aria-hidden className="absolute inset-x-2 top-px h-1/2 rounded-full bg-gradient-to-b from-white/95 to-white/0" />
      <span className="relative">{children}</span>
    </span>
  );
}