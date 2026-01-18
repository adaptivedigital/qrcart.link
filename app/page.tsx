'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Smartphone, Zap, ArrowRight, Table, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [sheetId, setSheetId] = useState('');
  const router = useRouter();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (sheetId.trim()) {
      router.push(`/store/${sheetId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-gray-900">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-100">
              <ShoppingBag size={22} />
            </div>
            <span>QRCart<span className="text-primary">.link</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">How it works</a>
            <Link href="/api/auth/signin" className="btn btn-secondary">Sign In</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-primary text-sm font-semibold mb-8">
                  <Zap size={16} />
                  <span>No coding required</span>
                </div>
                <h1 className="mb-6 leading-tight">
                  Turn your <span className="text-primary">Google Sheet</span> into a powerful Online Store
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                  The simplest way to start selling online. Manage products in a spreadsheet and receive orders instantly on WhatsApp.
                </p>

                <div className="max-w-md">
                  <form onSubmit={handleCreate} className="flex flex-col gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Paste your Google Sheet ID here..."
                        className="input h-14 pl-4 pr-32 shadow-sm"
                        value={sheetId}
                        onChange={(e) => setSheetId(e.target.value)}
                        required
                      />
                      <button type="submit" className="absolute right-2 top-2 h-10 btn btn-primary">
                        Create Store
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 ml-1">
                      Need help? <a href="https://docs.google.com/spreadsheets/create" target="_blank" className="text-primary hover:underline">Create a sheet &rarr;</a>
                    </p>
                  </form>
                </div>

                <div className="mt-12 flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <CheckCircle2 size={18} className="text-primary" />
                    <span>Free Forever plan</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <CheckCircle2 size={18} className="text-primary" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>

              <div className="relative lg:block hidden">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-50 rounded-full blur-3xl -z-10" />
                <div className="card p-0 overflow-hidden shadow-2xl border-gray-100 border-[8px]">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-6342624d4620?auto=format&fit=crop&q=80&w=800"
                    alt="Store Preview"
                    className="w-full h-auto"
                  />
                  <div className="p-6 bg-white border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="m-0 font-bold">Premium Coffee Beans</h4>
                        <p className="text-sm text-gray-500 m-0">$12.50 • In Stock</p>
                      </div>
                      <div className="btn btn-primary btn-sm rounded-full">Add to Cart</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="section section-alt">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="mb-4">Why choose QRCart.link?</h2>
              <p className="text-gray-600 text-lg">Everything you need to run a successful online business from a single spreadsheet.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-8 group hover:border-primary transition-all">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Table size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Google Sheets Sync</h3>
                <p className="text-gray-600 leading-relaxed">Changes in your sheet reflect instantly on your store. No complex dashboards needed.</p>
              </div>

              <div className="card p-8 group hover:border-primary transition-all">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">WhatsApp Checkout</h3>
                <p className="text-gray-600 leading-relaxed">Receive orders directly as a WhatsApp message. Clear, fast, and personally connected.</p>
              </div>

              <div className="card p-8 group hover:border-primary transition-all">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Mobile Optimized</h3>
                <p className="text-gray-600 leading-relaxed">Your store looks stunning on every device. Fast loading and effortless browsing for customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="section">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="mb-4">Perfect for Small Businesses</h2>
              <p className="text-gray-600 text-lg">Launch your online presence in less than 5 minutes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
                  alt="Feature Illustration"
                  className="rounded-3xl shadow-2xl border border-gray-100"
                />
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Connect your Sheet</h4>
                    <p className="text-gray-600">Simply paste your Google Sheet ID. We'll automatically fetch your products, prices, and images.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Customize your Design</h4>
                    <p className="text-gray-600">Change colors, fonts, and branding to match your business identity in real-time.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Share your Link or QR</h4>
                    <p className="text-gray-600">Get a unique URL and a downloadable QR code for your store. Share it on Instagram, WhatsApp, or print it.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-gray-900">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <ShoppingBag size={18} />
              </div>
              <span>QRCart.link</span>
            </Link>
            <div className="flex gap-10">
              <Link href="/privacy" className="text-gray-500 hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-primary transition-colors text-sm">Terms of Service</Link>
              <Link href="/contact" className="text-gray-500 hover:text-primary transition-colors text-sm">Contact Us</Link>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 QRCart.link. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
