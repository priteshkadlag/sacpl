import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/content/schema';
import { formatDate, readingTime } from '@/lib/utils';

export function articleText(a: Article) {
  return [a.excerpt, ...a.body.map((b) => (b.type === 'ul' ? b.items.join(' ') : b.type === 'facts' ? b.items.map((i) => `${i.label} ${i.value}`).join(' ') : b.text))].join(' ');
}

export function ArticleMeta({ article, tone = 'dark' }: { article: Article; tone?: 'dark' | 'light' }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.14em] uppercase ${tone === 'light' ? 'text-white/60' : 'text-steel'}`}>
      <span className="text-accent">{article.category}</span>
      <span aria-hidden>·</span>
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span>{readingTime(articleText(article))} min read</span>
    </p>
  );
}

export function ArticleCard({ article, large, priority = large, headingLevel: H = 'h3' }: { article: Article; large?: boolean; priority?: boolean; headingLevel?: 'h2' | 'h3' }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className={`relative overflow-hidden bg-graphite ${large ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}>
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          priority={priority}
          sizes={large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <ArticleMeta article={article} />
        <H className={`mt-3 font-display font-semibold ${large ? 'text-3xl' : 'text-xl'}`}>
          <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </H>
        <p className="mt-3 line-clamp-3 leading-relaxed text-graphite/80">{article.excerpt}</p>
        <span aria-hidden className="link-line mt-auto w-fit pt-5 text-sm font-medium text-navy group-hover:bg-[length:100%_1px]">
          Read article
        </span>
      </div>
    </article>
  );
}
