# Vellumwire — Design System Reference

**Status:** real, reverse-engineered from production CSS (not a proposal).
**Source of truth:** `assets/css/style.css` (1313 lines), `assets/css/tailwind.css` (compiled Tailwind output), live markup in `index.html`, `packages.html`, `contact.html`, `work.html`.
**Read this file at the start of every dev session before touching CSS, HTML, or JS on this site.**

> **Note on `assets/design system/vellumwire-design-system.html`:** that file is a self-contained showcase page (dated "v1.0 April 2026") proposing a richer token system (`--color-bg-base/raised/surface/overlay`, `--text-xs`...`--text-7xl`, `--sp-1`...`--sp-16`). None of those token names exist in the live CSS — it was never wired into production. Do not reference its variable names in real code. If a future redesign adopts it, this file must be rewritten first.

---

## 1. Project overview

Vellumwire is a one-person/small-studio web design service selling conversion-focused websites to service businesses (B2B SaaS, legal/professional services, technical platforms). The site itself is the flagship example of the product: dark, editorial, direct about pricing, allergic to generic SaaS visual language. Every design decision below exists to differentiate from the all-light-theme, navy/blue-accent competitor landscape (Apexure, Gravitate Design, Agência Unit, UpSites — confirmed in market research).

Stack: static HTML pages, Tailwind CSS (compiled to `assets/css/tailwind.css`) for layout/utility classes, a hand-written `assets/css/style.css` for all custom components, animations, and brand-specific effects. No JS framework — vanilla JS (`assets/js/menu.js`, inline `<script>` blocks per page) for interactivity.

---

## 2. Color tokens

### 2.1 Root variables (style.css `:root`, confirmed lines 1-10)

```css
:root {
  --color-accent: #c6f135;
  --color-bg: #0c0b09;
  --color-surface: #1c1a17;
  --color-text-pri: #ede9e2;
  --color-text-sec: #8a8680;
  --color-border: rgba(255, 255, 255, 0.12);
  --ease-editorial: cubic-bezier(0.25, 1, 0.5, 1);
}
```

### 2.2 Naming convention going forward

The live file only has 6 root tokens (4-tier convention not yet adopted in production). For any **new** token added during future work, follow this convention so the system stays sortable and unambiguous:

