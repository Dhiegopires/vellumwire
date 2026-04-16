# UX/UI Design — Deep Reference

## Table of Contents
1. Design Thinking Process
2. Information Architecture
3. User Flow Patterns
4. Design System Architecture
5. Responsive Strategy
6. Accessibility Deep-Dive
7. Navigation Patterns
8. Form Design
9. States: Empty, Error, Loading, Success
10. Usability Heuristics
11. Dark Patterns to Avoid
12. Visual Design Principles

---

## 1. Design Thinking Process

Before pixels, think in problems and flows:

**Discovery → Definition → Ideation → Implementation → Validation**

- **Discovery**: Who is the user? What's their goal? What's blocking them? What device/context?
- **Definition**: One sentence: "[User] needs to [goal] because [motivation], but [obstacle]."
- **Ideation**: Sketch 3+ approaches before committing. The first idea is rarely the best.
- **Implementation**: Build with the system (tokens, components, patterns). Don't reinvent.
- **Validation**: Does it work? Test with real tasks, not just visual review.

### Jobs to Be Done Framework

Frame features as: "When [situation], I want to [motivation], so I can [outcome]."

This prevents feature-thinking and forces outcome-thinking. Examples:
- "When I land on the homepage, I want to understand what you do in 5 seconds, so I can decide if this is relevant to me."
- "When I'm comparing pricing tiers, I want to see the differences clearly, so I can pick without second-guessing."

---

## 2. Information Architecture

### Content Hierarchy Rules

1. **The 5-second test**: A new visitor should understand what the site/page is about within 5 seconds of landing.
2. **The squint test**: Squint at the page. Can you still see the hierarchy? If everything blurs into sameness, contrast is insufficient.
3. **Progressive disclosure**: Show the minimum needed at each level. Details on demand, not upfront.
4. **F-pattern / Z-pattern**: Western users scan in F or Z patterns. Place critical elements along these paths.

### Page Structure Template

```
[Nav — fixed, minimal, CTA visible]
[Hero — headline + subhead + CTA + trust signal]
[Social proof bar — logos, numbers, or one-line testimonial]
[Problem/pain section — name what's broken]
[Solution section — how you fix it]
[Features/services — with outcomes, not specs]
[Deeper social proof — testimonials, case studies]
[Objection handling — FAQ or trust section]
[Final CTA — repeat the primary action]
[Footer — links, legal, secondary navigation]
```

---

## 3. User Flow Patterns

### Conversion Flow

```
Awareness → Interest → Desire → Action → Confirmation
(Ad/Search) → (Landing) → (Value prop) → (CTA/Form) → (Thank you)
```

**Key principle**: Every step must answer "Why should I continue?" If the user can't answer that at any point, they'll leave.

### Reduce Friction Checklist

- [ ] Can the user complete the primary action in ≤3 clicks from landing?
- [ ] Are form fields minimized to only what's essential?
- [ ] Is the CTA visible without scrolling on mobile?
- [ ] Are there clear progress indicators for multi-step flows?
- [ ] Can the user go back without losing data?
- [ ] Are error messages specific and actionable ("Email format: name@example.com" not "Invalid input")?

---

## 4. Design System Architecture

### Token Hierarchy

```
Global tokens (raw values)
  → Semantic tokens (purpose-based aliases)
    → Component tokens (scoped to specific components)
```

Example:
```css
/* Global */
--blue-500: #3b82f6;

/* Semantic */
--color-action-primary: var(--blue-500);
--color-action-primary-hover: var(--blue-600);

/* Component */
--btn-primary-bg: var(--color-action-primary);
--btn-primary-bg-hover: var(--color-action-primary-hover);
```

### Design System Essentials

A complete system needs:
- **Colour palette** with semantic tokens (background, text, border, accent, status)
- **Typography scale** with roles (display, heading, body, caption, label, code)
- **Spacing scale** based on a consistent unit (4px or 8px)
- **Border & radius tokens**
- **Shadow scale** (subtle → elevated → dramatic)
- **Breakpoint definitions**
- **Component library** built from the above tokens
- **Documentation** with do/don't examples

---

## 5. Responsive Strategy

### Breakpoint System

```css
/* Mobile-first breakpoints */
--bp-sm: 640px;    /* Large phones landscape */
--bp-md: 768px;    /* Tablets portrait */
--bp-lg: 1024px;   /* Tablets landscape / small desktop */
--bp-xl: 1280px;   /* Desktop */
--bp-2xl: 1536px;  /* Large desktop */
```

### Layout Patterns

**Stack → Sidebar → Grid progression**:
- Mobile: everything stacks vertically
- Tablet: sidebar layouts where appropriate, 2-column grids
- Desktop: full grid layouts, horizontal navigation, multi-column content

**Container queries** (prefer over media queries for components):
```css
.card-container { container-type: inline-size; }

@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### Responsive Typography

```css
/* Fluid type using clamp() */
h1 { font-size: clamp(2rem, 5vw + 1rem, 4.5rem); }
h2 { font-size: clamp(1.5rem, 3vw + 0.75rem, 3rem); }
body { font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); }
```

---

## 6. Accessibility Deep-Dive

### WCAG 2.1 AA Checklist

**Perceivable**:
- All images have meaningful alt text (decorative images: `alt=""`)
- Colour is not the only way to convey information
- Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large text ≥ 18px bold or 24px regular)
- UI component contrast ≥ 3:1 against adjacent colours
- Content reflows at 320px viewport without horizontal scrolling
- Text resizable to 200% without loss of content

**Operable**:
- All functionality available via keyboard
- Visible focus indicators on all interactive elements
- No keyboard traps
- Skip-to-main-content link
- No content that flashes more than 3 times per second
- Touch targets ≥ 44×44px with adequate spacing

**Understandable**:
- Language declared (`lang` attribute on `<html>`)
- Consistent navigation across pages
- Form inputs have visible labels (not placeholder-only)
- Error messages identify the field and suggest correction
- No unexpected context changes on focus or input

**Robust**:
- Valid HTML (proper nesting, unique IDs)
- ARIA used correctly (prefer semantic HTML over ARIA)
- Custom components have appropriate roles and states

### Focus Management

```css
/* Visible focus for keyboard users only */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Remove default outline (replaced above) */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 7. Navigation Patterns

