---
trigger: always_on
---

# Antigravity — Project Customization (Vellumwire)

This project builds the Vellumwire website — a conversion-focused web design studio based in Curitiba, Brazil, serving US small businesses. Static HTML/CSS/JS, no frameworks, no CMS.

---

## Site Structure

| Page | File | Status |
|------|------|--------|
| Homepage | `index.html` | Done |
| Work | `work.html` | Done |
| Services | `services.html` | Done |
| Packages | `packages.html` | Done |
| Studio | `studio.html` | Done |
| Contact | — | Planned |
| Insights (blog) | — | Planned |
| Case studies | `/work/[slug].html` | Planned |

Shared styles in `assets/css/style.css`. Page-specific styles in inline `<style>` blocks.

---

## Design Tokens — Vellumwire

### Colours
```css
--color-bg-base:      #0c0b09;
--color-bg-raised:    #141310;
--color-bg-surface:   #1c1a17;
--color-bg-overlay:   #242220;
--color-bg-invert:    #f5f2ec;

--color-border-subtle:  rgba(255,255,255,0.06);
--color-border-mid:     rgba(255,255,255,0.12);
--color-border-strong:  rgba(255,255,255,0.22);

--color-text-primary:   #ede9e2;
--color-text-secondary: #8a8680;
--color-text-muted:     #4a4845;

--color-text-inv-primary:   #0c0b09;
--color-text-inv-secondary: #4a4845;

--color-accent:        #c6f135;
--color-accent-hover:  #b0d82e;
--color-accent-dim:    rgba(198,241,53,0.10);
--color-accent-border: rgba(198,241,53,0.22);
```

### Typography
```css
--font-display: 'Instrument Serif', Georgia, serif;   /* Headlines, editorial emphasis */
--font-ui:      'Syne', sans-serif;                     /* Body, nav, buttons, subheads */
--font-mono:    'DM Mono', monospace;                   /* Eyebrows, metadata, tags, counters */
```

### Spacing
```css
--sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px;
--sp-5: 20px; --sp-6: 24px; --sp-8: 32px; --sp-10: 40px;
--sp-12: 48px; --sp-16: 64px; --sp-20: 80px; --sp-24: 96px; --sp-32: 128px;
```

### Other Tokens
```css
--radius-sm: 2px; --radius-md: 4px; --radius-lg: 8px; --radius-pill: 999px;
--shadow-subtle: 0 1px 3px rgba(0,0,0,0.4);
--shadow-mid: 0 4px 16px rgba(0,0,0,0.5);
--max-w: 1200px;
--gutter: 48px;
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```

### Tailwind Config
```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        vw: { base: '#0c0b09', surface: '#1c1a17', accent: '#c6f135',
              accentHov: '#b0d82e', pri: '#ede9e2', sec: '#8a8680',
              mut: '#7a7875', border: 'rgba(255,255,255,0.12)' }
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        ui: ['"Syne"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace']
      }
    }
  }
}
```

---

## HTML Head Template (every page)

```html
<title>[Page] | Vellumwire</title>
<meta name="description" content="[120–155 chars]">
<meta property="og:title" content="[Page] | Vellumwire">
<meta property="og:description" content="[OG description]">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://vellumwire.com/[page]">
<link rel="icon" type="image/svg+xml" href="assets/svg/vellumwire-favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<link rel="stylesheet" href="assets/css/style.css">
```

Title format: `[Page Name] | Vellumwire` — pipe separator, not em-dash.

---

## Brand Voice

**We are:** Direct, proof-led, confident, dry wit, no-bullshit.
**We are not:** Salesy, jargon-heavy, fluffy, corporate, apologetic.
**We sound like:** A senior consultant who's seen enough to cut through noise.
**We never say:** "leverage", "synergy", "world-class", "cutting-edge", "innovative solutions", "reach out", "let's connect".

### Approved Terminology

| ✅ Use | ❌ Don't Use |
|--------|-------------|
| diagnosis | teardown, audit |
| rebuild | redesign |
| site review | conversion audit |
| homepage | home page |
| lead generation | conversion optimization |
| your site | your digital presence |
| calls and leads | conversions |
| what you get | deliverables |
| best for | ideal client profile |

### Eyebrow Labels
DM Mono, uppercase, tracked (0.08–0.18em), accent-coloured. Max 2–4 words. Examples: `THE LEAK`, `HOW IT WORKS`, `OUR PROCESS`.

### Target Audience
US small business owners: law firms, clinics, contractors, local services. They don't know what CRO is. They know they want more phone calls. Write for them, not for designers.

---

## Signature Animations

These are established patterns used across the site. Maintain consistency:

- **Scroll reveals** — `.scroll-reveal` with `.delay-1`, `.delay-2`, `.delay-3`. Fade up 24px, 0.8s ease-out, staggered 0.08s.
- **Marquee strips** — infinite horizontal scroll, pauses on hover, edge-fade gradients on both sides.
- **Text reveal** — word/line-by-line translateY(110%) → 0, staggered delay.
- **Card hover** — grid texture overlay (pseudo `::before`) + colour gradient (pseudo `::after`) + scale.
- **Parallax** — dual-layer: mouse tracking (translate inverse) + scroll (translateY).
- **Timeline progress fill** — accent line fills vertically on scroll, dots activate with glow.
- **Glow border** — spinning conic-gradient on `::before`, inner cover on `::after`.
- **Sheen** — diagonal linear-gradient sweep on hover.
- **Magnetic hover** — nav items and CTAs translate slightly toward cursor position on mousemove.
- **Beam effect** — vertical accent beam travels down grid lines on scroll via `::after` pseudo-element.

---

## Pricing (market-calibrated April 2026)

| Package | Price | Timeline |
|---------|-------|----------|
| Website checkup | $495 flat | 3–5 business days |
| Single page | $1,500–$2,500 | 5–10 business days |
| Homepage redesign | $4,500–$6,500 | 3–4 weeks |
| Full website (≤7 pages) | $8,500–$14,000 | 5–8 weeks |
| Brand + website | $12,000–$20,000 | 8–12 weeks |
| Monthly partner | $1,500–$3,000/mo (3-mo min) | Ongoing |

Terms: 50% upfront, 50% on delivery. One revision round included. Additional at $95/hr.

---

## Case Study Structure

Each case has two layers from one page:

1. **Vellumwire layer** (for prospects): Problem → what changed → result. Short, proof-led, business-focused.
2. **Portfolio layer** (for recruiters): UX decisions, research process, iterations, product thinking, impact.

Files go under `/work/[slug].html`. Same design system, same nav/footer pattern.

---

## Workflow

- Copy decisions and strategy happen in conversation → get encoded into markdown prompts
- Afonso (frontend dev) implements via Claude Code
- When building new pages: match nav, footer, CTA section from existing pages exactly
- Page-specific CSS goes in inline `<style>` blocks; shared styles stay in `style.css`
- Always include JSON-LD structured data per page