'use client';

import { useState, useMemo } from 'react';
import { ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight, Check, X, Smartphone, MessageSquare } from 'lucide-react';
import { Product } from '@/lib/googleSheets';
import { CartItem, generateWhatsAppLink, CustomerDetails } from '@/lib/whatsapp';

interface StoreViewProps {
    products: Product[];
    storeId: string;
}

type ViewState = 'shop' | 'checkout' | 'success';

export default function StoreView({ products, storeId }: StoreViewProps) {
    const [view, setView] = useState<ViewState>('shop');
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [customer, setCustomer] = useState<CustomerDetails>({ name: '', address: '' });
    const [merchantPhone, setMerchantPhone] = useState('15551234567'); // Demo default

    const addToCart = (product: Product) => {
        setCart(prev => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1
        }));
    };

    const removeFromCart = (product: Product) => {
        setCart(prev => {
            const current = prev[product.id] || 0;
            if (current <= 1) {
                const { [product.id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [product.id]: current - 1 };
        });
    };

    const cartItems: CartItem[] = useMemo(() => {
        return Object.entries(cart).map(([id, quantity]) => {
            const product = products.find(p => p.id === id);
            if (!product) return null;
            return { ...product, quantity };
        }).filter(Boolean) as CartItem[];
    }, [cart, products]);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        const link = generateWhatsAppLink(merchantPhone, cartItems, customer);
        window.open(link, '_blank');
        setView('success');
    };

    if (view === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="card max-w-md w-full text-center p-12">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Order Sent!</h2>
                    <p className="text-gray-600 mb-8">Your order has been sent to the merchant via WhatsApp. They will contact you shortly to confirm.</p>
                    <button
                        onClick={() => {
                            setCart({});
                            setView('shop');
                        }}
                        className="btn btn-primary w-full h-12"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-32">
            {/* Header */}
            <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-40">
                <div className="container flex items-center justify-between h-20">
                    <div className="flex items-center gap-3">
                        {view === 'checkout' && (
                            <button onClick={() => setView('shop')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <h1 className="font-bold text-xl tracking-tight">
                            {view === 'shop' ? 'The Store' : 'Checkout'}
                        </h1>
                    </div>
                    <div className="relative">
                        <ShoppingBag className={totalCount > 0 ? 'text-primary' : 'text-gray-300'} />
                        {totalCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                {totalCount}
                            </span>
                        )}
                    </div>
                </div>
            </header>

            <main className="container py-8">
                {/* Demo Banner */}
                {view === 'shop' && (
                    <div className="mb-8 p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <Smartphone size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Merchant WhatsApp</p>
                                <p className="text-xs text-gray-500">Demo orders will be sent to this number</p>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={merchantPhone}
                            onChange={e => setMerchantPhone(e.target.value)}
                            className="input w-32 h-10 text-center font-medium"
                        />
                    </div>
                )}

                {view === 'shop' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map(product => {
                            const quantity = cart[product.id] || 0;
                            return (
                                <div key={product.id} className="group relative">
                                    <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden mb-4 relative">
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <ShoppingBag size={48} />
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full font-bold shadow-lg border border-gray-100">
                                            ${product.price.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="px-1 flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                                        </div>
                                        {quantity > 0 ? (
                                            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 border border-gray-200">
                                                <button onClick={() => removeFromCart(product)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors shadow-sm">
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-bold w-4 text-center text-sm">{quantity}</span>
                                                <button onClick={() => addToCart(product)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors shadow-sm">
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-green-100 hover:scale-110 transition-transform active:scale-95"
                                            >
                                                <Plus size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto">
                        <form onSubmit={handleCheckout} className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">Delivery Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="input h-12"
                                            placeholder="Enter your full name"
                                            value={customer.name}
                                            onChange={e => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                        <textarea
                                            rows={3}
                                            required
                                            className="input py-3"
                                            placeholder="Enter your detailed address"
                                            value={customer.address}
                                            onChange={e => setCustomer(prev => ({ ...prev, address: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">Order Summary</h3>
                                <div className="card border-gray-100 p-0 overflow-hidden">
                                    <div className="divide-y divide-gray-100">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex-shrink-0">
                                                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-gray-900">{item.name}</p>
                                                        <p className="text-xs text-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 p-4 flex justify-between items-center bg-opacity-50">
                                        <span className="font-bold text-gray-500">Order Total</span>
                                        <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full h-14 text-lg gap-3">
                                <MessageSquare size={20} />
                                <span>Place Order via WhatsApp</span>
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                )}
            </main>

            {/* Sticky Bottom Cart Bar */}
            {totalCount > 0 && view === 'shop' && (
                <div className="fixed bottom-8 left-0 right-0 z-50 px-6">
                    <div className="container max-w-lg mx-auto">
                        <button
                            onClick={() => setView('checkout')}
                            className="w-full h-16 bg-gray-900 text-white rounded-2xl shadow-2xl flex items-center justify-between px-6 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">{totalCount} items</div>
                                <span className="font-bold text-lg">View Cart</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-lg">${total.toFixed(2)}</span>
                                <ArrowRight size={20} className="text-primary" />
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
