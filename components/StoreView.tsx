'use client';

import { useState, useMemo } from 'react';
import { ShoppingCart, Plus, Minus, Phone } from 'lucide-react';
import { Product } from '@/lib/googleSheets';
import { CartItem, generateWhatsAppLink } from '@/lib/whatsapp';

interface StoreViewProps {
    products: Product[];
    storeId: string; // The sheet ID
}

export default function StoreView({ products, storeId }: StoreViewProps) {
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [phoneNumber, setPhoneNumber] = useState(''); // Allow user to set phone number or merchant could set it in config (if we had config)

    // NOTE: In a real app, the Merchant's phone number would come from the sheet config.
    // For MVP, we'll ask the USER (Customer) to send it to a default number OR ask for merchant number?
    // The business model says "Receive orders on WhatsApp". So the Store Owner's number needs to be known.
    // PROPOSAL: We'll assume the Sheet has a metadata row or we default to a placeholder.
    // OR: We ask the user to input the "Merchant Phone" on the landing page/creation step.
    // Since we passed just `storeId`, let's assume for this MVP the customer enters the Merchant Number to simulate the functionality, 
    // or we hardcode a demo number if not found.
    // BETTER MVP: We scan the products for a special row or just let the user input "Where to send order?" (simulating the Merchant setup).

    // Let's add a "Store Settings" input at top for Demo purposes if not configured.
    const [merchantPhone, setMerchantPhone] = useState('15551234567');

    const addToCart = (product: Product) => {
        setCart(prev => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1
        }));
    };

    const removeFromCart = (product: Product) => {
        setCart(prev => {
            const newCount = (prev[product.id] || 0) - 1;
            if (newCount <= 0) {
                const { [product.id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [product.id]: newCount };
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

    const whatsappLink = generateWhatsAppLink(merchantPhone, cartItems);

    return (
        <div className="min-h-screen bg-slate-950 pb-24">
            {/* Store Header */}
            <div className="bg-slate-900 border-b border-white/10 p-4 sticky top-0 z-40 backdrop-blur-md bg-opacity-80">
                <div className="container flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white m-0 h-auto">Store {storeId.slice(0, 6)}...</h1>
                    <div className="relative">
                        <ShoppingCart className="text-white" />
                        {totalCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                                {totalCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="container py-8">

                {/* Demo Config */}
                <div className="mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm">
                    <p className="text-blue-300 font-bold mb-2">Demo Configuration</p>
                    <label className="block text-muted mb-1">Send orders to (Merchant WhatsApp):</label>
                    <input
                        type="text"
                        value={merchantPhone}
                        onChange={e => setMerchantPhone(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white w-full max-w-xs"
                    />
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted text-xl">No products found in this sheet.</p>
                        <p className="text-sm text-muted mt-2">Make sure your sheet columns are: Name, Price, Image, Description</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="card p-0 overflow-hidden flex flex-col h-full group">
                                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white font-bold">
                                        ${product.price.toFixed(2)}
                                    </div>
                                </div>

                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                                    <p className="text-sm text-muted mb-4 line-clamp-2 flex-1">{product.description}</p>

                                    <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                                        {cart[product.id] ? (
                                            <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-1">
                                                <button onClick={() => removeFromCart(product)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-700 rounded text-white">-</button>
                                                <span className="font-bold w-4 text-center">{cart[product.id]}</span>
                                                <button onClick={() => addToCart(product)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-700 rounded text-white">+</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => addToCart(product)} className="btn btn-secondary w-full">
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Checkout */}
            {totalCount > 0 && (
                <div className="fixed bottom-6 left-0 right-0 z-50 px-4">
                    <div className="container max-w-md mx-auto">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary w-full shadow-xl flex items-center justify-between py-4 text-lg animate-bounce-subtle"
                        >
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold">{totalCount} items</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Checkout on WhatsApp</span>
                                <Phone size={20} />
                            </div>
                            <div className="font-bold">${total.toFixed(2)}</div>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
