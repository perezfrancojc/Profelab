'use client';

import { useEffect, useRef, useState } from 'react';
import { MathText } from '@/components/Math';
import { ACCENT, BLUE, CARD, GuidedQuestions, Slider, Tabs, clamp, fmt } from './shared/ui';

type Mode = 'squares' | 'proof' | 'ladder' | 'distance';
type Pt = { x: number; y: number };

const VIOLET = '#7c3aed';
const SIZE = 480;
const TRIPLES = [[3, 4], [6, 8], [5, 12], [9, 12], [8, 15], [12, 16]];

const QUESTIONS: Record<Mode, { q: string; a: string }[]> = {
  squares: [
    { q: 'Pon a = 3 y b = 4. ¿Cuánto vale c y qué tiene de especial?', a: 'c = 5 exacto. Es una terna pitagórica: los tres lados son números enteros y 9 + 16 = 25.' },
    { q: 'Cuenta los cuadraditos de los cuadrados de los catetos. ¿Qué relación hay con el de la hipotenusa?', a: 'El número de cuadraditos de a² más los de b² es igual al área del cuadrado de la hipotenusa.' },
    { q: 'Haz muy pequeño un cateto (b = 1) y grande el otro. ¿Cómo cambia c?', a: 'c se parece cada vez más al cateto grande, pero siempre es mayor que cualquiera de los dos catetos.' },
    { q: 'Prueba con a = 1 y b = 1. ¿Es c un número entero?', a: 'No: c = √2 ≈ 1,41. Es un número irracional; Pitágoras permite construirlo con regla y compás.' },
  ],
  proof: [
    { q: 'Mueve el deslizador de la demostración. ¿Qué no cambia entre las dos figuras?', a: 'El cuadrado grande de lado a + b y los cuatro triángulos. Solo cambia cómo se colocan.' },
    { q: 'Si quitas los 4 triángulos de cada figura, ¿qué queda?', a: 'En una, el cuadrado de lado c. En la otra, los cuadrados de lado a y de lado b. Como el área total es la misma, c² = a² + b².' },
    { q: '¿Funciona la demostración para cualquier a y b?', a: 'Sí. Cambia los valores y comprueba que las piezas siempre encajan: la demostración no depende de los números.' },
  ],
  ladder: [
    { q: 'Con una escalera de 6 m, ¿a qué distancia de la pared debe estar la base?', a: 'Regla 4:1: una cuarta parte de su largo, 1,5 m. Eso da un ángulo de unos 75°, estable y seguro.' },
    { q: 'Acerca la base a la pared hasta que casi sea vertical. ¿Qué riesgo hay?', a: 'Con más de 80° la escalera tiende a volcar hacia atrás.' },
    { q: 'Aleja la base. ¿Qué altura pierdes y qué riesgo aparece?', a: 'Cada vez llegas menos alto y con menos de 70° la base puede resbalar.' },
  ],
  distance: [
    { q: 'Coloca dos puntos en la misma fila. ¿Qué pasa con la distancia?', a: 'Un cateto vale 0 y la distancia es simplemente la diferencia entre las otras coordenadas.' },
    { q: 'Calcula a mano la distancia entre (0,0) y (3,4) y comprueba.', a: 'd = √(3² + 4²) = 5. La distancia entre dos puntos es el teorema de Pitágoras en el plano.' },
    { q: '¿Importa qué punto sea el primero y cuál el segundo?', a: 'No: las diferencias van al cuadrado, así que el signo desaparece y la distancia es la misma.' },
  ],
};

