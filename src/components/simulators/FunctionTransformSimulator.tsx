'use client';

import { useState } from 'react';
import { MathText } from '@/components/Math';
import { Plane, SIZE, type Bounds, type PlaneCtx } from './shared/Plane';
import { ACCENT, BLUE, CARD, GuidedQuestions, Slider, Tabs, fmt } from './shared/ui';

type GKey = 'cuad' | 'abs' | 'cubo' | 'raiz' | 'inv' | 'sen' | 'exp' | 'ln';
type Tab = 'tr' | 'inv';

const G: Record<GKey, { label: string; tex: (u: string) => string; f: (x: number) => number; ref: [number, number] }> = {
  cuad: { label: 'x²', tex: (u) => `(${u})^2`, f: (x) => x * x, ref: [0, 0] },
  abs: { label: '|x|', tex: (u) => `|${u}|`, f: Math.abs, ref: [0, 0] },
  cubo: { label: 'x³', tex: (u) => `(${u})^3`, f: (x) => x ** 3, ref: [0, 0] },
  raiz: { label: '√x', tex: (u) => `\\sqrt{${u}}`, f: (x) => (x >= 0 ? Math.sqrt(x) : NaN), ref: [0, 0] },
  inv: { label: '1/x', tex: (u) => `\\frac{1}{${u}}`, f: (x) => (x === 0 ? NaN : 1 / x), ref: [1, 1] },
  sen: { label: 'sen x', tex: (u) => `\\sin(${u})`, f: Math.sin, ref: [0, 0] },
  exp: { label: 'eˣ', tex: (u) => `e^{${u}}`, f: Math.exp, ref: [0, 1] },
  ln: { label: 'ln x', tex: (u) => `\\ln(${u})`, f: (x) => (x > 0 ? Math.log(x) : NaN), ref: [1, 0] },
};

const QUESTIONS: Record<Tab, { q: string; a: string }[]> = {
  tr: [
    { q: 'Mueve k con a = 1, b = 1 y h = 0. ¿Qué le pasa a la gráfica?', a: 'Sube o baja sin deformarse (traslación vertical). El punto de referencia se mueve con ella.' },
    { q: 'Mueve h. ¿Por qué un h positivo mueve la gráfica a la derecha, si en la fórmula resta?', a: 'Porque la función vale lo que valía g pero h unidades después: g(x − h) alcanza en x = h lo que g alcanza en 0.' },
    { q: 'Pon a = −1. ¿Qué transformación es?', a: 'Una simetría respecto al eje X: la gráfica se refleja hacia abajo.' },
    { q: 'Prueba b = 2 y b = 0,5. ¿Qué ocurre horizontalmente?', a: 'Con b = 2 la gráfica se comprime a la mitad en horizontal; con b = 0,5 se estira al doble. Si b es negativo, se refleja respecto al eje Y.' },
  ],
  inv: [
    { q: 'Mueve el punto P. ¿Qué relación hay entre P y su reflejo Q?', a: 'Tienen las coordenadas intercambiadas: P(x, bˣ) y Q(bˣ, x). Son simétricos respecto a la recta y = x.' },
    { q: '¿Por qué el logaritmo solo existe para x > 0?', a: 'Porque bˣ siempre es positivo: la exponencial nunca toma valores ≤ 0 y su inversa solo se define donde la otra toma valores.' },
    { q: 'Prueba bases menores y mayores que 1. ¿Cómo cambia el crecimiento?', a: 'Si b > 1 las dos funciones crecen; si 0 < b < 1 decrecen. Con b = 1 la exponencial es constante y no tiene inversa.' },
    { q: '¿Por dónde pasan siempre bˣ y log_b x?', a: 'La exponencial pasa por (0, 1) y el logaritmo por (1, 0), para cualquier base.' },
  ],
};

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
    d += prev === null || Math.abs(py - prev) > SIZE * 1.2 ? `M${px.toFixed(1)},${py.toFixed(1)} ` : `L${px.toFixed(1)},${py.toFixed(1)} `;
    prev = py;
  }
  return d;
}

const sg = (v: number) => (v < 0 ? '-' : '+');

