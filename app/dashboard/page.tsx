import {
    Users,
    ShoppingBag,
    DollarSign,
    TrendingUp,
    ExternalLink
} from 'lucide-react';

export default function DashboardHome() {
    const stats = [
        { name: 'Total Sales', value: '$0.00', icon: DollarSign, color: 'text-emerald-400' },
        { name: 'Total Orders', value: '0', icon: ShoppingBag, color: 'text-blue-400' },
        { name: 'Visits', value: '0', icon: Users, color: 'text-indigo-400' },
        { name: 'Growth', value: '+0%', icon: TrendingUp, color: 'text-rose-400' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome back!</h2>
                    <p className="text-slate-400">Here's what's happening with your store today.</p>
                </div>
                <a
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-white hover:bg-slate-700 transition-colors"
                >
                    <span>View Store</span>
                    <ExternalLink size={16} />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="p-6 rounded-2xl bg-[#1e293b]/50 border border-white/10 shadow-sm hover:border-white/20 transition-all cursor-default group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-slate-900 border border-white/10 group-hover:scale-110 transition-transform ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">{stat.name}</p>
                        <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-8 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to sell?</h3>
                        <p className="text-indigo-100 mb-6 max-w-sm">Connect your Google Sheet and start receiving orders on WhatsApp in less than a minute.</p>
                        <button className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors">
                            Configure products
                        </button>
                    </div>
                    <ShoppingBag className="absolute -bottom-6 -right-6 w-48 h-48 text-white/10 rotate-12 group-hover:rotate-6 transition-transform duration-500" />
                </div>

                <div className="p-8 rounded-2xl bg-[#1e293b]/50 border border-white/10 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-4">
                        <BarChart2 className="text-slate-400" size={32} />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Collect more data</h4>
                    <p className="text-slate-400 text-sm max-w-xs">Your analytics will appear here once you have your first visitor.</p>
                </div>
            </div>
        </div>
    );
}

