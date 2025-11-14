import React from 'react';
import { Service } from '../../types';
import { DESIGN_SERVICES } from '../../constants';

const ServiceCard: React.FC<{ service: Service; index: number; onOrder: (service: Service) => void }> = ({ service, index, onOrder }) => {
    const Icon = service.icon;
    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
            <div className="flex-grow">
                <Icon className="h-12 w-12 mx-auto text-teal-500 mb-6" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-2">{service.name}</h3>
                <p className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-6">{service.price}</p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-teal-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-8">
                <button 
                    onClick={() => onOrder(service)}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

interface ServicesProps {
    onOrderNow: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ onOrderNow }) => (
    <section id="services" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 animate-fade-in">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Architecture & Design Services</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    From interior makeovers to complete architectural plans, our professional services cover every aspect of creating your perfect space.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {DESIGN_SERVICES.map((service, index) => <ServiceCard key={service.id} service={service} index={index} onOrder={onOrderNow} />)}
            </div>
        </div>
    </section>
);

export default Services;