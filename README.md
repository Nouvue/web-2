# Nouvue — Deployment Guide

## What this is

A real, buildable React (Vite) website — not the chat artifact. It includes:

- Home and Property pages
- Real /privacy, /terms, /cancellations routes (client-side routed, with a
  Netlify redirect rule so direct links and refreshes don't 404)
- A working enquiry form wired to Netlify Forms (see below — this is the
  one thing you must confirm after deploying)
- Your confirmed contact details (hello@nouvue.co.uk, +44 7845 850044)
  and legal wording throughout

## Deploying to Netlify

1. Push this folder to a GitHub repo (or drag-and-drop the folder into
   Netlify's dashboard — either works).
2. In Netlify: **New site from Git** (or drag-and-drop deploy).
3. Build settings (Netlify should auto-detect these from `netlify.toml`,
   but if asked):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

## Confirming the enquiry form works (do this after first deploy)

Netlify Forms only registers a form if it finds a **static** copy of it in
the built HTML at deploy time — that's what the hidden `<form>` in
`index.html` is for. It should just work automatically, but to confirm:

1. After deploying, go to **Site settings → Forms** in Netlify. You should
   see a form called `nouvue-enquiry` listed.
2. Submit a real test enquiry on the live site.
3. Check **Forms → nouvue-enquiry** in Netlify — your test submission
   should appear there.
4. In Netlify, set up **email notifications** for this form (Site settings
   → Forms → Form notifications) so submissions land in your inbox
   automatically, since nothing else on this site emails you yet.

If the form doesn't appear in Netlify after deploying, the most common
cause is the hidden form in `index.html` getting stripped somehow — check
it's still there in the deployed page source.

## What's still genuinely outstanding (not a code problem — business decisions)

- **Payment**: not built into the site on purpose (see prior conversation)
  — use Stripe Payment Links after confirming scope with a customer.
- **Canonical domain**: `nouvue.co.uk` is set in `src/config.js` as the
  confirmed domain. Once you've pointed DNS at Netlify, add it as a
  custom domain in Netlify's dashboard.
- **Insurance**: intentionally not mentioned anywhere on the site until
  cover is actually active.
- **Reviews**: none shown — none exist yet. The "What you can expect"
  section stands in for this until you have real ones.

## Local development

```
npm install
npm run dev
```

## Production build (what Netlify runs)

```
npm run build
```

Output goes to `dist/`.
