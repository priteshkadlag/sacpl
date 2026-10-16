import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationJsonLd } from '@/lib/seo';
import { company, siteUrl } from '@/content/company';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'optional' });
const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex-sans', display: 'optional' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', display: 'optional' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `SACPL — Structural Engineering Consultants | ${company.displayName}`, template: '%s | SACPL' },
  description: company.description,
  applicationName: 'SACPL',
  authors: [{ name: company.legalName }],
  formatDetection: { telephone: false },
  openGraph: { siteName: 'SACPL', locale: 'en_IN', type: 'website' },
};

export const viewport: Viewport = {
  themeColor: '#0d1014',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 bg-signal-dark px-4 py-3 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <SmoothScroll />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
