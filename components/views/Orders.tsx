import React from 'react';
import { Order } from '../../types';
import { ClipboardListIcon } from '../icons';

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
        'In Progress': "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
        Completed: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


interface OrdersProps {
    orders: Order[];
}
const Orders: React.FC<OrdersProps> = ({ orders }) => {

    if (orders.length === 0) {
        return (
            <div className="text-center py-24 animate-fade-in container mx-auto px-4">
                <ClipboardListIcon className="mx-auto h-16 w-16 text-gray-400" />
                <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">No Orders Yet</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Your placed orders for our professional services will appear here.</p>
            </div>
        );
    }

    return (
        <section className="py-16 md:py-24 animate-fade-in bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Service Orders</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Order ID</th>
                                    <th scope="col" className="px-6 py-3">Service</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Price</th>
                                    <th scope="col" className="px-6 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50" style={{ animationDelay: `${index * 100}ms` }}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order.id}
                                        </th>
                                        <td className="px-6 py-4">{order.serviceName}</td>
                                        <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{order.price}</td>
                                        <td className="px-6 py-4 text-center">
                                            <StatusBadge status={order.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Orders;