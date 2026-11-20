import { ImageResponse } from 'next/og';

export const alt = 'JuancaEduca - Matemáticas, Física y Química sin rodeos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FAF9F5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              background: '#dc2626',
              borderRadius: 22,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 52,
              fontWeight: 800,
            }}
          >
            JE
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: '#0f172a' }}>
            JuancaEduca
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Matemáticas, Física y Química
          </div>
          <div
            style={{
              fontSize: 84,
              fontStyle: 'italic',
              color: '#dc2626',
              lineHeight: 1.1,
              marginTop: 8,
            }}
          >
            sin rodeos.
          </div>
        </div>

        <div style={{ fontSize: 30, color: '#475569' }}>
          Apuntes, vídeos, ejercicios resueltos y tests · ESO y Bachillerato
        </div>
      </div>
    ),
    { ...size }
  );
}