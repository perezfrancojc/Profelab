'use client';

import { useState } from 'react';
import { MathText } from '@/components/Math';
import { Plane, type Bounds, type PlaneCtx } from './shared/Plane';
import { ACCENT, BLUE, CARD, GuidedQuestions, Slider, Tabs, fmt } from './shared/ui';

type FKey = 'cuad' | 'sen' | 'exp' | 'par' | 'cub';
type Method = 'izq' | 'der' | 'med' | 'trap';

const F: Record<FKey, { label: string; tex: string; f: (x: number) => number; P: (x: number) => number }> = {
  cuad: { label: 'x²', tex: 'x^2', f: (x) => x * x, P: (x) => x ** 3 / 3 },
  sen: { label: 'sen x', tex: '\\sin x', f: Math.sin, P: (x) => -Math.cos(x) },
  exp: { label: 'eˣ', tex: 'e^x', f: Math.exp, P: Math.exp },
  par: { label: '4 − x²', tex: '4 - x^2', f: (x) => 4 - x * x, P: (x) => 4 * x - x ** 3 / 3 },
  cub: { label: 'x³ − 3x', tex: 'x^3 - 3x', f: (x) => x ** 3 - 3 * x, P: (x) => x ** 4 / 4 - 1.5 * x * x },
};

const METHODS: { id: Method; label: string }[] = [
  { id: 'izq', label: 'Izquierda' },
  { id: 'der', label: 'Derecha' },
  { id: 'med', label: 'Punto medio' },
  { id: 'trap', label: 'Trapecios' },
];

const QUESTIONS = [
  { q: 'Aumenta n poco a poco. ¿Qué le pasa a la suma y al error?', a: 'La suma se acerca a la integral exacta y el error disminuye. En el límite, cuando n → ∞, la suma de Riemann es la integral definida.' },
  { q: 'En x², compara "Izquierda" y "Derecha" con n = 10. ¿Cuál se queda corto y cuál se pasa?', a: 'Como x² crece en [0, 2], por la izquierda los rectángulos quedan por debajo (suma inferior) y por la derecha por encima (suma superior). La integral exacta está entre las dos.' },
  { q: '¿Qué método converge más rápido con la misma n?', a: 'Normalmente el punto medio y los trapecios: el error es mucho menor que en los métodos de extremos con los mismos rectángulos.' },
  { q: 'Elige sen x en [−3, 3]. ¿Por qué da una integral cercana a 0?', a: 'Porque el área positiva y la negativa se cancelan (seno es impar). La integral cuenta el área con signo: lo que queda por debajo del eje resta.' },
  { q: 'Elige x³ − 3x en [−2, 2]. ¿Qué dice el signo de los rectángulos?', a: 'Los de color azul quedan bajo el eje y restan; los naranjas suman. La integral es la diferencia entre ambos.' },
];

