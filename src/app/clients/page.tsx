import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { LogoWall } from '@/components/clients/LogoWall';
import { Counter } from '@/components/motion/Counter';
import { Stagger, RevealItem } from '@/components/motion/Reveal';
import { PendingBadge } from '@/components/ui/Annotation';
import { clientStats, commitments } from '@/content/clients';
import { getClients } from '@/lib/repository';
import { publishable } from '@/lib/verification';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Our Trusted Clients',
  description:
    'Developers, institutions, public bodies and architects who have trusted SACPL with structural engineering — including Adani, AKDN, Hiranandani, K Raheja Corp, L&T, NBCC, Shapoorji Pallonji, Tata Projects and Emaar.',
  path: '/clients',
});

export default async function ClientsPage() {
  const clients = await getClients();
  const national = clients.filter((c) => c.region === 'national');
  const international = clients.filter((c) => c.region === 'international');
  const stats = publishable(clientStats);

  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Our trusted clients."
        intro={<p>Partnering with industry leaders, institutions and public bodies in India and across the globe.</p>}
        crumbs={[{ name: 'Clients', path: '/clients' }]}
        coordinate="SCHEDULE — C"
        size="md"
      >
        <nav aria-label="Client regions" className="flex flex-wrap gap-2">
          <a href="#national" className="inline-flex min-h-11 items-center px-4 text-sm ring-1 ring-white/25 hover:bg-white hover:text-ink">
            National clients <span className="ml-2 font-mono text-xs opacity-60">{national.length}</span>
          </a>
          <a href="#international" className="inline-flex min-h-11 items-center px-4 text-sm ring-1 ring-white/25 hover:bg-white hover:text-ink">
            International clients <span className="ml-2 font-mono text-xs opacity-60">{international.length}</span>
          </a>
        </nav>
      </PageHero>

      <section id="national" aria-labelledby="national-title" className="scroll-mt-24">
        <div className="container-x py-20 lg:py-24">
          <SectionHeader id="national-title" index="01" eyebrow="National clients" title="Across India." />
          <div className="mt-12">
            <LogoWall clients={national} />
          </div>
        </div>
      </section>

      <section id="international" aria-labelledby="international-title" className="scroll-mt-24 border-t border-ink/10">
        <div className="container-x py-20 lg:py-24">
          <SectionHeader id="international-title" index="02" eyebrow="International clients" title="Beyond India." />
          <div className="mt-12">
            <LogoWall clients={international} />
          </div>
        </div>
      </section>

      <section aria-labelledby="partnership-title" className="bg-blueprint-dark bg-ink text-white">
        <div className="container-x py-24 lg:py-28">
          <SectionHeader
            id="partnership-title"
            index="03"
            eyebrow="Building lasting partnerships"
            tone="light"
            title="What sets us apart."
            intro="Our client-first approach builds every partnership on trust, transparency and dependable delivery. We don’t just complete projects — we build long-term relationships that drive mutual success."
          />
          {stats.length > 0 && (
            <dl className="mt-14 grid gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((s) => (
                <div key={s.label} className="bg-ink p-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <Counter value={s.value} suffix={s.suffix} className="font-display text-4xl font-semibold" />
                    <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-white/55 uppercase">{s.label}</p>
                    {s.verification === 'pending' && <PendingBadge className="mt-3" />}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <Stagger className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <RevealItem key={c.title} className="bg-ink p-8">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{c.text}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand title="Start your partnership with SACPL." />
    </>
  );
}
