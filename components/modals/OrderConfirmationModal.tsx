import React from 'react';
import { CloseIcon, CheckmarkCircleIcon } from '../icons';

interface OrderConfirmationModalProps {
    onClose: () => void;
    onViewOrders: () => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ onClose, onViewOrders }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md relative text-center animate-fade-in-up">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><CloseIcon className="w-6 h-6" /></button>
            <CheckmarkCircleIcon className="w-16 h-16 text-teal-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Our team will review your request and you will see the status update in the "My Orders" section.</p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={onViewOrders} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg">
                    View My Orders
                </button>
                 <button onClick={onClose} className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-4 rounded-lg">
                    Close
                </button>
            </div>
        </div>
    </div>
);

export default OrderConfirmationModal;