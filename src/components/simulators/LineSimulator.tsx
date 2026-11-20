'use client';

import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, Maximize2 } from 'lucide-react';
import { MathText } from '@/components/Math';

const ACCENT = '#D2560F';
const SIZE = 480;
const MIN_HALF = 0.5;
const MAX_HALF = 500;

const fmt = (n: number) => {
  const r = Math.round(n * 100) / 100;
  return Object.is(r, -0) ? '0' : String(r);
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function niceStep(span: number) {
  const raw = span / 10;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / pow;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * pow;
}

const QUESTIONS = [
  {
    q: 'Deja n = 0 y mueve m. ¿Qué punto no se mueve nunca?',
    a: 'El origen (0, 0). Con n = 0 la recta siempre pasa por él: es una función lineal.',
  },
  {
    q: '¿Qué pasa con la recta cuando m es negativa?',
    a: 'Baja de izquierda a derecha: la función es decreciente. Con m positiva sube.',
  },
  {
    q: 'Pon m = 0. ¿Cómo es la recta?',
    a: 'Horizontal: y vale siempre n. Es una función constante.',
  },
  {
    q: 'Mueve n con m fija. ¿Qué cambia y qué no?',
    a: 'La recta se desplaza hacia arriba o abajo sin cambiar su inclinación: las rectas con la misma m son paralelas.',
  },
];

export default function LineSimulator() {
  const [m, setM] = useState(1);
  const [n, setN] = useState(0);
  const [view, setView] = useState({ cx: 0, cy: 0, half: 10 });

  const svgRef = useRef<SVGSVGElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchDist = useRef(0);

  const { cx, cy, half } = view;
  const scale = SIZE / (2 * half);
  const X = (x: number) => SIZE / 2 + (x - cx) * scale;
  const Y = (y: number) => SIZE / 2 - (y - cy) * scale;

  const root = Math.abs(m) < 0.001 ? null : -n / m;

  const zoomBy = (factor: number) =>
    setView((v) => ({ ...v, half: clamp(v.half * factor, MIN_HALF, MAX_HALF) }));

  const fit = () => {
    const xs = [0, 1, ...(root !== null ? [root] : [])];
    const ys = [0, n, m + n];
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const span = Math.max(maxX - minX, maxY - minY, 4);
    setView({
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      half: clamp((span / 2) * 1.6, MIN_HALF, MAX_HALF),
    });
  };

  const resetView = () => setView({ cx: 0, cy: 0, half: 10 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * SIZE;
      const py = ((e.clientY - rect.top) / rect.height) * SIZE;
      const factor = Math.exp(e.deltaY * 0.0015);

      setView((v) => {
        const h = clamp(v.half * factor, MIN_HALF, MAX_HALF);
        const s0 = SIZE / (2 * v.half);
        const s1 = SIZE / (2 * h);
        const ux = v.cx + (px - SIZE / 2) / s0;
        const uy = v.cy - (py - SIZE / 2) / s0;
        return { half: h, cx: ux - (px - SIZE / 2) / s1, cy: uy + (py - SIZE / 2) / s1 };
      });
    };

    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [p1, p2] = [...pointers.current.values()];
      pinchDist.current = Math.hypot(p1.x - p2.x, p1.y - p2.y);
    }
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const k = SIZE / rect.width;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      const dx = (e.clientX - prev.x) * k;
      const dy = (e.clientY - prev.y) * k;
      setView((v) => {
        const s = SIZE / (2 * v.half);
        return { ...v, cx: v.cx - dx / s, cy: v.cy + dy / s };
      });
    } else if (pointers.current.size === 2) {
      const [p1, p2] = [...pointers.current.values()];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (pinchDist.current > 0 && dist > 0) {
        const factor = pinchDist.current / dist;
        setView((v) => ({ ...v, half: clamp(v.half * factor, MIN_HALF, MAX_HALF) }));
      }
      pinchDist.current = dist;
    }
  };

  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    pointers.current.delete(e.pointerId);
    pinchDist.current = 0;
  };

  const step = niceStep(2 * half);
  const gridX: number[] = [];
  for (let v = Math.ceil((cx - half) / step) * step; v <= cx + half; v += step) gridX.push(Math.round(v / step) * step);
  const gridY: number[] = [];
  for (let v = Math.ceil((cy - half) / step) * step; v <= cy + half; v += step) gridY.push(Math.round(v / step) * step);

  const axisX = clamp(X(0), 0, SIZE);
  const axisY = clamp(Y(0), 0, SIZE);

  // Recta: se dibuja de borde a borde de la vista
  const xL = cx - half, xR = cx + half;
  const lineD = `M${X(xL)},${clamp(Y(m * xL + n), -5000, 5000)} L${X(xR)},${clamp(Y(m * xR + n), -5000, 5000)}`;

  const sgn = (v: number) => (v < 0 ? '-' : '+');
  const equation = `y = ${fmt(m)}x ${sgn(n)} ${fmt(Math.abs(n))}`;

  const kind =
    Math.abs(m) < 0.001
      ? 'Pendiente 0: recta horizontal, función constante.'
      : m > 0
      ? 'Pendiente positiva: la función es creciente.'
      : 'Pendiente negativa: la función es decreciente.';

  const reset = () => {
    setM(1);
    setN(0);
    resetView();
  };

  const sliders = [
    { label: 'm', value: m, set: setM, min: -10, max: 10, step: 0.1 },
    { label: 'n', value: n, set: setN, min: -10, max: 10, step: 0.5 },
  ];

  const btn =
    'w-9 h-9 flex items-center justify-center rounded-lg bg-white/90 hover:bg-white border border-slate-200 text-slate-700 shadow-sm transition';

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-sm">
          <div className="relative max-w-[560px] mx-auto">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="w-full h-auto cursor-grab active:cursor-grabbing select-none rounded-xl bg-white"
              style={{ touchAction: 'none' }}
              role="img"
              aria-label={`Gráfica de ${equation}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <defs>
                <clipPath id="plot-line">
                  <rect x="0" y="0" width={SIZE} height={SIZE} />
                </clipPath>
              </defs>

              <g clipPath="url(#plot-line)">
                {gridX.map((v) => (
                  <line key={`gx${v}`} x1={X(v)} y1={0} x2={X(v)} y2={SIZE} stroke="#e2e8f0" strokeWidth={1} />
                ))}
                {gridY.map((v) => (
                  <line key={`gy${v}`} x1={0} y1={Y(v)} x2={SIZE} y2={Y(v)} stroke="#e2e8f0" strokeWidth={1} />
                ))}

                <line x1={0} y1={Y(0)} x2={SIZE} y2={Y(0)} stroke="#475569" strokeWidth={1.5} />
                <line x1={X(0)} y1={0} x2={X(0)} y2={SIZE} stroke="#475569" strokeWidth={1.5} />

                {/* Triángulo de pendiente: avanza 1 en x y sube m */}
                <path
                  d={`M${X(0)},${Y(n)} L${X(1)},${Y(n)} L${X(1)},${Y(n + m)}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  strokeDasharray="5 4"
                />

                <path d={lineD} fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />

                {/* Corte con Y y con X */}
                <circle cx={X(0)} cy={Y(n)} r={6} fill="#0f172a" stroke="#fff" strokeWidth={2} />
                {root !== null && (
                  <circle cx={X(root)} cy={Y(0)} r={6} fill="#fff" stroke={ACCENT} strokeWidth={3} />
                )}

                {gridX.filter((v) => v !== 0).map((v) => (
                  <text key={`tx${v}`} x={X(v)} y={clamp(axisY + 14, 12, SIZE - 4)} textAnchor="middle" fontSize="11" fill="#64748b">
                    {fmt(v)}
                  </text>
                ))}
                {gridY.filter((v) => v !== 0).map((v) => (
                  <text key={`ty${v}`} x={clamp(axisX + 6, 4, SIZE - 30)} y={Y(v) + 4} fontSize="11" fill="#64748b">
                    {fmt(v)}
                  </text>
                ))}
              </g>
            </svg>

            <div className="absolute top-2 right-2 flex flex-col gap-1.5">
              <button type="button" onClick={() => zoomBy(0.7)} className={btn} aria-label="Acercar" title="Acercar">
                <Plus className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => zoomBy(1 / 0.7)} className={btn} aria-label="Alejar" title="Alejar">
                <Minus className="w-4 h-4" />
              </button>
              <button type="button" onClick={fit} className={btn} aria-label="Ajustar a la gráfica" title="Ajustar a la gráfica">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center mt-2">
            Arrastra para moverte · rueda o pellizco para el zoom ·{' '}
            <button type="button" onClick={fit} className="underline font-semibold">Ajustar</button> ·{' '}
            <button type="button" onClick={resetView} className="underline font-semibold">Vista inicial</button>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mt-2">
            <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-full bg-slate-900 inline-block" /> Corte con Y</span>
            <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-full border-2 inline-block" style={{ borderColor: ACCENT }} /> Corte con X</span>
            <span className="inline-flex items-center gap-1.5"><i className="w-4 border-t-2 border-dashed border-slate-400 inline-block" /> Pendiente</span>
          </div>
        </div>

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
              Restablecer todo
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-bold text-slate-900">Pendiente: </span>
              <MathText text={`$m = ${fmt(m)}$`} />
            </p>
            <p>
              <span className="font-bold text-slate-900">Corte con Y: </span>
              <MathText text={`$(0,\\ ${fmt(n)})$`} />
            </p>
            <p>
              <span className="font-bold text-slate-900">Corte con X: </span>
              {root !== null ? (
                <MathText text={`$(${fmt(root)},\\ 0)$`} />
              ) : (
                <span>{n === 0 ? 'toda la recta (coincide con el eje X)' : 'ninguno'}</span>
              )}
            </p>
            <p className="pt-1 font-semibold" style={{ color: ACCENT }}>{kind}</p>
          </div>
        </div>
      </div>

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