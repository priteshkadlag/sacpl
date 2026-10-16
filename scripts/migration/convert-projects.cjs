// Converts the audited source snapshot (JSON lines) into clean project records.
// Usage: node convert-projects.js <snapshot.txt> <outDir>
const fs = require('fs');
const path = require('path');
const [, , src, outDir] = process.argv;

const TYPES = {
  '065d9d8b-ac72-4f9a-b5d2-8eaffd56fdfe': 'tall-structures',
  '4ac2394f-3d1b-4ab4-8a2f-881d80507f16': 'commercial',
  '1f2a2c62-ef7b-4603-9d0a-df61b37e6406': 'institutional',
  '606f9b80-26a3-437d-b91b-65459e16c6cf': 'residential',
  'a68986d8-d3a3-420b-a3fc-041d370b9431': 'industrial',
  '1f9d13b6-9e33-45c5-b8fd-d8bec1127c6b': 'hospitality',
  '55447f90-3b6a-4717-a010-0f542eea5a0c': 'healthcare',
  'b8b6168e-e781-4223-86fa-8effa4289ac8': 'sports',
  '0e92e7f9-1104-4a6e-a7a0-9c4abf3c7278': 'public',
  '0f81641f-32f6-4b46-bea8-30745d414707': 'design-and-bid',
  '780bd0fc-e843-4751-abb6-dbccf0747124': 'records',
  '9fbfdf6c-a86a-4317-9b1f-1d5bb3ddf22e': 'retail',
};

const FEATURED = [
  'Arihant Aspire', 'Bhandary Vertica', 'Boulevard Heights', 'Doha City Center',
  'ICON - Jacob circle', 'Kanakia Levels', 'Lotus Sky Garden', 'Northern Hills',
  'Planet SKS', 'Prince Aga Khan', 'PSPF Commercial Building', 'Westline Signature',
];

// Obvious spelling fixes only. Every applied fix is logged for the verification checklist.
const SPELLING = [
  [/\bGhatkhopar\b/g, 'Ghatkopar'], [/\bGoregoan\b/g, 'Goregaon'], [/\bRADDISON\b/gi, 'Radisson'],
  [/\bMARRIOT\b/gi, 'Marriott'], [/\bMahableshwar\b/g, 'Mahabaleshwar'], [/\bTamilnadu\b/g, 'Tamil Nadu'],
  [/\bARUNANCHALPRADESH\b/g, 'Arunachal Pradesh'], [/\bBhubaneshwar\b/gi, 'Bhubaneswar'],
  [/\bUPGRADATION\b/g, 'Upgrade'], [/\bDawrkesh\b/g, 'Dwarkesh'], [/\bShikasha\b/g, 'Shiksha'],
  [/\bFarukhanagar\b/g, 'Farukhnagar'], [/\bWare House\b/g, 'Warehouse'],
];

const FOREIGN = [
  [/dubai/i, 'United Arab Emirates'], [/abu dhabi/i, 'United Arab Emirates'], [/doha/i, 'Qatar'],
  [/tanzania|dar.?e.?s?salaam/i, 'Tanzania'], [/maldives|hulhumale/i, 'Maldives'],
  [/dominica/i, 'Dominica'], [/nicaragua/i, 'Nicaragua'],
];

const ACRONYMS = new Set(['IBIS', 'YMCA', 'SVKM', 'NMIMS', 'MCGM', 'HCA', 'JN', 'CDPL', 'BDD', 'RD', 'II', 'III', 'IT', 'IT6', 'PSPF', 'SKS', 'SBI', 'UC', 'GAP', 'GOA', 'ET', 'LIMCA', 'R&D', 'GPRA', 'RBI', 'HQ', 'DR.', 'Y.S.', 'B', 'RC-B-045', 'FIRM', 'NMMT', 'IILABS', 'ONXY', 'AKDN']);
const log = [];

