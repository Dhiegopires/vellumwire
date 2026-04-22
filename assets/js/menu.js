(function () {
    var CSS = `
        #vw-menu-overlay {
            position: fixed;
            inset: 0;
            z-index: 100;
            background: #0a0a0a;
            clip-path: inset(0 0 100% 0);
            transition: clip-path 0.75s cubic-bezier(0.76, 0, 0.24, 1);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 6rem 2.5rem 2.5rem;
            pointer-events: none;
            overflow: hidden;
        }
        @media (min-width: 768px) {
            #vw-menu-overlay { padding: 7rem 5rem 3.5rem; }
        }
        @media (min-width: 1024px) {
            #vw-menu-overlay { padding: 7rem 6rem 4rem; }
        }
        body.menu-open #vw-menu-overlay {
            clip-path: inset(0 0 0% 0);
            pointer-events: all;
        }
        /* Inner: natural height, pushed to bottom by overlay's justify-end */
        #vw-menu-overlay .vw-menu-inner {
            display: flex;
            flex-direction: column;
        }
        #vw-menu-overlay .vw-menu-links {
            list-style: none;
            margin: 0 0 2.5rem 0;
            padding: 0;
        }
        #vw-menu-overlay .vw-menu-links li {
            overflow: hidden;
        }
        #vw-menu-overlay .vw-menu-links a {
            display: flex;
            align-items: flex-end;
            gap: 0.75rem;
            font-family: 'Instrument Serif', Georgia, serif;
            font-size: min(clamp(2.25rem, 5vw, 5rem), 9.5vh);
            line-height: 1.05;
            color: #f0ebe1;
            text-decoration: none;
            letter-spacing: -0.02em;
            transform: translateY(110%);
            transition: transform 0.65s cubic-bezier(0.76, 0, 0.24, 1),
                        color 0.25s ease;
            will-change: transform;
        }
        #vw-menu-overlay .vw-menu-links a:hover {
            color: rgba(240,235,225,0.45);
        }
        body.menu-open #vw-menu-overlay .vw-menu-links a {
            transform: translateY(0);
        }
        #vw-menu-overlay .vw-menu-links li:nth-child(1) a { transition-delay: 0.08s, 0s; }
        #vw-menu-overlay .vw-menu-links li:nth-child(2) a { transition-delay: 0.14s, 0s; }
        #vw-menu-overlay .vw-menu-links li:nth-child(3) a { transition-delay: 0.20s, 0s; }
        #vw-menu-overlay .vw-menu-links li:nth-child(4) a { transition-delay: 0.26s, 0s; }
        #vw-menu-overlay .vw-menu-links li:nth-child(5) a { transition-delay: 0.32s, 0s; }
        #vw-menu-overlay .vw-menu-links li:nth-child(6) a { transition-delay: 0.38s, 0s; }
        #vw-menu-overlay .vw-menu-links li:nth-child(7) a { transition-delay: 0.44s, 0s; }
        /* Number index */
        #vw-menu-overlay .vw-menu-links .link-num {
            font-family: 'DM Mono', 'Courier New', monospace;
            font-size: 0.6rem;
            letter-spacing: 0.12em;
            color: rgba(240,235,225,0.28);
            padding-bottom: 0.45em;
            min-width: 1.75rem;
            flex-shrink: 0;
        }
        /* Footer */
        #vw-menu-overlay .vw-menu-footer {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            border-top: 1px solid rgba(240,235,225,0.1);
            padding-top: 1.25rem;
            opacity: 0;
            transform: translateY(12px);
            transition: opacity 0.4s ease 0.48s, transform 0.4s ease 0.48s;
        }
        body.menu-open #vw-menu-overlay .vw-menu-footer {
            opacity: 1;
            transform: translateY(0);
        }
        @media (min-width: 640px) {
            #vw-menu-overlay .vw-menu-footer {
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
        }
        #vw-menu-overlay .vw-menu-footer a,
        #vw-menu-overlay .vw-menu-footer span {
            font-family: 'DM Mono', 'Courier New', monospace;
            font-size: 0.7rem;
            letter-spacing: 0.1em;
            color: rgba(240,235,225,0.35);
            text-decoration: none;
            text-transform: uppercase;
            transition: color 0.2s ease;
        }
        #vw-menu-overlay .vw-menu-footer a:hover {
            color: rgba(240,235,225,0.75);
        }
        #vw-menu-overlay .vw-menu-footer .vw-menu-social {
            display: flex;
            gap: 1.5rem;
        }
        /* Hamburger → X */
        nav .vw-menu-btn span {
            transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1),
                        opacity 0.25s ease,
                        width 0.35s cubic-bezier(0.76, 0, 0.24, 1);
            transform-origin: center center;
        }
        body.menu-open nav .vw-menu-btn span {
            align-self: center !important;
            width: 1.5rem !important;
        }
        body.menu-open nav .vw-menu-btn span:nth-child(1) {
            transform: translateY(7.5px) rotate(45deg);
        }
        body.menu-open nav .vw-menu-btn span:nth-child(2) {
            opacity: 0;
            width: 0 !important;
            transform: scaleX(0);
        }
        body.menu-open nav .vw-menu-btn span:nth-child(3) {
            transform: translateY(-7.5px) rotate(-45deg);
        }
        /* Keep nav readable above overlay */
        body.menu-open nav {
            z-index: 110 !important;
            mix-blend-mode: normal !important;
        }
        body.menu-open nav .vw-menu-btn span {
            background-color: #f0ebe1 !important;
        }
        body.menu-open nav a[aria-label] svg {
            fill: #f0ebe1 !important;
        }
        /* Noise texture */
        #vw-menu-overlay::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
            pointer-events: none;
        }
    `;

    var links = [
        { num: '01', label: 'Home',     href: '/' },
        { num: '02', label: 'Work',     href: '/work' },
        { num: '03', label: 'Services', href: '/services' },
        { num: '04', label: 'Packages', href: '/packages' },
        { num: '05', label: 'Insights', href: '/insights' },
        { num: '06', label: 'Studio',   href: '/studio' },
        { num: '07', label: 'Contact',  href: '/contact' },
    ];

    function init() {
        var style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        var overlay = document.createElement('div');
        overlay.id = 'vw-menu-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', 'Navigation menu');

        var inner = document.createElement('div');
        inner.className = 'vw-menu-inner';

        var ul = document.createElement('ul');
        ul.className = 'vw-menu-links';
        links.forEach(function (item) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = item.href;
            a.innerHTML = '<span class="link-num">' + item.num + '</span>' + item.label;
            a.addEventListener('click', closeMenu);
            li.appendChild(a);
            ul.appendChild(li);
        });

        var footer = document.createElement('div');
        footer.className = 'vw-menu-footer';

        var email = document.createElement('a');
        email.href = 'mailto:hello@vellumwire.com';
        email.textContent = 'hello@vellumwire.com';

        var social = document.createElement('div');
        social.className = 'vw-menu-social';
        [
            { label: 'Instagram', href: 'https://instagram.com/vellumwire' },
            { label: 'LinkedIn',  href: 'https://linkedin.com/company/vellumwire' },
        ].forEach(function (s) {
            var a = document.createElement('a');
            a.href = s.href;
            a.textContent = s.label;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            social.appendChild(a);
        });

        var loc = document.createElement('span');
        loc.textContent = 'São Paulo, BR';

        footer.appendChild(email);
        footer.appendChild(social);
        footer.appendChild(loc);

        inner.appendChild(ul);
        inner.appendChild(footer);
        overlay.appendChild(inner);
        document.body.appendChild(overlay);

        var btn = document.querySelector('nav button[aria-label="Open menu"]');
        if (btn) {
            btn.classList.add('vw-menu-btn');
            btn.addEventListener('click', toggleMenu);
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && document.body.classList.contains('menu-open')) closeMenu();
        });
    }

    function toggleMenu() {
        document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
    }

    function openMenu() {
        document.body.classList.add('menu-open');
        document.getElementById('vw-menu-overlay').setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        var btn = document.querySelector('nav button.vw-menu-btn');
        if (btn) btn.setAttribute('aria-label', 'Close menu');
    }

    function closeMenu() {
        document.body.classList.remove('menu-open');
        document.getElementById('vw-menu-overlay').setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        var btn = document.querySelector('nav button.vw-menu-btn');
        if (btn) btn.setAttribute('aria-label', 'Open menu');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
