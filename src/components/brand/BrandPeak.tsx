import { cn } from '@/lib/utils';

/**
 * The SACPL peak: the logo's concave triangle, red core and base line, drawn as SVG
 * so it can be used as a large decorative motif. Always decorative (aria-hidden).
 */
export function BrandPeak({ className, variant = 'solid' }: { className?: string; variant?: 'solid' | 'outline' }) {
  const outline = variant === 'outline';
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={cn('shrink-0', className)} fill="none">
      <path
        d="M60 4 C57 44 40 80 6 100 L114 100 C80 80 63 44 60 4 Z"
        fill={outline ? 'none' : 'currentColor'}
        stroke={outline ? 'currentColor' : 'none'}
        strokeWidth={outline ? 0.6 : 0}
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="56" cy="72" r="12" fill={outline ? 'none' : '#ed3c32'} stroke={outline ? 'currentColor' : 'none'} strokeWidth={outline ? 1 : 0} vectorEffect="non-scaling-stroke" />
      <path d="M4 110 H116" stroke="currentColor" strokeWidth={outline ? 0.6 : 3} vectorEffect={outline ? 'non-scaling-stroke' : undefined} />
    </svg>
  );
}
