'use client';

import { useState } from 'react';
import { MathText } from '@/components/Math';
import { Viewer3D, type Project } from './shared/Viewer3D';
import { ACCENT, BLUE, CARD, GuidedQuestions, Slider, Tabs, fmt } from './shared/ui';

type Kind = 'box' | 'prism' | 'pyramid' | 'cylinder' | 'cone' | 'sphere';
type V3 = number[];
type Face = V3[];
type Params = { a: number; b: number; c: number; n: number; l: number; h: number; r: number };
type Shape =
  | { t: 'poly'; pts: number[][]; tone: 'base' | 'lat' }
  | { t: 'circle'; cx: number; cy: number; r: number; tone: 'base' | 'lat' }
  | { t: 'sector'; cx: number; cy: number; r: number; a0: number; a1: number; tone: 'base' | 'lat' };

const KINDS: { id: Kind; label: string }[] = [
  { id: 'box', label: 'Ortoedro' }, { id: 'prism', label: 'Prisma' }, { id: 'pyramid', label: 'Pirámide' },
  { id: 'cylinder', label: 'Cilindro' }, { id: 'cone', label: 'Cono' }, { id: 'sphere', label: 'Esfera' },
];

const QUESTIONS = [
  { q: 'Compara un cilindro y un cono con el mismo radio y la misma altura. ¿Qué relación hay entre sus volúmenes?', a: 'El volumen del cono es la tercera parte del cilindro. Lo mismo ocurre entre una pirámide y un prisma de igual base y altura.' },
  { q: 'Duplica el lado de un cubo (a = b = c). ¿Qué pasa con el área y con el volumen?', a: 'El área se multiplica por 4 y el volumen por 8: es la relación de semejanza k², k³.' },
  { q: 'Mira el desarrollo del cilindro. ¿Qué dimensiones tiene el rectángulo?', a: 'Su base es la longitud de la circunferencia (2πr) y su altura es la del cilindro. Su área es el área lateral.' },
  { q: 'En el cono, ¿cómo se relacionan r, h y la generatriz?', a: 'Forman un triángulo rectángulo: g² = r² + h². La generatriz es el radio del sector del desarrollo.' },
  { q: 'Aumenta el número de lados de un prisma. ¿A qué cuerpo se parece?', a: 'A un cilindro: una base con muchísimos lados es casi un círculo.' },
  { q: 'Una esfera de radio r y un cilindro de radio r y altura 2r: ¿qué volumen es mayor y en qué proporción?', a: 'El del cilindro: 2πr³ frente a 4πr³/3. La esfera ocupa 2/3 del cilindro que la contiene (Arquímedes).' },
];

const ngon = (n: number, l: number, z: number): V3[] => {
  const R = l / (2 * Math.sin(Math.PI / n));
  return Array.from({ length: n }, (_, i) => [R * Math.cos((2 * Math.PI * i) / n), R * Math.sin((2 * Math.PI * i) / n), z]);
};

function build(kind: Kind, p: Params): { faces: Face[]; zc: number; ext: number } {
  const faces: Face[] = [];
  if (kind === 'box') {
    const { a, b, c } = p;
    const x0 = -a / 2, x1 = a / 2, y0 = -b / 2, y1 = b / 2;
    const q = (z: number): Face => [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]];
    faces.push(q(0), q(c));
    for (let i = 0; i < 4; i++) { const u = q(0), v = q(c); faces.push([u[i], u[(i + 1) % 4], v[(i + 1) % 4], v[i]]); }
    return { faces, zc: c / 2, ext: Math.max(a, b, c) };
  }
  if (kind === 'prism' || kind === 'pyramid') {
    const B = ngon(p.n, p.l, 0);
    const R = p.l / (2 * Math.sin(Math.PI / p.n));
    faces.push(B);
    if (kind === 'prism') {
      const T = ngon(p.n, p.l, p.h);
      faces.push(T);
      B.forEach((_, i) => faces.push([B[i], B[(i + 1) % p.n], T[(i + 1) % p.n], T[i]]));
    } else {
      const apex = [0, 0, p.h];
      B.forEach((_, i) => faces.push([B[i], B[(i + 1) % p.n], apex]));
    }
    return { faces, zc: p.h / 2, ext: Math.max(2 * R, p.h) };
  }
  if (kind === 'cylinder' || kind === 'cone') {
    const N = 48;
    const ring = (z: number) => Array.from({ length: N }, (_, i) => [p.r * Math.cos((2 * Math.PI * i) / N), p.r * Math.sin((2 * Math.PI * i) / N), z]);
    const B = ring(0);
    faces.push(B);
    if (kind === 'cylinder') {
      const T = ring(p.h);
      faces.push(T);
      B.forEach((_, i) => faces.push([B[i], B[(i + 1) % N], T[(i + 1) % N], T[i]]));
    } else {
      const apex = [0, 0, p.h];
      B.forEach((_, i) => faces.push([B[i], B[(i + 1) % N], apex]));
    }
    return { faces, zc: p.h / 2, ext: Math.max(2 * p.r, p.h) };
  }
  const LAT = 12, LON = 24;
  const S = (t: number, f: number): V3 => [p.r * Math.sin(t) * Math.cos(f), p.r * Math.sin(t) * Math.sin(f), p.r * Math.cos(t)];
  for (let i = 0; i < LAT; i++) for (let j = 0; j < LON; j++) {
    const t0 = (Math.PI * i) / LAT, t1 = (Math.PI * (i + 1)) / LAT, f0 = (2 * Math.PI * j) / LON, f1 = (2 * Math.PI * (j + 1)) / LON;
    faces.push([S(t0, f0), S(t0, f1), S(t1, f1), S(t1, f0)]);
  }
  return { faces, zc: 0, ext: 2 * p.r };
}

