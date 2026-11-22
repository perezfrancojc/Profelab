'use client';

import { useState } from 'react';
import { MathText } from '@/components/Math';
import { ACCENT, BLUE, CARD, GuidedQuestions, Slider, Tabs, fmt } from './shared/ui';

type Tab = 'thales' | 'sim' | 'shadow';

const QUESTIONS: Record<Tab, { q: string; a: string }[]> = {
  thales: [
    { q: 'Mueve k. ¿Qué tres razones permanecen iguales?', a: 'OA′/OA, OB′/OB y A′B′/AB valen siempre k. Es el teorema de Tales: las paralelas determinan segmentos proporcionales.' },
    { q: 'Cambia el ángulo en O. ¿Se rompe la proporción?', a: 'No: no depende del ángulo, solo de que A′B′ sea paralela a AB.' },
    { q: 'Con OA = 4, AA′ = 2 y OB = 6, ¿cuánto vale BB′?', a: 'OA/AA′ = OB/BB′, luego 4/2 = 6/BB′ y BB′ = 3.' },
  ],
  sim: [
    { q: 'Pon k = 2. ¿Cuánto se multiplica el perímetro, el área y el volumen?', a: 'Perímetro ×2, área ×4 y volumen ×8: las longitudes se multiplican por k, las áreas por k² y los volúmenes por k³.' },
    { q: 'Si una maqueta está a escala 1:50, ¿por cuánto se multiplica el área real?', a: 'Por 50² = 2500. La razón de áreas es el cuadrado de la razón de longitudes.' },
    { q: '¿Se conservan los ángulos en dos figuras semejantes?', a: 'Sí: los ángulos son iguales y los lados correspondientes son proporcionales.' },
  ],
  shadow: [
    { q: 'Una persona de 1,7 m proyecta 2 m de sombra y el árbol 12 m. ¿Altura del árbol?', a: 'Los triángulos son semejantes: h/12 = 1,7/2, luego h = 10,2 m.' },
    { q: '¿Por qué los dos triángulos de sombra son semejantes?', a: 'Porque los rayos del sol llegan paralelos y los dos objetos son verticales: hay ángulos iguales.' },
    { q: 'Si el sol baja y las sombras se alargan, ¿cambia la altura que se calcula?', a: 'No: la razón entre sombras sigue siendo la misma. Las dos sombras se alargan en la misma proporción.' },
  ],
};

