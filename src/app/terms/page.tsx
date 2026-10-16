import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { company } from '@/content/company';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Use',
  description: 'Terms governing use of the SACPL website.',
  path: '/terms',
  noindex: process.env.LEGAL_APPROVED !== 'true',
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" path="/terms" updated="October 2026">
      <p>This website is operated by {company.legalName}. By using it you agree to these terms.</p>
      <h2>Information only</h2>
      <p>Content on this site describes SACPL’s services and past work for general information. It is not engineering advice for any specific project, and no professional relationship is created until an engagement is agreed in writing.</p>
      <h2>Intellectual property</h2>
      <p>Text, drawings, models and images on this site belong to SACPL or are used with the permission of their owners, including clients and architects. Client names and logos are trademarks of their respective owners. Please do not reproduce material without permission.</p>
      <h2>External links</h2>
      <p>Links to client and third-party websites are provided for convenience; SACPL is not responsible for their content.</p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date at the top of this page shows the latest revision.</p>
    </LegalPage>
  );
}
