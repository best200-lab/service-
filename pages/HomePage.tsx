import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import AboutSection from '../components/home/AboutSection';
import PricingSection from '../components/home/PricingSection';
import ContactSection from '../components/home/ContactSection';

const HomePage: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <AboutSection />
            <PricingSection />
            <ContactSection />
        </div>
    );
};

export default HomePage;
