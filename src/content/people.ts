import type { Verification } from './schema';

/*
 * People published on the legacy About page (sacpl.co/about — "Our Founder", "Leadership" and
 * "Expert Team" tabs), captured from the public page on 16 October 2026. Photos were migrated
 * from the same page (see docs/media-manifest-people.json). Names and titles are as published.
 */

export type Person = {
  name: string;
  role: string;
  bio?: string;
  photo: { src: string; width: number; height: number };
  verification: Verification;
};

const photo = (slug: string, width: number, height: number) => ({ src: `/media/people/${slug}.webp`, width, height });
const SOURCE = 'Legacy About page, captured 16 October 2026';

export const founder = {
  name: 'Mr. Suresh P. Shanghvi',
  role: 'Founder & Chairman',
  photo: photo('suresh-shanghvi', 256, 256),
  source: SOURCE,
  /** Paragraphs from the "Our Founder" tab. Pending blocks contain figures that conflict elsewhere on the legacy site. */
  story: [
    {
      title: 'Vision & philosophy',
      text: 'Client satisfaction is of utmost importance to us, and we work towards client expectations by addressing each requirement in a unique and valued manner. We use our experience and awareness of the latest design trends to achieve effective designs for our clients, while pushing the limits of innovation.',
      verification: 'verified' as Verification,
    },
    {
      title: 'Company growth journey',
      text: 'From a two-person team established in 1973, with Mr. Vinod Fondekar and Mr. Prakash Satam as founder employees, SACPL has grown into a team of more than 200 professionals.',
      verification: 'pending' as Verification,
      note: 'Founding year (1973 in the text, 1974 in the highlights) and team size (200+ here, 150+ on Careers) need confirming.',
    },
    {
      title: 'Industry leadership & innovation',
      text: 'SACPL set early trends in the profession: computers for engineering design calculations, in-house software such as PLANWIN (as early as 1985), CAD in 1992, digital cameras for site inspection and reporting in 1999, a site inspection app in 2014 and migration to BIM in 2019.',
      verification: 'pending' as Verification,
      note: 'Same dates as the history timeline, which is awaiting confirmation.',
    },
    {
      title: 'Global reach & impact',
      text: 'Team SACPL has made its mark across residential, commercial, industrial, retail, institutional, hospitality and healthcare sectors, in India and internationally — with projects in Dubai, Abu Dhabi, Dar es Salaam, Tanzania, the Caribbean and beyond.',
      verification: 'verified' as Verification,
    },
    {
      title: 'Recognition & awards',
      text: 'The Head Office of the Navi Mumbai Municipal Corporation, engineered by SACPL, holds Limca Book of Records world and national records for its post-tensioned beam-slab span and its glass-reinforced concrete dome.',
      verification: 'verified' as Verification,
    },
  ],
  /** "Key highlights" panel on the legacy tab. All four figures conflict with other legacy pages. */
  highlights: [
    { label: 'Founded', value: '1974', verification: 'pending' as Verification, note: 'Elsewhere the legacy site says 1973.' },
    { label: 'Team size', value: '200+', verification: 'pending' as Verification, note: 'Careers page says 150+.' },
    { label: 'Countries', value: '8+', verification: 'pending' as Verification, note: 'Careers page says 25+; the portfolio evidences 7.' },
    { label: 'Experience', value: '50+ years', verification: 'pending' as Verification, note: 'Depends on the founding year.' },
  ],
};

export const leadership: Person[] = [
  {
    name: 'Suresh Shanghvi',
    role: 'Chairman',
    bio: 'Leads the company with a visionary approach and decades of industry experience.',
    photo: photo('suresh-shanghvi', 256, 256),
    verification: 'verified',
  },
  { name: 'Vinoo Naik', role: 'Technical Director', bio: 'Drives technical excellence across all projects.', photo: photo('vinoo-naik', 256, 258), verification: 'verified' },
  { name: 'Biju Nair', role: 'Technical Director', bio: 'Leads technical operations with innovative solutions.', photo: photo('biju-nair', 256, 258), verification: 'verified' },
  { name: 'Nikhil Shanghvi', role: 'Chief Executive Officer', bio: 'Drives the company’s vision and its business growth.', photo: photo('nikhil-shanghvi', 384, 512), verification: 'verified' },
  { name: 'Rajiv Shanghvi', role: 'Director', bio: 'Brings strategic oversight and deep industry knowledge.', photo: photo('rajiv-shanghvi', 480, 499), verification: 'verified' },
  { name: 'Sachin Kumar', role: 'Chief Operating Officer', bio: 'Oversees daily operations and efficiency across the company.', photo: photo('sachin-kumar', 256, 258), verification: 'verified' },
  { name: 'Suresh Shriyan', role: 'Director — Business', bio: 'Oversees business strategy and market expansion.', photo: photo('suresh-shriyan', 256, 262), verification: 'verified' },
  { name: 'Rahul Dangi', role: 'CEO, MDSPL', bio: 'Leads company initiatives with passion and expertise.', photo: photo('rahul-dangi', 256, 258), verification: 'verified' },
  { name: 'Bhagavan Das', role: 'Director — SACPL Mangalore', photo: photo('bhagavan-das', 310, 350), verification: 'verified' },
  { name: 'Dhaval Patoliya', role: 'Director — SACPL Gujarat', photo: photo('dhaval-patoliya', 442, 396), verification: 'verified' },
  { name: 'Nayan Fatania', role: 'Director — SACPL Goa', photo: photo('nayan-fatania', 480, 720), verification: 'verified' },
  { name: 'Lahira Salkar', role: 'Technical Director — SACPL Goa', photo: photo('lahira-salkar', 302, 341), verification: 'verified' },
  { name: 'Vinda Dravid', role: 'Business Expansion Head', photo: photo('vinda-dravid', 462, 373), verification: 'verified' },
  { name: 'Awez Waghu', role: 'Business Development', photo: photo('awez-waghu', 480, 351), verification: 'verified' },
];

