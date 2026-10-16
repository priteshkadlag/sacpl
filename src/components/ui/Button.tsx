import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost-light' | 'ghost-dark' | 'signal' | 'light';
type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: 'arrow' | 'external' | 'download' | 'none';
  className?: string;
  external?: boolean;
  download?: boolean;
};

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-deep',
  light: 'bg-white text-navy-deep hover:bg-navy-tint',
  signal: 'bg-signal-dark text-white hover:bg-[#a8231b]',
  secondary: 'bg-white text-ink ring-1 ring-ink/15 hover:ring-ink',
  'ghost-light': 'text-white ring-1 ring-white/35 hover:ring-white hover:bg-white/5',
  'ghost-dark': 'text-ink ring-1 ring-ink/25 hover:ring-ink',
};

/**
 * Rectangular button with directional line motion: a hairline sweeps under the
 * label and the arrow travels on hover. Purely CSS, no client JavaScript.
 */
export function Button({ href, children, variant = 'primary', icon = 'arrow', className, external, download }: Props) {
  const Icon = icon === 'external' ? ArrowUpRight : icon === 'download' ? Download : icon === 'arrow' ? ArrowRight : null;
  const cls = cn(
    'group relative inline-flex min-h-12 items-center gap-3 overflow-hidden px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300',
    variants[variant],
    className,
  );
  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />
      </span>
      {Icon && (
        <Icon
          aria-hidden
          className={cn(
            'size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)]',
            icon === 'download' ? 'group-hover:translate-y-0.5' : icon === 'external' ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5' : 'group-hover:translate-x-1',
          )}
        />
      )}
    </>
  );
  if (external || download || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={cls}
        {...(download ? { download: '' } : {})}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
        {href.startsWith('http') && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
