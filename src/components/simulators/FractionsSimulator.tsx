'use client';

import { useState } from 'react';
import { MathText } from '@/components/Math';
import { ACCENT, BLUE, CARD, GuidedQuestions, Slider, Tabs, fmt } from './shared/ui';

type Tab = 'frac' | 'op' | 'pct';
type Op = 'add' | 'sub' | 'mul' | 'div';

const VIOLET = '#7c3aed';
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;
const fr = (n: number, d: number) => `\\frac{${n}}{${d}}`;
const simp = (n: number, d: number): [number, number] => {
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return [(s * n) / g, (s * d) / g];
};

function Bar({ n, d, color }: { n: number; d: number; color: string }) {
  const W = 400, h = 38, cw = W / d;
  return (
    <svg viewBox={`0 0 ${W} ${h}`} className="w-full h-auto" role="img" aria-label={`Barra con ${n} de ${d} partes`}>
      {Array.from({ length: d }, (_, i) => (
        <rect key={i} x={i * cw + 0.75} y={1} width={Math.max(1, cw - 1.5)} height={h - 2} rx={d > 30 ? 0 : 4} fill={i < n ? color : '#f1f5f9'} stroke={i < n ? color : '#cbd5e1'} />
      ))}
    </svg>
  );
}

function Pie({ n, d, color }: { n: number; d: number; color: string }) {
  const R = 70, C = 80;
  const pt = (a: number) => `${C + R * Math.cos(a)},${C + R * Math.sin(a)}`;
  return (
    <svg viewBox="0 0 160 160" className="w-full h-auto max-w-[180px] mx-auto" role="img" aria-label={`Tarta con ${n} de ${d} partes`}>
      {d === 1 ? (
        <circle cx={C} cy={C} r={R} fill={n >= 1 ? color : '#f1f5f9'} stroke="#94a3b8" />
      ) : (
        Array.from({ length: d }, (_, i) => {
          const a0 = -Math.PI / 2 + (2 * Math.PI * i) / d;
          const a1 = -Math.PI / 2 + (2 * Math.PI * (i + 1)) / d;
          return <path key={i} d={`M${C},${C} L${pt(a0)} A${R},${R} 0 0 1 ${pt(a1)} Z`} fill={i < n ? color : '#f1f5f9'} stroke="#fff" strokeWidth={2} />;
        })
      )}
    </svg>
  );
}

const Q: Record<Tab, { q: string; a: string }[]> = {
  frac: [
    { q: 'Pon 2/4 y sube k a 2, 3... ¿Qué cambia y qué no?', a: 'Cambia cuántas partes hay, pero la zona coloreada ocupa lo mismo: son fracciones equivalentes (mismo valor).' },
    { q: 'Pon 6/8. ¿Cuál es su fracción irreducible y cómo se obtiene?', a: 'Se divide numerador y denominador entre su m.c.d. (2): queda 3/4.' },
    { q: '¿Cuánto es 3/5 de 40? Compruébalo con la cantidad.', a: 'Se divide entre el denominador y se multiplica por el numerador: 40 ÷ 5 = 8 y 8 · 3 = 24.' },
  ],
  op: [
    { q: 'En 1/2 + 1/3, ¿por qué hay que pasar a denominador común?', a: 'Porque solo se pueden sumar partes del mismo tamaño. Con denominador 6 son 3/6 + 2/6 = 5/6.' },
    { q: 'En el producto, ¿qué representa la zona violeta?', a: 'Es la parte común: la fracción de una fracción. Sus cuadraditos entre el total dan (n₁·n₂)/(d₁·d₂).' },
    { q: 'Al dividir entre una fracción menor que 1, ¿el resultado crece o decrece?', a: 'Crece: dividir entre 1/2 es ver cuántas mitades caben, y caben el doble.' },
  ],
  pct: [
    { q: 'Sube un 20 % y baja un 20 %. ¿Recuperas el precio inicial?', a: 'No: queda un 4 % por debajo. Cada porcentaje se calcula sobre una cantidad distinta (la segunda ya es mayor).' },
    { q: '¿Qué bajada compensa una subida del 25 %?', a: 'Un 20 %. El porcentaje de bajada es p / (100 + p) · 100.' },
    { q: '¿Qué número multiplica al precio para aplicar un descuento del 30 %?', a: '0,70. Aplicar un descuento o un aumento es multiplicar por un solo factor: 1 − p/100 o 1 + p/100.' },
  ],
};

