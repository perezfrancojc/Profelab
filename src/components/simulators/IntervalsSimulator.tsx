'use client';

import { useState } from 'react';
import { MathText } from '@/components/Math';
import { ACCENT, BLUE, CARD, GuidedQuestions, Slider, fmt } from './shared/ui';

type Iv = { lo: number; hi: number; lc: boolean; hc: boolean };
type Row = { lo: string; hi: string; lc: boolean; hc: boolean; loInf: boolean; hiInf: boolean };

const GREEN = '#16a34a', VIOLET = '#7c3aed';
const COLORS = [ACCENT, BLUE, GREEN];
const NAMES = ['A', 'B', 'C'];

/* ---------- Álgebra de intervalos ---------- */
const isEmpty = (i: Iv) => i.lo > i.hi || (i.lo === i.hi && !(i.lc && i.hc));

function normalize(list: Iv[]): Iv[] {
  const s = list.filter((i) => !isEmpty(i)).sort((a, b) => a.lo - b.lo || (a.lc ? 0 : 1) - (b.lc ? 0 : 1));
  const out: Iv[] = [];
  for (const i of s) {
    const last = out[out.length - 1];
    if (last && (i.lo < last.hi || (i.lo === last.hi && (last.hc || i.lc)))) {
      if (i.hi > last.hi) { last.hi = i.hi; last.hc = i.hc; }
      else if (i.hi === last.hi) last.hc = last.hc || i.hc;
    } else out.push({ ...i });
  }
  return out;
}

function inter(a: Iv, b: Iv): Iv {
  let lo: number, lc: boolean, hi: number, hc: boolean;
  if (a.lo > b.lo) { lo = a.lo; lc = a.lc; } else if (b.lo > a.lo) { lo = b.lo; lc = b.lc; } else { lo = a.lo; lc = a.lc && b.lc; }
  if (a.hi < b.hi) { hi = a.hi; hc = a.hc; } else if (b.hi < a.hi) { hi = b.hi; hc = b.hc; } else { hi = a.hi; hc = a.hc && b.hc; }
  return { lo, hi, lc, hc };
}

const And = (A: Iv[], B: Iv[]) => normalize(A.flatMap((a) => B.map((b) => inter(a, b))));
const Or = (A: Iv[], B: Iv[]) => normalize([...A, ...B]);

function Not(A: Iv[]): Iv[] {
  const s = normalize(A);
  const out: Iv[] = [];
  let lo = -Infinity, lc = false;
  for (const i of s) {
    out.push({ lo, lc, hi: i.lo, hc: !i.lc });
    lo = i.hi;
    lc = !i.hc;
  }
  out.push({ lo, lc, hi: Infinity, hc: false });
  return normalize(out);
}

const EXPRS: { id: string; label: string; tex: string; uses: number[]; run: (S: Iv[][]) => Iv[] }[] = [
  { id: 'u', label: 'A ∪ B', tex: 'A \\cup B', uses: [0, 1], run: ([A, B]) => Or(A, B) },
  { id: 'i', label: 'A ∩ B', tex: 'A \\cap B', uses: [0, 1], run: ([A, B]) => And(A, B) },
  { id: 'd', label: 'A − B', tex: 'A \\setminus B', uses: [0, 1], run: ([A, B]) => And(A, Not(B)) },
  { id: 'd2', label: 'B − A', tex: 'B \\setminus A', uses: [0, 1], run: ([A, B]) => And(B, Not(A)) },
  { id: 'c', label: 'Aᶜ', tex: 'A^{c}', uses: [0], run: ([A]) => Not(A) },
  { id: 'u3', label: 'A ∪ B ∪ C', tex: 'A \\cup B \\cup C', uses: [0, 1, 2], run: ([A, B, C]) => Or(Or(A, B), C) },
  { id: 'i3', label: 'A ∩ B ∩ C', tex: 'A \\cap B \\cap C', uses: [0, 1, 2], run: ([A, B, C]) => And(And(A, B), C) },
  { id: 'm1', label: '(A ∪ B) ∩ C', tex: '(A \\cup B) \\cap C', uses: [0, 1, 2], run: ([A, B, C]) => And(Or(A, B), C) },
  { id: 'm2', label: 'A ∪ (B ∩ C)', tex: 'A \\cup (B \\cap C)', uses: [0, 1, 2], run: ([A, B, C]) => Or(A, And(B, C)) },
];

