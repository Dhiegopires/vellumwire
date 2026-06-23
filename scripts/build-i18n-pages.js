// ONE-TIME migration script: converted the old JS-toggle (data-i18n attributes,
// single page per URL) architecture into two genuinely separate static page
// trees (EN at root, PT-BR mirrored under /pt/) for correct hreflang/SEO.
//
// It already ran. The EN root pages were overwritten in place (data-i18n
// attributes stripped, real <a> language link, hreflang tags) and are now
// the live source of truth; /pt/ pages are independent static files.
//
// Do NOT re-run this against the current root pages: they no longer carry
// data-i18n markup, so nothing would translate, and it would inject a
// duplicate window.VW_BASE_PATH script on each run. From here on, edit the
// EN and PT files directly and keep them in sync by hand. Kept only as a
// reference for how the split was generated (e.g. if a new page is added,
// you can temporarily mirror this pattern for it).
"use strict";

const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const ROOT = path.join(__dirname, "..");

// ---- load translation dictionary (build-time data source only) ----
global.window = {};
require(path.join(ROOT, "assets/js/i18n-dict.js"));
const DICT = global.window.VW_I18N;

// ---- pages to process (relative paths from repo root) ----
const PAGES = [
    "index.html",
    "work.html",
    "packages.html",
    "contact.html",
    "studio.html",
    "insights.html",
    "terms-of-use.html",
    "privacy-policy.html",
    "projects/harmon-and-vale.html",
    "projects/seloh.html",
    "projects/fiter/index.html",
];

// ---- per-page <title>/<meta description>/og: translations ----
const META = {
    "index.html": {
        title: { en: "Vellumwire | Websites That Generate Calls, Not Just Visits", pt: "Vellumwire | Sites Que Geram Ligações, Não Só Visitas" },
        desc: { en: "We redesign service-business websites for one outcome: more calls and quote requests. CTA structure, proof-based copy, and tracking built in. Live in 3 to 5 weeks.", pt: "Reformulamos sites de prestadores de serviço para um único objetivo: mais ligações e pedidos de cotação. Estrutura de CTA, copy baseado em prova e rastreamento já incluídos. No ar em 3 a 5 semanas." }
    },
    "work.html": {
        title: { en: "Case Studies: Websites Rebuilt for Conversion | Vellumwire", pt: "Cases: Sites Reconstruídos para Conversão | Vellumwire" },
        desc: { en: "Case studies and diagnoses from Vellumwire. Real service-business websites rebuilt for conversion. See what changed and what it produced.", pt: "Cases e diagnósticos da Vellumwire. Sites reais de prestadores de serviço reconstruídos para conversão. Veja o que mudou e o que isso produziu." }
    },
    "packages.html": {
        title: { en: "Web Design Packages & Pricing | Vellumwire", pt: "Pacotes e Preços de Web Design | Vellumwire" },
        desc: { en: "Transparent pricing for conversion-focused web projects. Three packages: Audit, Rebuild, Full Stack, scoped to your pipeline problem.", pt: "Preços transparentes para projetos web focados em conversão. Três pacotes: Auditoria, Reconstrução, Full Stack, ajustados ao seu problema de pipeline." }
    },
    "contact.html": {
        title: { en: "Contact Vellumwire — Book a Free Website Teardown", pt: "Contato Vellumwire — Agende uma Análise Gratuita do Seu Site" },
        desc: { en: "Ready to turn your website into a conversion machine? Book a free teardown session with Vellumwire. We audit your site, identify friction, and show exactly what to fix.", pt: "Pronto para transformar seu site em uma máquina de conversão? Agende uma análise gratuita com a Vellumwire. Auditamos seu site, identificamos atrito e mostramos exatamente o que corrigir." }
    },
    "studio.html": {
        title: { en: "About Vellumwire — Conversion Web Design Studio, Curitiba", pt: "Sobre a Vellumwire — Estúdio de Web Design Focado em Conversão, Curitiba" },
        desc: { en: "A small senior team in Curitiba building conversion-focused websites. No account managers. No layers. Design, copy, and engineering under one brief.", pt: "Um time sênior pequeno em Curitiba construindo sites focados em conversão. Sem gerentes de conta. Sem camadas. Design, copy e engenharia em um único briefing." }
    },
    "insights.html": {
        title: { en: "Web Design & Conversion Insights | Vellumwire", pt: "Insights de Web Design e Conversão | Vellumwire" },
        desc: { en: "Thoughts on web design, conversion, and building things that last. Written by the Vellumwire team.", pt: "Reflexões sobre web design, conversão e construir coisas que duram. Escrito pelo time da Vellumwire." }
    },
    "terms-of-use.html": {
        title: { en: "Terms of Use | Vellumwire", pt: "Termos de Uso | Vellumwire" },
        desc: { en: "Vellumwire Terms of Use, rules and guidelines for using our website and services.", pt: "Termos de Uso da Vellumwire, regras e diretrizes para usar nosso site e serviços." }
    },
    "privacy-policy.html": {
        title: { en: "Privacy Policy | Vellumwire", pt: "Política de Privacidade | Vellumwire" },
        desc: { en: "Vellumwire Privacy Policy. How we collect, use, and protect your data.", pt: "Política de Privacidade da Vellumwire. Como coletamos, usamos e protegemos seus dados." }
    },
    "projects/harmon-and-vale.html": {
        title: { en: "Harmon & Vale: Law Firm Website Redesign Case Study | Vellumwire", pt: "Harmon & Vale: Case de Redesign de Site para Escritório de Advocacia | Vellumwire" },
        desc: { en: "Harmon & Vale case study — a concept project showing how conversion-focused redesign transforms professional services websites. By Vellumwire.", pt: "Case Harmon & Vale — um projeto conceitual mostrando como o redesign focado em conversão transforma sites de serviços profissionais. Pela Vellumwire." }
    },
    "projects/seloh.html": {
        title: { en: "Selo H: Certification Platform Rebuild Case Study | Vellumwire", pt: "Selo H: Case de Reconstrução de Plataforma de Certificação | Vellumwire" },
        desc: { en: "How Vellumwire rebuilt seloh.org from a performance liability into a conversion-ready certification platform. Full case study.", pt: "Como a Vellumwire reconstruiu o seloh.org, transformando um passivo de performance em uma plataforma de certificação pronta para conversão. Case completo." }
    },
    "projects/fiter/index.html": {
        title: { en: "Fiter: Deeptech SaaS Website Strategy & Rebuild | Vellumwire", pt: "Fiter: Estratégia e Reconstrução de Site SaaS Deeptech | Vellumwire" },
        desc: { en: "How Vellumwire rebuilt Fiter's website — strategy, IA, and front-end — to reach enterprise B2B buyers. Full case study with deliverables and results.", pt: "Como a Vellumwire reconstruiu o site da Fiter — estratégia, IA e front-end — para alcançar compradores B2B corporativos. Case completo com entregas e resultados." }
    }
};

