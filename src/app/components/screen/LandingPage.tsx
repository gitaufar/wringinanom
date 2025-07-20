"use client";

import React from 'react';
import HeroSection from '../section/HeroSection';
import LayananSection from '../section/LayananSection';
import TutorialSection from '../section/TutorialSection';
import InformationSection from '../section/InformationSection';
import Footer from '../section/Footer';

const LandingPage = () => {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="w-full">
        <HeroSection />
      </section>

      {/* Layanan Section (TANPA WRAPPER CONTAINER!) */}
      <LayananSection />

      {/* Tutorial Section */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 max-w-[1440px] mx-auto">
        <TutorialSection />
      </section>

      {/* Informasi Section */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 max-w-[1440px] mx-auto">
        <InformationSection />
      </section>

      {/* Footer */}
      <section className="w-full">
        <Footer />
      </section>

    </main>
  );
};

export default LandingPage;
