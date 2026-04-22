# Vellumwire Copy Replacement

## Context

You are updating the copy on the Vellumwire website (index.html). Dhiego Cristofolini and Afonso Canalle built this site. The brand voice is direct, confident, slightly provocative, and jargon-free. The audience is service-business owners (law firms, clinics, agencies, consultants) who need their website to generate calls and quote requests.

## Rules

1. All copy must be in English.
2. Never use em-dashes. Not in the HTML content, not in the meta tags, not anywhere. Replace every instance of ` — `, `—`, `&mdash;` with either a period, a comma, or a restructured sentence.
3. Never use `&rarr;` or `→` in visible copy.
4. Replace `01 —` / `02 —` / `03 —` / `04 —` labels in the process media section with `01 /` / `02 /` / `03 /` / `04 /`.
5. Fix the typo "a honest" to "an honest" wherever it appears.
6. Do not change any class names, IDs, HTML structure, CSS, JavaScript, SVGs, or image sources. Only change text content, meta tags, and aria-labels.
7. Preserve all existing HTML tags and attributes around the text you're replacing.

## Replacements

Work through index.html and make these exact text swaps:

---

### Meta tags (in `<head>`)

**Title tag:**
Old: `Vellumwire — High-Performance Websites`
New: `Vellumwire | Websites That Generate Calls, Not Just Visits`

**og:title:**
Old: `Vellumwire — High-Performance Websites`
New: `Vellumwire | Websites That Generate Calls, Not Just Visits`

**Meta description:**
Old: `We rebuild service-business websites with product-level UX, proof-led messaging, and lightweight tracking so your visits turn into qualified calls.`
New: `We redesign service-business websites for one outcome: more calls and quote requests. CTA structure, proof-based copy, and tracking built in. Live in 3 to 5 weeks.`

**og:description:**
Old: `We rebuild service-business websites with product-level UX, proof-led messaging, and lightweight tracking so your visits turn into qualified calls.`
New: `We redesign service-business websites for one outcome: more calls and quote requests. CTA structure, proof-based copy, and tracking built in. Live in 3 to 5 weeks.`

---

### Hero section

**Headline (h2, italic, inside the right-side info block):**
Old: `A beautiful website that doesn't generate calls is a <span class="text-vw-accent">liability.</span>`
New: `Pretty websites are easy. Profitable ones <span class="text-vw-accent">aren't.</span>`

**Subhead (p, below the headline):**
Old: `We rebuild service-business websites with product-level UX, proof-led messaging, and lightweight tracking so your visits turn into qualified calls.`
New: `We redesign service websites so the right visitors take action. Clear structure, proof where it matters, and copy that sells while you're offline.`

**Primary CTA button text:**
Old: `Book a Teardown`
New: `See what's leaking`

**Secondary scroll prompt text:**
Old: `Scroll`
New: `or keep scrolling`

---

### The Leak section

**Subhead (p):**
Old: `Most sites don't fail on design. They fail on clarity, proof, and flow. Stop guessing what's wrong.`
New: `8 out of 10 service sites lose leads because of three problems that have nothing to do with how the site looks.`

**Card 1 body:**
Old: `Visitors can't tell what to do next so they bounce or call a competitor.`
New: `Visitors land, scan for 5 seconds, can't figure out the next step, and leave. Most of them call someone else.`

**Card 2 body:**
Old: `Reviews, credentials, and proof aren't placed where decisions happen.`
New: `Your reviews and credentials exist, but they're buried below the fold. They need to sit next to the button, not three scrolls away.`

**Card 3 body:**
Old: `Long forms, hidden contact options, or slow pages kill intent.`
New: `A 12-field form, a buried phone number, or a page that takes 6 seconds to load. Any one of these kills the lead before they finish.`

**Both CTA buttons in this section:**
Old: `Book a 15-min teardown`
New: `Get a free 15-minute diagnosis`

---

### What We Do section