export default function FunctionTransformSimulator() {
  const [tab, setTab] = useState<Tab>('tr');
  const [gk, setGk] = useState<GKey>('cuad');
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [h, setH] = useState(0);
  const [k, setK] = useState(0);
  const [base, setBase] = useState(2);
  const [x0, setX0] = useState(1);
  const [fit, setFit] = useState(1);

  const g = G[gk];
  const F = (x: number) => a * g.f(b * (x - h)) + k;

  const inner = b === 1 ? (h === 0 ? 'x' : `x ${sg(-h)} ${fmt(Math.abs(h))}`) : `${b === -1 ? '-' : fmt(b)}${h === 0 ? 'x' : `(x ${sg(-h)} ${fmt(Math.abs(h))})`}`;
  const aTxt = a === 1 ? '' : a === -1 ? '-' : fmt(a);
  const eq = `y = ${aTxt}${g.tex(inner)}${k === 0 ? '' : ` ${sg(k)} ${fmt(Math.abs(k))}`}`;
  const ref: [number, number] = [h + g.ref[0] / (b || 1), a * g.ref[1] + k];

  const bounds: Bounds = { minX: -6, maxX: 6, minY: -6, maxY: 6 };

  const renderTr = (ctx: PlaneCtx) => (
    <>
      <path d={curvePath(ctx, g.f)} fill="none" stroke="#94a3b8" strokeWidth={2.2} strokeDasharray="7 5" />
      <path d={curvePath(ctx, F)} fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
      <circle cx={ctx.X(g.ref[0])} cy={ctx.Y(g.ref[1])} r={5} fill="#fff" stroke="#94a3b8" strokeWidth={2.5} />
      {Number.isFinite(ref[0]) && Number.isFinite(ref[1]) && <circle cx={ctx.X(ref[0])} cy={ctx.Y(ref[1])} r={6.5} fill={ACCENT} stroke="#fff" strokeWidth={2} />}
    </>
  );

  /* Inversa */
  const isOne = Math.abs(base - 1) < 1e-9;
  const expF = (x: number) => Math.pow(base, x);
  const logF = (x: number) => (x > 0 && !isOne ? Math.log(x) / Math.log(base) : NaN);
  const px0 = expF(x0);

  const renderInv = (ctx: PlaneCtx) => (
    <>
      <line x1={ctx.X(ctx.cx - ctx.half * 2)} y1={ctx.Y(ctx.cx - ctx.half * 2)} x2={ctx.X(ctx.cx + ctx.half * 2)} y2={ctx.Y(ctx.cx + ctx.half * 2)} stroke="#94a3b8" strokeWidth={2} strokeDasharray="7 5" />
      <path d={curvePath(ctx, expF)} fill="none" stroke={ACCENT} strokeWidth={3} />
      {!isOne && <path d={curvePath(ctx, logF)} fill="none" stroke={BLUE} strokeWidth={3} />}
      {!isOne && Number.isFinite(px0) && (
        <>
          <line x1={ctx.X(x0)} y1={ctx.Y(px0)} x2={ctx.X(px0)} y2={ctx.Y(x0)} stroke="#0f172a" strokeDasharray="4 4" />
          <circle cx={ctx.X(x0)} cy={ctx.Y(px0)} r={6.5} fill={ACCENT} stroke="#fff" strokeWidth={2} />
          <circle cx={ctx.X(px0)} cy={ctx.Y(x0)} r={6.5} fill={BLUE} stroke="#fff" strokeWidth={2} />
        </>
      )}
    </>
  );

  return (
    <div className="space-y-8">
      <Tabs value={tab} onChange={(v) => { setTab(v); setFit((f) => f + 1); }} items={[{ id: 'tr', label: 'Transformaciones' }, { id: 'inv', label: 'Exponencial y logaritmo' }]} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className={`${CARD} sm:p-4 self-start`}>
          <Plane render={tab === 'tr' ? renderTr : renderInv} bounds={tab === 'tr' ? bounds : { minX: -4, maxX: 8, minY: -4, maxY: 8 }} fitSignal={fit} label={tab === 'tr' ? 'Función transformada' : 'Exponencial, logaritmo y la recta y = x'} />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mt-2">
            {tab === 'tr' ? (
              <>
                <span className="inline-flex items-center gap-1.5"><i className="w-4 border-t-2 border-dashed border-slate-400 inline-block" /> Función base g(x)</span>
                <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block" style={{ background: ACCENT }} /> Transformada f(x)</span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block" style={{ background: ACCENT }} /> bˣ</span>
                <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block" style={{ background: BLUE }} /> log_b x</span>
                <span className="inline-flex items-center gap-1.5"><i className="w-4 border-t-2 border-dashed border-slate-400 inline-block" /> y = x</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {tab === 'tr' ? (
            <>
              <div className={`${CARD} space-y-4`}>
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Función base</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.keys(G) as GKey[]).map((key) => (
                      <button key={key} type="button" onClick={() => { setGk(key); setFit((f) => f + 1); }} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition ${gk === key ? 'text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} style={gk === key ? { backgroundColor: ACCENT } : undefined}>
                        {G[key].label}
                      </button>
                    ))}
                  </div>
                </div>
                <Slider label="a" value={a} onChange={setA} min={-4} max={4} step={0.1} />
                <Slider label="b" value={b} onChange={setB} min={-4} max={4} step={0.1} />
                <Slider label="h" value={h} onChange={setH} min={-6} max={6} step={0.25} />
                <Slider label="k" value={k} onChange={setK} min={-6} max={6} step={0.25} />
                <button type="button" onClick={() => { setA(1); setB(1); setH(0); setK(0); }} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2.5 rounded-xl transition">Restablecer</button>
              </div>
              <div className={`${CARD} space-y-2 text-sm text-slate-700`}>
                <div className="overflow-x-auto text-base"><MathText text={`$${eq}$`} /></div>
                <p><MathText text="$a$" />: estira o comprime en vertical (y refleja si es negativo).</p>
                <p><MathText text="$b$" />: comprime o estira en horizontal (y refleja si es negativo).</p>
                <p><MathText text="$h$" />: desplaza a la derecha (+) o izquierda (−).</p>
                <p><MathText text="$k$" />: desplaza hacia arriba (+) o abajo (−).</p>
                <p className="pt-1 border-t border-slate-100 font-semibold" style={{ color: ACCENT }}>
                  Punto de referencia: ({g.ref[0]}, {g.ref[1]}) → ({fmt(ref[0])}, {fmt(ref[1])})
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={`${CARD} space-y-4`}>
                <div className="flex flex-wrap gap-1.5">
                  {[['2', 2], ['e', Math.E], ['10', 10], ['1/2', 0.5]].map(([lab, v]) => (
                    <button key={lab as string} type="button" onClick={() => setBase(v as number)} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition ${Math.abs(base - (v as number)) < 1e-9 ? 'text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} style={Math.abs(base - (v as number)) < 1e-9 ? { backgroundColor: ACCENT } : undefined}>
                      b = {lab}
                    </button>
                  ))}
                </div>
                <Slider label="b" value={Math.round(base * 100) / 100} onChange={setBase} min={0.2} max={5} step={0.05} />
                <Slider label="x_0" value={x0} onChange={setX0} min={-3} max={3} step={0.1} />
              </div>
              <div className={`${CARD} space-y-2 text-sm text-slate-700`}>
                {isOne ? <p className="font-bold" style={{ color: ACCENT }}>Con b = 1 la exponencial es constante (1ˣ = 1) y no tiene inversa.</p> : (
                  <>
                    <p><span className="font-bold" style={{ color: ACCENT }}>P: </span><MathText text={`$(${fmt(x0)},\\ ${fmt(px0)})$`} /> sobre <MathText text="$b^x$" /></p>
                    <p><span className="font-bold" style={{ color: BLUE }}>Q: </span><MathText text={`$(${fmt(px0)},\\ ${fmt(x0)})$`} /> sobre <MathText text="$\\log_b x$" /></p>
                    <p className="pt-1 border-t border-slate-100"><MathText text={`$\\log_{${fmt(base)}}(${fmt(px0)}) = ${fmt(x0)}$`} /></p>
                    <p className="text-xs text-slate-500">
                      {base > 1 ? 'Base mayor que 1: ambas funciones son crecientes.' : 'Base entre 0 y 1: ambas funciones son decrecientes.'} Asíntota de bˣ: y = 0. Asíntota de log: x = 0.
                    </p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS[tab]} />
    </div>
  );
}