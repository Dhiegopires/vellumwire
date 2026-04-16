# SEO & Marketing — Deep Reference

## Table of Contents
1. Technical SEO Checklist
2. On-Page SEO
3. Content Strategy
4. Search Intent Mapping
5. Structured Data (JSON-LD)
6. Local SEO
7. Link Strategy
8. Core Web Vitals & Page Experience
9. Analytics & Conversion Tracking
10. Landing Page Optimization
11. Funnel Architecture
12. Email Capture Strategy
13. Social & Open Graph

---

## 1. Technical SEO Checklist

### Crawlability
- [ ] `robots.txt` properly configured (not blocking critical resources)
- [ ] XML sitemap submitted (`/sitemap.xml`), auto-updated, < 50,000 URLs per file
- [ ] No orphan pages (every page reachable from internal links)
- [ ] Crawl budget optimized: block low-value pages (faceted nav, search results, tag pages)
- [ ] Clean URL structure: `domain.com/services/web-design` not `domain.com/page?id=47`
- [ ] No redirect chains (A→B→C→D) — max 1 hop
- [ ] 404 pages return proper 404 status (not soft 404 with 200)
- [ ] Server response time < 200ms (TTFB)

### Indexation
- [ ] Canonical URLs set on every page (`<link rel="canonical" href="...">`)
- [ ] No duplicate content (www vs non-www, http vs https, trailing slash)
- [ ] `noindex` on pages that shouldn't rank (thank-you pages, admin, staging)
- [ ] Hreflang tags for multi-language sites
- [ ] Pagination handled correctly (`rel="next"` / `rel="prev"` or infinite scroll with crawlable links)

### Security & Protocol
- [ ] HTTPS everywhere (no mixed content)
- [ ] HTTP → HTTPS redirect in place
- [ ] Security headers: HSTS, X-Content-Type-Options, X-Frame-Options

### Mobile
- [ ] Mobile-friendly design (passes Google's mobile-friendly test)
- [ ] Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] No horizontal scrolling
- [ ] Touch targets ≥ 48px with adequate spacing
- [ ] Text readable without zooming (base font ≥ 16px)

---

## 2. On-Page SEO

### Title Tag
- 50–60 characters (Google truncates at ~60)
- Primary keyword near the front
- Brand name at the end (if room): "Web Design for Law Firms | Vellumwire"
- Unique per page — no duplicates across the site
- Compelling: it's an ad in the search results

### Meta Description
- 120–155 characters
- Includes primary keyword naturally
- Contains a call-to-action or value proposition
- Unique per page
- Not a keyword dump — it's sales copy for the SERP

### Heading Structure
```
<h1>Primary Topic / Page Title (one per page)</h1>
  <h2>Major Section</h2>
    <h3>Sub-section</h3>
    <h3>Sub-section</h3>
  <h2>Major Section</h2>
    <h3>Sub-section</h3>
```
- One `<h1>` per page, containing the primary keyword
- `<h2>` for major sections — use keywords and variations naturally
- Never skip levels (h1 → h3)
- Headings are for structure, not for styling

### Content Optimization
- Primary keyword in: h1, first 100 words, 1-2 h2s, meta description, alt text
- Semantic variations and related terms throughout (LSI keywords)
- Internal links to relevant pages (2-5 per 1000 words)
- External links to authoritative sources (1-3 per article)
- Content length: match the intent (500 words for simple queries, 2000+ for comprehensive guides)
- Answer the search intent completely — don't thin-spread

### Image SEO
- Descriptive filenames: `web-design-law-firm.webp` not `IMG_4532.jpg`
- Meaningful alt text: describes the image content (not keyword stuffing)
- Compressed: WebP/AVIF, < 200KB for hero images, < 100KB for inline
- Explicit `width` and `height` attributes (prevents CLS)
- Lazy loading for below-fold images

---

## 3. Content Strategy

### Topic Cluster Model

Organize content around pillar pages and supporting clusters:

```
Pillar Page: "Website Conversion Optimization"
  └── Cluster: "How to Write Headlines That Convert"
  └── Cluster: "CTA Button Best Practices"
  └── Cluster: "Landing Page Design Principles"
  └── Cluster: "A/B Testing Guide for Beginners"
  └── Cluster: "Trust Signals That Increase Conversion"
```

Each cluster page links back to the pillar. The pillar links to all clusters. This builds topical authority.

### Content Gap Analysis

1. List your target keywords
2. Search each one — what's ranking on page 1?
3. What do the top results cover that you don't?
4. What do they miss that you can uniquely provide?
5. Build content that's either: **more comprehensive**, **more actionable**, **more current**, or **a different angle**

