import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, User } from 'lucide-react';

const LokMitra = ({ currentYearResult, scenario }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Namaste! I am LokMitra. I can help you analyze the One Nation One Election simulation data. What would you like to know?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const handleSend = async () => {
        if (!input.trim()) return;

        const userText = input;
        const newMessages = [...messages, { role: 'user', text: userText }];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        try {
            if (!GEMINI_API_KEY) {
                throw new Error("Missing Gemini API Key in .env.local");
            }

            // Prepare context
            const savings = currentYearResult ? (currentYearResult.cumulativeCostSavings / 1000).toFixed(1) : '0';
            const security = currentYearResult ? (currentYearResult.securityPeakDemand / 1000).toFixed(0) : '0';
            const year = currentYearResult?.year || '2029';
            const statesPolling = currentYearResult?.electionsScheduled?.length || 0;
            const govDays = currentYearResult?.totalGovernanceDaysGained || 0;

            const systemContext = `You are LokMitra, the official AI Data Analyst for the EKMAT (One Nation One Election) Simulator. Your tone is professional, insightful, and concise (max 3 sentences).

RULES FOR ANSWERING:
1. ALWAYS anchor your answers to the LIVE SIMULATION DATA below.
2. If asked about "cost" or "savings": Explain that negative savings (investment phase) are due to heavy initial CapEx on EVMs and Security pooling. Positive savings show long-term structural efficiency.
3. If asked about "governance" or "days": State that avoiding disjointed elections bypasses the Model Code of Conduct (MCC), leading to ${govDays} uninterrupted days of policy execution.
4. If asked about "security": Discuss how synchronizing requires a massive deployment of ${security}k CAPF/Police personnel.
5. NEVER sound generic. ALWAYS mention EKMAT context.

LIVE SIMULATION DATA FOR YEAR ${year}:
- States Polling this year: ${statesPolling}
- Cumulative Exchequer Savings: ₹${savings}k Crores
- Peak Security Demand: ${security}k personnel
- Cumulative Governance Days Gained: ${govDays} days`;

            // Format history for Gemini
            const conversationHistory = newMessages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
            const prompt = `System Instructions:\n${systemContext}\n\nChat History:\n${conversationHistory}\n\nLOKMITRA:`;

            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Gemini HTTP ${res.status}: ${errText}`);
            }

            const data = await res.json();
            const botResponse = data.candidates[0].content.parts[0].text.trim();

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);

        } catch (error) {
            console.error("LokMitra Error:", error);
            // Slice the error message so it fits within the UI
            const msg = error.message.substring(0, 80);
            setMessages(prev => [...prev, { role: 'bot', text: `Error: ${msg}` }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[200] font-sans">
            {/* Expanded Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200 origin-bottom-right">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 rounded-full">
                                <Bot size={18} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm leading-tight">LokMitra</h3>
                                <p className="text-[10px] text-indigo-100 opacity-80 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    Simulation Live
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="h-80 overflow-y-auto p-4 bg-slate-50 space-y-3"
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                                </div>
                                <div className={`max-w-[80%] text-xs p-3 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-2">
                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                    <Bot size={12} />
                                </div>
                                <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about savings, staff..."
                            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Minimized Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-600/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                    <MessageCircle size={28} />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </span>

                    {/* Tooltip */}
                    <span className="absolute right-16 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Chat with LokMitra
                    </span>
                </button>
            )}
        </div>
    );
};

export default LokMitra;
