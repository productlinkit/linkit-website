# Novasite — React rebuild

A faithful **React (Vite)** rebuild of the scraped *Novasite* Webflow portfolio
template. Styling, wording, assets and animations were reconstructed from the
original export so the result matches the source as closely as possible.

## Run it

```bash
cd fixed
npm install
npm run dev      # → http://localhost:5173
```

Production build:

```bash
npm run build    # outputs to dist/
npm run preview
```

## How fidelity was preserved

- **CSS** — the original 104 KB Webflow stylesheet is reused **verbatim**
  (`src/styles/webflow.css`); only the Clashdisplay `@font-face` URLs were
  rewritten to the local `/fonts` copies. All design tokens (colors, type scale,
  spacing, breakpoints) are therefore identical to the source.
- **Fonts** — Clashdisplay (`public/fonts/*.otf`, headings) + Inter Tight
  (Google Fonts, body), exactly as the original.
- **Assets** — all 60 images/SVGs/Lottie were downloaded into `public/assets/`
  (see `src/lib/assets.js` for the original-URL → local-path map). Nothing loads
  from the Webflow CDN anymore.
- **Wording** — copied 1:1 from the original pages (hero, about, work process,
  services, projects, testimonials, awards, contact, CTA, footer, and every
  sub-page).
- **Animations** — the Webflow IX2 interactions + slider/Lenis JS were
  re-implemented with **GSAP ScrollTrigger** + **Lenis** + CSS:
  - Lenis smooth scrolling (same easing/duration as the source)
  - Hero crossfade sliders (background + thumbnail) with synced progress bars and
    ken-burns scale
  - Scroll-reveal text/fade/slide-up animations (`data-reveal` attributes)
  - Infinite marquees (sponsor logos, CTA rows, footer bottom)
  - Sticky work-process + big-image scale, service hover/click dropdowns,
    nav/footer/project hover effects, mobile nav drawer.

## Structure

```
fixed/
├── index.html
├── public/
│   ├── assets/        # 60 downloaded images / svg / lottie
│   └── fonts/         # 6 Clashdisplay weights
└── src/
    ├── main.jsx, App.jsx          # entry + routing
    ├── styles/                    # webflow.css (verbatim) + animations.css
    ├── lib/                       # assets map, images map, Lenis + reveal hooks
    ├── data/projects.js           # project content (extracted from source)
    ├── components/                # Navbar, Footer, CtaSection, Marquee, HeroSection
    └── pages/                     # Home, ProjectDetail, License, Changelog, StyleGuide
```

## Routes

| Path | Page |
|------|------|
| `/` | Home (all sections) |
| `/project/:slug` | Project detail — `vellin-studio`, `ideasprout`, `nexastudio`, `corepoint` |
| `/license` | License |
| `/changelog` | Changelog |
| `/style-guide` | Style Guide |
