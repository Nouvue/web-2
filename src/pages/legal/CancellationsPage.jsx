import React from "react";
import { useSeo } from "../../seo";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE } from "../../config";

function CancellationsPage() {
  useSeo({
    title: "Cancellation & Rescheduling Policy | Nouvue",
    description: "How cancellations and rescheduling work with Nouvue.",
  });

  return (
    <section className="nv-section">
      <div className="nv-container nv-legal">
        <h1>Cancellation &amp; Rescheduling Policy</h1>
        <p className="nv-legal-updated">Last updated: 6 September 2026</p>

        <h2>Enquiries are not bookings</h2>
        <p>
          Submitting the website form does not create a booking. This policy applies after Nouvue confirms
          the service, date, scope and price and the customer accepts the booking.
        </p>

        <h2>Operational notice periods</h2>
        <ul>
          <li>Regular Home Care: please give at least 24 hours' notice to cancel or reschedule.</li>
          <li>Deep Home Reset / Property services: please give at least 48 hours' notice to cancel or reschedule.</li>
        </ul>
        <p>
          If you cancel later than the relevant notice period, or we cannot access the property at the agreed
          time, we may charge a reasonable amount reflecting losses we cannot reasonably avoid. We will not
          automatically charge more than the agreed service price.
        </p>

        <h2>Statutory cooling-off rights</h2>
        <p>
          Where a consumer service contract is concluded at a distance, you will normally have a 14-day
          cancellation period beginning when the contract is made, subject to legal exceptions. If you ask us
          to begin the service during that period, we may ask for your express request to start early. If you
          cancel after work has started, you may have to pay a proportionate amount for the service already
          supplied. If the service is fully performed during the cancellation period after the legally
          required express request/acknowledgement, the statutory right to cancel may end.
        </p>

        <h2>If Nouvue needs to cancel</h2>
        <p>
          We will contact you as soon as reasonably possible and offer a new date where suitable. You will
          not be charged for work that has not been supplied.
        </p>

        <h2>Genuine emergencies</h2>
        <p>
          If an unexpected emergency affects your booking, contact us as soon as possible. We will consider
          the circumstances reasonably rather than applying the policy mechanically.
        </p>

        <h2>Contact</h2>
        <p>
          Email <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a> or call {CONTACT_PHONE} and include the
          booking name, postcode and booked date.
        </p>
        <p>Nothing in this policy limits rights you have under UK consumer law.</p>
      </div>
    </section>
  );
}

export default CancellationsPage;