- `--core-color-base-[name]` — raw, ungrouped values (rarely needed; most colors already group into palette/brand/semantic below)
- `--palette-color-[hue]-[shade]` — e.g. `--palette-color-lime-500` if a tonal ramp of the accent is ever needed
- `--brand-color-[concept]-[shade]` — e.g. `--brand-color-accent`, `--brand-color-bg`, `--brand-color-surface` (maps to the existing `--color-*` tokens; don't rename the existing ones, just follow this pattern for additions)
- `--semantic-color-[category]-[element]-[state]` — e.g. `--semantic-color-form-error-text`, `--semantic-color-button-primary-hover`

Do not rename `--color-accent`, `--color-bg`, `--color-surface`, `--color-text-pri`, `--color-text-sec`, or `--color-border` — they are referenced throughout `style.css` and inline styles across every page.

### 2.3 Color usage table

| Token / value | Hex / value | Usage |
|---|---|---|
| `--color-bg` | `#0c0b09` | Page background. Warm near-black, never cold/blue-black. |
| `#0f0e0c` | `#0f0e0c` | `.vw-service-card` resting background (not tokenized in source) |
| `#151412` | `#151412` | `.vw-service-card` hover background (not tokenized) |
| `#0a0908` | `#0a0908` | Footer background (inline Tailwind arbitrary value, not tokenized) |
| `--color-surface` | `#1c1a17` | Cards, panels, raised sections. |
| `--color-text-pri` | `#ede9e2` | Headlines, primary body text. |
| `--color-text-sec` | `#8a8680` | Captions, secondary copy, muted labels. |
| `--color-border` | `rgba(255,255,255,0.12)` | Default dividers, ghost-button borders. |
| `rgba(255,255,255,0.08)` | — | Lighter border variant, used on `.vw-service-card`, `.pkg-card` |
| `rgba(255,255,255,0.15)` | — | `.btn--sweep`, `.carousel-btn` borders |
| `rgba(255,255,255,0.05)`/`0.06` | — | Disabled/hairline borders |
| `--color-accent` | `#c6f135` | CTAs, links, eyebrows, hover accents, the mark. Single accent — no secondary brand color exists or should be added. |
| `rgba(198,241,53,0.015)` to `0.5` | — | Accent used at varying opacity for hover backgrounds, glows, tag fills — see component sections below for exact values per component. |
| Success (inline JS only) | `#c6f135` | `contact.html` form success message color — reuses the accent token value directly, not a separate semantic token. |
| Error (inline JS only) | `#ff6b6b` | `contact.html` form error message color. **This is the only "danger" color anywhere in the codebase** — it has no CSS variable, defined ad hoc inline at `contact.html` line 437. If you need a danger color elsewhere, reuse this exact hex; don't invent a new red. |

`[DATA NEEDED: warning/info status colors]` — none exist anywhere in the codebase. If a feature needs them, this is a real gap, not an oversight to silently fill — flag it before inventing a hex value.

---

## 3. Typography

### 3.1 Font stack (confirmed via Google Fonts link, index.html lines 67/69, and `tailwind.css` font-role classes)

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
```

| Role | Font | Tailwind class | Weights loaded |
|---|---|---|---|
| Display | Instrument Serif | `.font-display` | 400, 400 italic |
| UI / Body | Syne | `.font-ui` | 400, 500, 600, 700 |
| Mono / Labels | DM Mono | `.font-mono` | 400, 500, 400 italic |

Compiled rules (`tailwind.css`):
```css
.font-display{font-family:"Instrument Serif",serif}
.font-ui{font-family:Syne,sans-serif}
.font-mono{font-family:DM Mono,monospace}
```

### 3.2 Role rules

- **Display (Instrument Serif):** hero H1, section H2, card titles. Italic spans (`<em>`) used for emphasis only, always colored with `--color-accent`. Never bold — the serif's weight axis isn't used for emphasis, italic is.
- **UI/Body (Syne):** navigation, body copy, buttons, form labels. Body text sizes 15-18px, line-height 1.7-1.75.
- **Mono (DM Mono):** eyebrows, stat callouts, prices, footer legal links, button labels. Always uppercase, always letter-spaced. Confirmed pattern from `.eyebrow` (style.css lines 141-148): `font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #c6f135;` and `.eyebrow-sub`: same but `letter-spacing: 0.16em; color: #8a8680;`. Button label pattern (`.btn`, line 163-178): `font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;`.

### 3.3 Hero H1 — real implementation

No `clamp()` on the hero H1. Tailwind responsive classes instead (index.html line 177):
```html
class="font-display text-vw-pri text-5xl md:text-7xl italic tracking-tight leading-[1.05] mb-3 md:mb-5"
```
`text-5xl` = 48px, `text-7xl` = 72px (Tailwind defaults), `leading-[1.05]` overrides default line-height.

### 3.4 Other sizes confirmed in use (no unified scale token exists — sizes are set per-component)

| Context | Size | Source |
|---|---|---|
| Eyebrow / mono label | 12px (was 10-11px — bumped sitewide, see anti-pattern §17.10) | style.css `.eyebrow`, `.eyebrow-sub` |
| Body copy | 15-16px | body default + `.specimen-body` patterns site-wide |
| Form input text | 18px (`text-lg`) | contact.html:~150 |
| Card titles | 22-30px | `.vw-service-card`, `.pkg-card` headings |
| Section H2 | clamp range varies by section, see hero note — check the specific section's class before assuming a global clamp exists |

`[DATA NEEDED: unified type scale]` — there is no single `--text-*` variable scale in production. Sizes are set ad hoc per component via Tailwind utility classes or literal `px` values in `style.css`. Do not invent a scale; set sizes consistent with the nearest existing analogous component instead.

---

## 4. Spacing

No `--spacing-*` custom properties exist. The scale is Tailwind's default (`rem`-based, 4px increments), applied via recurring utility patterns:

| Pattern | Resolves to | Where used |
|---|---|---|
| `py-12 lg:py-24` | 3rem / 6rem | Section vertical rhythm — `#services`, `#work`, FAQ/contact inner containers |
| `px-6 lg:px-12` | 1.5rem / 3rem | FAQ/contact horizontal padding |
| `px-6 md:px-12 lg:px-16` | 1.5rem/3rem/4rem | Nav, hero content, footer |
| `gap-6` | 1.5rem | CTA group spacing (hero) |

Hand-written component padding (style.css, literal px, not tokenized):
```css
.btn { padding: 16px 32px; }          /* line 173 */
.btn-glow { padding: 18px 36px; }     /* line 350 */
.leak-card { padding: 32px 0; }       /* line 398 */
.vw-project-content { padding: 24px 0; } /* line 967 */
.leak-row { padding: 28px 8px; }      /* line 1267 */
.faq-demo-q { padding: 28px 0; }      /* line 1152 */
```
`packages.html` inline: `.pkg-feature { padding: 14px 0; }`

When adding new spacing, match the nearest existing pattern (Tailwind utility for layout-level spacing, literal px in a `<style>` block only for component-internal spacing that mirrors an existing component like `.btn`/`.leak-card`).

---

## 5. Border radius

The site is **intentionally near-brutalist on radius** — most interactive elements are square.

```css
.btn, .btn-wrapper-glow      { border-radius: 4px; }   /* the only "soft" radius on interactive elements */
.btn-wrapper-glow::after     { border-radius: 6px; }   /* glow ring, -2px inset */
.btn-glow                    { border-radius: 0; }
.vw-card-arrow               { border-radius: 0; }
.carousel-btn, .carousel-dot { border-radius: 0; }
.vw-project-tag              { border-radius: 0; }
.faq-toggle-icon             { border-radius: 0; }
.ambient-blur                { border-radius: 50%; }   /* the one circular shape — the ambient glow orb */
```
Several of these have inline source comments calling out "brutalist square, no rounding" — this is a deliberate brand decision, not an oversight. **Do not add `border-radius` to new buttons, tags, or icon boxes without a specific reason** — square is the default; round is the exception (`.btn`/glow-ring only).

Tailwind radius utilities (`rounded-sm` = 2px) appear only on the nav language-switcher link. `rounded-full`/`rounded-xl` exist in the compiled Tailwind output but aren't used in any of the core pages checked — don't assume they're an established pattern.

---

## 6. Shadows & effects

### 6.1 Box-shadow (only three real declarations in the entire codebase)

```css
.btn-glow:hover {
  box-shadow: inset 0 0 24px rgba(198, 241, 53, 0.05), 0 0 24px rgba(198, 241, 53, 0.1);
}
.vw-project-card:hover .vw-project-tag {
  box-shadow: 0 0 12px rgba(198, 241, 53, 0.2);
}
/* packages.html inline, .pkg-card:hover */
box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 80px rgba(198,241,53,0.06), inset 0 1px 0 rgba(255,255,255,0.06);
```
Pattern: shadows are always accent-tinted glow (`rgba(198,241,53,*)`) on hover, layered with a black drop-shadow for depth where the element floats above content (cards), never a generic gray shadow.

### 6.2 Backdrop blur

```css
.nav-blur { backdrop-filter: blur(10px); background: rgb(0 0 0 / 30%); }
/* packages.html inline */
.pkg-card    { backdrop-filter: blur(24px); }
.addon-pill  { backdrop-filter: blur(12px); }
```

### 6.3 Filter blur (ambient/reveal effects)

```css
.ambient-blur  { filter: blur(80px); }   /* large background glow orb */
.reveal-up     { filter: blur(4px); }    /* animates to blur(0) */
.scroll-reveal { filter: blur(8px); }    /* animates to blur(0px) */
```

### 6.4 Noise overlay (exact SVG data-URI, style.css lines 65-71)

```css
.ambient-noise {
  position: fixed; inset: 0; z-index: -1; opacity: 0.15; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```
A second instance exists in `assets/js/menu.js` (injected at runtime, line 155) for the mobile menu overlay: same `feTurbulence` technique, `baseFrequency='0.85'`, `opacity: 0.035`.

### 6.5 Image filters

```css
.vw-card-media-img    { filter: grayscale(100%); }
.vw-project-media-img { filter: grayscale(100%) contrast(1.1); }
.process-media-img    { filter: grayscale(100%) contrast(1.1); }
```
Pattern: all project/work imagery ships grayscale by default, color is revealed on hover via a separate transition (see Cards section) — this is a deliberate "editorial photo essay" visual rule. Apply it to any new image-based card.

---

## 7. Animations & transitions

### 7.1 Easing values in use

| Variable / value | Used for |
|---|---|
| `var(--ease-editorial)` = `cubic-bezier(0.25, 1, 0.5, 1)` | Dominant easing — hovers, transforms, button sweeps. Default choice for any new transition. |
| `cubic-bezier(0.22, 1, 0.36, 1)` | Scroll-reveal only |
| `cubic-bezier(0.76, 0, 0.24, 1)` | Mobile menu overlay (`menu.js`) only |
| `ease-out` | Generic grid/glow card hover effects |

### 7.2 Scroll-reveal system (the site's primary entrance animation — use this for any new section)

```css
.scroll-reveal {
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1),
              transform 1.2s cubic-bezier(0.22, 1, 0.36, 1),
              filter 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  filter: blur(8px);
  transform: translateY(32px) scale(0.98);
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
}
.delay-1 { transition-delay: 0.15s; }
.delay-2 { transition-delay: 0.30s; }
.delay-3 { transition-delay: 0.45s; }
.delay-4 { transition-delay: 0.60s; }
```

A second, separate stagger system exists for raw CSS `animation-delay` (used by elements whose entrance is a keyframe `animation`, not a `transition` — e.g. items inside `.reveal-up` groups). Do not confuse it with `.delay-1`–`.delay-4` above, which set `transition-delay` and drive a different effect.

```css
.adelay-100 { animation-delay: 0.1s; }
.adelay-200 { animation-delay: 0.2s; }
.adelay-350 { animation-delay: 0.35s; }
.adelay-400 { animation-delay: 0.4s; }
.adelay-450 { animation-delay: 0.45s; }
.adelay-500 { animation-delay: 0.5s; }
.adelay-550 { animation-delay: 0.55s; }
.adelay-600 { animation-delay: 0.6s; }
```
If a new section needs a stagger delay not in this list, add the class next to these in `style.css` rather than writing `style="animation-delay:..."` inline — these exist specifically to replace 56 inline occurrences of this pattern.

JS that drives it (the exact pattern used site-wide — reuse this verbatim for new sections, do not write a new observer):
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
```

### 7.3 Keyframes catalog

```css
@keyframes breathe {
  0%   { transform: scale(1);   opacity: 0.4; }
  100% { transform: scale(1.1); opacity: 0.8; }
}
/* .ambient-blur { animation: breathe 12s var(--ease-editorial) infinite alternate; } */

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
/* .animate-marquee { animation: marquee 30s linear infinite; } */

@keyframes glow-spin {
  from { --border-angle: 0deg; }
  to   { --border-angle: 360deg; }
}
/* .btn-wrapper-glow::after { animation: glow-spin 2.5s linear infinite; } */

@keyframes ken-burns {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.08) translate(-1%, 0.5%); }
  100% { transform: scale(1); }
}
/* .cta-bg-img { animation: ken-burns 18s ease-in-out infinite; } */