**Headline (h2):**
Old: `Turn visits into calls and quote requests`
New: `Three things we do. Each one generates leads.`

**Subhead (p):**
Old: `Product UX for service websites with structure, proof and measurable launch.`
New: `Design, copy, and engineering under one brief. Built for service businesses that depend on inbound leads.`

**Step 01 title (h3):**
Old: `Conversion Structure`
New: `Structure that guides the click`

**Step 01 body (p):**
Old: `CTA hierarchy, scannable sections and friction removal.`
New: `We map the page so every section pushes toward one action. CTA hierarchy, scannable layout, friction cut at every step.`

**Step 02 title (h3):**
Old: `Messaging & Proof Architecture`
New: `Copy that proves before it asks`

**Step 02 body (p):**
Old: `Pain &rarr; promise &rarr; proof &rarr; next step, placed where decisions happen.`
New: `We write every heading, subhead, and CTA. Pain first, then proof, then the ask. Placed exactly where your visitor is making the decision.`

**Step 03 title (h3):**
Old: `Fast Build & Tracking`
New: `Fast site, tracking from day one`

**Step 03 body (p):**
Old: `Reusable components, speed basics, and GA4/GTM foundations.`
New: `Lightweight code, fast load times, and GA4 + event tracking configured before launch. You see real numbers from week one.`

---

### Services section

**Headline (h2):**
Old: `Choose your starting point`
New: `Pick where to start`

**Subhead (p):**
Old: `Three distinct pathways engineered for a single outcome: predictable lead flow.`
New: `Three tiers, one goal: a site that brings you calls every week.`

**Card 1 eyebrow:**
Old: `BEST FOR: QUICK WINS`
New: `YOU KNOW SOMETHING'S OFF. NOT WHAT.`

**Card 1 body:**
Old: `A focused teardown and priority plan to fix what's leaking leads — ranked by impact.`
New: `We tear your site apart, find what's losing leads, and hand you a ranked fix list. You keep the report whether you hire us or not.`

**Card 2 eyebrow:**
Old: `BEST FOR: BASELINE LIFT`
New: `YOUR SITE EXISTS BUT DOESN'T CONVERT`

**Card 2 body:**
Old: `A high-octane redesign of your homepage and primary landing pages aimed exclusively at building trust and capturing intent.`
New: `We redesign your homepage and key landing pages with one focus: build trust fast and capture the lead before they leave.`

**Card 3 eyebrow:**
Old: `BEST FOR: TOTAL OVERHAUL`
New: `YOUR SITE NEEDS TO START OVER`

---

### Work section

**Headline (h2):**
Old: `Our newest projects`
New: `Recent work`

**Subhead (p):**
Old: `A few examples of structure & proof working together to drive serious pipeline.`
New: `Structure and proof working together. Here's what that looks like in practice.`

---

### Process section

**Subhead (p, below "From first call to live site"):**
Old: `No long intake forms, no three-month timelines. A direct path from diagnosis to execution.`
New: `No intake forms. No three-month timelines. Diagnosis to live site in weeks, not quarters.`

**Process media labels (all four):**
Old: `01 — Teardown`
New: `01 / Diagnosis`

Old: `02 — Plan`
New: `02 / Plan`

Old: `03 — Build`
New: `03 / Build`

Old: `04 — Launch`
New: `04 / Launch`

**Step 01 body (p):**
Old: `Before touching a pixel, we map where your current site is leaking attention—conversion blockers, buried trust signals, form friction, slow loads. You get a prioritized breakdown of what's actually hurting pipeline.`
New: `Before we touch a pixel, we map where your site loses attention. Conversion blockers, buried trust signals, form friction, slow loads. You get a prioritized list of what's actually costing you leads.`

