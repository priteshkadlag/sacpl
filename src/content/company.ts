import type { Office, Verification } from './schema';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sacpl.co').replace(/\/$/, '');

export const company = {
  legalName: 'Shanghvi & Associates Consultants Private Limited',
  displayName: 'Shanghvi and Associates Consultants Private Limited',
  shortName: 'SACPL',
  // Confirmed by the GST registration certificate (Form GST REG-06).
  gstin: '27AALCS3411K1Z7',
  gstCertificate: '/documents/sacpl-gst-registration-certificate.pdf',
  /**
   * The legacy "company profile" link actually pointed to the GST certificate.
   * Set this to the real company-profile PDF (e.g. /documents/sacpl-company-profile.pdf)
   * once SACPL supplies it; every "Download company profile" action appears automatically.
   */
  companyProfilePdf: undefined as string | undefined,
  foundingYear: { value: 1973, verification: 'pending' as Verification, source: 'Legacy About page ("established in 1973")' },
  tagline: 'Structural Engineering for Tomorrow’s Landmarks.',
  description:
    'SACPL (Shanghvi and Associates Consultants Private Limited) is a Mumbai-headquartered structural engineering consultancy delivering structural design, peer review, BIM and design-consulting services for residential, commercial, institutional, hospitality, healthcare, industrial and sports projects in India and internationally.',
} as const;

export const contacts = {
  primaryPhone: { label: 'Suresh Shriyan', display: '+91 98672 00065', href: 'tel:+919867200065' },
  secondaryPhone: { label: 'Awez Waghu', display: '+91 85910 93540', href: 'tel:+918591093540' },
  businessEmails: ['suresh.shriyan@sacpl.co', 'awez.waghu@sacpl.co'],
  careersEmail: 'careers@sacpl.co',
  hours: 'Monday–Friday, 10:00 AM–6:30 PM',
} as const;

export const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/sacpl' },
  { name: 'Instagram', href: 'https://www.instagram.com/sacpl.co/' },
  { name: 'Facebook', href: 'https://www.facebook.com/SACPLMUMBAI/' },
] as const;

export const youtubeCultureVideoId = 'ctpAOlBIPNM';

/** Migrated from the legacy homepage (originally abvid.mp4 on Supabase storage). */
export const film = {
  src: '/media/video/sacpl-film-720p.mp4',
  poster: '/media/video/sacpl-film-poster.webp',
  title: 'World Trade Centre, New Delhi — sky-bridge structural model',
  description:
    'A three-minute walkthrough of the structural model for the sky-bridge restaurant block at World Trade Centre, New Delhi, showing the steel trusses spanning between the towers and the supporting cores. Architect: Collage Design. The film has a music soundtrack and no narration.',
};

export const offices: Office[] = [
  {
    id: 'mumbai',
    name: 'Mumbai Headquarters',
    headquarters: true,
    addressLines: ['6th Floor, 106 B-Wing, Brij Bhoomi', 'Nehru Road, Above Canara Bank'],
    locality: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400057',
    country: 'India',
    phone: '+91 98672 00065',
    email: 'suresh.shriyan@sacpl.co',
    hours: 'Monday–Friday, 10:00 AM–6:30 PM',
    coordinates: { lat: 19.0975471, lng: 72.8497778 },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.2303697676125!2d72.8497778!3d19.097547099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9adff953bdf%3A0xd4b9cf2c9b32b48a!2sShanghvi%20and%20Associates%20Consultants%20Private%20Limited.!5e0!3m2!1sen!2sin!4v1755492813136!5m2!1sen!2sin',
    verification: 'verified',
    verificationNote: 'Address matches the principal place of business on the GST registration certificate.',
  },
  {
    id: 'surat',
    name: 'Surat Office',
    headquarters: false,
    addressLines: ['436, Avadh Arena, Near Shyambaba Temple', 'VIP Road, opp. Marvella Corridor, Vesu'],
    locality: 'Surat',
    region: 'Gujarat',
    postalCode: '395007',
    country: 'India',
    verification: 'pending',
    verificationNote: 'Listed in the legacy footer only.',
  },
  {
    id: 'udupi',
    name: 'Mangalore Office',
    headquarters: false,
    addressLines: ['Kittur Rani Chennamma Road', 'Brahmagiri'],
    locality: 'Udupi',
    region: 'Karnataka',
    postalCode: '576101',
    country: 'India',
    verification: 'pending',
    verificationNote: 'Legacy footer labels this "Mangalore Office" but the address is in Udupi.',
  },
];