### Primary Navigation

- **Maximum 7±2 items** in main nav (Miller's law)
- CTA button visually distinct from nav links
- Current page indicator (underline, colour, weight — not just colour alone)
- Mobile: hamburger menu is acceptable, but consider bottom navigation for apps
- Sticky nav: yes for long pages, but keep height minimal (56–64px)

### Breadcrumbs

Use when: hierarchy > 2 levels, user needs to orient themselves.
Use semantic: `<nav aria-label="Breadcrumb"><ol>...</ol></nav>`

### Footer Navigation

The footer is the safety net. Include:
- Complete site map links
- Legal (privacy, terms)
- Contact information
- Social links
- Secondary CTAs (newsletter, careers)

---

## 8. Form Design

### Rules

1. **One column layout** — always. Multi-column forms increase errors by 150%.
2. **Labels above inputs** — not inside (placeholders disappear), not beside (breaks on mobile).
3. **Group related fields** visually (name group, address group, payment group).
4. **Progressive disclosure** — show fields only when relevant (conditional fields).
5. **Inline validation** — validate on blur, not on keystroke. Show errors below the field.
6. **Smart defaults** — pre-fill what you can (country from IP, format hints in placeholder).
7. **Submit button** — descriptive text ("Create account" not "Submit"), disabled state until valid.

### Error Messages

Bad: "Invalid input" / "Error" / "Please fix the errors"
Good: "Email needs an @ symbol — try name@company.com" / "Password needs at least 8 characters (you have 6)"

### Input Types

Use the correct `type` for mobile keyboard optimization:
- `type="email"` → @ key visible
- `type="tel"` → number pad
- `type="url"` → .com key visible
- `inputmode="numeric"` → number pad for codes/zips
- `autocomplete` attributes for autofill

---

## 9. States: Empty, Error, Loading, Success

Every component has 5 states. Don't design only the happy path.

### Empty State
- Explain what will go here
- Provide an action to fill it ("Add your first project")
- Use an illustration or icon — don't leave a blank void
- Tone: helpful, not apologetic

### Loading State
- Skeleton screens > spinners (perceived performance is better)
- Show layout structure while data loads
- Progressive loading: show what you have, load the rest
- Never block the entire UI for a partial load

### Error State
- Identify what went wrong, specifically
- Suggest how to fix it
- Provide an action (retry, go back, contact support)
- Don't blame the user ("Your request failed" not "You made an error")

### Success State
- Confirm the action completed
- Show what happens next
- Provide a next action if applicable
- Celebrate proportionally (subtle for routine actions, more for milestones)

---

## 10. Usability Heuristics (Nielsen)

1. **Visibility of system status** — The system should always keep users informed about what is going on.
2. **Match between system and real world** — Use language the user knows, not internal jargon.
3. **User control and freedom** — Support undo, redo, and escape routes.
4. **Consistency and standards** — Follow platform conventions. Don't reinvent patterns.
5. **Error prevention** — Prevent errors before they happen (confirmation dialogs, constraints).
6. **Recognition over recall** — Show options rather than requiring memory.
7. **Flexibility and efficiency** — Keyboard shortcuts, recent items, saved preferences.
8. **Aesthetic and minimalist design** — Every extra element competes with relevant ones.
9. **Help users recognize, diagnose, and recover from errors** — Plain language, specific, constructive.
10. **Help and documentation** — Should be searchable, task-focused, and concise.

---

## 11. Dark Patterns to Avoid

Never implement these — they destroy trust and are increasingly illegal:

- **Confirmshaming**: "No thanks, I don't want to save money" — manipulative opt-out copy
- **Forced continuity**: Free trial → auto-charge with no warning
- **Hidden costs**: Fees revealed only at checkout
- **Roach motel**: Easy to sign up, impossible to cancel
- **Misdirection**: Visual design that steers toward the business-preferred option
- **Trick questions**: Double negatives in opt-in/out checkboxes
- **Sneak into basket**: Adding items the user didn't request
- **Disguised ads**: Ads that look like content or navigation

---

## 12. Visual Design Principles

### Contrast
Create clear distinction between elements. If two things are different, make them *obviously* different. Small differences look like mistakes.

### Alignment
Every element should be visually connected to something else on the page. Use a grid. Align baselines. Stray elements look unintentional.

### Repetition
Consistent patterns create rhythm and reduce cognitive load. Same spacing, same border treatment, same hover effect across similar elements.

### Proximity
Related elements should be closer together than unrelated elements. Group by meaning, not by convenience.

### White Space
Space is not empty — it's a structural element. Generous margins around important content make it more prominent, not less. Crowded layouts feel cheap; breathing room feels premium.

### Visual Weight Balance
Dark elements, large elements, and saturated colours carry more visual weight. Balance the composition so no area feels too heavy or too light.
