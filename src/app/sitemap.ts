import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/company';
import { getArticles, getJobs, getProjects, getServices } from '@/lib/repository';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, articles, jobs] = await Promise.all([getProjects(), getServices(), getArticles(), getJobs('open')]);
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly', lastModified: Date = now) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    page('/', 1, 'weekly'),
    page('/about', 0.8),
    page('/expertise', 0.9),
    ...services.map((s) => page(`/expertise/${s.slug}`, 0.8)),
    page('/projects', 0.9, 'weekly'),
    ...projects.map((p) => page(`/projects/${p.slug}`, p.featured ? 0.7 : 0.5)),
    page('/clients', 0.6),
    page('/insights', 0.7, 'weekly'),
    ...articles.map((a) => page(`/insights/${a.slug}`, 0.6, 'yearly', new Date(a.publishedAt))),
    page('/careers', 0.7, 'weekly'),
    ...jobs.map((j) => page(`/careers/${j.slug}`, 0.6, 'weekly', new Date(j.publishedAt))),
    page('/contact', 0.8),
  ];
}
