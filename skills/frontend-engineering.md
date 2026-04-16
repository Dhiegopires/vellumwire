# Frontend Engineering — Deep Reference

## Table of Contents
1. Advanced CSS Architecture
2. Animation & Motion Deep-Dive
3. 3D & WebGL
4. Scroll-Driven Effects
5. Performance Optimization
6. Component Architecture
7. Progressive Enhancement
8. Advanced Layout Patterns
9. Image & Media Strategy
10. Font Loading Strategy

---

## 1. Advanced CSS Architecture

### Custom Properties Architecture

Use layered custom properties for flexibility:

```css
:root {
  /* Primitive tokens */
  --gray-900: #0c0b09;
  --gray-100: #f5f2ec;
  --lime-400: #c6f135;

  /* Semantic tokens */
  --color-bg: var(--gray-900);
  --color-text: var(--gray-100);
  --color-accent: var(--lime-400);

  /* Component tokens */
  --btn-bg: var(--color-accent);
  --btn-text: var(--color-bg);
  --card-bg: color-mix(in srgb, var(--color-bg) 85%, white);
}

/* Theme switch = change semantic tokens only */
[data-theme="light"] {
  --color-bg: var(--gray-100);
  --color-text: var(--gray-900);
}
```

### Cascade Layers

Control specificity without hacks:

```css
@layer reset, base, components, utilities;

@layer reset { *, *::before, *::after { box-sizing: border-box; margin: 0; } }
@layer base { body { font-family: var(--font-body); } }
@layer components { .btn { /* ... */ } }
@layer utilities { .sr-only { /* ... */ } }
```

### Container Queries

Build truly responsive components (not just responsive pages):

```css
.card-wrapper { container-type: inline-size; container-name: card; }

@container card (min-width: 500px) {
  .card { display: grid; grid-template-columns: 200px 1fr; }
}
@container card (max-width: 499px) {
  .card { display: flex; flex-direction: column; }
}
```

### The `:has()` Selector

Parent selection — changes everything:

```css
/* Card with an image gets different padding */
.card:has(img) { padding-top: 0; }

/* Form group with invalid input gets error styling */
.form-group:has(:invalid) { border-color: var(--color-error); }

/* Nav changes when a dropdown is open */
nav:has(.dropdown[open]) { background: var(--color-bg-overlay); }
```

---

## 2. Animation & Motion Deep-Dive

### The FLIP Technique

For high-performance layout animations (position/size changes):

```js
// First: record initial position
const first = el.getBoundingClientRect();

// Last: apply the final state
el.classList.add('expanded');
const last = el.getBoundingClientRect();

// Invert: calculate the difference and apply inverse transform
const dx = first.left - last.left;
const dy = first.top - last.top;
const dw = first.width / last.width;
const dh = first.height / last.height;

el.style.transform = `translate(${dx}px, ${dy}px) scale(${dw}, ${dh})`;
el.style.transformOrigin = 'top left';

// Play: animate to identity transform
requestAnimationFrame(() => {
  el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
  el.style.transform = 'none';
});
```

### Scroll-Driven Animations (CSS Native)

```css
/* Progress bar that fills as you scroll */
.progress-bar {
  animation: fill-bar linear;
  animation-timeline: scroll();
}

@keyframes fill-bar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Element animates as it enters viewport */
.card {
  animation: slide-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### View Transitions API

Smooth page transitions:

```js
// Simple same-document transition
document.startViewTransition(() => {
  updateDOM(); // Your DOM update logic
});

/* CSS to control the transition */
::view-transition-old(root) {
  animation: fade-out 0.3s ease;
}
::view-transition-new(root) {
  animation: fade-in 0.3s ease;
}

/* Named transitions for specific elements */
.hero-image { view-transition-name: hero; }
```

### Marquee / Infinite Scroll

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

/* Duplicate content in HTML for seamless loop */
/* Edge fade */
.marquee-container::before,
.marquee-container::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 100px;
  z-index: 2;
}
.marquee-container::before {
  left: 0;
  background: linear-gradient(to right, var(--bg), transparent);
}
.marquee-container::after {
  right: 0;
  background: linear-gradient(to left, var(--bg), transparent);
}
```

