import { useEffect } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE, CANONICAL_DOMAIN } from "./config";

// Minimal, factual-only SEO helper. Sets document title + meta
// description per page, and (optionally) injects LocalBusiness
// structured data. Never includes ratings, reviews, opening hours,
// street address, or a founding date — none of that is confirmed.
export function useSeo({ title, description, structuredData = false }) {
  useEffect(() => {
    if (title) document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) meta.setAttribute("content", description);

    let script = document.getElementById("nv-structured-data");
    if (structuredData) {
      const data = {
        "@context": "https://schema.org",
        "@type": "CleaningService",
        name: "Nouvue",
        description:
          "Home cleaning, housekeeping and property care from our Uxbridge base, serving selected areas across West London and South Buckinghamshire.",
        areaServed: ["Uxbridge", "West London", "South Buckinghamshire"],
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
  }, [title, description, structuredData]);
}
