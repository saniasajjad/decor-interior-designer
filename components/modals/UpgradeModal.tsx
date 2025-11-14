import React from 'react';
import { CloseIcon, DiamondIcon } from '../icons';

interface UpgradeModalProps {
    onClose: () => void;
    onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, onUpgrade }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md relative text-center animate-fade-in-up">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><CloseIcon className="w-6 h-6" /></button>
            <DiamondIcon className="w-16 h-16 text-teal-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Upgrade to Pro</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You've used all your free generations. Upgrade to the Pro plan to create unlimited designs and save them to your gallery!</p>
            <button onClick={onUpgrade} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg">View Plans</button>
        </div>
    </div>
);

export default UpgradeModal;
