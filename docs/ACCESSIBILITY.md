# Accessibility review (WCAG 2.2 AA)

Reviewed 16 October 2026 against the production build: automated (axe via Lighthouse 12.8) plus scripted keyboard and interaction tests in Chrome (see `TESTING.md`). Automated tools catch roughly a third of issues, so a manual screen-reader pass (NVDA + Chrome, VoiceOver + Safari) is still recommended before launch.

## Results

Lighthouse accessibility score: **100** on Home, About, Expertise, Projects, Project detail, Clients, Insights article, Careers job, and Contact.

## What is in place

| Area | Implementation |
|---|---|
| Landmarks | `header`, `nav` (labelled: Primary, Mobile, Breadcrumb, Footer), `main#main`, `footer`; every section has an `aria-labelledby` heading |
| Headings | One `h1` per page; sections `h2`, cards `h3`; verified by Lighthouse heading-order |
| Skip link | First focusable element; visible on focus; moves focus to `<main>` |
| Focus | 2 px signal-red `:focus-visible` outline with offset on every interactive element; never removed |
| Keyboard — header | Expertise submenu: chevron button with `aria-expanded`/`aria-controls`; ArrowDown opens and focuses the first item; Up/Down move through items; Escape closes and returns focus; outside click closes |
| Keyboard — mobile menu | `role="dialog"` + `aria-modal`; focus moved in, Tab trapped, Escape closes; body scroll locked |
| Lightbox | Native `<dialog>` (inherent focus containment); Close focused on open; ←/→ navigate; Escape closes; focus returns to the thumbnail; swipe on touch |
| Carousels (Swiper) | Labelled region, real `<button>` prev/next with disabled states, keyboard module, live "01 / 12" counter; **no autoplay** |
| Moving content | Hero slideshow has a visible Pause/Play control (WCAG 2.2.2), pauses when the tab is hidden; logo rail pauses on hover/focus and has a Pause control |
| Reduced motion | `prefers-reduced-motion`: homepage intro skipped; slideshow starts paused; GSAP scroll sequences render final state; Motion reveals become instant; CSS animations disabled; Lenis never initialised |
| Colour contrast | Accent text uses an inherited token: `#c62a21` on light surfaces (5.0:1), `#f04a40` on dark (≥4.7:1). Buttons with white text use `#c62a21` |
| Forms | Visible `<label>` for every field; required marked visually and with `aria-required`; inline errors linked by `aria-describedby` and `aria-invalid`; an error summary (`role="alert"`) receives focus and links to each field; loading state announced; success panel focused with `role="status"` |
| Images | Meaningful alt text for project, article and recognition images; decorative imagery `alt=""`/`aria-hidden`; map has a text alternative plus a full country list |
| Video | Click-to-load YouTube with captions requested (`cc_load_policy=1`); film has a text description. **Transcript/captions must be supplied by SACPL** (checklist §11) |
| Touch targets | Interactive controls ≥ 44 px where practical, all ≥ 24 px (WCAG 2.5.8). Card titles extend their hit area to the whole card |
| Language | `lang="en-IN"` |
| Links | External links announce "(opens in a new tab)"; button names contain their visible label (WCAG 2.5.3) |
| Zoom/reflow | Fluid type with `clamp()` and single-column layouts on small screens. Verified no horizontal scroll at 390 px and 1,440 px; 320 px / 400 % zoom not yet tested manually |

## Known limitations and recommendations

1. **Culture video captions.** Depend on YouTube having captions for `ctpAOlBIPNM`. Upload a caption file or publish a transcript.
2. **Film soundtrack.** Music only (no narration), so no captions are needed. The text description is provided.
3. **Client logos.** Shown in greyscale until hover (decorative styling). Each logo carries the client's name as alt text or as an adjacent label.
4. **Pending-verification badges** appear only in preview builds; production never shows them.
5. Run a **manual screen-reader pass** on the enquiry and application forms (file upload, error summary) before launch.
