"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/Copy/Copy";
import { Marquee } from "@/components/ui/marquee";
import { Highlighter } from "@/components/ui/highlighter";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const pillRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pillRef.current || !heroRef.current) return;

      const pill = pillRef.current;

      /*
       * Scroll-driven animation:
       * The pill starts centered in the hero (just below the text).
       * As you scroll the pinned hero:
       *   1. It slides DOWN to the bottom of the hero
       *   2. Simultaneously EXPANDS in width → full viewport width
       *   3. Grows slightly in height
       *   4. Loses its border-radius → becomes a rectangular banner
       * It ends up sitting at the boundary between the two sections.
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%", // one full viewport height of scrolling
          scrub: 1.4,
          pin: heroRef.current,
          anticipatePin: 1,
        },
      });

      // Set initial position and width via GSAP so transforms don't conflict.
      // Top is computed from the text block's actual bottom so there's no gap
      // on any screen size, and the pill width is clamped to the viewport.
      gsap.set(pill, {
        xPercent: -50,
        scale: 0,
        transformOrigin: "center center",
        width:
          window.innerWidth >= 768
            ? "580px"
            : `${Math.min(350, window.innerWidth - 32)}px`,
        top: () => {
          const heroRect = heroRef.current!.getBoundingClientRect();
          const textRect = textRef.current!.getBoundingClientRect();
          // Place pill's top edge right at the text block's bottom edge
          return textRect.bottom - heroRect.top;
        },
      });

      // Entry animation: expand from center (0 to 100%)
      gsap.to(pill, {
        scale: 1,
        duration: 1.2,
        delay: 3.9,
        ease: "elastic.out(1, 0.75)",
      });

      tl.to(pill, {
        // Slide down so the pill lands flush at the bottom of the hero.
        // Use pill.offsetTop (GSAP-set) so the math is always accurate.
        y: () => {
          const heroH = heroRef.current!.offsetHeight;
          return heroH - pill.offsetTop - pill.offsetHeight / 2;
        },
        width: "100vw",
        height: "clamp(5.5rem, 7vw, 7rem)",
        borderRadius: "0px",
        // Collapse left + right borders; keep top + bottom as a stripe
        borderLeftWidth: 0,
        borderRightWidth: 0,
        boxShadow: "none",
        ease: "none",
      });
    },
    { scope: heroRef },
  );

  return (
    <>
      {/* Hero: pinned while pill animation plays */}
      <section
        id="home"
        ref={heroRef}
        className="w-full h-screen flex flex-col items-center justify-center select-none relative overflow-visible"
        style={{ zIndex: 10 }}
      >
        {/* Background floating bao images */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Top Left */}
          <div className="absolute top-[12%] left-[6%] md:left-[12%] w-24 h-24 md:w-36 md:h-36 opacity-80 animate-float-slow will-change-transform">
            <img
              src="/bao/bao1.png"
              alt="Bao 1"
              className="w-full h-full object-contain filter drop-shadow-md -rotate-12"
              loading="eager"
            />
          </div>
          {/* Top Right */}
          <div className="absolute top-[15%] right-[6%] md:right-[12%] w-28 h-28 md:w-40 md:h-40 opacity-80 animate-float-delayed will-change-transform">
            <img
              src="/bao/bao2.png"
              alt="Bao 2"
              className="w-full h-full object-contain filter drop-shadow-md rotate-12"
              loading="eager"
            />
          </div>
          {/* Bottom Left */}
          <div className="absolute bottom-[18%] left-[5%] md:left-[10%] w-28 h-28 md:w-40 md:h-40 opacity-80 animate-float-reverse will-change-transform">
            <img
              src="/bao/bao3.png"
              alt="Bao 3"
              className="w-full h-full object-contain filter drop-shadow-md rotate-6"
              loading="eager"
            />
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-[20%] right-[5%] md:right-[10%] w-24 h-24 md:w-36 md:h-36 opacity-80 animate-float-slow will-change-transform">
            <img
              src="/bao/bao4.png"
              alt="Bao 4"
              className="w-full h-full object-contain filter drop-shadow-md -rotate-6"
              loading="eager"
            />
          </div>
        </div>

        {/*
         * Centering wrapper — includes text + a spacer equal to the pill's
         * starting height so that justify-center treats the whole group
         * (text + pill) as one unit, keeping everything visually centered.
         */}
        <div className="flex flex-col items-center z-10">
          {/* Text stack */}
          <div ref={textRef} className="flex flex-col items-center gap-2">
            <Copy delay={3.5}>
              <h1 className="text-[4.2rem] md:text-[7rem] text-center leading-none font-bold tracking-tight font-cinzel">
                Since 2016
              </h1>
            </Copy>

            <Copy delay={3.7}>
              <p className="text-[32px] md:text-[53px] text-center font-bold tracking-tight font-cinzel capitalize -mt-6 md:-mt-10">
                Art of Steamed Buns
              </p>
            </Copy>
          </div>

          {/* Invisible spacer matching the pill's initial height */}
          <div
            aria-hidden="true"
            className="pointer-events-none"
            style={{ height: "clamp(4.5rem, 7vw, 8rem)" }}
          />
        </div>

        {/*
         * Pill marquee — sits just below center of hero.
         * absolute + left:50% — GSAP handles xPercent:-50 centering so
         * there's no CSS transform conflict when GSAP animates y.
         * On scroll it slides down and expands into a full-width banner.
         */}
        <div
          ref={pillRef}
          style={{
            position: "absolute",
            top: undefined, // GSAP sets this from text block's bottom
            left: "50%",
            width: undefined, // GSAP sets this on mount (350px / 580px)
            height: "clamp(4.5rem, 7vw, 8rem)",
            borderRadius: "9999px",
            border: "4px solid var(--primary)",
            background: "var(--surface)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 8px 40px rgba(158,75,62,0.2)",
            willChange: "transform, width, height",
            zIndex: 20,
          }}
          className="-mt-2 md:-mt-5"
        >
          <Marquee className="py-2 [--duration:20s]" repeat={4}>
            <span className="text-5xl md:text-7xl px-4 shrink-0 leading-none font-extrabold text-primary font-sans">
              Bao Bakery Bao Bakery Bao Bakery Bao Bakery
            </span>
          </Marquee>
        </div>
      </section>

      {/* Next section — pill arrives here as a top banner */}
      <section
        id="about"
        className="w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 bg-background relative"
        style={{ position: "relative", zIndex: 5 }}
      >
        <div className="min-h-screen flex flex-col justify-center items-center max-w-3xl md:max-w-7xl mx-auto text-center">
          <Copy animateOnScroll={true}>
            <p className="text-lg md:text-4xl text-text-muted leading-relaxed font-sans font-medium">
              Bao Bakery offers some of the best{" "}
              <Highlighter
                isView={true}
                animationDuration={1000}
                color="#7A5C86"
              >
                Chinese-Filipino steam buns
              </Highlighter>{" "}
              ,as well as a wonderful selection of baked goods and pastries.
              Don&apos;t miss out on our popular{" "}
              <Highlighter
                isView={true}
                action="underline"
                strokeWidth={10}
                color="#9E4B3E"
              >
                BBQ Pork (Asado) and Chicken Deluxe (Bola Bola)
              </Highlighter>{" "}
              steamed buns!
            </p>
            <br />
            <p className="text-lg md:text-4xl text-text-muted leading-relaxed font-sans font-medium ">
              Are you in the mood for something sweet? No worries, we&apos;ve
              got you covered! From our deep-fried sesame balls down to our
              amazing coconut buns to mochi, anything goes!
            </p>
            <br />
            <p className="text-lg md:text-4xl text-text-muted leading-relaxed font-sans font-medium ">
              Order safely from the comfort of your home via{" "}
              <Link
                href="https://www.ubereats.com/ca/store/bao-bakery/4gRq2CYzQoy6eqNXZOPzjQ?diningMode=DELIVERY&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjc3JTIwV2FsdGVyJTIwSGFyZHdpY2slMjBBdmUlMjIlMkMlMjJyZWZlcmVuY2UlMjIlM0ElMjJDaElKYnlod2gyRnhobFFSNzdFdW9hbW9YSFElMjIlMkMlMjJyZWZlcmVuY2VUeXBlJTIyJTNBJTIyZ29vZ2xlX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBNDkuMjcwOTE3NyUyQyUyMmxvbmdpdHVkZSUyMiUzQS0xMjMuMTA1NzI2NyU3RA%3D%3D&ps=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Highlighter
                isView={true}
                action="underline"
                strokeWidth={10}
                color="#0BC167"
              >
                UberEats
              </Highlighter>{" "}
              </Link>{" "}
              or{" "}
              <Link
                href="https://www.skipthedishes.com/bao-bakery"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Highlighter
                isView={true}
                action="underline"
                strokeWidth={10}
                color="#FF8000"
              >
                SkiptheDishes
              </Highlighter>{" "}
              </Link>{" "}
              and check us out on Instagram!
            </p>
          </Copy>
        </div>
      </section>
    </>
  );
}