function net(kind: Kind, p: Params): Shape[] {
  const out: Shape[] = [];
  if (kind === 'box') {
    const { a, b, c } = p;
    const R = (x: number, y: number, w: number, h: number, tone: 'base' | 'lat'): Shape => ({ t: 'poly', pts: [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], tone });
    out.push(R(0, 0, a, b, 'base'), R(0, -c, a, c, 'lat'), R(0, b, a, c, 'lat'), R(-c, 0, c, b, 'lat'), R(a, 0, c, b, 'lat'), R(0, -c - b, a, b, 'base'));
  }
  if (kind === 'prism' || kind === 'pyramid') {
    const { n, l, h } = p;
    const Rr = l / (2 * Math.sin(Math.PI / n));
    const ap = l / (2 * Math.tan(Math.PI / n));
    const vert = (i: number) => { const ang = Math.PI / 2 + (2 * Math.PI * i) / n - Math.PI / n; return [Rr * Math.cos(ang), Rr * Math.sin(ang)]; };
    out.push({ t: 'poly', pts: Array.from({ length: n }, (_, i) => vert(i)), tone: 'base' });
    const slant = Math.sqrt(h * h + ap * ap);
    for (let i = 0; i < n; i++) {
      const ph = Math.PI / 2 + (2 * Math.PI * i) / n;
      const u = [Math.cos(ph), Math.sin(ph)];
      const A = vert(i), B = vert(i + 1);
      if (kind === 'prism') out.push({ t: 'poly', pts: [A, B, [B[0] + u[0] * h, B[1] + u[1] * h], [A[0] + u[0] * h, A[1] + u[1] * h]], tone: 'lat' });
      else out.push({ t: 'poly', pts: [A, B, [(ap + slant) * u[0], (ap + slant) * u[1]]], tone: 'lat' });
    }
    if (kind === 'prism') {
      const cy = ap + h + ap;
      out.push({ t: 'poly', pts: Array.from({ length: n }, (_, i) => { const v = vert(i); return [-v[0], cy - v[1]]; }), tone: 'base' });
    }
  }
  if (kind === 'cylinder') {
    const w = 2 * Math.PI * p.r;
    out.push({ t: 'poly', pts: [[0, 0], [w, 0], [w, p.h], [0, p.h]], tone: 'lat' });
    out.push({ t: 'circle', cx: w / 2, cy: -p.r, r: p.r, tone: 'base' });
    out.push({ t: 'circle', cx: w / 2, cy: p.h + p.r, r: p.r, tone: 'base' });
  }
  if (kind === 'cone') {
    const g = Math.hypot(p.r, p.h);
    const th = (2 * Math.PI * p.r) / g;
    out.push({ t: 'sector', cx: 0, cy: 0, r: g, a0: Math.PI / 2 - th / 2, a1: Math.PI / 2 + th / 2, tone: 'lat' });
    out.push({ t: 'circle', cx: 0, cy: g + p.r, r: p.r, tone: 'base' });
  }
  return out;
}

