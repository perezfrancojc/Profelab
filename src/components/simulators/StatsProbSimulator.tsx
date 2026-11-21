'use client';

import { useMemo, useState } from 'react';
import { MathText } from '@/components/Math';
import { ACCENT, BLUE, CARD, GuidedQuestions, Slider, Tabs, fmt } from './shared/ui';

type Tab = 'stats' | 'prob';
type Exp = 'coin' | 'die' | 'dice2';

const VIOLET = '#7c3aed';
const MAX_DATA = 80;
const MAX_THROWS = 20000;

/* ---------------- ESTADÍSTICA ---------------- */
const PRESETS: { label: string; text: string }[] = [
  { label: 'Notas de un examen', text: '5 7 6 8 9 4 6 7 5 10 3 6 7 8 6' },
  { label: 'Hermanos por alumno', text: '0 1 1 1 2 2 2 2 3 1 1 0 2 1 4' },
  { label: 'Con un valor atípico', text: '5 6 6 7 7 7 8 8 9 40' },
];

function parseData(text: string): number[] {
  const norm = text.replace(/,\s+/g, ' ').replace(/,/g, '.');
  return norm
    .split(/[;\s]+/)
    .map((t) => parseFloat(t))
    .filter((v) => Number.isFinite(v))
    .slice(0, MAX_DATA);
}

const medianOf = (s: number[]) => {
  const n = s.length;
  if (n === 0) return 0;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};

function analyze(data: number[]) {
  const n = data.length;
  if (n === 0) return null;
  const s = [...data].sort((a, b) => a - b);
  const sum = s.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const median = medianOf(s);
  const q1 = medianOf(s.slice(0, Math.floor(n / 2)));
  const q3 = medianOf(s.slice(Math.ceil(n / 2)));
  const variance = s.reduce((a, v) => a + (v - mean) ** 2, 0) / n;
  const sd = Math.sqrt(variance);

  const freq = new Map<number, number>();
  s.forEach((v) => freq.set(v, (freq.get(v) || 0) + 1));
  const maxF = Math.max(...freq.values());
  const modes = maxF === 1 ? [] : [...freq.entries()].filter(([, f]) => f === maxF).map(([v]) => v);

  const iqr = q3 - q1;
  const lo = q1 - 1.5 * iqr, hi = q3 + 1.5 * iqr;
  const outliers = s.filter((v) => v < lo || v > hi);
  const inside = s.filter((v) => v >= lo && v <= hi);

  return {
    s, n, mean, median, q1, q3, variance, sd, modes, maxF,
    min: s[0], max: s[n - 1], range: s[n - 1] - s[0],
    outliers, wLo: inside[0] ?? s[0], wHi: inside[inside.length - 1] ?? s[n - 1],
  };
}

