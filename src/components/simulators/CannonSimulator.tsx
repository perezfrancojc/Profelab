'use client';

import { useEffect, useRef, useState } from 'react';
import { MathText } from '@/components/Math';
import { ACCENT, CARD, GuidedQuestions, Slider, Tabs, fmt } from './shared/ui';

type Shot = { v: number; ang: number; y0: number; g: number };

const W = 640, H = 360, ML = 46, MR = 20, MT = 22, MB = 40;
const PLANETS = {
  tierra: { label: 'Tierra', g: 9.8 },
  luna: { label: 'Luna', g: 1.62 },
  marte: { label: 'Marte', g: 3.71 },
} as const;
type Planet = keyof typeof PLANETS;

const STARS = [[60, 40], [130, 90], [210, 30], [300, 70], [380, 28], [470, 60], [540, 36], [600, 100], [260, 120], [90, 150]];

const f3 = (n: number) => {
  const r = Math.round(n * 1000) / 1000;
  return Object.is(r, -0) ? '0' : String(r);
};

function niceStep(span: number) {
  const raw = span / 6;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / pow;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * pow;
}

function calc(s: Shot) {
  const th = (s.ang * Math.PI) / 180;
  const vx = s.v * Math.cos(th);
  const vy = s.v * Math.sin(th);
  const T = (vy + Math.sqrt(vy * vy + 2 * s.g * s.y0)) / s.g;
  const tA = Math.max(0, vy / s.g);
  return { vx, vy, T, range: vx * T, tA, xA: vx * tA, hmax: s.y0 + (vy > 0 ? (vy * vy) / (2 * s.g) : 0) };
}

const at = (s: Shot, t: number) => {
  const th = (s.ang * Math.PI) / 180;
  return { x: s.v * Math.cos(th) * t, y: s.y0 + s.v * Math.sin(th) * t - 0.5 * s.g * t * t };
};

const QUESTIONS = [
  { q: 'Con y₀ = 0 y velocidad fija, prueba 30°, 45° y 60° en la Tierra. ¿Qué ángulo da más alcance?', a: 'El de 45°. Sin altura inicial y sin rozamiento, el alcance máximo se consigue a 45°.' },
  { q: 'Compara 30° y 60° con la misma velocidad. ¿Qué tienen en común y en qué se diferencian?', a: 'Mismo alcance (son ángulos complementarios), pero a 60° llega mucho más alto y tarda más en caer.' },
  { q: 'Duplica la velocidad manteniendo el ángulo. ¿Cuánto crece el alcance?', a: 'Se multiplica por 4: el alcance es proporcional al cuadrado de la velocidad.' },
  { q: 'Haz el mismo disparo en la Tierra y en la Luna. ¿Qué cambia?', a: 'En la Luna la gravedad es unas 6 veces menor: el alcance, la altura y el tiempo de vuelo crecen muchísimo.' },
  { q: 'Sube la torre a 20 m. ¿El mejor ángulo sigue siendo 45°?', a: 'No, baja un poco (por debajo de 45°): al partir desde arriba, un disparo más tendido aprovecha mejor la altura.' },
  { q: 'Mira el coeficiente a de la ecuación al cambiar la velocidad. ¿Qué signo tiene y qué le pasa?', a: 'Siempre es negativo (la parábola se abre hacia abajo). Cuanto mayor es la velocidad, más cerca de 0 está a: parábola más abierta y alcance mayor.' },
  { q: 'Consigue dar en la diana a 120 m con 3 disparos distintos de ángulo y velocidad.', a: 'Hay infinitas combinaciones: sube la velocidad y baja el ángulo o al revés. Cada una es una parábola distinta que pasa por el mismo blanco.' },
];

