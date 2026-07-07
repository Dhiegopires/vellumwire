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

// Real conversion completion: Calendly's popup widget posts a message to the
// parent window once a visitor actually confirms a slot. A click on the link
// that opens the widget is only intent (cta_click above) - this is the event
// that means a booking actually happened.
window.addEventListener('message', function (e) {
    if (e.origin !== 'https://calendly.com') return;
    if (typeof e.data !== 'object' || !e.data || typeof e.data.event !== 'string') return;
    if (e.data.event !== 'calendly.event_scheduled') return;
    if (typeof gtag !== 'function') return;

    gtag('event', 'generate_lead', {
        event_category: 'cta',
        event_label: 'calendly_booking',
        page_path: window.location.pathname
    });
});
