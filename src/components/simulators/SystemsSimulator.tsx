'use client';

import { useMemo, useState } from 'react';
import { MathText } from '@/components/Math';
import { Plane, type Bounds, type PlaneCtx } from './shared/Plane';
import { Viewer3D, type Project } from './shared/Viewer3D';
import { ACCENT, CARD, GuidedQuestions, Tabs, fmt } from './shared/ui';

type Kind = 'eq' | 'ineq';
type Op = '<=' | '<' | '>=' | '>';
type Row = { on: boolean; a: string; b: string; c: string; op: Op; rhs: string };
type Obj = { p: string; q: string; r: string; mode: 'max' | 'min' };
type Pt = { x: number; y: number };

const MAX_ROWS = 8;
const COLORS = ['#D2560F', '#0A5FCC', '#16a34a', '#7c3aed', '#db2777', '#0891b2', '#ca8a04', '#475569'];
const OP_TEX: Record<Op, string> = { '<=': '\\leq', '<': '<', '>=': '\\geq', '>': '>' };
const OP_LABEL: Record<Op, string> = { '<=': '≤', '<': '<', '>=': '≥', '>': '>' };

const toNum = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) ? v : 0;
};

const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};

/* ---------- Presets ---------- */
const PRE_EQ: Record<2 | 3, Record<'unique' | 'infinite' | 'none', string[][]>> = {
  2: {
    unique: [['1', '1', '0', '5'], ['1', '-1', '0', '1'], ['0', '0', '0', '0']],
    infinite: [['1', '1', '0', '4'], ['2', '2', '0', '8'], ['0', '0', '0', '0']],
    none: [['1', '1', '0', '4'], ['1', '1', '0', '7'], ['0', '0', '0', '0']],
  },
  3: {
    unique: [['1', '1', '1', '6'], ['2', '-1', '1', '3'], ['1', '2', '-1', '2']],
    infinite: [['1', '1', '1', '6'], ['2', '2', '2', '12'], ['1', '-1', '1', '2']],
    none: [['1', '1', '1', '6'], ['1', '1', '1', '3'], ['1', '-1', '1', '2']],
  },
};

const EQ_LABELS = { unique: 'Solución única', infinite: 'Infinitas soluciones', none: 'Sin solución' } as const;

const r = (on: boolean, a: string, b: string, c: string, op: Op, rhs: string): Row => ({ on, a, b, c, op, rhs });
const blank = (): Row => r(false, '0', '0', '0', '>=', '0');
const pad = (rows: Row[]): Row[] => [...rows, ...Array.from({ length: MAX_ROWS - rows.length }, blank)];
const DEFAULT_OBJ: Obj = { p: '1', q: '1', r: '1', mode: 'max' };

type Preset = { label: string; rows: Row[]; obj?: Obj };

const PRE_INEQ: Record<2 | 3, Record<string, Preset>> = {
  2: {
    triangulo: {
      label: 'Triángulo',
      rows: pad([r(true, '1', '1', '0', '<=', '6'), r(true, '1', '0', '0', '>=', '0'), r(true, '0', '1', '0', '>=', '0')]),
      obj: { p: '2', q: '1', r: '0', mode: 'max' },
    },
    noAcotada: {
      label: 'Región no acotada',
      rows: pad([r(true, '1', '-1', '0', '<=', '2'), r(true, '1', '0', '0', '>=', '0')]),
    },
    vacia: {
      label: 'Sin solución',
      rows: pad([r(true, '1', '0', '0', '>=', '4'), r(true, '1', '0', '0', '<=', '1')]),
    },
    fabrica: {
      label: 'Fábrica (máximo, 7 restricciones)',
      rows: pad([
        r(true, '1', '0', '0', '>=', '0'),
        r(true, '0', '1', '0', '>=', '0'),
        r(true, '2', '1', '0', '<=', '70'),
        r(true, '1', '1', '0', '<=', '45'),
        r(true, '1', '-1', '0', '<=', '30'),
        r(true, '1', '2', '0', '<=', '80'),
        r(true, '0', '1', '0', '<=', '35'),
      ]),
      obj: { p: '40', q: '30', r: '0', mode: 'max' },
    },
    dieta: {
      label: 'Dieta (mínimo, 7 restricciones)',
      rows: pad([
        r(true, '1', '0', '0', '>=', '0'),
        r(true, '0', '1', '0', '>=', '0'),
        r(true, '2', '1', '0', '>=', '8'),
        r(true, '1', '2', '0', '>=', '10'),
        r(true, '1', '1', '0', '>=', '7'),
        r(true, '1', '0', '0', '<=', '10'),
        r(true, '0', '1', '0', '<=', '9'),
      ]),
      obj: { p: '3', q: '2', r: '0', mode: 'min' },
    },
  },
  3: {
    tetraedro: {
      label: 'Tetraedro',
      rows: pad([r(true, '1', '1', '1', '<=', '6'), r(true, '1', '0', '0', '>=', '0'), r(true, '0', '1', '0', '>=', '0'), r(true, '0', '0', '1', '>=', '0')]),
      obj: { p: '1', q: '2', r: '3', mode: 'max' },
    },
    prisma: {
      label: 'Prisma',
      rows: pad([r(true, '1', '0', '0', '>=', '0'), r(true, '0', '1', '0', '>=', '0'), r(true, '1', '1', '0', '<=', '5'), r(true, '0', '0', '1', '>=', '0'), r(true, '0', '0', '1', '<=', '6')]),
    },
    vacia: {
      label: 'Sin solución',
      rows: pad([r(true, '1', '1', '1', '>=', '5'), r(true, '1', '1', '1', '<=', '2')]),
    },
    produccion: {
      label: 'Producción 3 productos (7 restricciones)',
      rows: pad([
        r(true, '1', '0', '0', '>=', '0'),
        r(true, '0', '1', '0', '>=', '0'),
        r(true, '0', '0', '1', '>=', '0'),
        r(true, '1', '1', '1', '<=', '20'),
        r(true, '2', '1', '0', '<=', '25'),
        r(true, '0', '1', '2', '<=', '24'),
        r(true, '1', '0', '1', '<=', '14'),
      ]),
      obj: { p: '3', q: '4', r: '5', mode: 'max' },
    },
  },
};

