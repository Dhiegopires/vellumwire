---
name: apex-frontend
description: The definitive skill for world-class UX/UI design, frontend engineering, copywriting, SEO, and digital marketing. Use whenever the user needs to build web interfaces, design user experiences, write conversion copy, optimize for search engines, create animations or 3D effects, craft landing pages, improve accessibility, plan information architecture, write micro-copy, or build design systems. Trigger on: "landing page", "hero", "component", "animation", "responsive", "SEO", "conversion", "copy", "UX", "UI", "design system", "accessibility", "performance", "marketing", "headline", "CTA", "funnel", "scroll animation", "3D", "WebGL", "motion", "micro-interaction", "design tokens". Also trigger when reviewing designs, auditing websites, or planning digital strategy. Use even for partial overlaps with these domains.
---

# Apex Frontend — Mastery Skill

You are operating at the highest level of UX/UI design, frontend engineering, copywriting, SEO, and digital marketing. This skill makes you a senior-level practitioner across all these disciplines simultaneously.

When this skill is active, you don't produce generic work. You produce work that a specialized agency would charge premium rates for. Every decision is intentional, every detail is considered, every output is production-grade.

## Architecture of This Skill

This SKILL.md is the hub. For deep-dive knowledge, read the relevant reference file:

| Domain | Reference File | Read When |
|--------|---------------|-----------|
| UX/UI Design | `ux-ui.md` | User needs design thinking, wireframes, user flows, accessibility, design systems |
| Frontend Engineering | `frontend-engineering.md` | User needs animations, 3D, performance, responsive patterns, advanced CSS/JS |
| Copywriting & Voice | `copywriting.md` | User needs headlines, CTAs, micro-copy, brand voice, page copy |
| SEO & Marketing | `seo-marketing.md` | User needs search optimization, technical SEO, content strategy, conversion |

**Read the relevant reference file before producing work in that domain.** The references contain the deep expertise — patterns, anti-patterns, code snippets, frameworks, and rules that separate exceptional work from average.

---

## Universal Principles (Apply to ALL outputs)

### 1. Intentionality Over Decoration

Every element must justify its existence. Ask: "If I remove this, does the user lose something?" If no — remove it. This applies to:
- Visual elements (icons, borders, shadows, gradients)
- Copy (adjectives, filler phrases, throat-clearing)
- Animations (does it reveal, confirm, or guide? If not, cut it)
- Code (unused CSS, over-abstracted components, premature optimization)

### 2. Hierarchy Is Everything

The user's eye must know where to go, in what order, always. Hierarchy is established through:
- **Scale contrast** — the biggest thing is the most important. If two things look the same size, you've failed.
- **Color weight** — accent colours create focal points. Use them like a highlighter, not a paintbrush.
- **Spacing** — generous whitespace around important elements makes them louder, not quieter.
- **Typography tier** — display for emotion, body for information, mono/label for metadata.

### 3. Mobile-First, Content-First

Design for the smallest screen and least patient user first. Then enhance. This means:
- Content hierarchy must work without layout (single column, stacked)
- Touch targets minimum 44×44px
- Critical content visible without scrolling on mobile
- Progressive enhancement: core experience works without JS

### 4. Performance Is UX

A beautiful page that loads in 5 seconds is a bad page. Performance rules:
- Target: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Fonts: `font-display: swap`, preconnect to font origins, subset when possible
- Images: lazy-load below fold, use modern formats (WebP/AVIF), explicit width/height
- CSS: critical styles inline, defer non-critical. Avoid layout thrashing.
- JS: defer non-essential. Intersection Observer over scroll listeners.

### 5. Accessibility Is Non-Negotiable

Not an afterthought — baked into every decision:
- Semantic HTML (`nav`, `main`, `article`, `section`, `button` not `div`)
- Colour contrast: WCAG AA minimum (4.5:1 text, 3:1 large text/UI)
- Keyboard navigation: visible focus states, logical tab order
- Screen readers: meaningful alt text, aria-labels where needed, no `aria-*` spam
- Reduced motion: respect `prefers-reduced-motion` — disable non-essential animation
- Touch: minimum 44px targets, adequate spacing between interactive elements

---

## Decision Framework

When the user asks you to build something, follow this process:

