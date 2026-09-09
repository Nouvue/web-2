import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  COLORS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_HREF,
  LEGAL_LINKS,
} from "../config";
import { Aperture } from "./Aperture";

function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <footer className="nv-footer">
      <div className="nv-container nv-footer-grid">
        <div className="nv-footer-zone nv-footer-brand-zone">
          <div className="nv-brand" style={{ pointerEvents: "none" }}>
            <Aperture size={26} resolved={true} primary={COLORS.sapphire} depth={COLORS.sapphireDeep} />
            <span className="nv-brand-text">Nouvue</span>
          </div>
          <p className="nv-footer-sub">Home &amp; Property Cleaning</p>
          <p className="nv-footer-area">Based in Uxbridge · West London &amp; South Buckinghamshire</p>
        </div>

        <nav className="nv-footer-zone nv-footer-nav" aria-label="Footer">
          <button className="nv-footer-link" onClick={() => navigate("/")}>Home</button>
          <button className="nv-footer-link" onClick={() => navigate("/property")}>Property</button>
          <a className="nv-footer-link" href="/#results">Results</a>
          <a className="nv-footer-link" href="/#faq">FAQ</a>
        </nav>

        <div className="nv-footer-zone nv-footer-right-zone">
          {(CONTACT_EMAIL || CONTACT_PHONE) && (
            <p className="nv-footer-contact">
              {CONTACT_EMAIL && <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>}
              {CONTACT_EMAIL && CONTACT_PHONE && " · "}
              {CONTACT_PHONE && <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a>}
            </p>
          )}
          <nav className="nv-footer-legal" aria-label="Legal">
            {LEGAL_LINKS.map((l, i) => (
              <React.Fragment key={l.label}>
                {i > 0 && <span className="nv-footer-legal-sep" aria-hidden="true">·</span>}
                <Link to={l.href}>{l.label}</Link>
              </React.Fragment>
            ))}
          </nav>
        </div>

        <p className="nv-footer-copyright nv-footer-copyright-full">© {year} Nouvue. All rights reserved.</p>
      </div>
    </footer>
  );
}

export { Footer };
