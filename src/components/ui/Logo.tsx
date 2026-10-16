import Image from 'next/image';
import { cn } from '@/lib/utils';

/** Official SACPL logo (migrated raster). `tone="light"` is the white variant for dark backgrounds. */
export function Logo({ tone = 'dark', className, priority }: { tone?: 'dark' | 'light'; className?: string; priority?: boolean }) {
  return (
    <Image
      src={tone === 'light' ? '/brand/sacpl-logo-light.png' : '/brand/sacpl-logo.png'}
      alt="SACPL"
      width={917}
      height={272}
      priority={priority}
      sizes="160px"
      className={cn('h-8 w-auto sm:h-9', className)}
    />
  );
}
