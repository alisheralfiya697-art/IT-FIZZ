import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Interactive Demo Walkthrough');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setErrorMsg('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setSubmitted(true);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <footer
      id="reserve"
      className="relative w-full bg-[#090A0F] border-t border-white/[0.08] pt-20 sm:pt-28 pb-12 px-4 sm:px-8"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section 4 CTA Container */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-2xl bg-[#11131C] border border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center mb-16">
          {/* Left Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#9499A6] mb-3">
              <span className="text-[#E2F163]">SECTION 04</span>
              <span aria-hidden="true">·</span>
              <span>INTERACTIVE INQUIRY &amp; FEEDBACK</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F5F8] leading-tight mb-4 [text-wrap:balance]">
              Explore the Scroll-Driven Experience
            </h2>
            <p className="text-sm sm:text-base text-[#9499A6] leading-relaxed max-w-xl mb-6">
              Have questions about the GSAP ScrollTrigger implementation, responsive transform math, or component architecture? Reach out below or jump back to the top to test the scroll animation.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#9499A6]">
              <span>React &amp; TypeScript</span>
              <span aria-hidden="true">·</span>
              <span>Tailwind CSS</span>
              <span aria-hidden="true">·</span>
              <span>GSAP ScrollTrigger</span>
            </div>
          </div>

          {/* Right Validated Interactive Form */}
          <div className="lg:col-span-5">
            {submitted ? (
              <div className="p-6 rounded-xl bg-[#090A0F] border border-[#E2F163]/50">
                <div className="text-xs font-mono-tabular text-[#E2F163] mb-2">
                  CONFIRMATION · MESSAGE RECEIVED
                </div>
                <h3 className="font-display text-lg font-bold text-[#F4F5F8] mb-2">
                  Thank you, {fullName}
                </h3>
                <p className="text-xs sm:text-sm text-[#9499A6] leading-relaxed mb-5">
                  Your inquiry regarding <strong className="text-[#F4F5F8]">{topic}</strong> has been recorded for <span className="font-mono-tabular text-[#F4F5F8]">{email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setEmail('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#090A0F] bg-[#E2F163] rounded-lg hover:bg-[#d4e54f] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="reserve-name"
                    className="block text-xs font-medium text-[#F4F5F8] mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="reserve-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 text-sm text-[#F4F5F8] bg-[#090A0F] border border-white/[0.12] rounded-lg placeholder:text-[#9499A6]/50 focus:outline-none focus:border-[#E2F163] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reserve-email"
                    className="block text-xs font-medium text-[#F4F5F8] mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="reserve-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm text-[#F4F5F8] bg-[#090A0F] border border-white/[0.12] rounded-lg placeholder:text-[#9499A6]/50 focus:outline-none focus:border-[#E2F163] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reserve-program"
                    className="block text-xs font-medium text-[#F4F5F8] mb-1.5"
                  >
                    Topic
                  </label>
                  <select
                    id="reserve-program"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm text-[#F4F5F8] bg-[#090A0F] border border-white/[0.12] rounded-lg focus:outline-none focus:border-[#E2F163] transition-colors"
                  >
                    <option value="Interactive Demo Walkthrough">
                      Interactive Demo Walkthrough
                    </option>
                    <option value="GSAP ScrollTrigger Architecture">
                      GSAP ScrollTrigger Architecture
                    </option>
                    <option value="Frontend Assignment Review">
                      Frontend Assignment Review
                    </option>
                  </select>
                </div>

                {errorMsg && (
                  <p role="alert" className="text-xs text-rose-400 font-medium">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-[#090A0F] bg-[#E2F163] rounded-lg hover:bg-[#d4e54f] active:scale-[0.99] transition-all duration-150 whitespace-nowrap cursor-pointer"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9499A6]">
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="font-display font-bold tracking-[0.18em] text-[#F4F5F8] hover:text-[#E2F163] transition-colors"
            >
              ITZFIZZ
            </a>
            <span aria-hidden="true">·</span>
            <span>Scroll-Driven Hero Animation Showcase</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="hover:text-[#F4F5F8] transition-colors whitespace-nowrap"
            >
              Hero Animation
            </a>
            <a
              href="#concept"
              onClick={(e) => handleNavClick(e, 'concept')}
              className="hover:text-[#F4F5F8] transition-colors whitespace-nowrap"
            >
              Concept
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, 'features')}
              className="hover:text-[#F4F5F8] transition-colors whitespace-nowrap"
            >
              Benchmarks
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#E2F163] hover:underline cursor-pointer whitespace-nowrap"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
