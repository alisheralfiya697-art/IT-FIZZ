import React from 'react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#090A0F]/85 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1360px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element brand wordmark (Top Bar Contract) */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="font-display text-lg font-bold tracking-[0.18em] text-[#F4F5F8] hover:text-[#E2F163] transition-colors duration-150 whitespace-nowrap"
        >
          ITZFIZZ
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9499A6]">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="hover:text-[#F4F5F8] transition-colors duration-150 underline-offset-4 hover:underline whitespace-nowrap"
          >
            Kinematics
          </a>
          <a
            href="#concept"
            onClick={(e) => handleNavClick(e, 'concept')}
            className="hover:text-[#F4F5F8] transition-colors duration-150 underline-offset-4 hover:underline whitespace-nowrap"
          >
            Concept
          </a>
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, 'features')}
            className="hover:text-[#F4F5F8] transition-colors duration-150 underline-offset-4 hover:underline whitespace-nowrap"
          >
            Benchmarks
          </a>
          <a
            href="#reserve"
            onClick={(e) => handleNavClick(e, 'reserve')}
            className="hover:text-[#F4F5F8] transition-colors duration-150 underline-offset-4 hover:underline whitespace-nowrap"
          >
            Experience
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('reserve')}
            className="px-4 py-2 text-xs font-semibold text-[#090A0F] bg-[#E2F163] rounded-lg hover:bg-[#d4e54f] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2F163]"
          >
            Schedule Briefing
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