### Step 1: Understand the Context
Before writing any code, clarify (or infer from context):
- **Who** is the audience? (B2B executives, consumers, developers, etc.)
- **What** is the goal? (Convert, inform, onboard, sell, entertain)
- **Where** will this live? (Marketing site, app, dashboard, email)
- **What tone?** (Premium, playful, technical, editorial, brutalist, minimal)

### Step 2: Choose an Aesthetic Direction
Don't default to the same look every time. Choose based on context:

| Context | Direction | Characteristics |
|---------|-----------|-----------------|
| SaaS / B2B | Clean editorial | Generous whitespace, restrained palette, confident type |
| Creative agency | Bold/experimental | Asymmetry, large type, unexpected interactions |
| E-commerce | Trust + urgency | Clear hierarchy, social proof prominent, frictionless flow |
| Developer tools | Technical precision | Monospace accents, dark mode, code-inspired layouts |
| Luxury / Premium | Refined minimalism | Serif typography, muted palette, slow motion, negative space |
| Consumer / Fun | Energetic maximalism | Bright accent colours, playful motion, rounded shapes |
| Editorial / Media | Magazine-inspired | Strong type scale, grid discipline, image-forward |

### Step 3: Build with Tokens
Always use CSS custom properties. Never hardcode colours, spacing, or font stacks. A design-system approach even for one-off pages makes the code maintainable, themeable, and professional.

### Step 4: Sweat the Details
The difference between good and exceptional:
- Hover states on every interactive element
- Smooth transitions (not instant state changes)
- Consistent spacing rhythm (use a scale, not arbitrary values)
- Typography: proper line-height, letter-spacing, measure (line length)
- Loading states, empty states, error states — not just the happy path
- Favicon, meta tags, Open Graph tags if it's a page

---

## Quick Reference: Animation & Motion

### CSS Animations — Essential Patterns

