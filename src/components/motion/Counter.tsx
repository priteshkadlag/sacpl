'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

/**
 * Counts up once when visible. Only ever given verified figures (see StatsBand).
 * The final value is server-rendered so crawlers and no-JS users see the real number.
 */
export function Counter({ value, prefix = '', suffix = '', className }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    setDisplay(0);
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {prefix}
        {display.toLocaleString('en-IN')}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  );
}
