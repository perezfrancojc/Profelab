import type { ReactNode } from 'react';

// Debe estar dentro de un elemento con la clase "group" (las tarjetas ya la tienen)
export function GlassBadge({
  children,
  dot = true,
}: {
  children: ReactNode;
  dot?: boolean;
}) {
  return (
    <span
      className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-3.5 py-1.5
                 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600
                 bg-white/70 backdrop-blur-md ring-1 ring-inset ring-slate-900/10
                 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(15,23,42,0.05)]
                 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                 group-hover:text-red-700 group-hover:bg-red-50/70 group-hover:ring-red-500/25
                 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_-8px_rgba(220,38,38,0.35)]"
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-slate-400 transition-colors duration-500 group-hover:bg-red-500" />
          <span className="absolute inset-0 rounded-full bg-red-500 opacity-0 group-hover:opacity-60 group-hover:animate-ping" />
        </span>
      )}

      <span className="relative">{children}</span>

      {/* Destello diagonal al hacer hover en la tarjeta */}
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