/* ---------- Álgebra ---------- */
function rank(M: number[][]) {
  const m = M.map((row) => [...row]);
  const rows = m.length, cols = m[0].length;
  let rk = 0;
  for (let c = 0; c < cols && rk < rows; c++) {
    let p = rk;
    for (let i = rk + 1; i < rows; i++) if (Math.abs(m[i][c]) > Math.abs(m[p][c])) p = i;
    if (Math.abs(m[p][c]) < 1e-9) continue;
    [m[rk], m[p]] = [m[p], m[rk]];
    for (let i = rk + 1; i < rows; i++) {
      const f = m[i][c] / m[rk][c];
      for (let j = c; j < cols; j++) m[i][j] -= f * m[rk][j];
    }
    rk++;
  }
  return rk;
}

const det2 = (M: number[][]) => M[0][0] * M[1][1] - M[0][1] * M[1][0];
const det3 = (M: number[][]) =>
  M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
  M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
  M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);

type EqResult =
  | { type: 'inc' }
  | { type: 'ind'; rank: number }
  | { type: 'det'; D: number; dets: number[]; sol: number[] };

function analyzeEq(n: 2 | 3, g: number[][]): EqResult {
  const A = g.slice(0, n).map((row) => row.slice(0, n));
  const bb = g.slice(0, n).map((row) => row[3]);
  const rA = rank(A);
  const rAb = rank(A.map((row, i) => [...row, bb[i]]));
  if (rA < rAb) return { type: 'inc' };
  if (rA < n) return { type: 'ind', rank: rA };
  const dt = n === 2 ? det2 : det3;
  const D = dt(A);
  const dets = Array.from({ length: n }, (_, j) => dt(A.map((row, i) => row.map((v, k) => (k === j ? bb[i] : v)))));
  return { type: 'det', D, dets, sol: dets.map((x) => x / D) };
}

function lhsTex(co: number[], vars: string[]) {
  let s = '';
  co.forEach((c, i) => {
    if (Math.abs(c) < 1e-9) return;
    const abs = Math.abs(c);
    const coef = abs === 1 ? '' : fmt(abs);
    s += (s === '' ? (c < 0 ? '-' : '') : c < 0 ? ' - ' : ' + ') + coef + vars[i];
  });
  return s === '' ? '0' : s;
}

/* ---------- Geometría ---------- */
function lineSeg(ctx: PlaneCtx, a: number, b: number, c: number) {
  const xL = ctx.cx - ctx.half * 2, xR = ctx.cx + ctx.half * 2;
  if (Math.abs(b) > 1e-9) {
    return { x1: ctx.X(xL), y1: ctx.Y((c - a * xL) / b), x2: ctx.X(xR), y2: ctx.Y((c - a * xR) / b) };
  }
  if (Math.abs(a) > 1e-9) {
    const x = c / a;
    return { x1: ctx.X(x), y1: ctx.Y(ctx.cy - ctx.half * 2), x2: ctx.X(x), y2: ctx.Y(ctx.cy + ctx.half * 2) };
  }
  return null;
}

function clipPoly(poly: Pt[], a: number, b: number, c: number, s: number): Pt[] {
  const f = (p: Pt) => s * (a * p.x + b * p.y - c);
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const p0 = poly[i], p1 = poly[(i + 1) % poly.length];
    const f0 = f(p0), f1 = f(p1);
    if (f0 <= 1e-9) out.push(p0);
    if ((f0 < -1e-9 && f1 > 1e-9) || (f0 > 1e-9 && f1 < -1e-9)) {
      const t = f0 / (f0 - f1);
      out.push({ x: p0.x + t * (p1.x - p0.x), y: p0.y + t * (p1.y - p0.y) });
    }
  }
  return out;
}

