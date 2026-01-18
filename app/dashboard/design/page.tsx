'use client';

import { useState } from 'react';
import { Palette, Check, Save } from 'lucide-react';

export default function DesignPage() {
    const [primaryColor, setPrimaryColor] = useState('#6366f1');
    const [accentColor, setAccentColor] = useState('#8b5cf6');
    const [isSaving, setIsSaving] = useState(false);

    const colors = [
        '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
        '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'
    ];

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Design & Branding</h2>
                    <p className="text-slate-400">Customize the look and feel of your storefront.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="btn btn-primary flex items-center gap-2"
                    disabled={isSaving}
                >
                    <Save size={18} />
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <div className="card p-8 bg-[#1e293b]/50 border-white/10 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Palette size={16} className="text-indigo-400" />
                                Primary Brand Color
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setPrimaryColor(color)}
                                        className="w-full aspect-square rounded-xl border-2 transition-all flex items-center justify-center"
                                        style={{
                                            backgroundColor: color,
                                            borderColor: primaryColor === color ? 'white' : 'transparent'
                                        }}
                                    >
                                        {primaryColor === color && <Check size={16} className="text-white" />}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <input
                                    type="color"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer bg-transparent"
                                />
                                <input
                                    type="text"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="input flex-1 font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-white/5">
                            <label className="text-sm font-medium text-slate-300">Accent Color</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    value={accentColor}
                                    onChange={(e) => setAccentColor(e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer bg-transparent"
                                />
                                <input
                                    type="text"
                                    value={accentColor}
                                    onChange={(e) => setAccentColor(e.target.value)}
                                    className="input flex-1 font-mono text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-slate-400 px-1">Live Preview</h4>
                    <div className="rounded-3xl border border-white/10 bg-[#0f172a] overflow-hidden shadow-2xl aspect-[9/16] max-w-[300px] mx-auto scale-90 origin-top">
                        <div className="h-full flex flex-col">
                            <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                <div className="w-8 h-8 rounded bg-slate-800" />
                                <div className="w-6 h-6 rounded-full bg-slate-800" />
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="w-full aspect-video rounded-2xl bg-slate-800" />
                                <div className="space-y-3">
                                    <div className="h-6 w-3/4 rounded bg-slate-800" style={{ backgroundColor: `${primaryColor}20` }} />
                                    <div className="h-4 w-1/2 rounded bg-slate-800" />
                                </div>
                                <div className="pt-8">
                                    <div
                                        className="w-full py-4 rounded-xl text-center text-white font-bold"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        Buy Now
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto p-6">
                                <div
                                    className="w-full py-3 rounded-lg text-center text-white/50 text-xs border border-dashed border-white/10"
                                    style={{ borderColor: accentColor }}
                                >
                                    Placeholder Section
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
