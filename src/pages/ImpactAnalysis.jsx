import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Scale, TrendingUp, Users, AlertTriangle, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { GdpGrowthChart, InflationChart, InvestmentChart, CrimeRateChart, FiscalDeficitChart } from '../components/ImpactCharts';
import DebaterPanel from '../components/DebaterPanel';

export default function ImpactAnalysis({ onBack }) {
    const [activeTab, setActiveTab] = useState('constitutional');

    const tabs = [
        { id: 'constitutional', label: 'Constitutional', icon: BookOpen },
        { id: 'governance', label: 'Governance', icon: Scale },
        { id: 'financial', label: 'Financial', icon: TrendingUp },
        { id: 'social', label: 'Social & Crime', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 leading-tight">Impact Analysis</h1>
                            <p className="text-xs text-slate-500 font-medium">Impact which can't be measured but will be visible</p>
                        </div>
                    </div>
                </div>
            </header>1

            <main className="max-w-7xl mx-auto px-6 py-8">

                <div className="mb-8">
                    <DebaterPanel />
                </div>

                {/* Navigation Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-200 shadow-sm
                                ${activeTab === tab.id
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md scale-105'
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                        >
                            <tab.icon size={20} />
                            <span className="font-bold text-sm md:text-base">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">

                    {/* Constitutional Impact */}
                    {activeTab === 'constitutional' && (
                        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-10 text-center">
                                <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
                                    <BookOpen className="text-indigo-600 w-8 h-8" />
                                    Constitutional Roadmap
                                </h2>
                                <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
                                    The Kovind Committee Report outlines a two-phase legal framework to transition India into a synchronized election cycle.
                                </p>
                            </div>

                            {/* Phase 1 & 2 Visual Flow */}
                            <div className="relative mb-12">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 hidden md:block" />

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Phase 1: The Trigger */}
                                    <div className="bg-white p-6 rounded-2xl border-2 border-indigo-100 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
                                        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Step 1: The Trigger</div>

                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-3 bg-indigo-50 rounded-xl">
                                                <Scale className="w-8 h-8 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">Article 82A</h3>
                                                <p className="text-sm font-semibold text-indigo-600">The "Appointed Date" Clause</p>
                                            </div>
                                        </div>

                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                            A new article empowering the President to notify a single date. All State Assemblies formed after this date will have their terms <strong>automatically cut short</strong> to end with the Lok Sabha.
                                        </p>

                                        <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 text-xs text-indigo-800 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                            Does NOT require State Ratification.
                                        </div>
                                    </div>

                                    {/* Phase 2: The Structure */}
                                    <div className="bg-white p-6 rounded-2xl border-2 border-emerald-100 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
                                        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Step 2: The Alignment</div>

                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-3 bg-emerald-50 rounded-xl">
                                                <Users className="w-8 h-8 text-emerald-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">Article 325</h3>
                                                <p className="text-sm font-semibold text-emerald-600">Single Electoral Roll</p>
                                            </div>
                                        </div>

                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                            Merges the three separate voter lists (Parliament, Assembly, Local Body) into one <strong>Common Electoral Roll</strong>. No more "missing names" in municipal polls.
                                        </p>

                                        <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                            <strong>Requires</strong> ratification by 50% of States.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* COMPREHENSIVE LEGAL DETAILS (New) */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-800 text-lg">Legal Deep Dive: Articles to be Amended</h3>
                                    <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-500 font-medium">As per HLC Report</span>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {/* Article 83 */}
                                    <div className="p-5 hover:bg-slate-50 transition-colors">
                                        <div className="flex gap-4">
                                            <div className="font-mono text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded h-fit whitespace-nowrap">Art 83 (2)</div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Duration of Houses of Parliament</h4>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    <strong>Current:</strong> Lok Sabha continues for 5 years from the date of its first meeting. <br />
                                                    <strong>Proposed Amendment:</strong> The term will be linked to the "unexpired term" concept if dissolved early, to ensure the cycle doesn't break.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Article 85 */}
                                    <div className="p-5 hover:bg-slate-50 transition-colors">
                                        <div className="flex gap-4">
                                            <div className="font-mono text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded h-fit whitespace-nowrap">Art 85 (2)(b)</div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Dissolution of Parliament</h4>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    <strong>Details:</strong> Empowers the President to dissolve the Lok Sabha. The amendment ensures that such dissolution aligns with the synchronization framework.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Article 172 */}
                                    <div className="p-5 hover:bg-slate-50 transition-colors">
                                        <div className="flex gap-4">
                                            <div className="font-mono text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded h-fit whitespace-nowrap">Art 172 (1)</div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Duration of State Legislatures</h4>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    <strong>Crucial Amendment:</strong> Currently guarantees a 5-year term. The amendment introduces a clause: <em>"notwithstanding anything in this article,"</em> the term of a State Assembly will expire along with the Lok Sabha, effectively legally curtailing the 5-year promise.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Article 174 */}
                                    <div className="p-5 hover:bg-slate-50 transition-colors">
                                        <div className="flex gap-4">
                                            <div className="font-mono text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded h-fit whitespace-nowrap">Art 174 (2)(b)</div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Dissolution of State Legislatures</h4>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    <strong>Details:</strong> Similar to Art 85, this empowers the Governor to dissolve the Legislative Assembly. The amendment safeguards this power while ensuring it doesn't disrupt the synchronized cycle (i.e., dissolution leads to fresh elections only for the <em>remainder</em> of the period).
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Article 356 */}
                                    <div className="p-5 hover:bg-slate-50 transition-colors">
                                        <div className="flex gap-4">
                                            <div className="font-mono text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded h-fit whitespace-nowrap">Art 356</div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">President's Rule</h4>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    <strong>Impact:</strong> If constitutional machinery fails in a state, President's Rule is imposed. The amendment clarifies the operational mechanism of this rule within the ONOE framework, specifically how the "unexpired term" logic applies once the rule is revoked.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Deep Dive & Risks Section */}
                            <div className="grid lg:grid-cols-12 gap-8">

                                {/* Visual Explainer: Unexpired Term */}
                                <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                        The "Unexpired Term" Concept
                                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-wide">Crucial Change</span>
                                    </h3>

                                    <div className="mb-8">
                                        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                                            <span>Start of Term (Year 0)</span>
                                            <span>Full Term (Year 5)</span>
                                        </div>

                                        {/* Scenario A: Normal */}
                                        <div className="mb-6 relative">
                                            <div className="w-full h-8 bg-slate-200 rounded-full overflow-hidden flex">
                                                <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">
                                                    Current System: Govt lasts full 5 Years (even if elected mid-term)
                                                </div>
                                            </div>
                                        </div>

                                        {/* Scenario B: ONOE */}
                                        <div className="relative">
                                            <div className="absolute left-[40%] text-center -top-8 hidden md:block">
                                                <div className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-200 shadow-sm">
                                                    Govt Falls Here (Year 2)
                                                </div>
                                                <div className="h-4 w-px bg-red-400 mx-auto" />
                                            </div>

                                            <div className="w-full h-8 bg-slate-200 rounded-full overflow-hidden flex relative">
                                                <div className="w-[40%] h-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold border-r-2 border-white">
                                                    1st Govt
                                                </div>
                                                <div className="w-[60%] h-full bg-amber-400 flex items-center justify-center text-[10px] text-amber-900 font-bold">
                                                    Mid-Term Election (Only for remaining 3 years)
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2 italic">
                                                Under ONOE (Art 83/172), a mid-term election is only for the <strong>"remainder"</strong> of the term, preventing a cycle reset.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Risk Factors */}
                                <div className="lg:col-span-5 space-y-4">
                                    <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">!</div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-red-900 text-sm">Challenge: Federal Structure</h4>
                                                <p className="text-xs text-red-800/80 leading-relaxed mt-1">
                                                    Art 82A essentially allows the Center to unilaterally shorten a State's tenure to force alignment. Legal scholars argue this might violate the "Basic Structure" of the Constitution regarding Federalism.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">?</div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-amber-900 text-sm">Challenge: No-Confidence Motion</h4>
                                                <p className="text-xs text-amber-800/80 leading-relaxed mt-1">
                                                    If a government loses a No-Confidence motion, the opposition often creates a new coalition. Under ONOE, if no coalition forms, the <strong>"remainder term"</strong> rule might incentivize frequent elections instead of stability.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Governance Impact */}
                    {activeTab === 'governance' && (
                        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                        <Scale className="text-indigo-600" />
                                        Administrative Efficiency & Resource Optimization
                                    </h2>
                                    <p className="text-slate-600 mt-2 max-w-3xl">
                                        Frequent elections result in the suspension of development work (MMC) and massive recurring expenditures. ONOE aims to solve this "permanent campaign" mode.
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Left Column: MCC & Time */}
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <div className="p-1.5 bg-indigo-100 rounded text-indigo-600"><Clock size={16} /></div>
                                        The "Stop-Start" Governance Problem
                                    </h3>

                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                                        <div className="mb-6">
                                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                                                <span>Current System (5 Year Cycle)</span>
                                                <span className="text-red-500">~800 Days Lost to MCC</span>
                                            </div>
                                            {/* Visual Timeline Current */}
                                            <div className="h-4 bg-slate-100 rounded-full w-full flex overflow-hidden">
                                                {[...Array(10)].map((_, i) => (
                                                    <div key={i} className={`h-full flex-1 ${i % 2 === 0 ? 'bg-red-400' : 'bg-green-300'} border-r border-white/20`} title={i % 2 === 0 ? "MCC In Effect" : "Development Work"} />
                                                ))}
                                            </div>
                                            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                                <span>Year 1</span>
                                                <span>Year 5</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                                                <span>ONOE Scenario</span>
                                                <span className="text-emerald-600">Only ~90 Days Lost</span>
                                            </div>
                                            {/* Visual Timeline ONOE */}
                                            <div className="h-4 bg-slate-100 rounded-full w-full flex overflow-hidden">
                                                <div className="h-full bg-green-500 w-[95%]"></div>
                                                <div className="h-full bg-red-400 w-[5%]"></div>
                                            </div>
                                            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                                <span>Year 1</span>
                                                <span>Year 5 (Elections)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                                        <h4 className="font-bold text-indigo-900 text-sm mb-2">Impact on Public Services</h4>
                                        <ul className="space-y-2 text-sm text-indigo-800">
                                            <li className="flex gap-2">
                                                <span>school</span>
                                                <span><strong>Teachers:</strong> Millions of teaching hours saved by reducing poll duty deployment.</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span>shield</span>
                                                <span><strong>Security:</strong> Paramilitary forces (CAPF) can focus on border security instead of constant election movement.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Right Column: Money & Cost */}
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <div className="p-1.5 bg-emerald-100 rounded text-emerald-600"><TrendingUp size={16} /></div>
                                        Financial Implications
                                    </h3>

                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                                        <h4 className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Estimated Election Expenditure</h4>

                                        <div className="space-y-6">
                                            {/* Current */}
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-bold text-slate-700">Separate Elections</span>
                                                    <span className="font-bold text-slate-900">₹1,20,000 Cr+</span>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-10 relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 h-full w-full bg-slate-200" />
                                                    <div className="absolute top-0 right-0 h-full w-[20%] bg-red-400/20 pattern-diagonal-lines" /> {/* Symbolic 'Waste' */}
                                                </div>
                                                <p className="text-[10px] text-slate-500 mt-1 text-right">Includes Govt + Political Party Spend (Est. 2024)</p>
                                            </div>

                                            {/* ONOE */}
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-bold text-slate-700">Simultaneous (ONOE)</span>
                                                    <span className="font-bold text-emerald-600">~₹40,000 Cr</span>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-10 relative overflow-hidden flex items-center">
                                                    <div className="h-full w-[33%] bg-emerald-500" />
                                                    <span className="ml-3 text-xs font-bold text-emerald-700">Massive Savings</span>
                                                </div>
                                                <p className="text-[10px] text-slate-500 mt-1 text-right">Unified logistics & voter rolls reduce duplication.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white border border-slate-200 p-4 rounded-xl text-center">
                                            <div className="text-3xl font-bold text-indigo-600 mb-1">210</div>
                                            <div className="text-xs text-slate-500 font-medium">Man-days Saved (Projected Million)</div>
                                        </div>
                                        <div className="bg-white border border-slate-200 p-4 rounded-xl text-center">
                                            <div className="text-3xl font-bold text-emerald-600 mb-1">1.5%</div>
                                            <div className="text-xs text-slate-500 font-medium">GDP Boost (NITI Aayog Est.)</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {/* Financial Impact */}
                    {activeTab === 'financial' && (
                        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    <TrendingUp className="text-indigo-600" />
                                    Macro-Economic Impact
                                </h2>
                                <p className="text-slate-600 mt-2 max-w-3xl">
                                    Data analyzed from 1960-2023 shows that simultaneous elections are correlated with higher economic growth, lower inflation, and better fiscal discipline compared to the current continuous election cycle.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                {/* GDP Card */}
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-800">GDP Growth Stability</h3>
                                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Positive Trend</span>
                                    </div>
                                    <div className="p-4 bg-white flex-grow">
                                        <GdpGrowthChart />

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="bg-red-50 p-3 rounded border border-red-100">
                                                <p className="text-[10px] font-bold text-red-800 uppercase mb-1">Current System</p>
                                                <p className="text-xs md:text-sm text-red-900 leading-relaxed">
                                                    <strong>"Stop-Start Growth."</strong> Frequent elections cause policy paralysis. Short-term populist measures often disrupt long-term economic planning.
                                                </p>
                                            </div>
                                            <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                                                <p className="text-[10px] font-bold text-emerald-800 uppercase mb-1">With ONOE</p>
                                                <p className="text-xs md:text-sm text-emerald-900 leading-relaxed">
                                                    <strong>"Steady Progress."</strong> 5 years of uninterrupted governance allows for consistent policy implementation, leading to smoother and higher average growth.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Inflation Card */}
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-800">Inflation Control (CPI)</h3>
                                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Lower Volatility</span>
                                    </div>
                                    <div className="p-4 bg-white flex-grow">
                                        <InflationChart />

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="bg-red-50 p-3 rounded border border-red-100">
                                                <p className="text-[10px] font-bold text-red-800 uppercase mb-1">Current System</p>
                                                <p className="text-xs md:text-sm text-red-900 leading-relaxed">
                                                    <strong>"Price Spikes."</strong> Political parties often increase spending before elections to win votes, which floods the market with cash and drives up prices.
                                                </p>
                                            </div>
                                            <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                                                <p className="text-[10px] font-bold text-emerald-800 uppercase mb-1">With ONOE</p>
                                                <p className="text-xs md:text-sm text-emerald-900 leading-relaxed">
                                                    <strong>"Stable Prices."</strong> With elections only once every 5 years, this "populist spending cycle" is broken, keeping inflation under better control.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Investment Card */}
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-800">Private Investment</h3>
                                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Higher Confidence</span>
                                    </div>
                                    <div className="p-4 bg-white flex-grow">
                                        <InvestmentChart />

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="bg-red-50 p-3 rounded border border-red-100">
                                                <p className="text-[10px] font-bold text-red-800 uppercase mb-1">Current System</p>
                                                <p className="text-xs md:text-sm text-red-900 leading-relaxed">
                                                    <strong>"Wait and Watch."</strong> Businesses delay investments before every state election due to uncertainty about policy changes.
                                                </p>
                                            </div>
                                            <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                                                <p className="text-[10px] font-bold text-emerald-800 uppercase mb-1">With ONOE</p>
                                                <p className="text-xs md:text-sm text-emerald-900 leading-relaxed">
                                                    <strong>"Invest with Certainty."</strong> A clear 5-year horizon gives businesses confidence to invest long-term, boosting job creation.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Fiscal Deficit Card */}
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-800">Fiscal Deficit</h3>
                                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Better Discipline</span>
                                    </div>
                                    <div className="p-4 bg-white flex-grow">
                                        <FiscalDeficitChart />

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="bg-red-50 p-3 rounded border border-red-100">
                                                <p className="text-[10px] font-bold text-red-800 uppercase mb-1">Current System</p>
                                                <p className="text-xs md:text-sm text-red-900 leading-relaxed">
                                                    <strong>"Budget Overshoots."</strong> Governments often borrow excessively to fund pre-election schemes, increasing the national debt burden.
                                                </p>
                                            </div>
                                            <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                                                <p className="text-[10px] font-bold text-emerald-800 uppercase mb-1">With ONOE</p>
                                                <p className="text-xs md:text-sm text-emerald-900 leading-relaxed">
                                                    <strong>"Fiscal Balance."</strong> A natural cycle enforces discipline. Governments can plan budgets for 5 years without pressure.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Social/Crime Impact */}
                    {activeTab === 'social' && (
                        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    <Users className="text-indigo-600" />
                                    Social Cohesion & Public Order
                                </h2>
                                <p className="text-slate-600 mt-2 max-w-3xl">
                                    Beyond economics, the continuous election cycle imposes a heavy cost on social harmony and law and order.
                                </p>
                            </div>

                            <div className="max-w-4xl">
                                {/* Crime Card */}
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mb-8">
                                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-800">Impact on Crime Rates</h3>
                                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Safer Communities</span>
                                    </div>
                                    <div className="p-4 bg-white flex-grow">
                                        <CrimeRateChart />

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                    <p className="text-xs font-bold text-red-800 uppercase">Non-Simultaneous (Current)</p>
                                                </div>
                                                <h4 className="font-bold text-red-900 mb-1">Police Diverted to Poll Duty</h4>
                                                <p className="text-sm text-red-800/80 leading-relaxed">
                                                    During every election, thousands of police personnel are moved from regular duty to election security. This leaves neighborhoods vulnerable, leading to documented <strong>spikes in crime (theft, riots, etc.)</strong> during election seasons.
                                                </p>
                                            </div>
                                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                    <p className="text-xs font-bold text-emerald-800 uppercase">Simultaneous (ONOE)</p>
                                                </div>
                                                <h4 className="font-bold text-emerald-900 mb-1">Consistent Policing</h4>
                                                <p className="text-sm text-emerald-800/80 leading-relaxed">
                                                    With elections happening only once every 5 years, police forces remain at their stations for 54-58 months. This consistent presence acts as a deterrent, resulting in <strong>lower overall crime rates</strong> and safer communities.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-4">The "Campaign Mode" Effect</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded shadow-sm border border-slate-100">
                                            <div className="text-red-500 font-bold text-sm mb-1">Constant Polarization</div>
                                            <p className="text-xs text-slate-600">
                                                When parties are always campaigning, political rhetoric often becomes divisive to consolidate vote banks. This keeps society in a constant state of agitation.
                                            </p>
                                        </div>
                                        <div className="bg-white p-4 rounded shadow-sm border border-slate-100">
                                            <div className="text-emerald-600 font-bold text-sm mb-1">Focus on Performance</div>
                                            <p className="text-xs text-slate-600">
                                                ONOE forces parties to focus on governance performance for 4.5 years. Divisive campaigning is limited to the short election window.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                </div>
                <div className="mt-12 text-center border-t border-slate-200 pt-8 pb-4">
                    <p className="text-sm text-slate-500 mb-2">
                        <strong>Source of Information:</strong> Report of the High Level Committee on One Nation One Election (Kovind Committee).
                    </p>
                    <a
                        href="https://onoe.gov.in/HLC-Report-en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium hover:underline"
                    >
                        View Official Report (onoe.gov.in)
                    </a>
                </div>
            </main>
        </div>
    );
}
