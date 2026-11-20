'use client';

import { useMemo, useState } from 'react';
import { MathText } from '@/components/Math';

const ACCENT = '#D2560F';
const SIZE = 480;
const UNITS = 10;
const PX = SIZE / (UNITS * 2);
const X = (x: number) => SIZE / 2 + x * PX;
const Y = (y: number) => SIZE / 2 - y * PX;

const fmt = (n: number) => {
  const r = Math.round(n * 100) / 100;
  return Object.is(r, -0) ? '0' : String(r);
};

const QUESTIONS = [
  {
    q: '¿Qué ocurre con la parábola cuando a es negativo?',
    a: 'Se abre hacia abajo. Si a es positivo se abre hacia arriba. Cuanto mayor es |a|, más cerrada es la parábola.',
  },
  {
    q: 'Deja a = 1 y b = 0 y mueve c. ¿Qué cambia?',
    a: 'La parábola sube o baja sin deformarse: c es el punto donde corta al eje Y.',
  },
  {
    q: 'Busca valores con discriminante negativo. ¿Qué pasa con la gráfica?',
    a: 'No corta al eje X, así que la ecuación no tiene soluciones reales.',
  },
  {
    q: 'Consigue que el discriminante sea exactamente 0. ¿Dónde está el vértice?',
    a: 'Sobre el eje X: la parábola lo toca en un solo punto y hay una solución doble.',
  },
];

