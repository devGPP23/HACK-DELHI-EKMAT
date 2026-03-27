import React, { useState } from 'react';
import { ShieldQuestion, PlaySquare, Mic2 } from 'lucide-react';
import DebateModal from './DebateModal';

export default function DebaterPanel() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="mt-2 border border-rose-200 bg-rose-50/50 p-6 rounded-xl shadow-sm backdrop-blur-sm relative overflow-hidden group flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer hover:bg-rose-100/50 transition duration-300" onClick={() => setIsModalOpen(true)}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl translate-y-10 -translate-x-10 pointer-events-none"></div>

                <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
                    <div className="bg-rose-100 p-3 rounded-lg text-rose-600 relative">
                        <ShieldQuestion size={28} />
                        <div className="absolute -bottom-1 -right-1 bg-indigo-100 p-1 rounded font-black text-indigo-600 shadow-sm border border-indigo-200"><Mic2 size={12} /></div>
                    </div>
                    <div>
                        <h4 className="text-base font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            Multi-Agent Voice Debate
                        </h4>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">Speak a topic & hear the AI models argue</p>
                    </div>
                </div>

                <button
                    className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto rounded-full text-xs uppercase tracking-wider font-black transition-all shadow-md border bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700 hover:scale-105 active:scale-95 whitespace-nowrap relative z-10"
                >
                    <PlaySquare size={16} /> Launch Interactive Debate
                </button>
            </div>

            {isModalOpen && <DebateModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
