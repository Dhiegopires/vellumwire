(function () {
    var STORAGE_KEY = 'vw-lang';

    function getLang() {
        try { return localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) { return 'en'; }
    }

    function setLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    }

    function applyLang(lang) {
        var dict = window.VW_I18N || {};

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var entry = dict[el.getAttribute('data-i18n')];
            if (entry && entry[lang] !== undefined) el.textContent = entry[lang];
        });

        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var entry = dict[el.getAttribute('data-i18n-html')];
            if (entry && entry[lang] !== undefined) el.innerHTML = entry[lang];
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
            el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
                var parts = pair.split(':');
                var attr = parts[0], key = parts[1];
                var entry = dict[key];
                if (entry && entry[lang] !== undefined) el.setAttribute(attr, entry[lang]);
            });
        });

        document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

        document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
            btn.textContent = lang === 'en' ? 'PT' : 'EN';
            btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Portuguese' : 'Mudar para inglês');
        });

        if (typeof window.VW_MENU_SET_LANG === 'function') window.VW_MENU_SET_LANG(lang);
        if (typeof window.VW_RERENDER_PRICING === 'function') window.VW_RERENDER_PRICING(lang);
    }

    function toggleLang() {
        var next = getLang() === 'en' ? 'pt' : 'en';
        setLang(next);
        applyLang(next);
    }

    window.VW_I18N_APPLY = applyLang;
    window.VW_I18N_TOGGLE = toggleLang;
    window.VW_I18N_LANG = getLang;

    function ready() {
        applyLang(getLang());
        document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
            btn.addEventListener('click', toggleLang);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }
})();
