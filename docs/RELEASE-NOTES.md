# Release notes — Stronger form

## Business and design analysis

Reviewed the complete original source (one public route, all section components, assets, contact action, layout metadata and analytics) at e3b5345; all nine available Draper Norwood context files; the live site at https://www.drapernorwood.com; and related Archive to Audience source/production material in the workspace.

Draper Norwood combines diagnosis and execution. Its best-fit client already has valuable work, expertise, or capability but lacks the public structure that makes it understandable and credible. The strongest distinction is the ability to find a useful pattern across strategy, proof, creative work, technology, and business operations, then build it.

The homepage should create recognition and a credible reason to start a conversation. The work must appear before a large explanation of services. Lost Archives is the clearest demonstration; DCD, Creator Secrets, and HealthLinks show the range without pretending that the underlying problems are identical.

## Central concept

**The value is already there.** An editorial worktable shows real source materials becoming a strategic point of entry, then a named media property with documented launch evidence. Visitors control Material / Perspective / Form using mouse, touch, or keyboard. The experience never requires interaction to understand the company or reach the work.

The visual system combines graphite, light paper, and a sharp yellow-green signal; Manrope and Instrument Serif; a compact d/n mark; restrained rules; and direct images of the work. There is no generated hero imagery, scroll hijacking, autoplay, audio, canvas dependency, or animation library.

## What changed

- Entire homepage composition, copy hierarchy, visual identity, typography, and responsive behavior.
- Work-first narrative with a lead case and three editorial entries.
- Four shareable, statically generated case routes with distinct metadata and explicit result scope.
- Problem-led capability disclosures using native HTML details.
- Always-visible inquiry form; preserved Resend notification and auto-reply, now with server validation, safe HTML, explicit failure states, bounded rate limiting, and no false retry prompt after a delivered inquiry.
- Preserved Vercel Analytics, contact address, and original anchors; added sitemap, robots, canonical URLs, and a designed 404.
- Self-hosted, licensed fonts and responsive image delivery. No external font dependency at build or page load.
- Next.js 15.5.25, Resend 6.26.0, and PostCSS 8.5.23. A narrow Next→PostCSS override avoids its older bundled CSS parser while retaining the established framework family and React 18. Runtime npm audit: zero vulnerabilities at verification.

## The one creative-director refinement pass

The critique: the first implementation used too much small supporting text, repeated serif emphasis at too many headings, and ended its central interaction with a title card rather than evidence. The perspective layout could also collide at a wide desktop size.

Executed: raised reading sizes, reduced recurring italic-heading formulas, gave the work feature a distinct editorial serif treatment, made the final study state name deliverables and show scoped launch results, corrected study spacing, tightened mobile composition, and simplified mobile form fields into a single column. No second redesign was undertaken.

## Evidence ledger

All case copy is adapted from existing materials. No new clients, testimonials, awards, revenue, or causal outcomes were invented.

- **Lost Archives:** `context/draper-norwood/proof-notes.md` and original `public/la-results-1.png`. 1.4M+ Facebook views, 11,985 net new Facebook followers, and 93.9% non-follower views are explicitly an early launch-window snapshot, not live totals or controlled attribution. Existing notes record Facebook/YouTube monetization.
- **DCD Madrid:** original `Proof.tsx` and `public/dcd-work.png` / `dcd-results.png`. Campaign direction is described. Global event/platform figures are not presented as DN campaign results.
- **Creator Secrets:** `04-website-proof-public-presence.md` and `public/cs-results.png`. $264K+ is lifetime TikTok Shop GMV, not company revenue or profit; 11.5K+ units and 21.8M+ views are scoped to existing proof. The provisional Snapchat notification is not counted as confirmed income. Original evidence sheets remain available and contain their historical wording.
- **HealthLinks:** original case content and `public/hl-results.png`. The 10,000+ listener claim is attributed to the early-launch case asset. No sales uplift is invented. The unlinked testimonial is not repeated in page copy.
- Broader logo-strip names without documented project scope were removed from the active homepage.

## Asset provenance

The three files in `public/archive/` are copied from existing Draper Norwood Archive to Audience project assets, not generated for this redesign:

- `tapes.webp` ← `lost-archives-umatic-source-recordings.webp`: labeled U-matic videocassettes. The source project's `UmaticSourcePlate.tsx` identifies them as physical source material.
- `newsletter.webp` ← `lost-archives-1954-newsletter-source.webp`: page one of the 1954 News Letter, Walter and Lao Russell, Swannanoa. Mapped by the source project's `EvidenceSourcePlate.tsx`.
- `earthship.webp` ← `lost-archives-earthship-source.webp`: Dennis Weaver and his wife beside a wall of used tires. Mapped as real production material in the source project's `ArchiveReadingStudy.tsx`.

These are presented as client/source and production material. The site makes no ownership claim. Existing original case artworks and result sheets are retained for historical evidence. No Musicbed material or other audio was incorporated.

The Manrope and Instrument Serif files came from Google Fonts; SIL Open Font License texts are bundled beside them.

## Verification and release boundary

- Build and TypeScript checks passed on Next.js 15.5.25; all four case routes prerendered.
- ESLint passed.
- Nine isolated inquiry tests passed: missing configuration, invalid fields, timing, honeypot, escaping and success order, rejected provider response, thrown provider exception, confirmation failure after successful delivery, and rate limiting.
- Browser review covered 1440px desktop, 768px tablet, 390px mobile, and 320px narrow mobile. Reviewed all four case pages, all study states, keyboard tab switching, mobile menu close/focus return, case-to-case navigation, native service expansion, required-field validation, and unavailable-email feedback. Fixed narrow-screen client-name overflow and centered case artwork; rechecked both in the production build. No browser runtime errors were observed in final production checks.
- HTTP checks passed for the homepage, four cases, four evidence images, sitemap and robots; an unknown case returns 404.
- The local environment contains no Resend secret. Live delivery is not claimed: tests mock the provider and send no messages. Existing hosting credentials/settings must remain in the host environment.
- The rate limiter is per instance, not distributed. Analytics collection depends on the existing Vercel project configuration.
- The original site remains recoverable at `checkpoint/pre-redesign-2026-09-07`. Production is not replaced by this work.

## A future dedicated pass

1. Obtain dated analytics exports and source permissions in a compact evidence ledger for every case, especially HealthLinks and commerce.
2. Commission/curate genuine process photography for the non-archive cases so their case pages depend less on older presentation artworks.
3. Add a small, real AI/system example once it has an inspectable demonstration and a publishable client or internal-product story.
4. Evaluate visitor behavior after launch before expanding the homepage interaction or adding more pages.
