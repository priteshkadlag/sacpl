import { ImageResponse } from 'next/og';
import fs from 'node:fs/promises';
import path from 'node:path';

export const alt = 'SACPL — Structural Engineering for Tomorrow’s Landmarks';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await fs.readFile(path.join(process.cwd(), 'public/brand/sacpl-logo-light.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  const grid = Array.from({ length: 26 }, (_, i) => i * 48);

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0d1014', color: 'white', padding: 72, position: 'relative' }}>
        {grid.map((x) => (
          <div key={`v${x}`} style={{ position: 'absolute', left: x, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.05)' }} />
        ))}
        {grid.slice(0, 14).map((y) => (
          <div key={`h${y}`} style={{ position: 'absolute', top: y, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.05)' }} />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={89} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 64, height: 3, background: '#ed3c32', marginBottom: 28 }} />
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 900 }}>Structural Engineering for Tomorrow’s Landmarks.</div>
          <div style={{ fontSize: 24, marginTop: 28, color: 'rgba(255,255,255,0.65)' }}>Shanghvi and Associates Consultants Pvt. Ltd. · Mumbai</div>
        </div>
      </div>
    ),
    size,
  );
}