@keyframes vignette-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.88; }
}
/* .cta-vignette { animation: vignette-pulse 6s ease-in-out infinite; } */
```
`marquee-fwd`/`marquee-rev` exist for the bidirectional logo/case-study marquee (`.marquee-track.fwd` 32s, `.rev` 28s, both `linear infinite`).

### 7.4 Hover transform patterns (reuse these, don't invent new motion language)

```css
.btn--ghost:hover { transform: translateX(2px); }
.leak-row:hover .leak-icon { transform: translateX(4px); }
.leak-icon (on hover) { transform: scale(1.15) rotate(-5deg); }
.carousel-dot.active { transform: scale(1.5); }
.vw-service-card:hover .vw-card-grid-base { transform: scale(1.04); }
.vw-project-card:hover .vw-project-media-img { transform: scale(1.05); }
.faq-demo.is-open .faq-toggle-icon { transform: rotate(45deg); }
```

### 7.5 Sticky-scroll process section (second IntersectionObserver pattern, index.html lines 1369-1379)

```js
{ rootMargin: '-35% 0px -55% 0px', threshold: 0 }
```
Toggles `.is-active` on `.process-step`/`.process-media-item` and updates a progress-bar height. Use this exact `rootMargin` if building another scroll-driven "active step" section — it's tuned for this layout, don't guess a new value.

---

## 8. Layout system

- Grid/flex mix: most sections use Tailwind flex utilities, not CSS grid, except where a true grid is semantically right (footer link columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-12`).
- Breakpoints (Tailwind defaults, confirmed in compiled `tailwind.css`, no override): `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.
- Bespoke `@media` breakpoints in `style.css` itself (separate from Tailwind, used for the ambient-blur orb and a `.hero-right-col` rule): `768px`, `1024px`, `1440px` (UHD desktop tier — line 302). `menu.js` has its own `768px`/`1024px`/`640px` queries for mobile-menu padding.
- Container pattern: `px-6 md:px-12 lg:px-16` is the standard horizontal page padding — use it for any new full-width section unless the section has a documented reason to differ (e.g. footer's `xl:pl-[144px]`).

---

## 9. Navigation

```css
.nav-blur {
  background: rgb(0 0 0 / 30%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
```
```html
<nav class="nav-blur fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 h-24 flex items-center justify-between">
```
Fixed, full-width, `h-24` (96px), `z-50`. Logo is an inline SVG, `h-6` (24px), fill-color swaps from `--color-text-pri` to `--color-accent` on hover via `group-hover:fill-vw-accent transition-colors`.

Mobile menu lives entirely in `assets/js/menu.js`, not `style.css`:
- Hamburger: 3 spans (`w-6`/`w-8`/`w-4`, each `h-[1.5px]`), morph to X on open (rotate ±45deg, middle span fades/collapses).
- Overlay: full-screen, `clip-path: inset(0 0 100% 0)` closed → `inset(0 0 0% 0)` open, `transition: clip-path 0.75s cubic-bezier(0.76, 0, 0.24, 1)`, toggled via `body.menu-open`.
- Link reveal: `translateY(110%)` → `translateY(0)`, staggered `transition-delay` in 0.08s increments per `li:nth-child`.

Do not rebuild the mobile menu inline in a page's `<script>` — extend `menu.js` instead, since every page shares it.

---

## 10. Hero section

```html
<main id="hero-section" class="hero-section w-full min-h-screen relative flex items-end justify-center overflow-hidden pb-8 lg:pb-12 pt-[100px] lg:pt-[140px] bg-black">
  <div id="hero-content" class="relative z-20 w-full flex flex-col xl:flex-row items-end justify-between px-6 md:px-12 lg:px-16 mx-auto gap-6 xl:gap-8">
```
Flex layout (column on mobile, row at `xl:`) — **not** CSS grid. Left side: wordmark/H1, `flex-1`. Right side: info block, `xl:w-[640px]`.

H1 class pattern:
```html
class="font-display text-vw-pri text-5xl md:text-7xl italic tracking-tight leading-[1.05] mb-3 md:mb-5"
```

Eyebrow above H1:
```css
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: 'DM Mono', monospace; font-size: 10px;
  letter-spacing: 0.2em; text-transform: uppercase; color: #c6f135;
}
```

CTA group: `flex flex-wrap items-center justify-center sm:justify-start gap-6` — primary glow button + a plain text "or keep scrolling" link, never two competing primary buttons.

---

## 11. Buttons

Four distinct button systems exist — use the right one for the right context, don't blend them.

```css
/* .btn — base, mono label, the workhorse */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: 'DM Mono', monospace; font-weight: 500; font-size: 11px;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 16px 32px; border-radius: 4px;
  transition: all 0.4s var(--ease-editorial); cursor: pointer; outline: none;
}