/** Achievement figures from the legacy site. None may render until SACPL confirms them. */
export const stats: {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  explanation: string;
  verification: Verification;
  source: string;
}[] = [
  {
    id: 'years',
    value: 50,
    suffix: '+',
    label: 'Years of practice',
    explanation: 'Structural consultancy practice traced to a two-person team formed in 1973.',
    verification: 'pending',
    source: 'Homepage, About and Contact pages ("50+ years"); About states 1973.',
  },
  {
    id: 'projects',
    value: 10000,
    suffix: '+',
    label: 'Projects',
    explanation: 'Structural design, peer-review and consulting commissions across sectors.',
    verification: 'pending',
    source: 'Homepage, Clients and Contact pages ("10,000+").',
  },
  {
    id: 'team',
    value: 200,
    suffix: '+',
    label: 'Professionals',
    explanation: 'Engineers, modellers, draughtspersons and project staff.',
    verification: 'pending',
    source: 'Homepage/About say 200+; Careers says 150+. Confirm one figure.',
  },
  {
    id: 'countries',
    value: 25,
    suffix: '+',
    label: 'Countries',
    explanation: 'Countries in which SACPL has delivered or reviewed structures.',
    verification: 'pending',
    source: 'Careers page ("25+ countries").',
  },
];

export const timeline: { year: string; title: string; text: string; verification: Verification }[] = [
  {
    year: '1973',
    title: 'Practice established',
    text: 'SACPL begins as a two-person team, with Mr. Vinod Fondekar and Mr. Prakash Satam as founder employees.',
    verification: 'pending',
  },
  {
    year: '1985',
    title: 'Computational design',
    text: 'Engineering design calculations move onto computers, supported by PLANWIN, internal software developed by the practice.',
    verification: 'pending',
  },
  { year: '1992', title: 'CAD adopted', text: 'Structural drawings move to computer-aided design.', verification: 'pending' },
  { year: '1999', title: 'Digital site reporting', text: 'Digital cameras introduced for site inspection and reporting.', verification: 'pending' },
  {
    year: '2014',
    title: 'NMMC Head Office',
    text: 'The Navi Mumbai Municipal Corporation Head Office, engineered by SACPL, is inaugurated on 18 February 2014 and later recognised by the Limca Book of Records.',
    verification: 'verified',
  },
  { year: '2014', title: 'Site inspection app', text: 'An in-house site inspection application is developed.', verification: 'pending' },
  { year: '2019', title: 'Migration to BIM', text: 'Project delivery migrates to Building Information Modelling workflows.', verification: 'pending' },
  {
    year: '2026',
    title: 'Commercial Landmark of the Year',
    text: 'World Trade Centre, New Delhi, receives the ET Now Realty Conclave & Awards 2026 “Commercial Landmark of the Year”.',
    verification: 'verified',
  },
];

