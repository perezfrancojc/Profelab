'use client';

import { useEffect, useRef, useState } from 'react';
import { clamp } from './ui';

export type Project = (x: number, y: number, z: number) => { x: number; y: number; d: number };

const W = 520;

export function Viewer3D({
  draw,
  half = 10,
  label,
}: {
  draw: (g: CanvasRenderingContext2D, P: Project, size: number) => void;
  half?: number;
  label: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [rot, setRot] = useState({ yaw: 0.7, pitch: 0.45 });
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    cv.width = W * dpr;
    cv.height = W * dpr;
    const g = cv.getContext('2d');
    if (!g) return;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, W);

    const k = (W / 2 - 26) / (half * Math.sqrt(3));
    const cyaw = Math.cos(rot.yaw), syaw = Math.sin(rot.yaw);
    const cp = Math.cos(rot.pitch), sp = Math.sin(rot.pitch);

    const P: Project = (x, y, z) => {
      const x1 = x * cyaw - y * syaw;
      const y1 = x * syaw + y * cyaw;
      const y2 = y1 * cp - z * sp;
      const z2 = y1 * sp + z * cp;
      return { x: W / 2 + x1 * k, y: W / 2 - z2 * k, d: y2 };
    };

    // Cubo
    const V: number[][] = [];
    for (const x of [-half, half]) for (const y of [-half, half]) for (const z of [-half, half]) V.push([x, y, z]);
    g.strokeStyle = '#cbd5e1';
    g.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        const diff = [0, 1, 2].filter((a) => V[i][a] !== V[j][a]).length;
        if (diff !== 1) continue;
        const a = P(V[i][0], V[i][1], V[i][2]);
        const b = P(V[j][0], V[j][1], V[j][2]);
        g.beginPath();
        g.moveTo(a.x, a.y);
        g.lineTo(b.x, b.y);
        g.stroke();
      }
    }

    // Ejes
    const axes: [number[], number[], string][] = [
      [[-half, 0, 0], [half, 0, 0], 'x'],
      [[0, -half, 0], [0, half, 0], 'y'],
      [[0, 0, -half], [0, 0, half], 'z'],
    ];
    g.strokeStyle = '#64748b';
    g.fillStyle = '#334155';
    g.font = '600 13px sans-serif';
    for (const [p0, p1, name] of axes) {
      const a = P(p0[0], p0[1], p0[2]);
      const b = P(p1[0], p1[1], p1[2]);
      g.beginPath();
      g.moveTo(a.x, a.y);
      g.lineTo(b.x, b.y);
      g.stroke();
      const t = P(p1[0] * 1.1, p1[1] * 1.1, p1[2] * 1.1);
      g.fillText(name, t.x - 4, t.y + 4);
    }

    draw(g, P, W);
  }, [draw, rot, half]);

  return (
    <div>
      <canvas
        ref={ref}
        role="img"
        aria-label={label}
        className="w-full h-auto max-w-[520px] mx-auto rounded-xl bg-white cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'none', aspectRatio: '1 / 1' }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          last.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!last.current) return;
          const dx = e.clientX - last.current.x;
          const dy = e.clientY - last.current.y;
          last.current = { x: e.clientX, y: e.clientY };
          setRot((r) => ({ yaw: r.yaw + dx * 0.01, pitch: clamp(r.pitch + dy * 0.01, -1.45, 1.45) }));
        }}
        onPointerUp={() => (last.current = null)}
        onPointerCancel={() => (last.current = null)}
      />
      <p className="text-[11px] text-slate-500 text-center mt-2">
        Arrastra para girar la escena ·{' '}
        <button type="button" onClick={() => setRot({ yaw: 0.7, pitch: 0.45 })} className="underline font-semibold">
          Vista inicial
        </button>
      </p>
    </div>
  );
}