function clean(v) {
  if (v == null) return undefined;
  let s = String(v).replace(/\s+/g, ' ').trim().replace(/[.,]$/, '').trim();
  return s || undefined;
}
function fix(field, value, title) {
  if (!value) return value;
  let out = value;
  for (const [re, rep] of SPELLING) out = out.replace(re, rep);
  if (out !== value) log.push({ project: title, field, from: value, to: out });
  return out;
}
function titleCase(s) {
  if (s !== s.toUpperCase()) return s;
  return s.split(' ').map((w) => (ACRONYMS.has(w.replace(/[(),:]/g, '')) ? w : w.charAt(0) + w.slice(1).toLowerCase())).join(' ');
}
function slugify(s) {
  return s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function parseDescription(desc) {
  const specs = [];
  const notes = [];
  let status, scope, outcome;
  let truncated = false;
  if (!desc) return { specs, notes, truncated };
  if (desc.endsWith('…')) { truncated = true; desc = desc.slice(0, -1); }
  for (let line of desc.split(/\n+/).map((l) => l.trim()).filter(Boolean)) {
    const m = line.match(/^(No\.? of Keys|No\.? of Beds|Total no\.? of Beds|Cost|Status|Scope|Statue Height|Pedestal|Material|Statue Load|EPC Contractor|Architect)\s*:\s*(.+)$/i);
    if (m) {
      const k = m[1].toLowerCase();
      const v = m[2].trim();
      if (k === 'status') status = /under construction/i.test(v) ? 'ongoing' : /completed/i.test(v) ? 'completed' : undefined;
      else if (k === 'scope') scope = v;
      else if (k === 'architect') notes.push(`Architect (as noted in source description): ${v}`);
      else specs.push({ label: m[1].replace(/^No\.? of/i, 'No. of').replace(/^Total no\.? of/i, 'Total no. of'), value: v });
      continue;
    }
    const w = line.match(/^(Won|Lost)\b[\s,:-]*(.*)$/i);
    if (w) { outcome = w[1].toLowerCase(); if (w[2]) notes.push(w[2]); continue; }
    notes.push(line);
  }
  return { specs, notes, status, scope, outcome, truncated };
}

const lines = fs.readFileSync(src, 'utf8').split(/\r?\n/).filter((l) => l.startsWith('{"id"'));
const raw = lines.map((l) => JSON.parse(l));
const projects = [];
const records = [];
const media = [];
const slugs = new Set();

for (const r of raw) {
  const sourceTitle = clean(r.title);
  const category = TYPES[r.type_id];
  const name = fix('name', titleCase(sourceTitle), sourceTitle);
  const location = fix('location', clean(r.location), sourceTitle);
  const client = fix('client', clean(r.client), sourceTitle);
  const architect = clean(r.architect);
  const d = parseDescription(r.description || '');
  const sourceImages = [r.image_url, ...(r.images || [])].filter((u) => u && !/\/\.png$/.test(u));

  // Duplicate of "Farukhanagar Warehouse" (Industrial) filed under Institutional in the source.
  if (category === 'institutional' && /^Farukhnagar/i.test(sourceTitle)) {
    log.push({ project: sourceTitle, field: 'record', from: `institutional (${r.id})`, to: 'merged into Industrial "Farukhnagar Warehouse"' });
    continue;
  }

  if (category === 'records') {
    records.push({ sourceId: r.id, title: name, sourceImages });
    continue;
  }

  let slug = slugify(name);
  if (slugs.has(slug)) slug = `${slug}-${slugify(location || 'project')}`;
  slugs.add(slug);

  let country = 'India';
  for (const [re, c] of FOREIGN) if (re.test(`${location} ${name}`)) { country = c; break; }
  const international = !!r.is_international || country !== 'India';
  if (!!r.is_international !== international) log.push({ project: sourceTitle, field: 'international', from: String(!!r.is_international), to: String(international) });

  const images = sourceImages.map((u, i) => {
    const ext = path.extname(new URL(u).pathname).toLowerCase() || '.jpg';
    const local = `/media/projects/${slug}${i ? `-${i + 1}` : ''}.webp`;
    media.push({ type: 'project-image', source: u, downloadAs: `${slug}${i ? `-${i + 1}` : ''}${ext}`, local });
    return { src: local, alt: `${name}${location ? `, ${location}` : ''} — project image${i ? ` ${i + 1}` : ''}` };
  });

  projects.push({
    slug,
    sourceId: r.id,
    name,
    category,
    status: d.status,
    scope: d.scope,
    bidOutcome: category === 'design-and-bid' ? d.outcome : undefined,
    location,
    country,
    international,
    client,
    architect: architect === 'SACPL' ? undefined : architect,
    inHouseArchitecture: architect === 'SACPL' || undefined,
    area: clean(r.area),
    height: clean(r.height),
    specs: d.specs.length ? d.specs : undefined,
    summary: d.notes.length ? d.notes.join('\n') : undefined,
    summaryTruncatedInSource: d.truncated || undefined,
    images,
    featured: FEATURED.includes(sourceTitle) || undefined,
  });
}

projects.sort((a, b) => a.name.localeCompare(b.name));
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'projects.json'), JSON.stringify(projects, null, 2));
fs.writeFileSync(path.join(outDir, 'records-from-projects.json'), JSON.stringify(records, null, 2));
fs.writeFileSync(path.join(outDir, 'project-media.json'), JSON.stringify(media, null, 2));
fs.writeFileSync(path.join(outDir, 'corrections.json'), JSON.stringify(log, null, 2));
console.log('projects', projects.length, 'records', records.length, 'images', media.length, 'corrections', log.length, 'featured', projects.filter((p) => p.featured).length);
console.log('no image:', projects.filter((p) => !p.images.length).map((p) => p.name).join(', ') || 'none');