/* ---------- Notación ---------- */
const num = (x: number) => (x === Infinity ? '+\\infty' : x === -Infinity ? '-\\infty' : fmt(x));
const ivTex = (i: Iv) => (i.lo === i.hi ? `\\{${num(i.lo)}\\}` : `${i.lc ? '[' : '('}${num(i.lo)},\\ ${num(i.hi)}${i.hc ? ']' : ')'}`);
const setTex = (l: Iv[]) => (l.length ? l.map(ivTex).join(' \\cup ') : '\\varnothing');
const ineqTex = (i: Iv) => {
  if (i.lo === -Infinity && i.hi === Infinity) return '\\mathbb{R}';
  if (i.lo === i.hi) return `x = ${num(i.lo)}`;
  if (i.lo === -Infinity) return `x ${i.hc ? '\\leq' : '<'} ${num(i.hi)}`;
  if (i.hi === Infinity) return `x ${i.lc ? '\\geq' : '>'} ${num(i.lo)}`;
  return `${num(i.lo)} ${i.lc ? '\\leq' : '<'} x ${i.hc ? '\\leq' : '<'} ${num(i.hi)}`;
};
const has = (l: Iv[], x: number) => l.some((i) => (x > i.lo || (x === i.lo && i.lc)) && (x < i.hi || (x === i.hi && i.hc)));

/* ---------- Estado ---------- */
const toNum = (s: string) => { const v = parseFloat(s); return Number.isFinite(v) ? v : 0; };
const toIv = (r: Row): Iv => ({
  lo: r.loInf ? -Infinity : toNum(r.lo),
  hi: r.hiInf ? Infinity : toNum(r.hi),
  lc: r.loInf ? false : r.lc,
  hc: r.hiInf ? false : r.hc,
});
const mk = (lo: number | null, hi: number | null, lc = true, hc = true): Row => ({
  lo: String(lo ?? 0), hi: String(hi ?? 0), lc, hc, loInf: lo === null, hiInf: hi === null,
});

const PRESETS: { label: string; rows: Row[]; expr: string }[] = [
  { label: 'Unión con solape', rows: [mk(-3, 2, true, false), mk(0, 5, false, true), mk(1, null)], expr: 'u' },
  { label: 'Intersección vacía', rows: [mk(-4, -1, true, true), mk(-1, 3, false, true), mk(0, 6)], expr: 'i' },
  { label: 'Dos semirrectas', rows: [mk(null, -1, true, true), mk(2, null, true, true), mk(0, 1)], expr: 'u' },
  { label: 'Complementario', rows: [mk(-2, 3, true, false), mk(0, 5), mk(1, 6)], expr: 'c' },
  { label: 'Tres intervalos', rows: [mk(-5, 1, true, false), mk(-2, 4, false, true), mk(0, 6)], expr: 'm1' },
];

