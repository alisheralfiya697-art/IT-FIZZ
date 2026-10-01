import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ConceptChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  specs: { label: string; value: string }[];
}

const CONCEPT_CHAPTERS: ConceptChapter[] = [
  {
    id: 'aerodynamics',
    number: '01',
    title: 'Scroll-Linked Scrubbing & Direction Reversal',
    subtitle: 'GSAP ScrollTrigger · Smooth Interpolation',
    description:
      'Rather than relying on fixed time-based autoplay loops, the central vehicle responds directly to the user’s scroll position. Scrolling down advances horizontal translation, subtle elevation, scale, and wheel rotation, while scrolling up naturally reverses the timeline.',
    image: '/src/assets/images/concept_aero_windtunnel_1790836829860.jpg',
    imageAlt: 'Aerodynamic wind tunnel visualization of the concept car',
    specs: [
      { label: 'Control Mechanism', value: 'Scroll Position' },
      { label: 'Scrub Smoothing', value: '0.6s Fluid' },
      { label: 'Direction Support', value: 'Forward & Reverse' },
    ],
  },
  {
    id: 'cockpit',
    number: '02',
    title: 'Visual Hierarchy & High-Contrast Readability',
    subtitle: 'Balanced Layout · Clear Typography',
    description:
      'Designed around a 60-30-10 dark studio palette, the hero section pairs the letter-spaced headline with a dedicated central animation runway and four structured statistic cards below, ensuring the moving visual never obscures important text.',
    image: '/src/assets/images/cockpit_interior_detail_1790836846355.jpg',
    imageAlt: 'Minimalist studio cockpit interior detail',
    specs: [
      { label: 'Text Contrast', value: 'WCAG AA+' },
      { label: 'Intro Sequence', value: 'Staggered Reveal' },
      { label: 'Viewport Fit', value: '100dvh Pinned' },
    ],
  },
  {
    id: 'powertrain',
    number: '03',
    title: 'GPU-Friendly Transform Pipeline',
    subtitle: 'Compositor Properties · Zero Layout Reflows',
    description:
      'By restricting scroll-driven motion to hardware-accelerated transform properties (translate3d, scale, rotate) and opacity, the animation avoids expensive DOM layout recalculations and React state re-renders during scroll events.',
    image: '/src/assets/images/hero_hypercar_studio_1790836809765.jpg',
    imageAlt: 'ITZFIZZ concept car studio profile render',
    specs: [
      { label: 'Animated Properties', value: 'translate3d / scale' },
      { label: 'Wheel Rotation', value: '720° Synced' },
      { label: 'Scroll Re-Renders', value: '0 State Updates' },
    ],
  },
];

export const ConceptSection: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentBlockRef = useRef<HTMLDivElement | null>(null);

  const activeChapter = CONCEPT_CHAPTERS[activeChapterIndex];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.concept-reveal',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChapterSelect = (index: number) => {
    setActiveChapterIndex(index);
    if (contentBlockRef.current) {
      gsap.fromTo(
        contentBlockRef.current,
        { opacity: 0.4, y: 8 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
      );
    }
  };

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-8 bg-[#090A0F] border-t border-white/[0.08]"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="concept-reveal max-w-2xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#9499A6] mb-3">
            <span className="text-[#E2F163]">SECTION 02</span>
            <span aria-hidden="true">·</span>
            <span>CONCEPT & INTERACTION ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F5F8] leading-tight [text-wrap:balance]">
            Precision Motion Driven Directly by User Scroll
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9499A6] leading-relaxed">
            Explore how the hero section coordinates initial page-load animations, scroll-scrubbed vehicle kinematics, and responsive layout calculation.
          </p>
        </div>

        {/* Interactive Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Numbered Editorial Chapter Selector (5 cols) */}
          <div className="concept-reveal lg:col-span-5 flex flex-col gap-3">
            {CONCEPT_CHAPTERS.map((chapter, idx) => {
              const isSelected = idx === activeChapterIndex;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => handleChapterSelect(idx)}
                  className={`w-full text-left p-5 sm:p-6 rounded-xl border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2F163] ${
                    isSelected
                      ? 'bg-[#11131C] border-[#E2F163]/60'
                      : 'bg-[#11131C]/40 border-white/[0.07] hover:border-white/[0.18] hover:bg-[#11131C]/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#9499A6] mb-2">
                    <span className={isSelected ? 'text-[#E2F163] font-semibold' : ''}>
                      {chapter.number}. {chapter.subtitle}
                    </span>
                    <span className={isSelected ? 'text-[#E2F163]' : 'text-[#9499A6]'}>
                      {isSelected ? 'Active' : 'Inspect →'}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#F4F5F8]">
                    {chapter.number}. {chapter.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Chapter Visual & Technical Breakdown (7 cols) */}
          <div
            ref={contentBlockRef}
            className="concept-reveal lg:col-span-7 rounded-2xl bg-[#11131C] border border-white/[0.08] overflow-hidden"
          >
            {/* Visual Media Frame with Resilient Fallback */}
            <div className="relative aspect-[16/9] w-full bg-[#090A0F] overflow-hidden">
              {!failedImages[activeChapter.id] ? (
                <img
                  src={activeChapter.image}
                  alt={activeChapter.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedImages((prev) => ({ ...prev, [activeChapter.id]: true }))
                  }
                  className="w-full h-full object-cover object-center transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#11131C] via-[#090A0F] to-[#181C2B] text-center">
                  <span className="font-mono-tabular text-xs text-[#E2F163] mb-2">
                    {activeChapter.number} · {activeChapter.subtitle}
                  </span>
                  <span className="font-display text-xl font-bold text-[#F4F5F8]">
                    {activeChapter.title}
                  </span>
                </div>
              )}

              {/* Measured Contrast Scrim */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11131C] via-transparent to-black/30" />

              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-mono-tabular text-[#F4F5F8]">
                <span>{activeChapter.number} · ARCHITECTURE NOTE</span>
                <span className="text-[#E2F163]">{activeChapter.subtitle}</span>
              </div>
            </div>

            {/* Prose & Tabular Specifications */}
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F5F8] mb-3">
                {activeChapter.title}
              </h3>
              <p className="text-sm sm:text-base text-[#9499A6] leading-relaxed mb-6">
                {activeChapter.description}
              </p>

              {/* 3-Column Specification Strip */}
              <div className="pt-5 border-t border-white/[0.08] grid grid-cols-3 gap-4">
                {activeChapter.specs.map((spec) => (
                  <div key={spec.label}>
                    <div className="text-[11px] text-[#9499A6] mb-1">{spec.label}</div>
                    <div className="font-mono-tabular text-sm sm:text-base font-semibold text-[#F4F5F8]">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
