import { z } from 'zod';

/** Shared by the client forms (React Hook Form) and the API routes. */

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // stays under common serverless body limits
export const ENQUIRY_FILE_TYPES = ['.pdf', '.dwg', '.dxf', '.zip', '.jpg', '.jpeg', '.png'];
export const RESUME_FILE_TYPES = ['.pdf', '.doc', '.docx'];

export const serviceOptions = [
  'Structural Engineering',
  'Design Consulting',
  'Project Management',
  'BIM and Digital Engineering',
  'Cost Consulting',
  'Peer Review and Compliance',
  'Quality Assurance and Compliance',
  'Value Engineering',
  'Not sure yet',
] as const;

export const projectTypeOptions = [
  'Tall structure / high-rise',
  'Residential',
  'Commercial / office',
  'Institutional / education',
  'Hospitality',
  'Healthcare',
  'Industrial / warehouse',
  'Sports / stadium',
  'Public infrastructure',
  'Retail / mall',
  'Other',
] as const;

export const timelineOptions = ['Immediately', 'Within 3 months', '3–6 months', '6–12 months', 'More than 12 months', 'Not decided'] as const;

const phone = z
  .string({ error: 'Enter your phone number' })
  .trim()
  .min(7, 'Enter a phone number with at least 7 digits')
  .max(20, 'Phone number is too long')
  .regex(/^[+()\d\s-]+$/, 'Use digits, spaces, +, - or brackets only');

const optionalText = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters`).optional().or(z.literal(''));

export function fileCheck(file: File | null | undefined, types: string[]) {
  if (!file || file.size === 0) return null;
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (!types.includes(ext)) return `Accepted formats: ${types.join(', ')}`;
  if (file.size > MAX_UPLOAD_BYTES) return 'Files must be 4 MB or smaller — share larger drawings by link in your message';
  return null;
}

export const enquirySchema = z.object({
  name: z.string({ error: 'Enter your name' }).trim().min(2, 'Enter your name').max(100),
  email: z.string({ error: 'Enter your email address' }).trim().email('Enter a valid email address'),
  phone,
  company: optionalText(120),
  projectLocation: z.string({ error: 'Enter the project location' }).trim().min(2, 'Enter the project location').max(120),
  service: z.enum(serviceOptions, { message: 'Choose the service you need' }),
  projectType: z.enum(projectTypeOptions, { message: 'Choose a project type' }),
  projectArea: optionalText(60),
  timeline: z.enum(timelineOptions, { message: 'Choose an expected timeline' }),
  message: z.string({ error: 'Describe your project' }).trim().min(20, 'Tell us a little more (at least 20 characters)').max(4000),
  consent: z.literal(true, { message: 'Please agree to the privacy notice so we can reply' }),
  // anti-spam
  website: z.string().max(0).optional(),
  startedAt: z.string().optional(),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const applicationSchema = z.object({
  name: z.string({ error: 'Enter your full name' }).trim().min(2, 'Enter your full name').max(100),
  email: z.string({ error: 'Enter your email address' }).trim().email('Enter a valid email address'),
  phone,
  location: z.string({ error: 'Enter your current city' }).trim().min(2, 'Enter your current city').max(100),
  position: z.string({ error: 'Choose a position' }).trim().min(2, 'Choose a position').max(120),
  experience: z.string({ error: 'Enter your years of experience' }).trim().min(1, 'Enter your years of experience').max(40),
  portfolio: z
    .string()
    .trim()
    .url('Enter a full URL, e.g. https://www.linkedin.com/in/…')
    .optional()
    .or(z.literal('')),
  message: optionalText(3000),
  consent: z.literal(true, { message: 'Please agree to the privacy notice to apply' }),
  website: z.string().max(0).optional(),
  startedAt: z.string().optional(),
});
export type ApplicationInput = z.infer<typeof applicationSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email('Enter the email address for your client account'),
  password: z.string().min(1, 'Enter your password'),
});
export type LoginInput = z.infer<typeof loginSchema>;
