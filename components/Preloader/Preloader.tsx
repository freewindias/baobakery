"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TITLE = "Bao Bakery";
const DURATION_MS = 2800;

export default function Preloader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const loadingRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power3.inOut",
            onComplete: () => {
              document.body.style.overflow = prev;
              setVisible(false);
              onComplete?.();
            },
          });
        },
      });

      tl.fromTo(
        fillRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 -2% 0 0)", duration: DURATION_MS / 1000, ease: "power2.inOut" },
        0
      );

      const proxy = { value: 0 };
      tl.to(
        proxy,
        {
          value: 100,
          duration: DURATION_MS / 1000,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(proxy.value)}%`;
            }
          },
        },
        0
      );

      tl.to(
        loadingRef.current,
        { opacity: 0, duration: 0.3, ease: "power1.out" },
        ">-0.3"
      );
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = prev;
    };
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-label="Loading"
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-footer will-change-transform"
    >
      <div className="flex select-none flex-col items-center gap-8">
        {/* Stacked title */}
        <div className="relative inline-block leading-none" aria-hidden="true">
          {/* Ghost / dim base */}
          <span className="block text-[clamp(3rem,10vw,7rem)] font-semibold tracking-tight whitespace-nowrap text-[#F7F1E8]/15 capitalize font-cinzel">
            {TITLE}
          </span>
          {/* Bright fill — clipped by GSAP */}
          <span
            ref={fillRef}
            className="absolute inset-0 block text-[clamp(3rem,10vw,7rem)] font-semibold tracking-tight whitespace-nowrap text-highlight backface-hidden capitalize font-cinzel"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {TITLE}
          </span>
        </div>

        {/* Loading counter */}
        <p
          ref={loadingRef}
          className="flex items-center gap-1 text-base uppercase tracking-[0.18em] text-highlight"
        >
          <span>Loading...</span>
          <span ref={counterRef} className="inline-block min-w-[3ch]">
            0%
          </span>
        </p>
      </div>
    </div>
  );
}