**Step 02 body (p):**
Old: `We translate the audit into a tight scope: what gets fixed first for the fastest revenue impact, what gets restructured in depth, and what simply gets cut. One doc. No ambiguity. You sign off before a line of code is written.`
New: `We turn the audit into a tight scope. What gets fixed first for the fastest impact, what gets restructured, and what gets cut. One document, no ambiguity. You sign off before we write a line of code.`

**Step 02 delivery label:**
Old: `Delivery: Action plan + timeline`
New: `Delivery: Action plan + timeline, within 3 days`

**Step 03 body (p):**
Old: `Design, copy architecture, and engineering run in parallel. You don't live in endless feedback cycles—we present when there's something real to review. Every decision is tied back to the original brief, not preference.`
New: `Design, copy, and engineering run in parallel. We don't drag you into endless feedback loops. We show you work when there's something real to review. Every decision ties back to the brief, not personal taste.`

**Step 03 delivery label:**
Old: `Delivery: Staging environment`
New: `Delivery: Staging environment, week 2 to 3`

**Step 04 headline (h3):**
Old: `We ship—and you<br><em>can actually measure it.</em>`
New: `We ship, and you<br><em>can actually measure it.</em>`

**Step 04 body (p):**
Old: `Launch happens with tracking already configured—session heatmaps, conversion events, form completion rates. You'll know within the first week whether the site is pulling its weight.`
New: `Launch comes with tracking already configured. Session heatmaps, conversion events, form completion rates. You'll know within the first week if the site is pulling its weight.`

**Step 04 delivery label:**
Old: `Delivery: Live site + analytics setup`
New: `Delivery: Live site + analytics setup, week 4 to 5`

**Process closing headline:**
Old: `Most sites lose leads<br><em class="text-vw-accent">before they say a word.</em>`
New: `Most sites lose the lead<br><em class="text-vw-accent">before a single word gets read.</em>`

**Process closing body:**
Old: `The teardown takes 15 minutes. You'll leave knowing exactly what's bleeding pipeline — at no cost.`
New: `The diagnosis takes 15 minutes. You'll leave knowing exactly what's costing you leads. No charge.`

**Process closing CTA button:**
Old: `Book a 15-min teardown`
New: `Get a free 15-minute diagnosis`

**Process closing micro-copy:**
Old: `No pitch. No retainer trap. Just a honest read of your site.`
New: `No pitch. No retainer trap. Just an honest read of your site.`

---

### FAQ section

**Section subhead (p):**
Old: `Everything you'd want to know before committing fifteen minutes of your time.`
New: `Everything you'd want to know before giving us fifteen minutes of your time.`

**FAQ 1 answer:**
Old: `Most projects go live in 3–5 weeks from signed brief. We don't batch projects — when you're in, you're the focus. The teardown and plan phases move fast because we're not doing discovery theater. If you have a hard deadline, tell us upfront and we'll tell you honestly whether we can hit it.`
New: `Most projects go live in 3 to 5 weeks from signed brief. We don't batch work. When you're in, you're the focus. The diagnosis and planning phases move fast because we skip discovery theater. If you have a hard deadline, tell us upfront and we'll tell you honestly whether we can hit it.`

**FAQ 2 answer:**
Old: `We write it. Good structure with weak copy doesn't convert — we've seen that mistake too many times to leave it to chance. We interview you, pull your differentiators out, and write to a specific visitor intent. You review and adjust tone. We don't outsource this to templates or generic frameworks.`
New: `We write it. Good structure with weak copy doesn't convert, and we've seen that mistake too many times to leave it to chance. We interview you, pull out what makes you different, and write to a specific visitor intent. You review and adjust tone. We don't outsource this to templates or generic frameworks.`

**FAQ 3 answer:**
Old: `It depends on what your site needs to do. We're platform-agnostic by principle — Webflow for marketing sites that need editorial control, Next.js for product-adjacent builds, custom HTML/CSS for maximum performance. We won't lock you into a stack that serves us better than it serves you.`
New: `Depends on what your site needs to do. Webflow for marketing sites that need editorial control. Next.js for product-adjacent builds. Custom HTML/CSS for maximum performance. We won't lock you into a stack that serves us better than it serves you.`

