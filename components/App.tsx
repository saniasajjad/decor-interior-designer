import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { generateDesigns } from '../services/geminiService';
import { AppState, AppView, DesignStyle, User, GalleryItem, SubscriptionPlan, Order, Service, ContactInfo } from '../types';
import { DESIGN_STYLES, LOADING_MESSAGES } from '../constants';
import * as api from '../backend/api';

// Layout
import Header from './layout/Header';
import Footer from './layout/Footer';

// Views
import Designer from './views/Designer';
import Services from './views/Services';
import Team from './views/Team';
import Pricing from './views/Pricing';
import Gallery from './views/Gallery';
import About from './views/About';
import Contact from './views/Contact';
import Orders from './views/Orders';
import AdminDashboard from './views/AdminDashboard';

// Modals
import LoginModal from './modals/LoginModal';
import PaymentModal from './modals/PaymentModal';
import UpgradeModal from './modals/UpgradeModal';
import OrderConfirmationModal from './modals/OrderConfirmationModal';


// Main App Component
const App: React.FC = () => {
    // UI/View State
    const [view, setView] = useState<AppView>('DESIGNER');
    const [appState, setAppState] = useState<AppState>('UPLOADING');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Designer State
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(DESIGN_STYLES[0]);
    const [customPrompt, setCustomPrompt] = useState<string>('');
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [loadingMessage, setLoadingMessage] = useState<string>(LOADING_MESSAGES[0]);

    // Data State (from "backend")
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
    
    // Modals state
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

    const uploadedImageUrl = useMemo(() => uploadedFile ? URL.createObjectURL(uploadedFile) : null, [uploadedFile]);
    
    // --- Data Loading Effects ---

    // Load global data on initial mount
    useEffect(() => {
        const loadInitialData = async () => {
            const [orders, info] = await Promise.all([
                api.getAllOrders(),
                api.getContactInfo()
            ]);
            setAllOrders(orders);
            setContactInfo(info);
        };
        loadInitialData();
    }, []);

    // Load user-specific data when user logs in
    useEffect(() => {
        if (activeUser) {
            api.getGallery(activeUser.email).then(setGallery);
        } else {
            setGallery([]); // Clear gallery on logout
        }
    }, [activeUser]);

    // Loading message interval
    useEffect(() => {
        let interval: number;
        if (appState === 'GENERATING') {
            interval = window.setInterval(() => {
                setLoadingMessage(prev => LOADING_MESSAGES[(LOADING_MESSAGES.indexOf(prev) + 1) % LOADING_MESSAGES.length]);
            }, 2500);
        }
        return () => { if (interval) clearInterval(interval) };
    }, [appState]);
    
    // --- Handlers ---
    
    const handleLogin = async (credentials: { name: string, email: string }) => {
        const user = await api.login(credentials);
        setActiveUser(user);
        setShowLoginModal(false);
    };

    const handleLogout = () => setActiveUser(null);

    const handleSelectPlan = (plan: SubscriptionPlan) => {
        if (!activeUser) {
            setShowLoginModal(true);
            return;
        }
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = async (plan: SubscriptionPlan) => {
        if (!activeUser) return;
        const updatedUser = await api.updateUserPlan(activeUser, plan.id);
        setActiveUser(updatedUser);
    };
    
    const handleSaveToGallery = async (generatedImage: string) => {
        if (!uploadedImageUrl || !selectedStyle || !activeUser || activeUser.plan === 'Free') return;
        
        const newItem: GalleryItem = {
            id: new Date().toISOString(),
            originalImage: uploadedImageUrl,
            generatedImage: generatedImage,
            style: selectedStyle.name,
            prompt: customPrompt,
            savedAt: new Date().toISOString()
        };
        
        const updatedGallery = await api.saveToGallery(activeUser.email, newItem);
        setGallery(updatedGallery);
    };

    const handlePlaceOrder = async (service: Service) => {
        if (!activeUser) {
            setShowLoginModal(true);
            return;
        }
        const updatedOrders = await api.placeOrder(activeUser, service);
        setAllOrders(updatedOrders);
        setShowOrderConfirmation(true);
    };

    const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
        const updatedOrders = await api.updateOrderStatus(orderId, status);
        setAllOrders(updatedOrders);
    };

    const handleUpdateContactInfo = async (newInfo: ContactInfo) => {
        const updatedInfo = await api.updateContactInfo(newInfo);
        setContactInfo(updatedInfo);
    };

    const handleImageUpload = useCallback((file: File) => {
        setUploadedFile(file);
        setAppState('CUSTOMIZING');
        setIsLoading(false);
    }, []);

    const handleGenerate = useCallback(async () => {
        if (!activeUser) {
            setShowLoginModal(true);
            return;
        }
        if (activeUser.plan === 'Free' && activeUser.freeGenerationsLeft <= 0) {
            setShowUpgradeModal(true);
            return;
        }
        if (!uploadedFile || !selectedStyle) {
            setError("Please upload an image and select a style.");
            return;
        }

        setError(null);
        setAppState('GENERATING');
        setIsLoading(true);

        try {
            if (activeUser.plan === 'Free') {
                const updatedUser = { ...activeUser, freeGenerationsLeft: activeUser.freeGenerationsLeft - 1 };
                setActiveUser(updatedUser);
                api.saveUser(updatedUser); // Save change to "backend"
            }
            const designs = await generateDesigns(uploadedFile, selectedStyle.name, customPrompt);
            setGeneratedImages(designs);
            setAppState('RESULTS');
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
            setAppState('CUSTOMIZING');
        } finally {
            setIsLoading(false);
        }
    }, [uploadedFile, selectedStyle, customPrompt, activeUser]);

    const handleReset = useCallback(() => {
        setAppState('UPLOADING');
        setUploadedFile(null);
        setSelectedStyle(DESIGN_STYLES[0]);
        setCustomPrompt('');
        setGeneratedImages([]);
        setError(null);
    }, []);
    
    const renderMainContent = () => {
        if (contactInfo === null) {
            // Render a loading state for the whole app while contact info is not ready
            return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
        }

        const userOrders = activeUser ? allOrders.filter(o => o.customerEmail === activeUser.email) : [];
        
        switch (view) {
            case 'DESIGNER': return (
                <Designer 
                    appState={appState}
                    user={activeUser}
                    uploadedImageUrl={uploadedImageUrl}
                    selectedStyle={selectedStyle}
                    customPrompt={customPrompt}
                    generatedImages={generatedImages}
                    loadingMessage={loadingMessage}
                    isLoading={isLoading}
                    error={error}
                    onImageUpload={handleImageUpload}
                    onSelectStyle={setSelectedStyle}
                    setCustomPrompt={setCustomPrompt}
                    onGenerate={handleGenerate}
                    onReset={handleReset}
                    onSaveToGallery={handleSaveToGallery}
                    setIsLoading={setIsLoading}
                />
            );
            case 'SERVICES': return <Services onOrderNow={handlePlaceOrder} />;
            case 'TEAM': return <Team setView={setView} />;
            case 'PRICING': return <Pricing onSelectPlan={handleSelectPlan} />;
            case 'GALLERY': return activeUser ? <Gallery gallery={gallery} onGenerateClick={() => setView('DESIGNER')} /> : <LoginModal onLogin={handleLogin} onClose={() => setView('DESIGNER')} />;
            case 'ABOUT': return <About />;
            case 'CONTACT': return <Contact contactInfo={contactInfo} />;
            case 'ORDERS': return activeUser ? <Orders orders={userOrders} /> : <LoginModal onLogin={handleLogin} onClose={() => setView('DESIGNER')} />;
            case 'ADMIN': return activeUser?.isAdmin ? <AdminDashboard orders={allOrders} onUpdateStatus={handleUpdateOrderStatus} contactInfo={contactInfo} onUpdateContactInfo={handleUpdateContactInfo} /> : <h1 className="text-center text-red-500 py-20 text-2xl">Access Denied</h1>;
            default: return null;
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />}
            {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} onUpgrade={() => { setShowUpgradeModal(false); setView('PRICING'); }} />}
            {showPaymentModal && selectedPlan && <PaymentModal plan={selectedPlan} onClose={() => setShowPaymentModal(false)} onPaymentSuccess={handlePaymentSuccess} />}
            {showOrderConfirmation && <OrderConfirmationModal onClose={() => setShowOrderConfirmation(false)} onViewOrders={() => { setShowOrderConfirmation(false); setView('ORDERS'); }} />}
            
            <Header user={activeUser} onLoginClick={() => setShowLoginModal(true)} onLogout={handleLogout} setView={setView} currentView={view} />

            {view === 'DESIGNER' ? (
                 <main className="container mx-auto px-4 py-8 md:py-16">
                    {renderMainContent()}
                </main>
            ) : (
                <main>{renderMainContent()}</main>
            )}
           
            <Footer setView={setView} />
        </div>
    );
};

export default App;
