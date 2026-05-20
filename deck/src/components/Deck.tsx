"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export function Deck({ slides }: { slides: React.ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = slides.length;

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    // Read ?slide=N from the URL on first mount so the deck supports linking
    // to a slide (useful when rehearsing).
    const url = new URL(window.location.href);
    const param = url.searchParams.get("slide");
    if (param) {
      const n = parseInt(param, 10);
      if (!Number.isNaN(n) && n >= 1 && n <= total) {
        setIndex(n - 1);
      }
    }
  }, [total]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(index + 1));
    window.history.replaceState({}, "", url.toString());
  }, [index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore when typing in an input/textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
        case "j":
        case "l":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
        case "Backspace":
        case "k":
        case "h":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          setDirection(-1);
          setIndex(0);
          break;
        case "End":
          e.preventDefault();
          setDirection(1);
          setIndex(total - 1);
          break;
        case "f":
          e.preventDefault();
          if (document.fullscreenElement) {
            void document.exitFullscreen();
          } else {
            void document.documentElement.requestFullscreen();
          }
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, total]);

  return (
    <main className="fixed inset-0 overflow-hidden">
      {/* Slide stage */}
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {slides[index]}
        </motion.div>
      </AnimatePresence>

      {/* Slide counter */}
      <div className="absolute top-6 right-8 z-10 flex items-center gap-3 text-[color:var(--fg-soft)] text-sm tracking-widest numeral select-none">
        <span className="text-[color:var(--fg)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="opacity-40">/</span>
        <span>{String(total).padStart(2, "0")}</span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)]"
          initial={false}
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Click zones */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute inset-y-0 left-0 w-[12vw] z-0 cursor-w-resize"
      />
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute inset-y-0 right-0 w-[12vw] z-0 cursor-e-resize"
      />

      {/* Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[color:var(--fg-soft)] opacity-50 z-10 select-none">
        ← → to navigate · f for fullscreen
      </div>
    </main>
  );
}
