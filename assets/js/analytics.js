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

// Calendly.initPopupWidget() renders Calendly's own overlay chrome (close
// button, backdrop) styled entirely by their external widget.css - slow to
// load, not ours to control, and the close button ends up floating in a
// screen corner disconnected from the booking window itself. Instead this
// builds a modal we fully own (dark, matches the site, close button attached
// to the header right above the booking widget) and renders Calendly's
// booking iframe INSIDE it via Calendly.initInlineWidget() - the official
// "embed in my own container" API, not a hand-built iframe, so Calendly's
// postMessage tracking (calendly.event_scheduled -> generate_lead below)
// keeps working exactly as before.
function openCalendlyPopup(url) {
    if (typeof Calendly === 'undefined' || typeof Calendly.initInlineWidget !== 'function') {
        // widget.js hasn't loaded yet - let the link's real href/target open
        // Calendly directly instead of doing nothing.
        return true;
    }

    // Calendly's own embed color params - doesn't reskin every pixel (some
    // Calendly-branded chrome stays their default), but backgrounds/text/
    // accent match the site instead of a jarring white flash.
    var themedUrl = url + (url.indexOf('?') === -1 ? '?' : '&') +
        'background_color=0c0b09&text_color=ede9e2&primary_color=c6f135';

    var overlay = document.createElement('div');
    overlay.id = 'vw-calendly-modal';
    overlay.className = 'vw-calendly-overlay';

    var panel = document.createElement('div');
    panel.className = 'vw-calendly-panel';

    var header = document.createElement('div');
    header.className = 'vw-calendly-header';

    var label = document.createElement('span');
    label.textContent = 'Book a 30-min call';
    label.className = 'vw-calendly-label';

    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Close scheduling window');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'vw-calendly-close';

    var widgetWrap = document.createElement('div');
    widgetWrap.className = 'vw-calendly-widget-wrap';

    var loading = document.createElement('div');
    loading.textContent = 'Loading…';
    loading.className = 'vw-calendly-loading';
    widgetWrap.appendChild(loading);

    header.appendChild(label);
    header.appendChild(closeBtn);
    panel.appendChild(header);
    panel.appendChild(widgetWrap);
    overlay.appendChild(panel);

    function closeModal() {
        overlay.remove();
        document.body.classList.remove('vw-modal-open');
        document.removeEventListener('keydown', escHandler);
    }
    function escHandler(e) {
        if (e.key === 'Escape') closeModal();
    }
    closeBtn.onclick = closeModal;
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', escHandler);

    document.body.classList.add('vw-modal-open');
    document.body.appendChild(overlay);

    Calendly.initInlineWidget({
        url: themedUrl,
        parentElement: widgetWrap,
        resize: false
    });

    // Calendly's iframe removes our "Loading..." text once it's actually
    // ready to show something (checked via the iframe simply existing).
    var waitForIframe = setInterval(function () {
        var frame = widgetWrap.querySelector('iframe');
        if (frame) {
            clearInterval(waitForIframe);
            frame.classList.add('vw-calendly-iframe');
            frame.addEventListener('load', function () { loading.remove(); });
        }
    }, 50);

    return false;
}
