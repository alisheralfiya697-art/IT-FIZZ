import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type DeviceProfileKey = 'desktop' | 'tablet' | 'mobile';

interface DeviceProfile {
  label: string;
  viewport: string;
  scrollTrack: string;
  translateXRange: string;
  scalePeak: string;
  wheelRotation: string;
  overflowProtection: string;
}

const DEVICE_PROFILES: Record<DeviceProfileKey, DeviceProfile> = {
  desktop: {
    label: 'Desktop & Laptop',
    viewport: '1440px × 900px',
    scrollTrack: '220% Viewport Pin',
    translateXRange: 'Dynamic Track Width',
    scalePeak: '1.00 → 1.07 → 1.00',
    wheelRotation: '0° → +720° Reversible',
    overflowProtection: 'Bounded Runway Container',
  },
  tablet: {
    label: 'Tablet Portrait',
    viewport: '768px × 1024px',
    scrollTrack: '220% Viewport Pin',
    translateXRange: 'Dynamic Track Width',
    scalePeak: '1.00 → 1.07 → 1.00',
    wheelRotation: '0° → +720° Reversible',
    overflowProtection: 'Bounded Runway Container',
  },
  mobile: {
    label: 'Mobile Handheld',
    viewport: '390px × 844px',
    scrollTrack: '160% Viewport Pin',
    translateXRange: 'Compact Overflow-Safe',
    scalePeak: '1.00 → 1.03 → 1.00',
    wheelRotation: '0° → +720° Reversible',
    overflowProtection: 'Simplified Layer Stack',
  },
};