/* ---------- Modo 1: cuadrados sobre los lados ---------- */
function SquaresView({ a, b }: { a: number; b: number }) {
  const minX = -b, maxX = a + b, minY = -a, maxY = a + b;
  const span = Math.max(maxX - minX, maxY - minY);
  const k = (SIZE - 60) / span;
  const ox = SIZE / 2 - ((minX + maxX) / 2) * k;
  const oy = SIZE / 2 + ((minY + maxY) / 2) * k;
  const px = (x: number) => ox + x * k;
  const py = (y: number) => oy - y * k;
  const poly = (pts: number[][]) => pts.map(([x, y]) => `${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(' ');
  const cen = (pts: number[][]) => ({
    x: px(pts.reduce((s, p) => s + p[0], 0) / 4),
    y: py(pts.reduce((s, p) => s + p[1], 0) / 4),
  });

  const sqA = [[0, 0], [a, 0], [a, -a], [0, -a]];
  const sqB = [[0, 0], [0, b], [-b, b], [-b, 0]];
  const sqC = [[a, 0], [0, b], [b, a + b], [a + b, a]];
  const cA = cen(sqA), cB = cen(sqB), cC = cen(sqC);
  const m = Math.min(a, b) * 0.2;

  const lines: React.ReactNode[] = [];
  if (Number.isInteger(a) && a <= 20) {
    for (let i = 1; i < a; i++) {
      lines.push(<line key={`av${i}`} x1={px(i)} y1={py(0)} x2={px(i)} y2={py(-a)} stroke="#fff" strokeOpacity={0.7} />);
      lines.push(<line key={`ah${i}`} x1={px(0)} y1={py(-i)} x2={px(a)} y2={py(-i)} stroke="#fff" strokeOpacity={0.7} />);
    }
  }
  if (Number.isInteger(b) && b <= 20) {
    for (let i = 1; i < b; i++) {
      lines.push(<line key={`bv${i}`} x1={px(-i)} y1={py(0)} x2={px(-i)} y2={py(b)} stroke="#fff" strokeOpacity={0.7} />);
      lines.push(<line key={`bh${i}`} x1={px(-b)} y1={py(i)} x2={px(0)} y2={py(i)} stroke="#fff" strokeOpacity={0.7} />);
    }
  }

  const label = (x: number, y: number, t: string) => (
    <text x={x} y={y} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a" stroke="#fff" strokeWidth={4} paintOrder="stroke">
      {t}
    </text>
  );

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto max-w-[560px] mx-auto select-none" role="img" aria-label="Triángulo rectángulo con los cuadrados de sus lados">
      <polygon points={poly(sqA)} fill={ACCENT} fillOpacity={0.55} stroke={ACCENT} strokeWidth={2} />
      <polygon points={poly(sqB)} fill={BLUE} fillOpacity={0.55} stroke={BLUE} strokeWidth={2} />
      <polygon points={poly(sqC)} fill={VIOLET} fillOpacity={0.5} stroke={VIOLET} strokeWidth={2} />
      {lines}
      <polygon points={poly([[0, 0], [a, 0], [0, b]])} fill="#f1f5f9" stroke="#0f172a" strokeWidth={2.5} strokeLinejoin="round" />
      <polyline points={poly([[m, 0], [m, m], [0, m]])} fill="none" stroke="#0f172a" strokeWidth={1.5} />
      {label(cA.x, cA.y - 2, 'a²')}
      {label(cA.x, cA.y + 16, fmt(a * a))}
      {label(cB.x, cB.y - 2, 'b²')}
      {label(cB.x, cB.y + 16, fmt(b * b))}
      {label(cC.x, cC.y - 2, 'c²')}
      {label(cC.x, cC.y + 16, fmt(a * a + b * b))}
      {label(px(a / 2), py(0) + 4, `a = ${fmt(a)}`)}
      {label(px(0) - 22, py(b / 2), `b = ${fmt(b)}`)}
      {label(px(a / 2) + 22, py(b / 2) - 6, `c = ${fmt(Math.hypot(a, b))}`)}
    </svg>
  );
}

/* ---------- Modo 2: demostración por reordenación ---------- */
type V2 = [number, number];
type Tri = { R: V2; A: V2; B: V2 };

function ProofView({ a, b, t }: { a: number; b: number; t: number }) {
  const s = a + b;
  const k = (SIZE - 40) / s;
  const o = 20;
  const px = (x: number) => o + x * k;
  const py = (y: number) => o + y * k;

  const S: Tri[] = [
    { R: [s, 0], A: [s, a], B: [a, 0] },
    { R: [s, s], A: [b, s], B: [s, a] },
    { R: [0, s], A: [0, b], B: [b, s] },
    { R: [0, 0], A: [a, 0], B: [0, b] },
  ];
  const D: Tri[] = [
    { R: [s, 0], A: [s, a], B: [a, 0] },
    { R: [a, a], A: [a, 0], B: [s, a] },
    { R: [0, a], A: [a, a], B: [0, s] },
    { R: [a, s], A: [0, s], B: [a, a] },
  ];

  const pts = (p: V2[]) => p.map(([x, y]) => `${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(' ');
  const txt = (x: number, y: number, tx: string, op: number, color: string) => (
    <text x={px(x)} y={py(y)} textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="800" fill={color} opacity={op}>
      {tx}
    </text>
  );

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto max-w-[560px] mx-auto select-none" role="img" aria-label="Demostración del teorema de Pitágoras por reordenación">
      <rect x={px(0)} y={py(0)} width={s * k} height={s * k} fill="#fff" stroke="#475569" strokeWidth={2} />

      <polygon points={pts([[a, 0], [s, a], [b, s], [0, b]])} fill={VIOLET} fillOpacity={0.35 * (1 - t)} />
      <rect x={px(0)} y={py(0)} width={a * k} height={a * k} fill={ACCENT} fillOpacity={0.4 * t} />
      <rect x={px(a)} y={py(a)} width={b * k} height={b * k} fill={BLUE} fillOpacity={0.4 * t} />

      {S.map((tri, i) => {
        const d = D[i];
        const th0 = Math.atan2(tri.A[1] - tri.R[1], tri.A[0] - tri.R[0]);
        const th1 = Math.atan2(d.A[1] - d.R[1], d.A[0] - d.R[0]);
        let th = th1 - th0;
        while (th > Math.PI) th -= 2 * Math.PI;
        while (th < -Math.PI) th += 2 * Math.PI;
        const dx = (d.R[0] - tri.R[0]) * t * k;
        const dy = (d.R[1] - tri.R[1]) * t * k;
        const deg = ((th * t) * 180) / Math.PI;
        return (
          <polygon
            key={i}
            points={pts([tri.R, tri.A, tri.B])}
            fill="#e2e8f0"
            stroke="#0f172a"
            strokeWidth={2}
            strokeLinejoin="round"
            transform={`translate(${dx} ${dy}) rotate(${deg} ${px(tri.R[0])} ${py(tri.R[1])})`}
          />
        );
      })}

      {txt(s / 2, s / 2, 'c²', 1 - t, VIOLET)}
      {txt(a / 2, a / 2, 'a²', t, ACCENT)}
      {txt(a + b / 2, a + b / 2, 'b²', t, BLUE)}
    </svg>
  );
}

/* ---------- Modo 3: escalera ---------- */
function LadderView({ L, d }: { L: number; d: number }) {
  const h = Math.sqrt(Math.max(L * L - d * d, 0));
  const k = 30, gy = 330, wx = 60;
  const top = { x: wx, y: gy - h * k };
  const base = { x: wx + d * k, y: gy };
  const t = (x: number, y: number, s: string, anchor: 'middle' | 'start' = 'middle') => (
    <text x={x} y={y} textAnchor={anchor} fontSize="14" fontWeight="700" fill="#0f172a" stroke="#fff" strokeWidth={4} paintOrder="stroke">
      {s}
    </text>
  );

  return (
    <svg viewBox={`0 0 ${SIZE} 360`} className="w-full h-auto max-w-[560px] mx-auto select-none" role="img" aria-label="Escalera apoyada en una pared">
      <rect x={20} y={10} width={40} height={gy - 10} fill="#e2e8f0" />
      <line x1={20} y1={gy} x2={SIZE - 10} y2={gy} stroke="#475569" strokeWidth={3} />
      <polygon points={`${wx},${gy} ${base.x},${gy} ${top.x},${top.y}`} fill="#f1f5f9" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="6 5" />
      <polyline points={`${wx + 14},${gy} ${wx + 14},${gy - 14} ${wx},${gy - 14}`} fill="none" stroke="#475569" strokeWidth={1.5} />
      <line x1={base.x} y1={base.y} x2={top.x} y2={top.y} stroke={ACCENT} strokeWidth={6} strokeLinecap="round" />
      <circle cx={base.x} cy={base.y} r={5} fill="#0f172a" />
      <circle cx={top.x} cy={top.y} r={5} fill="#0f172a" />
      {t((wx + base.x) / 2, gy + 22, `d = ${fmt(d)} m`)}
      {t(wx + 8, (gy + top.y) / 2, `h = ${fmt(h)} m`, 'start')}
      {t((base.x + top.x) / 2 + 28, (base.y + top.y) / 2 - 6, `L = ${fmt(L)} m`)}
    </svg>
  );
}

/* ---------- Modo 4: distancia entre puntos ---------- */
function DistanceView({ P, Q, setP, setQ }: { P: Pt; Q: Pt; setP: (p: Pt) => void; setQ: (p: Pt) => void }) {
  const drag = useRef<'p' | 'q' | null>(null);
  const K = 24, O = SIZE / 2;
  const sx = (x: number) => O + x * K;
  const sy = (y: number) => O - y * K;

  const pos = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * SIZE, y: ((e.clientY - r.top) / r.height) * SIZE };
  };

  const move = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    const p = pos(e);
    const v = { x: clamp(Math.round((p.x - O) / K), -9, 9), y: clamp(Math.round((O - p.y) / K), -9, 9) };
    (drag.current === 'p' ? setP : setQ)(v);
  };

  const down = (e: React.PointerEvent<SVGSVGElement>) => {
    const p = pos(e);
    const dp = Math.hypot(p.x - sx(P.x), p.y - sy(P.y));
    const dq = Math.hypot(p.x - sx(Q.x), p.y - sy(Q.y));
    drag.current = dp <= dq ? 'p' : 'q';
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e);
  };

  const dx = Math.abs(Q.x - P.x), dy = Math.abs(Q.y - P.y);
  const corner = { x: Q.x, y: P.y };
  const t = (x: number, y: number, s: string) => (
    <text x={x} y={y} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a" stroke="#fff" strokeWidth={4} paintOrder="stroke">
      {s}
    </text>
  );

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full h-auto max-w-[560px] mx-auto select-none cursor-pointer rounded-xl bg-white"
      style={{ touchAction: 'none' }}
      role="img"
      aria-label="Plano con dos puntos arrastrables"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
    >
      {Array.from({ length: 21 }).map((_, i) => (
        <g key={i}>
          <line x1={sx(i - 10)} y1={0} x2={sx(i - 10)} y2={SIZE} stroke="#e2e8f0" />
          <line x1={0} y1={sy(i - 10)} x2={SIZE} y2={sy(i - 10)} stroke="#e2e8f0" />
        </g>
      ))}
      <line x1={0} y1={O} x2={SIZE} y2={O} stroke="#475569" strokeWidth={1.5} />
      <line x1={O} y1={0} x2={O} y2={SIZE} stroke="#475569" strokeWidth={1.5} />
      {[-5, 5].map((n) => (
        <g key={n} fontSize="11" fill="#64748b">
          <text x={sx(n)} y={O + 14} textAnchor="middle">{n}</text>
          <text x={O + 6} y={sy(n) + 4}>{n}</text>
        </g>
      ))}

      <polygon points={`${sx(P.x)},${sy(P.y)} ${sx(corner.x)},${sy(corner.y)} ${sx(Q.x)},${sy(Q.y)}`} fill={ACCENT} fillOpacity={0.1} />
      <line x1={sx(P.x)} y1={sy(P.y)} x2={sx(corner.x)} y2={sy(corner.y)} stroke={BLUE} strokeWidth={3} strokeDasharray="6 4" />
      <line x1={sx(corner.x)} y1={sy(corner.y)} x2={sx(Q.x)} y2={sy(Q.y)} stroke={BLUE} strokeWidth={3} strokeDasharray="6 4" />
      <line x1={sx(P.x)} y1={sy(P.y)} x2={sx(Q.x)} y2={sy(Q.y)} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />

      {dx > 0 && t((sx(P.x) + sx(corner.x)) / 2, sy(P.y) + (Q.y >= P.y ? 18 : -10), `${dx}`)}
      {dy > 0 && t(sx(corner.x) + (Q.x >= P.x ? 14 : -14), (sy(corner.y) + sy(Q.y)) / 2 + 4, `${dy}`)}

      <circle cx={sx(P.x)} cy={sy(P.y)} r={10} fill="#fff" stroke="#0f172a" strokeWidth={3} />
      <circle cx={sx(Q.x)} cy={sy(Q.y)} r={10} fill="#0f172a" stroke="#fff" strokeWidth={3} />
      {t(sx(P.x), sy(P.y) - 16, `P(${P.x}, ${P.y})`)}
      {t(sx(Q.x), sy(Q.y) - 16, `Q(${Q.x}, ${Q.y})`)}
    </svg>
  );
}

