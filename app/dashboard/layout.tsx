'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    ShoppingBag,
    Settings,
    Palette,
    BarChart2,
    LogOut,
    ShoppingBasket
} from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/dashboard', icon: Home },
        { name: 'Products', href: '/dashboard/products', icon: ShoppingBag },
        { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBasket },
        { name: 'Design', href: '/dashboard/design', icon: Palette },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-[#1e293b]/50 backdrop-blur-xl sticky top-0 h-screen flex flex-col">
                <div className="p-6 flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <ShoppingBag className="text-white" size={20} />
                    </div>
                    <span className="font-bold text-xl text-white tracking-tight">QRCart</span>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-white'} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 border-b border-white/5 bg-[#0f172a]/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
                    <h1 className="text-sm font-medium text-slate-400">Dashboard / <span className="text-white">{navItems.find(n => n.href === pathname)?.name || 'Home'}</span></h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10"></div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