**FAQ 4 question text:**
Old: `What if I already have a site — do you start from scratch?`
New: `What if I already have a site? Do you start from scratch?`

**FAQ 4 answer:**
Old: `Not automatically. The teardown determines that. Some sites need a full rebuild — wrong structure, bad CMS, fundamentally broken mobile. Others just need better copy, a tighter above-the-fold, and one clean CTA path. We'll tell you exactly what's warranted, not what maximizes our scope.`
New: `Not automatically. The diagnosis determines that. Some sites need a full rebuild: wrong structure, bad CMS, broken mobile. Others just need better copy, a tighter above-the-fold, and one clean CTA path. We'll tell you what's actually warranted, not what maximizes our invoice.`

**FAQ 5 answer:**
Old: `Freelancers tend to execute what you ask. Agencies tend to sell what they have. We start with what's actually leaking revenue and work backward from there. You get a small senior team without account management layers — and a scope written around your conversion problem, not your visual preferences.`
New: `Freelancers execute what you ask for. Agencies sell what they already have. We start with what's actually costing you revenue and work backward. You get a small senior team with no account management layers, and a scope written around your conversion problem, not your visual preferences.`

**FAQ 6 answer:**
Old: `We share screen, walk your site live, and flag the top conversion blockers in real time — CTA clarity, trust signal placement, form friction, load issues, mobile gaps. You'll leave with a prioritized list of what to fix first, whether you hire us or not. No pitch. No slide deck. Just a read.`
New: `We share screen, walk your site live, and flag the top conversion blockers in real time. CTA clarity, trust signal placement, form friction, load issues, mobile gaps. You leave with a prioritized fix list, whether you hire us or not. No pitch. No slide deck. Just a straight read.`

**Add two new FAQ items after FAQ 6.** Follow the exact same HTML structure as the existing FAQ items. Use the same classes, same SVG toggle icon, same `data-faq` attribute.

**New FAQ 7:**
Number: `07`
Question: `How much does this cost?`
Answer: `A site checkup is $350. A single landing page runs $750 to $1,200. A homepage redesign is $1,500 to $2,800. A full website with up to 6 pages runs $3,000 to $5,000. If you also need branding, the full package is $4,500 to $8,000. We publish our prices because we don't want to waste your time or ours. You get an exact number before any work begins.`

**New FAQ 8:**
Number: `08`
Question: `I just paid someone to redo my site. Do I really need another rebuild?`
Answer: `Maybe not. A lot of recent redesigns look fine but weren't built for conversion. If the structure is solid, we can often fix the copy, CTA flow, and trust placement without starting from scratch. The diagnosis will tell you exactly what's worth keeping and what isn't.`

---

### Final CTA section

**Headline (h2):**
Old: `Want more calls<br><em class="text-vw-accent">and quote requests?</em>`
New: `Your next client is on your site right now.<br><em class="text-vw-accent">What do they see?</em>`

**Body (p):**
Old: `We'll read your current site live, flag what's blocking conversions, and map out what to fix first. You keep the diagnosis either way.`
New: `In 15 minutes we'll show you exactly where your site is losing that lead. No cost, no commitment. You keep the diagnosis either way.`

**CTA button text:**
Old: `Book a 15-min teardown`
New: `Get my free diagnosis`

**CTA micro-copy:**
Old: `Clear next steps within 24h. No spam.`
New: `You get a fix list within 24h. Hire us or don't.`

---

### Footer

**Brand description (p):**
Old: `We build websites that turn visitors into calls. Design, copy, and engineering — under one brief.`
New: `We build websites that turn visitors into calls. Design, copy, and engineering under one brief.`

---

## After all replacements

