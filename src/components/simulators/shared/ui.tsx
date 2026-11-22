'use client';

import { MathText } from '@/components/Math';

export const ACCENT = '#D2560F';
export const BLUE = '#0A5FCC';
export const CARD = 'bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm';

export const fmt = (n: number) => {
  const r = Math.round(n * 100) / 100;
  return Object.is(r, -0) ? '0' : String(r);
};

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  color,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  color?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-bold text-slate-800">
          <MathText text={`$${label}$`} />
        </span>
        <span className="text-sm font-semibold tabular-nums" style={{ color: color ?? ACCENT }}>
          {fmt(value)}
          {unit ? ` ${unit}` : ''}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-8 cursor-pointer"
        style={{ accentColor: color ?? ACCENT }}
      />
    </div>
  );
}

export function Tabs<T extends string>({
  items,
  value,
  onChange,
}: {
  items: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex flex-wrap rounded-xl bg-slate-100 p-1 gap-1">
      {items.map((i) => (
        <button
          key={i.id}
          type="button"
          onClick={() => onChange(i.id)}
          className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
            value === i.id ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}

export function GuidedQuestions({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className={`${CARD} sm:p-6 space-y-3`}>
      <h2 className="text-lg font-black text-slate-900">Explora con intención</h2>
      <p className="text-sm text-slate-600">
        Prueba cada pregunta en el simulador y despliega la respuesta para comprobar tu conclusión.
      </p>
      <div className="divide-y divide-slate-100">
        {items.map((item, i) => (
          <details key={i} className="group py-3">
            <summary className="cursor-pointer list-none flex items-start gap-3 text-sm font-semibold text-slate-900">
              <span
                className="mt-0.5 w-6 h-6 shrink-0 rounded-full text-white text-xs font-bold flex items-center justify-center"
                style={{ backgroundColor: ACCENT }}
              >
                {i + 1}
              </span>
              {item.q}
            </summary>
            <p className="mt-2 ml-9 text-sm text-slate-600 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}