function Histogram({ data, bins, st }: { data: number[]; bins: number; st: NonNullable<ReturnType<typeof analyze>> }) {
  const W = 520, H = 250, L = 38, R = 14, T = 16, B = 34;
  const lo = st.min, hi = st.max === st.min ? st.min + 1 : st.max;
  const w = (hi - lo) / bins;
  const counts = Array(bins).fill(0) as number[];
  data.forEach((v) => {
    const i = Math.min(bins - 1, Math.floor((v - lo) / w));
    counts[i]++;
  });
  const maxC = Math.max(...counts, 1);
  const xs = (v: number) => L + ((v - lo) / (hi - lo)) * (W - L - R);
  const ys = (c: number) => H - B - (c / maxC) * (H - B - T);
  const yTicks = Array.from({ length: Math.min(maxC, 5) + 1 }, (_, i) => Math.round((i * maxC) / Math.min(maxC, 5)));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Histograma de los datos">
      {[...new Set(yTicks)].map((t) => (
        <g key={t}>
          <line x1={L} y1={ys(t)} x2={W - R} y2={ys(t)} stroke="#e2e8f0" />
          <text x={L - 6} y={ys(t) + 4} textAnchor="end" fontSize="11" fill="#64748b">{t}</text>
        </g>
      ))}
      {counts.map((c, i) => (
        <g key={i}>
          <rect x={xs(lo + i * w) + 1} y={ys(c)} width={Math.max(0, xs(lo + (i + 1) * w) - xs(lo + i * w) - 2)} height={H - B - ys(c)} fill={ACCENT} fillOpacity={0.75} rx={2} />
          {c > 0 && <text x={(xs(lo + i * w) + xs(lo + (i + 1) * w)) / 2} y={ys(c) - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">{c}</text>}
        </g>
      ))}
      <line x1={L} y1={H - B} x2={W - R} y2={H - B} stroke="#475569" strokeWidth={1.5} />
      {Array.from({ length: bins + 1 }, (_, i) => (
        <text key={i} x={xs(lo + i * w)} y={H - B + 16} textAnchor="middle" fontSize="10.5" fill="#64748b">{fmt(lo + i * w)}</text>
      ))}

      <line x1={xs(st.mean)} y1={T - 4} x2={xs(st.mean)} y2={H - B} stroke="#0f172a" strokeWidth={2.5} />
      <line x1={xs(st.median)} y1={T - 4} x2={xs(st.median)} y2={H - B} stroke={BLUE} strokeWidth={2.5} strokeDasharray="6 4" />
      <text x={xs(st.mean)} y={10} textAnchor={st.mean > st.median ? 'start' : 'end'} dx={st.mean > st.median ? 4 : -4} fontSize="11" fontWeight="700" fill="#0f172a">media</text>
      <text x={xs(st.median)} y={10} textAnchor={st.mean > st.median ? 'end' : 'start'} dx={st.mean > st.median ? -4 : 4} fontSize="11" fontWeight="700" fill={BLUE}>mediana</text>
    </svg>
  );
}

function BoxPlot({ st }: { st: NonNullable<ReturnType<typeof analyze>> }) {
  const W = 520, H = 92, L = 38, R = 14;
  const lo = st.min, hi = st.max === st.min ? st.min + 1 : st.max;
  const xs = (v: number) => L + ((v - lo) / (hi - lo)) * (W - L - R);
  const y = 40;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Diagrama de caja">
      <line x1={xs(st.wLo)} y1={y} x2={xs(st.q1)} y2={y} stroke="#475569" strokeWidth={2} />
      <line x1={xs(st.q3)} y1={y} x2={xs(st.wHi)} y2={y} stroke="#475569" strokeWidth={2} />
      <line x1={xs(st.wLo)} y1={y - 9} x2={xs(st.wLo)} y2={y + 9} stroke="#475569" strokeWidth={2} />
      <line x1={xs(st.wHi)} y1={y - 9} x2={xs(st.wHi)} y2={y + 9} stroke="#475569" strokeWidth={2} />
      <rect x={xs(st.q1)} y={y - 18} width={Math.max(2, xs(st.q3) - xs(st.q1))} height={36} fill={BLUE} fillOpacity={0.2} stroke={BLUE} strokeWidth={2} rx={3} />
      <line x1={xs(st.median)} y1={y - 18} x2={xs(st.median)} y2={y + 18} stroke={BLUE} strokeWidth={3} />
      {st.outliers.map((v, i) => (
        <circle key={i} cx={xs(v)} cy={y} r={5} fill="#fff" stroke="#dc2626" strokeWidth={2.5} />
      ))}
      {[['Q1', st.q1], ['Me', st.median], ['Q3', st.q3]].map(([t, v]) => (
        <text key={t as string} x={xs(v as number)} y={y + 34} textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">{t as string}</text>
      ))}
    </svg>
  );
}

