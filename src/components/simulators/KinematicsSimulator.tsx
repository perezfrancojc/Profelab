'use client';

import { useEffect, useRef, useState } from 'react';
import { MathText } from '@/components/Math';
import { BLUE, CARD, GuidedQuestions, Slider, Tabs, fmt } from './shared/ui';

type Mode = 'mru' | 'mrua';
type Car = { x0: number; v0: number; a: number };

const RED = '#dc2626';
const TMAX = 12;
const COLORS = { A: BLUE, B: RED };

const PRESETS: { label: string; mode: Mode; A: Car; B: Car | null }[] = [
  { label: 'Velocidad constante', mode: 'mru', A: { x0: 0, v0: 10, a: 0 }, B: null },
  { label: 'Arranque', mode: 'mrua', A: { x0: 0, v0: 0, a: 3 }, B: null },
  { label: 'Frenado', mode: 'mrua', A: { x0: 0, v0: 24, a: -4 }, B: null },
  { label: 'Cruce de dos coches', mode: 'mru', A: { x0: 0, v0: 12, a: 0 }, B: { x0: 120, v0: -8, a: 0 } },
  { label: 'Persecución', mode: 'mrua', A: { x0: 0, v0: 0, a: 4 }, B: { x0: 40, v0: 10, a: 0 } },
];

const QUESTIONS = [
  { q: 'En MRU, mueve la velocidad. ¿Qué forma tiene la gráfica x-t y qué indica su inclinación?', a: 'Es una recta; su pendiente es la velocidad. Cuanto más inclinada, más rápido va el móvil.' },
  { q: '¿Qué forma tiene la gráfica v-t en un MRU y qué representa el área bajo ella?', a: 'Una recta horizontal. El área bajo la gráfica v-t es el desplazamiento: v · t.' },
  { q: 'Pasa a MRUA con a = 3 m/s². ¿Cómo cambian x-t y v-t?', a: 'x-t pasa a ser una parábola y v-t una recta inclinada, cuya pendiente es la aceleración.' },
  { q: 'Carga "Frenado". ¿Qué le ocurre a la velocidad y cuándo se detiene el coche?', a: 'Disminuye linealmente hasta 0 en t = v₀/|a| = 6 s. Pasado ese instante, las fórmulas ya no valen: un coche real se queda parado, no da marcha atrás.' },
  { q: 'Carga "Cruce de dos coches". ¿Cómo se calcula cuándo se encuentran?', a: 'Se igualan las posiciones x_A = x_B y se resuelve para t. En la gráfica x-t es el punto donde se cortan las dos rectas.' },
  { q: 'En "Persecución", ¿por qué el coche que parte del reposo acaba alcanzando al otro?', a: 'Porque su velocidad crece sin parar con la aceleración; al principio va más lento, pero termina superando al coche de velocidad constante.' },
];

const pos = (c: Car, t: number) => c.x0 + c.v0 * t + 0.5 * c.a * t * t;
const vel = (c: Car, t: number) => c.v0 + c.a * t;

function meetings(A: Car, B: Car): number[] {
  const qa = 0.5 * (A.a - B.a), qb = A.v0 - B.v0, qc = A.x0 - B.x0;
  const out: number[] = [];
  if (Math.abs(qa) < 1e-9) {
    if (Math.abs(qb) > 1e-9) out.push(-qc / qb);
  } else {
    const d = qb * qb - 4 * qa * qc;
    if (d >= 0) out.push((-qb - Math.sqrt(d)) / (2 * qa), (-qb + Math.sqrt(d)) / (2 * qa));
  }
  return out.filter((t) => t >= 0 && t <= TMAX).sort((p, q) => p - q);
}

function niceStep(span: number, n = 6) {
  const raw = span / n;
  const pow = Math.pow(10, Math.floor(Math.log10(Math.max(raw, 1e-9))));
  const m = raw / pow;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * pow;
}

