import { Eyebrow } from '@/components/ui/Annotation';
import { cn } from '@/lib/utils';

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  tone = 'dark',
  action,
  id,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: 'dark' | 'light';
  action?: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn('grid gap-8 lg:grid-cols-12 lg:items-end', className)}>
      <div className="lg:col-span-7">
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className="mt-5 font-display text-display-md font-semibold">
          {title}
        </h2>
      </div>
      {(intro || action) && (
        <div className="flex flex-col gap-6 lg:col-span-5 lg:items-start">
          {intro && <div className={cn('text-[1.05rem] leading-relaxed', tone === 'light' ? 'text-white/70' : 'text-graphite/80')}>{intro}</div>}
          {action}
        </div>
      )}
    </div>
  );
}
