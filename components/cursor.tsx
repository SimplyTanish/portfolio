"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";

export function Cursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const sx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 320, damping: 30, mass: 0.6 });
  const dotSX = useSpring(dotX, { stiffness: 900, damping: 40, mass: 0.3 });
  const dotSY = useSpring(dotY, { stiffness: 900, damping: 40, mass: 0.3 });

  const ringSize = active ? 44 : 28;
  const ringX = useTransform(sx, (v) => v - ringSize / 2);
  const ringY = useTransform(sy, (v) => v - ringSize / 2);
  const dotXFinal = useTransform(dotSX, (v) => v - 1.5);
  const dotYFinal = useTransform(dotSY, (v) => v - 1.5);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, [data-cursor]"));
    };

    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y, dotX, dotY]);

  return (
    <>
      <motion.div
        aria-hidden
        className="hidden pointer-events-none fixed left-0 top-0 z-[95] rounded-full border border-white/70 mix-blend-difference [@media(pointer:fine)]:block"
        animate={{ width: ringSize, height: ringSize, opacity: active ? 0.9 : 0.5 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{ x: ringX, y: ringY }}
      />
      <motion.div
        aria-hidden
        className="hidden pointer-events-none fixed left-0 top-0 z-[95] size-[3px] rounded-full bg-white mix-blend-difference [@media(pointer:fine)]:block"
        style={{ x: dotXFinal, y: dotYFinal }}
      />
    </>
  );
}