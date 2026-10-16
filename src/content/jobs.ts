import type { Job } from './schema';

/**
 * Roles migrated from the legacy careers listing. Text is preserved; only spacing,
 * punctuation, headings and list formatting were corrected.
 */
export const jobs: Job[] = [
  {
    slug: 'btech-junior-engineer',
    sourceId: '52928adb-47fc-46ad-a618-aa6a8774fac6',
    title: 'B.Tech Junior Engineer',
    department: 'Peer Review',
    location: 'Mumbai',
    locations: ['Mumbai'],
    employmentType: 'FULL_TIME',
    responsibilities: [
      {
        items: [
          'Preparation of ETABS models for proof-checking projects.',
          'Checking of ETABS models submitted by the office’s design engineers.',
          'Preparation of reports for peer-review projects.',
        ],
      },
    ],
    qualifications: ['B.Tech'],
    software: ['ETABS'],
    status: 'open',
    publishedAt: '2026-08-14',
  },
  {
    slug: 'structural-draftsman',
    sourceId: 'd4884b5f-ab70-4614-86d5-0d3a6f644786',
    title: 'Structural Draftsman',
    department: 'Drafting & Documentation',
    location: 'Hybrid',
    locations: [],
    workMode: 'Hybrid',
    employmentType: 'FULL_TIME',
    responsibilities: [
      {
        items: [
          'Prepare and update engineering drawings using AutoCAD or relevant drafting software.',
          'Assist senior draftsmen in project detailing and documentation.',
          'Follow company standards, client requirements and project specifications.',
          'Incorporate revisions and RFI responses into drawings.',
          'Verify drawings for accuracy before submission.',
          'Maintain drawing records and support timely project delivery.',
          'Coordinate with team members to ensure project deadlines are met.',
        ],
      },
    ],
    qualifications: [],
    software: ['AutoCAD'],
    status: 'open',
    publishedAt: '2026-07-02',
  },
  {
    slug: 'junior-design-engineer',
    sourceId: '9ed9381d-3b51-4ec0-9835-da7c0a1c3462',
    title: 'Junior Design Engineer',
    department: 'Structural Design',
    location: 'Hybrid',
    locations: [],
    workMode: 'Hybrid',
    employmentType: 'FULL_TIME',
    responsibilities: [
      {
        items: [
          'Study the structural and architectural drawings of assigned projects, together with the respective design basis report (DBR), to understand the GA layouts and the project as a whole.',
          'Prepare loading diagrams and loading sheets, either to assist the design team or for the assigned project.',
          'Model structures for the assigned project using software, as per seniors’ instructions and the DBR.',
          'Get designs countersigned by seniors.',
          'Comply with the document-controller (design) procedures for the assigned project, or as instructed by seniors.',
          'File and document the assigned work and project appropriately.',
          'Coordinate with various agencies as and when instructed by the Team Leader.',
          'Complete work within the stipulated time frame; any extension required must be discussed with, or brought to the notice of, the Team Leader before starting the work.',
        ],
      },
    ],
    qualifications: [],
    software: [],
    status: 'open',
    publishedAt: '2026-05-29',
  },
  {
    slug: 'senior-structural-engineer',
    sourceId: '5c21fa59-c293-494c-a0b3-03e485d500cd',
    title: 'Senior Structural Engineer',
    department: 'Structural Design',
    location: 'Mumbai, Pune, Ahmedabad',
    locations: ['Mumbai', 'Pune', 'Ahmedabad'],
    workMode: 'Hybrid',
    employmentType: 'FULL_TIME',
    experience: '4–6 years',
    responsibilities: [
      {
        heading: 'Areas of responsibility',
        items: ['Project execution', 'Design optimisation', 'Compliance', 'Documentation', 'Team responsibilities'],
      },
      {
        heading: 'Design optimisation',
        items: [
          'Detailing and drawing checking of structural elements using office spreadsheets:',
          'Slabs (conventional one-way, two-way and cantilever)',
          'Flat slabs',
          'Beams, columns and shear walls',
          'Foundations, rafts, piles and pile caps',
          'Retaining walls',
          'Lift machine rooms, overhead tanks, sewage treatment plants, underground tanks and underground structures',
          'Checking post-tensioning (PT) vendors’ design calculations and drawings',
        ],
      },
    ],
    qualifications: [],
    software: [],
    status: 'open',
    publishedAt: '2025-09-03',
    notes: ['The original listing also states “Location: Mumbai (hybrid mode of work)”.'],
  },
  {
    slug: 'business-development-manager',
    sourceId: '57a1b4ee-1065-4ab0-b0fc-bd704b63cf6e',
    title: 'Business Development Manager',
    department: 'Business Development',
    location: 'Mumbai, Delhi, Bengaluru',
    locations: ['Mumbai', 'Delhi', 'Bengaluru'],
    employmentType: 'FULL_TIME',
    responsibilities: [
      {
        heading: 'New business development',
        items: [
          'Locate potential business deals by contacting potential clients (contractors, developers, architects and others) and by discovering and exploring opportunities.',
          'Screen potential business deals by analysing market strategies, deal requirements and financials.',
          'Propose potential business deals by contacting potential partners.',
          'Call on clients and make presentations on services (online or in person) that meet client requirements.',
          'Set up meetings between client decision-makers and the company’s practice leaders and principals.',
          'Participate in pricing the solution or service.',
          'Handle objections by clarifying, emphasising agreements and working through differences to a positive conclusion, using a variety of styles to persuade or negotiate appropriately.',
        ],
      },
      {
        heading: 'Client relationship management',
        items: [
          'Build and nurture strong relationships with existing and new clients to ensure sustainable and profitable business growth.',
          'Work with technical staff and other internal colleagues to meet customer needs.',
          'Regularly engage with clients to assess satisfaction and address any concerns.',
          'Identify, build and maintain formal and informal networks and productive relationships with internal and external stakeholders.',
        ],
      },
      {
        heading: 'Business development planning',
        items: [
          'Set goals and develop plans for business and revenue growth; create development plans and forecast sales targets and growth projections.',
          'Attend association events and conferences, and provide feedback and information on market and creative trends.',
          'Present to and consult with mid- and senior-level management on business trends, with a view to developing new trends in providing services.',
          'Using knowledge of the market and competitors, identify and develop the company’s unique selling propositions and differentiators.',
        ],
      },
    ],
    qualifications: [],
    software: [],
    status: 'open',
    publishedAt: '2025-09-03',
  },
  {
    slug: 'junior-engineer-qa-qc',
    sourceId: '4d65589e-8263-42d8-b958-502de335df75',
    title: 'Junior Engineer – QA/QC',
    department: 'Quality Assurance',
    location: 'Hybrid',
    locations: [],
    workMode: 'Hybrid',
    employmentType: 'FULL_TIME',
    experience: '2–3 years',
    responsibilities: [
      {
        heading: 'Analysis model creation and review',
        items: [
          'Develop and validate structural analysis models in ETABS, SAFE and STAAD.',
          'Ensure accurate modelling of geometry, loads, boundary conditions, mass sources and material properties.',
          'Perform connectivity checks, stability checks and load-path verification.',
        ],
      },
      {
        heading: 'Preparation of load data sheets',
        items: [
          'Compile detailed load data sheets based on architectural inputs, project specifications and relevant codes.',
          'Verify dead loads, live loads, imposed loads, façade loads, equipment loads and special system loads.',
          'Maintain consistency between load data sheets, analysis models and consultant inputs.',
        ],
      },
      {
        heading: 'Verification with peer consultants',
        items: [
          'Cross-check structural systems, design assumptions and results with peer consultants.',
          'Identify discrepancies and track resolutions related to analysis or design philosophies.',
          'Maintain structured documentation of verification notes and approvals.',
        ],
      },
      {
        heading: 'Checking of design parameters and deliverables',
        items: [
          'Review design outputs: member sizing, reinforcement detailing, serviceability checks, seismic parameters and drift/displacement limits.',
          'Check Good-for-Construction (GFC) drawings for correctness and compliance with approved designs.',
          'Ensure adherence to QC protocols, project specifications and IS code requirements.',
        ],
      },
      {
        heading: 'SAFE file creation and review',
        items: [
          'Prepare and review SAFE models for foundations, slabs, pile caps and similar elements.',
          'Verify soil parameters, spring constants, subgrade modulus, water-table conditions and geotechnical recommendations.',
          'Validate load combinations, mesh quality and design settings.',
        ],
      },
      {
        heading: 'Value engineering',
        items: [
          'Suggest optimised design alternatives to improve cost efficiency and constructability.',
          'Provide technical justification and coordinate incorporation in final deliverables.',
        ],
      },
      {
        heading: 'Documentation and reporting',
        items: [
          'Maintain QC checklists, review logs and revision histories.',
          'Prepare summary reports highlighting key checks and compliance status.',
          'Ensure proper version control for analysis files, drawings and documents.',
        ],
      },
    ],
    qualifications: [],
    software: ['ETABS', 'SAFE', 'STAAD'],
    status: 'closed',
    publishedAt: '2025-11-28',
    closingDate: '2026-02-12',
  },
];
