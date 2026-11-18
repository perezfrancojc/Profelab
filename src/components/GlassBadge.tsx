import type { ReactNode } from 'react';

export function GlassBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="relative inline-flex items-center overflow-hidden rounded-full px-4 py-[7px]
                 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700
                 bg-gradient-to-b from-white/95 via-slate-50/80 to-slate-200/60
                 backdrop-blur-xl backdrop-saturate-150
                 ring-1 ring-inset ring-slate-900/[0.07]
                 shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(15,23,42,0.05),0_1px_1px_rgba(15,23,42,0.04),0_8px_20px_-8px_rgba(15,23,42,0.18)]"
    >
      {/* Reflejo especular suave en la mitad superior */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-0.5 h-[46%] rounded-full bg-gradient-to-b from-white to-white/0 opacity-90"
      />
      {/* Borde de luz fino en la parte inferior */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
      />
      <span className="relative [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">{children}</span>
    </span>
  );
}