### Content Calendar Principles
- Consistency > frequency (weekly > random bursts)
- Mix: 60% educational, 20% case studies/proof, 20% opinion/thought leadership
- Update existing high-performing content (every 6-12 months)
- Repurpose: blog → social snippets → email → video script

---

## 4. Search Intent Mapping

Every search has an intent. Match it or lose the click.

| Intent | Signal Words | What to Create |
|--------|-------------|----------------|
| **Informational** | "how to", "what is", "guide", "tips" | Blog post, guide, tutorial |
| **Navigational** | brand name, "login", "pricing page" | Ensure your pages rank for your brand |
| **Commercial** | "best", "vs", "review", "comparison" | Comparison page, review, buying guide |
| **Transactional** | "buy", "pricing", "sign up", "book" | Product/service page, pricing page, landing page |

### Intent Matching Checklist
- [ ] Search the keyword — what format are the top results? (listicle, guide, video, tool)
- [ ] Match the format (Google has already validated what users want)
- [ ] Match the depth (short answer vs. comprehensive guide)
- [ ] Match the freshness (some intents require recent content)
- [ ] Consider SERP features: featured snippet, video carousel, local pack, People Also Ask

---

## 5. Structured Data (JSON-LD)

Add structured data to help Google understand and display your content.

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/example",
    "https://linkedin.com/company/example"
  ]
}
```

### Local Business

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Company Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "BR"
  },
  "telephone": "+55-41-1234-5678",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
}
```

### FAQ Page

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How fast can you ship?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most projects launch in 4-6 weeks from kickoff."
      }
    }
  ]
}
```

### Breadcrumb

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://example.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Web Design" }
  ]
}
```

### Article / Blog Post

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2026-04-01",
  "dateModified": "2026-04-15",
  "image": "https://example.com/article-image.webp",
  "publisher": {
    "@type": "Organization",
    "name": "Company Name",
    "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" }
  }
}
```

---

## 6. Local SEO

For businesses serving a geographic area:

- **Google Business Profile**: complete, verified, updated regularly
- **NAP consistency**: Name, Address, Phone identical everywhere (site, GBP, directories)
- **Local keywords**: "web design Curitiba" in title, h1, content naturally
- **Local structured data**: LocalBusiness schema with address, hours, phone
- **Reviews**: actively solicit Google reviews, respond to all
- **Local content**: create content about your area/market
- **Citations**: consistent listings in relevant directories

---

## 7. Link Strategy

### Internal Linking
- Every page should be reachable within 3 clicks from the homepage
- Link from high-authority pages to important target pages
- Use descriptive anchor text (not "click here")
- 2-5 internal links per 1000 words of content
- Link new content to existing relevant content (and vice versa)

### Earning External Links
- Create genuinely useful content (research, tools, comprehensive guides)
- Original data or research gets linked naturally
- Expert roundups and original takes get shared
- Guest posts on relevant, quality sites (not link farms)
- Digital PR: newsworthy stories, data visualizations, industry reports
- **Never**: buy links, participate in link schemes, use PBNs

---

## 8. Core Web Vitals & Page Experience

### Google's Page Experience Signals
1. Core Web Vitals (LCP, FID/INP, CLS)
2. Mobile-friendly
3. HTTPS
4. No intrusive interstitials (popups that block content on mobile)

### How to Improve Each Metric

**LCP (Largest Contentful Paint) < 2.5s**:
- Optimize largest image (compress, correct format, preload)
- Eliminate render-blocking resources (inline critical CSS, defer JS)
- Preconnect to critical origins
- Server response time < 200ms

**CLS (Cumulative Layout Shift) < 0.1**:
- Explicit width/height on images and videos
- Reserve space for ads and embeds
- No dynamically injected content above existing content
- Font `font-display: swap` with matched fallback metrics

**INP (Interaction to Next Paint) < 200ms**:
- Break up long JS tasks (yield to main thread)
- Debounce input handlers
- Use `requestAnimationFrame` for visual updates
- Minimize DOM size

---

## 9. Analytics & Conversion Tracking

### GA4 Setup Checklist
- [ ] GA4 property created
- [ ] Data stream configured
- [ ] Enhanced measurement enabled (scroll, outbound clicks, site search, file downloads)
- [ ] Conversion events defined (form submission, CTA click, phone click)
- [ ] Cross-domain tracking if applicable
- [ ] Internal traffic filtered
- [ ] Data retention set to 14 months

### Key Events to Track
- **Page view** (automatic)
- **CTA click** — primary and secondary
- **Form submission** — start, complete, abandon
- **Phone/email click** — tel: and mailto: links
- **Scroll depth** — 25%, 50%, 75%, 90%
- **Time on page** — engagement threshold (30s+)
- **Video engagement** — play, 25%, 50%, 75%, complete

### Conversion Funnel Tracking

```
Landing page view
  → CTA click (intent signal)
    → Form interaction (engagement signal)
      → Form submission (conversion)
        → Thank-you page (confirmation)
