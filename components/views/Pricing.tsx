import React from 'react';
import { SubscriptionPlan } from '../../types';
import { SUBSCRIPTION_PLANS } from '../../constants';
import { CheckmarkCircleIcon } from '../icons';

const PricingPlanCard: React.FC<{ plan: SubscriptionPlan | { id: 'Free', name: 'Free', price: 0, features: string[] }, onSelect: (plan: SubscriptionPlan) => void, index: number }> = ({ plan, onSelect, index }) => (
    <div className={`flex flex-col rounded-2xl p-8 transition-all duration-300 animate-fade-in-up ${plan.id !== 'Free' ? 'bg-white dark:bg-gray-800 shadow-lg' : 'bg-gray-50 dark:bg-gray-800/50'} ${(plan as SubscriptionPlan).isPopular ? 'ring-2 ring-teal-500' : ''}`} style={{ animationDelay: `${index * 100}ms`}}>
        {(plan as SubscriptionPlan).isPopular && (
            <div className="absolute -top-4 right-8 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
        )}
        <div className="flex-grow">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{plan.name}</h3>
            <p className="mt-4">
                {plan.price > 0 ? (
                    <>
                        <span className="text-4xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                        <span className="text-base font-medium text-gray-500 dark:text-gray-400">/mo</span>
                    </>
                ) : (
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">Free</span>
                )}
            </p>
            <ul className="mt-6 space-y-4">
                {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                        <CheckmarkCircleIcon className="w-6 h-6 text-teal-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="mt-8">
            {plan.id !== 'Free' && (
                <button 
                    onClick={() => onSelect(plan as SubscriptionPlan)} 
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                    Choose Plan
                </button>
            )}
        </div>
    </div>
);

const Pricing: React.FC<{ onSelectPlan: (plan: SubscriptionPlan) => void }> = ({ onSelectPlan }) => {
    const freePlan = {
        id: 'Free' as const,
        name: 'Free',
        price: 0,
        features: [
            '3 AI Generations',
            'Access to All Design Styles',
            'View Generated Designs',
            'Standard Resolution',
        ],
    };

    return (
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900 animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Find the Perfect Plan</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Start for free, and unlock more powerful features as you grow.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    <PricingPlanCard plan={freePlan} onSelect={() => {}} index={0} />
                    {SUBSCRIPTION_PLANS.map((plan, index) => (
                        <PricingPlanCard key={plan.id} plan={plan} onSelect={onSelectPlan} index={index + 1}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
