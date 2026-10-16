import 'server-only';
import { NextResponse } from 'next/server';
import type { z } from 'zod';
import { fileCheck } from '@/lib/forms';
import { clientIp, looksLikeSpam, rateLimit } from './rate-limit';
import { deliver, makeReference, type Submission } from './delivery';

type Options<S extends z.ZodTypeAny> = {
  req: Request;
  schema: S;
  kind: Submission['kind'];
  refPrefix: string;
  fileField: string;
  fileTypes: string[];
  fileRequired?: boolean;
  subject: (data: z.infer<S>) => string;
};

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) => NextResponse.json(body, { status, headers });

/** Shared pipeline: origin check → rate limit → spam check → schema → file check → delivery. */
export async function handleForm<S extends z.ZodTypeAny>({ req, schema, kind, refPrefix, fileField, fileTypes, fileRequired, subject }: Options<S>) {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (origin && host && new URL(origin).host !== host) return json(403, { error: 'Cross-site submissions are not accepted.' });

  const limit = rateLimit(`${kind}:${clientIp(req)}`);
  if (!limit.ok) return json(429, { error: 'Too many submissions. Please try again shortly.' }, { 'Retry-After': String(limit.retryAfter) });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json(400, { error: 'The form could not be read. Please try again.' });
  }

  const raw: Record<string, unknown> = {};
  for (const [k, v] of form.entries()) if (typeof v === 'string') raw[k] = v;
  raw.consent = raw.consent === 'true' || raw.consent === 'on';

  // Silently accept obvious bots so they don't retry, but never deliver.
  if (looksLikeSpam(raw.website, raw.startedAt)) return json(200, { ok: true, reference: makeReference(refPrefix) });

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return json(422, { error: 'Please correct the highlighted fields.', fieldErrors: parsed.error.flatten().fieldErrors });
  }

  const file = form.get(fileField);
  const upload = file instanceof File && file.size > 0 ? file : null;
  if (fileRequired && !upload) return json(422, { error: 'Please attach your file.', fieldErrors: { [fileField]: ['Attach your résumé'] } });
  const fileError = fileCheck(upload, fileTypes);
  if (fileError) return json(422, { error: fileError, fieldErrors: { [fileField]: [fileError] } });

  let attachment: Submission['attachment'];
  if (upload) {
    const content = Buffer.from(await upload.arrayBuffer());
    // Basic signature check for PDFs (the most common upload).
    if (upload.name.toLowerCase().endsWith('.pdf') && content.subarray(0, 4).toString() !== '%PDF') {
      return json(422, { error: 'That file does not appear to be a valid PDF.', fieldErrors: { [fileField]: ['Invalid PDF file'] } });
    }
    attachment = { filename: upload.name.slice(0, 120), content, contentType: upload.type || 'application/octet-stream' };
  }

  const data = parsed.data as Record<string, unknown>;
  delete data.website;
  delete data.startedAt;
  const reference = makeReference(refPrefix);
  const fields = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v === undefined ? undefined : String(v)]));
  const result = await deliver({ kind, reference, subject: subject(parsed.data), replyTo: String(data.email), fields: { ...fields, submittedAt: new Date().toISOString() }, attachment });

  if (!result.ok) {
    return json(503, { error: 'We could not send your message right now. Please email us directly instead.' });
  }
  return json(200, { ok: true, reference });
}
