import Link from 'next/link';
import { ArrowRight, Briefcase, Clock, MapPin } from 'lucide-react';
import type { Job } from '@/content/schema';
import { formatDate } from '@/lib/utils';

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative grid gap-4 border-t border-ink/12 py-8 transition-colors hover:bg-white sm:grid-cols-12 sm:items-center sm:px-4">
      <div className="sm:col-span-6">
        <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">{job.department}</p>
        <h3 className="mt-2 font-display text-xl font-semibold">
          <Link href={`/careers/${job.slug}`} className="after:absolute after:inset-0">
            {job.title}
          </Link>
        </h3>
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-graphite/80 sm:col-span-5">
        <li className="flex items-center gap-1.5">
          <MapPin aria-hidden className="size-4 text-steel" />
          {job.location}
        </li>
        {job.experience && (
          <li className="flex items-center gap-1.5">
            <Briefcase aria-hidden className="size-4 text-steel" />
            {job.experience}
          </li>
        )}
        <li className="flex items-center gap-1.5">
          <Clock aria-hidden className="size-4 text-steel" />
          Posted <time dateTime={job.publishedAt}>{formatDate(job.publishedAt)}</time>
        </li>
      </ul>
      <ArrowRight aria-hidden className="size-5 justify-self-end transition-transform group-hover:translate-x-1 sm:col-span-1" />
    </article>
  );
}