/* ---------------- PROBABILIDAD ---------------- */
const EXPS: Record<Exp, { label: string; outcomes: string[]; probs: number[]; roll: () => number; tex: string[] }> = {
  coin: {
    label: 'Moneda',
    outcomes: ['Cara', 'Cruz'],
    probs: [0.5, 0.5],
    roll: () => (Math.random() < 0.5 ? 0 : 1),
    tex: ['\\frac{1}{2}', '\\frac{1}{2}'],
  },
  die: {
    label: 'Dado',
    outcomes: ['1', '2', '3', '4', '5', '6'],
    probs: Array(6).fill(1 / 6),
    roll: () => Math.floor(Math.random() * 6),
    tex: Array(6).fill('\\frac{1}{6}'),
  },
  dice2: {
    label: 'Suma de dos dados',
    outcomes: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    probs: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((c) => c / 36),
    roll: () => Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6),
    tex: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((c) => `\\frac{${c}}{36}`),
  },
};

const STATS_Q = [
  { q: 'Carga "Con un valor atípico". ¿Qué medida se dispara y cuál casi no se mueve?', a: 'La media sube mucho por el valor 40; la mediana apenas cambia. Por eso la mediana es más robusta ante valores extremos.' },
  { q: 'Añade el dato 100 a las notas. ¿Qué ocurre con la media y la mediana?', a: 'La media se desplaza hacia el dato extremo y la mediana casi no se mueve. En el diagrama de caja el 100 aparece como punto aislado (atípico).' },
  { q: 'Cambia el número de intervalos del histograma. ¿Cambian los datos?', a: 'No, solo cómo los agrupamos. Pocos intervalos ocultan detalles; demasiados dejan barras casi vacías.' },
  { q: 'Mira la moda en "Hermanos por alumno". ¿Puede haber más de una?', a: 'Sí. Si varios valores se repiten el máximo de veces, hay varias modas. Si ningún valor se repite, no hay moda.' },
  { q: '¿Qué mide la desviación típica? Prueba con datos muy iguales y muy dispersos.', a: 'Cuánto se alejan los datos de la media, en promedio. Con datos casi iguales es pequeña; con datos muy repartidos, grande.' },
];

const PROB_Q = [
  { q: 'Lanza la moneda 10 veces y luego 1000. ¿Qué frecuencia de caras sale en cada caso?', a: 'Con pocas tiradas puede alejarse mucho de 0,5; con muchas se acerca. Es la ley de los grandes números.' },
  { q: 'Con un dado, ¿puede salir seis veces seguidas el mismo número? ¿Eso rompe la probabilidad?', a: 'Puede pasar y no la rompe: los lanzamientos son independientes y la frecuencia se estabiliza a largo plazo, no en rachas cortas.' },
  { q: 'En la suma de dos dados, ¿qué resultado sale más veces y por qué?', a: 'El 7: hay 6 formas de obtenerlo de 36 (1+6, 2+5, 3+4...), mientras que el 2 o el 12 solo tienen 1.' },
  { q: 'Tras salir 5 caras seguidas, ¿es más probable cruz en la siguiente?', a: 'No. La moneda no tiene memoria: sigue siendo 1/2. Pensar lo contrario es la falacia del jugador.' },
];

