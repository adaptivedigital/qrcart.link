'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Smartphone, Zap, ArrowRight, Table } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-bold text-xl">
            <ShoppingBag className="text-primary" />
            <span>QRCart.link</span>
          </div>
          <a href="https://docs.google.com/spreadsheets/create" target="_blank" className="text-sm font-medium text-muted hover:text-white transition-colors">
            Open Google Sheets &rarr;
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="py-20 md:py-32 text-center relative overflow-hidden">
          <div className="container relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Zap size={16} />
              <span>No coding required</span>
            </div>

            <h1 className="max-w-4xl mx-auto mb-6">
              Turn your <span className="text-gradient">Google Sheet</span> into a Store
            </h1>

            <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
              Manage products in a spreadsheet. Receive orders on WhatsApp.
              The simplest way to start selling online.
            </p>

            <div className="max-w-md mx-auto card p-2">
              <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Paste Google Sheet ID"
                  className="input flex-1"
                  value={sheetId}
                  onChange={(e) => setSheetId(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary whitespace-nowrap">
                  Create Store
                </button>
              </form>
              <p className="text-xs text-muted mt-2 text-left px-1">
                Make sure your sheet is "Published to Web" or "Anyone with link"
              </p>
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </section>

        {/* Features */}
        <section className="py-20 bg-secondary/30 border-y border-white/5">
          <div className="container">
            <h2 className="text-center mb-16 text-3xl">How it works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
                  <Table />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">1. Add Products</h3>
                <p className="text-muted">List your items in a simple Google Sheet. Add prices, images, and descriptions.</p>
              </div>

              <div className="card text-center hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">2. Auto-Generate</h3>
                <p className="text-muted">Paste your Sheet ID and we instantly build a beautiful, mobile-friendly store.</p>
              </div>

              <div className="card text-center hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4">
                  <Smartphone />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">3. WhatsApp Checkout</h3>
                <p className="text-muted">Customers browse and send orders directly to your WhatsApp with one click.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-muted text-sm border-t border-white/5">
        <p>© 2026 QRCart.link. Replicating the best.</p>
      </footer>
    </div>
  );
}
