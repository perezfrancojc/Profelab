'use client';

import { useRef, useState } from 'react';
import { MathText } from '@/components/Math';

const ACCENT = '#D2560F';
const BLUE = '#0A5FCC';
const VIOLET = '#7c3aed';
const SIZE = 460;
const C = SIZE / 2;
const R = 120;

const fmt = (n: number, d = 3) => {
  const f = 10 ** d;
  const r = Math.round(n * f) / f;
  return Object.is(r, -0) ? '0' : String(r);
};

const NOTABLE = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

const RAD: Record<number, string> = {
  0: '0', 30: '\\frac{\\pi}{6}', 45: '\\frac{\\pi}{4}', 60: '\\frac{\\pi}{3}', 90: '\\frac{\\pi}{2}',
  120: '\\frac{2\\pi}{3}', 135: '\\frac{3\\pi}{4}', 150: '\\frac{5\\pi}{6}', 180: '\\pi',
  210: '\\frac{7\\pi}{6}', 225: '\\frac{5\\pi}{4}', 240: '\\frac{4\\pi}{3}', 270: '\\frac{3\\pi}{2}',
  300: '\\frac{5\\pi}{3}', 315: '\\frac{7\\pi}{4}', 330: '\\frac{11\\pi}{6}',
};

const QUESTIONS = [
  { q: 'Mueve el ángulo de 0° a 90°. ¿Qué le pasa al seno y al coseno?', a: 'El seno sube de 0 a 1 y el coseno baja de 1 a 0. En 90° el punto está arriba del todo: sen = 1 y cos = 0.' },
  { q: '¿En qué cuadrantes es negativo el coseno?', a: 'En el segundo y el tercero, donde el punto queda a la izquierda del eje vertical (x < 0).' },
  { q: 'Pon una tangente de 0,5 (ángulo ≈ 26,57°). ¿Dónde corta la recta de la tangente?', a: 'Justo en la marca 0,5 de la recta. El valor de la tangente es la altura a la que el radio prolongado corta esa recta.' },
  { q: 'Acércate a 90° (89, 89,9, 89,99...) y mira la tangente. ¿Qué ocurre?', a: 'Se dispara hacia infinito: el radio prolongado corta la recta cada vez más arriba. En 90° es paralelo a ella y la tangente no existe, porque cos = 0 y no se puede dividir entre 0.' },
  { q: 'Compara 30° y 150°. ¿Qué tienen en común?', a: 'Tienen el mismo seno (1/2) y el coseno opuesto: son ángulos suplementarios, simétricos respecto al eje vertical.' },
  { q: 'Calcula sen² + cos² para cualquier ángulo. ¿Qué obtienes?', a: 'Siempre 1. Es la relación fundamental y sale de Pitágoras en el triángulo rectángulo de radio 1.' },
];

// Acepta números y expresiones: 30, 22.5, pi/6, 2pi/3, (pi+1)/2...
function parseAngle(text: string, rad: boolean): number | null {
  const t = text
    .trim()
    .toLowerCase()
    .replace(/,/g, '.')
    .replace(/(\d|\))\s*(π|pi)/g, '$1*pi')
    .replace(/π|pi/g, `(${Math.PI})`);
  if (!t || !/^[0-9+\-*/.() ]+$/.test(t)) return null;
  try {
    const v = Function(`"use strict"; return (${t});`)();
    if (typeof v !== 'number' || !Number.isFinite(v)) return null;
    return rad ? (v * 180) / Math.PI : v;
  } catch {
    return null;
  }
}

