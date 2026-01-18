import {
    Users,
    ShoppingBag,
    DollarSign,
    TrendingUp,
    ExternalLink,
    BarChart2,
    Plus,
    Zap
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
    const stats = [
        { name: 'Total Sales', value: '$0.00', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Total Orders', value: '0', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Visits', value: '0', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Growth', value: '+0%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
                    <p className="text-gray-500">Here's a snapshot of your store's performance today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn btn-secondary flex gap-2">
                        <Plus size={18} />
                        <span>Add Product</span>
                    </button>
                    <Link
                        href="/"
                        target="_blank"
                        className="btn btn-primary flex gap-2"
                    >
                        <span>View Live Store</span>
                        <ExternalLink size={18} />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="card p-6 flex flex-col justify-between hover:shadow-lg transition-all cursor-default group border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">{stat.name}</p>
                            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card p-10 bg-gradient-to-br from-primary to-green-600 text-white relative overflow-hidden group border-none shadow-xl shadow-green-100">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-6 backdrop-blur-md">
                            <Zap size={14} />
                            <span>QUICK START</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Ready to double your sales?</h3>
                        <p className="text-green-50 mb-8 max-w-md leading-relaxed text-lg">
                            Connect your Google Sheet and start receiving orders manually or via WhatsApp in less than a minute.
                        </p>
                        <button className="btn bg-white text-primary hover:bg-green-50 px-8 py-3 text-lg font-bold">
                            Connect Google Sheet
                        </button>
                    </div>
                    <ShoppingBag className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 rotate-12 group-hover:rotate-6 transition-transform duration-700" />
                </div>

                <div className="card p-10 flex flex-col justify-center items-center text-center border-dashed border-2 border-gray-200 bg-gray-50/50">
                    <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                        <BarChart2 className="text-gray-300" size={40} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Detailed Analytics</h4>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                        Your visitor data and sales trends will appear here once you have traffic.
                    </p>
                </div>
            </div>
        </div>
    );
}