function Probability() {
  const [exp, setExp] = useState<Exp>('coin');
  const [results, setResults] = useState<number[]>([]);
  const [track, setTrack] = useState(0);

  const E = EXPS[exp];
  const total = results.length;

  const counts = useMemo(() => {
    const c = Array(E.outcomes.length).fill(0) as number[];
    results.forEach((r) => c[r]++);
    return c;
  }, [results, E]);

  const throwMany = (k: number) =>
    setResults((prev) => {
      const room = Math.max(0, MAX_THROWS - prev.length);
      const add = Array.from({ length: Math.min(k, room) }, () => E.roll());
      return [...prev, ...add];
    });

  const changeExp = (v: Exp) => {
    setExp(v);
    setResults([]);
    setTrack(v === 'dice2' ? 5 : 0);
  };

  const pTrack = E.probs[track];
  const conv = useMemo(() => {
    const pts: [number, number][] = [];
    let c = 0;
    const step = Math.max(1, Math.floor(results.length / 500));
    results.forEach((r, i) => {
      if (r === track) c++;
      if ((i + 1) % step === 0 || i === results.length - 1) pts.push([i + 1, c / (i + 1)]);
    });
    return pts;
  }, [results, track]);

  const BW = 520, BH = 230, L = 38, R = 12, T = 14, B = 34;
  const k = E.outcomes.length;
  const slot = (BW - L - R) / k;
  const yMaxB = Math.min(1, Math.max(...E.probs, ...counts.map((c) => (total ? c / total : 0))) * 1.25 + 0.02);
  const yb = (v: number) => BH - B - (v / yMaxB) * (BH - B - T);

  const CW = 520, CH = 220, cL = 38, cR = 12, cT = 12, cB = 28;
  const N = Math.max(total, 10);
  const xc = (n: number) => cL + (n / N) * (CW - cL - cR);
  const yc = (v: number) => CH - cB - v * (CH - cB - cT);
  const path = conv.map(([n, f], i) => `${i === 0 ? 'M' : 'L'}${xc(n).toFixed(1)},${yc(f).toFixed(1)}`).join(' ');

  const obsFreq = total ? counts[track] / total : 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <div className={`${CARD} sm:p-4`}>
            <p className="text-sm font-black text-slate-900 mb-1">Frecuencia observada y teórica</p>
            <svg viewBox={`0 0 ${BW} ${BH}`} className="w-full h-auto" role="img" aria-label="Frecuencias relativas observadas y probabilidad teórica">
              {[0, 0.25, 0.5, 0.75, 1].filter((t) => t <= yMaxB + 0.01).map((t) => (
                <g key={t}>
                  <line x1={L} y1={yb(t)} x2={BW - R} y2={yb(t)} stroke="#e2e8f0" />
                  <text x={L - 6} y={yb(t) + 4} textAnchor="end" fontSize="11" fill="#64748b">{t}</text>
                </g>
              ))}
              {E.outcomes.map((label, i) => {
                const f = total ? counts[i] / total : 0;
                const x = L + i * slot;
                const bw = Math.min(46, slot * 0.6);
                const cx = x + slot / 2;
                return (
                  <g key={label} onClick={() => setTrack(i)} style={{ cursor: 'pointer' }}>
                    <rect x={cx - bw / 2} y={yb(f)} width={bw} height={Math.max(0, BH - B - yb(f))} fill={i === track ? ACCENT : BLUE} fillOpacity={i === track ? 0.85 : 0.55} rx={3} />
                    <line x1={cx - bw / 2 - 5} y1={yb(E.probs[i])} x2={cx + bw / 2 + 5} y2={yb(E.probs[i])} stroke="#0f172a" strokeWidth={2.5} />
                    <text x={cx} y={BH - B + 16} textAnchor="middle" fontSize="12" fontWeight={i === track ? 800 : 600} fill={i === track ? ACCENT : '#334155'}>{label}</text>
                    {total > 0 && k <= 6 && <text x={cx} y={yb(f) - 5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">{fmt(f * 100)}%</text>}
                  </g>
                );
              })}
              <line x1={L} y1={BH - B} x2={BW - R} y2={BH - B} stroke="#475569" strokeWidth={1.5} />
            </svg>
            <p className="text-[11px] text-slate-500 text-center">Barras: lo observado · Raya negra: probabilidad teórica · Pulsa un resultado para seguirlo en la gráfica de abajo.</p>
          </div>

          <div className={`${CARD} sm:p-4`}>
            <p className="text-sm font-black text-slate-900 mb-1">
              Convergencia de «{E.outcomes[track]}»
            </p>
            <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Frecuencia relativa acumulada frente al número de lanzamientos">
              {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                <g key={t}>
                  <line x1={cL} y1={yc(t)} x2={CW - cR} y2={yc(t)} stroke="#e2e8f0" />
                  <text x={cL - 6} y={yc(t) + 4} textAnchor="end" fontSize="11" fill="#64748b">{t}</text>
                </g>
              ))}
              <line x1={cL} y1={yc(pTrack)} x2={CW - cR} y2={yc(pTrack)} stroke="#0f172a" strokeWidth={2} strokeDasharray="7 5" />
              <text x={CW - cR} y={yc(pTrack) - 6} textAnchor="end" fontSize="11" fontWeight="700" fill="#0f172a">teórica = {fmt(pTrack)}</text>
              {path && <path d={path} fill="none" stroke={ACCENT} strokeWidth={2.5} strokeLinejoin="round" />}
              <line x1={cL} y1={CH - cB} x2={CW - cR} y2={CH - cB} stroke="#475569" strokeWidth={1.5} />
              {[0, 0.5, 1].map((f) => (
                <text key={f} x={xc(f * N)} y={CH - 8} textAnchor={f === 0 ? 'start' : f === 1 ? 'end' : 'middle'} fontSize="11" fill="#64748b">{Math.round(f * N)}</text>
              ))}
              <text x={(cL + CW - cR) / 2} y={CH - 8} textAnchor="middle" fontSize="0" />
            </svg>
            <p className="text-[11px] text-slate-500 text-center">Eje horizontal: número de lanzamientos.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`${CARD} space-y-4`}>
            <Tabs value={exp} onChange={changeExp} items={(Object.keys(EXPS) as Exp[]).map((id) => ({ id, label: EXPS[id].label }))} />
            <div className="grid grid-cols-2 gap-2">
              {[1, 10, 100, 1000].map((n) => (
                <button key={n} type="button" onClick={() => throwMany(n)} disabled={total >= MAX_THROWS} className="text-white font-semibold text-sm py-2.5 rounded-xl transition hover:opacity-90 disabled:opacity-40" style={{ backgroundColor: ACCENT }}>
                  Lanzar {n === 1 ? '1 vez' : `${n}`}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setResults([])} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2.5 rounded-xl transition">
              Reiniciar
            </button>
            {total >= MAX_THROWS && <p className="text-xs text-slate-500">Máximo de {MAX_THROWS} lanzamientos. Reinicia para seguir.</p>}
          </div>

          <div className={`${CARD} space-y-2 text-sm text-slate-700`}>
            <p><span className="font-bold text-slate-900">Lanzamientos: </span>{total}</p>
            <p>
              <span className="font-bold" style={{ color: ACCENT }}>Seguimos «{E.outcomes[track]}»: </span>
              {total ? <MathText text={`$f = \\frac{${counts[track]}}{${total}} = ${fmt(obsFreq)}$`} /> : 'lanza para empezar'}
            </p>
            <p><span className="font-bold text-slate-900">Probabilidad teórica: </span><MathText text={`$P = ${E.tex[track]} = ${fmt(pTrack)}$`} /></p>
            {total > 0 && (
              <p className="font-semibold" style={{ color: ACCENT }}>
                Diferencia: {fmt(Math.abs(obsFreq - pTrack) * 100)} puntos porcentuales.
              </p>
            )}
            <p className="text-xs text-slate-500 pt-1 border-t border-slate-100">
              Regla de Laplace: casos favorables entre casos posibles, cuando todos son igual de probables.
            </p>
          </div>
        </div>
      </div>
      <GuidedQuestions items={PROB_Q} />
    </div>
  );
}

