import React, { useState } from 'react';
import { User, AppView } from '../../types';
import { LogoIcon, UserIcon, GalleryIcon, LogoutIcon, ClipboardListIcon, CogIcon, MenuIcon, CloseIcon } from '../icons';
import ThemeToggler from '../ThemeToggler';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  setView: (view: AppView) => void;
  currentView: AppView;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout, setView, currentView }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const NavLink: React.FC<{ view: AppView, children: React.ReactNode, isMobile?: boolean }> = ({ view, children, isMobile = false }) => {
        const handleClick = () => {
            setView(view);
            if (isMobile) {
                setIsMobileMenuOpen(false);
            }
        };

        const mobileClasses = "block py-3 text-lg font-semibold";
        const desktopClasses = "text-sm font-medium";

        return (
            <button
                onClick={handleClick}
                className={`transition ${currentView === view ? 'text-teal-500' : 'text-gray-600 hover:text-teal-500 dark:text-gray-300 dark:hover:text-teal-400'} ${isMobile ? mobileClasses : desktopClasses}`}
            >
                {children}
            </button>
        );
    };

    return (
        <header className="py-4 px-4 md:px-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                <button onClick={() => setView('DESIGNER')} className="flex items-center space-x-3 text-gray-800 dark:text-gray-100 z-50">
                    <LogoIcon className="h-8 w-8 text-teal-500" />
                    <h1 className="text-2xl font-bold tracking-tight">Decor</h1>
                </button>
                
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    <NavLink view="DESIGNER">AI Designer</NavLink>
                    <NavLink view="PRICING">Pricing</NavLink>
                    <NavLink view="SERVICES">Services</NavLink>
                    <NavLink view="ABOUT">About Us</NavLink>
                    <NavLink view="CONTACT">Contact</NavLink>
                </nav>
                
                <div className="flex items-center space-x-2 md:space-x-4">
                    <ThemeToggler />
                    
                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    <UserIcon className="h-6 w-6" />
                                    <span>{user.name} <span className="text-xs text-teal-500">({user.plan})</span></span>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                                    {user.isAdmin && (
                                        <button onClick={() => setView('ADMIN')} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <CogIcon className="w-4 h-4" />
                                            <span>Admin Dashboard</span>
                                        </button>
                                    )}
                                    <button onClick={() => setView('GALLERY')} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <GalleryIcon className="w-4 h-4" />
                                        <span>My Gallery</span>
                                    </button>
                                     <button onClick={() => setView('ORDERS')} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <ClipboardListIcon className="w-4 h-4" />
                                        <span>My Orders</span>
                                    </button>
                                    <button onClick={onLogout} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <LogoutIcon className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={onLoginClick} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition">
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <span className="sr-only">Open menu</span>
                        {isMobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <div className={`md:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="container mx-auto px-8 pt-24 pb-8 flex flex-col h-full">
                    <nav className="flex flex-col items-start space-y-4 mb-8">
                        <NavLink view="DESIGNER" isMobile>AI Designer</NavLink>
                        <NavLink view="PRICING" isMobile>Pricing</NavLink>
                        <NavLink view="SERVICES" isMobile>Services</NavLink>
                        <NavLink view="ABOUT" isMobile>About Us</NavLink>
                        <NavLink view="CONTACT" isMobile>Contact</NavLink>
                    </nav>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-auto">
                        {user ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <UserIcon className="h-8 w-8 text-gray-500" />
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-teal-500">{user.plan} Plan</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start space-y-2 pl-2 text-lg">
                                    {user.isAdmin && (
                                        <button onClick={() => { setView('ADMIN'); setIsMobileMenuOpen(false); }} className="w-full text-left flex items-center space-x-3 py-2 text-gray-700 dark:text-gray-200">
                                            <CogIcon className="w-5 h-5" />
                                            <span>Admin Dashboard</span>
                                        </button>
                                    )}
                                    <button onClick={() => { setView('GALLERY'); setIsMobileMenuOpen(false); }} className="w-full text-left flex items-center space-x-3 py-2 text-gray-700 dark:text-gray-200">
                                        <GalleryIcon className="w-5 h-5" />
                                        <span>My Gallery</span>
                                    </button>
                                    <button onClick={() => { setView('ORDERS'); setIsMobileMenuOpen(false); }} className="w-full text-left flex items-center space-x-3 py-2 text-gray-700 dark:text-gray-200">
                                        <ClipboardListIcon className="w-5 h-5" />
                                        <span>My Orders</span>
                                    </button>
                                    <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left flex items-center space-x-3 py-2 text-gray-700 dark:text-gray-200">
                                        <LogoutIcon className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg text-base transition">
                                Login / Sign Up
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;