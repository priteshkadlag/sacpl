import { applicationSchema, RESUME_FILE_TYPES } from '@/lib/forms';
import { handleForm } from '@/lib/server/handle-form';

export async function POST(req: Request) {
  return handleForm({
    req,
    schema: applicationSchema,
    kind: 'application',
    refPrefix: 'APP',
    fileField: 'resume',
    fileTypes: RESUME_FILE_TYPES,
    fileRequired: true,
    subject: (d) => `Job application: ${d.position} — ${d.name}`,
  });
}
