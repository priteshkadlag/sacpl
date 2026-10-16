// One-time media migration from the legacy sacpl.co site into /public.
//
// Usage:
//   node scripts/migration/migrate-media.mjs <downloadDir> <projects.json>
//
// <downloadDir> must contain the originals fetched by the audit (see docs/MIGRATION.md)
// plus its download-log.json. Writes optimised masters into /public and the
// old→new mapping to docs/media-manifest.json. Next/Image then serves AVIF/WebP
// variants at the sizes each component requests.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const [, , srcDir, projectsFile] = process.argv;
if (!srcDir || !projectsFile) {
  console.error('Usage: node scripts/migration/migrate-media.mjs <downloadDir> <projects.json>');
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, '../..');
const pub = path.join(root, 'public');
const log = JSON.parse(fs.readFileSync(path.join(srcDir, 'download-log.json'), 'utf8'));
const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
const manifest = [];

const OPTIMIZER = (p) => `https://www.sacpl.co/_next/image?url=${encodeURIComponent(p)}&w=…`;

function ensureDir(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

async function record(entry, outFile) {
  const stat = fs.statSync(outFile);
  let width;
  let height;
  if (/\.(webp|png|jpe?g|avif)$/i.test(outFile)) {
    const m = await sharp(outFile).metadata();
    width = m.width;
    height = m.height;
  }
  manifest.push({ ...entry, local: '/' + path.relative(pub, outFile).split(path.sep).join('/'), bytes: stat.size, width, height });
}

async function toWebp(input, output, maxWidth, quality = 82) {
  ensureDir(output);
  await sharp(input).rotate().resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(output);
}

const originalOf = (downloadAs) => log.find((l) => l.downloadAs === downloadAs)?.source;

// Brand ---------------------------------------------------------------
{
  const src = path.join(srcDir, 'brand/newLogo.png');
  const dark = path.join(pub, 'brand/sacpl-logo.png');
  ensureDir(dark);
  await sharp(src).png({ compressionLevel: 9 }).toFile(dark);
  await record({ type: 'logo', original: originalOf('brand/newLogo.png'), optimizerUrlSeen: OPTIMIZER('/newLogo.png'), alt: 'SACPL' }, dark);

  // Light variant for dark headers: navy → white, red dot kept.
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const isRed = r > g + 70 && r > b + 70;
    if (!isRed) { data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; }
  }
  const light = path.join(pub, 'brand/sacpl-logo-light.png');
  await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(light);
  await record({ type: 'logo-variant', original: 'derived from /newLogo.png', alt: 'SACPL' }, light);

  const small = path.join(pub, 'brand/sacpl-logo-small.avif');
  fs.copyFileSync(path.join(srcDir, 'brand/logo.avif'), small);
  await record({ type: 'logo', original: originalOf('brand/logo.avif'), alt: 'SACPL' }, small);

  // App icon: the triangle mark cropped from the logo, centred on a square.
  const mark = await sharp(src).extract({ left: 0, top: 20, width: 285, height: 235 }).toBuffer();
  const icon = path.join(root, 'src/app/icon.png');
  await sharp({ create: { width: 512, height: 512, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } })
    .composite([{ input: await sharp(mark).resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer(), gravity: 'center' }])
    .png().toFile(icon);
  const apple = path.join(root, 'src/app/apple-icon.png');
  await sharp(icon).resize(180, 180).toFile(apple);
}

// Hero ----------------------------------------------------------------
const heroOrder = ['hero6', 'hero7', 'hero2', 'herp3', 'hero4', 'hero5', 'hero8', 'hero1'];
for (const [i, h] of heroOrder.entries()) {
  const out = path.join(pub, `media/hero/hero-${String(i + 1).padStart(2, '0')}.webp`);
  await toWebp(path.join(srcDir, `hero/${h}.avif`), out, 2400, 86);
  await record({ type: 'hero', original: originalOf(`hero/${h}.avif`), optimizerUrlSeen: OPTIMIZER(`/Hero/${h}.avif`), sourceName: `${h}.avif` }, out);
}

// Projects ------------------------------------------------------------
for (const p of projects) {
  for (const img of p.images) {
    const entry = log.find((l) => l.local === img.src);
    if (!entry?.ok) { console.warn('missing download for', img.src); continue; }
    const out = path.join(pub, img.src);
    await toWebp(path.join(srcDir, entry.downloadAs), out, 2000);
    await record({ type: 'project-image', project: p.slug, original: entry.source, alt: img.alt }, out);
  }
}

// Clients -------------------------------------------------------------
for (const l of log.filter((x) => x.type === 'client-logo' && x.ok)) {
  const name = path.basename(l.downloadAs, '.png');
  const intl = l.downloadAs.includes('/international/');
  const out = path.join(pub, `media/clients/${intl ? 'international/' : ''}${name}.png`);
  ensureDir(out);
  await sharp(path.join(srcDir, l.downloadAs)).png({ compressionLevel: 9 }).toFile(out);
  await record({ type: 'client-logo', original: l.source, optimizerUrlSeen: OPTIMIZER(new URL(l.source).pathname) }, out);
}

// Insights ------------------------------------------------------------
const insightImages = {
  'insights/yamuna-skycity.jpg': 'media/insights/yamuna-skycity.webp',
  'insights/sardardham-campus.png': 'media/insights/sardardham-campus.webp',
  'insights/world-trade-centre.jfif': 'media/insights/world-trade-centre.webp',
  'insights/wtc.png': 'media/insights/world-trade-centre-listing.webp',
};
for (const [from, to] of Object.entries(insightImages)) {
  const out = path.join(pub, to);
  await toWebp(path.join(srcDir, from), out, 1800);
  await record({ type: 'article-image', original: originalOf(from) }, out);
}

// Video + poster (requires ffmpeg on PATH) ------------------------------
{
  const src = path.join(srcDir, 'video/abvid.mp4');
  const out = path.join(pub, 'media/video/sacpl-film-720p.mp4');
  const poster = path.join(pub, 'media/video/sacpl-film-poster.webp');
  const posterTmp = path.join(srcDir, 'video/poster.png');
  ensureDir(out);
  try {
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, '-vf', 'scale=-2:720', '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '96k', out]);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '40', '-i', src, '-frames:v', '1', posterTmp]);
    await toWebp(posterTmp, poster, 1600, 80);
    await record({ type: 'video', original: originalOf('video/abvid.mp4') }, out);
    await record({ type: 'video-poster', original: 'frame extracted at 00:40 from abvid.mp4' }, poster);
  } catch (e) {
    console.warn('ffmpeg unavailable — video not migrated:', e.message);
  }
}

// Documents -----------------------------------------------------------
{
  const src = path.join(srcDir, 'documents/sacpl-document.pdf');
  const out = path.join(pub, 'documents/sacpl-gst-registration-certificate.pdf');
  ensureDir(out);
  fs.copyFileSync(src, out);
  await record({
    type: 'document',
    original: 'https://www.sacpl.co/_files/ugd/865611_b627109b18b1412690e3881dd0bff5db.pdf (404 on sacpl.co; retrieved from static.wixstatic.com/ugd/…)',
    note: 'This is the GST registration certificate (Form GST REG-06), not a company profile.',
  }, out);
}

fs.writeFileSync(path.join(root, 'docs/media-manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), items: manifest }, null, 2));
const total = manifest.reduce((s, m) => s + m.bytes, 0);
console.log(`Migrated ${manifest.length} assets (${(total / 1024 / 1024).toFixed(1)} MB)`);
