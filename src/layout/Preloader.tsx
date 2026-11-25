"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const leaveTimer = window.setTimeout(() => setLeaving(true), reduceMotion ? 0 : 180);
    const hideTimer = window.setTimeout(() => setVisible(false), reduceMotion ? 1 : 850);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);
  if (!visible) return null;
  return (
    <div className={`preloader cpmi-preloader${leaving ? " loaded" : ""}`} aria-hidden="true">
      <div className="animation-preloader">
        <div className="cpmi-preloader-mark">CPMI</div>
        <p className="text-center">Faith · Purpose · Service</p>
      </div>
      <div className="loader">
        <div className="row g-0">
          {Array.from({ length: 4 }, (_, index) => (
            <div className={`col-3 loader-section ${index < 2 ? "section-left" : "section-right"}`} key={index}>
              <div className="bg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
