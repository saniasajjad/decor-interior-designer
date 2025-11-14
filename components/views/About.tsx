import React from 'react';
import { ABOUT_US_CONTENT, COMPANY_VALUES } from '../../constants';

const About: React.FC = () => (
    <div className="animate-fade-in">
        <div className="relative bg-gray-800">
            <div className="absolute inset-0">
                <img className="w-full h-full object-cover" src="https://picsum.photos/seed/about-hero/1600/800" alt="Team working on designs" />
                <div className="absolute inset-0 bg-gray-800/60 mix-blend-multiply"></div>
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">We're Changing How The World Designs</h1>
                <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">{ABOUT_US_CONTENT.mission}</p>
            </div>
        </div>

        <section id="story" className="py-16 md:py-24 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Story</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{ABOUT_US_CONTENT.story}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://picsum.photos/seed/story1/400/300" alt="Early prototype sketch" className="rounded-lg shadow-lg aspect-[4/3] object-cover" />
                        <img src="https://picsum.photos/seed/story2/400/300" alt="Team collaborating" className="rounded-lg shadow-lg aspect-[4/3] object-cover mt-8" />
                    </div>
                </div>
            </div>
        </section>

        <section id="values" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Core Values</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">The principles that guide our work and culture.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {COMPANY_VALUES.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div key={value.name} className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                                <Icon className="mx-auto h-12 w-12 text-teal-500 mb-4"/>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{value.name}</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{value.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    </div>
);

export default About;
