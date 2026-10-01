/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConceptSection from './components/ConceptSection';
import Features from './components/Features';
import Footer from './components/Footer';

export default function App() {
  const handleNavigate = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleReturnToHero = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#090A0F] text-[#F4F5F8] overflow-x-hidden">
      {/* Top Bar Navigation (3-Zone Contract) */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Content Flow */}
      <main>
        {/* SECTION 1: Hero & Scroll-Driven Animation */}
        <Hero />

        {/* SECTION 2: Concept & Product Explanation */}
        <ConceptSection />

        {/* SECTION 3: Statistics, Motion Architecture & Verified Benchmarks */}
        <Features onReturnToHero={handleReturnToHero} />
      </main>

      {/* SECTION 4: Interactive Reservation CTA & Quiet Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
