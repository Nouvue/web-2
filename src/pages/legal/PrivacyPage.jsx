import React from "react";
import { useSeo } from "../../seo";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE } from "../../config";

function PrivacyPage() {
  useSeo({
    title: "Privacy Notice | Nouvue",
    description: "How Nouvue collects, uses and protects your personal information.",
    path: "/privacy",
  });

  return (
    <section className="nv-section">
      <div className="nv-container nv-legal">
        <h1>Privacy Notice</h1>
        <p className="nv-legal-updated">Last updated: 6 September 2026</p>

        <h2>Who we are</h2>
        <p>
          Nouvue is a trading name of Jane Oladeinde, a sole trader. For data-protection purposes, Nouvue is
          the controller of the personal information described in this notice.
        </p>
        <p>
          Email: <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>
          <br />
          Phone: {CONTACT_PHONE}
        </p>

        <h2>Information we may collect</h2>
        <ul>
          <li>Name, email and phone number.</li>
          <li>Postcode, property address and access information needed to quote or provide the service.</li>
          <li>
            Service type, property size/type, preferred date, cleaning priorities, condition notes, parking,
            pets and relevant surface information.
          </li>
          <li>Messages and correspondence.</li>
          <li>
            Photographs you choose to provide, or operational photographs taken where reasonably necessary
            and appropriate.
          </li>
          <li>
            Booking, invoice and payment records. We do not store full card details ourselves when payment is
            processed by a payment provider.
          </li>
        </ul>

        <h2>Why we use it</h2>
        <p>
          We use information to respond to enquiries and take pre-contract steps, deliver confirmed bookings,
          manage payment, operate safely, resolve issues and meet accounting/legal obligations. Marketing is
          only carried out where we have a lawful basis to do so; a privacy acknowledgement is not marketing
          consent.
        </p>

        <h2>Sharing</h2>
        <p>
          We may use trusted providers for website hosting/forms, email, payment processing, accounting or
          professional advice. We may also disclose information where required by law or to protect legal
          rights. The intended launch hosting/form provider is Netlify; we'll update this notice if the
          deployment stack changes.
        </p>

        <h2>International processing</h2>
        <p>
          Some technology providers may process information outside the UK. Where this happens, we rely on
          appropriate legal safeguards required by UK data-protection law.
        </p>

        <h2>Retention</h2>
        <p>
          Unsuccessful enquiries may be kept for up to 12 months. Booking, invoice and related service records
          may be kept for up to 6 years where needed for tax, accounting or legal purposes. Operational
          photographs are kept only for as long as there is a genuine service, safety, dispute or evidence
          need.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on the circumstances, you may have rights to access, correct, erase, restrict or object to
          use of your information, and to data portability. You may also complain to the Information
          Commissioner's Office. Contact <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a> first if you want to
          exercise a right or ask a privacy question.
        </p>

        <h2>Security</h2>
        <p>
          We take reasonable steps to protect customer information and limit access to people and service
          providers who need it for legitimate business purposes. No internet or email system can be
          guaranteed completely secure.
        </p>
      </div>
    </section>
  );
}

export default PrivacyPage;