function NetView({ shapes }: { shapes: Shape[] }) {
  const xs: number[] = [], ys: number[] = [];
  shapes.forEach((s) => {
    if (s.t === 'poly') s.pts.forEach(([x, y]) => { xs.push(x); ys.push(y); });
    else { xs.push(s.cx - s.r, s.cx + s.r); ys.push(s.cy - s.r, s.cy + s.r); }
  });
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const W = 560, H = 300, pad = 16;
  const sc = Math.min((W - 2 * pad) / (maxX - minX || 1), (H - 2 * pad) / (maxY - minY || 1));
  const X = (x: number) => pad + (x - minX) * sc + (W - 2 * pad - (maxX - minX) * sc) / 2;
  const Y = (y: number) => pad + (y - minY) * sc + (H - 2 * pad - (maxY - minY) * sc) / 2;
  const col = (t: 'base' | 'lat') => (t === 'base' ? ACCENT : BLUE);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Desarrollo plano">
      {shapes.map((s, i) => {
        if (s.t === 'poly') return <polygon key={i} points={s.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill={col(s.tone)} fillOpacity={0.3} stroke={col(s.tone)} strokeWidth={2} strokeLinejoin="round" />;
        if (s.t === 'circle') return <circle key={i} cx={X(s.cx)} cy={Y(s.cy)} r={s.r * sc} fill={col(s.tone)} fillOpacity={0.3} stroke={col(s.tone)} strokeWidth={2} />;
        const x0 = s.cx + s.r * Math.cos(s.a0), y0 = s.cy + s.r * Math.sin(s.a0), x1 = s.cx + s.r * Math.cos(s.a1), y1 = s.cy + s.r * Math.sin(s.a1);
        return <path key={i} d={`M${X(s.cx)},${Y(s.cy)} L${X(x0)},${Y(y0)} A${s.r * sc},${s.r * sc} 0 ${s.a1 - s.a0 > Math.PI ? 1 : 0} 1 ${X(x1)},${Y(y1)} Z`} fill={col(s.tone)} fillOpacity={0.3} stroke={col(s.tone)} strokeWidth={2} strokeLinejoin="round" />;
      })}
    </svg>
  );
}