export default function ParabolaSimulator() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-4);

  const isLine = Math.abs(a) < 0.01;
  const disc = b * b - 4 * a * c;
  const xv = isLine ? 0 : -b / (2 * a);
  const yv = isLine ? 0 : c - (b * b) / (4 * a);

  const roots: number[] = isLine
    ? []
    : disc > 0
    ? [(-b - Math.sqrt(disc)) / (2 * a), (-b + Math.sqrt(disc)) / (2 * a)]
    : disc === 0
    ? [-b / (2 * a)]
    : [];

  const path = useMemo(() => {
    let d = '';
    for (let i = 0; i <= 400; i++) {
      const x = -UNITS + i * ((2 * UNITS) / 400);
      const y = a * x * x + b * x + c;
      d += `${i === 0 ? 'M' : 'L'}${X(x).toFixed(1)},${Y(y).toFixed(1)} `;
    }
    return d;
  }, [a, b, c]);

  const sgn = (n: number) => (n < 0 ? '-' : '+');
  const equation = `y = ${fmt(a)}x^2 ${sgn(b)} ${fmt(Math.abs(b))}x ${sgn(c)} ${fmt(Math.abs(c))}`;

  const verdict = isLine
    ? 'Con a = 0 ya no es una parábola: es una recta.'
    : disc > 0
    ? 'Discriminante positivo: dos soluciones reales.'
    : disc === 0
    ? 'Discriminante cero: una solución doble.'
    : 'Discriminante negativo: no hay soluciones reales.';

  const reset = () => {
    setA(1);
    setB(0);
    setC(-4);
  };

  const sliders = [
    { label: 'a', value: a, set: setA, min: -5, max: 5, step: 0.1 },
    { label: 'b', value: b, set: setB, min: -10, max: 10, step: 0.5 },
    { label: 'c', value: c, set: setC, min: -10, max: 10, step: 0.5 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Gráfica */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-sm">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="w-full h-auto max-w-[560px] mx-auto"
            role="img"
            aria-label={`Gráfica de ${equation}`}
          >
            <defs>
              <clipPath id="plot">
                <rect x="0" y="0" width={SIZE} height={SIZE} />
              </clipPath>
            </defs>

            {/* Cuadrícula */}
            {Array.from({ length: UNITS * 2 + 1 }).map((_, i) => (
              <g key={i}>
                <line x1={i * PX} y1={0} x2={i * PX} y2={SIZE} stroke="#e2e8f0" strokeWidth={i === UNITS ? 0 : 1} />
                <line x1={0} y1={i * PX} x2={SIZE} y2={i * PX} stroke="#e2e8f0" strokeWidth={i === UNITS ? 0 : 1} />
              </g>
            ))}

            {/* Ejes */}
            <line x1={0} y1={SIZE / 2} x2={SIZE} y2={SIZE / 2} stroke="#475569" strokeWidth={1.5} />
            <line x1={SIZE / 2} y1={0} x2={SIZE / 2} y2={SIZE} stroke="#475569" strokeWidth={1.5} />
            {[-10, -5, 5, 10].map((n) => (
              <g key={n} fontSize="11" fill="#64748b">
                <text x={X(n)} y={SIZE / 2 + 14} textAnchor="middle">{n}</text>
                <text x={SIZE / 2 + 6} y={Y(n) + 4}>{n}</text>
              </g>
            ))}

            <g clipPath="url(#plot)">
              {/* Eje de simetría */}
              {!isLine && (
                <line x1={X(xv)} y1={0} x2={X(xv)} y2={SIZE} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="5 5" />
              )}

              {/* Curva */}
              <path d={path} fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

              {/* Vértice */}
              {!isLine && (
                <circle cx={X(xv)} cy={Y(yv)} r={6} fill="#0f172a" stroke="#fff" strokeWidth={2} />
              )}

              {/* Raíces */}
              {roots.map((r, i) => (
                <circle key={i} cx={X(r)} cy={Y(0)} r={6} fill="#fff" stroke={ACCENT} strokeWidth={3} />
              ))}

              {/* Corte con eje Y */}
              <circle cx={X(0)} cy={Y(c)} r={4.5} fill="#64748b" stroke="#fff" strokeWidth={1.5} />
            </g>
          </svg>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mt-2">
            <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-full bg-slate-900 inline-block" /> Vértice</span>
            <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-full border-2 inline-block" style={{ borderColor: ACCENT }} /> Raíces</span>
            <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-full bg-slate-500 inline-block" /> Corte con Y</span>
          </div>
        </div>

        {/* Controles y resultados */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-5">
            <div className="text-lg text-center text-slate-900 overflow-x-auto">
              <MathText text={`$${equation}$`} />
            </div>

            {sliders.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={`slider-${s.label}`} className="text-sm font-bold text-slate-800">
                    <MathText text={`$${s.label}$`} />
                  </label>
                  <span className="text-sm font-semibold tabular-nums" style={{ color: ACCENT }}>
                    {fmt(s.value)}
                  </span>
                </div>
                <input
                  id={`slider-${s.label}`}
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="w-full h-8 cursor-pointer"
                  style={{ accentColor: ACCENT }}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={reset}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2.5 rounded-xl transition"
            >
              Restablecer
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-bold text-slate-900">Discriminante: </span>
              <MathText text={`$b^2 - 4ac = ${fmt(disc)}$`} />
            </p>
            {!isLine && (
              <p>
                <span className="font-bold text-slate-900">Vértice: </span>
                <MathText text={`$(${fmt(xv)},\\ ${fmt(yv)})$`} />
              </p>
            )}
            <p>
              <span className="font-bold text-slate-900">Raíces: </span>
              {roots.length > 0 ? (
                <MathText text={roots.map((r, i) => `$x_${i + 1} = ${fmt(r)}$`).join(',  ')} />
              ) : (
                <span>ninguna real</span>
              )}
            </p>
            <p className="pt-1 font-semibold" style={{ color: ACCENT }}>{verdict}</p>
          </div>
        </div>
      </div>

      {/* Preguntas guiadas */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-3">
        <h2 className="text-lg font-black text-slate-900">Explora con intención</h2>
        <p className="text-sm text-slate-600">
          Prueba cada pregunta en el simulador y despliega la respuesta para comprobar tu conclusión.
        </p>
        <div className="divide-y divide-slate-100">
          {QUESTIONS.map((item, i) => (
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
    </div>
  );
}