import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-jm-green">Juristmind</h3>
                        <p className="mt-4 text-gray-400">
                            Empowering Nigerian lawyers with cutting-edge tools for collaboration and efficiency.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase">Quick Links</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#features" className="hover:text-jm-teal">Features</a></li>
                            <li><a href="#pricing" className="hover:text-jm-teal">Pricing</a></li>
                            <li><a href="#contact" className="hover:text-jm-teal">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase">Legal</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="hover:text-jm-teal">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-jm-teal">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase">Follow Us</h4>
                        <div className="mt-4 flex space-x-4">
                            {/* Placeholder icons */}
                            <a href="#" className="text-gray-400 hover:text-white">X</a>
                            <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Juristmind. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