/* ---------- Componente principal ---------- */
export default function PythagorasSimulator() {
  const [mode, setMode] = useState<Mode>('squares');
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);

  const [t, setT] = useState(0);
  const tRef = useRef(0);
  const [target, setTarget] = useState<0 | 1 | null>(null);

  const [L, setL] = useState(6);
  const [dRaw, setD] = useState(2);
  const d = Math.min(dRaw, L - 0.1);

  const [P, setP] = useState<Pt>({ x: -4, y: -2 });
  const [Q, setQ] = useState<Pt>({ x: 4, y: 4 });

  useEffect(() => {
    if (target === null) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1800;
      last = now;
      const cur = tRef.current;
      const next = target === 1 ? Math.min(1, cur + dt) : Math.max(0, cur - dt);
      tRef.current = next;
      setT(next);
      if (next === target) {
        setTarget(null);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const c = Math.hypot(a, b);
  const isTriple = Number.isInteger(a) && Number.isInteger(b) && Math.abs(c - Math.round(c)) < 1e-9;

  const h = Math.sqrt(Math.max(L * L - d * d, 0));
  const angle = (Math.atan2(h, d) * 180) / Math.PI;
  const ladderMsg =
    angle < 70
      ? 'Demasiado tendida: la base puede resbalar.'
      : angle > 80
      ? 'Demasiado vertical: puede volcar hacia atrás.'
      : 'Ángulo seguro (entre 70° y 80°).';

  const dxx = Math.abs(Q.x - P.x), dyy = Math.abs(Q.y - P.y);
  const dist = Math.hypot(dxx, dyy);

  const ab = (
    <>
      <Slider label="a" value={a} onChange={setA} min={1} max={20} step={0.5} />
      <Slider label="b" value={b} onChange={setB} min={1} max={20} step={0.5} />
      <div>
        <p className="text-xs font-bold text-slate-500 mb-1.5">Ternas pitagóricas</p>
        <div className="flex flex-wrap gap-1.5">
          {TRIPLES.map(([x, y]) => (
            <button
              key={`${x}-${y}`}
              type="button"
              onClick={() => { setA(x); setB(y); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                a === x && b === y ? 'text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              style={a === x && b === y ? { backgroundColor: ACCENT } : undefined}
            >
              {x}, {y}, {Math.round(Math.hypot(x, y))}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-8">
      <Tabs
        value={mode}
        onChange={setMode}
        items={[
          { id: 'squares', label: 'Cuadrados' },
          { id: 'proof', label: 'Demostración' },
          { id: 'ladder', label: 'Escalera' },
          { id: 'distance', label: 'Distancia' },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className={`${CARD} sm:p-4`}>
          {mode === 'squares' && <SquaresView a={a} b={b} />}
          {mode === 'proof' && <ProofView a={a} b={b} t={t} />}
          {mode === 'ladder' && <LadderView L={L} d={d} />}
          {mode === 'distance' && <DistanceView P={P} Q={Q} setP={setP} setQ={setQ} />}
          {mode === 'squares' && (
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Si a y b son enteros, los cuadrados muestran su cuadrícula unitaria: cuenta los cuadraditos.
            </p>
          )}
          {mode === 'distance' && (
            <p className="text-[11px] text-slate-500 text-center mt-2">Arrastra los puntos P y Q (se ajustan a la cuadrícula).</p>
          )}
        </div>

        <div className="space-y-4">
          <div className={`${CARD} space-y-5`}>
            {(mode === 'squares' || mode === 'proof') && ab}

            {mode === 'proof' && (
              <>
                <Slider label="\text{Reordenar}" value={Math.round(t * 100)} onChange={(v) => { setTarget(null); tRef.current = v / 100; setT(v / 100); }} min={0} max={100} step={1} unit="%" />
                <button
                  type="button"
                  onClick={() => setTarget(t < 0.5 ? 1 : 0)}
                  className="w-full text-white font-semibold text-sm py-2.5 rounded-xl transition hover:opacity-90"
                  style={{ backgroundColor: ACCENT }}
                >
                  {t < 0.5 ? 'Animar reordenación' : 'Volver a la figura inicial'}
                </button>
              </>
            )}

            {mode === 'ladder' && (
              <>
                <Slider label="L" value={L} onChange={setL} min={2} max={10} step={0.5} unit="m" />
                <Slider label="d" value={d} onChange={setD} min={0.2} max={Math.max(L - 0.1, 0.3)} step={0.1} unit="m" />
                <button
                  type="button"
                  onClick={() => setD(L / 4)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2.5 rounded-xl transition"
                >
                  Colocar a la distancia segura (L/4)
                </button>
              </>
            )}

            {mode === 'distance' && (
              <button
                type="button"
                onClick={() => { setP({ x: -4, y: -2 }); setQ({ x: 4, y: 4 }); }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2.5 rounded-xl transition"
              >
                Restablecer puntos
              </button>
            )}
          </div>

          <div className={`${CARD} space-y-2 text-sm text-slate-700`}>
            {mode === 'squares' && (
              <>
                <p><MathText text={`$a^2 + b^2 = ${fmt(a * a)} + ${fmt(b * b)} = ${fmt(a * a + b * b)}$`} /></p>
                <p><MathText text={`$c = \\sqrt{${fmt(a * a + b * b)}} = ${fmt(c)}$`} /></p>
                <p className="font-semibold" style={{ color: ACCENT }}>
                  {isTriple ? '¡Terna pitagórica! Los tres lados son enteros.' : 'Los tres cuadrados cumplen a² + b² = c².'}
                </p>
              </>
            )}
            {mode === 'proof' && (
              <>
                <p>El cuadrado grande tiene lado <MathText text="$a+b$" /> en las dos figuras, y contiene 4 triángulos iguales.</p>
                <p>Quitando los triángulos: <MathText text="$c^2 = a^2 + b^2$" />.</p>
                <p className="font-semibold" style={{ color: ACCENT }}>Lado del cuadrado grande: {fmt(a + b)}</p>
              </>
            )}
            {mode === 'ladder' && (
              <>
                <p><MathText text={`$h = \\sqrt{L^2 - d^2} = \\sqrt{${fmt(L * L)} - ${fmt(d * d)}} = ${fmt(h)}\\ \\text{m}$`} /></p>
                <p><span className="font-bold text-slate-900">Ángulo con el suelo: </span>{fmt(angle)}°</p>
                <p className="font-semibold" style={{ color: ACCENT }}>{ladderMsg}</p>
              </>
            )}
            {mode === 'distance' && (
              <>
                <p><MathText text={`$\\Delta x = ${dxx},\\quad \\Delta y = ${dyy}$`} /></p>
                <p><MathText text={`$d = \\sqrt{${dxx}^2 + ${dyy}^2} = \\sqrt{${dxx * dxx + dyy * dyy}} \\approx ${fmt(dist)}$`} /></p>
                <p className="font-semibold" style={{ color: ACCENT }}>La distancia es la hipotenusa del triángulo azul.</p>
              </>
            )}
          </div>
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS[mode]} />
    </div>
  );
}