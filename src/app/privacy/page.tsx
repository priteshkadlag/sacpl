import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { company, contacts } from '@/content/company';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Notice',
  description: 'How SACPL collects and uses personal information submitted through this website.',
  path: '/privacy',
  noindex: process.env.LEGAL_APPROVED !== 'true',
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" path="/privacy" updated="October 2026">
      <p>
        This notice explains how {company.legalName} (“SACPL”, “we”) handles personal information submitted through this website. It covers the project-enquiry form, the job-application form and direct email or telephone contact.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Project enquiries: your name, email address, phone number, company, project location, service and project type, approximate area, timeline, message and any document you choose to attach.</li>
        <li>Job applications: your name, email address, phone number, current location, the position and experience you state, an optional portfolio or LinkedIn link, your résumé and any cover message.</li>
        <li>Basic technical data needed to operate and protect the site, such as your IP address, which we use only to limit repeated automated submissions.</li>
      </ul>
      <h2>How we use it</h2>
      <p>We use enquiry details only to respond to you and discuss your project, and application details only to assess your suitability for roles at SACPL. We do not sell your information or use it for unrelated marketing.</p>
      <h2>Third-party services</h2>
      <p>
        Embedded YouTube videos load only after you choose to play them, via YouTube’s privacy-enhanced domain. The office map is provided by Google Maps. These services apply their own privacy policies when you use them. This site does not use advertising or analytics cookies.
      </p>
      <h2>Retention</h2>
      <p>We keep enquiries and applications only for as long as needed for the purpose above, or as required by law.</p>
      <h2>Your choices</h2>
      <p>
        To access, correct or delete information you have sent us, email <a href={`mailto:${contacts.businessEmails[0]}`}>{contacts.businessEmails[0]}</a> (enquiries) or{' '}
        <a href={`mailto:${contacts.careersEmail}`}>{contacts.careersEmail}</a> (applications).
      </p>
    </LegalPage>
  );
}
