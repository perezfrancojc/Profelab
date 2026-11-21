'use client';

import { useRef, useState } from 'react';
import { MathText } from '@/components/Math';

const ACCENT = '#D2560F';
const BLUE = '#0A5FCC';
const SIZE = 420;
const C = SIZE / 2;
const R = 150;

const fmt = (n: number) => {
  const r = Math.round(n * 1000) / 1000;
  return Object.is(r, -0) ? '0' : String(r);
};

const NOTABLE = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

const RAD: Record<number, string> = {
  0: '0',
  30: '\\frac{\\pi}{6}',
  45: '\\frac{\\pi}{4}',
  60: '\\frac{\\pi}{3}',
  90: '\\frac{\\pi}{2}',
  120: '\\frac{2\\pi}{3}',
  135: '\\frac{3\\pi}{4}',
  150: '\\frac{5\\pi}{6}',
  180: '\\pi',
  210: '\\frac{7\\pi}{6}',
  225: '\\frac{5\\pi}{4}',
  240: '\\frac{4\\pi}{3}',
  270: '\\frac{3\\pi}{2}',
  300: '\\frac{5\\pi}{3}',
  315: '\\frac{7\\pi}{4}',
  330: '\\frac{11\\pi}{6}',
  360: '2\\pi',
};

const QUESTIONS = [
  {
    q: 'Mueve el ángulo de 0° a 90°. ¿Qué le pasa al seno y al coseno?',
    a: 'El seno sube de 0 a 1 y el coseno baja de 1 a 0. En 90° el punto está arriba del todo: sen = 1 y cos = 0.',
  },
  {
    q: '¿En qué cuadrantes es negativo el coseno?',
    a: 'En el segundo y el tercero, donde el punto queda a la izquierda del eje vertical (x < 0).',
  },
  {
    q: 'Compara 30° y 150°. ¿Qué tienen en común?',
    a: 'Tienen el mismo seno (1/2) y el coseno opuesto: son ángulos suplementarios, simétricos respecto al eje vertical.',
  },
  {
    q: 'Acércate a 90° y mira la tangente. ¿Qué ocurre?',
    a: 'Se dispara hacia infinito: en 90° (y en 270°) la tangente no existe porque el coseno vale 0 y no se puede dividir entre 0.',
  },
  {
    q: 'Calcula sen² + cos² para cualquier ángulo. ¿Qué obtienes?',
    a: 'Siempre 1. Es la relación fundamental y sale de Pitágoras en el triángulo rectángulo de radio 1.',
  },
];

