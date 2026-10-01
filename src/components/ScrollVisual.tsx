import React, { useState } from 'react';

export type VisualMode = 'vector-gt' | 'studio-render';

interface ScrollVisualProps {
  visualMode: VisualMode;
  trackRef: React.RefObject<HTMLDivElement | null>;
  carContainerRef: React.RefObject<HTMLDivElement | null>;
  frontWheelRef: React.RefObject<SVGGElement | null>;
  rearWheelRef: React.RefObject<SVGGElement | null>;
  headlightBeamRef: React.RefObject<HTMLDivElement | null>;
  slipstreamRef: React.RefObject<SVGSVGElement | null>;
  activeWingRef: React.RefObject<SVGGElement | null>;
  trackProgressRef: React.RefObject<HTMLDivElement | null>;
  carShadowRef: React.RefObject<HTMLDivElement | null>;
  onSelectCheckpoint: (progress: number) => void;
}

const STUDIO_CAR_IMAGE = '/src/assets/images/hero_hypercar_studio_1790836809765.jpg';

export const ScrollVisual: React.FC<ScrollVisualProps> = ({
  visualMode,
  trackRef,
  carContainerRef,
  frontWheelRef,
  rearWheelRef,
  headlightBeamRef,
  slipstreamRef,
  activeWingRef,
  trackProgressRef,
  carShadowRef,
  onSelectCheckpoint,
}) => {
  const [imageError, setImageError] = useState(false);

  const checkpoints = [
    { label: '0% · Start', progress: 0 },
    { label: '25%', progress: 0.25 },
    { label: '50% · Midpoint', progress: 0.5 },
    { label: '75%', progress: 0.75 },
    { label: '100% · End', progress: 1 },
  ];

  return (
    <div className="relative w-full select-none py-1 sm:py-3">
      {/* Subtle architectural perspective grid & ambient depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-36 sm:h-48 lg:h-52 rounded-2xl border border-white/[0.05] bg-gradient-to-b from-[#11131C]/40 via-[#090A0F]/80 to-[#11131C]/40 overflow-hidden"
      >
        <div className="w-full h-full grid grid-cols-4 divide-x divide-white/[0.04]">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>

      {/* Main Horizontal Runway Track */}
      <div
        ref={trackRef}
        className="relative w-full h-36 sm:h-48 lg:h-52 flex items-center px-2 sm:px-6 overflow-hidden"
      >
        {/* Scroll-Driven Vehicle Wrapper (Animated strictly via GSAP translate3d, scale, rotate) */}
        <div
          ref={carContainerRef}
          className="relative z-20 w-[210px] sm:w-[330px] md:w-[400px] lg:w-[460px] shrink-0 gpu-layer"
        >
          {/* Aerodynamic Slipstream Lines (Reduced on mobile for leaner complexity) */}
          <svg
            ref={slipstreamRef}
            viewBox="0 0 600 180"
            fill="none"
            aria-hidden="true"
            className="hidden sm:block pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-[115%] h-full opacity-25 origin-right gpu-layer"
          >
            <path
              d="M10 48 C 160 48, 280 28, 460 36"
              stroke="url(#slipGradient1)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
            <path
              d="M0 95 C 140 95, 260 88, 520 92"
              stroke="url(#slipGradient2)"
              strokeWidth="2"
            />
            <path
              d="M35 136 C 180 136, 310 140, 490 138"
              stroke="url(#slipGradient1)"
              strokeWidth="1.2"
            />
            <defs>
              <linearGradient id="slipGradient1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E2F163" stopOpacity="0" />
                <stop offset="65%" stopColor="#E2F163" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#F4F5F8" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="slipGradient2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                <stop offset="50%" stopColor="#E2F163" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#E2F163" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Volumetric Front Headlight Projection Beam */}
          <div
            ref={headlightBeamRef}
            aria-hidden="true"
            className="pointer-events-none absolute right-[-48px] sm:right-[-96px] top-[46%] -translate-y-1/2 w-16 sm:w-36 h-10 sm:h-18 origin-left opacity-45 gpu-layer"
            style={{
              background:
                'linear-gradient(90deg, rgba(226,241,99,0.40) 0%, rgba(226,241,99,0.10) 55%, rgba(226,241,99,0) 100%)',
              clipPath: 'polygon(0% 38%, 100% 0%, 100% 100%, 0% 62%)',
              filter: 'blur(5px)',
            }}
          />

          {/* Floor Shadow & Kinetic Underglow */}
          <div
            ref={carShadowRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 bottom-1.5 sm:bottom-2.5 h-4 sm:h-6 rounded-full bg-black/90 blur-md gpu-layer"
          >
            <div className="w-3/4 mx-auto h-1.5 bg-[#E2F163]/30 rounded-full blur-sm" />
          </div>

          {visualMode === 'studio-render' && !imageError ? (
            /* Studio Render Mode: 8K Generated Automotive Photography with aerodynamic frame */
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#090A0F] shadow-2xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={STUDIO_CAR_IMAGE}
                  alt="ITZFIZZ Electric Concept Car in dark studio profile"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center scale-x-[-1] brightness-105 contrast-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-[#090A0F]/40" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#090A0F]/60 via-transparent to-[#090A0F]/60" />
              </div>
              <div className="px-3 py-1.5 bg-[#11131C]/95 border-t border-white/[0.08] flex items-center justify-between text-[10px] sm:text-[11px] font-mono-tabular text-[#9499A6]">
                <span className="text-[#F4F5F8] font-medium">STUDIO RENDER</span>
                <span className="text-[#E2F163]">SCROLL-CONTROLLED</span>
              </div>
            </div>
          ) : (
            /* Interactive Studio GT Mode (Default): Custom Multi-Layered Vector Hypercar with Scroll-Rotated Turbine Wheels */
            <svg
              viewBox="0 0 800 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="ITZFIZZ Concept Car Visual"
              className="w-full h-auto overflow-visible drop-shadow-[0_16px_24px_rgba(0,0,0,0.85)]"
            >
              <defs>
                <linearGradient id="bodyTitanium" x1="100" y1="55" x2="720" y2="210" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F4F5F8" />
                  <stop offset="28%" stopColor="#CBD0DC" />
                  <stop offset="62%" stopColor="#646B7C" />
                  <stop offset="88%" stopColor="#1E222D" />
                  <stop offset="100%" stopColor="#0F1118" />
                </linearGradient>

                <linearGradient id="shoulderHighlight" x1="140" y1="90" x2="690" y2="135" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#E2F163" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="canopyGlass" x1="250" y1="60" x2="540" y2="135" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#090A0F" />
                  <stop offset="45%" stopColor="#1B2234" />
                  <stop offset="100%" stopColor="#0B0D14" />
                </linearGradient>

                <linearGradient id="carbonSkirt" x1="80" y1="190" x2="730" y2="215" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0B0C10" />
                  <stop offset="50%" stopColor="#1F2330" />
                  <stop offset="100%" stopColor="#0B0C10" />
                </linearGradient>

                <radialGradient id="tireRubber" cx="50%" cy="50%" r="50%">
                  <stop offset="68%" stopColor="#12141C" />
                  <stop offset="92%" stopColor="#1F2330" />
                  <stop offset="100%" stopColor="#090A0F" />
                </radialGradient>
              </defs>

              {/* Active Deployable Rear Aero Wing */}
              <g ref={activeWingRef} className="gpu-layer">
                <path
                  d="M92 108 L62 92 L114 90 L132 112 Z"
                  fill="#1E222D"
                  stroke="#E2F163"
                  strokeWidth="1.5"
                />
                <line x1="104" y1="94" x2="118" y2="118" stroke="#9499A6" strokeWidth="3" />
              </g>

              {/* Rear Diffuser & Tail Fin */}
              <path
                d="M68 184 L105 142 L145 196 L76 202 Z"
                fill="#11131C"
                stroke="#2E3446"
                strokeWidth="1.5"
              />

              {/* Smoked Glass Tear-Drop Cockpit Canopy */}
              <path
                d="M218 114 C 265 68, 375 56, 488 78 L 574 118 L 218 118 Z"
                fill="url(#canopyGlass)"
                stroke="#9499A6"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />

              {/* Internal Cockpit Silhouette */}
              <path
                d="M345 72 L322 116 M425 74 L445 116 M375 84 C385 84, 392 94, 388 114"
                stroke="#2D3548"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Main Sculpted Hypercar Monocoque Body */}
              <path
                d="M78 164
                   L96 122
                   C135 112, 180 112, 222 114
                   L320 114
                   L568 116
                   C635 118, 702 134, 742 162
                   C752 169, 756 182, 748 194
                   L718 202
                   L655 202
                   C652 152, 578 152, 574 202
                   L276 202
                   C272 152, 198 152, 194 202
                   L102 202
                   L74 186
                   Z"
                fill="url(#bodyTitanium)"
              />

              {/* Side Air Intake Channel */}
              <path
                d="M292 134 L478 140 L442 182 L318 182 Z"
                fill="#0D0F17"
                fillOpacity="0.82"
                stroke="#3A4154"
                strokeWidth="1.2"
              />
              <path
                d="M305 134 L342 182"
                stroke="#E2F163"
                strokeWidth="2"
                strokeOpacity="0.8"
              />

              {/* Aerodynamic Shoulder Crease Line */}
              <path
                d="M98 124 C 210 116, 420 114, 572 118 C 640 120, 702 138, 742 163"
                stroke="url(#shoulderHighlight)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Lower Ground-Effect Splitter & Side Skirt */}
              <path
                d="M84 196 L142 196 L146 206 L80 206 Z
                   M274 194 L576 194 L580 206 L270 206 Z
                   M694 194 L756 192 L762 204 L690 206 Z"
                fill="url(#carbonSkirt)"
              />
              <line x1="276" y1="204" x2="574" y2="204" stroke="#E2F163" strokeWidth="2" />
              <line x1="696" y1="203" x2="758" y2="201" stroke="#E2F163" strokeWidth="2.5" />

              {/* Rear LED Taillight Blade */}
              <path d="M78 134 L112 132 L106 144 L75 146 Z" fill="#F43F5E" />
              <path d="M74 138 L118 136" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />

              {/* Front LED Headlight Blade */}
              <path d="M686 144 L738 158 L730 167 L676 154 Z" fill="#E2F163" />
              <path d="M688 148 L740 161" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

              {/* ================= REAR WHEEL ASSEMBLY (x=235, y=198) ================= */}
              <g transform="translate(235, 198)">
                <circle r="54" fill="#07080C" />
                <circle r="31" fill="#1A1D28" stroke="#3B4254" strokeWidth="2" />
                <circle r="24" fill="none" stroke="#282E3D" strokeWidth="1.5" strokeDasharray="4 4" />
                <path
                  d="M-26 -14 C -22 -24, -12 -30, -4 -28 L -8 -14 C -14 -16, -20 -12, -22 -8 Z"
                  fill="#E2F163"
                />
                <g ref={rearWheelRef} className="gpu-layer">
                  <circle r="48" fill="url(#tireRubber)" stroke="#262B3A" strokeWidth="2" />
                  <path
                    d="M -38 -18 A 42 42 0 0 1 18 -38"
                    stroke="#E2F163"
                    strokeWidth="1.5"
                    strokeOpacity="0.65"
                    fill="none"
                  />
                  <circle r="35" fill="none" stroke="#D8DCE6" strokeWidth="2.5" />
                  <circle r="32" fill="none" stroke="#525B70" strokeWidth="1" />
                  {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle) => (
                    <g key={`rear-spoke-${angle}`} transform={`rotate(${angle})`}>
                      <path d="M -2 0 L -5 -34 L 2 -34 L 4 -8 Z" fill="#C8CDD8" />
                      <line x1="0" y1="-8" x2="-3" y2="-34" stroke="#F4F5F8" strokeWidth="1" />
                    </g>
                  ))}
                  <circle r="9" fill="#11131C" stroke="#E2F163" strokeWidth="2" />
                  <circle r="3" fill="#E2F163" />
                </g>
              </g>

              {/* ================= FRONT WHEEL ASSEMBLY (x=615, y=198) ================= */}
              <g transform="translate(615, 198)">
                <circle r="54" fill="#07080C" />
                <circle r="31" fill="#1A1D28" stroke="#3B4254" strokeWidth="2" />
                <circle r="24" fill="none" stroke="#282E3D" strokeWidth="1.5" strokeDasharray="4 4" />
                <path
                  d="M4 -28 C 12 -30, 22 -24, 26 -14 L 22 -8 C 20 -12, 14 -16, 8 -14 Z"
                  fill="#E2F163"
                />
                <g ref={frontWheelRef} className="gpu-layer">
                  <circle r="48" fill="url(#tireRubber)" stroke="#262B3A" strokeWidth="2" />
                  <path
                    d="M -38 -18 A 42 42 0 0 1 18 -38"
                    stroke="#E2F163"
                    strokeWidth="1.5"
                    strokeOpacity="0.65"
                    fill="none"
                  />
                  <circle r="35" fill="none" stroke="#D8DCE6" strokeWidth="2.5" />
                  <circle r="32" fill="none" stroke="#525B70" strokeWidth="1" />
                  {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle) => (
                    <g key={`front-spoke-${angle}`} transform={`rotate(${angle})`}>
                      <path d="M -2 0 L -5 -34 L 2 -34 L 4 -8 Z" fill="#C8CDD8" />
                      <line x1="0" y1="-8" x2="-3" y2="-34" stroke="#F4F5F8" strokeWidth="1" />
                    </g>
                  ))}
                  <circle r="9" fill="#11131C" stroke="#E2F163" strokeWidth="2" />
                  <circle r="3" fill="#E2F163" />
                </g>
              </g>
            </svg>
          )}
        </div>

        {/* Runway Track Baseline & Scroll Progress Fill */}
        <div className="absolute inset-x-2 sm:inset-x-6 bottom-2 sm:bottom-3 h-[2px] bg-white/[0.1] rounded-full overflow-hidden">
          <div
            ref={trackProgressRef}
            className="h-full w-full bg-gradient-to-r from-[#E2F163]/40 via-[#E2F163] to-[#F4F5F8] origin-left scale-x-0 gpu-layer"
          />
        </div>
      </div>

      {/* Interactive Scroll Progress Checkpoints Below Runway */}
      <div className="mt-1 px-2 sm:px-6 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {checkpoints.map((cp) => (
          <button
            key={cp.label}
            type="button"
            onClick={() => onSelectCheckpoint(cp.progress)}
            className="py-1 px-2 text-[10px] sm:text-[11px] font-mono-tabular text-[#9499A6] hover:text-[#E2F163] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-1 focus-visible:outline-[#E2F163] rounded"
          >
            {cp.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollVisual;
