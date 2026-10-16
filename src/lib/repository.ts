import 'server-only';
import { z } from 'zod';
import projectsJson from '@/content/projects.json';
import { articles as articlesData } from '@/content/articles';
import { jobs as jobsData } from '@/content/jobs';
import { services as servicesData } from '@/content/services';
import { clients as clientsData } from '@/content/clients';
import { articleSchema, clientSchema, jobSchema, projectSchema, serviceSchema, type Project, type ProjectCategory } from '@/content/schema';

/**
 * Content repository. Pages and components only ever call these async functions,
 * so the backing store can move from the local typed files to Supabase or a
 * headless CMS without touching UI code (see docs/CMS.md).
 * Data is validated once at build time; a malformed record fails the build.
 */
const projects = z.array(projectSchema).parse(projectsJson);
const articles = z.array(articleSchema).parse(articlesData).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const jobs = z.array(jobSchema).parse(jobsData).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const services = z.array(serviceSchema).parse(servicesData);
const clients = z.array(clientSchema).parse(clientsData);

export { categoryLabels } from '@/content/categories';
export type { ProjectCategory };

// Projects ---------------------------------------------------------------
export async function getProjects(): Promise<Project[]> {
  return projects;
}
export async function getFeaturedProjects(): Promise<Project[]> {
  const order = ['prince-aga-khan', 'northern-hills', 'bhandary-vertica', 'boulevard-heights', 'doha-city-center', 'lotus-sky-garden', 'kanakia-levels', 'arihant-aspire', 'westline-signature', 'planet-sks', 'pspf-commercial-building', 'icon-jacob-circle'];
  return projects.filter((p) => p.featured).sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}
export async function getProject(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}
export async function getProjectsBySlugs(slugs: string[]): Promise<Project[]> {
  return slugs.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => !!p);
}
export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  const same = projects.filter((p) => p.slug !== project.slug && p.category === project.category && p.images.length);
  const score = (p: Project) => (p.client && p.client === project.client ? 2 : 0) + (p.country === project.country ? 1 : 0);
  return same.sort((a, b) => score(b) - score(a)).slice(0, limit);
}

// Services ---------------------------------------------------------------
export async function getServices() {
  return services;
}
export async function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

// Clients ----------------------------------------------------------------
export async function getClients() {
  return clients;
}

// Articles ---------------------------------------------------------------
export async function getArticles() {
  return articles;
}
export async function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

// Jobs -------------------------------------------------------------------
export async function getJobs(status?: 'open' | 'closed') {
  return status ? jobs.filter((j) => j.status === status) : jobs;
}
export async function getJob(slug: string) {
  return jobs.find((j) => j.slug === slug);
}

// Legacy IDs (used for permanent redirects) ------------------------------
export function legacyIdMaps() {
  return {
    articles: articles.map((a) => ({ id: a.sourceId, slug: a.slug })),
    jobs: jobs.map((j) => ({ id: j.sourceId, slug: j.slug })),
  };
}
