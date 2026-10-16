'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

/*
 * Reduced motion is applied through transition timing only (duration 0), never
 * through `initial`, so server and client render identical markup and hydration
 * never diverges. Reduced-motion users see content appear instantly.
 */

/** Fade/rise on first entry into the viewport. Content is server-rendered (indexable). */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  return (
    <LazyMotion features={domAnimation} strict>
      <Comp
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={reduce ? { duration: 0 } : { duration: 0.8, delay, ease }}
      >
        {children}
      </Comp>
    </LazyMotion>
  );
}

/** Restrained architectural mask reveal for imagery: the frame opens bottom-up. */
export function MaskReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={cn('overflow-hidden', className)}
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={reduce ? { duration: 0 } : { duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

/** Staggered list container; children should be <RevealItem>. */
export function Stagger({ children, className, as = 'ul' }: { children: React.ReactNode; className?: string; as?: 'ul' | 'div' | 'ol' }) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  return (
    <LazyMotion features={domAnimation} strict>
      <Comp
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.07 } } }}
      >
        {children}
      </Comp>
    </LazyMotion>
  );
}

export function RevealItem({ children, className, as = 'li' }: { children: React.ReactNode; className?: string; as?: 'li' | 'div' }) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  return (
    <Comp
      className={className}
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { duration: 0.6, ease } } }}
    >
      {children}
    </Comp>
  );
}
