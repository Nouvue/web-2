import React, { useState, useEffect, useRef, useId } from "react";
import { COLORS } from "../config";

/* ============================================================
   APERTURE MARK — proprietary device: two offset frames
   that resolve into one aligned viewpoint on interaction.

   Lux-classic 3D treatment: a restrained sapphire gradient
   (never a rainbow/neon sweep), a soft architectural drop
   shadow for lift, and a faint interior fill so the front
   frame reads as a solid plane rather than a thin outline —
   still no glass, no chrome, no glow.
   ============================================================ */

function Aperture({ size = 96, resolved = false, primary = COLORS.sapphire, depth = COLORS.sapphireDeep, responsive = false }) {
  const uid = useId().replace(/:/g, "");
  const shift = resolved ? 0 : 12;
  const dim = responsive ? "100%" : size;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 100 100"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`nv-ap-front-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primary} />
          <stop offset="100%" stopColor={depth} />
        </linearGradient>
        <filter id={`nv-ap-shadow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor={depth} floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter={`url(#nv-ap-shadow-${uid})`}>
        {/* depth / side plane — recedes as the frames align */}
        <rect
          x={27 + shift}
          y={36 - shift}
          width="60"
          height="42"
          fill={depth}
          fillOpacity={resolved ? 0.1 : 0.24}
          stroke={depth}
          strokeWidth="2"
          style={{ transition: "x 900ms cubic-bezier(.2,.7,.2,1), y 900ms cubic-bezier(.2,.7,.2,1), fill-opacity 900ms ease" }}
        />
        {/* front plane — the resolved viewpoint, subtle gradient + faint fill for a solid, architectural feel */}
        <rect
          x={13 - shift}
          y={23 + shift}
          width="60"
          height="42"
          fill={primary}
          fillOpacity={resolved ? 0.05 : 0.03}
          stroke={`url(#nv-ap-front-${uid})`}
          strokeWidth="3"
          style={{ transition: "x 900ms cubic-bezier(.2,.7,.2,1), y 900ms cubic-bezier(.2,.7,.2,1), fill-opacity 900ms ease" }}
        />
      </g>
    </svg>
  );
}

/* Resolve-on-scroll wrapper */
function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Both exported for use across components.
export { Aperture, useInView };
