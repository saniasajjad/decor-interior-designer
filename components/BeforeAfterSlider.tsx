import React, { useState, useRef } from 'react';

const BeforeAfterSlider: React.FC<{ before: string; after: string; index: number }> = ({ before, after, index }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current || !isDragging) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        let newPosition = (x / rect.width) * 100;
        // Clamp the value between 0 and 100
        if (newPosition < 0) newPosition = 0;
        if (newPosition > 100) newPosition = 100;
        setSliderPosition(newPosition);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(false);
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (isDragging) {
            handleMove(e.clientX);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] select-none cursor-ew-resize rounded-lg shadow-lg overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms`, touchAction: 'none' }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setIsDragging(false)}
        >
            <img
                src={after}
                alt="Generated design"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                draggable={false}
            />
            <div
                className="absolute inset-0 w-full h-full object-contain overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={before}
                    alt="Original room"
                    className="absolute inset-0 w-full h-full object-contain"
                    draggable={false}
                />
            </div>
            <div
                className="absolute top-0 bottom-0 w-1 bg-white/80 pointer-events-none"
                style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm">
                   <svg className="w-6 h-6 text-gray-700 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
