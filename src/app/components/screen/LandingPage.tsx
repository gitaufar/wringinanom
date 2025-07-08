"use client";
import React from 'react'
import HeroSection from '../section/HeroSection'
import LayananSection from '../section/LayananSection'
import TutorialSection from '../section/TutorialSection'
import InformationSection from '../section/InformationSection'
import Footer from '../section/Footer'

const LandingPage = () => {
  return (
    <main>
        <HeroSection />
        <LayananSection />
        <TutorialSection />
        <InformationSection />
        <Footer />
    </main>
  )
}

export default LandingPage