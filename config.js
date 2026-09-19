export const COLORS = {
  porcelain: "#F7F6F2",
  carbon: "#171817",
  mineral: "#B8B7B2",
  slate: "#37423F",
  clay: "#AA7C68",
  sapphire: "#0F52BA",
  sapphireDeep: "#0A3478",
  sapphireLight: "#DCE8F8",
};

// Confirmed public business details.
export const CONTACT_EMAIL = "hello@nouvue.co.uk";
export const CONTACT_PHONE = "+44 7845 850044";
export const CONTACT_PHONE_HREF = "tel:+447845850044";
export const CONTACT_EMAIL_HREF = "mailto:hello@nouvue.co.uk";

// Legal identity — use exactly this wording wherever trader identity
// is legally required (Terms/Privacy). Never say "Nouvue Ltd", never
// imply incorporation, never invent a company/VAT number.
export const BUSINESS_DISCLOSURE = {
  line: "Nouvue is a trading name of Jane Oladeinde, a sole trader.",
};

// Real routes now that legal pages exist.
export const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cancellations", href: "/cancellations" },
];

// Confirmed primary domain. Defensive/secondary domains should
// redirect here rather than serving duplicate copies of the site.
export const CANONICAL_DOMAIN = "https://www.nouvue.co.uk";

// Service area — confirmed relocation. Update this one place if the
// service area ever changes; every page reads from here.
export const SERVICE_AREA = "Stevenage and selected surrounding Hertfordshire areas";
export const SERVICE_AREA_SHORT = "Stevenage & Hertfordshire";
export const BASE_LOCATION = "Stevenage";

// Central, editable pricing. Rates are per-cleaner-hour for recurring
// and housekeeping work — see the "cleaner-hour" explainer copy in
// data.js. Change these two numbers to update every price shown
// across the site; everything else is fixed/custom quote or
// site-quote by design, so it has no rate to store here.
//
// PLACEHOLDER VALUES — NOT CONFIRMED. The brief this rebuild follows
// explicitly said not to choose final £X rates yet, so these are
// illustrative only. Replace both before launch, then the change
// propagates to the hero, services list and FAQ automatically.
export const RECURRING_RATE_FROM = 18; // TODO: confirm before launch
export const HOUSEKEEPING_RATE_FROM = 24; // TODO: confirm before launch
