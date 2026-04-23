# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Draper Norwood website: A Next.js 14 landing page built with React 18, TypeScript, and Tailwind CSS. Single-page site with multiple sections, responsive typography, and custom design system.

## Key Commands

```bash
npm run dev        # Start local dev server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Run production build locally
npm run lint       # Run ESLint
npm run typecheck  # Check TypeScript types
```

## Architecture

**App structure (Next.js App Router):**
- `/src/app/page.tsx` — Main page that composes sections from components
- `/src/app/layout.tsx` — Root layout with font setup and metadata
- `/src/app/globals.css` — Global styles and custom Tailwind components
- `/src/components/` — Section components (Hero, Header, Services, Footer, etc.)

**Design system:**
- Colors defined in `tailwind.config.ts`: `ink` (text), `paper` (background), `accent` (green #2E5D4B)
- Typography: fluid scaling with `clamp()` (display, h1, h2, h3, eyebrow sizes)
- Fonts: Inter (sans), Fraunces (serif) from Google Fonts with variation settings
- Custom Tailwind utilities in `globals.css`: `.container-dn`, `.btn-primary`, `.btn-secondary`, `.link-quiet`, `.serif-display`, `.rail`, etc.
- Letter-spacing: custom values like `tightest` (-0.035em), `wideCaption` (0.22em)

**Component patterns:**
- Functional components with named exports: `export function ComponentName() { ... }`
- Components are stateless, single-use layout sections
- SVG icons defined inline with `aria-hidden="true"`
- Import components via `@/components/` alias
- Semantic HTML: proper heading hierarchy, section elements, `main` with id

## Naming & Conventions

- PascalCase for component names and exports
- Tailwind classes + inline styles for component-specific styling
- `container-dn` for max-width container with padding
- Button variants: `.btn-primary` (filled dark), `.btn-secondary` (outline)
- Typography: use predefined `.text-display`, `.text-h1`, `.text-h2`, `.text-eyebrow`
- Comments explain design intent ("subliminal brand presence") not what code does
- Use `aria-hidden="true"` for decorative elements (backgrounds, icons)

## Hard Rules — Don't Do These Without Explicit Permission

- **Never change color values** in `tailwind.config.ts` or the color tokens (ink, paper, accent)
- **Never add fixed font sizes** — use predefined Tailwind sizes (display, h1, h2, h3, eyebrow) which use fluid scaling
- **Never modify the homepage component composition** or section structure
- **Never change the navigation structure** or page routing
- **Never alter custom utilities** in `globals.css` (btn-primary, link-quiet, container-dn, etc.)

## Common Pitfalls

- Color values have precise opacity modifiers (e.g., `text-ink/70`) — changing base colors breaks these
- Typography uses `clamp()` for fluid scaling — fixed pixel values break responsiveness
- Letter-spacing is carefully tuned on utilities — don't remove or change without testing all sizes
- The design relies on specific font variation settings for Fraunces (`opsz` and `SOFT`) — don't change
