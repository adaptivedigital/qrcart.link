'use client';

import { useState } from 'react';
import {
    ShoppingBasket,
    Search,
    Filter,
    MoreVertical,
    CheckCircle,
    Clock,
    XCircle
} from 'lucide-react';

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const orders = [
        { id: 'ORD-001', customer: 'John Doe', total: '$45.00', status: 'COMPLETED', date: '2026-01-18 08:30' },
        { id: 'ORD-002', customer: 'Jane Smith', total: '$22.50', status: 'PENDING', date: '2026-01-18 09:15' },
        { id: 'ORD-003', customer: 'Bob Johnson', total: '$120.00', status: 'CANCELLED', date: '2026-01-17 14:20' },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <CheckCircle className="text-emerald-400" size={16} />;
            case 'PENDING': return <Clock className="text-amber-400" size={16} />;
            case 'CANCELLED': return <XCircle className="text-rose-400" size={16} />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Orders</h2>
                    <p className="text-slate-400">Manage and track your customer orders.</p>
                </div>
            </div>

            <div className="card p-0 bg-[#1e293b]/50 border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="input pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-secondary flex items-center gap-2">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-sm text-indigo-400">{order.id}</td>
                                    <td className="px-6 py-4 text-white font-medium">{order.customer}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            {getStatusIcon(order.status)}
                                            <span className="text-slate-300">{order.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white font-bold">{order.total}</td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">{order.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-white/5 text-center">
                    <p className="text-sm text-slate-500">Showing 3 orders</p>
                </div>
            </div>
        </div>
    );
}
