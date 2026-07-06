// GA4 conversion event tracking, shared across all pages.
// Delegated listener: catches every CTA that links to the contact form with a
// ?service= param, or directly to the Calendly booking link, so new CTAs are
// tracked automatically without extra wiring.
document.addEventListener('click', function (e) {
    if (typeof gtag !== 'function') return;

    var link = e.target.closest('a[href*="contact.html?service="], a[href*="calendly.com/dhiegopiresc"]');
    if (!link) return;

    var url = new URL(link.href, window.location.href);
    var service = url.searchParams.get('service') || (url.hostname.indexOf('calendly.com') !== -1 ? 'free-diagnosis' : null);

    gtag('event', 'cta_click', {
        service: service || '(none)',
        link_text: (link.textContent || '').trim().slice(0, 100),
        page_path: window.location.pathname
    });
});
