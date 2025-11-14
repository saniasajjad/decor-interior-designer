import React, { useState } from 'react';
import { SubscriptionPlan } from '../../types';
import { CloseIcon, CreditCardIcon } from '../icons';


interface PaymentModalProps {
    plan: SubscriptionPlan;
    onClose: () => void;
    onPaymentSuccess: (plan: SubscriptionPlan) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ plan, onClose, onPaymentSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            onPaymentSuccess(plan);
            setIsProcessing(false);
            onClose();
        }, 2000); // Simulate network delay
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Upgrade to {plan.name}</h2>
                <p className="text-center text-gray-500 mb-6">You will be charged ${plan.price}/month.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Simplified mock form */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Information</label>
                        <div className="mt-1 flex items-center w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                            <CreditCardIcon className="w-6 h-6 text-gray-400 mr-3" />
                            <input type="text" placeholder="4242 4242 4242 4242" className="flex-grow bg-transparent border-none focus:ring-0" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                         <input type="text" placeholder="MM / YY" className="flex-grow w-full mt-1 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"/>
                         <input type="text" placeholder="CVC" className="flex-grow w-full mt-1 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"/>
                    </div>
                    <p className="text-xs text-center text-gray-500">This is a demo. No real card details are needed.</p>
                    <button type="submit" disabled={isProcessing} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400 flex items-center justify-center">
                        {isProcessing ? (
                            <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white"></div>
                        ) : (
                            `Pay $${plan.price}`
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
