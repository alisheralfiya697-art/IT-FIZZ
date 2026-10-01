import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollVisual, { VisualMode } from './ScrollVisual';
import Stats, { ENTERPRISE_STATS, MOBILITY_REFERENCE_STATS } from './Stats';

gsap.registerPlugin(ScrollTrigger);

const WELCOME_WORD = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];
const BRAND_WORD = ['I', 'T', 'Z', 'F', 'I', 'Z', 'Z'];

export const Hero: React.FC = () => {
  const [visualMode, setVisualMode] = useState<VisualMode>('vector-gt');
  const [statPreset, setStatPreset] = useState<'enterprise' | 'mobility'>('enterprise');

  // Structural & GSAP Refs
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const pinViewportRef = useRef<HTMLDivElement | null>(null);
  const bgAmbientRef = useRef<HTMLDivElement | null>(null);
  const headlineWrapperRef = useRef<HTMLHeadingElement | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const carIntroWrapperRef = useRef<HTMLDivElement | null>(null);

  // ScrollVisual Refs
  const trackRef = useRef<HTMLDivElement | null>(null);
  const carContainerRef = useRef<HTMLDivElement | null>(null);
  const frontWheelRef = useRef<SVGGElement | null>(null);
  const rearWheelRef = useRef<SVGGElement | null>(null);
  const headlightBeamRef = useRef<HTMLDivElement | null>(null);
  const slipstreamRef = useRef<SVGSVGElement | null>(null);
  const activeWingRef = useRef<SVGGElement | null>(null);
  const trackProgressRef = useRef<HTMLDivElement | null>(null);
  const carShadowRef = useRef<HTMLDivElement | null>(null);

  // Direct DOM Readout & Stat Bar Refs
  const scrollPercentRef = useRef<HTMLSpanElement | null>(null);
  const scrollPhaseRef = useRef<HTMLSpanElement | null>(null);
  const statProgressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statCardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const activeStats = statPreset === 'enterprise' ? ENTERPRISE_STATS : MOBILITY_REFERENCE_STATS;

  // Smoothly scroll window to a specific progress point (0..1) inside the Hero ScrollTrigger
  const handleSelectCheckpoint = useCallback((targetProgress: number) => {
    const st = scrollTriggerInstanceRef.current;
    if (st) {
      const clamped = Math.max(0, Math.min(1, targetProgress));
      const targetY = st.start + (st.end - st.start) * clamped;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  }, []);

  // 1. INITIAL PAGE LOAD ANIMATION (GSAP Intro Timeline)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered Headline Character Reveal
      const chars = charRefs.current.filter(Boolean);
      introTl.fromTo(
        chars,
        {
          opacity: 0,
          y: 26,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.03,
          clearProps: 'transform',
        },
        0.08
      );

      // Central Visual Element Entrance
      if (carIntroWrapperRef.current) {
        introTl.fromTo(
          carIntroWrapperRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            clearProps: 'transform',
          },
          0.28
        );
      }

      // Impact Statistics Staggered Reveal
      const cards = statCardRefs.current.filter(Boolean);
      introTl.fromTo(
        cards,
        {
          opacity: 0,
          y: 22,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.68,
          stagger: 0.1,
          clearProps: 'transform',
        },
        0.45
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // 2. CORE SCROLL-DRIVEN ANIMATION (GSAP ScrollTrigger with Scrub)
  useEffect(() => {
    const ctx = gsap.context(() => {
      let cachedMaxTravelX = 0;

      const measureMaxTravelX = () => {
        if (!trackRef.current || !carContainerRef.current) return 0;
        const trackWidth = trackRef.current.clientWidth;
        const carWidth = carContainerRef.current.clientWidth;
        const horizontalPadding = window.innerWidth < 640 ? 16 : 48;
        cachedMaxTravelX = Math.max(0, trackWidth - carWidth - horizontalPadding);
        return cachedMaxTravelX;
      };

      measureMaxTravelX();

      // Ensure SVG wheel groups rotate around their exact hub center
      if (frontWheelRef.current && rearWheelRef.current) {
        gsap.set([frontWheelRef.current, rearWheelRef.current], {
          svgOrigin: '0 0',
        });
      }

      let lastPercent = -1;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          pin: pinViewportRef.current,
          start: 'top top',
          end: () => (window.innerWidth < 768 ? '+=160%' : '+=220%'),
          scrub: 0.6, // Responsive smooth scrub that settles accurately when scrolling stops
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            measureMaxTravelX();
          },
          onUpdate: (self) => {
            const pct = Math.round(self.progress * 100);
            if (pct !== lastPercent) {
              lastPercent = pct;
              if (scrollPercentRef.current) {
                scrollPercentRef.current.textContent = `${pct}%`;
              }
              if (scrollPhaseRef.current) {
                if (pct < 8) {
                  scrollPhaseRef.current.textContent = 'SCROLL 0% · START POSITION';
                } else if (pct < 65) {
                  scrollPhaseRef.current.textContent = 'SCROLL 50% · MID-TRACK MOTION';
                } else {
                  scrollPhaseRef.current.textContent = 'SCROLL 100% · FINAL POSITION';
                }
              }
            }
          },
        },
      });

      scrollTriggerInstanceRef.current = scrollTl.scrollTrigger || null;

      // ---------------- PHASE 1: 0% -> 50% Scroll Progress ----------------
      // Visual translates horizontally & vertically, scales subtly, and tilts with acceleration
      scrollTl.to(
        carContainerRef.current,
        {
          x: () => measureMaxTravelX() * 0.52,
          y: () => (window.innerWidth < 640 ? -6 : -12),
          scale: () => (window.innerWidth < 640 ? 1.03 : 1.07),
          rotation: -1.2,
          force3D: true,
          ease: 'power1.inOut',
          duration: 0.5,
        },
        0
      );

      scrollTl.to(
        carShadowRef.current,
        {
          scaleX: 1.08,
          opacity: 0.75,
          force3D: true,
          ease: 'power1.inOut',
          duration: 0.5,
        },
        0
      );

      // Wheels rotate proportionally to horizontal distance (0 -> 360deg)
      if (frontWheelRef.current && rearWheelRef.current) {
        scrollTl.to(
          [frontWheelRef.current, rearWheelRef.current],
          {
            rotation: 360,
            ease: 'none',
            duration: 0.5,
          },
          0
        );
      }

      // Active rear wing deploys & headlight cone projects forward
      if (activeWingRef.current) {
        scrollTl.to(
          activeWingRef.current,
          {
            y: -5,
            rotation: -7,
            transformOrigin: '100% 50%',
            ease: 'power1.out',
            duration: 0.5,
          },
          0
        );
      }

      if (headlightBeamRef.current) {
        scrollTl.to(
          headlightBeamRef.current,
          {
            opacity: 0.92,
            scaleX: 1.2,
            force3D: true,
            ease: 'power1.inOut',
            duration: 0.5,
          },
          0
        );
      }

      if (slipstreamRef.current) {
        scrollTl.to(
          slipstreamRef.current,
          {
            opacity: 0.85,
            scaleX: 1.15,
            force3D: true,
            ease: 'power1.inOut',
            duration: 0.5,
          },
          0
        );
      }

      // Background ambient illumination shifts with parallax
      scrollTl.to(
        bgAmbientRef.current,
        {
          xPercent: 18,
          scale: 1.12,
          opacity: 0.85,
          force3D: true,
          ease: 'none',
          duration: 0.5,
        },
        0
      );

      // Runway progress line fills to 52%
      scrollTl.to(
        trackProgressRef.current,
        {
          scaleX: 0.52,
          force3D: true,
          ease: 'none',
          duration: 0.5,
        },
        0
      );

      // ---------------- PHASE 2: 50% -> 100% Scroll Progress ----------------
      // Visual reaches its final position, settles scale & pitch, and transitions cleanly
      scrollTl.to(
        carContainerRef.current,
        {
          x: () => measureMaxTravelX(),
          y: 0,
          scale: 1.0,
          rotation: 0,
          force3D: true,
          ease: 'power1.inOut',
          duration: 0.5,
        },
        0.5
      );

      scrollTl.to(
        carShadowRef.current,
        {
          scaleX: 1,
          opacity: 0.95,
          force3D: true,
          ease: 'power1.inOut',
          duration: 0.5,
        },
        0.5
      );

      // Wheels complete 720deg rotation
      if (frontWheelRef.current && rearWheelRef.current) {
        scrollTl.to(
          [frontWheelRef.current, rearWheelRef.current],
          {
            rotation: 720,
            ease: 'none',
            duration: 0.5,
          },
          0.5
        );
      }

      // Background layer completes horizontal transition
      scrollTl.to(
        bgAmbientRef.current,
        {
          xPercent: 36,
          scale: 1,
          opacity: 0.65,
          force3D: true,
          ease: 'none',
          duration: 0.5,
        },
        0.5
      );

      // Runway progress line reaches 100%
      scrollTl.to(
        trackProgressRef.current,
        {
          scaleX: 1,
          force3D: true,
          ease: 'none',
          duration: 0.5,
        },
        0.5
      );

      // Scroll-Driven Stat Card Progress Bars (Pure GSAP scaleX across the 4 quarters)
      statProgressRefs.current.forEach((barEl, idx) => {
        if (!barEl) return;
        scrollTl.fromTo(
          barEl,
          { scaleX: 0 },
          {
            scaleX: 1,
            force3D: true,
            ease: 'none',
            duration: 0.25,
          },
          idx * 0.25
        );
      });

      // Progressive Headline Character Illumination Synced to Scroll
      const validChars = charRefs.current.filter(Boolean);
      if (validChars.length > 0) {
        scrollTl.to(
          validChars,
          {
            color: '#E2F163',
            stagger: 0.06,
            duration: 0.16,
            ease: 'none',
          },
          0.02
        );
      }

      // Subtle headline parallax shift across the scroll range
      scrollTl.to(
        headlineWrapperRef.current,
        {
          x: () => (window.innerWidth < 768 ? -6 : -18),
          force3D: true,
          ease: 'none',
          duration: 1,
        },
        0
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, [visualMode, statPreset]);

  let charCounter = 0;

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative w-full bg-[#090A0F] overflow-hidden"
    >
      {/* Pinned First-Viewport Container */}
      <div
        ref={pinViewportRef}
        className="relative w-full h-dvh min-h-[560px] flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 px-4 sm:px-8 max-w-[1360px] mx-auto overflow-hidden"
      >
        {/* Layered Background Atmospheric Glow (Scroll-Parallax Controlled) */}
        <div
          ref={bgAmbientRef}
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 w-[280px] sm:w-[560px] h-[280px] sm:h-[560px] rounded-full opacity-60 blur-[110px] gpu-layer"
          style={{
            background:
              'radial-gradient(circle, rgba(226,241,99,0.14) 0%, rgba(56,189,248,0.05) 50%, rgba(9,10,15,0) 75%)',
          }}
        />

        {/* ================= TOP HEADER & LETTER-SPACED HEADLINE ================= */}
        <div className="relative z-10 flex flex-col gap-2 sm:gap-3">
          {/* Control & Readout Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/[0.07]">
            {/* Unboxed Metadata Readout with Typographic Separators */}
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#9499A6]">
              <span className="text-[#E2F163] font-semibold" ref={scrollPercentRef}>
                0%
              </span>
              <span aria-hidden="true">·</span>
              <span ref={scrollPhaseRef} className="text-[#F4F5F8]">
                SCROLL 0% · START POSITION
              </span>
            </div>

            {/* Interactive Controls: Visual Mode & Stat Preset Switchers */}
            <div className="flex items-center gap-2">
              <div
                role="group"
                aria-label="Visual Render Mode"
                className="flex items-center gap-1 p-1 bg-[#11131C] border border-white/[0.08] rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => setVisualMode('vector-gt')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    visualMode === 'vector-gt'
                      ? 'bg-[#E2F163] text-[#090A0F] font-semibold'
                      : 'text-[#9499A6] hover:text-[#F4F5F8]'
                  }`}
                >
                  Interactive GT
                </button>
                <button
                  type="button"
                  onClick={() => setVisualMode('studio-render')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    visualMode === 'studio-render'
                      ? 'bg-[#E2F163] text-[#090A0F] font-semibold'
                      : 'text-[#9499A6] hover:text-[#F4F5F8]'
                  }`}
                >
                  Studio Photo
                </button>
              </div>

              <div
                role="group"
                aria-label="Statistics Dataset"
                className="hidden lg:flex items-center gap-1 p-1 bg-[#11131C] border border-white/[0.08] rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => setStatPreset('enterprise')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    statPreset === 'enterprise'
                      ? 'bg-white/[0.12] text-[#F4F5F8]'
                      : 'text-[#9499A6] hover:text-[#F4F5F8]'
                  }`}
                >
                  Primary Stats
                </button>
                <button
                  type="button"
                  onClick={() => setStatPreset('mobility')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    statPreset === 'mobility'
                      ? 'bg-white/[0.12] text-[#F4F5F8]'
                      : 'text-[#9499A6] hover:text-[#F4F5F8]'
                  }`}
                >
                  Reference Stats
                </button>
              </div>
            </div>
          </div>

          {/* Required Large Letter-Spaced Headline: "W E L C O M E I T Z F I Z Z" */}
          <div className="pt-0.5 sm:pt-1">
            <h1
              ref={headlineWrapperRef}
              aria-label="WELCOME ITZFIZZ"
              className="font-display font-extrabold text-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px] leading-tight tracking-[0.20em] sm:tracking-[0.28em] text-[#F4F5F8] flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-1 gpu-layer select-none"
            >
              {/* Word 1: W E L C O M E */}
              <span className="inline-flex items-center">
                {WELCOME_WORD.map((letter) => {
                  const idx = charCounter++;
                  return (
                    <span
                      key={`welcome-${idx}`}
                      ref={(el) => {
                        charRefs.current[idx] = el;
                      }}
                      className="hero-char inline-block text-[#D5D9E4] gpu-layer"
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>

              {/* Word 2: I T Z F I Z Z */}
              <span className="inline-flex items-center">
                {BRAND_WORD.map((letter) => {
                  const idx = charCounter++;
                  return (
                    <span
                      key={`brand-${idx}`}
                      ref={(el) => {
                        charRefs.current[idx] = el;
                      }}
                      className="hero-char inline-block text-[#F4F5F8] gpu-layer"
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>
            </h1>

            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-[#9499A6] max-w-2xl">
              Scroll down to drive the vehicle forward along the runway — scroll back up to reverse the animation smoothly.
            </p>
          </div>
        </div>

        {/* ================= CENTRAL SCROLL-DRIVEN VISUAL ELEMENT ================= */}
        <div ref={carIntroWrapperRef} className="relative z-20 my-auto gpu-layer">
          <ScrollVisual
            visualMode={visualMode}
            trackRef={trackRef}
            carContainerRef={carContainerRef}
            frontWheelRef={frontWheelRef}
            rearWheelRef={rearWheelRef}
            headlightBeamRef={headlightBeamRef}
            slipstreamRef={slipstreamRef}
            activeWingRef={activeWingRef}
            trackProgressRef={trackProgressRef}
            carShadowRef={carShadowRef}
            onSelectCheckpoint={handleSelectCheckpoint}
          />
        </div>

        {/* ================= BOTTOM IMPACT STATISTICS (3-4 STATS) ================= */}
        <div className="relative z-10">
          <Stats
            stats={activeStats}
            onSelectCheckpoint={handleSelectCheckpoint}
            statProgressRefs={statProgressRefs}
            statCardRefs={statCardRefs}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
