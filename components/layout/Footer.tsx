import React from 'react';
import { AppView } from '../../types';
import { LogoIcon, TwitterIcon, InstagramIcon, LinkedInIcon, FacebookIcon } from '../icons';

interface FooterProps {
    setView: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => (
    <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300">
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* Company Info */}
                <div className="lg:col-span-1">
                    <div className="flex items-center space-x-3 mb-4">
                        <LogoIcon className="h-8 w-8 text-teal-400" />
                        <h2 className="text-2xl font-bold text-white">Decor</h2>
                    </div>
                    <p className="text-sm text-gray-400">
                        Making professional interior design accessible to everyone, everywhere through the power of AI.
                    </p>

                    {/* Updated Social Links */}
                    <div className="flex space-x-4 mt-6">
                        <a href="https://twitter.com/yourpage" target="_blank" className="p-2 rounded-full bg-gray-700/30 hover:bg-teal-500/20 transition">
                            <TwitterIcon className="h-6 w-6" />
                        </a>
                        <a href="https://instagram.com/yourpage" target="_blank" className="p-2 rounded-full bg-gray-700/30 hover:bg-teal-500/20 transition">
                            <InstagramIcon className="h-6 w-6" />
                        </a>
                        <a href="https://linkedin.com/yourpage" target="_blank" className="p-2 rounded-full bg-gray-700/30 hover:bg-teal-500/20 transition">
                            <LinkedInIcon className="h-6 w-6" />
                        </a>
                        <a href="https://facebook.com/yourpage" target="_blank" className="p-2 rounded-full bg-gray-700/30 hover:bg-teal-500/20 transition">
                            <FacebookIcon className="h-6 w-6" />
                        </a>
                    </div>
                </div>

                {/* Links & Newsletter */}
                <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Explore</h3>
                        <ul className="mt-4 space-y-2">
                            <li><button onClick={() => setView('DESIGNER')} className="text-sm text-gray-400 hover:text-white transition">AI Designer</button></li>
                            <li><button onClick={() => setView('PRICING')} className="text-sm text-gray-400 hover:text-white transition">Pricing</button></li>
                            <li><button onClick={() => setView('SERVICES')} className="text-sm text-gray-400 hover:text-white transition">Services</button></li>
                            <li><button onClick={() => setView('TEAM')} className="text-sm text-gray-400 hover:text-white transition">Our Team</button></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><button onClick={() => setView('ABOUT')} className="text-sm text-gray-400 hover:text-white transition">About Us</button></li>
                            <li><button onClick={() => setView('CONTACT')} className="text-sm text-gray-400 hover:text-white transition">Contact</button></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Careers</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Subscribe to our newsletter</h3>
                        <p className="mt-4 text-sm text-gray-400">Get the latest design trends and exclusive offers straight to your inbox.</p>

                        <form className="mt-4 flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-teal-500 focus:border-teal-500"
                                required
                            />
                            <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition whitespace-nowrap">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Decor. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
