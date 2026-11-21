'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Minus, Plus, Maximize2 } from 'lucide-react';
import { clamp, fmt } from './ui';

export const SIZE = 480;
const MIN_HALF = 0.5;
const MAX_HALF = 500;

export type Bounds = { minX: number; maxX: number; minY: number; maxY: number };
export type PlaneCtx = {
  X: (x: number) => number;
  Y: (y: number) => number;
  cx: number;
  cy: number;
  half: number;
  scale: number;
};

function niceStep(span: number) {
  const raw = span / 10;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / pow;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * pow;
}

export function Plane({
  render,
  bounds,
  fitSignal = 0,
  label,
}: {
  render: (ctx: PlaneCtx) => ReactNode;
  bounds: Bounds;
  fitSignal?: number;
  label: string;
}) {
  const [view, setView] = useState({ cx: 0, cy: 0, half: 10 });
  const svgRef = useRef<SVGSVGElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef(0);
  const boundsRef = useRef(bounds);
  boundsRef.current = bounds;

  const { cx, cy, half } = view;
  const scale = SIZE / (2 * half);
  const X = (x: number) => SIZE / 2 + (x - cx) * scale;
  const Y = (y: number) => SIZE / 2 - (y - cy) * scale;

  const zoomBy = (f: number) => setView((v) => ({ ...v, half: clamp(v.half * f, MIN_HALF, MAX_HALF) }));

  const fit = () => {
    const b = boundsRef.current;
    const span = Math.max(b.maxX - b.minX, b.maxY - b.minY, 4);
    setView({
      cx: (b.minX + b.maxX) / 2,
      cy: (b.minY + b.maxY) / 2,
      half: clamp((span / 2) * 1.5, MIN_HALF, MAX_HALF),
    });
  };

  const resetView = () => setView({ cx: 0, cy: 0, half: 10 });

  useEffect(() => {
    if (fitSignal > 0) fit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitSignal]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * SIZE;
      const py = ((e.clientY - rect.top) / rect.height) * SIZE;
      const factor = Math.exp(e.deltaY * 0.0015);
      setView((v) => {
        const h = clamp(v.half * factor, MIN_HALF, MAX_HALF);
        const s0 = SIZE / (2 * v.half);
        const s1 = SIZE / (2 * h);
        const ux = v.cx + (px - SIZE / 2) / s0;
        const uy = v.cy - (py - SIZE / 2) / s0;
        return { half: h, cx: ux - (px - SIZE / 2) / s1, cy: uy + (py - SIZE / 2) / s1 };
      });
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [p1, p2] = [...pointers.current.values()];
      pinch.current = Math.hypot(p1.x - p2.x, p1.y - p2.y);
    }
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const k = SIZE / e.currentTarget.getBoundingClientRect().width;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      const dx = (e.clientX - prev.x) * k;
      const dy = (e.clientY - prev.y) * k;
      setView((v) => {
        const s = SIZE / (2 * v.half);
        return { ...v, cx: v.cx - dx / s, cy: v.cy + dy / s };
      });
    } else if (pointers.current.size === 2) {
      const [p1, p2] = [...pointers.current.values()];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (pinch.current > 0 && dist > 0) {
        const f = pinch.current / dist;
        setView((v) => ({ ...v, half: clamp(v.half * f, MIN_HALF, MAX_HALF) }));
      }
      pinch.current = dist;
    }
  };

  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    pointers.current.delete(e.pointerId);
    pinch.current = 0;
  };

  const step = niceStep(2 * half);
  const gridX: number[] = [];
  for (let v = Math.ceil((cx - half) / step) * step; v <= cx + half; v += step) gridX.push(Math.round(v / step) * step);
  const gridY: number[] = [];
  for (let v = Math.ceil((cy - half) / step) * step; v <= cy + half; v += step) gridY.push(Math.round(v / step) * step);

  const axisX = clamp(X(0), 0, SIZE);
  const axisY = clamp(Y(0), 0, SIZE);

  const btn =
    'w-9 h-9 flex items-center justify-center rounded-lg bg-white/90 hover:bg-white border border-slate-200 text-slate-700 shadow-sm transition';

  return (
    <div>
      <div className="relative max-w-[560px] mx-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full h-auto cursor-grab active:cursor-grabbing select-none rounded-xl bg-white"
          style={{ touchAction: 'none' }}
          role="img"
          aria-label={label}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {gridX.map((v) => (
            <line key={`gx${v}`} x1={X(v)} y1={0} x2={X(v)} y2={SIZE} stroke="#e2e8f0" strokeWidth={1} />
          ))}
          {gridY.map((v) => (
            <line key={`gy${v}`} x1={0} y1={Y(v)} x2={SIZE} y2={Y(v)} stroke="#e2e8f0" strokeWidth={1} />
          ))}
          <line x1={0} y1={Y(0)} x2={SIZE} y2={Y(0)} stroke="#475569" strokeWidth={1.5} />
          <line x1={X(0)} y1={0} x2={X(0)} y2={SIZE} stroke="#475569" strokeWidth={1.5} />

          {render({ X, Y, cx, cy, half, scale })}

          {gridX.filter((v) => v !== 0).map((v) => (
            <text key={`tx${v}`} x={X(v)} y={clamp(axisY + 14, 12, SIZE - 4)} textAnchor="middle" fontSize="11" fill="#64748b">
              {fmt(v)}
            </text>
          ))}
          {gridY.filter((v) => v !== 0).map((v) => (
            <text key={`ty${v}`} x={clamp(axisX + 6, 4, SIZE - 30)} y={Y(v) + 4} fontSize="11" fill="#64748b">
              {fmt(v)}
            </text>
          ))}
        </svg>

        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          <button type="button" onClick={() => zoomBy(0.7)} className={btn} aria-label="Acercar" title="Acercar">
            <Plus className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => zoomBy(1 / 0.7)} className={btn} aria-label="Alejar" title="Alejar">
            <Minus className="w-4 h-4" />
          </button>
          <button type="button" onClick={fit} className={btn} aria-label="Ajustar" title="Ajustar">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 text-center mt-2">
        Arrastra para moverte · rueda o pellizco para el zoom ·{' '}
        <button type="button" onClick={fit} className="underline font-semibold">Ajustar</button> ·{' '}
        <button type="button" onClick={resetView} className="underline font-semibold">Vista inicial</button>
      </p>
    </div>
  );
}