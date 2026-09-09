import React, { useState, useEffect, useRef } from "react";

function StickyMobileCTA({ page, openEnquiry, enquiryOpen }) {
  const [visible, setVisible] = useState(false);
  const hideFromRef = useRef(null);

  useEffect(() => {
    // Hide once the closing CTA (which has its own primary button) scrolls
    // into view — this also covers the footer, since it follows immediately.
    hideFromRef.current = document.querySelector(".nv-closing");
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.75;
      let nearEnd = false;
      if (hideFromRef.current) {
        const rect = hideFromRef.current.getBoundingClientRect();
        nearEnd = rect.top < window.innerHeight;
      }
      setVisible(pastHero && !nearEnd);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (enquiryOpen || !visible) return null;

  return (
    <div className="nv-sticky-cta">
      <button className="nv-btn nv-btn-primary nv-sticky-btn" onClick={() => openEnquiry(page === "property" ? "property" : "regular")}>
        Get Your Quote
      </button>
    </div>
  );
}

export { StickyMobileCTA };
