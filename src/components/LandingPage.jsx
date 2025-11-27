import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import ContentSection from './ContentSection';
import ContactSection from './ContactSection';
import TeamSection from './TeamSection';
import Footer from './Footer';
import Navbar from './Navbar';

export default function LandingPage() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ContentSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}