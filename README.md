# Draper Norwood website

A Next.js App Router site for Draper Norwood. The September 2026 redesign is on `redesign/stronger-form`; the original site is recoverable at tag `checkpoint/pre-redesign-2026-09-07` (original HEAD e3b5345).

## Run

- `npm ci`
- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — production server
- `npm run typecheck` and `npm run lint`
- `node --test tests/inquiry.test.cjs` — isolated form tests; email provider and headers are mocked, so no email is sent

## Structure

- `src/app/page.tsx`: homepage
- `src/components/Hero.tsx`: keyboard-accessible Material / Perspective / Form study
- `src/app/work/[slug]/page.tsx`: four statically generated case studies
- `src/lib/work.ts`: case copy, metrics, and evidence boundaries
- `src/components/CTASection.tsx`: always-visible inquiry form
- `src/app/actions/sendEmail.ts`: validated server action, Resend notification and confirmation
- `src/app/globals.css`: responsive visual system and reduced-motion behavior
- `src/app/fonts`: self-hosted fonts and OFL licenses
- `docs/RELEASE-NOTES.md`: creative decisions, provenance, and verification

## Email and analytics

Set `RESEND_API_KEY` in the hosting environment to enable delivery. The sender remains `hello@drapernorwood.com`; its domain must be verified in the existing Resend account. No secrets are stored in this repository. Without a key, the form reports that sending is unavailable and the direct email link remains available.

The Vercel Analytics integration is retained. Its collection depends on the existing Vercel project's configuration. The in-memory rate limiter is bounded but per instance; it is not a distributed abuse control.

## Publication

The redesign is prepared separately from the live site. A local build and mocked tests do not prove live email deliverability. Verify the existing host environment and perform a separately authorized real delivery check before replacing production.

Canonical URLs use `https://www.drapernorwood.com`, matching the existing public site's redirect. Homepage anchors `#home`, `#work`, `#about`, `#services`, and `#contact` remain available. All case routes have their own metadata and appear in the sitemap.
