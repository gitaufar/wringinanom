"use client";

import React, { JSX, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from '../section/HeroSection';
import LayananSection from '../section/LayananSection';
import TutorialSection from '../section/TutorialSection';
import InformationSection from '../section/InformationSection';
import { Component } from '../section/Footer';


const LandingPage = (): JSX.Element => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <main className="flex flex-col w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="w-full" data-aos="fade-up">
        <HeroSection />
      </section>

      {/* Layanan Section */}
      <div data-aos="fade-up">
        <LayananSection />
      </div>

      {/* Tutorial Section */}
      <section
        className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 max-w-[1440px] mx-auto"
        data-aos="fade-up"
      >
        <TutorialSection />
      </section>

      {/* Informasi Section */}
      <section
        className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 max-w-[1440px] mx-auto"
        data-aos="fade-up"
      >
        <InformationSection />
      </section>

      {/* Footer */}
      <section className="w-full" data-aos="fade-up">
        <Component />
      </section>

    </main>
  );
};

export default LandingPage;