1. Search the entire file for any remaining `—` (em-dash), `&mdash;`, or `&rarr;` in visible text content (not inside HTML comments or JS code). Remove or replace any you find.
2. Verify the two new FAQ items render correctly with the accordion behavior.
3. Confirm no HTML structure, classes, IDs, or JavaScript was altered.

---

## Part 2: Other pages

After index.html is done, apply these changes to services.html, packages.html, studio.html, and work.html:

1. Replace every em-dash (`—`, ` — `, `&mdash;`) in visible text with a period, comma, or restructured sentence.
2. Replace every `&rarr;` or `→` in visible copy with a comma or period.
3. Replace "Book a Teardown" or "Book a 15-min teardown" with "Get a free 15-minute diagnosis" wherever it appears as a CTA.
4. Replace "teardown" with "diagnosis" in any user-facing copy (not in code comments or variable names).
5. Update any meta title that contains `—` to use `|` instead.
6. Fix "a honest" to "an honest" wherever it appears.

---

## Part 3: Pricing page (vellumwire-pricing.html)

This is a standalone pricing page. Apply these copy fixes to the JavaScript data object and the static HTML:

**Page title:**
Old: `Vellumwire — Services & Pricing`
New: `Vellumwire | Services & Pricing`

**Page subtitle (p.page-sub):**
Old: `Design, copy, and code — one team, one price. Senior quality at competitive rates. We're lean, fast, and building our name.`
New: `Design, copy, and code. One team, one price. Senior quality at competitive rates. We're lean, fast, and building our name.`

**In the JS data array, item 01 pitch:**
Old: `A focused teardown of what's not working on your site. You get a video walkthrough and a prioritized fix list — not a generic report.`
New: `A focused diagnosis of what's not working on your site. You get a video walkthrough and a prioritized fix list. Not a generic report.`

**In the JS data array, item 03 pitch:**
Old: `Your homepage rebuilt so visitors instantly get what you do, trust you, and know what to do next. Design, copy, and code — all included.`
New: `Your homepage rebuilt so visitors instantly get what you do, trust you, and know what to do next. Design, copy, and code, all included.`

**In the JS data array, item 05 pitch:**
Old: `New brand, new site, one process. Our branding partner builds your identity, we design and code a site that matches — no Frankenstein result.`
New: `New brand, new site, one process. Our branding partner builds your identity, we design and code a site that matches. No Frankenstein result.`

**Rate note (p.rate-note):**
Old: `At $40/hr, a $2,800 homepage redesign = 70 hrs of work. In reais at R$ 5.80, that's R$ 16,240 — nearly 2× what we'd charge locally for the same project. As portfolio grows, target rate moves to $50–65/hr.`
New: `At $40/hr, a $2,800 homepage redesign = 70 hrs of work. In reais at R$ 5.80, that's R$ 16,240, nearly 2x what we'd charge locally for the same project. As portfolio grows, target rate moves to $50 to $65/hr.`

**Add a new section to the JS data array, after the "Ongoing" section.** Add it as a new section label `"Post-launch"` followed by a new card:

```javascript
{ type: "section", label: "Post-launch" },
{
  n: "07", t: "Domain, DNS & deployment", tag: "Go live", tc: "tag-green",
  p: "$150 – $300", pn: "one-time setup", ft: false,
  pitch: "We handle the boring part. Domain registration, DNS config, SSL, email forwarding, and deployment to your hosting. You don't touch a single settings panel.",
  del: [
    "Domain purchase + configuration",
    "DNS setup (A records, CNAME, MX)",
    "SSL certificate (HTTPS)",
    "Email forwarding or custom email setup",
    "Deployment to Vercel, Netlify, or your host",
    "Post-deploy verification and speed check"
  ],
  who: [
    "You just got a new site and need it live",
    "You want to move to a new domain",
    "DNS and hosting gives you a headache"
  ],
  hrs: "3–6 hrs", eta: "1–2 business days"
}
```

Also scan the entire pricing page for any remaining `—` or `→` in visible text and replace them.
