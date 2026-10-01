import React from 'react';

export interface StatItem {
  id: string;
  percentage: string;
  numericValue: number;
  label: string;
  detail: string;
  checkpointProgress: number; // 0 to 1 scroll progress target
  checkpointDistance: string;
}

export const ENTERPRISE_STATS: StatItem[] = [
  {
    id: 'stat-satisfaction',
    percentage: '85%',
    numericValue: 85,
    label: 'Customer Satisfaction',
    detail: 'Consistent positive experience across interactive touchpoints',
    checkpointProgress: 0.2,
    checkpointDistance: '01 · 20%',
  },
  {
    id: 'stat-success',
    percentage: '92%',
    numericValue: 92,
    label: 'Project Success',
    detail: 'High-precision delivery with deterministic motion control',
    checkpointProgress: 0.45,
    checkpointDistance: '02 · 45%',
  },
  {
    id: 'stat-growth',
    percentage: '78%',
    numericValue: 78,
    label: 'Growth',
    detail: 'Sustained engagement gains through responsive visual feedback',
    checkpointProgress: 0.72,
    checkpointDistance: '03 · 72%',
  },
  {
    id: 'stat-retention',
    percentage: '95%',
    numericValue: 95,
    label: 'Client Retention',
    detail: 'Long-term reliability and smooth cross-device performance',
    checkpointProgress: 0.96,
    checkpointDistance: '04 · 96%',
  },
];

export const MOBILITY_REFERENCE_STATS: StatItem[] = [
  {
    id: 'stat-pickup',
    percentage: '58%',
    numericValue: 58,
    label: 'Pick-Up Point Use',
    detail: 'Increase in streamlined self-service hub utilization',
    checkpointProgress: 0.2,
    checkpointDistance: '01 · 20%',
  },
  {
    id: 'stat-calls',
    percentage: '23%',
    numericValue: 23,
    label: 'Decreased Phone Calls',
    detail: 'Reduction in manual support inquiries via clear visual tracking',
    checkpointProgress: 0.45,
    checkpointDistance: '02 · 45%',
  },
  {
    id: 'stat-success-ref',
    percentage: '92%',
    numericValue: 92,
    label: 'Project Success',
    detail: 'On-target completion across responsive web viewports',
    checkpointProgress: 0.72,
    checkpointDistance: '03 · 72%',
  },
  {
    id: 'stat-retention-ref',
    percentage: '95%',
    numericValue: 95,
    label: 'Client Retention',
    detail: 'Sustained user satisfaction and return interaction rate',
    checkpointProgress: 0.96,
    checkpointDistance: '04 · 96%',
  },
];

interface StatsProps {
  stats: StatItem[];
  onSelectCheckpoint: (progress: number) => void;
  statProgressRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  statCardRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
}

export const Stats: React.FC<StatsProps> = ({
  stats,
  onSelectCheckpoint,
  statProgressRefs,
  statCardRefs,
}) => {
  return (
    <div
      className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4"
      role="region"
      aria-label="Impact Statistics"
    >
      {stats.map((stat, index) => (
        <button
          key={stat.id}
          ref={(el) => {
            statCardRefs.current[index] = el;
          }}
          type="button"
          onClick={() => onSelectCheckpoint(stat.checkpointProgress)}
          title={`Scrub to ${stat.percentage} — ${stat.label}`}
          className="stat-card group relative text-left p-3 sm:p-4 lg:p-5 rounded-xl bg-[#11131C]/90 border border-white/[0.08] hover:border-[#E2F163]/45 transition-colors duration-150 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2F163]"
        >
          {/* Top metadata row: unboxed text with typographic separator */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#9499A6] mb-1 sm:mb-1.5 font-mono-tabular">
            <span>{stat.checkpointDistance}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[#E2F163]">
              Scrub →
            </span>
          </div>

          {/* Primary Percentage & Label */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 mb-1">
            <span className="font-display text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-[#F4F5F8] font-mono-tabular group-hover:text-[#E2F163] transition-colors duration-150">
              {stat.percentage}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#F4F5F8] leading-snug truncate">
              — {stat.label}
            </span>
          </div>

          {/* Context description */}
          <p className="hidden sm:block text-xs text-[#9499A6] leading-relaxed line-clamp-2">
            {stat.detail}
          </p>

          {/* Scroll-driven bottom indicator bar (animated via GSAP transform scaleX, zero layout thrashing) */}
          <div className="mt-2 sm:mt-3 h-[2px] w-full bg-white/[0.07] rounded-full overflow-hidden">
            <div
              ref={(el) => {
                statProgressRefs.current[index] = el;
              }}
              className="stat-progress-fill h-full w-full bg-[#E2F163] origin-left scale-x-0 gpu-layer"
            />
          </div>
        </button>
      ))}
    </div>
  );
};

export default Stats;