interface FeaturesProps {
  onReturnToHero: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onReturnToHero }) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceProfileKey>('desktop');
  const sectionRef = useRef<HTMLElement | null>(null);

  const activeProfile = DEVICE_PROFILES[selectedDevice];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-bento-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-8 bg-[#090A0F] border-t border-white/[0.08]"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#9499A6] mb-3">
              <span className="text-[#E2F163]">SECTION 03</span>
              <span aria-hidden="true">·</span>
              <span>TECHNICAL IMPLEMENTATION & METRICS</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F5F8] leading-tight [text-wrap:balance]">
              Engineered for Smooth Scroll Performance Across Every Screen
            </h2>
          </div>

          <button
            type="button"
            onClick={onReturnToHero}
            className="self-start md:self-auto px-4 py-2.5 text-xs font-semibold text-[#F4F5F8] bg-[#11131C] border border-white/[0.12] rounded-lg hover:border-[#E2F163] hover:text-[#E2F163] transition-colors duration-150 whitespace-nowrap cursor-pointer"
          >
            ↑ Return to Hero Animation
          </button>
        </div>

        {/* Asymmetric Bento Grid (col-span-2 + col-span-1 pattern) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1 (Col-Span-2): Interactive Responsive Kinematics Matrix */}
          <div className="feature-bento-card lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#11131C] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-mono-tabular text-[#9499A6] mb-1">
                    01 · RESPONSIVE SCROLL CALIBRATION
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F5F8]">
                    01. Adaptive ScrollTrigger Scrubbing & Viewport Math
                  </h3>
                </div>

                {/* Interactive Segmented Control for Device Profiles */}
                <div
                  role="group"
                  aria-label="Select Viewport Profile"
                  className="flex items-center gap-1 p-1 bg-[#090A0F] border border-white/[0.08] rounded-lg"
                >
                  {(['desktop', 'tablet', 'mobile'] as DeviceProfileKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedDevice(key)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer capitalize ${
                        selectedDevice === key
                          ? 'bg-[#E2F163] text-[#090A0F] font-semibold'
                          : 'text-[#9499A6] hover:text-[#F4F5F8]'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#9499A6] leading-relaxed mb-6">
                Using cached container measurements refreshed on resize (<code className="font-mono-tabular text-xs text-[#F4F5F8]">invalidateOnRefresh: true</code>), horizontal vehicle travel adapts automatically to the available runway width. This prevents horizontal overflow and ensures the visual never overlaps the headline or statistics on desktop, tablet, or mobile.
              </p>
            </div>

            {/* Tabular Specification Readout for Selected Device */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-[#9499A6] mb-1">Reference Viewport</div>
                <div className="font-mono-tabular text-sm font-semibold text-[#F4F5F8]">
                  {activeProfile.viewport}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#9499A6] mb-1">Pin Scroll Distance</div>
                <div className="font-mono-tabular text-sm font-semibold text-[#E2F163]">
                  {activeProfile.scrollTrack}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#9499A6] mb-1">Horizontal Travel (X)</div>
                <div className="font-mono-tabular text-sm font-semibold text-[#F4F5F8]">
                  {activeProfile.translateXRange}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#9499A6] mb-1">Scale Interpolation</div>
                <div className="font-mono-tabular text-sm font-semibold text-[#F4F5F8]">
                  {activeProfile.scalePeak}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#9499A6] mb-1">Wheel Rotation</div>
                <div className="font-mono-tabular text-sm font-semibold text-[#F4F5F8]">
                  {activeProfile.wheelRotation}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#9499A6] mb-1">Overflow Safeguard</div>
                <div className="font-mono-tabular text-sm font-semibold text-[#E2F163]">
                  {activeProfile.overflowProtection}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 (Col-Span-1): Compositor-Only Discipline */}
          <div className="feature-bento-card p-6 sm:p-8 rounded-2xl bg-[#11131C] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono-tabular text-[#9499A6] mb-1">
                02 · GPU PIPELINE ISOLATION
              </div>
              <h3 className="font-display text-xl font-bold text-[#F4F5F8] mb-3">
                02. Transform-Only Motion
              </h3>
              <p className="text-sm text-[#9499A6] leading-relaxed mb-6">
                Animating layout properties such as <code className="font-mono-tabular text-xs text-[#F4F5F8]">left</code>, <code className="font-mono-tabular text-xs text-[#F4F5F8]">top</code>, or <code className="font-mono-tabular text-xs text-[#F4F5F8]">width</code> forces costly browser layout recalculations. Every animated element here uses GPU-friendly transforms.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/[0.08] font-mono-tabular text-xs">
              <div className="flex items-center justify-between text-[#F4F5F8]">
                <span>translate3d(x, y, 0)</span>
                <span className="text-[#E2F163]">Active</span>
              </div>
              <div className="flex items-center justify-between text-[#F4F5F8]">
                <span>scale() &amp; rotate()</span>
                <span className="text-[#E2F163]">Active</span>
              </div>
              <div className="flex items-center justify-between text-[#F4F5F8]">
                <span>React State on Scroll</span>
                <span className="text-[#E2F163]">None (Zero Lag)</span>
              </div>
            </div>
          </div>

          {/* Card 3 (Col-Span-1): Lifecycle & Memory Hygiene */}
          <div className="feature-bento-card p-6 sm:p-8 rounded-2xl bg-[#11131C] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono-tabular text-[#9499A6] mb-1">
                03 · REACT LIFECYCLE CLEANUP
              </div>
              <h3 className="font-display text-xl font-bold text-[#F4F5F8] mb-3">
                03. Scoped GSAP Contexts
              </h3>
              <p className="text-sm text-[#9499A6] leading-relaxed mb-6">
                Both the page-load intro timeline and the ScrollTrigger scrub timeline run inside scoped <code className="font-mono-tabular text-xs text-[#F4F5F8]">gsap.context()</code> hooks and call <code className="font-mono-tabular text-xs text-[#F4F5F8]">ctx.revert()</code> on cleanup.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono-tabular text-[#9499A6]">
              <span>Reduced Motion Media Query</span>
              <span className="text-[#F4F5F8]">Supported</span>
            </div>
          </div>

          {/* Card 4 (Col-Span-2): Summary of Impact Metrics */}
          <div className="feature-bento-card lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#11131C] border border-white/[0.08] flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6">
                <div className="text-xs font-mono-tabular text-[#9499A6] mb-1">
                  04 · CORE HERO STATISTICS
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F5F8] mb-3">
                  04. Synchronized Statistic Checkpoints
                </h3>
                <p className="text-sm text-[#9499A6] leading-relaxed">
                  Each impact statistic in the hero section is paired with a scroll-linked progress bar that fills sequentially across the four quarters of the scroll timeline (0–25%, 25–50%, 50–75%, and 75–100%). Clicking any statistic smoothly scrolls to its corresponding checkpoint.
                </p>
              </div>

              {/* Core Statistics Summary Grid */}
              <div className="md:col-span-6 pt-4 md:pt-0 md:pl-6 border-t md:border-t-0 md:border-l border-white/[0.08] grid grid-cols-2 gap-4">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#E2F163] font-mono-tabular">
                    85%
                  </div>
                  <div className="text-xs text-[#F4F5F8] font-medium mt-0.5">
                    Customer Satisfaction
                  </div>
                  <div className="text-[11px] text-[#9499A6]">Quarter 1 Checkpoint</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#F4F5F8] font-mono-tabular">
                    92%
                  </div>
                  <div className="text-xs text-[#F4F5F8] font-medium mt-0.5">
                    Project Success
                  </div>
                  <div className="text-[11px] text-[#9499A6]">Quarter 2 Checkpoint</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#F4F5F8] font-mono-tabular">
                    78%
                  </div>
                  <div className="text-xs text-[#F4F5F8] font-medium mt-0.5">
                    Growth
                  </div>
                  <div className="text-[11px] text-[#9499A6]">Quarter 3 Checkpoint</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#E2F163] font-mono-tabular">
                    95%
                  </div>
                  <div className="text-xs text-[#F4F5F8] font-medium mt-0.5">
                    Client Retention
                  </div>
                  <div className="text-[11px] text-[#9499A6]">Quarter 4 Checkpoint</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
