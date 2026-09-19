import { useEffect } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE, CANONICAL_DOMAIN, SERVICE_AREA } from "./config";

// Minimal, factual-only SEO helper. Sets document title + meta
// description, canonical link, Open Graph/Twitter tags, and
// (optionally) LocalBusiness structured data — all per page, all
// client-side. Never includes ratings, reviews, opening hours,
// street address, or a founding date — none of that is confirmed.
//
// NOTE — static metadata bug: this is a client-rendered SPA, so the
// <title>/<meta description> baked into index.html at build time
// (used by crawlers/link previews that don't execute JS, and as the
// first-paint fallback) must independently match what this hook sets
// for the homepage. See index.html — both are kept in sync by hand;
// if this default homepage title/description ever changes, update
// index.html's static tags to match in the same change.
function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo({ title, description, structuredData = false, path = "" }) {
  useEffect(() => {
    if (title) document.title = title;

    setMeta("description", description);

    // Canonical link
    const canonicalHref = `${CANONICAL_DOMAIN}${path}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);

    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", canonicalHref, "property");
    setMeta("og:site_name", "Nouvue", "property");

    // Twitter card
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let script = document.getElementById("nv-structured-data");
    if (structuredData) {
      const data = {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        name: "Nouvue",
        description:
          `Home cleaning, housekeeping and property care serving ${SERVICE_AREA}.`,
        areaServed: ["Stevenage", "Hertfordshire"],
        email: CONTACT_EMAIL || undefined,
        telephone: CONTACT_PHONE || undefined,
        url: CANONICAL_DOMAIN || undefined,
      };
      if (!script) {
        script = document.createElement("script");
        script.id = "nv-structured-data";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    } else if (script) {
      script.remove();
    }
  }, [title, description, structuredData, path]);
}