export const expertTeam: Person[] = [
  { name: 'Prashant Chorghe', role: 'General Manager — Design', photo: photo('prashant-chorghe', 189, 173), verification: 'verified' },
  { name: 'Murtuza Jambughodawala', role: 'General Manager — Design', photo: photo('murtuza-jambughodawala', 229, 221), verification: 'verified' },
  { name: 'Afroz Alam', role: 'Associate General Manager — QC Projects', photo: photo('afroz-alam', 360, 316), verification: 'verified' },
  { name: 'Sadaf Quadri', role: 'Principal Engineer — Design', photo: photo('sadaf-quadri', 134, 143), verification: 'verified' },
  { name: 'Mangesh Chorghe', role: 'Principal Engineer — Design', photo: photo('mangesh-chorghe', 246, 269), verification: 'verified' },
  { name: 'Vishal Kevat', role: 'Principal Engineer — Design', photo: photo('vishal-kevat', 480, 540), verification: 'verified' },
  { name: 'Keshav Godkar', role: 'Sr. Principal Designer — Design', photo: photo('keshav-godkar', 263, 278), verification: 'verified' },
  { name: 'Shekhar Gawade', role: 'Sr. Principal Designer — Design', photo: photo('shekhar-gawade', 406, 417), verification: 'verified' },
  { name: 'Someer Das', role: 'Sr. Principal Designer — Design', photo: photo('someer-das', 356, 271), verification: 'verified' },
  { name: 'Sagar Marathe', role: 'Sr. Lead Engineer — Design', photo: photo('sagar-marathe', 193, 189), verification: 'verified' },
  { name: 'Pranit Khelurkar', role: 'Sr. Lead Engineer — Design', photo: photo('pranit-khelurkar', 220, 217), verification: 'verified' },
  { name: 'Shilpa Pattikara', role: 'Sr. Lead Engineer — Design', photo: photo('shilpa-pattikara', 147, 155), verification: 'verified' },
  { name: 'Pradnya Kasture', role: 'Sr. Lead Engineer — Design', photo: photo('pradnya-kasture', 247, 250), verification: 'verified' },
  { name: 'Sanjay Chavan', role: 'Principal Designer — Design', photo: photo('sanjay-chavan', 220, 217), verification: 'verified' },
  { name: 'Vipul Kini', role: 'Sr. Lead Designer — Design', photo: photo('vipul-kini', 202, 205), verification: 'verified' },
  { name: 'Chandan Thakur', role: 'Sr. Lead Engineer — QC Projects', photo: photo('chandan-thakur', 215, 219), verification: 'verified' },
  { name: 'Arjun Walawalkar', role: 'Lead Engineer — QC Design', photo: photo('arjun-walawalkar', 176, 160), verification: 'verified' },
  { name: 'Ghanshyam Bhavsar', role: 'Lead Engineer — QC Design', photo: photo('ghanshyam-bhavsar', 220, 217), verification: 'verified' },
  { name: 'Suhas Jaitapkar', role: 'Lead Engineer — Design', photo: photo('suhas-jaitapkar', 154, 150), verification: 'verified' },
  { name: 'Syed Mohammed Saidani', role: 'Lead Engineer — Design', photo: photo('syed-mohammed-saidani', 303, 337), verification: 'verified' },
  { name: 'Kaushal Mhatre', role: 'Lead Designer — Design', photo: photo('kaushal-mhatre', 158, 148), verification: 'verified' },
  { name: 'Varunkumar Panchal', role: 'Project Manager — BIM', photo: photo('varunkumar-panchal', 346, 370), verification: 'verified' },
  { name: 'Iranna Badiger', role: 'Project Manager — BIM', photo: photo('iranna-badiger', 480, 441), verification: 'verified' },
  { name: 'Digvi Doshi', role: 'Head — Billing & Tendering', photo: photo('digvi-doshi', 124, 133), verification: 'verified' },
];
