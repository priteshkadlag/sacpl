# Content verification checklist

Everything below came from the legacy site (sacpl.co, audited 16 October 2026) but has **not** been confirmed by SACPL, conflicts with other sources, or is missing.

**How gating works.** Items marked `verification: 'pending'` in `src/content/*.ts` are **hidden in production** and shown with an amber *Pending verification* badge in development and preview builds (`NEXT_PUBLIC_SHOW_PENDING_CONTENT`). To publish an item, confirm it and change it to `'verified'`.

Legend: **[Hidden]** = not shown in production until confirmed · **[Shown]** = live, but needs sign-off · **[Missing]** = content needed

---

## 1. Company identity

| # | Item | Source / evidence | Status | Where |
|---|---|---|---|---|
| 1.1 | Legal name **Shanghvi & Associates Consultants Private Limited** | GST certificate (Form GST REG-06) | ✅ Evidenced | `company.ts` |
| 1.2 | Display name "Shanghvi **and** Associates…" vs "Shanghvi **&** Associates…" | Site uses both | [Shown] — confirm preferred form | Header, footer, schema |
| 1.3 | Founding year **1973** | About page only | [Hidden] — gates the "since 1973" line and the intro "over five decades" message | `company.foundingYear` |
| 1.4 | "50+ years" / "50 Years of Excellence" / "nearly five decades" / "Trusted for 50 Years" | Homepage, About, Contact | [Hidden] Conflicting wording. 1973 implies *over* five decades; the brief's "nearly five decades" was not used | `stats.years` |
| 1.5 | GSTIN 27AALCS3411K1Z7 | GST certificate | ✅ Evidenced | Footer, schema `taxID` |

## 2. Statistics (all hidden in production)

| # | Claim | Source | Conflict / note |
|---|---|---|---|
| 2.1 | 10,000+ projects | Home, Clients, Contact | The portfolio publishes 148 |
| 2.2 | **200+** team members | Home, About | **Careers says 150+** — confirm one figure |
| 2.3 | 4 world records | Home | Evidence found: **1** Limca *World* Record + **1** Limca *National* Record (both NMMC HQ). India Book of Records certificate found (see 6.4) but it does not name SACPL |
| 2.4 | 25+ countries | Careers | Portfolio evidences 7 countries (+ Iran, Nepal named without projects) |
| 2.5 | "We proudly serve clients in **every country**" | Home | **Removed** — overstated |
| 2.6 | 99% client satisfaction | Home, Careers | Not reproduced anywhere |
| 2.7 | Clients page: 500+ active clients, 98% success rate, 10,000+ delivered, 95% retention, 50+ national companies | Clients | All in `clientStats` [Hidden] |
| 2.8 | "Our team will get back to you within 24 hours" | Contact form | **Removed** — confirm a response-time promise if wanted |

## 3. People

| # | Item | Source | Note |
|---|---|---|---|
| 3.1 | Founder employees Mr. Vinod Fondekar and Mr. Prakash Satam (1973) | About bundle | [Hidden] in timeline |
| 3.2 | Founder **Mr. Suresh P. Shanghvi, Founder & Chairman** | About → Our Founder tab | ✅ [Shown]. Matches director "Suresh Prataprai Shanghvi" on the GST certificate. Added to Organization schema as `founder` |
| 3.2a | Role conflicts inside the legacy About page: founder text says Rajiv Shanghvi **MD** and "Sachin **K C**"; Leadership tab says Rajiv Shanghvi **Director** and "Sachin **Kumar**" | About tabs | [Shown] using the **Leadership tab** wording — confirm |
| 3.2b | Founder tab "Key highlights": Founded **1974**, Team **200+**, Countries **8+**, **50+ years** | About → Our Founder | [Hidden] — conflict with 1973, 150+ (Careers) and 25+ (Careers). Growth-journey and innovation paragraphs also [Hidden] for the same figures |
| 3.3 | Leadership (14) and Expert Team (24) — names, titles, short bios, photos | About → Leadership / Expert Team tabs (public page, captured 16 Oct 2026) | ✅ [Shown] in `src/content/people.ts`. **Confirm each person is still with SACPL and consents to their photo being published.** Many photos are only 124–260 px wide — supply larger portraits. No LinkedIn URLs exist on the legacy page ("Click for LinkedIn Profile" is plain text) |
| 3.4 | Mr. Biju Nair appears in the culture video thumbnail | YouTube | Confirm consent if the thumbnail stays |

## 4. Offices

