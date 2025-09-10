import React, { useState } from 'react';

const ContactSection: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic (e.g., send to an API endpoint)
        console.log({ name, email, message });
        setSubmitted(true);
    };

    return (
        <section id="contact" className="py-20 bg-black text-white">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Questions?</h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">We're here to help. Reach out to us for any inquiries or support needs.</p>
                </div>
                <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-2xl" style={{ boxShadow: '0 0 40px rgba(0, 212, 185, 0.2)' }}>
                    {submitted ? (
                        <div className="text-center py-10">
                            <h3 className="text-2xl font-semibold text-jm-green">Thank You!</h3>
                            <p className="text-gray-300 mt-2">Your message has been received. We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5"
                                    placeholder="Adebayo Adewale"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5"
                                    placeholder="name@juristmind.com"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Your Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5"
                                    placeholder="Leave a comment..."
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-jm-green text-black font-bold py-3 px-5 rounded-lg text-lg shadow-[0_4px_14px_rgba(0,237,100,0.3)] hover:shadow-[0_6px_20px_rgba(0,237,100,0.4)] transition-all duration-300 transform hover:scale-105">
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