### Masked Text Reveal

```css
.text-reveal-wrapper {
  overflow: hidden;
  display: inline-block;
}
.text-reveal-content {
  display: block;
  transform: translateY(110%);
  opacity: 0;
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.5s ease;
}
.visible .text-reveal-content {
  transform: translateY(0);
  opacity: 1;
}
/* Stagger words with transition-delay */
.text-reveal-content:nth-child(1) { transition-delay: 0s; }
.text-reveal-content:nth-child(2) { transition-delay: 0.08s; }
.text-reveal-content:nth-child(3) { transition-delay: 0.16s; }
```

### Animated Border Glow (Conic Gradient)

```css
.glow-btn {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Spinning conic creates the beam effect */
.glow-btn::before {
  content: '';
  position: absolute;
  inset: -300%;
  animation: spin 4s linear infinite;
  background: conic-gradient(
    from 90deg,
    transparent 0%,
    transparent 82%,
    var(--color-accent) 96%,
    transparent 100%
  );
}

/* Inner cover hides beam except at edges */
.glow-btn::after {
  content: '';
  position: absolute;
  inset: 1.5px;
  border-radius: calc(6px - 1px);
  background: var(--color-bg);
}

.glow-btn span { position: relative; z-index: 1; }
```

### Hover Sheen Effect

```css
@keyframes sheen {
  from { transform: translateX(-150%) skewX(-15deg); }
  to { transform: translateX(250%) skewX(-15deg); }
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255,255,255,0.12) 45%,
    rgba(255,255,255,0.24) 50%,
    transparent 55%
  );
  transform: translateX(-150%) skewX(-15deg);
}
.btn:hover::after {
  animation: sheen 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

### Card Image Hover (Brand-Coloured Background Reveal)

```css
.card {
  position: relative;
  overflow: hidden;
}

/* Grid texture layer — simulates image reveal */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 0.5s ease, transform 0.7s ease;
  background-image:
    linear-gradient(rgba(var(--accent-rgb), 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--accent-rgb), 0.18) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* Colour overlay */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
  background: linear-gradient(135deg, rgba(0,0,0,0.88), rgba(var(--accent-rgb), 0.12), rgba(0,0,0,0.92));
}

.card:hover::before { opacity: 1; transform: scale(1); }
.card:hover::after { opacity: 1; }
.card > * { position: relative; z-index: 1; }
```

---

## 3. 3D & WebGL

### CSS 3D Transforms

```css
/* Perspective on parent */
.scene { perspective: 1000px; }

/* 3D card flip */
.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}
.card-3d:hover { transform: rotateY(180deg); }

.card-front, .card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}
.card-back { transform: rotateY(180deg); }

/* Parallax tilt on mouse move */
```

```js
// Tilt effect following cursor
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `
    perspective(800px)
    rotateY(${x * 15}deg)
    rotateX(${-y * 15}deg)
    scale3d(1.03, 1.03, 1.03)
  `;
});
card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)';
  card.style.transition = 'transform 0.5s ease';
});
```

### Three.js Integration (React)

When using Three.js in artifacts:
- Import from `'three'` (available as r128)
- Do NOT use OrbitControls or features from >r128
- Do NOT use CapsuleGeometry (introduced in r142)
- Use CylinderGeometry, SphereGeometry, or custom geometry instead
- Keep scenes simple — single purpose, performant
- Always dispose of geometries, materials, and textures on cleanup

### Particle / Background Effects

For ambient background effects (floating particles, gradient meshes):
- Prefer CSS/SVG when possible (lower overhead than canvas)
- For canvas: use `requestAnimationFrame`, not `setInterval`
- Limit particle count (100–300 for ambient, fewer on mobile)
- Reduce quality or disable on `prefers-reduced-motion`
- Use `will-change: transform` sparingly (only on actively animated elements)

---

## 4. Scroll-Driven Effects

### Parallax (CSS-only)

```css
.parallax-container {
  overflow-y: auto;
  perspective: 1px;
  height: 100vh;
}

