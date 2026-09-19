import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { COLORS } from "../config";
import { Aperture } from "./Aperture";

function Nav({ openEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname === "/property" ? "property" : "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inkText = page === "property" && !scrolled ? COLORS.porcelain : COLORS.carbon;

  return (
    <header className={`nv-nav${scrolled ? " nv-nav-scrolled" : ""}`}>
      <div className="nv-nav-inner">
        <button className="nv-brand" onClick={() => navigate("/")} aria-label="Nouvue home">
          <Aperture size={40} resolved={true} primary={COLORS.sapphire} depth={COLORS.sapphireDeep} />
          <span className="nv-brand-text" style={{ color: inkText }}>Nouvue</span>
        </button>
        <nav className="nv-nav-links" aria-label="Primary">
          <button
            className={`nv-nav-link${page === "home" ? " nv-nav-link-active" : ""}`}
            style={{ color: inkText }}
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className={`nv-nav-link${page === "property" ? " nv-nav-link-active" : ""}`}
            style={{ color: inkText }}
            onClick={() => navigate("/property")}
          >
            Property
          </button>
          {page === "home" && (
            <>
              <a className="nv-nav-link nv-nav-link-anchor" href="#services" style={{ color: COLORS.carbon }}>Services</a>
              <a className="nv-nav-link nv-nav-link-anchor" href="#home-club" style={{ color: COLORS.carbon }}>Home Club</a>
              <a className="nv-nav-link nv-nav-link-anchor" href="#results" style={{ color: COLORS.carbon }}>Results</a>
            </>
          )}
          <a className="nv-nav-link nv-nav-link-anchor" href="#faq" style={{ color: inkText }}>FAQ</a>
        </nav>
        <button className="nv-btn nv-btn-primary nv-nav-cta" onClick={() => openEnquiry(page === "property" ? "property" : "")}>
          Get My Quote
        </button>
      </div>
    </header>
  );
}

export { Nav };
