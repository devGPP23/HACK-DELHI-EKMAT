import React, { useState } from 'react';
import { CheckCircle, AlertOctagon, TrendingDown, DollarSign, Activity, MessageSquare } from 'lucide-react';
import axios from 'axios';

const ResultsView = ({ results, loading }) => {

    // AI Chat State
    const [question, setQuestion] = useState("");
    const [aiAnswer, setAiAnswer] = useState("");
    const [aiLoading, setAiLoading] = useState(false);

    const askAi = () => {
        if (!question.trim()) return;
        setAiLoading(true);
        axios.post('http://localhost:5000/api/ask-ai', {
            prompt: question,
            context: results
        })
            .then(res => {
                setAiAnswer(res.data.answer);
                setAiLoading(false);
            })
            .catch(err => {
                setAiAnswer("Error reaching AI service.");
                setAiLoading(false);
            });
    };

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-md border border-gray-200 animate-pulse">
                <Activity className="animate-spin text-eci-blue mb-4" size={48} />
                <p className="text-gray-500">Running Complex Simulation Models...</p>
                <p className="text-xs text-gray-400">Processing Logistics & constitutional engines</p>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-md border border-gray-200">
                <p className="text-gray-400 text-center">Run a simulation to see the impact analysis.</p>
            </div>
        );
    }

    const { logistics, financial, constitutional } = results;

    return (
        <div className="flex flex-col gap-6 h-full font-inter">

            {/* 1. Logistics Result */}
            <div className={`p-4 rounded-xl border-l-8 shadow-sm ${logistics.success ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <h3 className={`font-bold text-lg flex items-center gap-2 ${logistics.success ? 'text-green-700' : 'text-red-700'}`}>
                    {logistics.success ? <CheckCircle /> : <AlertOctagon />}
                    {logistics.success ? "Logistically Feasible" : "Security Deficit Alert"}
                </h3>
                <p className="text-sm mt-2 text-gray-700">
                    {logistics.success
                        ? `Deployment successful with ${logistics.available} companies.`
                        : `CRITICAL FAILURE: Demand (${logistics.total_demand}) exceeds Supply (${logistics.available}).`
                    }
                </p>
                {!logistics.success && (
                    <div className="mt-3 bg-white p-2 rounded text-xs text-red-600 border border-red-100 max-h-32 overflow-y-auto">
                        {logistics.details.map((d, i) => <div key={i}>{d}</div>)}
                    </div>
                )}
            </div>

            {/* 2. Financial Impact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-100 font-semibold text-gray-700 flex items-center gap-2">
                    <DollarSign size={18} /> Financial Projection (5 Years)
                </div>
                <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Status Quo OpEx</p>
                        <p className="text-lg font-bold">₹{financial.opex_5y_status_quo.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">ONOE OpEx</p>
                        <p className="text-lg font-bold text-green-600">₹{financial.opex_5y_onoe.toLocaleString()}</p>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-gray-100">
                        <p className="text-gray-500">One-Time CAPEX (EVMs)</p>
                        <p className="text-lg font-bold text-red-600">₹{financial.capex_initial_onoe.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-1">Break-even: {financial.break_even_point}</p>
                    </div>
                </div>
            </div>

            {/* 3. Constitutional Frequency */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-100 font-semibold text-gray-700 flex items-center gap-2">
                    <TrendingDown size={18} /> Election Frequency (20 Years)
                </div>
                <div className="p-4 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-100 p-2 rounded">
                        <p className="text-xs text-gray-500 uppercase">Status Quo</p>
                        <p className="text-2xl font-bold text-gray-800">{constitutional.total_elections_status_quo}</p>
                        <p className="text-xs text-gray-400">Total Elections</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded border border-blue-100">
                        <p className="text-xs text-blue-500 uppercase">ONOE Model</p>
                        <p className="text-2xl font-bold text-blue-800">{constitutional.total_elections_onoe}</p>
                        <p className="text-xs text-blue-400">Total Elections</p>
                    </div>
                </div>
            </div>

            {/* 4. AI Insight */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-sm border border-indigo-100 p-4">
                <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                    <MessageSquare size={16} /> AI Policy Analyst
                </h4>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask about these results..."
                        className="flex-1 text-sm p-2 rounded border border-indigo-200 focus:outline-none focus:border-indigo-500"
                        onKeyPress={(e) => e.key === 'Enter' && askAi()}
                    />
                    <button
                        onClick={askAi}
                        disabled={aiLoading}
                        className="bg-indigo-600 text-white text-xs px-3 rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {aiLoading ? '...' : 'Ask'}
                    </button>
                </div>
                {aiAnswer && (
                    <div className="mt-3 text-sm text-gray-700 bg-white/80 p-2 rounded border border-indigo-100 italic">
                        "{aiAnswer}"
                    </div>
                )}
            </div>



            {/* 5. Live Simulation Logs (New Impact Feature) */}
            <div className="bg-black text-green-400 p-4 rounded-xl shadow-lg border border-gray-800 font-mono text-xs overflow-hidden flex flex-col h-64">
                <h4 className="text-gray-500 mb-2 border-b border-gray-700 pb-1 flex justify-between">
                    <span>// MISSION_LOGS</span>
                    <span>BREACHES: {logistics.breach_count || 0}</span>
                </h4>
                <div className="overflow-y-auto flex-1 space-y-1 scrollbar-hide">
                    {logistics.details && logistics.details.map((log, i) => (
                        <div key={i} className={`${log.includes("CRITICAL") ? "text-red-500 font-bold" : "opacity-80"}`}>
                            {log}
                        </div>
                    ))}
                    {(!logistics.details || logistics.details.length === 0) && (
                        <span className="text-gray-600">Waiting for simulation data...</span>
                    )}
                </div>
            </div>

        </div >
    );
};

export default ResultsView;
