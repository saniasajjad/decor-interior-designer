import { User, GalleryItem, Order, Service, ContactInfo, SubscriptionPlanName } from '../types';
import { ADMIN_EMAIL, DEFAULT_CONTACT_INFO } from '../constants';

// --- Server base (optional) ---
const API_BASE = undefined;

// --- LocalStorage Keys ---
const ALL_ORDERS_KEY = 'decor-all-orders';
const CONTACT_INFO_KEY = 'decor-contact-info';
const getUserKey = (email: string) => `decor-user-${email}`;
const getGalleryKey = (email: string) => `decor-gallery-${email}`;

// --- Latency Simulation ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- API Functions ---

/**
 * Logs in a user. Creates a new user if one doesn't exist.
 */
export const login = async (credentials: { name: string, email: string }): Promise<User> => {
    if (API_BASE) {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) throw new Error('Failed to login');
        return await res.json();
    }
    await sleep(500);
    const { name, email } = credentials;
    const isAdmin = email === ADMIN_EMAIL;
    const userKey = getUserKey(email);
    try {
        const existingUserRaw = window.localStorage.getItem(userKey);
        if (existingUserRaw) {
            const user = JSON.parse(existingUserRaw) as User;
            user.isAdmin = isAdmin;
            return user;
        }
    } catch (e) { console.error("Failed to read user from localStorage", e); }
    const newUser: User = { name, email, plan: 'Free', freeGenerationsLeft: 3, isAdmin };
    try { window.localStorage.setItem(userKey, JSON.stringify(newUser)); } catch (e) { console.error("Failed to save new user to localStorage", e); }
    return newUser;
};

/**
 * Saves user data.
 */
export const saveUser = async (user: User): Promise<User> => {
    if (API_BASE) {
        const res = await fetch(`${API_BASE}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!res.ok) throw new Error('Failed to save user');
        return await res.json();
    }
    await sleep(100);
    try { window.localStorage.setItem(getUserKey(user.email), JSON.stringify(user)); } catch (e) { console.error("Failed to save user to localStorage", e); }
    return user;
}


/**
 * Fetches the gallery for a specific user.
 */
export const getGallery = async (userEmail: string): Promise<GalleryItem[]> => {
    if (API_BASE) {
        const res = await fetch(`${API_BASE}/gallery?email=${encodeURIComponent(userEmail)}`);
        if (!res.ok) throw new Error('Failed to load gallery');
        return await res.json();
    }
    await sleep(300);
    try { const item = window.localStorage.getItem(getGalleryKey(userEmail)); return item ? JSON.parse(item) : []; }
    catch (err) { console.error(`Failed to load gallery from localStorage`, err); return []; }
};

/**
 * Saves a new item to a user's gallery.
 */
export const saveToGallery = async (userEmail: string, newItem: GalleryItem): Promise<GalleryItem[]> => {
    if (API_BASE) {
        const res = await fetch(`${API_BASE}/gallery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, item: newItem })
        });
        if (!res.ok) throw new Error('Failed to save to gallery');
        return await res.json();
    }
    await sleep(500);
    const currentGallery = await getGallery(userEmail);
    const updatedGallery = [newItem, ...currentGallery];
    try { window.localStorage.setItem(getGalleryKey(userEmail), JSON.stringify(updatedGallery)); }
    catch (error) { console.error("Failed to save gallery to localStorage", error); }
    return updatedGallery;
};

/**
 * Fetches all orders for the admin dashboard.
 */
export const getAllOrders = async (): Promise<Order[]> => {
    if (API_BASE) {
        const res = await fetch(`${API_BASE}/orders`);
        if (!res.ok) throw new Error('Failed to load orders');
        return await res.json();
    }
    await sleep(500);
    try { const item = window.localStorage.getItem(ALL_ORDERS_KEY); return item ? JSON.parse(item) : []; }
    catch (err) { console.error(`Failed to load orders from localStorage`, err); return []; }
};

/**
 * Places a new order.
 */
export const placeOrder = async (user: User, service: Service): Promise<Order[]> => {
    if (API_BASE) {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, service })
        });
        if (!res.ok) throw new Error('Failed to place order');
        return await res.json();
    }
    await sleep(700);
    const newOrder: Order = { id: `ORD-${Date.now()}`, serviceName: service.name, price: service.price, status: 'Pending', orderDate: new Date().toISOString(), customerName: user.name, customerEmail: user.email };
    const allOrders = await getAllOrders();
    const updatedOrders = [newOrder, ...allOrders];
    try { window.localStorage.setItem(ALL_ORDERS_KEY, JSON.stringify(updatedOrders)); }
    catch (error) { console.error("Failed to save orders to localStorage", error); }
    return updatedOrders;
};

/**
 * Updates the status of an existing order.
 */
export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order[]> => {
    if (API_BASE) {
        const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderId)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Failed to update order status');
        return await res.json();
    }
    await sleep(300);
    const allOrders = await getAllOrders();
    const updatedOrders = allOrders.map(order => order.id === orderId ? { ...order, status } : order);
    try { window.localStorage.setItem(ALL_ORDERS_KEY, JSON.stringify(updatedOrders)); }
    catch (error) { console.error("Failed to save updated orders to localStorage", error); }
    return updatedOrders;
};

/**
 * Upgrades a user's subscription plan.
 */
export const updateUserPlan = async (user: User, planId: SubscriptionPlanName): Promise<User> => {
    await sleep(400);
    const updatedUser = { ...user, plan: planId };
    await saveUser(updatedUser);
    return updatedUser;
};


/**
 * Gets the current contact information.
 */
export const getContactInfo = async (): Promise<ContactInfo> => {
    if (API_BASE) {
        const res = await fetch(`${API_BASE}/contact`);
        if (!res.ok) throw new Error('Failed to load contact info');
        return await res.json();
    }
    await sleep(200);
    try { const item = window.localStorage.getItem(CONTACT_INFO_KEY); return item ? JSON.parse(item) : DEFAULT_CONTACT_INFO; }
    catch (err) { console.error(`Failed to load contact info from localStorage`, err); return DEFAULT_CONTACT_INFO; }
};

/**
 * Updates the contact information.
 */
export const updateContactInfo = async (newInfo: ContactInfo): Promise<ContactInfo> => {
    if (API_BASE) {
        const res = await fetch(`${API_BASE}/contact`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newInfo)
        });
        if (!res.ok) throw new Error('Failed to update contact info');
        return await res.json();
    }
    await sleep(300);
    try { window.localStorage.setItem(CONTACT_INFO_KEY, JSON.stringify(newInfo)); }
    catch (error) { console.error("Failed to save contact info to localStorage", error); }
    return newInfo;
};
