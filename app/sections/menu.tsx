"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { menuPages } from "@/data/menu-data";
import Copy from "@/components/Copy/Copy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

/* ─────────────────────────────────────────── */
/*  Nav arrow button                           */
/* ─────────────────────────────────────────── */
const NavButton = ({
  onClick,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    disabled={disabled}
    className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shrink-0 transition-all duration-150 hover:bg-primary-hover hover:scale-105 active:scale-95 cursor-pointer border-none shadow-md disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
  >
    {children}
  </button>
);

/* ─────────────────────────────────────────── */
/*  Menu card inner content                    */
/* ─────────────────────────────────────────── */
const MenuCard = ({ page }: { page: (typeof menuPages)[number] }) => (
  <div className="flex flex-col h-full">
    {/* Category title */}
    <Copy animateOnScroll={true}>
      <h3 className="text-2xl md:text-3xl font-cinzel font-medium capitalize text-center tracking-tight mb-4 text-primary">
        {page.category}
      </h3>
    </Copy>

    {/* Items list */}
    <ul className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
      {page.items.map((item) => (
        <li key={item.name} className="flex flex-col">
          <div className="flex items-baseline justify-between">
            <span className="text-base font-semibold leading-snug font-sans text-text">
              {item.name}
            </span>
          </div>
          {item.description ? (
            <p className="text-sm text-text-muted leading-relaxed">
              {item.description}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  </div>
);

/* ─────────────────────────────────────────── */
/*  Main Menu section                          */
/* ─────────────────────────────────────────── */
export default function Menu() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const total = menuPages.length;
  const sectionRef = useRef<HTMLElement>(null);
  const prevCurrentRef = useRef(0);

  const handlePrev = () => {
    setDirection("prev");
    setCurrent((c) => (c - 1 + total) % total);
  };
  const handleNext = () => {
    setDirection("next");
    setCurrent((c) => (c + 1) % total);
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll(".menu-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const slides = sectionRef.current.querySelectorAll(".menu-bg-slide");
      if (slides.length === 0) return;

      const prev = prevCurrentRef.current;
      prevCurrentRef.current = current;

      if (prev === current) {
        gsap.set(slides[current], { opacity: 1, xPercent: 0, pointerEvents: "auto" });
        return;
      }

      const isNext = direction === "next";

      gsap.set(slides[current], {
        opacity: 1,
        xPercent: isNext ? 100 : -100,
        pointerEvents: "auto",
      });

      gsap.to(slides[prev], {
        xPercent: isNext ? -100 : 100,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(slides[prev], { opacity: 0, pointerEvents: "none" });
        },
      });

      gsap.to(slides[current], {
        xPercent: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
    { scope: sectionRef, dependencies: [current, direction] }
  );

  return (
    <section id="menu" ref={sectionRef} className="relative w-full overflow-hidden">
      {/* ── Background images — sliding transition ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {menuPages.map((page, i) => (
          <div
            key={page.category}
            className="menu-bg-slide absolute inset-0 opacity-0 pointer-events-none"
            aria-hidden={i !== current}
          >
            <Image
              src={page.image}
              alt={page.category}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* dark scrim so the white card stays legible */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* ── DESKTOP layout (≥ sm) ── */}
      <div className="relative hidden sm:flex items-center justify-center gap-6 w-full h-screen px-12 py-10 box-border">
        <NavButton
          onClick={handlePrev}
          label="Previous"
        >
          <FaChevronLeft />
        </NavButton>

        <div className="flex flex-col items-center justify-center w-full max-w-xl h-[620px] relative z-10">
          <Copy animateOnScroll={true}>
            <h2 className="text-5xl font-cinzel capitalize text-white text-center tracking-tight drop-shadow-md">
              Our Menu
            </h2>
          </Copy>
          {/* Card */}
          <div className="menu-card bg-surface rounded-2xl w-full h-[540px] py-8 px-6 overflow-hidden flex flex-col border border-border shadow-sm opacity-0">
            <MenuCard page={menuPages[current]} />
          </div>
        </div>

        <NavButton
          onClick={handleNext}
          label="Next"
        >
          <FaChevronRight />
        </NavButton>
      </div>

      {/* ── MOBILE layout (< sm) ── */}
      <div className="relative flex sm:hidden flex-col items-center justify-center w-full h-screen px-4 py-6 box-border gap-4">
        <Copy animateOnScroll={true}>
          <h2 className="text-4xl font-cinzel text-white text-center tracking-tight drop-shadow-md">
            Our Menu
          </h2>
        </Copy>
        {/* Card */}
        <div className="menu-card bg-surface rounded-3xl w-full max-w-sm h-[760px] p-6 overflow-hidden flex flex-col border border-border shadow-sm opacity-0">
          <MenuCard page={menuPages[current]} />
        </div>

        <div className="flex justify-center gap-4">
          <NavButton
            onClick={handlePrev}
            label="Previous"
          >
            <FaChevronLeft />
          </NavButton>
          <NavButton
            onClick={handleNext}
            label="Next"
          >
            <FaChevronRight />
          </NavButton>
        </div>
      </div>
    </section>
  );
}