const QUESTIONS = [
  { q: 'Carga "Intersección vacía". ¿Por qué A ∩ B no tiene elementos si comparten el extremo −1?', a: 'Porque A incluye el −1 pero B lo deja fuera (paréntesis). Para estar en la intersección, un punto debe pertenecer a los dos conjuntos.' },
  { q: 'Cambia un corchete por un paréntesis en un extremo común y observa la unión. ¿Qué cambia?', a: 'Si al menos uno de los dos incluye el punto, la unión es continua; si ninguno lo incluye, queda un hueco (un punto excluido).' },
  { q: 'Calcula Aᶜ para A = [−2, 3). ¿Qué ocurre con los corchetes?', a: 'Se invierten: el complementario es (−∞, −2) ∪ [3, +∞). Lo que A incluye, Aᶜ lo excluye, y viceversa.' },
  { q: '¿Por qué el infinito siempre va con paréntesis?', a: 'Porque +∞ y −∞ no son números reales: no se pueden alcanzar, así que nunca pertenecen al intervalo.' },
  { q: 'Mueve el punto de prueba. ¿Cuándo pertenece al resultado?', a: 'Cuando cumple la condición de la operación: en una unión, basta con estar en alguno; en una intersección, en todos los conjuntos a la vez.' },
  { q: 'Con "(A ∪ B) ∩ C", ¿en qué orden se hacen las operaciones?', a: 'Primero lo que va entre paréntesis (la unión) y luego la intersección con C. Cambiar el orden puede cambiar el resultado.' },
];

function niceStep(span: number) {
  const raw = span / 8;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / pow;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * pow;
}

const toggle = 'px-2 py-1 rounded-md text-xs font-bold border transition';

