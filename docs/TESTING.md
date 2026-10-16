# Test report

**Build under test:** production build (`next build` + `next start`), 16 October 2026, Chrome (stable) driven by Playwright, Lighthouse 12.8.2. Local Windows machine, no CDN. Absolute performance numbers on a hosted CDN will differ (see §4).

## 1. Build & static checks

| Check | Result |
|---|---|
| `tsc --noEmit` | ✅ 0 errors |
| `next lint` | ✅ 0 warnings/errors |
| `next build` | ✅ 188 routes generated (148 project, 8 expertise, 3 article, 6 job pages + index pages, sitemap, robots, OG image, map) |
| Content validation (Zod at build) | ✅ all 148 projects, 8 services, 58 clients, 3 articles, 6 jobs valid |

## 2. Responsive rendering

Full-page screenshots at **320, 390/412, 768 and 1,440 px** for: home, about, expertise index and detail, projects index, two project details (with and without image), clients, insights index and article, careers index and job, contact, login, privacy, terms, 404.

- ✅ No horizontal overflow at any width on any route.
- ✅ No console errors on any route (desktop and mobile). The only network errors were the intentional 404 page and one transient Google Maps tile.
- ✅ Hydration clean with and without `prefers-reduced-motion` (two mismatches found and fixed during testing: SVG `<title>` text nodes; Motion `initial` state branching on reduced motion).

## 3. Interaction & keyboard (scripted, all passing)

| # | Test | Result |
|---|---|---|
| 1 | Skip link is first tab stop, visible on focus, moves focus to `<main>` | ✅ |
| 2 | Expertise submenu: ArrowDown opens, focus enters menu, arrows move, Escape closes and restores focus | ✅ |
| 3 | Header becomes solid after scrolling | ✅ |
| 4 | Hero slideshow pause control works | ✅ (**bug found & fixed**: hero copy layer overlapped the control) |
| 5 | Project filter: sector chip updates live count (19 hospitality), state reflected in URL | ✅ |
| 6 | Sector + status filters combine (3 ongoing hotels) | ✅ |
| 7 | Search with no matches shows empty state with reset | ✅ |
| 8 | Lightbox: opens as modal, Close focused, → advances, Escape closes, focus returns to thumbnail | ✅ |
| 9 | Enquiry form: empty submit shows focused error summary, 9 fields `aria-invalid`, errors linked by `aria-describedby` | ✅ |
| 10 | Enquiry submit in production with no delivery provider → explicit "could not send" message (no silent loss) | ✅ |
| 11 | Application form (dev): position pre-selected from job page, PDF upload, success panel with reference `APP-…` focused, submission logged server-side | ✅ |
| 12 | Mobile menu: modal dialog, focus moved in, body scroll locked, Escape closes | ✅ |
| 13 | All visible touch targets ≥ 24×24 px on mobile (WCAG 2.5.8) | ✅ |
| 14 | Homepage intro: plays on first visit, ≈2.4 s sequence, skipped on second visit in the session and for reduced motion; does not affect LCP | ✅ |

### API (curl, production)

| Case | Expected | Result |
|---|---|---|
| Invalid fields | 422 + per-field messages | ✅ |
| Valid, no provider configured | 503 + "email us directly" | ✅ |
| Honeypot filled | 200 fake success, not delivered | ✅ |
| Cross-origin `Origin` header | 403 | ✅ |
| 6 rapid submissions | 429 after limit | ✅ |

### Redirects (production)

All legacy routes in `REDIRECTS.md` return **308** to the correct target (`/Clients`, `/Contact`, `/blogs`, blog and career UUIDs, unknown blog IDs, GST PDF path). Sitemap lists 172 URLs; robots allows all except `/api/` and `/login`, and disallows everything on non-production deployments.

## 4. Lighthouse (final run, production build)

| Route | Mobile perf | Desktop perf | Accessibility | Best practices | SEO | CLS (mobile) |
|---|---|---|---|---|---|---|
| Home | 67–81 | 97 | 100 | 100 | 100 | 0 |
| About | 93–95 | — | 100 | 100 | 100 | 0 |
| Expertise | 93–95 | — | 100 | 100 | 100 | 0 |
| Expertise detail | 85–86 | — | 100 | 100 | 100 | 0 |
| Projects | 76–90 | 97 | 100 | 100 | 100 | 0.024 |
| Project detail | 73–91 | 96 | 100 | 100 | 100 | 0 |
| Clients | 83–96 | — | 100 | 100 | 100 | 0 |
| Insight article | 89–94 | — | 100 | 100 | 100 | 0 |
| Careers | 94–97 | — | 100 | 100 | 100 | 0 |
| Contact | 96–97 | — | 100 | 100 | 100 | 0 |

Ranges show variation across runs on the same build (local CPU contention).

**Against the targets:** accessibility, SEO and best practices meet ≥ 95 on every route. Mobile performance ≥ 90 is met on About, Expertise, Insights, Careers and Contact, and on desktop everywhere. **It is not yet consistently met on Home and the image-led pages.**

Issues fixed during testing: LCP blocked by opacity-based entrance animations (now transform-only); font-swap CLS up to 0.19 (Archivo used at normal width, `font-display: optional`); world-map data duplicated in the RSC payload (moved to a static `/reach-map.svg`); render-blocking CSS (inlined); lazy-loaded LCP images (first row prioritised); contrast of red accents (AA token).

**Remaining levers, in order of expected impact:**
1. Deploy behind a CDN with HTTP/2+ and cached image variants. Lighthouse flags `uses-http2` and cache TTLs locally, and the local `next start` encodes AVIF on first request.
2. Replace the hero renders with properly sized originals (current legacy files are ≈900–1,330 px; supply 2,400 px masters).
3. Reduce homepage hydration (TBT): convert remaining scroll-reveal wrappers on static sections to CSS `animation-timeline: view()` and lazy-hydrate the carousels.
4. Re-measure with PageSpeed Insights / CrUX field data after launch. Lab scores on a shared dev machine are noisy.

## 5. Not covered — recommended before launch

- Manual screen-reader pass (NVDA/Chrome, VoiceOver/Safari, TalkBack/Chrome).
- Real-device testing (iOS Safari, Android Chrome) and Firefox/Safari desktop.
- 320 px / 400 % zoom reflow check by hand.
- End-to-end delivery test once Resend/webhook/Supabase credentials exist.
- Client-portal login against a real auth backend (none exists yet).
