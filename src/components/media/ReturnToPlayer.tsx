"use client";

import { useEffect, useState } from "react";

/** Keep the route's player within reach once it scrolls above the window. */
export default function ReturnToPlayer({ radio = false }: { radio?: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const player = document.getElementById("broadcast-player");
    if (!player) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(Boolean(entry && entry.boundingClientRect.bottom <= 0));
    });
    observer.observe(player);
    return () => observer.disconnect();
  }, []);

  return visible ? <a href="#broadcast-player" className={`return-to-player${radio ? " on-radio" : ""}`}>
    <i className={radio ? "fas fa-headphones" : "fas fa-video"} aria-hidden="true" />
    Back to player
  </a> : null;
}