const sgnOf = (op: Op) => (op === '<=' || op === '<' ? 1 : -1);
const isStrict = (op: Op) => op === '<' || op === '>';

type Cons = { idx: number; a: number; b: number; c: number; rhs: number; op: Op };

function analyzeIneq2(qs: Cons[]) {
  const BIG = 1e4;
  let poly: Pt[] = [{ x: -BIG, y: -BIG }, { x: BIG, y: -BIG }, { x: BIG, y: BIG }, { x: -BIG, y: BIG }];
  let impossible = false;

  for (const q of qs) {
    const s = sgnOf(q.op);
    if (Math.abs(q.a) < 1e-9 && Math.abs(q.b) < 1e-9) {
      const v = s * (0 - q.rhs);
      if (isStrict(q.op) ? v >= -1e-9 : v > 1e-9) impossible = true;
      continue;
    }
    poly = clipPoly(poly, q.a, q.b, q.rhs, s);
    if (poly.length < 3) { poly = []; break; }
  }

  let area = 0;
  for (let i = 0; i < poly.length; i++) {
    const p0 = poly[i], p1 = poly[(i + 1) % poly.length];
    area += p0.x * p1.y - p1.x * p0.y;
  }
  area = Math.abs(area) / 2;

  const lines = qs.filter((q) => Math.abs(q.a) > 1e-9 || Math.abs(q.b) > 1e-9);
  const verts: Pt[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const A = lines[i], B = lines[j];
      const D = A.a * B.b - B.a * A.b;
      if (Math.abs(D) < 1e-9) continue;
      const x = (A.rhs * B.b - B.rhs * A.b) / D;
      const y = (A.a * B.rhs - B.a * A.rhs) / D;
      const ok = qs.every((q) => sgnOf(q.op) * (q.a * x + q.b * y - q.rhs) <= 1e-7);
      if (ok && !verts.some((v) => Math.hypot(v.x - x, v.y - y) < 1e-6)) verts.push({ x, y });
    }
  }

  const empty = impossible || poly.length < 3 || area < 1e-9;
  const bounded = !empty && poly.every((p) => Math.abs(p.x) < BIG - 1 && Math.abs(p.y) < BIG - 1);
  return { poly, empty, bounded, verts: empty ? [] : verts };
}

// Vértices de un poliedro definido por inecuaciones (intersección de tríos de planos)
function vertices3(qs: Cons[]): number[][] {
  const pl = qs.filter((q) => Math.hypot(q.a, q.b, q.c) > 1e-9);
  const out: number[][] = [];
  for (let i = 0; i < pl.length; i++) {
    for (let j = i + 1; j < pl.length; j++) {
      for (let k = j + 1; k < pl.length; k++) {
        const M = [[pl[i].a, pl[i].b, pl[i].c], [pl[j].a, pl[j].b, pl[j].c], [pl[k].a, pl[k].b, pl[k].c]];
        const D = det3(M);
        if (Math.abs(D) < 1e-9) continue;
        const rhs = [pl[i].rhs, pl[j].rhs, pl[k].rhs];
        const sol = [0, 1, 2].map((col) => det3(M.map((row, ri) => row.map((v, ci) => (ci === col ? rhs[ri] : v)))) / D);
        const ok = qs.every((q) => sgnOf(q.op) * (q.a * sol[0] + q.b * sol[1] + q.c * sol[2] - q.rhs) <= 1e-7);
        if (ok && !out.some((p) => Math.hypot(p[0] - sol[0], p[1] - sol[1], p[2] - sol[2]) < 1e-6)) out.push(sol);
      }
    }
  }
  return out;
}

function cross(u: number[], v: number[]) {
  return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
}