export const recognitions: {
  id: string;
  title: string;
  body: string;
  project?: string;
  issuer: string;
  image?: { src: string; alt: string; width: number; height: number };
  verification: Verification;
}[] = [
  {
    id: 'limca-world-record',
    title: 'Longest post-tensioned beam-slab system',
    body: 'The Head Office of the Navi Mumbai Municipal Corporation at Belapur has the longest post-tension beam-slab system, measuring 43.21 m. SACPL were the structural consultants.',
    project: 'navi-mumbai-municipal-corporation-hq',
    issuer: 'Limca Book of Records — World Record',
    image: {
      src: '/media/recognition/limca-world-records.webp',
      alt: 'Limca Book of Records World Record certificate for the 43.21 m post-tension beam-slab system at the NMMC Head Office',
      width: 1150,
      height: 1600,
    },
    verification: 'verified',
  },
  {
    id: 'limca-national-record',
    title: 'Largest glass-reinforced concrete dome',
    body: 'The NMMC Head Office dome measures 37.314 m in width and 16.409 m in height with the Kalash (12.776 m without). SACPL were the structural consultants.',
    project: 'navi-mumbai-municipal-corporation-hq',
    issuer: 'Limca Book of Records — National Record',
    image: {
      src: '/media/recognition/limca-national-records.webp',
      alt: 'Limca Book of Records National Record certificate for the largest glass-reinforced concrete dome at the NMMC Head Office',
      width: 1800,
      height: 2568,
    },
    verification: 'verified',
  },
  {
    id: 'et-now-2026',
    title: 'Commercial Landmark of the Year',
    body: 'World Trade Centre, New Delhi — ET Now Realty Conclave & Awards 2026.',
    project: 'world-trade-centre',
    issuer: 'ET Now Realty Conclave & Awards 2026',
    image: {
      src: '/media/recognition/et-now-real-estate-award.webp',
      alt: 'ET Now Realty Conclave & Awards 2026 trophy for World Trade Centre New Delhi, Commercial Landmark of the Year',
      width: 906,
      height: 1280,
    },
    verification: 'verified',
  },
  {
    id: 'india-book-of-records',
    title: 'Longest free-standing cantilevered RCC structure',
    body: 'A 12 m free-standing cantilevered RCC structure at Kajila, Gurupura (Karnataka), executed from August to December 2016. Certificate dated 12 June 2017.',
    issuer: 'India Book of Records',
    image: {
      src: '/media/recognition/achievement-ach-6.webp',
      alt: 'India Book of Records certificate for the longest free-standing cantilevered RCC structure, Kajila, Gurupura',
      width: 766,
      height: 938,
    },
    // The certificate names architect Sanath Kumar Shetty and "two team members"; SACPL's role is not stated on it.
    verification: 'pending',
  },
];

/** Leadership named on the legacy About page. Hidden until SACPL confirms names, titles and photos. */
/**
 * Awards from the certificates shown in the legacy About page "Achievements" tab.
 * Verified where the certificate names SACPL; pending where it names only the building or another party.
 */
