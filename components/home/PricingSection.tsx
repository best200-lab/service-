import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '../icons';

const PricingSection: React.FC = () => {
    return (
        <section id="pricing" className="py-20 bg-white text-black">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Start for free. Upgrade for more power.</p>
                <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <div className="w-full md:w-1/2 border-2 border-gray-200 rounded-lg p-8 flex flex-col">
                        <h3 className="text-2xl font-semibold mb-2">Free</h3>
                        <p className="text-gray-500 mb-6">For individual lawyers and small teams.</p>
                        <p className="text-4xl font-bold mb-6">₦0 <span className="text-lg font-normal text-gray-500">/ month</span></p>
                        <ul className="space-y-4 text-left mb-8 flex-grow">
                            <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-jm-green mr-3" /> Secure Messaging</li>
                            <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-jm-green mr-3" /> Basic Document Serving</li>
                            <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-jm-green mr-3" /> Access to Directory</li>
                        </ul>
                        <Link to="/onboarding" className="w-full bg-gray-200 text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                            Get Started
                        </Link>
                    </div>

                    {/* Premium Tier */}
                    <div className="w-full md:w-1/2 border-2 border-jm-teal rounded-lg p-8 flex flex-col relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 bg-jm-teal text-black text-sm font-bold px-4 py-1 transform translate-x-1/4 -translate-y-1/4 rotate-45">POPULAR</div>
                        <h3 className="text-2xl font-semibold mb-2 text-jm-teal">Premium</h3>
                        <p className="text-gray-500 mb-6">For growing firms and power users.</p>
                        <p className="text-4xl font-bold mb-6">Coming Soon</p>
                        <ul className="space-y-4 text-left mb-8 flex-grow">
                            <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-jm-green mr-3" /> Everything in Free, plus:</li>
                            <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-jm-green mr-3" /> Unlimited Storage</li>
                            <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-jm-green mr-3" /> Advanced AI Analytics</li>
                            <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-jm-green mr-3" /> Priority Support</li>
                        </ul>
                        <button disabled className="w-full bg-jm-green text-black font-bold py-3 px-6 rounded-lg cursor-not-allowed opacity-50">
                            Notify Me
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