function depthOf(rel) {
    return rel.split("/").length - 1;
}

function upPath(depth) {
    return "../".repeat(depth);
}

function cleanUrl(rel) {
    let u = rel.replace(/index\.html$/, "").replace(/\.html$/, "");
    return u.replace(/\/$/, "");
}

// relative path from an EN file to its PT counterpart
function enToPtHref(rel) {
    const depth = depthOf(rel);
    return upPath(depth) + "pt/" + rel;
}

// relative path from a PT file to its EN counterpart
function ptToEnHref(rel) {
    const depthPt = depthOf(rel) + 1;
    return upPath(depthPt) + rel;
}

function get(key, lang) {
    const entry = DICT[key];
    if (!entry) throw new Error("Missing dict key: " + key);
    const v = entry[lang];
    if (v === undefined) throw new Error("Missing lang '" + lang + "' for key: " + key);
    return v;
}

function applyTranslations($, lang) {
    $("[data-i18n-attr]").each((_, el) => {
        const $el = $(el);
        const pairs = $el.attr("data-i18n-attr").split(",");
        pairs.forEach((pair) => {
            const [attr, key] = pair.split(":");
            $el.attr(attr.trim(), get(key.trim(), lang));
        });
        $el.removeAttr("data-i18n-attr");
    });

    $("[data-i18n]").each((_, el) => {
        const $el = $(el);
        $el.text(get($el.attr("data-i18n"), lang));
        $el.removeAttr("data-i18n");
    });

    $("[data-i18n-html]").each((_, el) => {
        const $el = $(el);
        $el.html(get($el.attr("data-i18n-html"), lang));
        $el.removeAttr("data-i18n-html");
    });
}