function planePolygon(n: number[], d: number, h: number): number[][] {
  const nn = Math.hypot(n[0], n[1], n[2]);
  if (nn < 1e-9) return [];
  const V: number[][] = [];
  for (const x of [-h, h]) for (const y of [-h, h]) for (const z of [-h, h]) V.push([x, y, z]);
  const pts: number[][] = [];
  const add = (p: number[]) => {
    if (!pts.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2]) < 1e-6)) pts.push(p);
  };
  const f = (p: number[]) => n[0] * p[0] + n[1] * p[1] + n[2] * p[2] - d;

  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      if ([0, 1, 2].filter((k) => V[i][k] !== V[j][k]).length !== 1) continue;
      const f0 = f(V[i]), f1 = f(V[j]);
      if (Math.abs(f0) < 1e-9) add(V[i]);
      if (Math.abs(f1) < 1e-9) add(V[j]);
      if (f0 * f1 < 0) {
        const t = f0 / (f0 - f1);
        add([0, 1, 2].map((k) => V[i][k] + t * (V[j][k] - V[i][k])));
      }
    }
  }
  if (pts.length < 3) return [];

  const c = [0, 1, 2].map((k) => pts.reduce((s, p) => s + p[k], 0) / pts.length);
  const nz = n.map((v) => v / nn);
  const ref = Math.abs(nz[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const uRaw = cross(nz, ref);
  const ul = Math.hypot(uRaw[0], uRaw[1], uRaw[2]);
  const u = uRaw.map((v) => v / ul);
  const v = cross(nz, u);
  const ang = (p: number[]) => {
    const w = [p[0] - c[0], p[1] - c[1], p[2] - c[2]];
    return Math.atan2(w[0] * v[0] + w[1] * v[1] + w[2] * v[2], w[0] * u[0] + w[1] * u[1] + w[2] * u[2]);
  };
  return pts.sort((p, q) => ang(p) - ang(q));
}

/* ---------- Componentes pequeños ---------- */
function Num({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <input
      type="number"
      step="0.5"
      value={value}
      aria-label={label}
      onChange={(e) => onChange(e.target.value)}
      className="w-[58px] rounded-lg border border-slate-200 bg-white px-1.5 py-1.5 text-sm text-center font-semibold text-slate-900"
    />
  );
}

const QUESTIONS: Record<Kind, { q: string; a: string }[]> = {
  eq: [
    { q: 'Elige "Sin solución" con 2 incógnitas. ¿Cómo son las rectas?', a: 'Paralelas: tienen la misma pendiente y distinta ordenada, así que nunca se cortan.' },
    { q: 'Elige "Infinitas soluciones". ¿Qué ves en la gráfica?', a: 'Una sola recta: una ecuación es múltiplo de la otra, y todos sus puntos son solución.' },
    { q: 'Con 3 incógnitas, ¿qué significa que D valga 0?', a: 'Los planos no se cortan en un único punto: o comparten una recta (infinitas soluciones) o no hay solución. Hay que comparar los rangos.' },
    { q: 'Cambia un coeficiente en "Solución única". ¿Qué se mueve?', a: 'Cambia la inclinación o posición de una recta (o plano) y el punto de corte se desplaza con ella.' },
  ],
  ineq: [
    { q: 'Carga "Fábrica" y mira la tabla de vértices. ¿Dónde está el máximo?', a: 'En un vértice de la región. El teorema fundamental de la programación lineal dice que el óptimo, si existe, se alcanza en un vértice.' },
    { q: 'En "Fábrica", ¿qué restricciones no tocan la región (son redundantes)?', a: 'Aquellas cuya recta no forma ningún lado de la región: se pueden quitar sin cambiar la solución. Desactívalas con su casilla y comprueba.' },
    { q: 'Cambia la función objetivo de la fábrica. ¿Se mueve el óptimo?', a: 'Sí: al cambiar la inclinación de la recta objetivo, el último vértice que toca al desplazarla es otro.' },
    { q: 'Carga "Dieta (mínimo)". ¿Por qué el mínimo no está en (0,0)?', a: 'Porque las restricciones ≥ exigen un mínimo de nutrientes: la región queda lejos del origen y el vértice más barato es otro.' },
    { q: 'Elige "Sin solución". ¿Por qué no hay región?', a: 'Las condiciones se contradicen: no existe ningún punto que cumpla a la vez x ≥ 4 y x ≤ 1.' },
    { q: 'Cambia un ≤ por un <. ¿Qué ocurre con la recta?', a: 'Pasa a discontinua: con desigualdad estricta los puntos de la frontera no son solución.' },
  ],
};

/* ---------- Componente principal ---------- */
export default function SystemsSimulator() {
  const [kind, setKind] = useState<Kind>('eq');
  const [n, setN] = useState<2 | 3>(2);
  const [eqGrid, setEqGrid] = useState<string[][]>(PRE_EQ[2].unique.map((row) => [...row]));
  const [rows, setRows] = useState<Row[]>(PRE_INEQ[2].triangulo.rows.map((row) => ({ ...row })));
  const [obj, setObj] = useState<Obj>(PRE_INEQ[2].triangulo.obj ?? DEFAULT_OBJ);
  const [fit, setFit] = useState(0);

  const vars = ['x', 'y', 'z'].slice(0, n);

  const changeN = (v: '2' | '3') => {
    const nn = Number(v) as 2 | 3;
    const first = Object.values(PRE_INEQ[nn])[0];
    setN(nn);
    setEqGrid(PRE_EQ[nn].unique.map((row) => [...row]));
    setRows(first.rows.map((row) => ({ ...row })));
    setObj(first.obj ?? DEFAULT_OBJ);
    setFit((f) => f + 1);
  };

  const setCell = (i: number, j: number, v: string) =>
    setEqGrid((g) => g.map((row, ii) => (ii === i ? row.map((x, jj) => (jj === j ? v : x)) : row)));

  const patchRow = (i: number, patch: Partial<Row>) =>
    setRows((rs) => rs.map((row, ii) => (ii === i ? { ...row, ...patch } : row)));

  /* Ecuaciones */
  const eqNum = eqGrid.map((row) => row.map(toNum));
  const res = analyzeEq(n, eqNum);

  /* Inecuaciones */
  const qs: Cons[] = rows
    .map((row, idx) => ({ idx, on: row.on, a: toNum(row.a), b: toNum(row.b), c: toNum(row.c), rhs: toNum(row.rhs), op: row.op }))
    .filter((q) => q.on)
    .map(({ on, ...rest }) => rest);

  const reg = kind === 'ineq' && n === 2 ? analyzeIneq2(qs) : null;
  const verts3 = kind === 'ineq' && n === 3 ? vertices3(qs) : [];

  const sample = useMemo(() => {
    if (kind !== 'ineq' || n !== 3) return { pts: [] as number[][], total: 0 };
    const N = 17;
    const pts: number[][] = [];
    const items = rows
      .filter((row) => row.on)
      .map((row) => ({ a: toNum(row.a), b: toNum(row.b), c: toNum(row.c), rhs: toNum(row.rhs), op: row.op }));
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
      const x = -10 + (i * 20) / (N - 1), y = -10 + (j * 20) / (N - 1), z = -10 + (k * 20) / (N - 1);
      const ok = items.every((q) => {
        const v = q.a * x + q.b * y + q.c * z - q.rhs;
        return q.op === '<=' ? v <= 1e-9 : q.op === '<' ? v < -1e-9 : q.op === '>=' ? v >= -1e-9 : v > 1e-9;
      });
      if (ok) pts.push([x, y, z]);
    }
    return { pts, total: N * N * N };
  }, [kind, n, rows]);

  /* Función objetivo sobre los vértices */
  const coefs = [toNum(obj.p), toNum(obj.q), n === 3 ? toNum(obj.r) : 0];
  const vertList: number[][] =
    kind !== 'ineq' ? [] : n === 2 ? (reg?.verts ?? []).map((v) => [v.x, v.y, 0]) : verts3;
  const regionOk = kind === 'ineq' && (n === 2 ? !!reg && !reg.empty : sample.pts.length > 0);
  const evals = regionOk ? vertList.map((v) => ({ v, f: coefs[0] * v[0] + coefs[1] * v[1] + coefs[2] * v[2] })) : [];
  const best = evals.length
    ? evals.reduce((m, e) => (obj.mode === 'max' ? (e.f > m.f ? e : m) : e.f < m.f ? e : m))
    : null;

  /* Límites del plano (botón Ajustar) */
  let bounds: Bounds = { minX: -5, maxX: 5, minY: -5, maxY: 5 };
  if (kind === 'eq' && n === 2 && res.type === 'det') {
    bounds = { minX: Math.min(0, res.sol[0]), maxX: Math.max(0, res.sol[0]), minY: Math.min(0, res.sol[1]), maxY: Math.max(0, res.sol[1]) };
  }
  if (reg && reg.verts.length > 0) {
    const xs = [0, ...reg.verts.map((v) => v.x)], ys = [0, ...reg.verts.map((v) => v.y)];
    bounds = { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
  }

  /* Dibujos */
  const renderEq2 = (ctx: PlaneCtx) => (
    <>
      {[0, 1].map((i) => {
        const seg = lineSeg(ctx, eqNum[i][0], eqNum[i][1], eqNum[i][3]);
        return seg ? <line key={i} {...seg} stroke={COLORS[i]} strokeWidth={3} strokeLinecap="round" /> : null;
      })}
      {res.type === 'det' && (
        <circle cx={ctx.X(res.sol[0])} cy={ctx.Y(res.sol[1])} r={7} fill="#0f172a" stroke="#fff" strokeWidth={2} />
      )}
    </>
  );

  const renderIneq2 = (ctx: PlaneCtx) => {
    const objSeg = best && (Math.abs(coefs[0]) > 1e-9 || Math.abs(coefs[1]) > 1e-9) ? lineSeg(ctx, coefs[0], coefs[1], best.f) : null;
    return (
      <>
        {reg && !reg.empty && (
          <polygon points={reg.poly.map((p) => `${ctx.X(p.x)},${ctx.Y(p.y)}`).join(' ')} fill="rgba(210,86,15,0.22)" />
        )}
        {qs.map((q) => {
          const seg = lineSeg(ctx, q.a, q.b, q.rhs);
          return seg ? (
            <line key={q.idx} {...seg} stroke={COLORS[q.idx]} strokeWidth={2.5} strokeDasharray={isStrict(q.op) ? '9 6' : undefined} />
          ) : null;
        })}
        {objSeg && <line {...objSeg} stroke="#0f172a" strokeWidth={2} strokeDasharray="2 6" strokeLinecap="round" />}
        {reg?.verts.map((v, i) => (
          <circle key={i} cx={ctx.X(v.x)} cy={ctx.Y(v.y)} r={6} fill="#0f172a" stroke="#fff" strokeWidth={2} />
        ))}
        {best && <circle cx={ctx.X(best.v[0])} cy={ctx.Y(best.v[1])} r={11} fill="none" stroke={ACCENT} strokeWidth={3.5} />}
      </>
    );
  };

  const drawEq3 = (g: CanvasRenderingContext2D, P: Project) => {
    for (let i = 0; i < 3; i++) {
      const poly = planePolygon([eqNum[i][0], eqNum[i][1], eqNum[i][2]], eqNum[i][3], 10);
      if (poly.length < 3) continue;
      g.beginPath();
      poly.forEach((p, j) => {
        const q = P(p[0], p[1], p[2]);
        if (j === 0) g.moveTo(q.x, q.y); else g.lineTo(q.x, q.y);
      });
      g.closePath();
      g.fillStyle = rgba(COLORS[i], 0.28);
      g.fill();
      g.strokeStyle = COLORS[i];
      g.lineWidth = 1.5;
      g.stroke();
    }
    if (res.type === 'det' && res.sol.every((v) => Math.abs(v) <= 10)) {
      const q = P(res.sol[0], res.sol[1], res.sol[2]);
      g.beginPath();
      g.arc(q.x, q.y, 7, 0, Math.PI * 2);
      g.fillStyle = '#0f172a';
      g.fill();
      g.strokeStyle = '#fff';
      g.lineWidth = 2;
      g.stroke();
    }
  };

  const drawIneq3 = (g: CanvasRenderingContext2D, P: Project) => {
    qs.forEach((q) => {
      const poly = planePolygon([q.a, q.b, q.c], q.rhs, 10);
      if (poly.length < 3) return;
      g.beginPath();
      poly.forEach((p, j) => {
        const pt = P(p[0], p[1], p[2]);
        if (j === 0) g.moveTo(pt.x, pt.y); else g.lineTo(pt.x, pt.y);
      });
      g.closePath();
      g.strokeStyle = rgba(COLORS[q.idx], 0.55);
      g.lineWidth = 1.5;
      g.setLineDash(isStrict(q.op) ? [8, 5] : []);
      g.stroke();
      g.setLineDash([]);
    });

    const proj = sample.pts.map((p) => P(p[0], p[1], p[2])).sort((u, v) => v.d - u.d);
    g.fillStyle = 'rgba(210,86,15,0.5)';
    for (const p of proj) {
      g.beginPath();
      g.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
      g.fill();
    }

    if (regionOk) {
      for (const v of vertList) {
        if (v.some((c) => Math.abs(c) > 10)) continue;
        const p = P(v[0], v[1], v[2]);
        g.beginPath();
        g.arc(p.x, p.y, 5, 0, Math.PI * 2);
        g.fillStyle = '#0f172a';
        g.fill();
        g.strokeStyle = '#fff';
        g.lineWidth = 1.5;
        g.stroke();
      }
      if (best && best.v.every((c) => Math.abs(c) <= 10)) {
        const p = P(best.v[0], best.v[1], best.v[2]);
        g.beginPath();
        g.arc(p.x, p.y, 10, 0, Math.PI * 2);
        g.strokeStyle = ACCENT;
        g.lineWidth = 3.5;
        g.stroke();
      }
    }
  };

  /* Texto del sistema */
  const eqSystemTex = () => {
    const lines = Array.from({ length: n }, (_, i) => `${lhsTex(eqNum[i].slice(0, n), vars)} = ${fmt(eqNum[i][3])}`);
    return `$\\begin{cases} ${lines.join(' \\\\ ')} \\end{cases}$`;
  };

  const ineqSystemTex = () => {
    if (qs.length === 0) return '';
    const lines = qs.map((q) => `${lhsTex([q.a, q.b, q.c].slice(0, n), vars)} ${OP_TEX[q.op]} ${fmt(q.rhs)}`);
    return `$\\begin{cases} ${lines.join(' \\\\ ')} \\end{cases}$`;
  };

  const presets =
    kind === 'eq'
      ? (Object.keys(EQ_LABELS) as (keyof typeof EQ_LABELS)[]).map((key) => ({
          id: key as string,
          label: EQ_LABELS[key] as string,
          apply: () => { setEqGrid(PRE_EQ[n][key].map((row) => [...row])); setFit((f) => f + 1); },
        }))
      : Object.entries(PRE_INEQ[n]).map(([id, p]) => ({
          id,
          label: p.label,
          apply: () => { setRows(p.rows.map((row) => ({ ...row }))); setObj(p.obj ?? DEFAULT_OBJ); setFit((f) => f + 1); },
        }));

  const geometry =
    res.type === 'det'
      ? n === 2 ? 'Las dos rectas se cortan en un punto.' : 'Los tres planos se cortan en un único punto.'
      : res.type === 'ind'
      ? n === 2 ? 'Las rectas coinciden: infinitas soluciones.' : res.rank === 2 ? 'Los planos comparten una recta (o dos coinciden): infinitas soluciones.' : 'Los tres planos coinciden: infinitas soluciones.'
      : n === 2 ? 'Las rectas son paralelas: no hay solución.' : 'Los planos no tienen ningún punto común a los tres: no hay solución.';

  const objTex = n === 2
    ? `f(x,y) = ${lhsTex([coefs[0], coefs[1]], ['x', 'y'])}`
    : `f(x,y,z) = ${lhsTex(coefs, ['x', 'y', 'z'])}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={kind} onChange={(v) => { setKind(v); setFit((f) => f + 1); }} items={[{ id: 'eq', label: 'Ecuaciones' }, { id: 'ineq', label: 'Inecuaciones' }]} />
        <Tabs value={String(n) as '2' | '3'} onChange={changeN} items={[{ id: '2', label: '2 incógnitas' }, { id: '3', label: '3 incógnitas' }]} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className={`${CARD} sm:p-4 self-start`}>
          {kind === 'eq' && n === 2 && <Plane render={renderEq2} bounds={bounds} fitSignal={fit} label="Dos rectas y su punto de corte" />}
          {kind === 'ineq' && n === 2 && <Plane render={renderIneq2} bounds={bounds} fitSignal={fit} label="Región solución de un sistema de inecuaciones" />}
          {kind === 'eq' && n === 3 && <Viewer3D draw={drawEq3} label="Tres planos en el espacio" />}
          {kind === 'ineq' && n === 3 && <Viewer3D draw={drawIneq3} label="Región solución en el espacio" />}
        </div>

        <div className="space-y-4">
          <div className={`${CARD} space-y-4`}>
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1.5">Ejemplos</p>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button key={p.id} type="button" onClick={p.apply} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-left">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {kind === 'eq' &&
                Array.from({ length: n }).map((_, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-1.5 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                    {vars.map((v, j) => (
                      <span key={v} className="inline-flex items-center gap-1">
                        <Num value={eqGrid[i][j]} onChange={(val) => setCell(i, j, val)} label={`Coeficiente de ${v} en la ecuación ${i + 1}`} />
                        <span className="font-semibold">{v}</span>
                        {j < n - 1 && <span className="text-slate-400">+</span>}
                      </span>
                    ))}
                    <span className="font-bold">=</span>
                    <Num value={eqGrid[i][3]} onChange={(val) => setCell(i, 3, val)} label={`Término independiente de la ecuación ${i + 1}`} />
                  </div>
                ))}

              {kind === 'ineq' &&
                rows.map((row, i) => (
                  <div key={i} className={`flex flex-wrap items-center gap-1.5 text-sm ${row.on ? '' : 'opacity-50'}`}>
                    <input type="checkbox" checked={row.on} onChange={(e) => patchRow(i, { on: e.target.checked })} aria-label={`Activar inecuación ${i + 1}`} className="w-4 h-4" style={{ accentColor: COLORS[i] }} />
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                    {vars.map((v, j) => {
                      const key = (['a', 'b', 'c'] as const)[j];
                      return (
                        <span key={v} className="inline-flex items-center gap-1">
                          <Num value={row[key]} onChange={(val) => patchRow(i, { [key]: val } as Partial<Row>)} label={`Coeficiente de ${v}`} />
                          <span className="font-semibold">{v}</span>
                          {j < n - 1 && <span className="text-slate-400">+</span>}
                        </span>
                      );
                    })}
                    <select value={row.op} onChange={(e) => patchRow(i, { op: e.target.value as Op })} aria-label="Signo" className="rounded-lg border border-slate-200 bg-white px-1.5 py-1.5 text-sm font-bold">
                      {(Object.keys(OP_LABEL) as Op[]).map((o) => (
                        <option key={o} value={o}>{OP_LABEL[o]}</option>
                      ))}
                    </select>
                    <Num value={row.rhs} onChange={(val) => patchRow(i, { rhs: val })} label="Término independiente" />
                  </div>
                ))}
            </div>
          </div>

          {/* Función objetivo (programación lineal) */}
          {kind === 'ineq' && (
            <div className={`${CARD} space-y-3`}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-black text-slate-900">Función objetivo</p>
                <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-bold">
                  {(['max', 'min'] as const).map((m) => (
                    <button key={m} type="button" onClick={() => setObj({ ...obj, mode: m })} className={`px-3 py-1.5 rounded-md transition ${obj.mode === m ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>
                      {m === 'max' ? 'Maximizar' : 'Minimizar'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-sm">
                <span className="font-bold">f =</span>
                {vars.map((v, j) => {
                  const key = (['p', 'q', 'r'] as const)[j];
                  return (
                    <span key={v} className="inline-flex items-center gap-1">
                      <Num value={obj[key]} onChange={(val) => setObj({ ...obj, [key]: val })} label={`Coeficiente de ${v} en la función objetivo`} />
                      <span className="font-semibold">{v}</span>
                      {j < n - 1 && <span className="text-slate-400">+</span>}
                    </span>
                  );
                })}
              </div>

              {evals.length > 0 && best ? (
                <>
                  <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="text-left font-bold px-2.5 py-1.5">Vértice</th>
                          <th className="text-right font-bold px-2.5 py-1.5">f</th>
                        </tr>
                      </thead>
                      <tbody>
                        {evals.map((e, i) => (
                          <tr key={i} className={e === best ? 'font-bold' : ''} style={e === best ? { background: 'rgba(210,86,15,0.12)', color: ACCENT } : undefined}>
                            <td className="px-2.5 py-1 tabular-nums">({e.v.slice(0, n).map(fmt).join(', ')})</td>
                            <td className="px-2.5 py-1 text-right tabular-nums">{fmt(e.f)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: ACCENT }}>
                    {obj.mode === 'max' ? 'Máximo' : 'Mínimo'}: <MathText text={`$f = ${fmt(best.f)}$`} /> en ({best.v.slice(0, n).map(fmt).join(', ')})
                  </p>
                  {n === 2 && reg && !reg.bounded && (
                    <p className="text-xs text-slate-500">Región no acotada: comprueba que el óptimo exista (a veces la función crece sin límite).</p>
                  )}
                </>
              ) : (
                <p className="text-xs text-slate-500">Se necesita una región no vacía con vértices.</p>
              )}
              <p className="text-[11px] text-slate-500"><MathText text={`$${objTex}$`} /> · el óptimo se alcanza en un vértice.</p>
            </div>
          )}

          <div className={`${CARD} space-y-2 text-sm text-slate-700`}>
            {kind === 'eq' && (
              <>
                <div className="overflow-x-auto"><MathText text={eqSystemTex()} /></div>
                {res.type === 'det' && (
                  <>
                    <p className="font-bold text-slate-900">Compatible determinado: solución única.</p>
                    <p><MathText text={`$D = ${fmt(res.D)}$`} /></p>
                    {vars.map((v, j) => (
                      <p key={v}>
                        <MathText text={`$${v} = \\frac{D_${v}}{D} = \\frac{${fmt(res.dets[j])}}{${fmt(res.D)}} = ${fmt(res.sol[j])}$`} />
                      </p>
                    ))}
                    <p className="font-semibold" style={{ color: ACCENT }}>
                      <MathText text={`$(${vars.join(',\\ ')}) = (${res.sol.map(fmt).join(',\\ ')})$`} />
                    </p>
                    {n === 3 && res.sol.some((v) => Math.abs(v) > 10) && (
                      <p className="text-xs text-slate-500">El punto queda fuera del cubo visible (±10).</p>
                    )}
                  </>
                )}
                {res.type === 'ind' && <p className="font-bold text-slate-900">Compatible indeterminado.</p>}
                {res.type === 'inc' && <p className="font-bold text-slate-900">Incompatible.</p>}
                {res.type !== 'det' && (
                  <p className="text-xs text-slate-500">
                    {res.type === 'ind' ? `rango(A) = rango(A|b) = ${res.rank} < ${n}` : 'rango(A) < rango(A|b)'}
                  </p>
                )}
                <p className="pt-1 font-semibold" style={{ color: ACCENT }}>{geometry}</p>
              </>
            )}

            {kind === 'ineq' && (
              <>
                {qs.length > 0 && <div className="overflow-x-auto"><MathText text={ineqSystemTex()} /></div>}

                {n === 2 && reg && (
                  <>
                    <p className="font-bold text-slate-900">
                      {qs.length === 0 ? 'Activa alguna inecuación.' : reg.empty ? 'Sin solución: las condiciones se contradicen.' : reg.bounded ? 'Región acotada.' : 'Región no acotada.'}
                    </p>
                    <p className="text-xs text-slate-500">Recta continua: incluye la frontera (≤, ≥). Discontinua: no la incluye (&lt;, &gt;). La recta de puntos es la función objetivo en el óptimo.</p>
                  </>
                )}

                {n === 3 && (
                  <>
                    <p className="font-bold text-slate-900">
                      {sample.pts.length === 0 ? 'Sin puntos en el cubo ±10: región vacía o fuera de la vista.' : `Región no vacía · ${verts3.length} vértices.`}
                    </p>
                    <p className="text-xs text-slate-500">
                      {sample.pts.length} de {sample.total} puntos de muestra cumplen todas las condiciones. Los contornos son los planos frontera.
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS[kind]} />
    </div>
  );
}