/* .btn--sweep — light-sweep hover, pairs with .btn */
.btn--sweep {
  background: transparent; border: 1px solid rgba(255,255,255,0.15);
}
.btn--sweep:hover { border-color: rgba(255,255,255,0.4); color: #fff; }
/* ::before pseudo-element: skewX(-25deg) gradient, left: -150% -> 150% on hover, transition: left 0.6s cubic-bezier(0.25,1,0.5,1) */

/* .btn--ghost — minimal, for secondary/tertiary actions */
.btn--ghost { background: transparent; border: transparent; }
.btn--ghost:hover { color: var(--color-accent); transform: translateX(2px); }

/* .btn-wrapper-glow — animated conic-gradient ring, wraps the primary hero CTA */
/* uses @property --border-angle + ::after pseudo-element, mask-composite: exclude, animation: glow-spin 2.5s linear infinite */

/* .btn-glow — second, heavier button system used in CTA-banner contexts */
.btn-glow {
  padding: 18px 36px; border: 1px solid var(--color-border);
  font-family: var(--font-ui); font-size: 13px; border-radius: 0;
}
.btn-glow:hover {
  border-color: var(--color-accent); color: var(--color-accent);
  box-shadow: inset 0 0 24px rgba(198,241,53,0.05), 0 0 24px rgba(198,241,53,0.1);
}
/* has a ::before fill-sweep: scaleX(0) -> scaleX(1), transform-origin right->left, opacity 0.05, 0.5s var(--ease-editorial) */

/* .carousel-btn — 48x48 square icon button for the work carousel */
.carousel-btn { /* 48px square, border-radius:0, transparent, border: 1px solid rgba(255,255,255,0.15) */ }
.carousel-btn:hover { /* solid accent bg, dark text */ }
.carousel-btn:disabled { opacity: 0.3; cursor: not-allowed; border-color: rgba(255,255,255,0.05); }
```

Real composition example (the hero primary CTA, index.html line 180-181):
```html
<div class="btn-wrapper-glow">
  <a href="contact.html" class="btn btn--sweep bg-vw-accent text-vw-base hover:!text-vw-base" style="padding: 12px 24px; border: none;">
    Book a teardown →
  </a>
</div>
```
`.btn` + `.btn--sweep` classes combined with Tailwind color utilities, wrapped in the glow ring, with an inline padding override for this specific instance. This compositional pattern (base class + modifier class + Tailwind color + occasional inline override) is the established way to build a new button — don't write a fifth button system.

---

## 12. Cards

Three card families, each with a distinct visual signature:

**`.leak-card`** (problem/diagnosis list items) — `grid: 48px 1fr`, `gap: 24px`, `padding: 32px 0`, `border-bottom: var(--color-border)`. Hover: `padding-left: 16px; background: rgba(198,241,53,0.015); border-color: rgba(198,241,53,0.22);` plus a `::before` gradient sweep fade-in.

**`.vw-service-card`** (services grid) — `background-color: #0f0e0c; border: 1px solid rgba(255,255,255,0.08);`. Hover: `background-color: #151412; border-color: rgba(198,241,53,0.5);`. Layered pseudo-elements: `.vw-card-grid-base`/`.vw-card-grid-hover` (24px grid-pattern crossfade), `.vw-card-glow` (135deg gradient fade-in), `.vw-card-bar` (2px bottom accent bar, `scaleX(0)→1`), `.vw-card-arrow` (32×32 square icon box, `border-radius: 0`), `.vw-card-media` (21:9 image area, grayscale-to-color hover with accent multiply overlay).

**`.vw-project-card`** (work/case-study carousel) — `min-width: 85vw` mobile, `420px` at `md:`. `.vw-project-media` is 4:3 with grayscale image; accent-colored corner brackets (`.vw-project-c-tl`/`.vw-project-c-br`, 12×12px) animate in from an offset on hover. `.vw-project-tag` chips: `border: 1px solid rgba(198,241,53,0.4); border-radius: 0; padding: 6px 10px;` → solid accent bg + `box-shadow: 0 0 12px rgba(198,241,53,0.2)` on card hover.

**`.pkg-card`** (pricing tiers, packages.html-local, not in style.css) — `background: rgba(15,14,12,0.85); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.08);`. Hover adds the 3-layer shadow from §6.1 plus `border-color: rgba(198,241,53,0.4)`. `.featured` variant: `border-color: rgba(198,241,53,0.25); background: rgba(18,17,14,0.9);` with `.pkg-card-bar` pre-activated at `opacity: 0.4`.

When building a new card type, pick the closest existing family by content type (list item → `.leak-card` pattern; grid tile with media → `.vw-service-card`; carousel item → `.vw-project-card`; pricing/plan → `.pkg-card`) rather than inventing a fifth pattern.

---

## 13. Feature sections

No dedicated "feature section" component class exists — sections are composed from the layout primitives in §8 plus the card families in §12. A typical feature section is: eyebrow (mono) → H2 (display, optionally with italic accent span) → optional sub-copy (Syne, max-width constrained) → grid/flex of cards, with `.scroll-reveal` + staggered `.delay-1`...`.delay-4` on each child for the entrance animation. Follow this composition for new sections rather than introducing a new section wrapper class.

---

## 14. Typography components

- **Eyebrow:** `.eyebrow` (accent color, 10px mono) + `.eyebrow-sub` (muted color, same size) — always paired, eyebrow first.
- **Italic emphasis span:** `<em>` inside an Instrument Serif headline, colored `var(--color-accent)` (or the Tailwind equivalent `text-vw-accent`). Reserve for the single word/phrase that carries the sentence's turn — never decorative.
- **Stat/number callout:** DM Mono, uppercase, letter-spaced — used for prices, percentages, counts. Never set a number in Syne if it's meant to read as a measured fact.

---

## 15. Forms

No dedicated form CSS class block exists in `style.css` — forms are built entirely from Tailwind utilities (contact.html):
```html
<label class="font-mono text-[10px] uppercase tracking-[0.2em] text-vw-mut block mb-3">Name</label>
<input class="w-full bg-transparent border-b border-vw-border py-3 text-vw-pri placeholder-vw-mut focus:border-vw-accent focus:outline-none transition-colors text-lg">
```
Pattern: transparent background, **bottom-border only** (`border-b`), `--color-border` resting, swaps to `--color-accent` on focus. `text-lg` (18px), `py-3` (12px vertical padding). Textarea: same pattern + `resize-none`, `rows="5"`.

No `.error`/`.is-invalid` class exists. Feedback is a single message element with inline JS-set color:
```js
// success
messageEl.style.color = '#c6f135';
messageEl.textContent = "Message sent! We'll get back to you soon.";
// error
messageEl.style.color = '#ff6b6b';
messageEl.textContent = 'Error sending message. Please try again.';
```
Reuse this exact pattern (inline color + textContent swap on a shared message element) for any new form — don't build a toast/alert component for this.

---

## 16. Footer

Mostly Tailwind-utility-built. A handful of repeated values that used to be inline `style=""` on every page were extracted into real utility classes in `style.css` (Step 5 dev audit) — use these classes for any new footer-adjacent markup, don't reintroduce the inline version:
```html
<footer id="footer" class="relative overflow-hidden bg-[#0a0908] footer-top-border">
```
- `.footer-top-border` = `border-top: 1px solid rgba(255,255,255,0.08);`
- `.footer-legal-border` = `border-top: 1px solid rgba(255,255,255,0.06); padding: 20px clamp(24px,4vw,80px);` (bottom legal bar)
- `.wordmark-block` = `padding: 0; margin-bottom: -2px;` (wrapper around the giant background wordmark SVG)
- `.fill-inherit` = `fill: inherit;` (on the wordmark SVG's `<polygon>` children)
- `.link-reset` = `text-decoration: none; color: inherit;` (used on card-as-link wrappers, e.g. work/project cards)
- `.text-muted-inline` = `color: var(--color-text-sec);` (`#8a8680`) — replaces 3 different off-token grays (`#7a7875`, `#555250`, `#4a4845`) that had drifted across the footer and a case-study footnote and failed WCAG contrast (as low as 2.16:1 against the real background). All three were unified to the real, contrast-passing `--color-text-sec` token. **Do not reintroduce a one-off gray hex for muted text — use this token/class.**
- Link grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-12`, inside `px-6 md:px-12 lg:px-16 xl:pl-[144px] pt-20 pb-16`. Brand column `lg:col-span-4 xl:col-span-5`; link columns `lg:col-span-2`; contact column `lg:col-span-4 xl:col-span-3`.
- Link style: `font-ui text-sm text-vw-sec hover:text-vw-accent transition-colors duration-300`.
- Giant background wordmark SVG: `color: rgba(255,255,255,0.07)`, masked with `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)`.
- Legal links: `font-mono text-[12px] uppercase tracking-[0.14em] hover:text-vw-accent` (bumped from `text-[10px]` — see anti-pattern §17.10).

---

## 17. Anti-patterns — do not do these

1. **Do not add `border-radius` to buttons, tags, or icon boxes by default.** The system is intentionally square (§5). Round is the rare exception (`.btn`, glow ring), not the rule.
2. **Do not invent a new red/warning/success color.** Only `#ff6b6b` (error) and the accent `#c6f135` (success) exist, both inline-only in `contact.html`. Reuse these exact hexes; flag a real gap with `[DATA NEEDED: ...]` instead of guessing a new one.
3. **Do not use a generic gray `box-shadow`.** Every real shadow in the codebase is accent-tinted (`rgba(198,241,53,*)`) layered with a black depth shadow. A gray shadow breaks the brand's visual language immediately.
4. **Do not introduce a second accent color.** One accent, used sparingly, is the entire point (confirmed in the showcase file's own framing: "Five tokens. No more."). A second brand color dilutes the signal.
5. **Do not reference token names from `assets/design system/vellumwire-design-system.html`** (`--color-bg-base`, `--text-xs`, `--sp-1`, etc.) in real CSS — they don't exist in production. See the note at the top of this document.
6. **Do not ship a color image in a project/work card without grayscale-by-default.** `.vw-card-media-img`, `.vw-project-media-img`, `.process-media-img` are all `grayscale(100%)` at rest, reveal color on hover — this is a deliberate, consistent rule, not a one-off.
7. **Do not write a new IntersectionObserver for entrance animations.** Reuse the exact `.scroll-reveal` + `is-visible` pattern and observer config from §7.2.
8. **Do not center body copy** outside of hero quotes. Confirmed alignment rule across the site: left-aligned by default.
9. **Do not skip the `?service=` query param convention on CTA links.** Every CTA site-wide must use one of the canonical slugs that exist as real `<option>` values in `contact.html`'s service dropdown: `free-diagnosis`, `website-checkup`, `landing-page`, `homepage-redesign`, `full-website`, `brand-website`, `hold`, `build`, `not-sure`. A param that doesn't match one of these silently fails to preselect anything (see `contact.html`'s pre-select script, which only acts `if` the value matches a `data-value` in the dropdown) — it does not error, it just does nothing, so this class of bug is easy to ship unnoticed. When adding a new tier, page, or CTA: add a matching `<option>` (both `contact.html` and `pt-br/contact.html`) in the same change as the link, never the link alone.
10. **Do not set any `font-size` below 12px**, in Tailwind (`text-[Npx]`) or raw CSS. This was a real, sitewide violation (588 occurrences fixed in the Step 5 dev audit, including the main `.btn` class at 11px) — WCAG and the method's own dev checklist both treat anything under 12px as a hard floor, with no exception for mono/eyebrow/label text. The smallest real text size on the site is now exactly `12px`.
11. **Do not write a new `style="..."` for a value that already exists as a utility class.** Before adding an inline style, check `style.css` (search for the property) and §7.2/§16 above — `.text-muted-inline`, `.fill-inherit`, `.link-reset`, `.footer-top-border`, `.footer-legal-border`, `.wordmark-block`, and `.adelay-100`–`.adelay-600` exist specifically to stop this pattern from regenerating. ~330 of an original 842 inline `style=""` occurrences were extracted this way; the remaining ones are genuinely per-element (specific gradients, pixel positions) and were left as-is rather than forced into premature abstractions.
12. **Do not ship a page missing `og:url`, `twitter:title`, or `twitter:description`.** All three were sitewide gaps (confirmed 0/22 pages) until the Step 5 dev audit added them, mirrored from the real `<link rel="canonical">` and `og:title`/`og:description` values already on each page. Any new page must include all three from the start — copy the pattern from `index.html`'s `<head>`, don't hand-roll it.

---

## 18. Page-specific notes

- **`index.html`:** owns the primary `IntersectionObserver` scroll-reveal wiring (§7.2) and the secondary sticky-scroll "process" observer (§7.5). Any new page that wants scroll-reveal needs its own copy of the observer script — it is not currently factored into a shared JS file.
- **`packages.html`:** has its own `<style>` block for `.pkg-card`/`.addon-pill` — these are page-local, not in `style.css`. The 5 project tiers render from a `pricingData` JS array into `#pricing-root`; the separate "After Launch" Hold/Build section is static markup. Keep these two pricing structures visually distinct but stylistically consistent (same card family conventions from §12) if either is touched.
- **`contact.html`:** is the only page with real form styling and the only place the error/success colors are defined — treat it as the canonical reference for any new form.
- **`work.html`:** uses the `.vw-project-card` carousel family; corner-bracket hover detail (§12) is specific to this page's cards.
- **Mobile menu (`assets/js/menu.js`):** shared across all pages via a single script include — never duplicate its logic inline in a page.
