import React from "react";
import { COLORS, SERVICE_AREA, RECURRING_RATE_FROM } from "../config";
import { IMG } from "../data";
import { Aperture, useInView } from "./Aperture";

function HeroHome({ openEnquiry }) {
  return (
    <section className="nv-hero">
      <div className="nv-container nv-hero-copy-solo">
        <p className="nv-eyebrow">Nouvue · Home &amp; Property Care</p>
        <h1 className="nv-h1">
          A better-kept home
          <br />
          changes how it feels.
        </h1>
        <p className="nv-hero-sub">
          Thoughtful cleaning, housekeeping and property care serving {SERVICE_AREA}.
        </p>
        <p className="nv-price-cue">
          Regular Home Care <b>from £{RECURRING_RATE_FROM} per cleaner-hour.</b>
        </p>
        <div className="nv-hero-ctas">
          <button className="nv-btn nv-btn-primary" onClick={() => openEnquiry("regular")}>
            Get My Quote
          </button>
          <a className="nv-text-link" href="#services">
            Explore Services →
          </a>
        </div>
        <p className="nv-field-note" style={{ marginTop: 4 }}>Clear scope and an expected total quote confirmed before booking.</p>
        <div className="nv-hero-trust-row">
          <div>
            <h4>Clear from the start</h4>
            <p>Know what's agreed before the visit.</p>
          </div>
          <div>
            <h4>Thoughtful finish</h4>
            <p>Final detail check before completion.</p>
          </div>
          <div>
            <h4>Stevenage-based</h4>
            <p>Serving Stevenage &amp; Hertfordshire.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroProperty({ openEnquiry }) {
  const [ref, inView] = useInView(0.3);
  return (
    <section className="nv-hero nv-hero-ink" ref={ref}>
      <div className="nv-container nv-hero-grid">
        <div className="nv-hero-copy">
          <p className="nv-eyebrow nv-eyebrow-ink">Nouvue Property · Property Care</p>
          <h1 className="nv-h1 nv-h1-ink">
            Clean.
            <br />
            Checked.
            <br />
            Ready.
          </h1>
          <p className="nv-hero-sub nv-hero-sub-ink">
            Moving and property preparation across {SERVICE_AREA} — for landlords, letting agents
            and property professionals.
          </p>
          <p className="nv-price-cue nv-price-cue-ink">
            A property ready for what comes next.
          </p>
          <div className="nv-hero-ctas">
            <button className="nv-btn nv-btn-primary" onClick={() => openEnquiry("property")}>
              Get My Quote
            </button>
          </div>
          <div className="nv-proof-strip">
            {["Scope", "Access", "Clean", "Check", "Close"].map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && <span className="nv-proof-sep" aria-hidden="true">—</span>}
                <span>{s}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="nv-hero-visual">
          <div className="nv-hero-frame nv-hero-frame-ink">
            <img
              className="nv-hero-photo-img"
              src={IMG.propertyBedroom}
              alt="A studio room with kitchenette, wardrobe and bed."
              loading="eager"
              decoding="async"
              width={800}
              height={1066}
            />
          </div>
          <div className="nv-hero-visual-mark">
            <Aperture size={24} resolved={inView} primary={COLORS.sapphire} depth={COLORS.sapphireDeep} />
            <span>See your space differently.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroHome, HeroProperty };
