import React, { useState, useEffect } from 'react';
import { Order, ContactInfo } from '../../types';
import { CogIcon, CheckmarkCircleIcon } from '../icons';

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
        'In Progress': "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
        Completed: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

// A self-contained component for managing contact info
const ContactInfoManager: React.FC<{
    currentInfo: ContactInfo;
    onSave: (newInfo: ContactInfo) => void;
}> = ({ currentInfo, onSave }) => {
    const [info, setInfo] = useState(currentInfo);
    const [saved, setSaved] = useState(false);

    // If the prop from parent changes
    useEffect(() => {
        setInfo(currentInfo);
    }, [currentInfo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(info);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500); // Show "Saved!" message for 2.5 seconds
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 mt-12">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Manage Contact Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <input type="text" id="address" name="address" value={info.address} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                    <input type="text" id="phone" name="phone" value={info.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" id="email" name="email" value={info.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div className="flex justify-end items-center gap-4 pt-2">
                    {saved && (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 animate-fade-in">
                            <CheckmarkCircleIcon className="w-5 h-5" />
                            <p className="text-sm font-semibold">Saved!</p>
                        </div>
                    )}
                    <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition">Save Changes</button>
                </div>
            </form>
        </div>
    );
}

interface AdminDashboardProps {
    orders: Order[];
    onUpdateStatus: (orderId: string, status: Order['status']) => void;
    contactInfo: ContactInfo;
    onUpdateContactInfo: (newInfo: ContactInfo) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, onUpdateStatus, contactInfo, onUpdateContactInfo }) => {
    return (
        <section className="py-16 md:py-24 animate-fade-in bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-12">Admin Dashboard</h2>
                
                {/* Orders Panel */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                     <h3 className="text-2xl font-bold text-gray-800 dark:text-white p-6 border-b dark:border-gray-700">All Orders</h3>
                    {orders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Order ID</th>
                                        <th scope="col" className="px-6 py-3">Customer</th>
                                        <th scope="col" className="px-6 py-3">Service</th>
                                        <th scope="col" className="px-6 py-3">Date</th>
                                        <th scope="col" className="px-6 py-3">Price</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {order.id}
                                            </th>
                                            <td className="px-6 py-4">{order.customerName}</td>
                                            <td className="px-6 py-4">{order.serviceName}</td>
                                            <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">{order.price}</td>
                                            <td className="px-6 py-4">
                                                <select 
                                                    value={order.status}
                                                    onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center p-12">
                            <CogIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-4 text-gray-600 dark:text-gray-400">No orders have been placed yet.</p>
                        </div>
                    )}
                </div>

                {/* Contact Info Panel */}
                <ContactInfoManager currentInfo={contactInfo} onSave={onUpdateContactInfo} />
            </div>
        </section>
    )
};

export default AdminDashboard;