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
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(12,11,9,0.85);' +
        'display:flex;align-items:center;justify-content:center;';

    var panel = document.createElement('div');
    // 1050px+ matters, not just an arbitrary size bump: below Calendly's own
    // ~1000px internal breakpoint their embed stacks the details panel above
    // the calendar instead of beside it, which is what was pushing the actual
    // time-slot picker down and forcing extra scroll to reach it.
    panel.style.cssText = 'position:relative;width:100%;height:100%;max-width:1080px;max-height:760px;' +
        'margin:0;background:#0c0b09;border:0;display:flex;flex-direction:column;overflow:hidden;';
    // Desktop gets breathing room and a frame; mobile stays edge-to-edge (booking flow needs the space).
    var mq = window.matchMedia('(min-width: 640px)');
    if (mq.matches) {
        panel.style.width = 'calc(100% - 48px)';
        panel.style.height = 'calc(100% - 48px)';
        panel.style.border = '1px solid rgba(255,255,255,0.12)';
    }

    var header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;' +
        'padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.12);flex-shrink:0;background:#0c0b09;';

    var label = document.createElement('span');
    label.textContent = 'Book a 30-min call';
    label.style.cssText = 'font-family:monospace;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8a8680;';

    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Close scheduling window');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = 'width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.25);' +
        'background:transparent;color:#ede9e2;font-size:22px;line-height:1;cursor:pointer;flex-shrink:0;' +
        'display:flex;align-items:center;justify-content:center;transition:background 0.2s,color 0.2s,border-color 0.2s;';
    closeBtn.onmouseover = function () { closeBtn.style.background = '#c6f135'; closeBtn.style.color = '#0c0b09'; closeBtn.style.borderColor = '#c6f135'; };
    closeBtn.onmouseout = function () { closeBtn.style.background = 'transparent'; closeBtn.style.color = '#ede9e2'; closeBtn.style.borderColor = 'rgba(255,255,255,0.25)'; };

    var widgetWrap = document.createElement('div');
    widgetWrap.style.cssText = 'flex:1;min-height:0;position:relative;background:#0c0b09;';

    var loading = document.createElement('div');
    loading.textContent = 'Loading…';
    loading.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;' +
        'color:#8a8680;font-family:monospace;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;pointer-events:none;';
    widgetWrap.appendChild(loading);

    header.appendChild(label);
    header.appendChild(closeBtn);
    panel.appendChild(header);
    panel.appendChild(widgetWrap);
    overlay.appendChild(panel);

    function closeModal() {
        overlay.remove();
        document.body.style.overflow = '';
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

    document.body.style.overflow = 'hidden';
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
            frame.style.cssText = 'width:100%;height:100%;border:0;';
            frame.addEventListener('load', function () { loading.remove(); });
        }
    }, 50);

    return false;
}
