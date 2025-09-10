import React from 'react';

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-black text-white">
            <div className="container mx-auto px-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Nigerian Lawyers, by Legal Tech Experts</h2>
                        <p className="text-lg text-gray-300 mb-6">
                            Our mission is to empower every Nigerian lawyer with cutting-edge, secure, and intuitive digital tools. We are aligned with NBA guidelines and integrate with e-filing systems to ensure you practice with confidence and efficiency.
                        </p>
                        <a href="#contact" className="text-jm-green font-bold text-lg hover:text-jm-teal transition-colors">
                            Get in Touch &rarr;
                        </a>
                    </div>
                    <div className="relative">
                        {/* Placeholder for app mockup */}
                        <img 
                            src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="Juristmind App Interface" 
                            className="rounded-lg shadow-2xl transform md:rotate-3 transition-transform duration-500 hover:rotate-0"
                            style={{ boxShadow: '0 0 40px rgba(0, 237, 100, 0.2)' }}
                        />
                    </div>
                 </div>
            </div>
        </section>
    );
};

export default AboutSection;
