import { PageHero } from './PageHero';
import { PendingBadge } from '@/components/ui/Annotation';
import { SHOW_PENDING } from '@/lib/verification';

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} crumbs={[{ name: title, path }]} size="md" intro={<p>Last updated {updated}</p>} />
      <div className="container-x py-16 lg:py-24">
        {SHOW_PENDING && <PendingBadge className="mb-8" note="Draft text — requires review by SACPL’s legal adviser before launch." />}
        <div className="prose-sacpl max-w-3xl">{children}</div>
      </div>
    </>
  );
}
