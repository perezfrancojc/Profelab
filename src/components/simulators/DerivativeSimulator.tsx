'use client';

import { useState } from 'react';
import { MathText } from '@/components/Math';
import { Plane, SIZE, type Bounds, type PlaneCtx } from './shared/Plane';
import { ACCENT, BLUE, CARD, GuidedQuestions, Slider, Tabs, fmt } from './shared/ui';

type FKey = 'cuad' | 'cubica' | 'sen' | 'exp' | 'abs' | 'inv';
type Tab = 'tan' | 'der';

const VIOLET = '#7c3aed';
const INK = '#0f172a';

const FUNCS: Record<FKey, { label: string; tex: string; dtex: string; f: (x: number) => number; d: (x: number) => number }> = {
  cuad: { label: 'x²', tex: 'x^2', dtex: '2x', f: (x) => x * x, d: (x) => 2 * x },
  cubica: { label: 'x³ − 3x', tex: 'x^3 - 3x', dtex: '3x^2 - 3', f: (x) => x ** 3 - 3 * x, d: (x) => 3 * x * x - 3 },
  sen: { label: 'sen x', tex: '\\sin x', dtex: '\\cos x', f: Math.sin, d: Math.cos },
  exp: { label: 'eˣ', tex: 'e^x', dtex: 'e^x', f: Math.exp, d: Math.exp },
  abs: { label: '|x|', tex: '|x|', dtex: '\\operatorname{sgn}(x)', f: Math.abs, d: (x) => (x > 0 ? 1 : x < 0 ? -1 : NaN) },
  inv: { label: '1/x', tex: '\\frac{1}{x}', dtex: '-\\frac{1}{x^2}', f: (x) => 1 / x, d: (x) => -1 / (x * x) },
};

const f3 = (n: number) => (Number.isFinite(n) ? String(Math.round(n * 1000) / 1000) : '—');

const QUESTIONS = [
  { q: 'Con f(x) = x², pon a = 0. ¿Cuánto vale la pendiente y qué significa?', a: 'Vale 0: la tangente es horizontal. Es el mínimo de la parábola, donde la función deja de bajar y empieza a subir.' },
  { q: 'En x³ − 3x, ¿en qué valores de a la tangente es horizontal?', a: 'En a = −1 y a = 1, donde f′(a) = 0. Son un máximo local y un mínimo local.' },
  { q: 'Acerca h a 0 y observa la secante. ¿Qué le ocurre a su pendiente?', a: 'Se acerca a la de la tangente: la derivada es el límite de la pendiente de la secante cuando h tiende a 0.' },
  { q: 'Elige |x| y pon a = 0. Mira la tabla de la derecha y de la izquierda. ¿Existe f′(0)?', a: 'No: por la derecha las pendientes tienden a 1 y por la izquierda a −1. Al no coincidir los límites laterales, hay un pico y no se puede trazar una única tangente.' },
  { q: 'Elige eˣ. Compara el valor de f(a) y de f′(a) en cualquier punto.', a: 'Son iguales: la derivada de eˣ es eˣ, así que la pendiente coincide con la altura.' },
  { q: 'En la pestaña de f′, ¿qué pasa con f′ cuando f es creciente? ¿Y cuando es decreciente?', a: 'Si f crece, f′ es positiva (está por encima del eje). Si f decrece, f′ es negativa. Donde f′ corta el eje, f tiene tangente horizontal.' },
];

function curvePath(ctx: PlaneCtx, fn: (x: number) => number) {
  let d = '';
  let prev: number | null = null;
  const N = 500;
  for (let i = 0; i <= N; i++) {
    const x = ctx.cx - ctx.half + (i * 2 * ctx.half) / N;
    const y = fn(x);
    if (!Number.isFinite(y)) { prev = null; continue; }
    const py = Math.max(-5000, Math.min(5000, ctx.Y(y)));
    const px = ctx.X(x);
    if (prev === null || Math.abs(py - prev) > SIZE * 1.2) d += `M${px.toFixed(1)},${py.toFixed(1)} `;
    else d += `L${px.toFixed(1)},${py.toFixed(1)} `;
    prev = py;
  }
  return d;
}

function lineAt(ctx: PlaneCtx, m: number, x0: number, y0: number) {
  const xL = ctx.cx - ctx.half * 2, xR = ctx.cx + ctx.half * 2;
  return { x1: ctx.X(xL), y1: ctx.Y(y0 + m * (xL - x0)), x2: ctx.X(xR), y2: ctx.Y(y0 + m * (xR - x0)) };
}

