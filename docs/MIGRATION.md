# Content & media migration

## Source audit (16 October 2026)

| Legacy route | Content source | Migrated to |
|---|---|---|
| `/` | Static page + `abvid.mp4` (Supabase storage) | `/` |
| `/about` | Static page; leadership/team from CMS table `team_members` | `/about` — founder, 14 leaders, 24 team members and 5 award certificates, from the public page |
| `/projects` | CMS tables `projects` (152 rows) + `project_types` (13) | `/projects` + 148 detail pages; 3 "Records" rows → Recognition |
| `/Clients` | Static page, 58 logos | `/clients` |
| `/blogs`, `/blogs/<uuid>` | CMS table `blogs` (7 rows: 3 live, 4 deleted/demo) | `/insights`, `/insights/<slug>` |
| `/careers`, `/careers/<uuid>` | CMS table `careers` (14 rows: 5 open, 9 deleted) | `/careers`, `/careers/<slug>` |
| `/Contact` | Static page, Google Maps embed | `/contact` |
| `/login` | Admin login for the legacy CMS | `/login` (client-portal shell; see verification checklist §12) |

**People and awards (added 16 October 2026).** Founder, Leadership and Expert Team were taken from what the public About page displays to visitors (each tab rendered in a browser), not from the CMS database. Photos and award certificates were downloaded through the site's public image URLs by `scripts/migration/download-people.mjs`; old → new paths are in `docs/media-manifest-people.json`. Content lives in `src/content/people.ts` and `awards` in `src/content/company.ts`. Anything in the CMS table that the page does not display (for example LinkedIn URLs) was not migrated.

## Data cleaning

`scripts/migration/convert-projects.cjs` converted the project rows:

- trimmed whitespace and title-cased ALL-CAPS names (acronyms kept);
- applied **obvious** spelling fixes only, each one logged in `docs/source-corrections.json`;
- mapped CMS categories to typed categories; split "Records" out of projects;
- parsed descriptions into `specs` (keys, beds, cost), `status`, `scope` and bid outcome;
- derived `country`/`international` from locations and logged every change to the source flag;
- merged one duplicate (Farukhnagar Warehouse).

Truncated or malformed descriptions were then cut back to their last complete sentence, or reworded only where the intended meaning was explicit. Each case is listed in `CONTENT-VERIFICATION.md` §7.

## Media

`docs/media-manifest.json` maps **every legacy URL to its new local file** (228 entries), with type, byte size, dimensions and alt text where relevant.

| Type | Count | Treatment |
|---|---|---|
| Logo + variants | 3 | `newLogo.png` kept as PNG; white variant generated for dark headers; `logo.avif` kept |
| App icons | 2 | Triangle mark cropped from the logo → `src/app/icon.png`, `apple-icon.png`; legacy `favicon.ico` kept |
| Hero images | 8 | Legacy AVIF (≈900–1,330 px) → WebP masters, re-ordered for the slideshow (`herp3.avif` typo preserved in the manifest) |
| Project images | 149 | Original Supabase storage objects (not `_next/image` optimiser URLs) → WebP ≤ 2,000 px |
| Client logos | 58 | PNG kept (transparency); legacy `gsidc.png` was actually a JPEG and is now a real PNG |
| Article images | 4 | WebP |
| Recognition | 3 | Certificate/trophy photos → WebP |
| Video | 1 + poster | 33.5 MB `abvid.mp4` → 15 MB H.264 720p with faststart; poster from 00:40 |
| Document | 1 | GST certificate PDF (recovered from static.wixstatic.com; 404 on sacpl.co) |

Next/Image serves **AVIF and WebP variants** at each component's `sizes`. Below-the-fold images lazy-load by default; hero/LCP images use `priority`. The YouTube culture video and the portfolio film both load nothing until played.

**Duplicates removed:** the legacy pages requested every image through the Next.js optimiser at 8 widths (`/_next/image?url=…&w=640…3840`). Only one master per asset is now stored.

## Reproducing the migration

```bash
# 1. download originals into a quarantine folder (outside the repo)
node scripts/migration/download-media.cjs <downloadDir> <project-media.json>
# 2. convert/optimise into /public and regenerate docs/media-manifest.json (requires ffmpeg for the film)
node scripts/migration/migrate-media.mjs <downloadDir> <projects.json>
```

The legacy Supabase project hosts the original images. **Do not decommission it until every asset has been confirmed in `/public`.**

## Rights to confirm before launch

See `CONTENT-VERIFICATION.md` §10–11: client-logo permissions, architects' renders, the film's music licence, and the people appearing in videos and in the GST certificate.