/* ---------------- Principal ---------------- */
export default function StatsProbSimulator() {
  const [tab, setTab] = useState<Tab>('stats');
  const [text, setText] = useState(PRESETS[0].text);
  const [bins, setBins] = useState(6);
  const [extra, setExtra] = useState('');

  const data = useMemo(() => parseData(text), [text]);
  const st = useMemo(() => analyze(data), [data]);

  const addValue = () => {
    const v = parseFloat(extra.replace(',', '.'));
    if (!Number.isFinite(v) || data.length >= MAX_DATA) return;
    setText((t) => `${t.trim()} ${v}`.trim());
    setExtra('');
  };

  return (
    <div className="space-y-8">
      <Tabs value={tab} onChange={setTab} items={[{ id: 'stats', label: 'Estadística' }, { id: 'prob', label: 'Probabilidad' }]} />

      {tab === 'prob' && <Probability />}

      {tab === 'stats' && (
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              <div className={`${CARD} sm:p-4`}>
                {st ? (
                  <>
                    <p className="text-sm font-black text-slate-900 mb-1">Histograma</p>
                    <Histogram data={data} bins={bins} st={st} />
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mb-3">
                      <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block bg-slate-900" /> Media</span>
                      <span className="inline-flex items-center gap-1.5"><i className="w-4 border-t-2 border-dashed inline-block" style={{ borderColor: BLUE }} /> Mediana</span>
                    </div>
                    <p className="text-sm font-black text-slate-900 mb-1">Diagrama de caja</p>
                    <BoxPlot st={st} />
                    <p className="text-[11px] text-slate-500 text-center">La caja va de Q1 a Q3 y contiene el 50 % central. Los círculos rojos son valores atípicos.</p>
                  </>
                ) : (
                  <p className="text-sm text-slate-500 p-6 text-center">Escribe algunos números para empezar.</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className={`${CARD} space-y-4`}>
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Ejemplos</p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESETS.map((p) => (
                      <button key={p.label} type="button" onClick={() => setText(p.text)} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="stats-data" className="text-xs font-bold text-slate-500 block mb-1">
                    Datos ({data.length}, máximo {MAX_DATA}) · separa con espacios o punto y coma
                  </label>
                  <textarea
                    id="stats-data"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-mono text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addValue()}
                    placeholder="Nuevo dato"
                    aria-label="Nuevo dato"
                    className="w-28 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-semibold"
                  />
                  <button type="button" onClick={addValue} className="text-white font-semibold text-sm px-4 py-2 rounded-xl transition hover:opacity-90" style={{ backgroundColor: ACCENT }}>
                    Añadir dato
                  </button>
                </div>

                <Slider label="\text{Intervalos}" value={bins} onChange={setBins} min={2} max={12} step={1} />
              </div>

              {st && (
                <div className={`${CARD} space-y-1.5 text-sm text-slate-700`}>
                  <p><span className="font-bold text-slate-900">n = </span>{st.n}</p>
                  <p><span className="font-bold text-slate-900">Media: </span><MathText text={`$\\bar{x} = ${fmt(st.mean)}$`} /></p>
                  <p><span className="font-bold" style={{ color: BLUE }}>Mediana: </span>{fmt(st.median)}</p>
                  <p><span className="font-bold text-slate-900">Moda: </span>{st.modes.length ? st.modes.map(fmt).join(', ') + ` (${st.maxF} veces)` : 'no hay moda'}</p>
                  <p><span className="font-bold text-slate-900">Rango: </span>{fmt(st.range)} <span className="text-slate-500">({fmt(st.min)} a {fmt(st.max)})</span></p>
                  <p><span className="font-bold text-slate-900">Cuartiles: </span>Q1 = {fmt(st.q1)}, Q3 = {fmt(st.q3)}</p>
                  <p><span className="font-bold text-slate-900">Varianza: </span>{fmt(st.variance)}</p>
                  <p><span className="font-bold text-slate-900">Desv. típica: </span><MathText text={`$\\sigma = ${fmt(st.sd)}$`} /></p>
                  <p className="pt-1 border-t border-slate-100 font-semibold" style={{ color: ACCENT }}>
                    {st.outliers.length
                      ? `Atípicos: ${st.outliers.map(fmt).join(', ')}`
                      : 'No hay valores atípicos.'}
                  </p>
                  <p className="text-xs text-slate-500">
                    Una diferencia grande entre media y mediana suele indicar datos asimétricos o atípicos.
                  </p>
                </div>
              )}
            </div>
          </div>
          <GuidedQuestions items={STATS_Q} />
        </div>
      )}
    </div>
  );
}