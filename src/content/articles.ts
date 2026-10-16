import type { Article } from './schema';

/**
 * Articles migrated from the legacy /blogs pages. Bodies contain only source text
 * retrieved during migration; `bodyComplete: false` means the remaining body text
 * must be exported from the legacy CMS (see docs/CONTENT-VERIFICATION.md).
 */
export const articles: Article[] = [
  {
    slug: 'world-trade-centre-new-delhi',
    sourceId: '833d8edc-1c62-40fa-9e6e-cb7141fe7ed5',
    title: 'World Trade Centre, New Delhi',
    category: 'Commercial',
    publishedAt: '2025-08-12T23:33:00+00:00',
    excerpt:
      'WTC is an integrated commercial complex of 12 towers spanning over 55 lakh square feet of commercial space, recognised as a World Trade Center through membership of the World Trade Centers Association.',
    image: { src: '/media/insights/world-trade-centre.webp', alt: 'Rendering of the World Trade Centre complex in New Delhi with its sky bridge', width: 1533, height: 905 },
    body: [
      {
        type: 'p',
        text: 'WTC is an integrated commercial complex of 12 towers spanning over 55 lakh square feet of commercial space. The project has obtained membership of the World Trade Centers Association (WTCA) in New York, allowing it to be recognised as a World Trade Center.',
      },
      {
        type: 'p',
        text: 'The project is divided into the commercial block in the tower area, a non-tower area for retail and a school, and a sky-bridge block housing a restaurant.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Project', value: 'World Trade Centre' },
          { label: 'Location', value: 'New Delhi' },
          { label: 'Client', value: 'NBCC' },
          { label: 'EPC contractor', value: 'NCC' },
          { label: 'Area', value: '55 lakh sq ft' },
          { label: 'Distinctive feature', value: 'Cantilevered sky bridge' },
        ],
      },
      { type: 'h2', text: 'Materials and framing' },
      {
        type: 'p',
        text: 'A combination of high-grade concrete, structural steel, post-tensioning and composite sections has been used across the entire project.',
      },
      {
        type: 'p',
        text: 'The iconic feature of the project is the restaurant, which is supported on a balanced cantilever on the central core.',
      },
    ],
    bodyComplete: false,
    relatedProjects: ['world-trade-centre', 'netaji-nagar'],
    featured: true,
  },
  {
    slug: 'sardardham-campus-ahmedabad',
    sourceId: 'ce3dc428-d6f0-48b0-94ff-900970bb65d7',
    title: 'Sardardham Campus, Ahmedabad',
    category: 'Institutional',
    publishedAt: '2025-08-06T15:01:00+00:00',
    excerpt:
      'SACPL is the structural consultant for the Sardardham Girls’ Hostel in Ahmedabad, a flagship project of the Vishwa Patidar Samaj within the Sardardham Bhavan Complex.',
    image: { src: '/media/insights/sardardham-campus.webp', alt: 'Sardardham Campus, Ahmedabad', width: 1260, height: 722 },
    body: [
      {
        type: 'p',
        text: 'SACPL is proud to be associated as the structural consultant for the Sardardham Girls’ Hostel, Ahmedabad, a flagship project under the initiative of the Vishwa Patidar Samaj (VPS). This socially impactful development is part of the larger Sardardham Bhavan Complex, designed to foster educational excellence and create a strong foundation for women’s empowerment.',
      },
      { type: 'h2', text: 'Project overview' },
      {
        type: 'facts',
        items: [
          { label: 'Project', value: 'Sardardham Campus (Kanya Chhatralaya)' },
          { label: 'Location', value: 'S.P. Ring Road, Vaishnodevi Circle, Ahmedabad' },
          { label: 'Client', value: 'Vishwa Patidar Samaj' },
          { label: 'Architect', value: 'MMP Architects' },
          { label: 'Configuration', value: '2B + 13' },
          { label: 'Development', value: 'Multi-block development within the Sardardham Bhavan Campus' },
        ],
      },
      { type: 'h2', text: 'Statue' },
      {
        type: 'ul',
        items: [
          'Statue height: 15 m, on a 2 m pedestal',
          'Construction: bronze covering over a hollow stainless-steel internal frame',
          'Statue load: 17 t',
        ],
      },
    ],
    bodyComplete: false,
    relatedProjects: ['sardardham-campus', 'nirma-university'],
  },
  {
    slug: 'yamuna-skycity-mangalore',
    sourceId: '09bd3773-3c87-4677-89ff-9d42617e13e6',
    title: 'Yamuna Skycity, Mangalore',
    category: 'High-rise',
    publishedAt: '2025-08-12T17:25:00+00:00',
    excerpt:
      'Yamuna Skycity is one of the tallest buildings in South India: a high-rise within a 45-acre gated residential complex, within 150 m of the Arabian Sea at Kulai, Mangalore.',
    image: { src: '/media/insights/yamuna-skycity.webp', alt: 'Yamuna Skycity tower, Mangalore', width: 640, height: 306 },
    body: [
      {
        type: 'p',
        text: 'Yamuna Skycity is one of the tallest buildings in South India. This high-rise structure is part of a 45-acre gated residential complex and falls within 150 m of the Arabian Sea in Kulai, Mangalore.',
      },
      {
        type: 'facts',
        items: [
          { label: 'Project', value: 'Yamuna Skycity' },
          { label: 'Location', value: 'Kulai, Mangalore' },
          { label: 'Client', value: 'Yamuna Builders' },
          { label: 'Architect', value: 'Architechnis' },
          { label: 'Area', value: '10 lakh sq ft' },
          { label: 'Height', value: '199.75 m' },
          { label: 'Floors', value: 'Ground + 60' },
          { label: 'Execution partner', value: 'Ducon Contractors Pvt. Ltd.' },
        ],
      },
    ],
    bodyComplete: false,
    relatedProjects: ['yamuna-skycity', 'bhandary-vertica', 'planet-sks'],
  },
];
