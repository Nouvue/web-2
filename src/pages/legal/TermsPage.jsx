import React from "react";
import { useSeo } from "../../seo";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE } from "../../config";

function TermsPage() {
  useSeo({
    title: "Terms of Service | Nouvue",
    description: "The terms that apply when you use the Nouvue website or book a cleaning service.",
  });

  return (
    <section className="nv-section">
      <div className="nv-container nv-legal">
        <h1>Terms of Service</h1>
        <p className="nv-legal-updated">Last updated: 6 September 2026</p>

        <h2>About Nouvue</h2>
        <p>
          Nouvue is a trading name of Jane Oladeinde, a sole trader. Nouvue provides home and property
          care across Uxbridge, West London and South Buckinghamshire.
        </p>
        <p>
          Email: <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>
          <br />
          Phone: {CONTACT_PHONE}
        </p>
        <p>
          The website is an enquiry service. Sending a form does not create a booking and does not charge
          you. A booking only becomes binding when Nouvue confirms the agreed service, date, scope and price
          in writing and provides the required pre-contract information.
        </p>

        <h2>Services and scope</h2>
        <p>
          The exact work included is the scope confirmed for your booking. Inside ovens, fridges and
          cupboards are not included in Regular Home Care by default. They may be added and priced
          separately. A Deep Home Reset or property service may include selected appliance interiors only where
          specifically agreed.
        </p>

        <h2>Quotes and pricing</h2>
        <p>
          Website prices are starting prices. Final pricing depends on the property, condition, agreed scope,
          access, parking and add-ons. If the actual condition materially differs from the quote information,
          we will discuss any scope or price change before additional work is carried out.
        </p>

        <h2>Access and safety</h2>
        <p>
          Customers must provide accurate access, parking, pet, delicate-surface and hazard information and
          should secure valuables and highly fragile items. We may stop, refuse or re-scope work that is
          unsafe, specialist or materially outside ordinary home/property cleaning.
        </p>

        <h2>Payment</h2>
        <p>
          Payment arrangements are confirmed with the booking. Unless otherwise agreed in writing, payment is
          due on completion. We do not collect card details through the website enquiry form.
        </p>

        <h2>Cancellations</h2>
        <p>
          The Cancellation Policy applies after a booking is confirmed and does not remove statutory consumer
          rights.
        </p>

        <h2>If something is missed or goes wrong</h2>
        <p>
          Tell us as soon as reasonably possible if an agreed-scope item appears to have been missed or if
          you believe damage occurred. Where appropriate, we may inspect and offer a reasonable corrective
          clean or another proportionate remedy. Prompt reporting does not remove statutory rights.
        </p>

        <h2>Liability</h2>
        <p>
          Nothing in these terms excludes liability where the law does not allow us to do so, including
          liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation,
          or statutory consumer rights.
        </p>

        <h2>Photography</h2>
        <p>
          We will not use identifiable photographs of your home or belongings for marketing without
          permission. Operational photographs may be taken where reasonably necessary to document condition,
          completion or an incident and will be handled under the Privacy Notice.
        </p>

        <h2>Law</h2>
        <p>
          These terms are governed by the law of England and Wales. Nothing in these terms affects rights you
          have under consumer law.
        </p>
      </div>
    </section>
  );
}

export default TermsPage;
