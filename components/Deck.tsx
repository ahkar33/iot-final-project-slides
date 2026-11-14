"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { slides } from "./slides";

const W = 1920;
const H = 1080;
const TOTAL = slides.length;
const SLIDE_EVENT = "deck:slide";

/* The current slide lives in the URL hash (#3), so a reload keeps your place. */
function readSlide() {
  const n = parseInt(window.location.hash.slice(1), 10);
  return n >= 1 && n <= TOTAL ? n - 1 : 0;
}

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(SLIDE_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(SLIDE_EVENT, onChange);
  };
}

function setSlide(i: number) {
  const clamped = Math.min(TOTAL - 1, Math.max(0, i));
  history.replaceState(null, "", `#${clamped + 1}`);
  window.dispatchEvent(new Event(SLIDE_EVENT));
}

export default function Deck() {
  const index = useSyncExternalStore(subscribe, readSlide, () => 0);
  const [scale, setScale] = useState(0);
  const total = TOTAL;

  const go = useCallback((delta: number) => setSlide(readSlide() + delta), []);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          setSlide(0);
          break;
        case "End":
          setSlide(total - 1);
          break;
        case "f":
        case "F":
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  const Current = slides[index];

  return (
    <main
      className="fixed inset-0 flex cursor-pointer select-none items-center justify-center overflow-hidden bg-black"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        // Click left fifth goes back, anywhere else goes forward.
        go(e.clientX < window.innerWidth / 5 ? -1 : 1);
      }}
    >
      <div
        style={{
          width: W * scale,
          height: H * scale,
          visibility: scale ? "visible" : "hidden",
        }}
        className="relative overflow-hidden"
      >
        <div
          style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <Current eager />
        </div>
      </div>
      {/* Slide number, bottom right of the viewport. */}
      <div className="pointer-events-none fixed bottom-[18px] right-[24px] rounded-full bg-black/45 px-[14px] py-[4px] font-sans text-[15px] font-bold tabular-nums text-white">
        {index + 1} / {total}
      </div>
    </main>
  );
}