export default function RiemannSimulator() {
  const [fk, setFk] = useState<FKey>('cuad');
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [n, setN] = useState(8);
  const [method, setMethod] = useState<Method>('izq');
  const [fit, setFit] = useState(1);

  const fn = F[fk];

  const approx = (m: number) => {
    const w = (b - a) / m;
    let s = 0;
    for (let i = 0; i < m; i++) {
      const x0 = a + i * w, x1 = x0 + w;
      s += method === 'izq' ? fn.f(x0) * w : method === 'der' ? fn.f(x1) * w : method === 'med' ? fn.f((x0 + x1) / 2) * w : ((fn.f(x0) + fn.f(x1)) / 2) * w;
    }
    return s;
  };

  const exact = fn.P(b) - fn.P(a);
  const A = approx(n);
  const err = A - exact;
  const w = (b - a) / n;

  const ys: number[] = [0];
  for (let i = 0; i <= 80; i++) ys.push(fn.f(a + ((b - a) * i) / 80));
  const bounds: Bounds = { minX: a - 1, maxX: b + 1, minY: Math.min(...ys) - 1, maxY: Math.max(...ys) + 1 };

  const render = (ctx: PlaneCtx) => {
    let under = `M${ctx.X(a)},${ctx.Y(0)} `;
    for (let i = 0; i <= 120; i++) { const x = a + ((b - a) * i) / 120; under += `L${ctx.X(x)},${ctx.Y(fn.f(x))} `; }
    under += `L${ctx.X(b)},${ctx.Y(0)} Z`;

    let curve = '';
    const lo = ctx.cx - ctx.half, hi = ctx.cx + ctx.half;
    for (let i = 0; i <= 400; i++) { const x = lo + ((hi - lo) * i) / 400; curve += `${i ? 'L' : 'M'}${ctx.X(x)},${Math.max(-5000, Math.min(5000, ctx.Y(fn.f(x))))} `; }

    return (
      <>
        <path d={under} fill={BLUE} fillOpacity={0.1} />
        {Array.from({ length: n }, (_, i) => {
          const x0 = a + i * w, x1 = x0 + w;
          const hl = fn.f(x0), hr = fn.f(x1);
          const hh = method === 'izq' ? hl : method === 'der' ? hr : fn.f((x0 + x1) / 2);
          const col = (method === 'trap' ? (hl + hr) / 2 : hh) >= 0 ? ACCENT : BLUE;
          const stroke = n > 40 ? 'none' : col;
          return method === 'trap' ? (
            <polygon key={i} points={`${ctx.X(x0)},${ctx.Y(0)} ${ctx.X(x1)},${ctx.Y(0)} ${ctx.X(x1)},${ctx.Y(hr)} ${ctx.X(x0)},${ctx.Y(hl)}`} fill={col} fillOpacity={0.4} stroke={stroke} />
          ) : (
            <rect key={i} x={ctx.X(x0)} y={Math.min(ctx.Y(0), ctx.Y(hh))} width={Math.max(0.5, ctx.X(x1) - ctx.X(x0))} height={Math.abs(ctx.Y(hh) - ctx.Y(0))} fill={col} fillOpacity={0.4} stroke={stroke} />
          );
        })}
        <path d={curve} fill="none" stroke="#0f172a" strokeWidth={2.6} />
        <line x1={ctx.X(a)} y1={ctx.Y(0) - 8} x2={ctx.X(a)} y2={ctx.Y(0) + 8} stroke="#0f172a" strokeWidth={2.5} />
        <line x1={ctx.X(b)} y1={ctx.Y(0) - 8} x2={ctx.X(b)} y2={ctx.Y(0) + 8} stroke="#0f172a" strokeWidth={2.5} />
      </>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className={`${CARD} sm:p-4 self-start`}>
          <Plane render={render} bounds={bounds} fitSignal={fit} label="Suma de Riemann bajo una curva" />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mt-2">
            <span className="inline-flex items-center gap-1.5"><i className="w-3.5 h-3.5 rounded inline-block" style={{ background: ACCENT, opacity: 0.5 }} /> Suma positiva</span>
            <span className="inline-flex items-center gap-1.5"><i className="w-3.5 h-3.5 rounded inline-block" style={{ background: BLUE, opacity: 0.5 }} /> Bajo el eje (resta)</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`${CARD} space-y-4`}>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(F) as FKey[]).map((k) => (
                <button key={k} type="button" onClick={() => { setFk(k); setFit((x) => x + 1); }} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition ${fk === k ? 'text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} style={fk === k ? { backgroundColor: ACCENT } : undefined}>{F[k].label}</button>
              ))}
            </div>
            <Tabs value={method} onChange={setMethod} items={METHODS} />
            <Slider label="a" value={a} onChange={(v) => setA(Math.min(v, b - 0.25))} min={-5} max={5} step={0.25} />
            <Slider label="b" value={b} onChange={(v) => setB(Math.max(v, a + 0.25))} min={-5} max={5} step={0.25} />
            <Slider label="n" value={n} onChange={setN} min={1} max={200} step={1} />
            <button type="button" onClick={() => setFit((x) => x + 1)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2 rounded-xl transition">Centrar vista</button>
          </div>

          <div className={`${CARD} space-y-1.5 text-sm text-slate-700`}>
            <p><MathText text={`$\\int_{${fmt(a)}}^{${fmt(b)}} ${fn.tex}\\,dx = ${fmt(exact)}$`} /> <span className="text-xs text-slate-500">(exacta)</span></p>
            <p><span className="font-bold" style={{ color: ACCENT }}>Suma con n = {n}: </span>{fmt(A)}</p>
            <p><span className="font-bold text-slate-900">Error: </span>{fmt(err)} ({exact !== 0 ? `${fmt(Math.abs(err / exact) * 100)} %` : '—'})</p>
            <p className="text-xs text-slate-500">Ancho de cada rectángulo: <MathText text={`$\\Delta x = \\frac{b-a}{n} = ${fmt(w)}$`} /></p>
          </div>

          <div className={`${CARD} space-y-2`}>
            <p className="text-sm font-black text-slate-900">Convergencia ({METHODS.find((m) => m.id === method)?.label.toLowerCase()})</p>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500"><tr><th className="text-left font-bold px-2.5 py-1.5">n</th><th className="text-right font-bold px-2.5 py-1.5">Suma</th><th className="text-right font-bold px-2.5 py-1.5">Error</th></tr></thead>
                <tbody>
                  {[4, 10, 50, 200].map((m) => (
                    <tr key={m} className="border-t border-slate-100 tabular-nums"><td className="px-2.5 py-1">{m}</td><td className="px-2.5 py-1 text-right">{fmt(approx(m))}</td><td className="px-2.5 py-1 text-right">{fmt(approx(m) - exact)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS} />
    </div>
  );
}