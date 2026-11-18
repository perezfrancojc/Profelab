import type { ReactNode } from 'react';

export function GlassBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="relative inline-flex items-center overflow-hidden rounded-full px-3.5 py-1.5
                 text-[11px] font-extrabold uppercase tracking-wider text-slate-800
                 border border-white/80 ring-1 ring-slate-900/5
                 bg-gradient-to-b from-white/75 via-white/40 to-white/20
                 backdrop-blur-xl backdrop-saturate-200
                 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.08),0_10px_22px_-10px_rgba(220,38,38,0.45)]"
    >
      {/* Reflejo especular superior */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-2 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/90 to-transparent"
      />
      {/* Brillo inferior de refracción */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-red-300/60 to-transparent"
      />
      <span className="relative">{children}</span>
    </span>
  );
}

// Resplandor que va detrás del cristal. El padre debe tener "relative isolate overflow-hidden".
export function GlassGlow() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -z-10 -top-12 -left-12 h-44 w-44 rounded-full
                 bg-gradient-to-br from-red-400/45 via-orange-300/35 to-transparent blur-2xl
                 transition-transform duration-700 ease-out
                 group-hover:translate-x-10 group-hover:translate-y-3 group-hover:scale-110"
    />
  );
}