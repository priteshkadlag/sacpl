import { z } from 'zod';

/**
 * Every claim that came from the legacy site but has not been confirmed by SACPL
 * carries `verification: 'pending'`. Pending items are hidden in production and
 * shown with a marker in development/preview (see src/lib/verification.ts).
 */
export const verification = z.enum(['verified', 'pending']);
export type Verification = z.infer<typeof verification>;

export const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});
export type ImageAsset = z.infer<typeof imageSchema>;

export const projectCategory = z.enum([
  'tall-structures',
  'residential',
  'commercial',
  'institutional',
  'hospitality',
  'healthcare',
  'industrial',
  'sports',
  'public',
  'retail',
  'design-and-bid',
]);
export type ProjectCategory = z.infer<typeof projectCategory>;

export const projectSchema = z.object({
  slug: z.string(),
  sourceId: z.string().optional(),
  name: z.string(),
  category: projectCategory,
  status: z.enum(['completed', 'ongoing']).optional(),
  scope: z.string().optional(),
  bidOutcome: z.enum(['won', 'lost']).optional(),
  location: z.string().optional(),
  country: z.string(),
  international: z.boolean(),
  client: z.string().optional(),
  architect: z.string().optional(),
  inHouseArchitecture: z.boolean().optional(),
  area: z.string().optional(),
  height: z.string().optional(),
  structuralSystem: z.string().optional(),
  specs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  summary: z.string().optional(),
  summaryTruncatedInSource: z.boolean().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  images: z.array(imageSchema),
  featured: z.boolean().optional(),
});
export type Project = z.infer<typeof projectSchema>;

export const serviceSchema = z.object({
  slug: z.string(),
  number: z.string(),
  title: z.string(),
  shortTitle: z.string(),
  summary: z.string(),
  description: z.array(z.string()),
  capabilities: z.array(z.string()),
  deliverables: z.array(z.string()),
  tools: z.array(z.string()).optional(),
  toolsSource: z.string().optional(),
  relatedProjects: z.array(z.string()),
  icon: z.string(),
  image: imageSchema,
  onHomepage: z.boolean(),
});
export type Service = z.infer<typeof serviceSchema>;

export const clientSchema = z.object({
  name: z.string(),
  logo: z.string(),
  website: z.string().url().optional(),
  sector: z.string().optional(),
  region: z.enum(['national', 'international']),
  featured: z.boolean().optional(),
});
export type Client = z.infer<typeof clientSchema>;

export const articleBlock = z.discriminatedUnion('type', [
  z.object({ type: z.literal('p'), text: z.string() }),
  z.object({ type: z.literal('h2'), text: z.string() }),
  z.object({ type: z.literal('ul'), items: z.array(z.string()) }),
  z.object({ type: z.literal('facts'), items: z.array(z.object({ label: z.string(), value: z.string() })) }),
]);
export type ArticleBlock = z.infer<typeof articleBlock>;

export const articleSchema = z.object({
  slug: z.string(),
  sourceId: z.string(),
  title: z.string(),
  excerpt: z.string(),
  body: z.array(articleBlock),
  bodyComplete: z.boolean(),
  image: imageSchema,
  author: z.string().optional(),
  category: z.string(),
  publishedAt: z.string(),
  relatedProjects: z.array(z.string()),
  featured: z.boolean().optional(),
});
export type Article = z.infer<typeof articleSchema>;

export const jobSchema = z.object({
  slug: z.string(),
  sourceId: z.string(),
  title: z.string(),
  department: z.string(),
  location: z.string(),
  locations: z.array(z.string()),
  workMode: z.enum(['On-site', 'Hybrid', 'Remote']).optional(),
  employmentType: z.enum(['FULL_TIME', 'INTERNSHIP', 'PART_TIME', 'CONTRACTOR']),
  experience: z.string().optional(),
  summary: z.string().optional(),
  responsibilities: z.array(z.object({ heading: z.string().optional(), items: z.array(z.string()) })),
  qualifications: z.array(z.string()),
  software: z.array(z.string()),
  status: z.enum(['open', 'closed']),
  publishedAt: z.string(),
  closingDate: z.string().optional(),
  notes: z.array(z.string()).optional(),
});
export type Job = z.infer<typeof jobSchema>;

export const officeSchema = z.object({
  id: z.string(),
  name: z.string(),
  headquarters: z.boolean(),
  addressLines: z.array(z.string()),
  locality: z.string(),
  region: z.string(),
  postalCode: z.string().optional(),
  country: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  hours: z.string().optional(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  mapEmbed: z.string().optional(),
  verification,
  verificationNote: z.string().optional(),
});
export type Office = z.infer<typeof officeSchema>;
