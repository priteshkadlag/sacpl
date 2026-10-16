import 'server-only';

export type Submission = {
  kind: 'enquiry' | 'application';
  reference: string;
  subject: string;
  replyTo: string;
  fields: Record<string, string | undefined>;
  attachment?: { filename: string; content: Buffer; contentType: string };
};

type Result = { provider: string; ok: boolean; error?: string };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function toHtml(s: Submission) {
  const rows = Object.entries(s.fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top;font-family:monospace;font-size:12px;color:#5a6472">${esc(k)}</th><td style="padding:6px 0;white-space:pre-wrap">${esc(v!)}</td></tr>`)
    .join('');
  return `<h2 style="font-family:sans-serif">${esc(s.subject)}</h2><p style="font-family:monospace;color:#5a6472">Ref ${s.reference}</p><table style="font-family:sans-serif;font-size:14px">${rows}</table>`;
}

async function viaResend(s: Submission): Promise<Result> {
  const key = process.env.RESEND_API_KEY;
  const to = s.kind === 'application' ? process.env.CAREERS_TO_EMAIL : process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.FORMS_FROM_EMAIL;
  if (!key || !to || !from) return { provider: 'resend', ok: false, error: 'not configured' };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((x) => x.trim()),
      reply_to: s.replyTo,
      subject: `${s.subject} [${s.reference}]`,
      html: toHtml(s),
      attachments: s.attachment ? [{ filename: s.attachment.filename, content: s.attachment.content.toString('base64') }] : undefined,
    }),
  });
  return { provider: 'resend', ok: res.ok, error: res.ok ? undefined : `HTTP ${res.status}` };
}

async function viaWebhook(s: Submission): Promise<Result> {
  const url = process.env.FORMS_WEBHOOK_URL;
  if (!url) return { provider: 'webhook', ok: false, error: 'not configured' };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(process.env.FORMS_WEBHOOK_SECRET ? { 'X-Webhook-Secret': process.env.FORMS_WEBHOOK_SECRET } : {}) },
    body: JSON.stringify({ ...s, attachment: s.attachment ? { filename: s.attachment.filename, contentType: s.attachment.contentType, base64: s.attachment.content.toString('base64') } : undefined }),
  });
  return { provider: 'webhook', ok: res.ok, error: res.ok ? undefined : `HTTP ${res.status}` };
}

/** Stores the submission in Supabase (tables defined in docs/supabase-schema.sql). Service-role key is server-only. */
async function viaSupabase(s: Submission): Promise<Result> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { provider: 'supabase', ok: false, error: 'not configured' };
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  let attachmentPath: string | undefined;
  if (s.attachment) {
    attachmentPath = `${s.kind}/${s.reference}/${s.attachment.filename.replace(/[^\w.-]/g, '_')}`;
    const up = await fetch(`${url}/storage/v1/object/form-uploads/${attachmentPath}`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': s.attachment.contentType },
      body: new Uint8Array(s.attachment.content),
    });
    if (!up.ok) attachmentPath = undefined;
  }
  const table = s.kind === 'application' ? 'job_applications' : 'enquiries';
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ reference: s.reference, payload: s.fields, attachment_path: attachmentPath }),
  });
  return { provider: 'supabase', ok: res.ok, error: res.ok ? undefined : `HTTP ${res.status}` };
}

export function isDeliveryConfigured() {
  return Boolean(
    (process.env.RESEND_API_KEY && process.env.FORMS_FROM_EMAIL) ||
      process.env.FORMS_WEBHOOK_URL ||
      (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
  );
}

/** Sends to every configured provider; succeeds if at least one accepts the submission. */
export async function deliver(s: Submission) {
  if (!isDeliveryConfigured()) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[forms] ${s.kind} ${s.reference} (no provider configured — logged only)`, s.fields);
      return { ok: true, results: [{ provider: 'dev-log', ok: true }] };
    }
    return { ok: false, results: [] as Result[] };
  }
  const results = await Promise.all([viaResend, viaWebhook, viaSupabase].map((fn) => fn(s).catch((e) => ({ provider: fn.name, ok: false, error: String(e) }))));
  const configured = results.filter((r) => r.error !== 'not configured');
  for (const r of configured.filter((r) => !r.ok)) console.error(`[forms] ${s.reference} ${r.provider} failed: ${r.error}`);
  return { ok: configured.some((r) => r.ok), results };
}

export function makeReference(prefix: string) {
  const d = new Date();
  const stamp = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  return `${prefix}-${stamp}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}