```

Track drop-off between each step. The biggest gap = the biggest opportunity.

---

## 10. Landing Page Optimization

### Above-the-Fold Checklist
- [ ] Headline communicates value in < 5 seconds
- [ ] Subhead qualifies the audience or adds specificity
- [ ] Primary CTA visible without scrolling
- [ ] Trust signal present (logos, numbers, short testimonial)
- [ ] No navigation (for dedicated landing pages — minimize escape routes)

### Social Proof Hierarchy (strongest → weakest)
1. Specific results with numbers — "Doubled leads in 60 days"
2. Named testimonials with photo + company — "Jane, CEO at Acme"
3. Client logos (especially recognizable ones)
4. Aggregate numbers — "Trusted by 500+ companies"
5. Star ratings — "4.9/5 from 200+ reviews"
6. Media mentions — "As seen in Forbes"

### Landing Page Formula
```
Hero: Headline + Subhead + CTA + Trust signal
Social proof bar
Problem section (name the pain)
Solution section (your approach)
Benefits (3-4, outcome-focused)
How it works (3-step process)
Deeper social proof (testimonials, case study)
Objection handling (FAQ)
Final CTA (repeat primary action)
```

---

## 11. Funnel Architecture

### Awareness → Consideration → Decision

| Stage | Content Type | CTA |
|-------|-------------|-----|
| Awareness | Blog, social, ads, SEO | "Read the guide" / "Watch the breakdown" |
| Consideration | Case studies, comparisons, webinars | "Download the checklist" / "See examples" |
| Decision | Pricing, testimonials, free trial, consultation | "Book a call" / "Start free trial" |

### Lead Magnet Types (by value)
1. **Tool/template** — something they'll actually use (spreadsheet, checklist, calculator)
2. **Assessment** — personalized result ("Your website scores 34/100")
3. **Exclusive content** — research, data, insider knowledge
4. **Mini-course** — email sequence teaching something valuable
5. **eBook/guide** — comprehensive but specific (not generic)

### Lead Nurture Sequence
```
Day 0: Deliver the lead magnet + quick win
Day 2: Expand on the topic (teach)
Day 5: Case study (prove)
Day 8: Address common objection (reassure)
Day 12: Soft CTA (invite conversation)
Day 16: Direct CTA (make the offer)
```

---

## 12. Email Capture Strategy

### Principles
- Offer value equal to or greater than the effort of typing an email
- Be specific about what they'll receive: "Weekly 3-min teardown of real websites"
- Set frequency expectations: "Every Thursday"
- Remove risk: "Unsubscribe in one click. No spam."
- Place form at natural pause points (end of article, after value section, in sidebar)

### High-Converting Placement Patterns
1. **Inline content upgrade** — within a blog post, offering a related download
2. **Exit intent** — popup when cursor moves toward browser tab (desktop only)
3. **Scroll-triggered** — appears after 50-60% scroll (user is engaged)
4. **Sticky bar** — thin bar at top or bottom of page
5. **End of content** — after they've consumed the value

### Anti-Patterns to Avoid
- Popup on page load (before they've seen any content)
- Full-screen overlay on mobile
- No clear way to dismiss
- Requiring too much info (email is enough for newsletter)
- Vague promise ("Subscribe for updates" — updates about what?)

---

## 13. Social & Open Graph

### Essential Meta Tags

```html
<!-- Open Graph (Facebook, LinkedIn, etc.) -->
<meta property="og:title" content="Page Title — 60 chars max">
<meta property="og:description" content="Compelling description — 155 chars max">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Brand Name">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/twitter-image.jpg">
```

### OG Image Best Practices
- Size: 1200×630px (Facebook/LinkedIn), 1200×600px (Twitter)
- Include: headline text, brand logo, visual element
- High contrast: readable at small sizes (thumbnails)
- No critical content in the edges (platforms crop differently)
- Test with: [Facebook Debugger], [Twitter Card Validator], [LinkedIn Post Inspector]
