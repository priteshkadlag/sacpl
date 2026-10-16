/**
 * Permanent (308) redirects from the legacy sacpl.co URL scheme.
 * Case-only changes (/Clients → /clients, /Contact → /contact) are handled in
 * src/middleware.ts to avoid case-insensitive self-matches. Full map: docs/REDIRECTS.md.
 */
type Redirect = { source: string; destination: string; permanent: true };
const r = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

// Legacy /blogs/<uuid> → /insights/<slug>
const blogs: [string, string][] = [
  ['833d8edc-1c62-40fa-9e6e-cb7141fe7ed5', '/insights/world-trade-centre-new-delhi'],
  ['ce3dc428-d6f0-48b0-94ff-900970bb65d7', '/insights/sardardham-campus-ahmedabad'],
  ['09bd3773-3c87-4677-89ff-9d42617e13e6', '/insights/yamuna-skycity-mangalore'],
  // Deleted / demo posts in the legacy CMS
  ['f432085b-78cb-4544-8c4b-10b8f93dfba5', '/projects/northern-hills'],
  ['f922cccd-058e-419a-af25-9fb90c1d68eb', '/insights'],
  ['d96f575b-32a3-4fc7-99ec-ea03cc32c42c', '/insights'],
  ['4cd1f3e3-a9a7-4ac3-a7a8-6ceb855075b0', '/insights'],
];

// Legacy /careers/<uuid> → /careers/<slug>
const careers: [string, string][] = [
  ['52928adb-47fc-46ad-a618-aa6a8774fac6', '/careers/btech-junior-engineer'],
  ['d4884b5f-ab70-4614-86d5-0d3a6f644786', '/careers/structural-draftsman'],
  ['9ed9381d-3b51-4ec0-9835-da7c0a1c3462', '/careers/junior-design-engineer'],
  ['5c21fa59-c293-494c-a0b3-03e485d500cd', '/careers/senior-structural-engineer'],
  ['6eea38d6-03b7-47ef-a63d-66056b5e9d19', '/careers/senior-structural-engineer'],
  ['57a1b4ee-1065-4ab0-b0fc-bd704b63cf6e', '/careers/business-development-manager'],
  ['4d65589e-8263-42d8-b958-502de335df75', '/careers/junior-engineer-qa-qc'],
  ['200d9e15-5ed4-47fb-b01e-85902bdf0cce', '/careers/junior-engineer-qa-qc'],
  // Closed roles not carried over
  ['acd9c3df-445d-4fe4-9469-1baa5186586a', '/careers'],
  ['675a3979-b075-4959-baa4-dc2eef3cc1f2', '/careers'],
  ['41e46b38-fa89-49d7-ac7f-82bdacea314b', '/careers'],
  ['f8784d39-f219-4a74-b2ee-f2c0606d0bc8', '/careers'],
  ['86158138-ac68-4598-9168-a63bafe1c250', '/careers'],
  ['ac4f4451-4657-44dc-9e07-280f098d3df5', '/careers'],
];

export const legacyRedirects: Redirect[] = [
  r('/blogs', '/insights'),
  ...blogs.map(([id, to]) => r(`/blogs/${id}`, to)),
  r('/blogs/:id', '/insights'),
  ...careers.map(([id, to]) => r(`/careers/${id}`, to)),
  // Legacy GST certificate path (was linked as the "company profile")
  r('/_files/ugd/865611_b627109b18b1412690e3881dd0bff5db.pdf', '/documents/sacpl-gst-registration-certificate.pdf'),
];