| # | Office | Status |
|---|---|---|
| 4.1 | Mumbai HQ — 6th Floor, 106 B-Wing, Brij Bhoomi, Nehru Road, Above Canara Bank, Mumbai 400057 | ✅ Matches GST certificate. Map pin from the legacy embed |
| 4.2 | Surat — 436 Avadh Arena, VIP Road, Vesu, Surat 395007 | [Hidden] footer only |
| 4.3 | "**Mangalore** Office" — Kittur Rani Chennamma Rd, Brahmagiri, **Udupi** 576101 | [Hidden] Label says Mangalore; address is Udupi |
| 4.4 | Working hours Mon–Fri 10:00–18:30 | [Shown] Contact page |
| 4.5 | Phones/emails: Suresh Shriyan +91 98672 00065, Awez Waghu +91 85910 93540, suresh.shriyan@, awez.waghu@, careers@sacpl.co | [Shown] — confirm both contacts should stay public |

## 5. Documents

| # | Item | Note |
|---|---|---|
| 5.1 | **"Company profile" PDF** (`/_files/ugd/865611_b627…pdf`) | ⚠️ **This file is the GST registration certificate, not a company profile.** It also returns 404 on sacpl.co (recovered from static.wixstatic.com). It is linked in the footer as "GST registration certificate". **[Missing]** Supply the real company-profile PDF and set `company.companyProfilePdf`. All "Download company profile" buttons then appear automatically |
| 5.2 | GST certificate contains directors' **photos and names** | Confirm it should remain publicly downloadable |

## 6. Recognition

| # | Item | Status |
|---|---|---|
| 6.1 | Limca World Record — NMMC HQ, longest post-tension beam-slab system 43.21 m | ✅ Certificate image |
| 6.2 | Limca National Record — NMMC HQ, largest GRC dome 37.314 m | ✅ Certificate image |
| 6.3 | ET Now Realty Conclave & Awards 2026 — WTC New Delhi, Commercial Landmark of the Year | ✅ Trophy photo. Confirm SACPL's role in the award |
| 6.4 | India Book of Records — longest free-standing cantilevered RCC structure (12 m, Kajila, Gurupura; certificate dated 12 June 2017) | [Hidden] — certificate now migrated, but it is made out to architect Sanath Kumar Shetty "along with two team members"; **confirm SACPL's role** |
| 6.5 | Planet SKS — DSK Artists in Concrete Awards 2011 (national level), Overall Excellence in Structural Design | ✅ Award board names Shanghvi & Associates. [Shown] in `awards` |
| 6.6 | ICI–UltraTech Awards 2024 — Certificate of Appreciation, Lata Mangeshkar Kalangan (Goa) | ✅ Certificate names SACPL. [Shown] |
| 6.7 | ICI–UltraTech Awards 2023 — Certificate of Appreciation, Lekha Bhavan (Goa) | ✅ Certificate names SACPL. [Shown] |
| 6.8 | ICI-Goa UltraTech Awards 2018 — Certificate of Commendation, Pernem bus stand & market complex | ✅ Certificate names SACPL as structural consultants. [Shown] |
| 6.9 | ACCE(I) Mangaluru–UltraTech Awards 2019 — Northernsky City, Mangaluru | [Hidden] — certificate names the building (Shri Dheeraj Amin), not SACPL; confirm role. Northernsky City is not in the project list |
| 6.10 | Legacy "Achievements" tiles: Engineering Excellence, "Delivered on time, every time", Innovation Award, Quality Excellence, Industry Recognition | **Not migrated** — generic slogans with no award or evidence behind them |


## 7. Projects (148 published)

### Conflicts

| Project | Conflict |
|---|---|
| **Doha City Center** | Location field says **Dubai**; client (Al Rayyan Tourism Investment Co.) and name indicate **Doha, Qatar**. Shown as given; map counts it under Qatar |
| **World Trade Centre, New Delhi** | Architect: project record says *Sikka Associates Architects*; description and article say *CDPL* (Collage Design Pvt. Ltd., per the film credits). Article also says "CDPL 25 Acres" |
| **Northern Hills** | Project: 235 m, 16,60,410 sq ft. Deleted legacy post: 225 m, 17,63,382 sq ft, G+3B+9P+5+52+2 service+1 E-deck |
| **Yamuna Skycity** | Project: 210 m, 11 lakh sq ft. Article: 199.75 m, G+60, 10 lakh sq ft |
| **Sardardham Campus** | Area "6,71,366.47 Lakh Sq.Ft" is implausible — omitted from the article, kept on the project record. Confirm |
| **Arihant Aspire** | 50 lakh sq ft for 3B+G+42 — confirm (whole development?) |
| **Senior Structural Engineer** (job) | Listing: Mumbai, Pune, Ahmedabad; body: "Mumbai (hybrid mode)" |

### Data quality

