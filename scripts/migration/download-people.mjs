// Downloads the people and achievement photos shown on the public legacy About page
// (https://www.sacpl.co/about) through the site's own public image URLs, and converts them to WebP.
// Usage: node scripts/migration/download-people.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SITE = 'https://www.sacpl.co';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const STORAGE = 'https://utxayeuuvbonhibcgajy.supabase.co/storage/v1/object/public/team-images/team-members/';

// [output slug, source path as used by the legacy page]
const people = [
  ['suresh-shanghvi', '/founder.png'],
  ['vinoo-naik', '/Leaders/vinooN.png'],
  ['biju-nair', '/Leaders/bijuN.png'],
  ['nikhil-shanghvi', '/Leaders/nikhil1.png'],
  ['rajiv-shanghvi', '/Leaders/rajivSq.png'],
  ['sachin-kumar', '/Leaders/sachinK.png'],
  ['suresh-shriyan', '/Leaders/sureshS.png'],
  ['rahul-dangi', '/Leaders/rahulD.png'],
  ['bhagavan-das', STORAGE + '1755512786096-ih5065fxied.png'],
  ['dhaval-patoliya', STORAGE + '1755520480839-508838m7rup.png'],
  ['nayan-fatania', STORAGE + '1773637421111-v1z1j2yshla.png'],
  ['lahira-salkar', STORAGE + '1782110350008-5smoumtsf0r.png'],
  ['vinda-dravid', STORAGE + '1755512981465-2khb3kmvbt9.png'],
  ['awez-waghu', STORAGE + '1755511915420-q0vn63ycfqf.png'],
  ['prashant-chorghe', '/people/prashant.avif'],
  ['murtuza-jambughodawala', '/people/murtuza.png'],
  ['afroz-alam', '/people/afroz.png'],
  ['sadaf-quadri', '/people/sadaf.avif'],
  ['mangesh-chorghe', '/people/mangesh.png'],
  ['vishal-kevat', STORAGE + '1755512221891-2qoetz6i5i.png'],
  ['keshav-godkar', '/people/keshav.png'],
  ['shekhar-gawade', STORAGE + '1755842198891-gphwxzxkllf.jpeg'],
  ['someer-das', '/people/someer.png'],
  ['sagar-marathe', '/people/sagar.avif'],
  ['pranit-khelurkar', '/people/pranit.avif'],
  ['shilpa-pattikara', '/people/shilpaa.png'],
  ['pradnya-kasture', '/people/pradnya.png'],
  ['sanjay-chavan', '/people/sanjay.avif'],
  ['vipul-kini', '/people/vipul.png'],
  ['chandan-thakur', '/people/chandan.png'],
  ['arjun-walawalkar', '/people/arjun.avif'],
  ['ghanshyam-bhavsar', '/people/bhavsar.avif'],
  ['suhas-jaitapkar', '/people/Suhas.png'],
  ['syed-mohammed-saidani', '/people/syed.png'],
  ['kaushal-mhatre', '/people/kaushal.avif'],
  ['varunkumar-panchal', '/people/varun.png'],
  ['iranna-badiger', STORAGE + '1755512054170-dfnxxy8cunk.png'],
  ['digvi-doshi', '/people/digvi.avif'],
];
const achievements = ['/ach-1.jpg', '/ach-2.jpg', '/ach-3.jpg', '/ach-4.jpg', '/ach-5.jpg', '/ach-6.jpg', '/lim.jpg', '/limn.jpg'];

// Same request the legacy page makes in a browser: its public image optimiser.
const viaSite = (src, w) => `${SITE}/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=90`;

async function get(src, w) {
  const res = await fetch(viaSite(src, w), { headers: { 'User-Agent': UA, Accept: 'image/avif,image/webp,image/png,image/jpeg,*/*' } });
  if (!res.ok) throw new Error(`${res.status} ${src}`);
  return Buffer.from(await res.arrayBuffer());
}

const manifest = [];
async function save(buf, out, maxW) {
  await fs.mkdir(path.dirname(out), { recursive: true });
  const info = await sharp(buf).rotate().resize({ width: maxW, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  return info;
}

for (const [slug, src] of people) {
  const out = `public/media/people/${slug}.webp`;
  const info = await save(await get(src, 640), out, 480);
  manifest.push({ legacy: src.startsWith('http') ? src : SITE + src, file: out.replace('public', ''), width: info.width, height: info.height });
  console.log(slug, `${info.width}x${info.height}`);
}
for (const src of achievements) {
  const slug = 'achievement-' + path.basename(src, '.jpg');
  const out = `public/media/recognition/${slug}.webp`;
  const info = await save(await get(src, 1080), out, 1080);
  manifest.push({ legacy: SITE + src, file: out.replace('public', ''), width: info.width, height: info.height });
  console.log(slug, `${info.width}x${info.height}`);
}
await fs.writeFile('docs/media-manifest-people.json', JSON.stringify(manifest, null, 2) + '\n');