export default function CannonSimulator() {
  const [v, setV] = useState(25);
  const [ang, setAng] = useState(45);
  const [y0, setY0] = useState(0);
  const [planet, setPlanet] = useState<Planet>('tierra');
  const [target, setTarget] = useState(45);
  const [preview, setPreview] = useState(true);
  const [fast, setFast] = useState(false);

  const [flight, setFlight] = useState<Shot | null>(null);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<Shot[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const targetRef = useRef(target);
  targetRef.current = target;
  const fastRef = useRef(fast);
  fastRef.current = fast;

  const g = PLANETS[planet].g;
  const cur: Shot = { v, ang, y0, g };
  const c = calc(cur);
  const fl = flight ? calc(flight) : null;

  // Escala común (metros -> píxeles)
  const xMax = Math.max(c.range, fl?.range ?? 0, target + 5, 10) * 1.08;
  const yMax = Math.max(c.hmax, fl?.hmax ?? 0, y0, 5) * 1.22;
  const s = Math.min((W - ML - MR) / xMax, (H - MT - MB) / yMax);
  const gy = H - MB;
  const X = (x: number) => ML + x * s;
  const Y = (y: number) => gy - y * s;

  const pathOf = (sh: Shot, tmax?: number) => {
    const cc = calc(sh);
    const T = Math.min(cc.T, tmax ?? cc.T);
    const n = Math.max(2, Math.ceil((70 * T) / cc.T));
    let d = '';
    for (let i = 0; i <= n; i++) {
      const p = at(sh, (T * i) / n);
      d += `${i ? 'L' : 'M'}${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)} `;
    }
    return d;
  };

  const fire = () => {
    if (flight) setHistory((h) => [...h.slice(-2), flight]);
    setFlight(cur);
    setT(0);
    setMsg(null);
    setRunning(true);
  };

  useEffect(() => {
    if (!running || !flight) return;
    const cc = calc(flight);
    let raf = 0;
    let last = performance.now();
    let tt = 0;

    const loop = (now: number) => {
      tt = Math.min(cc.T, tt + ((now - last) / 1000) * (fastRef.current ? 3 : 1));
      last = now;
      setT(tt);
      if (tt >= cc.T) {
        setRunning(false);
        const diff = cc.range - targetRef.current;
        if (Math.abs(diff) <= 2.5) setMsg({ ok: true, text: `¡Diana! Has caído a ${fmt(cc.range)} m del cañón.` });
        else setMsg({ ok: false, text: diff < 0 ? `Te has quedado corto por ${fmt(-diff)} m.` : `Te has pasado por ${fmt(diff)} m.` });
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, flight]);

  const clearShots = () => {
    setHistory([]);
    setFlight(null);
    setT(0);
    setMsg(null);
    setRunning(false);
  };

  const randomTarget = () => setTarget(Math.round(20 + Math.random() * 180));

  // Ecuación y = ax² + bx + c
  const th = (ang * Math.PI) / 180;
  const a = -g / (2 * v * v * Math.cos(th) ** 2);
  const b = Math.tan(th);
  const eq = `y = ${f3(a)}x^2 ${b < 0 ? '-' : '+'} ${f3(Math.abs(b))}x + ${fmt(y0)}`;

  const stepX = niceStep(xMax), stepY = niceStep(yMax);
  const ticksX: number[] = [];
  for (let x = 0; x <= xMax; x += stepX) ticksX.push(Math.round(x / stepX) * stepX);
  const ticksY: number[] = [];
  for (let y = stepY; y <= yMax; y += stepY) ticksY.push(Math.round(y / stepY) * stepY);

  const ball = flight ? at(flight, t) : null;
  const tr = target;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className={`${CARD} sm:p-4 self-start`}>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-xl select-none" role="img" aria-label="Cañón lanzando un proyectil hacia un blanco">
            <defs>
              <linearGradient id="sky-tierra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8ec9f5" /><stop offset="1" stopColor="#e6f4fd" /></linearGradient>
              <linearGradient id="sky-luna" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b1220" /><stop offset="1" stopColor="#334155" /></linearGradient>
              <linearGradient id="sky-marte" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c2410c" /><stop offset="1" stopColor="#fed7aa" /></linearGradient>
              <clipPath id="scene"><rect x={0} y={0} width={W} height={gy} /></clipPath>
            </defs>

            <rect x={0} y={0} width={W} height={H} fill={`url(#sky-${planet})`} />
            {planet === 'tierra' && (
              <>
                <circle cx={W - 70} cy={50} r={22} fill="#fde047" />
                {[[170, 60, 1], [420, 100, 0.8]].map(([cx, cy, sc], i) => (
                  <g key={i} fill="#fff" opacity={0.9} transform={`translate(${cx} ${cy}) scale(${sc})`}>
                    <ellipse cx={0} cy={0} rx={34} ry={12} /><ellipse cx={-14} cy={-8} rx={16} ry={13} /><ellipse cx={10} cy={-12} rx={20} ry={15} />
                  </g>
                ))}
              </>
            )}
            {planet === 'luna' && (
              <>
                {STARS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.6} fill="#fff" opacity={0.8} />)}
                <circle cx={W - 80} cy={60} r={20} fill="#3b82f6" /><circle cx={W - 86} cy={56} r={8} fill="#22c55e" opacity={0.7} />
              </>
            )}
            {planet === 'marte' && <circle cx={W - 70} cy={60} r={16} fill="#fef3c7" opacity={0.9} />}

            {/* Cuadrícula y escalas */}
            {ticksY.map((y) => (
              <g key={`y${y}`}>
                <line x1={ML} y1={Y(y)} x2={W - MR} y2={Y(y)} stroke="#fff" strokeOpacity={0.35} strokeDasharray="3 5" />
                <text x={ML - 6} y={Y(y) + 4} textAnchor="end" fontSize="10.5" fill={planet === 'tierra' ? '#334155' : '#e2e8f0'}>{fmt(y)}</text>
              </g>
            ))}

            {/* Suelo */}
            <rect x={0} y={gy} width={W} height={H - gy} fill={planet === 'tierra' ? '#86c166' : planet === 'luna' ? '#94a3b8' : '#b45309'} />
            <rect x={0} y={gy + 12} width={W} height={H - gy - 12} fill={planet === 'tierra' ? '#8a6a43' : planet === 'luna' ? '#64748b' : '#7c2d12'} />
            {ticksX.map((x) => (
              <g key={`x${x}`}>
                <line x1={X(x)} y1={gy} x2={X(x)} y2={gy + 6} stroke="#fff" strokeWidth={1.5} />
                <text x={X(x)} y={gy + 26} textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">{fmt(x)} m</text>
              </g>
            ))}

            {/* Zona de acierto */}
            <rect x={X(tr - 2.5)} y={gy - 5} width={Math.max(4, 5 * s)} height={5} fill="#22c55e" />

            <g clipPath="url(#scene)">
              {/* Disparos anteriores */}
              {history.map((h, i) => <path key={i} d={pathOf(h)} fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={2} strokeDasharray="3 4" />)}

              {/* Trayectoria prevista */}
              {preview && (
                <>
                  <path d={pathOf(cur)} fill="none" stroke={ACCENT} strokeWidth={2.5} strokeDasharray="7 6" strokeOpacity={0.9} />
                  {c.vy > 0 && (
                    <>
                      <circle cx={X(c.xA)} cy={Y(c.hmax)} r={4.5} fill="#fff" stroke={ACCENT} strokeWidth={2} />
                      <text x={X(c.xA)} y={Y(c.hmax) - 9} textAnchor="middle" fontSize="11" fontWeight="700" fill={planet === 'tierra' ? '#0f172a' : '#fff'}>{fmt(c.hmax)} m</text>
                    </>
                  )}
                  <circle cx={X(c.range)} cy={gy} r={4.5} fill="#fff" stroke={ACCENT} strokeWidth={2} />
                </>
              )}

              {/* Disparo en curso */}
              {flight && <path d={pathOf(flight, t)} fill="none" stroke="#0f172a" strokeWidth={3} strokeLinecap="round" />}
            </g>

            {/* Diana */}
            <line x1={X(tr)} y1={gy} x2={X(tr)} y2={gy - 18} stroke="#78350f" strokeWidth={4} />
            <circle cx={X(tr)} cy={gy - 28} r={15} fill="#fff" stroke="#7f1d1d" strokeWidth={1.5} />
            <circle cx={X(tr)} cy={gy - 28} r={10.5} fill="#dc2626" />
            <circle cx={X(tr)} cy={gy - 28} r={6} fill="#fff" />
            <circle cx={X(tr)} cy={gy - 28} r={2.6} fill="#dc2626" />

            {/* Torre y cañón */}
            {y0 > 0 && <rect x={ML - 18} y={Y(y0)} width={36} height={y0 * s + 1} fill="#94a3b8" stroke="#64748b" strokeWidth={1.5} />}
            <g transform={`translate(${ML} ${Y(y0)}) rotate(${-ang})`}>
              <rect x={-6} y={-7.5} width={44} height={15} rx={5} fill="#334155" />
              <rect x={34} y={-9} width={7} height={18} rx={2} fill="#1e293b" />
            </g>
            <circle cx={ML} cy={Y(y0)} r={11} fill="#1e293b" stroke="#94a3b8" strokeWidth={2} />

            {/* Proyectil */}
            {ball && <circle cx={X(ball.x)} cy={Y(Math.max(0, ball.y))} r={6.5} fill="#0f172a" stroke="#fff" strokeWidth={2} />}
          </svg>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mt-2">
            <span className="inline-flex items-center gap-1.5"><i className="w-5 border-t-2 border-dashed inline-block" style={{ borderColor: ACCENT }} /> Trayectoria prevista</span>
            <span className="inline-flex items-center gap-1.5"><i className="w-5 h-1 rounded bg-slate-900 inline-block" /> Disparo real</span>
            <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1.5 rounded bg-green-500 inline-block" /> Zona de acierto (±2,5 m)</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`${CARD} space-y-4`}>
            <Tabs value={planet} onChange={(p) => { setPlanet(p); }} items={(Object.keys(PLANETS) as Planet[]).map((id) => ({ id, label: `${PLANETS[id].label} · ${PLANETS[id].g}` }))} />
            <Slider label="v_0" value={v} onChange={setV} min={5} max={60} step={1} unit="m/s" />
            <Slider label="\theta" value={ang} onChange={setAng} min={5} max={85} step={1} unit="°" />
            <Slider label="y_0" value={y0} onChange={setY0} min={0} max={30} step={1} unit="m" />
            <Slider label="\text{Blanco}" value={target} onChange={setTarget} min={10} max={300} step={1} unit="m" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-700">
              <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={preview} onChange={(e) => setPreview(e.target.checked)} className="w-4 h-4" style={{ accentColor: ACCENT }} /> Trayectoria prevista</label>
              <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={fast} onChange={(e) => setFast(e.target.checked)} className="w-4 h-4" style={{ accentColor: ACCENT }} /> Cámara rápida ×3</label>
            </div>

            <button type="button" onClick={fire} disabled={running} className="w-full text-white font-bold text-sm py-3 rounded-xl transition hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: ACCENT }}>
              {running ? 'Disparando…' : '¡Disparar!'}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={randomTarget} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2.5 rounded-xl transition">Blanco aleatorio</button>
              <button type="button" onClick={clearShots} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2.5 rounded-xl transition">Borrar disparos</button>
            </div>

            {msg && (
              <p className={`text-sm font-bold rounded-xl px-3 py-2 ${msg.ok ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>{msg.text}</p>
            )}
          </div>

          <div className={`${CARD} space-y-2 text-sm text-slate-700`}>
            <p><span className="font-bold text-slate-900">Alcance: </span>{fmt(c.range)} m</p>
            <p><span className="font-bold text-slate-900">Altura máxima: </span>{fmt(c.hmax)} m</p>
            <p><span className="font-bold text-slate-900">Tiempo de vuelo: </span>{fmt(c.T)} s</p>
            <p><span className="font-bold text-slate-900">Vértice: </span><MathText text={`$(${fmt(c.xA)},\\ ${fmt(c.hmax)})$`} /></p>
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <p className="font-bold text-slate-900">La parábola del disparo</p>
              <div className="overflow-x-auto"><MathText text={`$${eq}$`} /></div>
              <p className="text-xs text-slate-500">
                <MathText text={`$a = -\\frac{g}{2v_0^2\\cos^2\\theta}$`} />, <MathText text={`$b = \\tan\\theta$`} />, <MathText text={`$c = y_0$`} />. El alcance es la raíz positiva de la ecuación y el vértice es el punto más alto.
              </p>
            </div>
          </div>
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS} />
    </div>
  );
}