export default function UnitCircleSimulator() {
  const [deg, setDegRaw] = useState(30);
  const [draft, setDraft] = useState<string | null>(null);
  const [useRad, setUseRad] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const setDeg = (v: number) => setDegRaw(Math.round((((v % 360) + 360) % 360) * 1e4) / 1e4);

  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const tanUndefined = Math.abs(cos) < 1e-9;
  const tan = tanUndefined ? NaN : sin / cos;

  const px = C + R * cos;
  const py = C - R * sin;

  const onAxis = [0, 90, 180, 270].some((a) => Math.abs(deg - a) < 1e-6);
  const quadrant = onAxis ? 0 : deg < 90 ? 1 : deg < 180 ? 2 : deg < 270 ? 3 : 4;

  const setFromPointer = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const s = Math.min(rect.width, rect.height);
    const x = ((clientX - (rect.left + rect.width / 2)) / s) * SIZE;
    const y = -((clientY - (rect.top + rect.height / 2)) / s) * SIZE;
    let a = (Math.atan2(y, x) * 180) / Math.PI;
    if (a < 0) a += 360;
    setDeg(Math.round(a));
    setDraft(null);
  };

  // Arco del ángulo
  const arcR = 30;
  const arcEnd = { x: C + arcR * cos, y: C - arcR * sin };
  const arcPath = deg < 1e-6 ? '' : `M${C + arcR},${C} A${arcR},${arcR} 0 ${deg > 180 ? 1 : 0} 0 ${arcEnd.x},${arcEnd.y}`;

  // Tangente
  const tx = C + R;
  const tyRaw = tanUndefined ? null : Math.max(-1e5, Math.min(1e5, C - tan * R));
  const offTop = tyRaw !== null && tyRaw < 8;
  const offBottom = tyRaw !== null && tyRaw > SIZE - 8;
  const tyShown = tyRaw === null ? null : Math.max(4, Math.min(SIZE - 4, tyRaw));

  const tanTicks = Array.from({ length: 15 }, (_, i) => i - 7);

  // Gráfica de seno y coseno
  const GW = 460, GH = 190, GP = 16;
  const gx = (d: number) => GP + (d / 360) * (GW - 2 * GP);
  const gy = (v: number) => GH / 2 - v * (GH / 2 - 22);
  const curve = (fn: (r: number) => number) => {
    let d = '';
    for (let i = 0; i <= 180; i++) {
      const dd = (i / 180) * 360;
      d += `${i === 0 ? 'M' : 'L'}${gx(dd).toFixed(1)},${gy(fn((dd * Math.PI) / 180)).toFixed(1)} `;
    }
    return d;
  };

  const angleTex = useRad
    ? Number.isInteger(deg) && RAD[deg]
      ? `$${RAD[deg]}\\ \\text{rad}$`
      : `$${fmt(rad, 4)}\\ \\text{rad}$`
    : `$${fmt(deg, 2)}^\\circ$`;
  const otherTex = useRad ? `${fmt(deg, 2)}°` : `${fmt(rad, 4)} rad`;

  const inputValue = draft ?? (useRad ? fmt(rad, 4) : fmt(deg, 2));

  const onInput = (v: string) => {
    setDraft(v);
    const parsed = parseAngle(v, useRad);
    if (parsed !== null) setDeg(parsed);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* Circunferencia */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-sm">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="w-full h-auto max-w-[480px] mx-auto select-none cursor-pointer"
            style={{ touchAction: 'none', maxHeight: '72vh' }}
            role="img"
            aria-label={`Circunferencia goniométrica con ángulo de ${fmt(deg, 2)} grados`}
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              setFromPointer(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => dragging.current && setFromPointer(e.clientX, e.clientY)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            {/* Circunferencia (debajo de los ejes) */}
            <circle cx={C} cy={C} r={R} fill="#fafaf9" stroke="#94a3b8" strokeWidth={2} />

            {/* Cuadrantes sombreados */}
            {quadrant > 0 && (
              <rect
                x={quadrant === 1 || quadrant === 4 ? C : C - R}
                y={quadrant <= 2 ? C - R : C}
                width={R}
                height={R}
                fill={ACCENT}
                opacity={0.06}
                clipPath="url(#circ)"
              />
            )}
            <defs>
              <clipPath id="circ"><circle cx={C} cy={C} r={R} /></clipPath>
            </defs>

            {/* Ejes: cruzan toda la circunferencia */}
            <line x1={8} y1={C} x2={SIZE - 8} y2={C} stroke="#475569" strokeWidth={1.6} />
            <line x1={C} y1={8} x2={C} y2={SIZE - 8} stroke="#475569" strokeWidth={1.6} />

            {/* Marcas notables */}
            {NOTABLE.map((n) => {
              const a = (n * Math.PI) / 180;
              return (
                <line key={n} x1={C + (R - 5) * Math.cos(a)} y1={C - (R - 5) * Math.sin(a)} x2={C + (R + 5) * Math.cos(a)} y2={C - (R + 5) * Math.sin(a)} stroke="#94a3b8" strokeWidth={1.5} />
              );
            })}

            {/* Valores en los ejes */}
            {[['1', C + R + 12, C + 15], ['-1', C - R - 12, C + 15], ['1', C - 10, C - R + 4], ['-1', C - 12, C + R + 4]].map(([t, x, y], i) => (
              <text key={i} x={Number(x)} y={Number(y)} fontSize="11" fill="#64748b" textAnchor="middle">{t}</text>
            ))}
            {['I', 'II', 'III', 'IV'].map((t, i) => (
              <text key={t} x={C + (i === 0 || i === 3 ? 1 : -1) * 62} y={C + (i < 2 ? -1 : 1) * 62 + 5} fontSize="14" fontWeight="700" fill={quadrant === i + 1 ? ACCENT : '#cbd5e1'} textAnchor="middle">
                {t}
              </text>
            ))}

            {/* Recta de la tangente, graduada */}
            <line x1={tx} y1={4} x2={tx} y2={SIZE - 4} stroke="#c4b5fd" strokeWidth={1.5} />
            {tanTicks.map((i) => {
              const v = i * 0.25;
              const y = C - v * R;
              const major = i % 2 === 0;
              return (
                <g key={i}>
                  <line x1={tx - (major ? 6 : 3.5)} y1={y} x2={tx + (major ? 6 : 3.5)} y2={y} stroke={VIOLET} strokeWidth={major ? 1.6 : 1} opacity={0.8} />
                  {major && i !== 0 && (
                    <text x={tx + 10} y={y + 4} fontSize="10.5" fill={VIOLET} fontWeight="600">{fmt(v, 2)}</text>
                  )}
                </g>
              );
            })}

            {/* Prolongación del radio hasta la recta de la tangente */}
            {tyRaw !== null && (
              <line x1={px} y1={py} x2={tx} y2={tyRaw} stroke={VIOLET} strokeWidth={1.2} strokeDasharray="4 4" opacity={0.7} />
            )}

            {/* Segmento de la tangente */}
            {tyShown !== null && (
              <line x1={tx} y1={C} x2={tx} y2={tyShown} stroke={VIOLET} strokeWidth={4} strokeLinecap="round" />
            )}

            {/* Marca de la tangente o flecha si se sale */}
            {tyRaw !== null && !offTop && !offBottom && (
              <>
                <circle cx={tx} cy={tyRaw} r={5} fill={VIOLET} stroke="#fff" strokeWidth={1.5} />
                <text x={tx - 10} y={tyRaw - 8} textAnchor="end" fontSize="12" fontWeight="700" fill={VIOLET} stroke="#fff" strokeWidth={3} paintOrder="stroke">
                  tan = {fmt(tan, 2)}
                </text>
              </>
            )}
            {offTop && (
              <>
                <polygon points={`${tx},3 ${tx - 7},15 ${tx + 7},15`} fill={VIOLET} />
                <text x={tx - 12} y={24} textAnchor="end" fontSize="12" fontWeight="700" fill={VIOLET} stroke="#fff" strokeWidth={3} paintOrder="stroke">
                  tan = {fmt(tan, 2)} ↑
                </text>
              </>
            )}
            {offBottom && (
              <>
                <polygon points={`${tx},${SIZE - 3} ${tx - 7},${SIZE - 15} ${tx + 7},${SIZE - 15}`} fill={VIOLET} />
                <text x={tx - 12} y={SIZE - 20} textAnchor="end" fontSize="12" fontWeight="700" fill={VIOLET} stroke="#fff" strokeWidth={3} paintOrder="stroke">
                  tan = {fmt(tan, 2)} ↓
                </text>
              </>
            )}
            {tanUndefined && (
              <text x={tx - 12} y={C - 10} textAnchor="end" fontSize="12" fontWeight="700" fill={VIOLET} stroke="#fff" strokeWidth={3} paintOrder="stroke">
                tan no existe
              </text>
            )}

            {/* Coseno y seno */}
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
            <span className="inline-flex items-center gap-1.5"><i className="w-4 h-1 rounded inline-block" style={{ background: VIOLET }} /> Tangente</span>
          </div>
          <p className="text-[11px] text-slate-500 text-center mt-1">Arrastra el punto sobre la circunferencia.</p>
        </div>

        {/* Ondas y valores */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-sm">
            <svg viewBox={`0 0 ${GW} ${GH}`} className="w-full h-auto" role="img" aria-label="Gráficas de seno y coseno">
              <line x1={GP} y1={GH / 2} x2={GW - GP} y2={GH / 2} stroke="#475569" strokeWidth={1.2} />
              {[90, 180, 270, 360].map((d) => (
                <g key={d}>
                  <line x1={gx(d)} y1={GH / 2 - 4} x2={gx(d)} y2={GH / 2 + 4} stroke="#475569" />
                  <text x={gx(d)} y={GH - 4} fontSize="10" fill="#64748b" textAnchor="middle">{d}°</text>
                </g>
              ))}
              <path d={curve(Math.sin)} fill="none" stroke={ACCENT} strokeWidth={2.5} />
              <path d={curve(Math.cos)} fill="none" stroke={BLUE} strokeWidth={2.5} />
              <line x1={gx(deg)} y1={6} x2={gx(deg)} y2={GH - 16} stroke="#94a3b8" strokeDasharray="4 4" />
              <circle cx={gx(deg)} cy={gy(sin)} r={5} fill={ACCENT} stroke="#fff" strokeWidth={1.5} />
              <circle cx={gx(deg)} cy={gy(cos)} r={5} fill={BLUE} stroke="#fff" strokeWidth={1.5} />
            </svg>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-2 text-sm text-slate-700">
            <p><span className="font-bold" style={{ color: ACCENT }}>Seno: </span><MathText text={`$\\sin\\alpha = ${fmt(sin)}$`} /></p>
            <p><span className="font-bold" style={{ color: BLUE }}>Coseno: </span><MathText text={`$\\cos\\alpha = ${fmt(cos)}$`} /></p>
            <p>
              <span className="font-bold" style={{ color: VIOLET }}>Tangente: </span>
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

      {/* Panel del ángulo, siempre visible */}
      <div className="sticky bottom-3 z-30 bg-white/95 backdrop-blur rounded-2xl border border-slate-200 p-4 shadow-lg">
        <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
          <div>
            <p className="text-3xl font-black text-slate-900 leading-none"><MathText text={angleTex} /></p>
            <p className="text-xs text-slate-500 mt-1">= {otherTex}</p>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={359.5}
              step={0.5}
              value={deg}
              onChange={(e) => { setDeg(Number(e.target.value)); setDraft(null); }}
              aria-label="Ángulo"
              className="w-full h-8 cursor-pointer"
              style={{ accentColor: ACCENT }}
            />
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="angle-exact" className="text-xs font-bold text-slate-600">Ángulo exacto:</label>
              <input
                id="angle-exact"
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={(e) => onInput(e.target.value)}
                onBlur={() => setDraft(null)}
                placeholder={useRad ? 'ej. pi/6' : 'ej. 26.57'}
                className="w-32 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900"
              />
              <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-bold">
                {[false, true].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => { setUseRad(v); setDraft(null); }}
                    className={`px-3 py-1.5 rounded-md transition ${useRad === v ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                  >
                    {v ? 'Radianes' : 'Grados'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 md:max-w-[250px]">
            {NOTABLE.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => { setDeg(n); setDraft(null); }}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${Math.abs(deg - n) < 1e-6 ? 'text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                style={Math.abs(deg - n) < 1e-6 ? { backgroundColor: ACCENT } : undefined}
              >
                {n}°
              </button>
            ))}
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
                <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ backgroundColor: ACCENT }}>
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