// Every relative reference that is NOT a link to one of these known pages
// points to a shared, non-mirrored resource (CSS/JS/SVG/images) living only
// outside the /pt/ tree, and needs one extra "../" in the PT build.
// Page links stay untouched because the whole site is mirrored 1:1 under /pt/.
const PAGE_NAMES = new Set([
    "index.html", "work.html", "packages.html", "contact.html", "studio.html",
    "insights.html", "terms-of-use.html", "privacy-policy.html",
    "projects/harmon-and-vale.html", "projects/seloh.html", "projects/fiter/index.html",
    "harmon-and-vale.html", "seloh.html", "fiter/index.html",
]);

function isPageLink(href) {
    if (!href) return false;
    if (/^(?:https?:|mailto:|tel:|#)/.test(href)) return false;
    const stripped = href.replace(/^(?:\.\.\/)*/, "").split("?")[0].split("#")[0];
    return PAGE_NAMES.has(stripped);
}

// Real relative-path resolution: resolves `href` against the directory the
// EN page lives in, then re-expresses that same absolute (site-root-relative)
// target as a path relative to the PT page's directory (one level deeper,
// under /pt/). A naive "prepend one ../" only works when the original
// reference is itself anchored at the site root (e.g. assets/...); local
// per-page resource folders (e.g. fiter's own img/) are anchored at the
// page's own directory instead, so the adjustment must be computed properly.
function dirPartsOf(rel) {
    const parts = rel.split("/");
    parts.pop();
    return parts;
}

function resolveAbsoluteParts(baseDirParts, href) {
    const dir = baseDirParts.slice();
    href.split("/").forEach((part) => {
        if (part === "" || part === ".") return;
        if (part === "..") dir.pop();
        else dir.push(part);
    });
    return dir;
}

function relativePathBetween(fromDirParts, toPartsAbsolute) {
    let i = 0;
    while (i < fromDirParts.length && i < toPartsAbsolute.length - 1 && fromDirParts[i] === toPartsAbsolute[i]) i++;
    const ups = fromDirParts.length - i;
    const downs = toPartsAbsolute.slice(i);
    return "../".repeat(ups) + downs.join("/");
}

function fixAssetPaths($, rel) {
    const enDirParts = dirPartsOf(rel);
    const ptDirParts = ["pt"].concat(enDirParts);

    $("[href], [src]").each((_, el) => {
        const $el = $(el);
        ["href", "src"].forEach((attr) => {
            const v = $el.attr(attr);
            if (!v || /^(?:https?:|mailto:|tel:|#)/.test(v) || isPageLink(v)) return;
            const absoluteParts = resolveAbsoluteParts(enDirParts, v);
            $el.attr(attr, relativePathBetween(ptDirParts, absoluteParts));
        });
    });
}

function removeI18nRuntimeScripts($) {
    $('script[src*="i18n-dict.js"], script[src*="i18n.js"]').remove();
}

function injectBasePathBeforeMenu($, basePath) {
    const menuScript = $('script[src*="menu.min.js"], script[src*="menu.js"]').first();
    if (menuScript.length) {
        menuScript.before(
            `<script>window.VW_BASE_PATH = ${JSON.stringify(basePath)};</script>\n    `
        );
    }
}

function setLangSwitcher($, lang, href) {
    const btn = $("button[data-lang-toggle]");
    if (!btn.length) return;
    const label = lang === "en" ? "PT" : "EN";
    const aria = lang === "en" ? "Mudar para português" : "Switch to English";
    const classes = btn.attr("class").replace(/\s*hover:cursor-pointer\s*/, " ").trim();
    const a = `<a href="${href}" class="${classes}" aria-label="${aria}">${label}</a>`;
    btn.replaceWith(a);
}

function setHreflangAndCanonical($, rel, lang) {
    const clean = cleanUrl(rel);
    const enUrl = "https://vellumwire.com/" + clean;
    const ptUrl = "https://vellumwire.com/pt/" + clean;

    $('link[rel="canonical"]').attr("href", lang === "en" ? enUrl : ptUrl);

    $('link[rel="alternate"]').remove();
    const head = $("head");
    head.append(`\n    <link rel="alternate" hreflang="en" href="${enUrl || "https://vellumwire.com/"}">`);
    head.append(`\n    <link rel="alternate" hreflang="pt-BR" href="${ptUrl}">`);
    head.append(`\n    <link rel="alternate" hreflang="x-default" href="${enUrl || "https://vellumwire.com/"}">`);

    $("html").attr("lang", lang === "en" ? "en" : "pt-BR");

    let ogLocale = $('meta[property="og:locale"]');
    if (!ogLocale.length) {
        head.append(`\n    <meta property="og:locale" content="${lang === "en" ? "en_US" : "pt_BR"}">`);
    } else {
        ogLocale.attr("content", lang === "en" ? "en_US" : "pt_BR");
    }
}

function setMeta($, rel, lang) {
    const m = META[rel];
    if (!m) return;
    $("title").text(m.title[lang]);
    $('meta[name="description"]').attr("content", m.desc[lang]);
    $('meta[property="og:title"]').attr("content", m.title[lang]);
    $('meta[property="og:description"]').attr("content", m.desc[lang]);
    $('meta[name="twitter:title"]').attr("content", m.title[lang]);
    $('meta[name="twitter:description"]').attr("content", m.desc[lang]);
}

// ---- per-file bespoke JS patches (dynamic strings that referenced the old runtime engine) ----
function patchPackagesScript(html, lang) {
    return html
        .replace(
            /\s*window\.VW_RERENDER_PRICING = renderPricing;\n/,
            "\n"
        )
        .replace(
            /renderPricing\(\(window\.VW_I18N_LANG && window\.VW_I18N_LANG\(\)\) \|\| 'en'\);/,
            `renderPricing(${JSON.stringify(lang)});`
        );
}

function patchContactScript(html, lang) {
    const sending = get("contact.form.sending", lang);
    const success = get("contact.form.success", lang);
    const error = get("contact.form.error", lang);
    const submit = get("contact.form.submit", lang);
    const selectOption = get("contact.form.select_option", lang);

    return html
        .replace(
            /function t\(key, fallback\) \{[\s\S]*?\n        \}\n\n/,
            ""
        )
        .replace(/t\('contact\.form\.sending', '[^']*'\)/, JSON.stringify(sending))
        .replace(/t\('contact\.form\.success', "[^"]*"\)/, JSON.stringify(success))
        .replace(/t\('contact\.form\.error', '[^']*'\)/, JSON.stringify(error))
        .replace(/t\('contact\.form\.submit', '[^']*'\)/, JSON.stringify(submit))
        .replace(/: 'Select an option';/, ": " + JSON.stringify(selectOption) + ";")
        .replace(/\s*valueEl\.removeAttribute\('data-i18n'\);\n/, "\n")
        .replace(/\s*valueEl\.setAttribute\('data-i18n', 'contact\.form\.select_option'\);\n/, "\n")
        .replace(/\s*submitBtn\.removeAttribute\('data-i18n'\);\n/, "\n")
        .replace(/\s*submitBtn\.setAttribute\('data-i18n', 'contact\.form\.submit'\);\n/, "\n");
}

function buildOne(rel, lang) {
    const srcPath = path.join(ROOT, rel);
    const raw = fs.readFileSync(srcPath, "utf8");
    const $ = cheerio.load(raw, { decodeEntities: false });

    applyTranslations($, lang);
    fixAssetPaths_forLang($, lang, rel);
    removeI18nRuntimeScripts($);

    const basePath = upPath(depthOf(rel));
    injectBasePathBeforeMenu($, basePath);

    const switcherHref = lang === "en" ? enToPtHref(rel) : ptToEnHref(rel);
    setLangSwitcher($, lang, switcherHref);

    setHreflangAndCanonical($, rel, lang);
    setMeta($, rel, lang);

    let out = $.html();

    if (rel === "packages.html") out = patchPackagesScript(out, lang);
    if (rel === "contact.html") out = patchContactScript(out, lang);

    return out;
}

// asset path fix only applies to PT output (PT files sit one level deeper)
function fixAssetPaths_forLang($, lang, rel) {
    if (lang === "pt") fixAssetPaths($, rel);
}

const OUT_ROOT = process.env.VW_DRY_RUN ? path.join(ROOT, "scratch-build-output") : ROOT;

function writeOut(rel, lang, html) {
    const outRel = lang === "en" ? rel : path.join("pt", rel);
    const outPath = path.join(OUT_ROOT, outRel);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, "utf8");
    console.log((lang === "en" ? "[en] " : "[pt] ") + outRel);
}

// Build BOTH languages from the pristine source before writing anything,
// since EN output is written back in place and must not be read as the PT source.
PAGES.forEach((rel) => {
    const en = buildOne(rel, "en");
    const pt = buildOne(rel, "pt");
    writeOut(rel, "en", en);
    writeOut(rel, "pt", pt);
});

console.log("\nDone. " + PAGES.length + " pages x 2 languages." + (process.env.VW_DRY_RUN ? " (dry run -> scratch-build-output/)" : ""));
