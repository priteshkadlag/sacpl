import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ArticleCard, ArticleMeta } from '@/components/insights/ArticleCard';
import { ShareLinks } from '@/components/insights/ShareLinks';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/seo/JsonLd';
import type { ArticleBlock } from '@/content/schema';
import { siteUrl } from '@/content/company';
import { getArticle, getArticles, getProjectsBySlugs } from '@/lib/repository';
import { articleJsonLd, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getArticle((await params).slug);
  if (!a) return {};
  return {
    ...pageMetadata({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}`, image: a.image.src, type: 'article' }),
    other: { 'article:published_time': a.publishedAt },
  };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>;
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'ul':
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case 'facts':
      return (
        <dl className="not-prose grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {block.items.map((f) => (
            <div key={f.label} className="bg-white px-5 py-4">
              <dt className="font-mono text-[10px] tracking-[0.16em] text-steel uppercase">{f.label}</dt>
              <dd className="mt-1 text-[0.95rem] text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      );
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const [all, projects] = await Promise.all([getArticles(), getProjectsBySlugs(article.relatedProjects)]);
  const more = all.filter((a) => a.slug !== slug).slice(0, 2);
  const url = `${siteUrl}/insights/${article.slug}`;

  return (
    <>
      <article>
        <header className="bg-blueprint-dark bg-ink pt-36 pb-16 text-white lg:pt-44">
          <div className="container-x page-enter max-w-4xl">
            <Breadcrumbs
              items={[
                { name: 'Insights', path: '/insights' },
                { name: article.title, path: `/insights/${article.slug}` },
              ]}
            />
            <div className="mt-10">
              <ArticleMeta article={article} tone="light" />
            </div>
            <h1 className="mt-5 font-display text-display-lg font-semibold">{article.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{article.excerpt}</p>
            <p className="mt-6 text-sm text-white/60">By {article.author ?? 'SACPL'}</p>
          </div>
        </header>
        <div className="container-x -mt-px">
          <figure className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden bg-graphite">
            <Image src={article.image.src} alt={article.image.alt} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </figure>
        </div>
        <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <div className="prose-sacpl lg:col-span-7 lg:col-start-3">
            {article.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
          <aside className="lg:col-span-2 lg:col-start-11" aria-label="Share">
            <div className="lg:sticky lg:top-28">
              <ShareLinks url={url} title={article.title} />
            </div>
          </aside>
        </div>
      </article>

      {projects.length > 0 && (
        <section aria-labelledby="related-projects" className="border-t border-ink/10 bg-paper-2">
          <div className="container-x py-20">
            <h2 id="related-projects" className="font-display text-3xl font-semibold">Related projects</h2>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section aria-labelledby="more-insights" className="border-t border-ink/10">
          <div className="container-x py-20">
            <h2 id="more-insights" className="font-display text-3xl font-semibold">More insights</h2>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2">
              {more.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
            <Link href="/insights" className="mt-12 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-navy hover:underline">
              <ArrowLeft aria-hidden className="size-4" /> All insights
            </Link>
          </div>
        </section>
      )}
      <CtaBand />
      <JsonLd data={articleJsonLd(article)} />
    </>
  );
}
