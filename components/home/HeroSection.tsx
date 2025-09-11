
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
    const [useFallbackVideo, setUseFallbackVideo] = useState(false);

    useEffect(() => {
        // 'connection' is an experimental feature, so we check for its existence.
        const connection = (navigator as any).connection;
        if (connection && (connection.saveData || /2g|slow-2g/.test(connection.effectiveType))) {
            setUseFallbackVideo(true);
        }
    }, []);

    const primaryVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-a-special-effect-4119-large.mp4";
    const fallbackVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-curved-screen-4112-small.mp4";


    return (
        <section id="hero" className="relative h-screen flex items-center justify-center text-white bg-black">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute z-0 w-full h-full object-cover"
                poster="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                key={useFallbackVideo ? 'fallback' : 'primary'} // Add key to force re-render on source change
            >
                <source src={useFallbackVideo ? fallbackVideoUrl : primaryVideoUrl} type="video/mp4" />
            </video>
            <div className="absolute z-10 w-full h-full bg-black opacity-60"></div>
            <div className="relative z-20 text-center p-6">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                    Transform Legal Work in Nigeria
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200">
                    Secure messaging, instant document serving, and a nationwide lawyer network—all in one platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/onboarding"
                        className="bg-jm-green text-black font-bold py-3 px-8 rounded-lg text-lg shadow-[0_4px_14px_rgba(0,237,100,0.3)] hover:shadow-[0_6px_20px_rgba(0,237,100,0.4)] transition-all duration-300 transform hover:scale-105"
                        style={{ perspective: '1000px' }}
                    >
                        Sign Up For Free
                    </Link>
                    <a
                        href="#features"
                        className="bg-transparent border-2 border-jm-teal text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-jm-teal hover:text-black transition-all duration-300 transform hover:scale-105"
                    >
                        Explore Features
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;