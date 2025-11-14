import React from 'react';
import { GalleryItem } from '../../types';
import { GalleryIcon } from '../icons';

interface GalleryProps {
    gallery: GalleryItem[];
    onGenerateClick: () => void;
}
const Gallery: React.FC<GalleryProps> = ({ gallery, onGenerateClick }) => {
    if (gallery.length === 0) {
        return (
            <div className="text-center py-24 animate-fade-in">
                <GalleryIcon className="mx-auto h-16 w-16 text-gray-400" />
                <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">Your Gallery is Empty</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Save your favorite AI-generated designs to see them here.</p>
                <button onClick={onGenerateClick} className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg">
                    Generate Your First Design
                </button>
            </div>
        )
    }

    return (
        <section className="py-16 md:py-24 animate-fade-in">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Saved Designs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gallery.map((item, index) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <img src={item.generatedImage} alt={`Generated design in ${item.style} style`} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <p className="font-bold text-lg text-gray-800 dark:text-white">{item.style}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate" title={item.prompt}>{item.prompt || 'No extra details'}</p>
                                <p className="text-xs text-gray-400 mt-2">Saved on: {new Date(item.savedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default Gallery;
