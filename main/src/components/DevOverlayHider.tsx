"use client";
import { useEffect } from "react";

/**
 * Hides the Next.js dev build indicator / toast (the black "N" bubble).
 * Works even if it's rendered inside a custom element or added later.
 */
export default function DevOverlayHider() {
  useEffect(() => {
    const hide = () => {
      // Common containers used by Next.js dev UI
      const selectors = [
        ".nextjs-toast",
        "nextjs-portal",
        "#nextjs-portal",
        "#__next-build-watcher",
      ];
      for (const sel of selectors) {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          el.style.setProperty("display", "none", "important");
          el.style.setProperty("visibility", "hidden", "important");
          el.style.setProperty("pointer-events", "none", "important");
        });
      }
    };

    hide();
    const obs = new MutationObserver(hide);
    obs.observe(document.documentElement, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return null;
}
