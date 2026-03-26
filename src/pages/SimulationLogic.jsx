import React, { useEffect } from 'react';
import { Calculator, Users, Shield, TrendingUp, ArrowLeft, BookOpen, Database, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SimulationLogic({ onBack }) {
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Header */}
            <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-indigo-600"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Simulation Logic & Methodology</h1>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Resource Prediction Model v2.5</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">

                {/* Intro */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-lg text-slate-700 leading-relaxed">
                        Based on the comprehensive documentation and official data (ECI, Law Commission), this detailed breakdown categorizes every calculation required to estimate the budget, staff, and security for future elections.
                    </p>
                </div>

                {/* Module 1: Core Demographics */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Users size={24} /></div>
                        <h2 className="text-2xl font-bold text-slate-800">1. Core Demographic & Infrastructure Module</h2>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500 tracking-wider">
                                <tr>
                                    <th className="p-4 border-b border-slate-200">Variable</th>
                                    <th className="p-4 border-b border-slate-200">Prediction Logic / Formula</th>
                                    <th className="p-4 border-b border-slate-200">Notes / Constants</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                <tr>
                                    <td className="p-4 font-semibold text-indigo-600">Voters (Cr) ($V$)</td>
                                    <td className="p-4 font-mono bg-slate-50/50">V_prev * (1 + r)^t</td>
                                    <td className="p-4 text-slate-500">
                                        • r (Growth Rate) ≈ 2% (0.02) annually.<br />
                                        • For past extrapolation: reduce by 12% every 5 years.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold text-indigo-600">Polling Stations ($N_{PS}$)</td>
                                    <td className="p-4 font-mono bg-slate-50/50">
                                        Normal: Voters / 1100<br />
                                        Pre-2004: Voters / 900
                                    </td>
                                    <td className="p-4 text-slate-500">
                                        • Rule: 1 Polling Station per ~1,100 voters.<br />
                                        • Variation: Conflict zones often have lower density (800-900).
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold text-indigo-600">EVM Sets ($N_{EVM}$)</td>
                                    <td className="p-4 font-mono bg-slate-50/50">N_PS * 1.25</td>
                                    <td className="p-4 text-slate-500">
                                        • Allocation: 100% (Active) + 20% (Sector Reserve) + 5% (Training).
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Module 2: Human Resources */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><Users size={24} /></div>
                        <h2 className="text-2xl font-bold text-slate-800">2. Human Resource Module (Manpower)</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-lg mb-4 text-indigo-700">Civilian Staff Ratios</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="pb-4 border-b border-slate-100">
                                    <div className="font-bold text-slate-800">Class A/B Officers (Strategic)</div>
                                    <div className="font-mono text-xs text-slate-500 mt-1">N_PS / 100</div>
                                    <div className="text-slate-600 mt-1">~0.1% of Total Force (DEO, RO, Observers).</div>
                                </li>
                                <li className="pb-4 border-b border-slate-100">
                                    <div className="font-bold text-slate-800">Class C Staff (Operational)</div>
                                    <div className="font-mono text-xs text-slate-500 mt-1">N_PS * 4 (Standard)</div>
                                    <div className="text-slate-600 mt-1">1 Presiding + 3 Polling Officers per booth.</div>
                                </li>
                                <li>
                                    <div className="font-bold text-slate-800">Class D Support (Logistics)</div>
                                    <div className="font-mono text-xs text-slate-500 mt-1">N_PS * 2</div>
                                    <div className="text-slate-600 mt-1">Peons, helpers, runners.</div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-lg mb-4 text-red-600">Security Deployment</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="pb-4 border-b border-slate-100">
                                    <div className="font-bold text-slate-800">State Police (Local)</div>
                                    <div className="font-mono text-xs text-slate-500 mt-1">≈ 2 to 3 per N_PS</div>
                                    <div className="text-slate-600 mt-1">Manages crowd control and local law & order.</div>
                                </li>
                                <li>
                                    <div className="font-bold text-slate-800">CAPF Companies (Central)</div>
                                    <div className="font-mono text-xs text-slate-500 mt-1">Based on Sensitivity Index</div>
                                    <div className="text-slate-600 mt-1">
                                        • Peaceful: Low density (1 Coy / 150 PS)<br />
                                        • Critical: High density (1 Coy / 50 PS)
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Module 3: Financials */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><DollarSign size={24} /></div>
                        <h2 className="text-2xl font-bold text-slate-800">3. Financial Budget Module (The "Cost Engine")</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Admin Costs */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider mb-4 border-b border-slate-100 pb-2">A. Administrative & Civilian Costs (2024 Baseline)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div>
                                    <div className="font-bold text-indigo-600">Polling Infra</div>
                                    <div className="font-mono text-xs text-slate-400">₹20,000 per PS</div>
                                    <p className="text-slate-600 mt-1 text-xs">Tentage, furniture, ramps, electricity, webcasting.</p>
                                </div>
                                <div>
                                    <div className="font-bold text-indigo-600">Class C Staff</div>
                                    <div className="font-mono text-xs text-slate-400">₹15,000 per PS</div>
                                    <p className="text-slate-600 mt-1 text-xs">Full Party Honorarium + Training + Food.</p>
                                </div>
                                <div>
                                    <div className="font-bold text-indigo-600">Logistics</div>
                                    <div className="font-mono text-xs text-slate-400">₹5,000 per PS</div>
                                    <p className="text-slate-600 mt-1 text-xs">GPS Trucks, Fuel, Ink, Stationery, Seals.</p>
                                </div>
                            </div>
                        </div>

                        {/* Security Costs */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider mb-4 border-b border-slate-100 pb-2">B. Security Costs (High Variance)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <div className="font-bold text-red-600">CAPF Budget</div>
                                    <div className="font-mono text-xs text-slate-400">₹35 Lakhs per Company</div>
                                    <p className="text-slate-600 mt-1 text-xs">Reimbursement to Centre. Includes Deployment (25L) + Transport/Ration (10L).</p>
                                </div>
                                <div>
                                    <div className="font-bold text-red-600">State Police Budget</div>
                                    <div className="font-mono text-xs text-slate-400">₹3,500 per Head</div>
                                    <p className="text-slate-600 mt-1 text-xs">TA/DA Only (Salary is sunk cost). ₹500 DA x 7 Days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Module 4: Extrapolation */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><TrendingUp size={24} /></div>
                        <h2 className="text-2xl font-bold text-slate-800">4. Historical Extrapolation Logic</h2>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-slate-800 mb-2">Inflation Adjusters (Time-Travel)</h4>
                            <p className="text-slate-500 mb-4">Baseline: 2024 Costs</p>
                            <ul className="space-y-2 font-mono text-xs text-indigo-600">
                                <li>2029 (Forecast): Cost_24 * (1.055)^5</li>
                                <li>2014: Cost_24 * 0.55</li>
                                <li>2004: Cost_24 * 0.25</li>
                                <li>1990: Cost_24 * 0.08</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 mb-2">Security Escalation Index</h4>
                            <p className="text-slate-500 mb-4">Terror/Insurgency Factor impact on CAPF</p>
                            <ul className="space-y-2 text-slate-600">
                                <li><span className="font-bold">2020s:</span> 100% Baseline</li>
                                <li><span className="font-bold">2000s:</span> 50% Baseline (Lower para-mil usage)</li>
                                <li><span className="font-bold">1980s:</span> 10% Baseline (Reliant on State Police)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Master Formula */}
                <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                        <Calculator size={24} className="text-emerald-400" />
                        <h2 className="text-xl font-bold">5. Summary: The Master Formula</h2>
                    </div>
                    <div className="font-mono text-sm md:text-base leading-relaxed text-emerald-300 overflow-x-auto p-4 bg-slate-950 rounded-lg border border-slate-800">
                        Total_Budget = (N_PS × 20k) + (N_PS × 15k) + (N_Coys × 35L) + (N_Pol × 3.5k) + (N_PS × 5k)
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                        <span className="px-2 py-1 bg-slate-800 rounded">Infra</span>
                        <span className="px-2 py-1 bg-slate-800 rounded">Civilian Staff</span>
                        <span className="px-2 py-1 bg-slate-800 rounded">CAPF</span>
                        <span className="px-2 py-1 bg-slate-800 rounded">State Police</span>
                        <span className="px-2 py-1 bg-slate-800 rounded">Logistics</span>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                        <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-2">Cost Per Voter Efficiency</div>
                        <div className="text-2xl font-bold text-white">Total Budget ÷ Total Voters</div>
                    </div>
                </section>

            </main>
        </div>
    );
}
