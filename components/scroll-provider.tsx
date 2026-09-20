"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function ScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const hasReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (hasReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    const onAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -72 });
        window.history.replaceState(null, "", id);
      }
    };

    const scrollTo = (target: string) => {
      if (target.startsWith("#")) {
        const el = document.querySelector(target);
        if (el) {
          lenis.scrollTo(el as HTMLElement, { offset: -72 });
          window.history.replaceState(null, "", target);
          return true;
        }
        return false;
      }
      window.location.href = target;
      return true;
    };

    ;(window as unknown as { __toroScrollTo?: (t: string) => boolean }).__toroScrollTo =
      scrollTo;

    document.addEventListener("click", onAnchor);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchor);
      delete (window as unknown as { __toroScrollTo?: (t: string) => boolean })
        .__toroScrollTo;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}