.parallax-bg {
  transform: translateZ(-1px) scale(2);
  position: absolute;
  inset: 0;
}
```

### Sticky Sections

```css
.sticky-section {
  position: sticky;
  top: 0;
  height: 100vh;
}
```

### Scroll Progress Indicator

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--color-accent);
  transform-origin: left;
  animation: scroll-progress linear;
  animation-timeline: scroll();
}
@keyframes scroll-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

---

## 5. Performance Optimization

### Core Web Vitals Targets

| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| FID (First Input Delay) | ≤ 100ms | ≤ 300ms | > 300ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| INP (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms | > 500ms |

### Critical Rendering Path

1. Inline critical CSS (above-the-fold styles)
2. Defer non-critical CSS: `<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">`
3. Defer non-essential JS: `<script defer src="app.js">`
4. Preconnect to critical origins: `<link rel="preconnect" href="https://fonts.googleapis.com">`
5. Preload critical assets: `<link rel="preload" href="hero.webp" as="image">`

### Animation Performance

- **Transform and opacity only** for animations (GPU-composited, no layout/paint)
- Avoid animating: width, height, top, left, margin, padding (triggers layout)
- `will-change`: use only on elements currently animating, remove after
- Use `requestAnimationFrame` for JS animations, never `setTimeout/setInterval`
- Intersection Observer for scroll-triggered effects (not scroll event listeners)

### Lazy Loading

```html
<!-- Native lazy loading for images -->
<img src="photo.webp" loading="lazy" width="800" height="600" alt="Description">

<!-- Eager load above-fold images -->
<img src="hero.webp" loading="eager" fetchpriority="high" width="1200" height="800" alt="Hero">
```

---

## 6. Component Architecture

### Naming Convention (BEM-inspired)

```css
.card {}              /* Block */
.card__header {}      /* Element */
.card__title {}       /* Element */
.card--featured {}    /* Modifier */
.card--compact {}     /* Modifier */
```

### Component Composition

Build from small → large:
```
Token → Primitive → Component → Pattern → Template → Page
(colour)  (button)   (card)     (card-grid) (service-page) (homepage)
```

### Responsive Component Pattern

```css
/* Base: mobile-first */
.card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

/* Enhancement: wider screens */
@media (min-width: 768px) {
  .card--horizontal {
    flex-direction: row;
    align-items: center;
  }
}

/* Best: container query (component-aware) */
@container (min-width: 500px) {
  .card { flex-direction: row; }
}
```

---

## 7. Progressive Enhancement

### Strategy

1. **HTML first**: Content is accessible with HTML alone
2. **CSS enhances**: Layout, colour, typography improve the experience
3. **JS augments**: Interactions, animations, dynamic features add delight

### Feature Detection

```css
/* Use modern features with fallbacks */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
@supports (display: grid) {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
```

---

## 8. Advanced Layout Patterns

### Fluid Grid with Minimum Column Width

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: var(--sp-6);
}
```

### Holy Grail Layout (modern)

```css
body {
  display: grid;
  grid-template: "nav nav" auto
                 "sidebar main" 1fr
                 "footer footer" auto
                 / 280px 1fr;
  min-height: 100vh;
}
```

### Aspect Ratio Containers

```css
.video-embed { aspect-ratio: 16 / 9; }
.square-card { aspect-ratio: 1; }
.hero-image { aspect-ratio: 21 / 9; object-fit: cover; }
```

---

## 9. Image & Media Strategy

### Modern Image Delivery

```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero" width="1200" height="800" loading="eager">
</picture>
```

### Responsive Images

```html
<img
  srcset="photo-400.webp 400w,
          photo-800.webp 800w,
          photo-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         600px"
  src="photo-800.webp"
  alt="Description"
  loading="lazy"
>
```

---

## 10. Font Loading Strategy

### Optimal Loading

```html
<!-- Preconnect to font origin -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load font CSS -->
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
```

```css
/* Prevent FOUT/FOIT */
body {
  font-family: 'Primary Font', system-ui, sans-serif;
  font-display: swap;
}

/* Adjust fallback metrics to reduce CLS */
@font-face {
  font-family: 'Primary Font';
  font-display: swap;
  size-adjust: 105%;
  ascent-override: 95%;
  descent-override: 22%;
}
```

### Self-Hosting (when performance matters most)

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
  unicode-range: U+0000-00FF; /* Latin subset */
}
```
