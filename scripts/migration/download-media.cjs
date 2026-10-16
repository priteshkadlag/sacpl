// Downloads original SACPL media (not Next.js optimizer URLs) into a quarantine folder.
// Usage: node download-media.js <outDir> <project-media.json>
const fs = require('fs');
const path = require('path');
const [, , outDir, projectMediaFile] = process.argv;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const SITE = 'https://www.sacpl.co';
const STORAGE = 'https://utxayeuuvbonhibcgajy.supabase.co/storage/v1/object/public';

const national = ['adani', 'akdn', 'allcargo', 'anantraj', 'anni', 'arki', 'arihant', 'bsafal', 'bmc', 'collage', 'dmart', 'dosti', 'ever', 'gammon', 'gsidc', 'hsa', 'hiranandani', 'kankaia', 'rr', 'lnt', 'mcd', 'mhada', 'nayarai', 'nbcc', 'ncc', 'nirmauni', 'nirma', 'norcon', 'nmm', 'pcpl', 'pgp', 'pma', 'rbi', 'rahejauni', 'raheja', 'saifeez', 'sg', 'shapoorji', 'shreeji', 'stw', 'sun', 'svkm', 'swosti', 'tata', 'vba', 'walmart', 'westline'];
const international = ['abu', 'alzarooni', 'artic', 'damac', 'dub', 'emaar', 'hos', 'map', 'pspf', 'shan', 'mnf'];

const jobs = [
  { type: 'logo', source: `${SITE}/newLogo.png`, downloadAs: 'brand/newLogo.png' },
  { type: 'logo', source: `${SITE}/logo.avif`, downloadAs: 'brand/logo.avif' },
  { type: 'favicon', source: `${SITE}/favicon.ico`, downloadAs: 'brand/favicon.ico' },
  ...['hero1', 'hero2', 'herp3', 'hero4', 'hero5', 'hero6', 'hero7', 'hero8'].map((h) => ({ type: 'hero', source: `${SITE}/Hero/${h}.avif`, downloadAs: `hero/${h}.avif` })),
  { type: 'article-image', source: `${SITE}/wtc.png`, downloadAs: 'insights/wtc.png' },
  { type: 'article-image', source: `${STORAGE}/blogs-images/1755081560555-5vxj77f3e.jpg`, downloadAs: 'insights/yamuna-skycity.jpg' },
  { type: 'article-image', source: `${STORAGE}/blogs-images/1754552103093-jhe7lol7w.png`, downloadAs: 'insights/sardardham-campus.png' },
  { type: 'article-image', source: `${STORAGE}/blogs-images/1755081475580-xn38hr2fc.jfif`, downloadAs: 'insights/world-trade-centre.jfif' },
  { type: 'video', source: `${STORAGE}/videos/abvid.mp4`, downloadAs: 'video/abvid.mp4' },
  { type: 'document', source: `${SITE}/_files/ugd/865611_b627109b18b1412690e3881dd0bff5db.pdf`, downloadAs: 'documents/865611_b627109b18b1412690e3881dd0bff5db.pdf' },
  ...national.map((n) => ({ type: 'client-logo', source: `${SITE}/Clients/${n}.png`, downloadAs: `clients/${n}.png` })),
  ...international.map((n) => ({ type: 'client-logo', source: `${SITE}/Clients/international/${n}.png`, downloadAs: `clients/international/${n}.png` })),
  ...JSON.parse(fs.readFileSync(projectMediaFile, 'utf8')).map((m) => ({ ...m, downloadAs: `projects/${m.downloadAs}` })),
];

async function run() {
  const results = [];
  const queue = [...jobs];
  async function worker() {
    while (queue.length) {
      const j = queue.shift();
      const dest = path.join(outDir, j.downloadAs);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      try {
        const r = await fetch(encodeURI(decodeURI(j.source)), { headers: { 'User-Agent': UA } });
        const buf = Buffer.from(await r.arrayBuffer());
        const ok = r.ok && buf.length > 200;
        if (ok) fs.writeFileSync(dest, buf);
        results.push({ ...j, status: r.status, bytes: buf.length, contentType: r.headers.get('content-type'), ok });
      } catch (e) {
        results.push({ ...j, status: 0, ok: false, error: String(e) });
      }
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));
  fs.writeFileSync(path.join(outDir, 'download-log.json'), JSON.stringify(results, null, 2));
  const failed = results.filter((r) => !r.ok);
  console.log('total', results.length, 'ok', results.length - failed.length, 'failed', failed.length);
  for (const f of failed) console.log('FAIL', f.status, f.source);
}
run();
