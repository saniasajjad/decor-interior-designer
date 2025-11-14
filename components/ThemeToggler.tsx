import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.95-4.243l-1.59-1.59M3 12H5.25m-.386-6.364L6.34 7.09M12 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.572 0 4.92-.99 6.697-2.648z" />
    </svg>
);

const DesktopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
);

const ThemeToggler: React.FC = () => {
    const [theme, setTheme] = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const themes = [
        { name: 'light', icon: SunIcon, label: 'Light' },
        { name: 'dark', icon: MoonIcon, label: 'Dark' },
        { name: 'system', icon: DesktopIcon, label: 'System' },
    ];

    const currentTheme = themes.find(t => t.name === theme);
    const CurrentIcon = currentTheme?.icon || DesktopIcon;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
            >
                <CurrentIcon className="w-6 h-6" />
            </button>
            <div className={`absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black dark:ring-white/10 ring-opacity-5 transition-opacity duration-200 z-50 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {themes.map(t => {
                    const Icon = t.icon;
                    return (
                         <button
                            key={t.name}
                            onClick={() => {
                                setTheme(t.name as 'light' | 'dark' | 'system');
                                setIsOpen(false);
                            }}
                            className={`w-full text-left flex items-center space-x-3 px-4 py-2 text-sm ${
                                theme === t.name ? 'font-semibold text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-200'
                            } hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{t.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default ThemeToggler;