export default function IntervalsSimulator() {
  const [rows, setRows] = useState<Row[]>(PRESETS[0].rows);
  const [exprId, setExprId] = useState('u');
  const [tx, setTx] = useState(1);

  const patch = (i: number, p: Partial<Row>) => setRows((rs) => rs.map((r, k) => (k === i ? { ...r, ...p } : r)));

  const E = EXPRS.find((e) => e.id === exprId)!;
  const sets = rows.map((r) => normalize([toIv(r)]));
  const result = E.run(sets);

  // Rango visible
  const finite: number[] = [tx];
  [...sets.flat(), ...result].forEach((i) => { if (Number.isFinite(i.lo)) finite.push(i.lo); if (Number.isFinite(i.hi)) finite.push(i.hi); });
  let lo = Math.min(...finite) - 2, hi = Math.max(...finite) + 2;
  if (hi - lo < 10) { const mid = (hi + lo) / 2; lo = mid - 5; hi = mid + 5; }

  const W = 640, RH = 56, TOP = 14, H = TOP + RH * 4 + 36;
  const L = 44, R = 22;
  const xs = (v: number) => L + ((v - lo) / (hi - lo)) * (W - L - R);
  const step = niceStep(hi - lo);
  const ticks: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) ticks.push(Math.round(v / step) * step);

  const drawRow = (list: Iv[], y: number, color: string, dim = false) => (
    <g opacity={dim ? 0.3 : 1}>
      {list.map((i, k) => {
        const x1 = i.lo === -Infinity ? L - 8 : xs(i.lo);
        const x2 = i.hi === Infinity ? W - R + 8 : xs(i.hi);
        return (
          <g key={k}>
            {i.lo !== i.hi && <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={8} strokeLinecap="butt" opacity={0.85} />}
            {i.lo === -Infinity && <polygon points={`${L - 18},${y} ${L - 6},${y - 8} ${L - 6},${y + 8}`} fill={color} />}
            {i.hi === Infinity && <polygon points={`${W - R + 18},${y} ${W - R + 6},${y - 8} ${W - R + 6},${y + 8}`} fill={color} />}
            {i.lo !== -Infinity && <circle cx={xs(i.lo)} cy={y} r={7} fill={i.lc ? color : '#fff'} stroke={color} strokeWidth={3} />}
            {i.hi !== Infinity && i.hi !== i.lo && <circle cx={xs(i.hi)} cy={y} r={7} fill={i.hc ? color : '#fff'} stroke={color} strokeWidth={3} />}
          </g>
        );
      })}
    </g>
  );

  const inEmptyNote = (k: number) => rows[k] && isEmpty(toIv(rows[k]));

  const resultTex = setTex(result);
  const resultIneq = result.length ? result.map(ineqTex).join('\\ \\text{ o }\\ ') : '\\varnothing';
  const builder = !result.length ? '\\varnothing' : result.length === 1 && ineqTex(result[0]) === '\\mathbb{R}' ? '\\mathbb{R}' : `\\{x \\in \\mathbb{R} \\mid ${resultIneq}\\}`;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-6">
          <div className={`${CARD} sm:p-4`}>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label="Intervalos en la recta real y resultado de la operación">
              {ticks.map((v) => (
                <g key={v}>
                  <line x1={xs(v)} y1={TOP} x2={xs(v)} y2={H - 28} stroke="#e2e8f0" />
                  <text x={xs(v)} y={H - 10} textAnchor="middle" fontSize="11" fill="#64748b">{fmt(v)}</text>
                </g>
              ))}
              <line x1={L - 20} y1={H - 28} x2={W - R + 20} y2={H - 28} stroke="#475569" strokeWidth={1.5} />

              {[0, 1, 2].map((k) => {
                const y = TOP + RH * k + RH / 2;
                const dim = !E.uses.includes(k);
                return (
                  <g key={k}>
                    <text x={6} y={y + 5} fontSize="15" fontWeight="800" fill={COLORS[k]} opacity={dim ? 0.35 : 1}>{NAMES[k]}</text>
                    {drawRow(sets[k], y, COLORS[k], dim)}
                  </g>
                );
              })}

              <line x1={L - 20} y1={TOP + RH * 3 + 2} x2={W - R + 20} y2={TOP + RH * 3 + 2} stroke="#cbd5e1" strokeDasharray="4 4" />
              <text x={6} y={TOP + RH * 3 + RH / 2 + 5} fontSize="12" fontWeight="800" fill={VIOLET}>Res.</text>
              {drawRow(result, TOP + RH * 3 + RH / 2, VIOLET)}
              {!result.length && <text x={W / 2} y={TOP + RH * 3 + RH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={VIOLET}>∅ (vacío)</text>}

              {/* Punto de prueba */}
              <line x1={xs(tx)} y1={TOP - 4} x2={xs(tx)} y2={H - 28} stroke="#0f172a" strokeWidth={1.5} strokeDasharray="5 4" />
              <polygon points={`${xs(tx)},${H - 28} ${xs(tx) - 6},${H - 18} ${xs(tx) + 6},${H - 18}`} fill="#0f172a" />
            </svg>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mt-1">
              <span className="inline-flex items-center gap-1.5"><i className="w-3.5 h-3.5 rounded-full inline-block bg-slate-700" /> Extremo incluido [ ]</span>
              <span className="inline-flex items-center gap-1.5"><i className="w-3.5 h-3.5 rounded-full inline-block border-[3px] border-slate-700 bg-white" /> Extremo excluido ( )</span>
              <span className="inline-flex items-center gap-1.5">▸ Infinito</span>
            </div>
          </div>

          <div className={`${CARD} space-y-3 text-sm text-slate-700`}>
            <p className="text-sm font-black text-slate-900">Resultado de <MathText text={`$${E.tex}$`} /></p>
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-slate-500">Notación de intervalo</p>
              <div className="overflow-x-auto text-base"><MathText text={`$${resultTex}$`} /></div>
              <p className="text-xs font-bold text-slate-500 pt-1">Desigualdades</p>
              <div className="overflow-x-auto"><MathText text={`$${resultIneq}$`} /></div>
              <p className="text-xs font-bold text-slate-500 pt-1">Conjunto</p>
              <div className="overflow-x-auto"><MathText text={`$${builder}$`} /></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`${CARD} space-y-4`}>
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1.5">Ejemplos</p>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button key={p.label} type="button" onClick={() => { setRows(p.rows.map((r) => ({ ...r }))); setExprId(p.expr); }} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {rows.map((r, i) => (
                <div key={i} className={`flex flex-wrap items-center gap-1.5 text-sm ${E.uses.includes(i) ? '' : 'opacity-45'}`}>
                  <span className="font-black w-5" style={{ color: COLORS[i] }}>{NAMES[i]}</span>
                  <button type="button" disabled={r.loInf} onClick={() => patch(i, { lc: !r.lc })} aria-label="Extremo inferior abierto o cerrado" className={`${toggle} border-slate-300 bg-white w-7 disabled:opacity-40`}>{r.loInf || !r.lc ? '(' : '['}</button>
                  <input type="number" step="0.5" disabled={r.loInf} value={r.lo} onChange={(e) => patch(i, { lo: e.target.value })} aria-label={`Extremo inferior de ${NAMES[i]}`} className="w-[62px] rounded-lg border border-slate-200 bg-white px-1.5 py-1.5 text-sm text-center font-semibold disabled:bg-slate-100" />
                  <span>,</span>
                  <input type="number" step="0.5" disabled={r.hiInf} value={r.hi} onChange={(e) => patch(i, { hi: e.target.value })} aria-label={`Extremo superior de ${NAMES[i]}`} className="w-[62px] rounded-lg border border-slate-200 bg-white px-1.5 py-1.5 text-sm text-center font-semibold disabled:bg-slate-100" />
                  <button type="button" disabled={r.hiInf} onClick={() => patch(i, { hc: !r.hc })} aria-label="Extremo superior abierto o cerrado" className={`${toggle} border-slate-300 bg-white w-7 disabled:opacity-40`}>{r.hiInf || !r.hc ? ')' : ']'}</button>
                  <button type="button" onClick={() => patch(i, { loInf: !r.loInf })} className={`${toggle} ${r.loInf ? 'text-white border-transparent' : 'bg-white border-slate-300 text-slate-600'}`} style={r.loInf ? { backgroundColor: COLORS[i] } : undefined}>−∞</button>
                  <button type="button" onClick={() => patch(i, { hiInf: !r.hiInf })} className={`${toggle} ${r.hiInf ? 'text-white border-transparent' : 'bg-white border-slate-300 text-slate-600'}`} style={r.hiInf ? { backgroundColor: COLORS[i] } : undefined}>+∞</button>
                  {inEmptyNote(i) && <span className="text-xs font-semibold text-amber-700">vacío</span>}
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 mb-1.5">Operación</p>
              <div className="flex flex-wrap gap-1.5">
                {EXPRS.map((e) => (
                  <button key={e.id} type="button" onClick={() => setExprId(e.id)} className={`px-2.5 py-1.5 rounded-lg text-sm font-bold transition ${exprId === e.id ? 'text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} style={exprId === e.id ? { backgroundColor: VIOLET } : undefined}>
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`${CARD} space-y-3`}>
            <p className="text-sm font-black text-slate-900">Punto de prueba</p>
            <Slider label="x" value={Math.max(Math.floor(lo), Math.min(Math.ceil(hi), tx))} onChange={setTx} min={Math.floor(lo)} max={Math.ceil(hi)} step={0.5} />
            <div className="flex items-center gap-2">
              <label htmlFor="iv-x" className="text-xs font-bold text-slate-600">x exacto:</label>
              <input id="iv-x" type="number" step="0.1" value={tx} onChange={(e) => { const v = parseFloat(e.target.value); if (Number.isFinite(v)) setTx(v); }} className="w-24 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm font-semibold" />
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-sm">
              {[...NAMES.map((n, k) => ({ n, color: COLORS[k], ok: has(sets[k], tx) })), { n: 'Resultado', color: VIOLET, ok: has(result, tx) }].map((m) => (
                <div key={m.n} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5">
                  <span className="font-bold" style={{ color: m.color }}>{m.n}</span>
                  <span className={`font-black ${m.ok ? 'text-green-600' : 'text-slate-400'}`}>{m.ok ? '✓ pertenece' : '✗ no'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS} />
    </div>
  );
}