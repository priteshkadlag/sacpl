# Redirect map: legacy sacpl.co → new site

All redirects are permanent (HTTP 308). They are defined in `src/content/redirects.ts`, except case normalisation, which lives in `src/middleware.ts`.

## Pages

| Legacy URL | New URL | Mechanism |
|---|---|---|
| `/` | `/` | unchanged |
| `/about` | `/about` | unchanged |
| `/projects` | `/projects` | unchanged |
| `/careers` | `/careers` | unchanged |
| `/login` | `/login` | unchanged (noindex) |
| `/Clients` | `/clients` | middleware lower-cases paths |
| `/Contact` | `/contact` | middleware lower-cases paths |
| `/blogs` | `/insights` | redirects.ts |
| *(no legacy page)* | `/expertise`, `/expertise/[slug]` | new |
| *(no legacy page)* | `/projects/[slug]` (148 pages) | new; the legacy site had no project detail URLs |
| *(no legacy page)* | `/privacy`, `/terms` | new (were `#privacy`/`#terms` dead anchors) |

## Articles (`/blogs/<uuid>` → `/insights/<slug>`)

| Legacy ID | New URL |
|---|---|
| `833d8edc-1c62-40fa-9e6e-cb7141fe7ed5` | `/insights/world-trade-centre-new-delhi` |
| `ce3dc428-d6f0-48b0-94ff-900970bb65d7` | `/insights/sardardham-campus-ahmedabad` |
| `09bd3773-3c87-4677-89ff-9d42617e13e6` | `/insights/yamuna-skycity-mangalore` |
| `f432085b-78cb-4544-8c4b-10b8f93dfba5` (deleted "Northern Hills" post) | `/projects/northern-hills` |
| `f922cccd-…`, `d96f575b-…`, `4cd1f3e3-…` (deleted demo posts) | `/insights` |
| any other `/blogs/:id` | `/insights` (catch-all) |

## Jobs (`/careers/<uuid>` → `/careers/<slug>`)

| Legacy ID | Role | New URL |
|---|---|---|
| `52928adb-47fc-46ad-a618-aa6a8774fac6` | B.Tech Junior Engineer | `/careers/btech-junior-engineer` |
| `d4884b5f-ab70-4614-86d5-0d3a6f644786` | Structural Draftsman | `/careers/structural-draftsman` |
| `9ed9381d-3b51-4ec0-9835-da7c0a1c3462` | Junior Design Engineer | `/careers/junior-design-engineer` |
| `5c21fa59-c293-494c-a0b3-03e485d500cd` | Senior Structural Engineer | `/careers/senior-structural-engineer` |
| `6eea38d6-03b7-47ef-a63d-66056b5e9d19` | Senior Structural Engineer (deleted duplicate) | `/careers/senior-structural-engineer` |
| `57a1b4ee-1065-4ab0-b0fc-bd704b63cf6e` | Business Development Manager | `/careers/business-development-manager` |
| `4d65589e-8263-42d8-b958-502de335df75` | Junior Engineer – QA/QC (closed) | `/careers/junior-engineer-qa-qc` |
| `200d9e15-5ed4-47fb-b01e-85902bdf0cce` | Engineer – QA/QC Projects (deleted) | `/careers/junior-engineer-qa-qc` |
| `acd9c3df-…` Steel Design Engineer, `675a3979-…` Junior Technical Assistant, `41e46b38-…` Design Engineer, `f8784d39-…` JR Engineer, `86158138-…` JDE, `ac4f4451-…` Demo | closed/deleted | `/careers` |

## Files

| Legacy URL | New URL |
|---|---|
| `/_files/ugd/865611_b627109b18b1412690e3881dd0bff5db.pdf` (GST certificate; 404 on legacy site) | `/documents/sacpl-gst-registration-certificate.pdf` |
| `/newLogo.png`, `/logo.avif`, `/Hero/*.avif`, `/Clients/*.png`, `/wtc.png` | `/brand/…`, `/media/…`. See `docs/media-manifest.json`. Not redirected: these were internal assets, not indexed pages |

## Verifying after deployment

```bash
for p in /Clients /Contact /blogs /blogs/833d8edc-1c62-40fa-9e6e-cb7141fe7ed5 /careers/57a1b4ee-1065-4ab0-b0fc-bd704b63cf6e; do
  curl -s -o /dev/null -w "%{http_code} $p -> %{redirect_url}\n" "https://www.sacpl.co$p"
done
```
