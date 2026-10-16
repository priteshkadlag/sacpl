import type { Metadata } from 'next';
import { company, contacts, offices, siteUrl, socials } from '@/content/company';
import type { Article, Job, Project, Service } from '@/content/schema';
import { categoryLabels } from '@/content/categories';
import { founder } from '@/content/people';

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, image, type = 'website', noindex }: PageMeta): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: 'SACPL',
      locale: 'en_IN',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, ...(image ? { images: [image] } : {}) },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

const hq = offices.find((o) => o.headquarters)!;
const orgId = `${siteUrl}/#organization`;

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': orgId,
    name: company.legalName,
    alternateName: [company.shortName, company.displayName],
    url: siteUrl,
    logo: `${siteUrl}/brand/sacpl-logo.png`,
    image: `${siteUrl}/opengraph-image`,
    description: company.description,
    email: contacts.businessEmails[0],
    telephone: hq.phone,
    taxID: company.gstin,
    founder: { '@type': 'Person', name: founder.name.replace(/^Mr\.\s/, ''), jobTitle: founder.role },
    address: {
      '@type': 'PostalAddress',
      streetAddress: hq.addressLines.join(', '),
      addressLocality: hq.locality,
      addressRegion: hq.region,
      postalCode: hq.postalCode,
      addressCountry: 'IN',
    },
    geo: hq.coordinates ? { '@type': 'GeoCoordinates', latitude: hq.coordinates.lat, longitude: hq.coordinates.lng } : undefined,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:30',
    },
    areaServed: 'India and international',
    sameAs: socials.map((s) => s.href),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${siteUrl}${it.path}` })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: { '@id': orgId },
    url: `${siteUrl}/expertise/${service.slug}`,
  };
}

export function projectJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    genre: categoryLabels[project.category],
    url: `${siteUrl}/projects/${project.slug}`,
    image: project.images.map((i) => `${siteUrl}${i.src}`),
    locationCreated: project.location ? { '@type': 'Place', name: project.location, address: { '@type': 'PostalAddress', addressCountry: project.country } } : undefined,
    creator: { '@id': orgId },
    sourceOrganization: { '@id': orgId },
    ...(project.client ? { funder: { '@type': 'Organization', name: project.client } } : {}),
    ...(project.summary ? { description: project.summary } : {}),
  };
}

export function articleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [`${siteUrl}${article.image.src}`],
    datePublished: article.publishedAt,
    author: article.author ? { '@type': 'Person', name: article.author } : { '@id': orgId },
    publisher: { '@id': orgId },
    mainEntityOfPage: `${siteUrl}/insights/${article.slug}`,
  };
}

/** Only for open roles with a confirmed location; hybrid roles without a base office are skipped. */
export function jobPostingJsonLd(job: Job) {
  if (job.status !== 'open' || job.locations.length === 0) return null;
  const description = job.responsibilities.map((s) => `${s.heading ? `<p><strong>${s.heading}</strong></p>` : ''}<ul>${s.items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('');
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description,
    datePosted: job.publishedAt,
    ...(job.closingDate ? { validThrough: job.closingDate } : {}),
    employmentType: job.employmentType,
    hiringOrganization: { '@type': 'Organization', name: company.legalName, sameAs: siteUrl, logo: `${siteUrl}/brand/sacpl-logo.png` },
    jobLocation: job.locations.map((city) => ({
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'IN' },
    })),
    ...(job.experience ? { experienceRequirements: job.experience } : {}),
    ...(job.software.length ? { skills: job.software.join(', ') } : {}),
  };
}