export const awards: {
  id: string;
  year: string;
  title: string;
  project: string;
  projectSlug?: string;
  issuer: string;
  detail: string;
  image: { src: string; alt: string; width: number; height: number };
  verification: Verification;
}[] = [
  {
    id: 'ici-ultratech-2024',
    year: '2024',
    title: 'Certificate of Appreciation',
    project: 'Lata Mangeshkar Kalangan, Goa',
    issuer: 'ICI–UltraTech Awards 2024 · Indian Concrete Institute Goa Centre & UltraTech Cement',
    detail: 'Meritorious entry for Outstanding Concrete Structure of Goa, Public Building category. Presented on 28 February 2025.',
    image: {
      src: '/media/recognition/achievement-ach-1.webp',
      alt: 'ICI–UltraTech Awards 2024 Certificate of Appreciation to Shanghvi and Associates Consultants for Lata Mangeshkar Kalangan',
      width: 1080,
      height: 1636,
    },
    verification: 'verified',
  },
  {
    id: 'ici-ultratech-2023',
    year: '2023',
    title: 'Certificate of Appreciation',
    project: 'Lekha Bhavan, Goa',
    issuer: 'ICI–UltraTech Awards 2023 · Indian Concrete Institute Goa Centre & UltraTech Cement',
    detail: 'Meritorious entry for Outstanding Concrete Structure of Goa, Public Building category. Presented on 16 March 2024.',
    image: {
      src: '/media/recognition/achievement-ach-3.webp',
      alt: 'ICI–UltraTech Awards 2023 Certificate of Appreciation to Shanghvi and Associates Consultants for Lekha Bhavan',
      width: 1080,
      height: 1672,
    },
    verification: 'verified',
  },
  {
    id: 'acce-ultratech-2019',
    year: '2019',
    title: 'Well-built Concrete Structure (Multi-storey)',
    project: 'Northernsky City, Mangaluru',
    issuer: 'ACCE(I) Mangaluru Centre – UltraTech Awards 2019',
    detail: 'For Dakshina Kannada, Udupi, Shivamogga and Chikmagalur districts. Presented on 8 January 2020.',
    image: { src: '/media/recognition/achievement-ach-4.webp', alt: 'ACCE(I) Mangaluru–UltraTech Awards 2019 certificate for Northernsky City, Mangaluru', width: 1080, height: 1521 },
    // The certificate is made out to the building (Shri Dheeraj Amin); SACPL is not named on it.
    verification: 'pending',
  },
  {
    id: 'ici-goa-ultratech-2018',
    year: '2018',
    title: 'Outstanding Concrete Structure of Goa — Infrastructure',
    project: 'Bus Stand & Market Complex, Pernem, Goa',
    projectSlug: 'pernem-bustop',
    issuer: 'ICI-Goa UltraTech Awards 2018 · Certificate of Commendation',
    detail: 'SACPL, as structural consultants, received the commendation at the awards function on 15 February 2019.',
    image: {
      src: '/media/recognition/achievement-ach-2.webp',
      alt: 'ICI-Goa UltraTech Awards 2018 Certificate of Commendation to Shanghvi and Associates Consultants for the Pernem bus stand and market complex',
      width: 1080,
      height: 1644,
    },
    verification: 'verified',
  },
  {
    id: 'aica-2011',
    year: '2011',
    title: 'Overall Excellence in Structural Design',
    project: 'Planet SKS, Kadri, Mangalore',
    projectSlug: 'planet-sks',
    issuer: 'DSK Artists in Concrete Awards 2011 — National level',
    detail: 'Best Overall Design category for the 35-storey Y-shaped residential tower.',
    image: {
      src: '/media/recognition/achievement-ach-5.webp',
      alt: 'Award board for Planet SKS, Kadri: DSK Artists in Concrete Awards 2011, Overall Excellence Structural Design, Shanghvi and Associates Consultants',
      width: 772,
      height: 584,
    },
    verification: 'verified',
  },
];

/** Countries for the reach map. India and project-backed countries are evidenced by portfolio data. */
export const countries: { name: string; iso: number; basis: string; verification: Verification }[] = [
  { name: 'India', iso: 356, basis: 'Headquarters and the majority of the portfolio', verification: 'verified' },
  { name: 'United Arab Emirates', iso: 784, basis: 'Boulevard Heights, Link View, RC-B-045, Ibis Al Rigga', verification: 'verified' },
  { name: 'Qatar', iso: 634, basis: 'Shangri-La, Rotana & Marvel (Doha); Doha City Center', verification: 'verified' },
  { name: 'Tanzania', iso: 834, basis: 'PSPF Commercial Building', verification: 'verified' },
  { name: 'Maldives', iso: 462, basis: 'International cricket stadium; 2,000-unit social housing (Hulhumalé)', verification: 'verified' },
  { name: 'Dominica', iso: 212, basis: 'Marriott Autograph Collection', verification: 'verified' },
  { name: 'Nicaragua', iso: 558, basis: 'Mechnikov biotechnology facility', verification: 'verified' },
  { name: 'Iran', iso: 364, basis: 'Named on the legacy About page; no project record', verification: 'pending' },
  { name: 'Nepal', iso: 524, basis: 'Named on the legacy About page; no project record', verification: 'pending' },
];
