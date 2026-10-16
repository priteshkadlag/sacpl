import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ArticleCard } from '@/components/insights/ArticleCard';
import { InsightsBrowser } from '@/components/insights/InsightsBrowser';
import { CtaBand } from '@/components/sections/CtaBand';
import { getArticles } from '@/lib/repository';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Insights — Structural Engineering Projects & Stories',
  description: 'Project stories and engineering detail from SACPL, including World Trade Centre New Delhi, Sardardham Campus Ahmedabad and Yamuna Skycity Mangalore.',
  path: '/insights',
});

export default async function InsightsPage() {
  const articles = await getArticles();
  const featured = articles.find((a) => a.featured) ?? articles[0];

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from the drawing board."
        intro={<p>Project stories, structural detail and news from the SACPL team.</p>}
        crumbs={[{ name: 'Insights', path: '/insights' }]}
        coordinate="NOTES — 01"
        size="md"
      />
      {featured && (
        <section aria-labelledby="featured-insight" className="border-b border-ink/10">
          <div className="container-x py-16 lg:py-20">
            <h2 id="featured-insight" className="eyebrow mb-8 text-steel">Featured</h2>
            <div className="max-w-5xl">
              <ArticleCard article={featured} large />
            </div>
          </div>
        </section>
      )}
      <section aria-labelledby="all-insights">
        <div className="container-x py-16 lg:py-24">
          <h2 id="all-insights" className="font-display text-3xl font-semibold">All insights</h2>
          <InsightsBrowser articles={articles} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