function Graph({
  title, unit, series, t, marks = [],
}: {
  title: string;
  unit: string;
  series: { fn: (t: number) => number; color: string }[];
  t: number;
  marks?: { t: number; y: number }[];
}) {
  const W = 360, H = 190, L = 44, R = 12, T = 22, B = 26;
  const vals: number[] = [0];
  for (let i = 0; i <= 60; i++) series.forEach((s) => vals.push(s.fn((i / 60) * TMAX)));
  let lo = Math.min(...vals), hi = Math.max(...vals);
  if (hi - lo < 1) { hi += 0.5; lo -= 0.5; }
  const pad = (hi - lo) * 0.1;
  lo -= pad; hi += pad;
  const X = (tt: number) => L + (tt / TMAX) * (W - L - R);
  const Y = (v: number) => H - B - ((v - lo) / (hi - lo)) * (H - B - T);
  const step = niceStep(hi - lo, 4);
  const ticks: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) ticks.push(Math.round(v / step) * step);

  return (
    <div className={`${CARD} sm:p-3`}>
      <p className="text-sm font-black text-slate-900">{title} <span className="text-xs font-semibold text-slate-500">({unit})</span></p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Gráfica de ${title}`}>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={L} y1={Y(v)} x2={W - R} y2={Y(v)} stroke="#e2e8f0" />
            <text x={L - 5} y={Y(v) + 4} textAnchor="end" fontSize="10.5" fill="#64748b">{fmt(v)}</text>
          </g>
        ))}
        <line x1={L} y1={Y(0)} x2={W - R} y2={Y(0)} stroke="#475569" strokeWidth={1.3} />
        <line x1={L} y1={T} x2={L} y2={H - B} stroke="#475569" strokeWidth={1.3} />
        {[0, 3, 6, 9, 12].map((tt) => (
          <text key={tt} x={X(tt)} y={H - 8} textAnchor="middle" fontSize="10.5" fill="#64748b">{tt} s</text>
        ))}
        {series.map((s, k) => {
          let d = '';
          for (let i = 0; i <= 120; i++) {
            const tt = (i / 120) * TMAX;
            d += `${i ? 'L' : 'M'}${X(tt).toFixed(1)},${Y(s.fn(tt)).toFixed(1)} `;
          }
          return <path key={k} d={d} fill="none" stroke={s.color} strokeWidth={2.6} strokeLinecap="round" />;
        })}
        <line x1={X(t)} y1={T - 6} x2={X(t)} y2={H - B} stroke="#94a3b8" strokeDasharray="4 4" />
        {series.map((s, k) => (
          <circle key={k} cx={X(t)} cy={Y(s.fn(t))} r={5} fill={s.color} stroke="#fff" strokeWidth={1.5} />
        ))}
        {marks.map((m, k) => (
          <circle key={k} cx={X(m.t)} cy={Y(m.y)} r={7} fill="none" stroke="#0f172a" strokeWidth={2.5} />
        ))}
      </svg>
    </div>
  );
}

export default function KinematicsSimulator() {
  const [mode, setMode] = useState<Mode>('mru');
  const [A, setA] = useState<Car>(PRESETS[0].A);
  const [B, setB] = useState<Car>({ x0: 60, v0: 5, a: 0 });
  const [two, setTwo] = useState(false);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const tRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const next = Math.min(TMAX, tRef.current + (now - last) / 1000);
      last = now;
      tRef.current = next;
      setT(next);
      if (next >= TMAX) { setPlaying(false); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const setTime = (v: number) => { tRef.current = v; setT(v); };
  const togglePlay = () => {
    if (!playing && tRef.current >= TMAX) setTime(0);
    setPlaying((p) => !p);
  };

  const eff = (c: Car): Car => (mode === 'mru' ? { ...c, a: 0 } : c);
  const cA = eff(A), cB = eff(B);

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setMode(p.mode);
    setA(p.A);
    if (p.B) { setB(p.B); setTwo(true); } else setTwo(false);
    setPlaying(false);
    setTime(0);
  };

  // Escena
  const cars = two ? [cA, cB] : [cA];
  const xs: number[] = [];
  cars.forEach((c) => { for (let i = 0; i <= 24; i++) xs.push(pos(c, (i / 24) * TMAX)); });
  let lo = Math.min(...xs), hi = Math.max(...xs);
  if (hi - lo < 20) { hi += 10; lo -= 10; }
  const padS = (hi - lo) * 0.08;
  lo -= padS; hi += padS;
  const SW = 640, SH = 200, SL = 24, SR = 24, roadY = 120;
  const SX = (x: number) => SL + ((x - lo) / (hi - lo)) * (SW - SL - SR);
  const stepS = niceStep(hi - lo, 8);
  const ticksS: number[] = [];
  for (let v = Math.ceil(lo / stepS) * stepS; v <= hi; v += stepS) ticksS.push(Math.round(v / stepS) * stepS);

  const meet = two ? meetings(cA, cB) : [];
  const meetMarks = meet.map((tm) => ({ t: tm, y: pos(cA, tm) }));

  const Car = ({ x, color, label, y }: { x: number; color: string; label: string; y: number }) => (
    <g transform={`translate(${SX(x)} ${y})`}>
      <rect x={-22} y={-22} width={44} height={16} rx={5} fill={color} />
      <rect x={-12} y={-32} width={24} height={13} rx={4} fill={color} opacity={0.85} />
      <rect x={-9} y={-30} width={8} height={9} rx={2} fill="#dbeafe" />
      <rect x={1} y={-30} width={8} height={9} rx={2} fill="#dbeafe" />
      <circle cx={-12} cy={-5} r={6} fill="#1e293b" /><circle cx={12} cy={-5} r={6} fill="#1e293b" />
      <text x={0} y={-38} textAnchor="middle" fontSize="12" fontWeight="800" fill={color}>{label}</text>
    </g>
  );

  const crossed = (c: Car) => mode === 'mrua' && c.a !== 0 && c.v0 * c.a < 0 && -c.v0 / c.a < TMAX && -c.v0 / c.a <= t;

  const eqRow = (c: Car, name: string) => (
    <div className="space-y-1">
      <p className="font-bold" style={{ color: COLORS[name as 'A' | 'B'] }}>{two ? `Coche ${name}` : 'Ecuaciones'}</p>
      <div className="overflow-x-auto"><MathText text={`$x = ${fmt(c.x0)} ${c.v0 < 0 ? '-' : '+'} ${fmt(Math.abs(c.v0))}t${mode === 'mrua' ? ` ${c.a < 0 ? '-' : '+'} ${fmt(Math.abs(c.a) / 2)}t^2` : ''}$`} /></div>
      <div className="overflow-x-auto"><MathText text={`$v = ${fmt(c.v0)} ${c.a < 0 ? '-' : '+'} ${fmt(Math.abs(c.a))}t$`} /></div>
      <p>
        En t = {fmt(t)} s: <MathText text={`$x = ${fmt(pos(c, t))}\\ \\text{m}$`} />, <MathText text={`$v = ${fmt(vel(c, t))}\\ \\text{m/s}$`} />
        {` (${fmt(vel(c, t) * 3.6)} km/h)`}
      </p>
    </div>
  );

  const carControls = (c: Car, set: (c: Car) => void, name: string) => (
    <div className="space-y-3">
      {two && <p className="text-sm font-black" style={{ color: COLORS[name as 'A' | 'B'] }}>Coche {name}</p>}
      <Slider label="x_0" value={c.x0} onChange={(v) => set({ ...c, x0: v })} min={-100} max={200} step={5} unit="m" color={COLORS[name as 'A' | 'B']} />
      <Slider label="v_0" value={c.v0} onChange={(v) => set({ ...c, v0: v })} min={-30} max={40} step={1} unit="m/s" color={COLORS[name as 'A' | 'B']} />
      {mode === 'mrua' && <Slider label="a" value={c.a} onChange={(v) => set({ ...c, a: v })} min={-8} max={8} step={0.5} unit="m/s²" color={COLORS[name as 'A' | 'B']} />}
    </div>
  );

  const dispA = pos(cA, t) - cA.x0;
  const avgV = t > 0 ? dispA / t : cA.v0;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={mode} onChange={setMode} items={[{ id: 'mru', label: 'MRU · velocidad constante' }, { id: 'mrua', label: 'MRUA · con aceleración' }]} />
        <label className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
          <input type="checkbox" checked={two} onChange={(e) => setTwo(e.target.checked)} className="w-4 h-4" style={{ accentColor: BLUE }} />
          Dos móviles
        </label>
      </div>

      <div className={`${CARD} sm:p-4`}>
        <svg viewBox={`0 0 ${SW} ${SH}`} className="w-full h-auto rounded-xl select-none" role="img" aria-label="Coche circulando por una carretera con regla en metros">
          <defs>
            <linearGradient id="kin-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8ec9f5" /><stop offset="1" stopColor="#e6f4fd" /></linearGradient>
          </defs>
          <rect x={0} y={0} width={SW} height={SH} fill="url(#kin-sky)" />
          <rect x={0} y={roadY} width={SW} height={44} fill="#475569" />
          <line x1={0} y1={roadY + 22} x2={SW} y2={roadY + 22} stroke="#fff" strokeWidth={2} strokeDasharray="14 12" />
          <rect x={0} y={roadY + 44} width={SW} height={SH - roadY - 44} fill="#86c166" />
          {ticksS.map((v) => (
            <g key={v}>
              <line x1={SX(v)} y1={roadY} x2={SX(v)} y2={roadY + 8} stroke="#fff" strokeWidth={2} />
              <text x={SX(v)} y={SH - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#14532d">{fmt(v)} m</text>
            </g>
          ))}
          {meet.map((tm) => (
            <g key={tm}>
              <line x1={SX(pos(cA, tm))} y1={30} x2={SX(pos(cA, tm))} y2={roadY + 44} stroke="#0f172a" strokeDasharray="4 4" />
              <text x={SX(pos(cA, tm))} y={24} textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">encuentro</text>
            </g>
          ))}
          <Car x={pos(cA, t)} color={COLORS.A} label={two ? 'A' : ''} y={roadY + 26} />
          {two && <Car x={pos(cB, t)} color={COLORS.B} label="B" y={roadY + 26} />}
        </svg>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="button" onClick={togglePlay} className="text-white font-bold text-sm px-5 py-2.5 rounded-xl transition hover:opacity-90" style={{ backgroundColor: BLUE }}>
            {playing ? 'Pausa' : t >= TMAX ? 'Repetir' : '▶ Reproducir'}
          </button>
          <button type="button" onClick={() => { setPlaying(false); setTime(0); }} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-4 py-2.5 rounded-xl transition">
            Reiniciar
          </button>
          <div className="flex-1 min-w-[200px]">
            <Slider label="t" value={t} onChange={(v) => { setPlaying(false); setTime(v); }} min={0} max={TMAX} step={0.05} unit="s" color={BLUE} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Graph title="Posición" unit="m" t={t} series={[{ fn: (tt) => pos(cA, tt), color: COLORS.A }, ...(two ? [{ fn: (tt: number) => pos(cB, tt), color: COLORS.B }] : [])]} marks={meetMarks} />
        <Graph title="Velocidad" unit="m/s" t={t} series={[{ fn: (tt) => vel(cA, tt), color: COLORS.A }, ...(two ? [{ fn: (tt: number) => vel(cB, tt), color: COLORS.B }] : [])]} />
        <Graph title="Aceleración" unit="m/s²" t={t} series={[{ fn: () => cA.a, color: COLORS.A }, ...(two ? [{ fn: () => cB.a, color: COLORS.B }] : [])]} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`${CARD} space-y-4`}>
          <div>
            <p className="text-xs font-bold text-slate-500 mb-1.5">Ejemplos</p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button key={p.label} type="button" onClick={() => applyPreset(p)} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          {carControls(A, setA, 'A')}
          {two && carControls(B, setB, 'B')}
        </div>

        <div className={`${CARD} space-y-3 text-sm text-slate-700`}>
          {eqRow(cA, 'A')}
          {two && <div className="pt-2 border-t border-slate-100">{eqRow(cB, 'B')}</div>}

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <p><span className="font-bold text-slate-900">Desplazamiento de A: </span><MathText text={`$\\Delta x = ${fmt(dispA)}\\ \\text{m}$`} /></p>
            <p><span className="font-bold text-slate-900">Velocidad media de A: </span>{fmt(avgV)} m/s</p>
          </div>

          {two && (
            <p className="pt-2 border-t border-slate-100 font-semibold" style={{ color: BLUE }}>
              {meet.length
                ? meet.map((tm) => `Se encuentran en t = ${fmt(tm)} s, en x = ${fmt(pos(cA, tm))} m.`).join(' ')
                : `No se encuentran en los ${TMAX} s simulados.`}
            </p>
          )}

          {(crossed(cA) || (two && crossed(cB))) && (
            <p className="text-xs font-semibold text-amber-700">
              La velocidad ha cambiado de signo: el coche invierte el sentido. En un frenado real se detendría y las fórmulas dejarían de valer.
            </p>
          )}
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS} />
    </div>
  );
}