export default function ThalesSimulator() {
  const [tab, setTab] = useState<Tab>('thales');
  const [OA, setOA] = useState(4);
  const [OB, setOB] = useState(5);
  const [ang, setAng] = useState(55);
  const [k, setK] = useState(1.6);
  const [kk, setKk] = useState(2);
  const [ph, setPh] = useState(1.7);
  const [ps, setPs] = useState(2);
  const [ts, setTs] = useState(12);

  /* ---------- Tales ---------- */
  const th = (ang * Math.PI) / 180;
  const A = [OA, 0], B = [OB * Math.cos(th), OB * Math.sin(th)];
  const A2 = [k * A[0], 0], B2 = [k * B[0], k * B[1]];
  const AB = Math.hypot(A[0] - B[0], A[1] - B[1]);
  const xmax = Math.max(A[0], A2[0], B[0], B2[0]) * 1.08;
  const ymax = Math.max(B[1], B2[1]) * 1.1;
  const W = 640, H = 360, pad = 46;
  const s1 = Math.min((W - 2 * pad) / xmax, (H - 2 * pad) / Math.max(ymax, 0.1));
  const X = (x: number) => pad + x * s1;
  const Y = (y: number) => H - pad - y * s1;
  const pt = (p: number[]) => `${X(p[0])},${Y(p[1])}`;
  const lab = (p: number[], t: string, dx: number, dy: number, c = '#0f172a') => (
    <text x={X(p[0]) + dx} y={Y(p[1]) + dy} fontSize="15" fontWeight="800" fill={c} stroke="#fff" strokeWidth={4} paintOrder="stroke">{t}</text>
  );
  const L2 = Math.max(OB, OB * k) * 1.1;

  /* ---------- Semejanza ---------- */
  const base = [4, 3, 5];
  const u = Math.min(560 / (4 + 4 * kk + 1.5), 250 / Math.max(3, 3 * kk));
  const gy = 290;
  const tri = (x0: number, f: number, col: string) => (
    <polygon points={`${x0},${gy} ${x0 + 4 * f * u},${gy} ${x0},${gy - 3 * f * u}`} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={2.5} strokeLinejoin="round" />
  );

  /* ---------- Sombra ---------- */
  const treeH = (ph * ts) / ps;
  const totalW = 1 + ps + 2 + ts;
  const sc = Math.min(560 / totalW, 250 / Math.max(treeH, ph) / 1.05);
  const gY = 300, sx0 = 40;
  const personX = sx0, treeX = sx0 + (1 + ps) * sc + 1.5 * sc;
  const sunSlope = ph / ps;

  return (
    <div className="space-y-8">
      <Tabs value={tab} onChange={setTab} items={[{ id: 'thales', label: 'Teorema de Tales' }, { id: 'sim', label: 'Semejanza' }, { id: 'shadow', label: 'Altura por la sombra' }]} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className={`${CARD} sm:p-4 self-start`}>
          {tab === 'thales' && (
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label="Triángulos de Tales">
              <line x1={X(0)} y1={Y(0)} x2={X(xmax)} y2={Y(0)} stroke="#475569" strokeWidth={2} />
              <line x1={X(0)} y1={Y(0)} x2={X(L2 * Math.cos(th))} y2={Y(L2 * Math.sin(th))} stroke="#475569" strokeWidth={2} />
              <polygon points={`${pt([0, 0])} ${pt(A2)} ${pt(B2)}`} fill={BLUE} fillOpacity={0.15} />
              <polygon points={`${pt([0, 0])} ${pt(A)} ${pt(B)}`} fill={ACCENT} fillOpacity={0.25} />
              <line x1={X(A[0])} y1={Y(A[1])} x2={X(B[0])} y2={Y(B[1])} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
              <line x1={X(A2[0])} y1={Y(A2[1])} x2={X(B2[0])} y2={Y(B2[1])} stroke={BLUE} strokeWidth={4} strokeLinecap="round" />
              {[A, B, A2, B2, [0, 0]].map((p, i) => <circle key={i} cx={X(p[0])} cy={Y(p[1])} r={5.5} fill="#0f172a" stroke="#fff" strokeWidth={2} />)}
              {lab([0, 0], 'O', -18, 18)}
              {lab(A, 'A', -4, 22, ACCENT)}
              {lab(A2, "A′", -4, 22, BLUE)}
              {lab(B, 'B', -22, -4, ACCENT)}
              {lab(B2, "B′", -24, -4, BLUE)}
            </svg>
          )}

          {tab === 'sim' && (
            <svg viewBox="0 0 640 330" className="w-full h-auto select-none" role="img" aria-label="Triángulo y su semejante">
              <line x1={20} y1={gy} x2={620} y2={gy} stroke="#94a3b8" />
              {tri(40, 1, ACCENT)}
              {tri(40 + 4 * u + 1.5 * u, kk, BLUE)}
              <text x={40 + 2 * u} y={gy + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>4</text>
              <text x={40 + 4 * u + 1.5 * u + 2 * kk * u} y={gy + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={BLUE}>{fmt(4 * kk)}</text>
              <text x={30} y={gy - 1.5 * u} textAnchor="end" fontSize="13" fontWeight="700" fill={ACCENT}>3</text>
              <text x={40 + 4 * u + 1.5 * u - 6} y={gy - 1.5 * kk * u} textAnchor="end" fontSize="13" fontWeight="700" fill={BLUE}>{fmt(3 * kk)}</text>
            </svg>
          )}

          {tab === 'shadow' && (
            <svg viewBox="0 0 640 340" className="w-full h-auto select-none rounded-xl" role="img" aria-label="Altura de un árbol con su sombra">
              <defs><linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8ec9f5" /><stop offset="1" stopColor="#e6f4fd" /></linearGradient></defs>
              <rect width={640} height={340} fill="url(#sh-sky)" />
              <rect x={0} y={gY} width={640} height={40} fill="#86c166" />
              <circle cx={44} cy={42} r={22} fill="#fde047" />
              {[personX, treeX].map((bx, i) => {
                const hh = (i === 0 ? ph : treeH) * sc;
                const ss = (i === 0 ? ps : ts) * sc;
                return (
                  <g key={i}>
                    <polygon points={`${bx},${gY} ${bx + ss},${gY} ${bx},${gY - hh}`} fill="#0f172a" fillOpacity={0.08} />
                    <line x1={bx} y1={gY - hh} x2={bx + ss} y2={gY} stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 4" />
                    <line x1={bx + ss} y1={gY + 6} x2={bx} y2={gY + 6} stroke="#0f172a" strokeWidth={2.5} />
                  </g>
                );
              })}
              {/* Persona */}
              <g>
                <line x1={personX} y1={gY} x2={personX} y2={gY - ph * sc} stroke={BLUE} strokeWidth={Math.max(3, sc * 0.18)} strokeLinecap="round" />
                <circle cx={personX} cy={gY - ph * sc} r={Math.max(3.5, sc * 0.16)} fill={BLUE} />
              </g>
              {/* Árbol */}
              <rect x={treeX - Math.max(3, treeH * sc * 0.03)} y={gY - treeH * sc * 0.45} width={Math.max(6, treeH * sc * 0.06)} height={treeH * sc * 0.45} fill="#7c5a3a" />
              <ellipse cx={treeX} cy={gY - treeH * sc * 0.72} rx={Math.max(10, treeH * sc * 0.2)} ry={treeH * sc * 0.28} fill="#15803d" />
              <text x={personX + 6} y={gY + 28} fontSize="12" fontWeight="800" fill="#0f172a">{fmt(ps)} m</text>
              <text x={treeX + 6} y={gY + 28} fontSize="12" fontWeight="800" fill="#0f172a">{fmt(ts)} m</text>
              <text x={personX - 6} y={gY - ph * sc - 8} fontSize="12" fontWeight="800" fill={BLUE} textAnchor="end">{fmt(ph)} m</text>
              <text x={treeX - 10} y={gY - treeH * sc - 6} fontSize="13" fontWeight="800" fill="#15803d" textAnchor="end">h = {fmt(treeH)} m</text>
              <text x={620} y={32} fontSize="11" fill="#475569" textAnchor="end">pendiente de los rayos: {fmt(sunSlope)}</text>
            </svg>
          )}
        </div>

        <div className="space-y-4">
          <div className={`${CARD} space-y-4`}>
            {tab === 'thales' && (
              <>
                <Slider label="OA" value={OA} onChange={setOA} min={2} max={8} step={0.5} color={ACCENT} />
                <Slider label="OB" value={OB} onChange={setOB} min={2} max={8} step={0.5} color={ACCENT} />
                <Slider label="\widehat{O}" value={ang} onChange={setAng} min={25} max={85} step={1} unit="°" />
                <Slider label="k" value={k} onChange={setK} min={0.3} max={2.5} step={0.05} color={BLUE} />
              </>
            )}
            {tab === 'sim' && <Slider label="k" value={kk} onChange={setKk} min={0.5} max={3} step={0.05} color={BLUE} />}
            {tab === 'shadow' && (
              <>
                <Slider label="\text{Persona}" value={ph} onChange={setPh} min={1.2} max={2.1} step={0.05} unit="m" color={BLUE} />
                <Slider label="\text{Su sombra}" value={ps} onChange={setPs} min={0.8} max={4} step={0.1} unit="m" />
                <Slider label="\text{Sombra árbol}" value={ts} onChange={setTs} min={3} max={20} step={0.5} unit="m" />
              </>
            )}
          </div>

          <div className={`${CARD} space-y-1.5 text-sm text-slate-700`}>
            {tab === 'thales' && (
              <>
                <p><MathText text={`$\\frac{OA'}{OA} = \\frac{${fmt(OA * k)}}{${fmt(OA)}} = ${fmt(k)}$`} /></p>
                <p><MathText text={`$\\frac{OB'}{OB} = \\frac{${fmt(OB * k)}}{${fmt(OB)}} = ${fmt(k)}$`} /></p>
                <p><MathText text={`$\\frac{A'B'}{AB} = \\frac{${fmt(AB * k)}}{${fmt(AB)}} = ${fmt(k)}$`} /></p>
                <p className="pt-1 border-t border-slate-100"><MathText text={`$\\frac{OA}{AA'} = \\frac{${fmt(OA)}}{${fmt(OA * (k - 1))}} = ${k !== 1 ? fmt(1 / (k - 1)) : '—'} = \\frac{OB}{BB'}$`} /></p>
                <p className="font-semibold" style={{ color: ACCENT }}>Las tres razones coinciden: A′B′ ∥ AB.</p>
              </>
            )}
            {tab === 'sim' && (
              <>
                <p><span className="font-bold text-slate-900">Longitudes: </span>×{fmt(kk)} (3, 4, 5 → {fmt(3 * kk)}, {fmt(4 * kk)}, {fmt(5 * kk)})</p>
                <p><span className="font-bold text-slate-900">Perímetro: </span>{12} → {fmt(12 * kk)}</p>
                <p><span className="font-bold" style={{ color: ACCENT }}>Área: </span>×{fmt(kk * kk)} ({6} → {fmt(6 * kk * kk)})</p>
                <p><span className="font-bold" style={{ color: BLUE }}>Volumen (de un sólido semejante): </span>×{fmt(kk ** 3)}</p>
                <p className="text-xs text-slate-500">Razón de semejanza <MathText text="$k$" />: longitudes ×k, áreas ×k², volúmenes ×k³.</p>
              </>
            )}
            {tab === 'shadow' && (
              <>
                <p><MathText text={`$\\frac{h}{${fmt(ts)}} = \\frac{${fmt(ph)}}{${fmt(ps)}}$`} /></p>
                <p><MathText text={`$h = \\frac{${fmt(ph)} \\cdot ${fmt(ts)}}{${fmt(ps)}} = ${fmt(treeH)}\\ \\text{m}$`} /></p>
                <p className="text-xs text-slate-500">Triángulos semejantes: mismos ángulos porque los rayos del sol son paralelos.</p>
              </>
            )}
          </div>
        </div>
      </div>

      <GuidedQuestions items={QUESTIONS[tab]} />
    </div>
  );
}