export default function SolidsSimulator() {
  const [kind, setKind] = useState<Kind>('box');
  const [p, setP] = useState<Params>({ a: 4, b: 3, c: 5, n: 5, l: 4, h: 6, r: 3 });
  const set = (k: keyof Params) => (v: number) => setP((q) => ({ ...q, [k]: v }));

  const { faces, zc, ext } = build(kind, p);
  const f = 16 / ext;

  const draw = (g: CanvasRenderingContext2D, P: Project) => {
    const lightV = [0.4, -0.5, 0.77];
    const items = faces.map((face) => {
      const w = face.map(([x, y, z]) => [x * f, y * f, (z - zc) * f]);
      const u = [w[1][0] - w[0][0], w[1][1] - w[0][1], w[1][2] - w[0][2]];
      const v = [w[2][0] - w[0][0], w[2][1] - w[0][1], w[2][2] - w[0][2]];
      const nrm = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      const nl = Math.hypot(nrm[0], nrm[1], nrm[2]) || 1;
      const shade = Math.abs((nrm[0] * lightV[0] + nrm[1] * lightV[1] + nrm[2] * lightV[2]) / nl);
      const pr = w.map(([x, y, z]) => P(x, y, z));
      return { pr, d: pr.reduce((s, q) => s + q.d, 0) / pr.length, shade };
    }).sort((m, q) => q.d - m.d);

    const curved = kind === 'cylinder' || kind === 'cone' || kind === 'sphere';
    for (const it of items) {
      g.beginPath();
      it.pr.forEach((q, i) => (i ? g.lineTo(q.x, q.y) : g.moveTo(q.x, q.y)));
      g.closePath();
      g.fillStyle = `rgba(210,86,15,${0.4 + 0.4 * it.shade})`;
      g.fill();
      g.strokeStyle = curved ? 'rgba(120,40,5,0.25)' : 'rgba(120,40,5,0.7)';
      g.lineWidth = curved ? 0.6 : 1.4;
      g.stroke();
    }
  };

  const Ab = (p.n * p.l * (p.l / (2 * Math.tan(Math.PI / p.n)))) / 2;
  const ap = p.l / (2 * Math.tan(Math.PI / p.n));
  const slant = Math.sqrt(p.h * p.h + ap * ap);
  const gen = Math.hypot(p.r, p.h);
  const PI = Math.PI;

  const info: { label: string; tex: string }[] = [];
  if (kind === 'box') {
    const { a, b, c } = p;
    info.push({ label: 'Área lateral', tex: `2c(a+b) = ${fmt(2 * c * (a + b))}` }, { label: 'Área total', tex: `2(ab+ac+bc) = ${fmt(2 * (a * b + a * c + b * c))}` }, { label: 'Volumen', tex: `abc = ${fmt(a * b * c)}` }, { label: 'Diagonal', tex: `\\sqrt{a^2+b^2+c^2} = ${fmt(Math.sqrt(a * a + b * b + c * c))}` });
  }
  if (kind === 'prism') info.push({ label: 'Área de la base', tex: `\\frac{P \\cdot ap}{2} = ${fmt(Ab)}` }, { label: 'Área lateral', tex: `P \\cdot h = ${fmt(p.n * p.l * p.h)}` }, { label: 'Área total', tex: `A_L + 2A_b = ${fmt(p.n * p.l * p.h + 2 * Ab)}` }, { label: 'Volumen', tex: `A_b \\cdot h = ${fmt(Ab * p.h)}` });
  if (kind === 'pyramid') info.push({ label: 'Área de la base', tex: `\\frac{P \\cdot ap}{2} = ${fmt(Ab)}` }, { label: 'Apotema lateral', tex: `\\sqrt{h^2+ap^2} = ${fmt(slant)}` }, { label: 'Área lateral', tex: `\\frac{P \\cdot a_l}{2} = ${fmt((p.n * p.l * slant) / 2)}` }, { label: 'Área total', tex: `${fmt((p.n * p.l * slant) / 2 + Ab)}` }, { label: 'Volumen', tex: `\\frac{A_b \\cdot h}{3} = ${fmt((Ab * p.h) / 3)}` });
  if (kind === 'cylinder') info.push({ label: 'Área lateral', tex: `2\\pi r h = ${fmt(2 * PI * p.r * p.h)}` }, { label: 'Área total', tex: `2\\pi r(r+h) = ${fmt(2 * PI * p.r * (p.r + p.h))}` }, { label: 'Volumen', tex: `\\pi r^2 h = ${fmt(PI * p.r * p.r * p.h)}` });
  if (kind === 'cone') info.push({ label: 'Generatriz', tex: `g=\\sqrt{r^2+h^2} = ${fmt(gen)}` }, { label: 'Área lateral', tex: `\\pi r g = ${fmt(PI * p.r * gen)}` }, { label: 'Área total', tex: `\\pi r(r+g) = ${fmt(PI * p.r * (p.r + gen))}` }, { label: 'Volumen', tex: `\\frac{\\pi r^2 h}{3} = ${fmt((PI * p.r * p.r * p.h) / 3)}` });
  if (kind === 'sphere') info.push({ label: 'Superficie', tex: `4\\pi r^2 = ${fmt(4 * PI * p.r * p.r)}` }, { label: 'Volumen', tex: `\\frac{4}{3}\\pi r^3 = ${fmt((4 / 3) * PI * p.r ** 3)}` });

  const shapes = kind === 'sphere' ? [] : net(kind, p);

  return (
    <div className="space-y-8">
      <Tabs value={kind} onChange={setKind} items={KINDS} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className={`${CARD} sm:p-4`}>
            <Viewer3D draw={draw} label={`Cuerpo geométrico: ${KINDS.find((k) => k.id === kind)?.label}`} />
          </div>
          <div className={`${CARD} sm:p-4`}>
            <p className="text-sm font-black text-slate-900 mb-1">Desarrollo plano</p>
            {kind === 'sphere' ? (
              <p className="text-sm text-slate-500 py-6 text-center">La esfera no se puede desarrollar en el plano sin deformarla (por eso los mapas del mundo distorsionan).</p>
            ) : (
              <>
                <NetView shapes={shapes} />
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1.5"><i className="w-3.5 h-3.5 rounded inline-block" style={{ background: ACCENT, opacity: 0.5 }} /> Bases</span>
                  <span className="inline-flex items-center gap-1.5"><i className="w-3.5 h-3.5 rounded inline-block" style={{ background: BLUE, opacity: 0.5 }} /> Superficie lateral</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className={`${CARD} space-y-4`}>
            {kind === 'box' && (<><Slider label="a" value={p.a} onChange={set('a')} min={1} max={10} step={0.5} /><Slider label="b" value={p.b} onChange={set('b')} min={1} max={10} step={0.5} /><Slider label="c" value={p.c} onChange={set('c')} min={1} max={10} step={0.5} /></>)}
            {(kind === 'prism' || kind === 'pyramid') && (<><Slider label="\text{Lados}" value={p.n} onChange={set('n')} min={3} max={8} step={1} /><Slider label="\ell" value={p.l} onChange={set('l')} min={2} max={8} step={0.5} /><Slider label="h" value={p.h} onChange={set('h')} min={1} max={10} step={0.5} /></>)}
            {(kind === 'cylinder' || kind === 'cone') && (<><Slider label="r" value={p.r} onChange={set('r')} min={1} max={6} step={0.5} /><Slider label="h" value={p.h} onChange={set('h')} min={1} max={10} step={0.5} /></>)}
            {kind === 'sphere' && <Slider label="r" value={p.r} onChange={set('r')} min={1} max={8} step={0.5} />}
          </div>

          <div className={`${CARD} space-y-2 text-sm text-slate-700`}>
            {info.map((i) => (
              <div key={i.label}>
                <p className="text-xs font-bold text-slate-500">{i.label}</p>
                <div className="overflow-x-auto"><MathText text={`$${i.tex}$`} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS} />
    </div>
  );
}