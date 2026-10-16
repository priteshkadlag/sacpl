# Editing content

All business content lives in typed, validated files under `src/content/`. Components never import these files directly. They read through the async repository in `src/lib/repository.ts`, so the store can later move to Supabase or a headless CMS without UI changes.

Every record is validated with Zod (`src/content/schema.ts`) at build time. **A typo in a field name or category fails the build** instead of shipping broken pages.

| Content | File | Notes |
|---|---|---|
| Projects (148) | `src/content/projects.json` | One object per project; `slug` becomes the URL `/projects/<slug>` |
| Services / expertise (8) | `src/content/services.ts` | `onHomepage: true` shows it in the homepage grid |
| Clients (58) | `src/content/clients.ts` | `featured: true` puts the logo in the homepage rail |
| Articles | `src/content/articles.ts` | Block-based body: `p`, `h2`, `ul`, `facts` |
| Jobs | `src/content/jobs.ts` | `status: 'closed'` keeps the page (noindex) but removes it from listings |
| Company, offices, stats, timeline, records, leadership, countries | `src/content/company.ts` | Most items carry `verification` |
| Navigation | `src/content/navigation.ts` | Expertise dropdown is generated from services |
| Legacy redirects | `src/content/redirects.ts` | See `docs/REDIRECTS.md` |

## Common tasks

### Add a project

1. Optimise images. Put originals in a folder and run:
   ```bash
   node -e "require('sharp')('in.jpg').resize({width:2000,withoutEnlargement:true}).webp({quality:82}).toFile('public/media/projects/my-project.webp')"
   ```
2. Add an object to `src/content/projects.json`:
   ```json
   {
     "slug": "my-project",
     "name": "My Project",
     "category": "residential",
     "location": "Andheri, Mumbai",
     "country": "India",
     "international": false,
     "client": "Client name",
     "architect": "Architect name",
     "area": "4 lakh sq ft",
     "height": "G+40",
     "structuralSystem": "RC core with post-tensioned flat slabs",
     "summary": "One or two factual sentences.",
     "challenge": "Optional.",
     "solution": "Optional.",
     "images": [{ "src": "/media/projects/my-project.webp", "alt": "Describe what the image shows" }],
     "featured": false
   }
   ```
   Categories: `tall-structures`, `residential`, `commercial`, `institutional`, `hospitality`, `healthcare`, `industrial`, `sports`, `public`, `retail`, `design-and-bid`. Omit any field you do not have. Empty fields are hidden, never shown as blanks.
3. `npm run build` validates it. The page, sitemap entry and filters are generated automatically.

### Publish a pending claim

Find the item in `src/content/company.ts` (e.g. a statistic) and change `verification: 'pending'` to `'verified'`. It will then appear in production.

### Add the company profile PDF

Copy it to `public/documents/sacpl-company-profile.pdf` and set `companyProfilePdf: '/documents/sacpl-company-profile.pdf'` in `company.ts`. Download buttons appear in the hero, the About page and the footer.

### Open or close a job

Add or edit an entry in `jobs.ts`. To close one, set `status: 'closed'` and `closingDate`. Hybrid roles need a base office in `locations` to appear in Google for Jobs.

## Moving to Supabase (or another CMS)

`docs/supabase-schema.sql` defines tables mirroring these schemas, with row-level security (public read of published rows only). To switch, re-implement the functions in `src/lib/repository.ts` (e.g. `getProjects()` → `select * from projects where published`). Keep the Zod `parse` calls and the function signatures, and use `revalidate`/on-demand revalidation for freshness. No component changes are needed.
