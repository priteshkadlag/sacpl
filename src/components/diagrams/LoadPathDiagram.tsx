'use client';

import { useEffect, useRef } from 'react';

const steps = [
  { id: 'grid', label: 'Grid & foundations', text: 'Column grid set out; foundations established on the geotechnical brief.' },
  { id: 'frame', label: 'Vertical system', text: 'Cores and columns carry gravity load and resist lateral wind and seismic action.' },
  { id: 'floors', label: 'Floor plates', text: 'Slabs and beams span between supports — conventional, flat-slab or post-tensioned.' },
  { id: 'bridge', label: 'Transfer & cantilever', text: 'Long-span trusses and balanced cantilevers resolve the architecture’s boldest moves.' },
  { id: 'load', label: 'Load path verified', text: 'Every load is traced continuously to the ground, then independently checked.' },
];

/**
 * Engineering storytelling diagram: a twin-tower frame with a sky-bridge assembles
 * as the reader scrolls (GSAP ScrollTrigger, scrubbed). Static and complete for
 * reduced-motion users and before JavaScript loads.
 */
export function LoadPathDiagram() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !root.current) return;
    let ctx: { revert: () => void } | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
          defaults: { ease: 'none' },
        });
        tl.fromTo('.lp-grid', { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.02, duration: 0.6 })
          .fromTo('.lp-found', { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, stagger: 0.05, duration: 0.3 }, '<0.3')
          .fromTo('.lp-col', { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.04, duration: 0.8 })
          .fromTo('.lp-floor', { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.03, duration: 0.6 }, '<0.4')
          .fromTo('.lp-bridge', { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.05, duration: 0.8 })
          .fromTo('.lp-load', { strokeDashoffset: 1, opacity: 0.2 }, { strokeDashoffset: 0, opacity: 1, stagger: 0.06, duration: 0.8 })
          .fromTo('.lp-dim', { opacity: 0 }, { opacity: 1, duration: 0.3 }, '<0.3');
        steps.forEach((_, i) => {
          tl.fromTo(`.lp-step-${i}`, { opacity: 0.35 }, { opacity: 1, duration: 0.2 }, i * 0.75);
        });
      }, root);
    });
    return () => ctx?.revert();
  }, []);

  const floorsL = Array.from({ length: 12 }, (_, i) => 380 - i * 26);
  const towerA = [60, 110, 160];
  const towerB = [300, 350, 400];

  return (
    <div ref={root} className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <svg viewBox="0 0 460 440" className="w-full" role="img" aria-labelledby="lp-title lp-desc">
        <title id="lp-title">Structural load-path diagram</title>
        <desc id="lp-desc">Two towers on a column grid, joined at the top by a long-span sky-bridge truss, with gravity loads traced down the columns to the foundations.</desc>
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`gv${i}`} className="lp-grid" x1={30 + i * 45} y1={20} x2={30 + i * 45} y2={420} stroke="currentColor" strokeOpacity={0.08} pathLength={1} strokeDasharray="1" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`gh${i}`} className="lp-grid" x1={20} y1={40 + i * 48} x2={440} y2={40 + i * 48} stroke="currentColor" strokeOpacity={0.08} pathLength={1} strokeDasharray="1" />
        ))}
        {[...towerA, ...towerB].map((x) => (
          <rect key={`f${x}`} className="lp-found" x={x - 12} y={392} width={24} height={14} fill="#8fa2e6" />
        ))}
        <line x1={20} y1={406} x2={440} y2={406} stroke="currentColor" strokeOpacity={0.5} />
        {[...towerA, ...towerB].map((x) => (
          <line key={`c${x}`} className="lp-col" x1={x} y1={392} x2={x} y2={92} stroke="currentColor" strokeWidth={2.5} pathLength={1} strokeDasharray="1" />
        ))}
        {floorsL.map((y) => (
          <g key={`fl${y}`}>
            <line className="lp-floor" x1={50} y1={y} x2={170} y2={y} stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.5} pathLength={1} strokeDasharray="1" />
            <line className="lp-floor" x1={290} y1={y} x2={410} y2={y} stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.5} pathLength={1} strokeDasharray="1" />
          </g>
        ))}
        {/* sky-bridge truss */}
        <line className="lp-bridge" x1={160} y1={92} x2={300} y2={92} stroke="#ed3c32" strokeWidth={3} pathLength={1} strokeDasharray="1" />
        <line className="lp-bridge" x1={160} y1={124} x2={300} y2={124} stroke="#ed3c32" strokeWidth={3} pathLength={1} strokeDasharray="1" />
        <path className="lp-bridge" d="M160 124 L188 92 L216 124 L244 92 L272 124 L300 92" fill="none" stroke="#ed3c32" strokeWidth={1.5} pathLength={1} strokeDasharray="1" />
        {/* load paths */}
        {[...towerA, ...towerB].map((x) => (
          <path key={`lp${x}`} className="lp-load" d={`M${x} 80 L${x} 388`} stroke="#ed3c32" strokeWidth={1} strokeDasharray="1" pathLength={1} fill="none" markerEnd="url(#lp-arrow)" />
        ))}
        <defs>
          <marker id="lp-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10z" fill="#ed3c32" />
          </marker>
        </defs>
        <g className="lp-dim" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor" fillOpacity={0.6}>
          <line x1={160} y1={66} x2={300} y2={66} stroke="currentColor" strokeOpacity={0.4} />
          <line x1={160} y1={60} x2={160} y2={72} stroke="currentColor" strokeOpacity={0.4} />
          <line x1={300} y1={60} x2={300} y2={72} stroke="currentColor" strokeOpacity={0.4} />
          <text x={230} y={60} textAnchor="middle">CLEAR SPAN</text>
          <text x={34} y={430}>A</text>
          <text x={424} y={430}>F</text>
        </g>
      </svg>
      <ol className="space-y-6">
        {steps.map((s, i) => (
          <li key={s.id} className={`lp-step-${i} grid grid-cols-[3rem_1fr] gap-4 border-t border-current/15 pt-5`}>
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="font-display text-lg font-semibold">{s.label}</p>
              <p className="mt-1 text-sm leading-relaxed opacity-70">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