export default function UnitCircleSimulator() {
  const [deg, setDeg] = useState(30);
  const [useRad, setUseRad] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const tanUndefined = Math.abs(cos) < 1e-9;
  const tan = tanUndefined ? NaN : sin / cos;

  const px = C + R * cos;
  const py = C - R * sin;

  const quadrant = deg === 0 || deg === 360 ? 0 : deg < 90 ? 1 : deg === 90 ? 0 : deg < 180 ? 2 : deg === 180 ? 0 : deg < 270 ? 3 : deg === 270 ? 0 : 4;

  const setFromPointer = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * SIZE - C;
    const y = C - ((clientY - rect.top) / rect.height) * SIZE;
    let a = (Math.atan2(y, x) * 180) / Math.PI;
    if (a < 0) a += 360;
    setDeg(Math.round(a) % 360);
  };

  // Arco del ángulo
  const arcR = 34;
  const arcEnd = { x: C + arcR * cos, y: C - arcR * sin };
  const large = deg > 180 ? 1 : 0;
  const arcPath =
    deg === 0
      ? ''
      : `M${C + arcR},${C} A${arcR},${arcR} 0 ${large} 0 ${arcEnd.x},${arcEnd.y}`;

  // Gráfica de seno y coseno (derecha)
  const GW = 420, GH = 170, GP = 14;
  const gx = (d: number) => GP + (d / 360) * (GW - 2 * GP);
  const gy = (v: number) => GH / 2 - v * (GH / 2 - 18);
  const curve = (fn: (r: number) => number) => {
    let d = '';
    for (let i = 0; i <= 180; i++) {
      const dd = (i / 180) * 360;
      d += `${i === 0 ? 'M' : 'L'}${gx(dd).toFixed(1)},${gy(fn((dd * Math.PI) / 180)).toFixed(1)} `;
    }
    return d;
  };

  const angleLabel = useRad ? `$${RAD[deg] ?? `${fmt(rad)}`}\\ \\text{rad}$` : `$${deg}^\\circ$`;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {/* Circunferencia */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-sm">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="w-full h-auto max-w-[520px] mx-auto select-none cursor-pointer"
              style={{ touchAction: 'none' }}
              role="img"
              aria-label={`Circunferencia goniométrica con ángulo de ${deg} grados`}
              onPointerDown={(e) => {
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                setFromPointer(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => dragging.current && setFromPointer(e.clientX, e.clientY)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
            >
              {/* Ejes */}
              <line x1={10} y1={C} x2={SIZE - 10} y2={C} stroke="#475569" strokeWidth={1.5} />
              <line x1={C} y1={10} x2={C} y2={SIZE - 10} stroke="#475569" strokeWidth={1.5} />
              <circle cx={C} cy={C} r={R} fill="#fafaf9" stroke="#94a3b8" strokeWidth={2} />

              {/* Marcas notables */}
              {NOTABLE.map((n) => {
                const a = (n * Math.PI) / 180;
                return (
                  <line
                    key={n}
                    x1={C + (R - 5) * Math.cos(a)}
                    y1={C - (R - 5) * Math.sin(a)}
                    x2={C + (R + 5) * Math.cos(a)}
                    y2={C - (R + 5) * Math.sin(a)}
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                  />
                );
              })}

              {/* Etiquetas de ejes y cuadrantes */}
              {[['1', C + R + 14, C + 14], ['-1', C - R - 14, C + 14], ['1', C + 10, C - R - 8], ['-1', C + 14, C + R + 16]].map(([t, x, y], i) => (
                <text key={i} x={Number(x)} y={Number(y)} fontSize="11" fill="#64748b" textAnchor="middle">{t}</text>
              ))}
              {['I', 'II', 'III', 'IV'].map((t, i) => (
                <text
                  key={t}
                  x={C + (i === 0 || i === 3 ? 1 : -1) * 70}
                  y={C + (i < 2 ? -1 : 1) * 70 + 4}
                  fontSize="13"
                  fontWeight="700"
                  fill={quadrant === i + 1 ? ACCENT : '#cbd5e1'}
                  textAnchor="middle"
                >
                  {t}
                </text>
              ))}

              {/* Tangente (recta x = 1) y su segmento */}
              {!tanUndefined && Math.abs(tan) < 3 && (
                <>
                  <line x1={C + R} y1={C - 3 * R} x2={C + R} y2={C + 3 * R} stroke="#e2e8f0" strokeWidth={1} />
                  <line x1={C + R} y1={C} x2={C + R} y2={C - tan * R} stroke="#7c3aed" strokeWidth={3} strokeLinecap="round" />
                  <line x1={px} y1={py} x2={C + R} y2={C - tan * R} stroke="#7c3aed" strokeWidth={1} strokeDasharray="4 4" />
                </>
              )}

              {/* Coseno (horizontal) y seno (vertical) */}
              <line x1={C} y1={C} x2={px} y2={C} stroke={BLUE} strokeWidth={4} strokeLinecap="round" />
              <line x1={px} y1={C} x2={px} y2={py} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />

              {/* Radio y arco */}
              <line x1={C} y1={C} x2={px} y2={py} stroke="#0f172a" strokeWidth={2.5} strokeLinecap="round" />
              {arcPath && <path d={arcPath} fill="none" stroke="#0f172a" strokeWidth={2} />}

              {/* Punto arrastrable */}
              <circle cx={px} cy={py} r={11} fill="#fff" stroke="#0f172a" strokeWidth={3} />
            </svg>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mt-2">
              <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block" style={{ background: ACCENT }} /> Seno</span>
              <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block" style={{ background: BLUE }} /> Coseno</span>
              <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block bg-violet-600" /> Tangente</span>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-1">Arrastra el punto sobre la circunferencia.</p>
          </div>

          {/* Gráfica seno y coseno */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-sm">
            <svg viewBox={`0 0 ${GW} ${GH}`} className="w-full h-auto" role="img" aria-label="Gráficas de seno y coseno">
              <line x1={GP} y1={GH / 2} x2={GW - GP} y2={GH / 2} stroke="#475569" strokeWidth={1.2} />
              {[90, 180, 270, 360].map((d) => (
                <g key={d}>
                  <line x1={gx(d)} y1={GH / 2 - 4} x2={gx(d)} y2={GH / 2 + 4} stroke="#475569" />
                  <text x={gx(d)} y={GH - 3} fontSize="10" fill="#64748b" textAnchor="middle">{d}°</text>
                </g>
              ))}
              <path d={curve(Math.sin)} fill="none" stroke={ACCENT} strokeWidth={2.5} />
              <path d={curve(Math.cos)} fill="none" stroke={BLUE} strokeWidth={2.5} />
              <line x1={gx(deg)} y1={6} x2={gx(deg)} y2={GH - 14} stroke="#94a3b8" strokeDasharray="4 4" />
              <circle cx={gx(deg)} cy={gy(sin)} r={5} fill={ACCENT} stroke="#fff" strokeWidth={1.5} />
              <circle cx={gx(deg)} cy={gy(cos)} r={5} fill={BLUE} stroke="#fff" strokeWidth={1.5} />
            </svg>
          </div>
        </div>

        {/* Controles y valores */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-slate-900"><MathText text={angleLabel} /></span>
              <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-bold">
                {[false, true].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => setUseRad(v)}
                    className={`px-3 py-1.5 rounded-md transition ${useRad === v ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                  >
                    {v ? 'Radianes' : 'Grados'}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={359}
              step={1}
              value={deg}
              onChange={(e) => setDeg(Number(e.target.value))}
              aria-label="Ángulo"
              className="w-full h-8 cursor-pointer"
              style={{ accentColor: ACCENT }}
            />

            <div className="flex flex-wrap gap-1.5">
              {NOTABLE.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setDeg(n)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    deg === n ? 'text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={deg === n ? { backgroundColor: ACCENT } : undefined}
                >
                  {n}°
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-2 text-sm text-slate-700">
            <p><span className="font-bold" style={{ color: ACCENT }}>Seno: </span><MathText text={`$\\sin\\alpha = ${fmt(sin)}$`} /></p>
            <p><span className="font-bold" style={{ color: BLUE }}>Coseno: </span><MathText text={`$\\cos\\alpha = ${fmt(cos)}$`} /></p>
            <p>
              <span className="font-bold text-violet-700">Tangente: </span>
              {tanUndefined ? <span>no existe</span> : <MathText text={`$\\tan\\alpha = ${fmt(tan)}$`} />}
            </p>
            <p className="pt-1 border-t border-slate-100">
              <span className="font-bold text-slate-900">Comprobación: </span>
              <MathText text={`$\\sin^2\\alpha + \\cos^2\\alpha = ${fmt(sin * sin + cos * cos)}$`} />
            </p>
            <p className="font-semibold" style={{ color: ACCENT }}>
              {quadrant === 0 ? 'El punto está sobre un eje.' : `Cuadrante ${['I', 'II', 'III', 'IV'][quadrant - 1]}.`}
            </p>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-3">
        <h2 className="text-lg font-black text-slate-900">Explora con intención</h2>
        <p className="text-sm text-slate-600">
          Prueba cada pregunta en el simulador y despliega la respuesta para comprobar tu conclusión.
        </p>
        <div className="divide-y divide-slate-100">
          {QUESTIONS.map((item, i) => (
            <details key={i} className="group py-3">
              <summary className="cursor-pointer list-none flex items-start gap-3 text-sm font-semibold text-slate-900">
                <span
                  className="mt-0.5 w-6 h-6 shrink-0 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: ACCENT }}
                >
                  {i + 1}
                </span>
                {item.q}
              </summary>
              <p className="mt-2 ml-9 text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}