import { services } from './services';

export type NavItem = { label: string; href: string; children?: { label: string; href: string; description?: string }[] };

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Expertise',
    href: '/expertise',
    children: services.map((s) => ({ label: s.title, href: `/expertise/${s.slug}`, description: s.summary })),
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Clients', href: '/clients' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const startProjectHref = '/contact#enquiry';
export const loginHref = '/login';
