'use client';

import { useState } from 'react';
import { Table, RefreshCw, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProductsPage() {
    const [sheetId, setSheetId] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSync, setLastSync] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSync = async () => {
        setIsSyncing(true);
        setStatus('idle');

        // Simulate API call to sync
        setTimeout(() => {
            setIsSyncing(false);
            setLastSync(new Date().toLocaleString());
            setStatus('success');
        }, 2000);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to save the sheetId to the DB via API
        setStatus('success');
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Connect Products</h2>
                <p className="text-slate-400">Manage your Google Sheet connection and product data.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="card p-8 border border-white/10 bg-[#1e293b]/50">
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Google Sheet ID</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={sheetId}
                                        onChange={(e) => setSheetId(e.target.value)}
                                        placeholder="e.g. 1A2b3C4d5E6f7G8h..."
                                        className="input flex-1"
                                        required
                                    />
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500">
                                    Find this ID in your Google Sheet URL: docs.google.com/spreadsheets/d/<b>[SHEET_ID]</b>/
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm">
                                    <Table className="text-indigo-400" size={18} />
                                    <span className="text-slate-300">Auto-sync is enabled</span>
                                </div>
                                {lastSync && (
                                    <span className="text-xs text-slate-500 italic">Last sync: {lastSync}</span>
                                )}
                                <button
                                    type="button"
                                    onClick={handleSync}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-white hover:bg-slate-700 transition-all ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isSyncing}
                                >
                                    <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                                    <span>{isSyncing ? 'Syncing...' : 'Force Sync'}</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {status === 'success' && (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-sm">
                            <CheckCircle2 size={18} />
                            <span>Great! Your products are connected and synced successfully.</span>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-[#1e293b]/30 border border-white/10 space-y-4">
                        <h4 className="font-bold text-white flex items-center gap-2">
                            <AlertCircle size={18} className="text-indigo-400" />
                            Requirements
                        </h4>
                        <ul className="text-sm text-slate-400 space-y-3">
                            <li className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                Sheet shared as "Anyone with link can view"
                            </li>
                            <li className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                Column headers: Name, Price, Image, Description
                            </li>
                            <li className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                Max 500 products (Free plan)
                            </li>
                        </ul>
                        <a
                            href="https://docs.google.com/spreadsheets/create"
                            target="_blank"
                            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 pt-2"
                        >
                            Open Template Sheet
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