export default function DerivativeSimulator() {
  const [tab, setTab] = useState<Tab>('tan');
  const [fk, setFk] = useState<FKey>('cuad');
  const [a, setA] = useState(1);
  const [h, setH] = useState(1);
  const [fit, setFit] = useState(1);

  const F = FUNCS[fk];
  const fa = F.f(a);
  const defined = Number.isFinite(fa);
  const m = F.d(a);
  const hasM = Number.isFinite(m);

  const fh = F.f(a + h);
  const ms = defined && Math.abs(h) > 1e-9 && Number.isFinite(fh) ? (fh - fa) / h : null;

  const eps = 1e-4;
  const right = defined ? (F.f(a + eps) - fa) / eps : NaN;
  const left = defined ? (fa - F.f(a - eps)) / eps : NaN;
  const notDiff = defined && Number.isFinite(right) && Number.isFinite(left) && Math.abs(right - left) > 0.05;

  const bounds: Bounds = {
    minX: a - 4, maxX: a + 4,
    minY: (defined ? Math.max(-30, Math.min(30, fa)) : 0) - 4,
    maxY: (defined ? Math.max(-30, Math.min(30, fa)) : 0) + 4,
  };

  const choose = (k: FKey) => { setFk(k); setFit((x) => x + 1); };

  const renderTan = (ctx: PlaneCtx) => (
    <>
      <path d={curvePath(ctx, F.f)} fill="none" stroke={INK} strokeWidth={2.8} strokeLinecap="round" />
      {defined && hasM && !notDiff && (
        <line {...lineAt(ctx, m, a, fa)} stroke={ACCENT} strokeWidth={3} />
      )}
      {defined && ms !== null && (
        <>
          <line {...lineAt(ctx, ms, a, fa)} stroke={VIOLET} strokeWidth={2.2} strokeDasharray="8 5" />
          <circle cx={ctx.X(a + h)} cy={ctx.Y(fh)} r={6} fill="#fff" stroke={VIOLET} strokeWidth={3} />
        </>
      )}
      {defined && <circle cx={ctx.X(a)} cy={ctx.Y(fa)} r={7} fill={INK} stroke="#fff" strokeWidth={2} />}
    </>
  );

  const renderDer = (ctx: PlaneCtx) => {
    const dv = F.d(a);
    return (
      <>
        <path d={curvePath(ctx, F.f)} fill="none" stroke={INK} strokeWidth={2.8} />
        <path d={curvePath(ctx, F.d)} fill="none" stroke={BLUE} strokeWidth={2.8} />
        <line x1={ctx.X(a)} y1={0} x2={ctx.X(a)} y2={SIZE} stroke="#94a3b8" strokeDasharray="5 5" />
        {defined && <circle cx={ctx.X(a)} cy={ctx.Y(fa)} r={7} fill={INK} stroke="#fff" strokeWidth={2} />}
        {Number.isFinite(dv) && <circle cx={ctx.X(a)} cy={ctx.Y(dv)} r={7} fill={BLUE} stroke="#fff" strokeWidth={2} />}
      </>
    );
  };

  const eqTan = hasM && defined
    ? `y - ${fmt(fa)} = ${fmt(m)}\\,(x ${a < 0 ? '+' : '-'} ${fmt(Math.abs(a))})`
    : '';
  const nInt = hasM && defined ? fa - m * a : 0;
  const eqExpl = hasM && defined ? `y = ${fmt(m)}x ${nInt < 0 ? '-' : '+'} ${fmt(Math.abs(nInt))}` : '';

  const trend = !hasM ? '' : Math.abs(m) < 0.02 ? 'Tangente horizontal: posible máximo o mínimo.' : m > 0 ? 'f′ > 0: la función es creciente en este punto.' : 'f′ < 0: la función es decreciente en este punto.';

  const HS = [2, 1, 0.5, 0.1, 0.01];
  const rows = [1, 0.5, 0.1, 0.01, 0.001];

  return (
    <div className="space-y-8">
      <Tabs value={tab} onChange={setTab} items={[{ id: 'tan', label: 'Tangente y secante' }, { id: 'der', label: 'Gráfica de f′' }]} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className={`${CARD} sm:p-4 self-start`}>
          <Plane
            render={tab === 'tan' ? renderTan : renderDer}
            bounds={bounds}
            fitSignal={fit}
            label={tab === 'tan' ? 'Función con su recta tangente y su secante' : 'Función y su derivada'}
          />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mt-2">
            <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block" style={{ background: INK }} /> f(x)</span>
            {tab === 'tan' ? (
              <>
                <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block" style={{ background: ACCENT }} /> Tangente</span>
                <span className="inline-flex items-center gap-1.5"><i className="w-4 border-t-2 border-dashed inline-block" style={{ borderColor: VIOLET }} /> Secante</span>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block" style={{ background: BLUE }} /> f′(x)</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className={`${CARD} space-y-4`}>
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1.5">Función</p>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(FUNCS) as FKey[]).map((k) => (
                  <button key={k} type="button" onClick={() => choose(k)} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition ${fk === k ? 'text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} style={fk === k ? { backgroundColor: ACCENT } : undefined}>
                    {FUNCS[k].label}
                  </button>
                ))}
              </div>
            </div>

            <Slider label="a" value={Math.max(-5, Math.min(5, a))} onChange={(v) => setA(Math.round(v * 100) / 100)} min={-5} max={5} step={0.05} />
            <div className="flex items-center gap-2">
              <label htmlFor="der-a" className="text-xs font-bold text-slate-600">a exacto:</label>
              <input id="der-a" type="number" step="0.05" value={a} onChange={(e) => { const v = parseFloat(e.target.value); if (Number.isFinite(v)) setA(Math.max(-50, Math.min(50, v))); }} className="w-24 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm font-semibold" />
              <button type="button" onClick={() => setFit((x) => x + 1)} className="ml-auto text-xs font-bold underline text-slate-600">Centrar vista</button>
            </div>

            {tab === 'tan' && (
              <>
                <Slider label="h" value={h} onChange={setH} min={-3} max={3} step={0.05} />
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Acerca h a 0</p>
                  <div className="flex flex-wrap gap-1.5">
                    {HS.map((x) => (
                      <button key={x} type="button" onClick={() => setH(x)} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition">h = {x}</button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={`${CARD} space-y-2 text-sm text-slate-700`}>
            <p><MathText text={`$f(x) = ${F.tex}$`} /> · <MathText text={`$f'(x) = ${F.dtex}$`} /></p>

            {!defined && <p className="font-bold" style={{ color: ACCENT }}>f no está definida en x = {fmt(a)}.</p>}

            {defined && (
              <>
                <p><MathText text={`$f(${fmt(a)}) = ${f3(fa)}$`} /></p>
                {hasM && !notDiff && <p><MathText text={`$f'(${fmt(a)}) = ${f3(m)}$`} /></p>}
                {notDiff && <p className="font-bold" style={{ color: ACCENT }}>No existe f′({fmt(a)}): los límites laterales no coinciden ({f3(left)} y {f3(right)}).</p>}
              </>
            )}

            {tab === 'tan' && defined && hasM && !notDiff && (
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <p className="font-bold text-slate-900">Recta tangente</p>
                <div className="overflow-x-auto"><MathText text={`$${eqTan}$`} /></div>
                <div className="overflow-x-auto"><MathText text={`$${eqExpl}$`} /></div>
              </div>
            )}

            {tab === 'tan' && defined && ms !== null && (
              <p className="pt-2 border-t border-slate-100">
                <span className="font-bold" style={{ color: VIOLET }}>Pendiente de la secante: </span>
                <MathText text={`$\\frac{f(a+h)-f(a)}{h} = ${f3(ms)}$`} />
              </p>
            )}

            {tab === 'der' && trend && <p className="font-semibold" style={{ color: ACCENT }}>{trend}</p>}
          </div>

          {tab === 'tan' && defined && (
            <div className={`${CARD} space-y-2`}>
              <p className="text-sm font-black text-slate-900">Pendiente de la secante cuando h → 0</p>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left font-bold px-2.5 py-1.5">h</th>
                      <th className="text-right font-bold px-2.5 py-1.5">por la izquierda (−h)</th>
                      <th className="text-right font-bold px-2.5 py-1.5">por la derecha (+h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((hh) => (
                      <tr key={hh} className="border-t border-slate-100 tabular-nums">
                        <td className="px-2.5 py-1">{hh}</td>
                        <td className="px-2.5 py-1 text-right">{f3((fa - F.f(a - hh)) / hh)}</td>
                        <td className="px-2.5 py-1 text-right">{f3((F.f(a + hh) - fa) / hh)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500">Si las dos columnas se acercan al mismo valor, ese valor es f′(a).</p>
            </div>
          )}
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS} />
    </div>
  );
}