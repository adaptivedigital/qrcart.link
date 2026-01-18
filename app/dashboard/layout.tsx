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
    ShoppingBasket,
    User
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
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white sticky top-0 h-screen flex flex-col">
                <div className="p-8 flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-green-100">
                        <ShoppingBag size={20} />
                    </div>
                    <span className="font-bold text-xl text-gray-900 tracking-tight">QRCart</span>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-primary text-white shadow-md shadow-green-100'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-4 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            <User size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">Store Owner</p>
                            <p className="text-xs text-gray-500 truncate">owner@qrcart.link</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
                        <LogOut size={18} />
                        <span className="font-medium text-sm">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-20 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8 shrink-0">
                    <h2 className="text-lg font-bold text-gray-900">
                        {navItems.find(n => n.href === pathname)?.name || 'Dashboard'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</p>
                            <p className="text-sm font-bold text-primary">Free Forever</p>
                        </div>
                        <div className="h-8 w-px bg-gray-200 mx-2"></div>
                        <Link href="/" className="btn btn-secondary h-10 px-4 text-sm font-semibold">
                            Visit Store
                        </Link>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
