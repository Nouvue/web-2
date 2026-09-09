import React, { useState } from "react";
import { COLORS } from "../config";
import { IMG, ASSET_MANIFEST, RESULTS_VERIFIED, SERVICES, ADD_ONS, FINISH_ITEMS, PROCESS_HOME, PROCESS_PROPERTY, TRUST_ITEMS, PROPERTY_TRUST_ITEMS, FAQ_HOME, FAQ_PROPERTY } from "../data";
import { Aperture, useInView } from "./Aperture";

function ValueSection() {
  return (
    <section className="nv-section">
      <div className="nv-container nv-section-narrow">
        <h2 className="nv-h2">
          Come home to
          <br />
          less left undone.
        </h2>
        <p className="nv-lede">
          Life gets busy. Homes get lived in. Nouvue provides carefully scoped cleaning, straightforward
          communication and a considered finishing check — so walking back in feels like a home that's
          ready again, not another list to manage.
        </p>
        <p className="nv-lede-tight">Well-kept. Thoughtfully done.</p>
      </div>
    </section>
  );
}

function ServicesSection({ openEnquiry }) {
  return (
    <section className="nv-section nv-section-rule" id="services">
      <div className="nv-container">
        <p className="nv-eyebrow">Services</p>
        {SERVICES.map((s) => (
          <div className="nv-service-row" key={s.key}>
            <div className="nv-service-idx">
              <span className="nv-service-num">{s.idx}</span>
              <span className="nv-service-line">{s.line}</span>
            </div>
            <div className="nv-service-body">
              <h3 className="nv-service-name">{s.name}</h3>
              <p className="nv-service-desc">{s.desc}</p>
            </div>
            <div className="nv-service-meta">
              <p className="nv-service-price">
                {s.price} <span className="nv-service-unit">— {s.unit}</span>
              </p>
              <p className="nv-service-basis">{s.basis}</p>
              <button className="nv-text-link" onClick={() => openEnquiry(s.key)}>
                {s.cta} →
              </button>
            </div>
          </div>
        ))}
        <div className="nv-addons">
          <p className="nv-addons-label">Add a little more</p>
          <p className="nv-addons-copy" style={{ marginBottom: 12 }}>
            Selected extras can be added where suitable, available as optional additions to eligible bookings.
          </p>
          <ul className="nv-finish-list" style={{ maxWidth: 480 }}>
            {ADD_ONS.map((a) => (
              <li key={a} style={{ borderTop: "1px solid rgba(23,24,23,0.08)" }}>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function NoJudgementSection() {
  return (
    <section className="nv-section">
      <div className="nv-container nv-section-narrow">
        <h2 className="nv-h2-mid">One less thing waiting for you.</h2>
        <p className="nv-lede">
          Homes require constant attention. Small jobs have a habit of becoming weekend jobs. Nouvue gives
          you a dependable way to hand part of that responsibility over, while keeping clear expectations
          around how your space is cared for. No need to apologise for where things are — we'll agree what
          needs attention and focus on doing the agreed job properly.
        </p>
      </div>
    </section>
  );
}

function NouvueFinishSection() {
  const [ref, inView] = useInView(0.4);
  return (
    <section className="nv-section nv-section-ink nv-finish-section" ref={ref}>
      <div className="nv-container">
        <p className="nv-eyebrow nv-eyebrow-ink">The Nouvue Finish</p>
        <h2 className="nv-h2 nv-h2-ink">
          Clean is the requirement.
          <br />
          Finished is the standard.
        </h2>
        <p className="nv-lede nv-lede-ink">
          Every suitable Nouvue Home visit concludes with a final detail and presentation check before the
          service is considered complete.
        </p>
        <ul className="nv-finish-list">
          {FINISH_ITEMS.map((f) => (
            <li key={f.n}>
              <span className="nv-finish-num">{f.n}</span>
              <span>{f.t}</span>
            </li>
          ))}
        </ul>
        <div className="nv-finish-mark">
          <div className="nv-finish-aperture-wrap">
            <Aperture responsive resolved={inView} primary={COLORS.sapphire} depth={COLORS.sapphireDeep} />
          </div>
          <p className={`nv-finish-caption${inView ? " nv-finish-caption-visible" : ""}`}>Finished.</p>
        </div>
      </div>
    </section>
  );
}

function ResultsSection({ openEnquiry }) {
  const pendingCount = ASSET_MANIFEST.filter(
    (a) => a.type === "composite" && a.usageStatus === "unknown"
  ).length;

  return (
    <section className="nv-section nv-section-rule" id="results">
      <div className="nv-container">
        <p className="nv-eyebrow">Results</p>
        <h2 className="nv-h2-mid">
          Proof, not promises.
          <br />
          The difference is in the detail.
        </h2>

        {RESULTS_VERIFIED.length > 0 ? (
          <div className="nv-results-grid">
            {RESULTS_VERIFIED.map((r, i) => (
              <div className="nv-result-row" key={r.id}>
                <p className="nv-result-index">
                  {String(i + 1).padStart(2, "0")} / {(r.service || "").toUpperCase()}
                </p>
                <div className="nv-result-photo">
                  <img
                    src={IMG[r.image]}
                    alt={r.altText}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="nv-result-copy">
                  <h4>{r.subject}</h4>
                  <p>{r.caption}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="nv-results-pending">
            <p className="nv-lede">
              We only publish results we can stand behind as genuine Nouvue work. {pendingCount > 0
                ? `${pendingCount} candidate photographs are currently awaiting confirmation before they're published here.`
                : "This section is awaiting confirmed before-and-after photography from completed Nouvue visits."}
            </p>
            <button className="nv-text-link" onClick={() => openEnquiry("regular")}>
              Get Your Quote →
            </button>
          </div>
        )}
        {RESULTS_VERIFIED.length > 0 && (
          <p className="nv-results-cta">
            <button className="nv-text-link" onClick={() => openEnquiry("regular")}>
              Need something similar? Get Your Quote →
            </button>
          </p>
        )}
      </div>
    </section>
  );
}

function ProcessSection({ steps, title }) {
  return (
    <section className="nv-section nv-section-rule">
      <div className="nv-container">
        <p className="nv-eyebrow">{title}</p>
        <div className="nv-process-line">
          {steps.map((s) => (
            <div className="nv-process-step" key={s.n}>
              <span className="nv-process-num">{s.n}</span>
              <h4 className="nv-process-title">{s.t}</h4>
              <p className="nv-process-desc">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection({ page }) {
  const items = page === "property" ? PROPERTY_TRUST_ITEMS : TRUST_ITEMS;
  return (
    <section className="nv-section">
      <div className="nv-container nv-container-trust">
        <p className="nv-eyebrow">Why Nouvue</p>
        <h2 className="nv-h2-mid">Thoughtful by design.</h2>
        <div className="nv-trust-list">
          {items.map((it) => (
            <div className="nv-trust-row" key={it.t}>
              <h4>{it.t}</h4>
              <p>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyIntroSection({ openEnquiry }) {
  return (
    <section className="nv-section nv-section-rule">
      <div className="nv-container">
        <div className="nv-property-intro-grid">
          <div className="nv-property-intro-copy">
            <h2 className="nv-h2">
              A property ready
              <br />
              for what comes
              <br />
              next.
            </h2>
            <p className="nv-lede">
              Send us the property information, access requirements and required completion date. We'll
              confirm the scope, availability and pricing before the work is accepted.
            </p>
            <button className="nv-text-link" onClick={() => openEnquiry("property")}>
              Get Your Quote →
            </button>
            <div className="nv-already-box">
              <h4>Already have a cleaner?</h4>
              <p>Use Nouvue for overflow capacity, vacant properties, move-out support or additional cover. There's no need to replace an arrangement that already works.</p>
            </div>
          </div>
          <div className="nv-property-intro-visual">
            <div className="nv-property-photo-frame">
              <img
                src={IMG.propertyBathroom}
                alt="A shower room with glass enclosure and fitted vanity."
                loading="lazy"
                decoding="async"
                width={640}
                height={853}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection({ page }) {
  const [open, setOpen] = useState(null);
  const items = page === "property" ? FAQ_PROPERTY : FAQ_HOME;
  return (
    <section className="nv-section nv-section-rule" id="faq">
      <div className="nv-container nv-container-faq">
        <p className="nv-eyebrow">Questions</p>
        <div className="nv-faq-list">
          {items.map((f, i) => (
            <div className="nv-faq-item" key={f.q}>
              <button
                className="nv-faq-q"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{f.q}</span>
                <span className="nv-faq-toggle" aria-hidden="true">{open === i ? "–" : "+"}</span>
              </button>
              {open === i && <p className="nv-faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA({ page, openEnquiry }) {
  return (
    <section className="nv-section nv-section-ink nv-closing">
      <div className="nv-container nv-section-narrow">
        {page === "property" ? (
          <>
            <h2 className="nv-h2 nv-h2-ink">A property ready for what comes next.</h2>
            <p className="nv-lede nv-lede-ink">Tell us about the property and we'll confirm availability, scope and pricing.</p>
            <button className="nv-btn nv-btn-primary" onClick={() => openEnquiry("property")}>
              Get Your Quote
            </button>
          </>
        ) : (
          <>
            <h2 className="nv-h2 nv-h2-ink">
              A home that
              <br />
              feels ready again.
            </h2>
            <p className="nv-lede nv-lede-ink">Tell us about your home and we'll confirm availability, scope and pricing.</p>
            <button className="nv-btn nv-btn-primary" onClick={() => openEnquiry("regular")}>
              Get Your Quote
            </button>
          </>
        )}
      </div>
    </section>
  );
}


export {
  ValueSection,
  ServicesSection,
  NoJudgementSection,
  NouvueFinishSection,
  ResultsSection,
  ProcessSection,
  TrustSection,
  PropertyIntroSection,
  FAQSection,
  ClosingCTA,
};