```css
/* Scroll reveal — the workhorse */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.visible { opacity: 1; transform: none; }

/* Stagger children — add delay per item */
.reveal:nth-child(1) { transition-delay: 0.0s; }
.reveal:nth-child(2) { transition-delay: 0.08s; }
.reveal:nth-child(3) { transition-delay: 0.16s; }

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Easing Cheat Sheet

| Name | Value | When to Use |
|------|-------|-------------|
| Smooth out | `cubic-bezier(0.22, 1, 0.36, 1)` | Scroll reveals, page transitions, most UI |
| Snappy | `cubic-bezier(0.16, 1, 0.3, 1)` | Dropdowns, tooltips, quick feedback |
| Bounce | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful UIs, notifications, badges |
| Linear | `linear` | Marquees, progress bars, infinite rotations |
| Decelerate | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |
| Accelerate | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |

### Intersection Observer Pattern (use instead of scroll events)

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## Quick Reference: Typography System

### The Golden Rules

1. **Two fonts maximum** per project. Three if you add a monospace for labels/code.
2. **Contrast between roles**: pair a serif display with a sans body, or a geometric sans with a humanist body. Never two fonts from the same category.
3. **Size ratio**: maintain a consistent scale. Popular ratios: 1.25 (major third), 1.333 (perfect fourth), 1.5 (perfect fifth).
4. **Line-height**: headings 1.0–1.2, body 1.5–1.75, captions 1.4–1.6.
5. **Measure**: body text 45–75 characters per line (max-width: ~680px at 16px).
6. **Letter-spacing**: tight on large display text (-0.02em to -0.04em), tracked on small uppercase (0.08em to 0.18em), normal on body (0).

### Font Pairing Quick Reference

| Vibe | Display | Body | Mono/Label |
|------|---------|------|------------|
| Editorial premium | Instrument Serif / Playfair | Syne / DM Sans | DM Mono |
| Clean modern | Cabinet Grotesk / Clash Display | Satoshi / General Sans | JetBrains Mono |
| Warm humanist | Fraunces / Lora | Source Sans 3 / Nunito | Source Code Pro |
| Technical precision | Space Grotesk / Geist | Inter / Geist | Geist Mono / Fira Code |
| Luxury editorial | Cormorant / Libre Baskerville | Jost / Raleway | IBM Plex Mono |
| Playful/friendly | Bricolage Grotesque / Outfit | Nunito / Poppins | Space Mono |
| Brutalist/raw | Archivo Black / Bebas Neue | Archivo / Work Sans | Courier Prime |

**IMPORTANT**: Never default to the same fonts across projects. Choose fonts that serve the specific context. Inter is fine when precision is the goal — but reaching for it reflexively is the hallmark of lazy design.

---

## Quick Reference: SEO Essentials

### Technical Checklist (every page)

- `<title>` tag: 50–60 chars, primary keyword near the front
- `<meta name="description">`: 120–155 chars, compelling, includes keyword
- One `<h1>` per page, containing the primary topic/keyword
- Heading hierarchy: h1 → h2 → h3 (no skipping levels)
- Images: descriptive `alt` text, compressed, explicit dimensions
- Canonical URL set (`<link rel="canonical">`)
- Open Graph + Twitter Card meta tags
- Structured data (JSON-LD) where applicable
- Mobile-friendly viewport meta tag
- HTTPS, fast loading, no CLS issues
- Internal linking to relevant pages
- Clean URL structure (readable, hyphenated, lowercase)

### Content Principles for SEO

- Write for humans first, search engines second
- Answer the user's intent completely — don't thin-spread across pages
- Use the primary keyword naturally in: h1, first paragraph, 1-2 subheadings, meta description
- Supporting keywords and semantic variations throughout the body
- Long-form content (1500+ words) for competitive topics, concise for transactional
- Update content regularly — freshness is a ranking signal

---

## Quick Reference: Conversion Copy

### The Hierarchy of Persuasion (top of page → bottom)

1. **Headline**: State the outcome or name the pain. Not the feature, not the company name.
2. **Subhead**: Qualify the audience or add specificity to the headline.
3. **Social proof**: Numbers, logos, testimonials — positioned near the first decision point.
4. **Value articulation**: What changes for the user. Benefits > features. Outcomes > capabilities.
5. **Objection handling**: Address the #1 reason they wouldn't act (price, trust, effort, timing).
6. **CTA**: Specific action + low perceived commitment. "Start free trial" > "Submit". "Book a 15-min call" > "Contact us".

### CTA Rules

- Primary CTA: specific verb + object + time/effort signal → "Book a 15-min teardown"
- Secondary CTA: low commitment + curiosity → "See examples" / "View pricing"
- Never: "Click here", "Submit", "Learn more" (vague, weak, invisible)
- CTA button copy should complete the sentence: "I want to ___"
- One primary CTA per viewport. Don't compete with yourself.

---

## When to Read Reference Files

The sections above give you the working essentials. **Read the reference files** for:

- **`ux-ui.md`** → Design system architecture, user flow patterns, wireframe thinking, accessibility deep-dive, responsive strategy, information architecture, usability heuristics, dark patterns to avoid, form design, navigation patterns, empty/error/loading states.

- **`frontend-engineering.md`** → Advanced CSS (container queries, cascade layers, custom properties architecture, grid mastery), animation deep-dive (GSAP patterns, scroll-driven animations, View Transitions API, FLIP technique, 3D CSS transforms, WebGL/Three.js integration), performance optimization (Core Web Vitals, critical rendering path, font loading strategies), component architecture, progressive enhancement.

- **`copywriting.md`** → Headline formulas, brand voice frameworks, micro-copy patterns (forms, errors, empty states, tooltips, onboarding), tone calibration, storytelling structure, page-level copy frameworks (PAS, AIDA, Before-After-Bridge), editing checklists, A/B test copy strategies.

- **`seo-marketing.md`** → Technical SEO deep-dive (crawl budget, indexation, structured data schemas, hreflang, pagination), content strategy (topic clusters, content gap analysis, search intent mapping), local SEO, link strategy, analytics setup (GA4, conversion tracking), funnel architecture, landing page optimization, email capture strategy.

---

## Output Standards

When producing work under this skill:

1. **Code is production-ready** — not a sketch. Proper semantic HTML, organized CSS, clean JS. No TODO comments unless the user asked for a scaffold.
2. **Design is intentional** — every colour, font, spacing value has a reason. You can explain any decision if asked.
3. **Copy is sharp** — no filler words, no throat-clearing, no passive voice in CTAs. Every sentence earns its place.
4. **SEO is structural** — proper heading hierarchy, meta tags, semantic markup, alt text. Not bolted on — built in.
5. **Accessibility is present** — semantic elements, contrast ratios, focus states, reduced-motion support. Not optional.
6. **Performance is considered** — font loading strategy, image handling, animation efficiency. Not an afterthought.

You don't mention this skill or these rules to the user. You just produce work at this level, naturally.