export default function FractionsSimulator() {
  const [tab, setTab] = useState<Tab>('frac');

  // Tab 1
  const [n, setN] = useState(3);
  const [d, setD] = useState(4);
  const [k, setK] = useState(2);
  const [qty, setQty] = useState(60);
  const g = gcd(n, d) || 1;
  const [sn, sd] = simp(n, d);

  // Tab 2
  const [n1, setN1] = useState(1);
  const [d1, setD1] = useState(2);
  const [n2, setN2] = useState(1);
  const [d2, setD2] = useState(3);
  const [op, setOp] = useState<Op>('add');

  // Tab 3
  const [price, setPrice] = useState(80);
  const [p, setP] = useState(20);
  const [mode, setMode] = useState<'dto' | 'aum'>('dto');

  /* ---- Operaciones ---- */
  const L = lcm(d1, d2);
  const x = (n1 * L) / d1, y = (n2 * L) / d2;
  let rn = 0, rd = 1, steps = '';
  if (op === 'add') { rn = x + y; rd = L; steps = `${fr(n1, d1)} + ${fr(n2, d2)} = ${fr(x, L)} + ${fr(y, L)} = ${fr(rn, rd)}`; }
  if (op === 'sub') { rn = x - y; rd = L; steps = `${fr(n1, d1)} - ${fr(n2, d2)} = ${fr(x, L)} - ${fr(y, L)} = ${fr(rn, rd)}`; }
  if (op === 'mul') { rn = n1 * n2; rd = d1 * d2; steps = `${fr(n1, d1)} \\cdot ${fr(n2, d2)} = ${fr(rn, rd)}`; }
  if (op === 'div') { rn = n1 * d2; rd = d1 * n2; steps = n2 === 0 ? '' : `${fr(n1, d1)} : ${fr(n2, d2)} = ${fr(n1, d1)} \\cdot ${fr(d2, n2)} = ${fr(rn, rd)}`; }
  const divZero = op === 'div' && n2 === 0;
  const [qn, qd] = divZero ? [0, 1] : simp(rn, rd);

  const cell = 220 / Math.max(d1, d2);

  /* ---- Porcentajes ---- */
  const amount = (price * p) / 100;
  const factor = mode === 'dto' ? 1 - p / 100 : 1 + p / 100;
  const final = price * factor;
  const upDown = price * (1 + p / 100) * (1 - p / 100);
  const comp = (100 * p) / (100 + p);
  const total = mode === 'dto' ? 100 : 100 + p;

  return (
    <div className="space-y-8">
      <Tabs value={tab} onChange={setTab} items={[{ id: 'frac', label: 'Fracciones' }, { id: 'op', label: 'Operaciones' }, { id: 'pct', label: 'Porcentajes' }]} />

      {tab === 'frac' && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className={`${CARD} space-y-4`}>
            <div className="grid sm:grid-cols-[180px_1fr] gap-4 items-center">
              <Pie n={n} d={d} color={ACCENT} />
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500">Fracción <MathText text={`$${fr(n, d)}$`} /></p>
                <Bar n={n} d={d} color={ACCENT} />
                <p className="text-xs font-bold text-slate-500">Equivalente <MathText text={`$${fr(n * k, d * k)}$`} /> (×{k})</p>
                <Bar n={n * k} d={d * k} color={BLUE} />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1">Fracción de la cantidad {qty}</p>
              <div className="rounded-xl overflow-hidden flex h-9 border border-slate-200">
                {Array.from({ length: d }, (_, i) => (
                  <div key={i} className="flex-1 flex items-center justify-center text-[11px] font-bold border-r border-white/70" style={{ background: i < n ? ACCENT : '#f1f5f9', color: i < n ? '#fff' : '#94a3b8' }}>
                    {d <= 12 ? fmt(qty / d) : ''}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`${CARD} space-y-4`}>
              <Slider label="d" value={d} onChange={(v) => { setD(v); setN((c) => Math.min(c, v)); }} min={1} max={12} step={1} />
              <Slider label="n" value={n} onChange={setN} min={0} max={d} step={1} />
              <Slider label="k" value={k} onChange={setK} min={1} max={6} step={1} />
              <Slider label="\text{Cantidad}" value={qty} onChange={setQty} min={10} max={200} step={5} />
            </div>
            <div className={`${CARD} space-y-1.5 text-sm text-slate-700`}>
              <p><MathText text={`$${fr(n, d)} = ${fr(n * k, d * k)}$`} /> (equivalentes)</p>
              <p><span className="font-bold text-slate-900">m.c.d.(n, d) = </span>{g}</p>
              <p><span className="font-bold text-slate-900">Irreducible: </span><MathText text={`$${fr(sn, sd)}$`} /></p>
              <p><span className="font-bold text-slate-900">Decimal: </span>{fmt(n / d)} · <span className="font-bold text-slate-900">Porcentaje: </span>{fmt((100 * n) / d)} %</p>
              <p className="pt-1 border-t border-slate-100 font-semibold" style={{ color: ACCENT }}>
                <MathText text={`$${fr(n, d)}\\ \\text{de}\\ ${qty} = (${qty} : ${d}) \\cdot ${n} = ${fmt(qty / d)} \\cdot ${n} = ${fmt((qty * n) / d)}$`} />
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === 'op' && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className={`${CARD} space-y-4`}>
            {(op === 'add' || op === 'sub') && (
              <>
                <p className="text-xs font-bold text-slate-500">Denominador común: m.c.m.({d1}, {d2}) = {L}</p>
                <div><p className="text-xs font-bold mb-1" style={{ color: ACCENT }}><MathText text={`$${fr(n1, d1)} = ${fr(x, L)}$`} /></p><Bar n={x} d={L} color={ACCENT} /></div>
                <div><p className="text-xs font-bold mb-1" style={{ color: BLUE }}><MathText text={`$${fr(n2, d2)} = ${fr(y, L)}$`} /></p><Bar n={y} d={L} color={BLUE} /></div>
                <div>
                  <p className="text-xs font-bold mb-1" style={{ color: VIOLET }}>Resultado <MathText text={`$${fr(rn, rd)}$`} /></p>
                  {rn >= 0 && rn <= L ? <Bar n={rn} d={L} color={VIOLET} /> : <p className="text-xs text-slate-500">{rn < 0 ? 'Resultado negativo.' : 'Resultado mayor que 1 entero.'}</p>}
                </div>
              </>
            )}
            {op === 'mul' && (
              <div>
                <svg viewBox="0 0 240 240" className="w-full h-auto max-w-[300px] mx-auto" role="img" aria-label="Modelo de área del producto de fracciones">
                  {Array.from({ length: d1 * d2 }, (_, i) => {
                    const c = i % d1, r = Math.floor(i / d1);
                    const inA = c < n1, inB = r < n2;
                    const fill = inA && inB ? VIOLET : inA ? ACCENT : inB ? BLUE : '#f1f5f9';
                    return <rect key={i} x={10 + c * cell} y={10 + r * cell} width={cell - 1} height={cell - 1} fill={fill} fillOpacity={inA && inB ? 0.95 : 0.45} stroke="#cbd5e1" />;
                  })}
                </svg>
                <p className="text-xs text-slate-500 text-center">Naranja: {n1}/{d1} · Azul: {n2}/{d2} · Violeta (común): {n1 * n2} de {d1 * d2} cuadraditos.</p>
              </div>
            )}
            {op === 'div' && (
              <>
                <div><p className="text-xs font-bold mb-1" style={{ color: ACCENT }}><MathText text={`$${fr(n1, d1)}$`} /></p><Bar n={n1} d={d1} color={ACCENT} /></div>
                <div><p className="text-xs font-bold mb-1" style={{ color: BLUE }}><MathText text={`$${fr(n2, d2)}$`} /></p><Bar n={n2} d={d2} color={BLUE} /></div>
                <p className="text-xs text-slate-500">Dividir es preguntar cuántas veces cabe la segunda fracción en la primera.</p>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className={`${CARD} space-y-3`}>
              <Tabs value={op} onChange={setOp} items={[{ id: 'add', label: '+' }, { id: 'sub', label: '−' }, { id: 'mul', label: '×' }, { id: 'div', label: '÷' }]} />
              <Slider label="n_1" value={n1} onChange={setN1} min={0} max={d1} step={1} color={ACCENT} />
              <Slider label="d_1" value={d1} onChange={(v) => { setD1(v); setN1((c) => Math.min(c, v)); }} min={1} max={12} step={1} color={ACCENT} />
              <Slider label="n_2" value={n2} onChange={setN2} min={0} max={d2} step={1} color={BLUE} />
              <Slider label="d_2" value={d2} onChange={(v) => { setD2(v); setN2((c) => Math.min(c, v)); }} min={1} max={12} step={1} color={BLUE} />
            </div>
            <div className={`${CARD} space-y-2 text-sm text-slate-700`}>
              {divZero ? <p className="font-bold" style={{ color: ACCENT }}>No se puede dividir entre 0.</p> : (
                <>
                  <div className="overflow-x-auto"><MathText text={`$${steps}$`} /></div>
                  <p className="font-semibold" style={{ color: ACCENT }}><MathText text={`$${fr(qn, qd)}$`} /> = {fmt(qn / qd)}</p>
                  <p className="text-xs text-slate-500">Fracción irreducible tras simplificar.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === 'pct' && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className={`${CARD} space-y-5`}>
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1">{mode === 'dto' ? 'Precio original = 100 %' : 'Precio original = 100 % y aumento'}</p>
              <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 text-sm font-bold text-white">
                <div className="flex items-center justify-center" style={{ width: `${(mode === 'dto' ? 100 - p : 100) / total * 100}%`, background: BLUE }}>{mode === 'dto' ? `${fmt(100 - p)} %` : '100 %'}</div>
                {p > 0 && <div className="flex items-center justify-center" style={{ width: `${(p / total) * 100}%`, background: ACCENT }}>{p} %</div>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500 font-bold">{mode === 'dto' ? 'Descuento' : 'Aumento'}</p><p className="text-2xl font-black" style={{ color: ACCENT }}>{fmt(amount)} €</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500 font-bold">Precio final</p><p className="text-2xl font-black" style={{ color: BLUE }}>{fmt(final)} €</p></div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 space-y-1 text-sm text-slate-700">
              <p className="font-black text-slate-900">¿Sube {p} % y luego baja {p} %?</p>
              <MathText text={`$${price} \\cdot ${fmt(1 + p / 100)} \\cdot ${fmt(1 - p / 100)} = ${fmt(upDown)}\\ €$`} />
              <p className="font-semibold" style={{ color: ACCENT }}>{upDown === price ? 'Vuelves al precio inicial.' : `Acabas ${fmt(price - upDown)} € por debajo.`}</p>
              <p className="text-xs text-slate-500">Para compensar una subida del {p} % hace falta bajar un {fmt(comp)} %.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`${CARD} space-y-4`}>
              <Tabs value={mode} onChange={setMode} items={[{ id: 'dto', label: 'Descuento' }, { id: 'aum', label: 'Aumento' }]} />
              <Slider label="\text{Precio}" value={price} onChange={setPrice} min={10} max={500} step={5} unit="€" />
              <Slider label="p" value={p} onChange={setP} min={0} max={100} step={1} unit="%" />
            </div>
            <div className={`${CARD} space-y-1.5 text-sm text-slate-700`}>
              <p><span className="font-bold text-slate-900">Método 1: </span><MathText text={`$${price} \\cdot \\frac{${p}}{100} = ${fmt(amount)}$`} /></p>
              <p><span className="font-bold text-slate-900">Método 2 (factor): </span><MathText text={`$${price} \\cdot ${fmt(factor)} = ${fmt(final)}$`} /></p>
              <p className="text-xs text-slate-500">El factor es {mode === 'dto' ? '1 − p/100' : '1 + p/100'}: un único producto.</p>
            </div>
          </div>
        </div>
      )}

      <GuidedQuestions items={Q[tab]} />
    </div>
  );
}