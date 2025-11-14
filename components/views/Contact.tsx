import React, { useState } from 'react';
import { ContactInfo } from '../../types';
import { 
    CheckmarkCircleIcon, LocationPinIcon, PhoneIcon, EmailIcon,
    TwitterIcon, InstagramIcon, LinkedInIcon, FacebookIcon
} from '../icons';

interface ContactProps {
    contactInfo: ContactInfo;
}

const Contact: React.FC<ContactProps> = ({ contactInfo }) => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');
        setTimeout(() => setFormStatus('submitted'), 1500);
    };

    return (
        <section id="contact" className="py-16 md:py-24 bg-white dark:bg-gray-800 animate-fade-in">
            <div className="container mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Get in Touch</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Have a question, a project idea, or just want to say hello? We'd love to hear from you.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
                    
                    {/* Message Form */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>

                        {formStatus === 'submitted' ? (
                            <div className="flex flex-col items-center justify-center h-full bg-teal-50 dark:bg-teal-900/30 p-8 rounded-lg text-center animate-fade-in">
                                <CheckmarkCircleIcon className="w-16 h-16 text-teal-500 mb-4" />
                                <h4 className="text-xl font-bold text-gray-800 dark:text-white">Thank You!</h4>
                                <p className="text-gray-600 dark:text-gray-300">Your message has been sent successfully. We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <input type="text" required placeholder="Your Name" className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                <input type="email" required placeholder="Your Email" className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                <textarea required rows={5} placeholder="Your Message" className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"></textarea>

                                <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400 flex items-center justify-center">
                                    {formStatus === 'submitting'
                                        ? <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white"></div>
                                        : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                            <p className="flex items-center text-gray-600 dark:text-gray-300"><LocationPinIcon className="w-6 h-6 mr-3 text-teal-500" /> {contactInfo.address}</p>
                            <p className="flex items-center text-gray-600 dark:text-gray-300"><PhoneIcon className="w-6 h-6 mr-3 text-teal-500" /> {contactInfo.phone}</p>
                            <p className="flex items-center text-gray-600 dark:text-gray-300"><EmailIcon className="w-6 h-6 mr-3 text-teal-500" /> {contactInfo.email}</p>
                        </div>

                        {/* Social Links Updated */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://twitter.com" target="_blank" className="p-2 rounded-full bg-gray-700/30 hover:bg-teal-500/20 transition">
                                    <TwitterIcon className="h-8 w-8" />
                                </a>
                                <a href="https://instagram.com" target="_blank" className="p-2 rounded-full bg-gray-700/30 hover:bg-teal-500/20 transition">
                                    <InstagramIcon className="h-8 w-8" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" className="p-2 rounded-full bg-gray-700/30 hover:bg-teal-500/20 transition">
                                    <LinkedInIcon className="h-8 w-8" />
                                </a>
                                <a href="https://facebook.com" target="_blank" className="p-2 rounded-full bg-gray-700/30 hover:bg-teal-500/20 transition">
                                    <FacebookIcon className="h-8 w-8" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
