import React from 'react';
import { MessagesIcon, ServeIcon, DirectoryIcon } from '../icons';

const features = [
    {
        icon: <MessagesIcon className="w-10 h-10 text-jm-teal" />,
        title: "Encrypted Messaging",
        description: "Communicate with colleagues and clients securely with end-to-end encrypted real-time chat."
    },
    {
        icon: <ServeIcon className="w-10 h-10 text-jm-teal" />,
        title: "Seamless Document Serving",
        description: "Serve court processes electronically in seconds, track delivery, and manage case files effortlessly."
    },
    {
        icon: <DirectoryIcon className="w-10 h-10 text-jm-teal" />,
        title: "All 36 States Connected",
        description: "Access a verified directory of Nigerian lawyers across every state and the FCT for easy collaboration."
    }
];

const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="py-20 bg-white text-black">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">The Future of Legal Practice is Here</h2>
                <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Juristmind provides the tools you need to excel in the digital age of law.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gray-50 p-8 border-2 border-gray-200 rounded-lg transform hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                            <div className="flex items-center justify-center h-20 w-20 mx-auto mb-6 bg-jm-teal/10 rounded-full">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
