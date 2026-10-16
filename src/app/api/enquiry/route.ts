import { enquirySchema, ENQUIRY_FILE_TYPES } from '@/lib/forms';
import { handleForm } from '@/lib/server/handle-form';

export async function POST(req: Request) {
  return handleForm({
    req,
    schema: enquirySchema,
    kind: 'enquiry',
    refPrefix: 'ENQ',
    fileField: 'document',
    fileTypes: ENQUIRY_FILE_TYPES,
    subject: (d) => `Project enquiry: ${d.service} — ${d.projectType} (${d.projectLocation})`,
  });
}