- **Lost bids published**: Anna Nagar, Redevelopment of GPRA Sarojini Nagar and Pragati Maidan are labelled *Lost* in the source. They are shown under *Design & Bid* with "Bid outcome: Not awarded". Confirm they should stay public.
- **Possible duplicates**: *Netaji Nagar* (Residential, NBCC) vs *Redevelopment of GPRA Netaji Nagar* (Design & Bid, NBCC). *Bandra Educational International School* and *Educational International School* share one image but differ in location and architect.
- **Merged duplicate**: *Farukhnagar Warehouse* appeared under both Institutional and Industrial. Kept once (Industrial).
- **No image**: Goa Fish Market (its source image path was empty).
- **Truncated descriptions** (source text cut off; completed only where the meaning was explicit): Capital Complex Raipur, Netaji Nagar, Pragati Maidan (Phase 2 missing), Ravindra Bhavan (function list missing), Reserve Bank of India. Supply full text.
- **Thin records**: ICON – Jacob Circle has no client, architect, area or height. 30+ projects have no client or architect.
- **International flag corrected**: RC-B-045 (Dubai) and 2,000-Unit Social Housing (Maldives) were not flagged international in the source.
- **No structural-system, challenge or solution data** exists for any project. The fields are supported in the data model and render automatically when filled.
- **"Status"** (completed / under construction) exists only for hotels. The *Ongoing* and *Completed* filters therefore cover hotels only.
- **"Mixed Use"** filter from the brief: no project is categorised as mixed use, so it is not offered.
- Source category *International Projects* was empty; *Records* (3 items) were moved to Recognition.

### Spelling corrections applied (obvious only)

See `docs/source-corrections.json` (22 entries), e.g. Ghatkhopar → Ghatkopar, Goregoan → Goregaon, Raddison → Radisson, Marriot → Marriott, Dawrkesh → Dwarkesh, Shikasha → Shiksha, Bhubaneshwar → Bhubaneswar, Tamilnadu → Tamil Nadu. Names kept as in the source but worth checking: *Constillation*, *Pratham Bulet*, *Onxy Mall*, *Evershine Millenium Paradise*, *Raitech Park* (image file says "NeXtech"), *Aristo Saphire*, *Pernem Bustop*.

## 8. Insights (articles)

| # | Item | Note |
|---|---|---|
| 8.1 | Three published articles migrated (WTC, Sardardham, Yamuna Skycity) | Bodies contain **only text recovered during migration**. `bodyComplete: false` on all three. Export full bodies from the legacy CMS |
| 8.2 | Authors | None in source; shown as "SACPL" |
| 8.3 | Deleted/demo posts (4) | Not migrated; legacy URLs redirect (see REDIRECTS.md) |

## 9. Careers

| # | Item | Note |
|---|---|---|
| 9.1 | Open roles: B.Tech Junior Engineer, Structural Draftsman, Junior Design Engineer, Senior Structural Engineer, Business Development Manager | Confirm each is still open |
| 9.2 | Junior Engineer – QA/QC | **Closed** in the source on 12 Feb 2026; kept as a closed listing (noindex) |
| 9.3 | Hybrid roles have no base office | JobPosting schema (Google for Jobs) is **skipped** for roles without a confirmed location |
| 9.4 | Closing dates, qualifications, departments | Not in source; departments assigned by role type — confirm |
| 9.5 | Generic "tech industry" copy and Unsplash office photos | **Removed** (not SACPL). Supply real office/team photography |
| 9.6 | "Work-Life Balance" source text described diversity instead | Rewritten neutrally — supply real policy wording |

## 10. Clients

- 47 national + 11 international logos migrated. **Confirm permission to display every logo.**
- Unclear identities: **STW**, **The Mwalimu** (logo file `mnf.png`), **Artic Tourism**, **PCPL** (shown as Pranav Constructions, per its link).
- No website on record: BMC, K Raheja Realty, NMMC, RBI, Sanghvi Group, STW, and all international clients.
- Legacy listed *Arihant Superstructures* with a link to a single project microsite.

## 11. Media & rights

- **Hero images** are ~900–1,330 px wide (legacy AVIF). Supply high-resolution originals. The projects they depict are not identified; alt text is generic until they are named.
- Project imagery consists largely of architects' renders. Confirm usage rights with each architect or client.
- Portfolio film (WTC sky-bridge model, 3:10) credits Collage Design and has a music soundtrack. Confirm music licence.
- Culture video (YouTube `ctpAOlBIPNM`): provide captions/transcript on YouTube. The embed requests captions automatically.

## 12. Legal & platform

- Privacy notice and Terms are **drafts** (noindex until `LEGAL_APPROVED=true`). They need legal review.
- **Client login.** The legacy `/login` page signed into the CMS admin backend (Supabase `admins` table), **not** a client portal. The new `/login` performs no authentication until `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_CLIENT_PORTAL_URL` point to a real client portal. Decide whether a client portal exists; otherwise remove the link.
- **Legacy CMS security.** The legacy frontend reads Supabase tables directly with a public key. Review row-level security on the legacy project, especially `contact_inquiries` and `admins`, before decommissioning it.
