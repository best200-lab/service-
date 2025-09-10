import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon } from './icons';

const PublicHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'About Us', href: '#about' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Contact', href: '#contact' },
    ];
    
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.replace('#', '');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className="bg-black/80 backdrop-blur-sm text-white sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-jm-green">
                    Juristmind
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                         <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-gray-300 hover:text-white transition-colors duration-300 border-b-2 border-transparent hover:border-jm-teal"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-jm-green text-black font-bold py-2 px-5 rounded-lg shadow-[0_4px_14px_rgba(0,237,100,0.3)] hover:shadow-[0_6px_20px_rgba(0,237,100,0.4)] transition-all duration-300 transform hover:scale-105">
                        Sign Up
                    </Link>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MenuIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-black">
                    <nav className="px-6 pt-2 pb-4 flex flex-col space-y-2">
                        {navLinks.map(link => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                onClick={(e) => { handleScroll(e, link.href); setIsMenuOpen(false); }}
                                className="text-gray-300 hover:text-white transition-colors duration-300 py-2"
                            >
                                {link.name}
                            </a>
                        ))}
                         <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300 py-2">
                            Login
                        </Link>
                        <Link to="/signup" className="bg-jm-green text-black font-bold py-2 px-5 rounded-lg text-center mt-2">
                            Sign Up
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default PublicHeader;