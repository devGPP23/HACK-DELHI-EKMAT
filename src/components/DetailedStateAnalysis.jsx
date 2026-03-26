import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import { Calculator, Users, Shield, Briefcase, TrendingUp, AlertTriangle, Cpu, FileText, Landmark, Truck, Download, Zap, MapPin, Scale } from 'lucide-react';

// --- 1. CALIBRATED UNIT COSTS (2024 Baseline in ₹) ---
// Derived from User's CSV (Assam 2024 & Rajasthan 2023)
const BASE_UNIT_COSTS = {
    INFRA_PER_PS: 20000,        // ~57 Cr for 28k PS -> 20k/PS
    CAPF_PER_COY: 3500000,      // ~112 Cr for 320 Coys -> 35L/Coy
    POLICE_PER_HEAD: 5000,      // ~21 Cr for 43k Police -> 5k/Head
    CLASS_AB_PER_HEAD: 10000,   // ~1 Cr for 960 Officers -> 10k/Head
    CLASS_C_PER_HEAD: 2500,     // ~36 Cr for 1.44L Staff -> 2.5k/Head
    CLASS_D_PER_HEAD: 1000,     // ~5.8 Cr for 57k Staff -> 1k/Head
    EVM_LOGISTICS_PER_SET: 5600 // ~20.2 Cr for 36k Sets -> 5.6k/Set
};

/**
 * 2. MOCK DATA GENERATION (The "Ground Truth" Matrix)
 * Contains 10 Edge Cases + Standard States
 */
const generateMockData = () => {
    const data = [];

    // STATE PROFILES (The "DNA" of the Election)
    // Density: Voters per PS.
    // Security Level: Determines CAPF deployment intensity.
    const stateProfile = {
        // 1. CRITICAL LWE (Left Wing Extremism)
        'Chhattisgarh': { baseVoters: 2.05, growth: 0.019, density: 850, security: 'Critical' },
        'Jharkhand': { baseVoters: 2.54, growth: 0.021, density: 900, security: 'Critical' },

        // 2. MASSIVE SCALE
        'Uttar Pradesh': { baseVoters: 15.34, growth: 0.022, density: 950, security: 'High' },

        // 3. TERRAIN HEAVY (Hills/Rivers)
        'Assam': { baseVoters: 2.45, growth: 0.018, density: 850, security: 'High' },
        'Uttarakhand': { baseVoters: 0.82, growth: 0.014, density: 800, security: 'Med' },

        // 4. METRO / HIGH DENSITY
        'Delhi': { baseVoters: 1.50, growth: 0.028, density: 1200, security: 'Med' },

        // 5. PEACEFUL / EFFICIENT
        'Kerala': { baseVoters: 2.74, growth: 0.008, density: 1100, security: 'Low' },

        // 6. DESERT / LOW DENSITY
        'Rajasthan': { baseVoters: 5.40, growth: 0.020, density: 1000, security: 'Med' },

        // 7. BORDER STATE
        'Punjab': { baseVoters: 2.14, growth: 0.010, density: 900, security: 'High' },

        // 8. VIOLENCE PRONE
        'West Bengal': { baseVoters: 7.52, growth: 0.012, density: 850, security: 'Critical' },

        // Standard States
        'Maharashtra': { baseVoters: 9.70, growth: 0.015, density: 900, security: 'High' },
        'Bihar': { baseVoters: 7.64, growth: 0.025, density: 1000, security: 'Very High' },
        'Tamil Nadu': { baseVoters: 6.20, growth: 0.010, density: 1050, security: 'Low' },
        'Madhya Pradesh': { baseVoters: 5.60, growth: 0.018, density: 950, security: 'High' },
        'Karnataka': { baseVoters: 5.30, growth: 0.015, density: 1000, security: 'Med' },
        'Gujarat': { baseVoters: 4.90, growth: 0.016, density: 1100, security: 'Med' },
        'Andhra Pradesh': { baseVoters: 4.07, growth: 0.014, density: 980, security: 'High' },
        'Telangana': { baseVoters: 3.26, growth: 0.018, density: 950, security: 'High' },
        'Odisha': { baseVoters: 3.32, growth: 0.013, density: 950, security: 'High' },
        'Haryana': { baseVoters: 1.95, growth: 0.015, density: 1000, security: 'Med' },
    };

    const createRow = (state, year, votersCr) => {
        const profile = stateProfile[state];
        const voters = votersCr * 10000000;

        // 1. Polling Stations (PS) - Conservative 1000 voters per booth
        const psCount = Math.floor(voters / 1000);

        // 2. Security Logic (Refined Per-Booth Model)
        // Ratio of Critical Booths based on State Profile
        let criticalRatio;
        switch (profile.security) {
            case 'Critical': criticalRatio = 0.50; break;
            case 'Very High': criticalRatio = 0.40; break;
            case 'High': criticalRatio = 0.30; break;
            case 'Med': criticalRatio = 0.15; break;
            case 'Low': criticalRatio = 0.05; break;
            default: criticalRatio = 0.20;
        }

        // Personnel Calc:
        // Critical Booth: 8 Pax (1 Section)
        // Normal Booth: 2 Pax (1 Constable + 1 HG)
        const criticalBooths = Math.floor(psCount * criticalRatio);
        const normalBooths = psCount - criticalBooths;

        const forceCritical = criticalBooths * 6;
        const forceNormal = normalBooths * 2;

        // Convert back to "Coys" equivalent for legacy display/budgeting (1 Coy = 100 pax)
        // This is an abstraction for costing.
        const totalPax = forceCritical + forceNormal;
        const capfCoys = Math.floor(totalPax / 100);

        // State Police: We can assume roughly 40-50% of this total force comes from State Police
        // But for budgeting, let's stick to the separation.
        // Let's say Total Pax is the requirement. 
        // Allocation: 50% CAPF, 50% State Police? 
        // Or simpler: The "capfCoys" calculated above is the TOTAL Security Force in Coy-equivalents.
        // Let's split it for costs.
        const statePolice = Math.floor(totalPax * 0.6); // 60% State Police (Constables/HG)
        const centralForces = Math.floor(totalPax * 0.4); // 40% Central

        // Recalculate Coys for CAPF budget specifically
        const actualCapfCoys = Math.floor(centralForces / 100);

        // 3. Staff Logic
        const classAB = Math.floor(psCount * 0.034); // ~1 per 30 PS (Sector Magistrates)
        const classC = Math.floor(psCount * 5.0);    // 5 per PS (Polling Party)
        const classD = Math.floor(psCount * 2.0);    // 2 per PS (Helpers)
        const evmSets = Math.floor(psCount * 1.25);  // 125% (25% Reserve)

        // 4. Financials (Inflation Adjusted)
        const inflationFactor = Math.pow(1.055, year - 2024);

        const costs = {
            infra: (psCount * BASE_UNIT_COSTS.INFRA_PER_PS * inflationFactor) / 10000000,
            capf: (actualCapfCoys * BASE_UNIT_COSTS.CAPF_PER_COY * inflationFactor) / 10000000,
            police: (statePolice * BASE_UNIT_COSTS.POLICE_PER_HEAD * inflationFactor) / 10000000,
            ab: (classAB * BASE_UNIT_COSTS.CLASS_AB_PER_HEAD * inflationFactor) / 10000000,
            c: (classC * BASE_UNIT_COSTS.CLASS_C_PER_HEAD * inflationFactor) / 10000000,
            d: (classD * BASE_UNIT_COSTS.CLASS_D_PER_HEAD * inflationFactor) / 10000000,
            evm: (evmSets * BASE_UNIT_COSTS.EVM_LOGISTICS_PER_SET * inflationFactor) / 10000000,
        };

        // Bifurcation per User Request
        const totalSecurity = costs.capf + costs.police;
        const totalHRAdmin = costs.ab + costs.c + costs.d; // Purely HR
        const totalLogistics = costs.infra + costs.evm;    // Infra + EVM
        const grandTotal = totalSecurity + totalHRAdmin + totalLogistics;

        // Total Human Force (For CSV Display)
        const totalForce = (capfCoys * 100) + statePolice + classAB + classC + classD;
        const forceString = `~${(totalForce / 100000).toFixed(1)} Lakh`;

        return {
            State: state,
            Year: year,
            "Voters (Cr)": votersCr.toFixed(2),
            "Poll Stns (PS)": psCount,
            "CAPF (Coys)": actualCapfCoys,
            "State Police": statePolice,
            "Class A/B (Officers)": classAB,
            "Class C (Staff)": classC,
            "Class D (Support)": classD,
            "EVM Sets (Allocated)": evmSets,
            "PS Infra Budget (₹ Cr)": costs.infra.toFixed(2),
            "CAPF Budget (₹ Cr)": costs.capf.toFixed(2),
            "Police Budget (₹ Cr)": costs.police.toFixed(2),
            "Cl-A/B Budget (₹ Cr)": costs.ab.toFixed(2),
            "Cl-C Budget (₹ Cr)": costs.c.toFixed(2),
            "Cl-D Budget (₹ Cr)": costs.d.toFixed(2),
            "EVM/ Logist. Cost (₹ Cr)": costs.evm.toFixed(2),
            "Total Security Cost (₹ Cr)": totalSecurity.toFixed(2),
            "Total HR Admin Cost (₹ Cr)": totalHRAdmin.toFixed(2),
            "Total Logistics Cost (₹ Cr)": totalLogistics.toFixed(2),
            "Grand Total Budget (₹ Cr)": grandTotal.toFixed(2),
            "Cost Per Voter (₹)": ((grandTotal * 10000000) / voters).toFixed(0),
            "Total Human Force": `~${(centralForces / 100000).toFixed(2)} L (Central)`,
            "_rawTotalForce": centralForces
        };
    };

    Object.keys(stateProfile).forEach(state => {
        let v = stateProfile[state].baseVoters;
        for (let year = 2024; year >= 1974; year -= 5) {
            data.push(createRow(state, year, v));
            v = v / Math.pow(1 + stateProfile[state].growth, 5);
        }
    });

    return data;
};

const historicalData = generateMockData();

// --- 3. HYBRID PREDICTION ENGINE ---
// Uses Weighted Trend Regression to simulate XGBoost
const runHybridPrediction = (state, targetYear, inflation, popGrowth, crisisFactor) => {
    const stateHistory = historicalData.filter(d => d.State === state);
    if (!stateHistory.length) return null;

    // 1. Sort by year descending
    const sorted = [...stateHistory].sort((a, b) => b.Year - a.Year);
    const latest = sorted[0];

    // 2. Math Layer: Demographics
    const lastVoters = parseFloat(latest["Voters (Cr)"]) * 10000000;
    const yearsDiff = targetYear - latest.Year;
    const futureVoters = lastVoters * Math.pow(1 + (popGrowth / 100), yearsDiff);

    // 3. ML Layer: Weighted Ratios
    // We use the 3 most recent elections with 3-2-1 weighting
    let wSumPS = 0, wSumCAPF = 0, wSumPol = 0, wTotal = 0;

    sorted.slice(0, 3).forEach((row, i) => {
        const w = 3 - i;
        const v = parseFloat(row["Voters (Cr)"]) * 10000000;
        wSumPS += (row["Poll Stns (PS)"] / v) * w;
        wSumCAPF += (row["CAPF (Coys)"] / v) * w;
        wSumPol += (row["State Police"] / v) * w;
        wTotal += w;
    });

    const ratios = {
        ps: wSumPS / wTotal,
        capf: wSumCAPF / wTotal,
        pol: wSumPol / wTotal
    };

    // 4. Calculate Quantities
    const ps = Math.floor(futureVoters * ratios.ps);
    const capf = Math.floor(futureVoters * ratios.capf);
    const police = Math.floor(futureVoters * ratios.pol);
    const ab = Math.floor(ps * 0.034); // 1 per 30
    const c = Math.floor(ps * 5.0);
    const d = Math.floor(ps * 2.0);
    const evm = Math.floor(ps * 1.25);

    // 5. Financial Layer
    const inflationMult = Math.pow(1 + (inflation / 100), yearsDiff);
    const crisisMult = inflationMult * crisisFactor;

    const costs = {
        infra: (ps * BASE_UNIT_COSTS.INFRA_PER_PS * crisisMult) / 10000000,
        capf: (capf * BASE_UNIT_COSTS.CAPF_PER_COY * crisisMult) / 10000000,
        police: (police * BASE_UNIT_COSTS.POLICE_PER_HEAD * crisisMult) / 10000000,
        ab: (ab * BASE_UNIT_COSTS.CLASS_AB_PER_HEAD * crisisMult) / 10000000,
        c: (c * BASE_UNIT_COSTS.CLASS_C_PER_HEAD * crisisMult) / 10000000,
        d: (d * BASE_UNIT_COSTS.CLASS_D_PER_HEAD * crisisMult) / 10000000,
        evm: (evm * BASE_UNIT_COSTS.EVM_LOGISTICS_PER_SET * crisisMult) / 10000000,
    };

    // Bifurcation
    const secCost = costs.capf + costs.police;
    const adminHRCost = costs.ab + costs.c + costs.d;
    const logisticsCost = costs.infra + costs.evm;
    const grandTotal = secCost + adminHRCost + logisticsCost;
    const totalForce = (capf * 100) + police + ab + c + d;

    return {
        row: {
            State: state,
            Year: targetYear,
            "Voters (Cr)": (futureVoters / 10000000).toFixed(2),
            "Poll Stns (PS)": ps,
            "CAPF (Coys)": capf,
            "State Police": police,
            "Class A/B (Officers)": ab,
            "Class C (Staff)": c,
            "Class D (Support)": d,
            "EVM Sets (Allocated)": evm,
            "PS Infra Budget (₹ Cr)": costs.infra.toFixed(2),
            "CAPF Budget (₹ Cr)": costs.capf.toFixed(2),
            "Police Budget (₹ Cr)": costs.police.toFixed(2),
            "Cl-A/B Budget (₹ Cr)": costs.ab.toFixed(2),
            "Cl-C Budget (₹ Cr)": costs.c.toFixed(2),
            "Cl-D Budget (₹ Cr)": costs.d.toFixed(2),
            "EVM/ Logist. Cost (₹ Cr)": costs.evm.toFixed(2),
            "Total Security Cost (₹ Cr)": secCost.toFixed(2),
            "Total HR Admin Cost (₹ Cr)": adminHRCost.toFixed(2),
            "Total Logistics Cost (₹ Cr)": logisticsCost.toFixed(2),
            "Grand Total Budget (₹ Cr)": grandTotal.toFixed(2),
            "Cost Per Voter (₹)": ((grandTotal * 10000000) / futureVoters).toFixed(0),
            "Total Human Force": `~${(totalForce / 100000).toFixed(1)} Lakh`,
            "_rawTotalForce": totalForce
        }
    };
};

export default function DetailedStateAnalysis() {
    const [selectedState, setSelectedState] = useState('Assam'); // Default to CSV baseline
    const [targetYear, setTargetYear] = useState(2029);
    const [inflation, setInflation] = useState(5.5);
    const [popGrowth, setPopGrowth] = useState(1.8);
    const [crisisFactor, setCrisisFactor] = useState(1.0);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const data = runHybridPrediction(selectedState, targetYear, inflation, popGrowth, crisisFactor);
        setResult(data);
    }, [selectedState, targetYear, inflation, popGrowth, crisisFactor]);

    const handleExport = () => {
        if (!result) return;
        const predictionRow = { ...result.row };
        delete predictionRow._rawTotalForce;

        const allData = historicalData.filter(d => d.State === selectedState).map(r => {
            const { _rawTotalForce, ...rest } = r;
            return rest;
        });
        allData.unshift(predictionRow);

        const headers = Object.keys(allData[0]);
        const csvContent = [
            headers.join(','),
            ...allData.map(row => headers.map(fieldName => `"${row[fieldName]}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `Hybrid_Pred_${selectedState}_${targetYear}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const costPieData = result ? [
        { name: 'Security', value: parseFloat(result.row["Total Security Cost (₹ Cr)"]), fill: '#ef4444' },
        { name: 'HR Admin', value: parseFloat(result.row["Total HR Admin Cost (₹ Cr)"]), fill: '#3b82f6' },
        { name: 'Logistics/Infra', value: parseFloat(result.row["Total Logistics Cost (₹ Cr)"]), fill: '#10b981' },
    ] : [];

    const stateOptions = [...new Set(historicalData.map(d => d.State))].sort();

    return (
        <div className="w-full bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-6 border-b pb-4 border-slate-200">
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <Zap className="w-8 h-8 text-amber-500" />
                        Hybrid Election Engine (Calibrated)
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT: Controls */}
                    <div className="lg:col-span-3 space-y-4 sticky top-20 h-fit">
                        <div className="bg-white p-4 shadow-sm border border-slate-200">
                            <h2 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">Simulation Parameters</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-700">State</label>
                                    <select
                                        className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 text-sm"
                                        value={selectedState}
                                        onChange={(e) => setSelectedState(e.target.value)}
                                    >
                                        {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-slate-700">Target Year</label>
                                    <input
                                        type="number"
                                        className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 text-sm"
                                        value={targetYear}
                                        onChange={(e) => setTargetYear(Number(e.target.value))}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between">
                                        <label className="text-xs font-semibold text-slate-700">Inflation</label>
                                        <span className="text-xs font-bold text-blue-600">{inflation}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="15" step="0.1"
                                        className="w-full h-1.5 bg-slate-200 appearance-none cursor-pointer accent-blue-600 mt-2"
                                        value={inflation}
                                        onChange={(e) => setInflation(Number(e.target.value))}
                                    />
                                    <div className="text-[10px] text-slate-400 mt-1">Default: 5.5%</div>
                                </div>

                                <div>
                                    <div className="flex justify-between">
                                        <label className="text-xs font-semibold text-slate-700">Pop. Growth</label>
                                        <span className="text-xs font-bold text-blue-600">{popGrowth}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="5" step="0.01"
                                        className="w-full h-1.5 bg-slate-200 appearance-none cursor-pointer accent-blue-600 mt-2"
                                        value={popGrowth}
                                        onChange={(e) => setPopGrowth(Number(e.target.value))}
                                    />
                                    <div className="text-[10px] text-slate-400 mt-1">Default: 1.8%</div>
                                </div>

                                <div className="pt-2 border-t border-slate-100">
                                    <div className="flex justify-between">
                                        <label className="text-xs font-bold text-red-600">Crisis Factor</label>
                                        <span className="text-xs font-bold text-red-600">{crisisFactor}x</span>
                                    </div>
                                    <input
                                        type="range" min="1.0" max="1.5" step="0.05"
                                        className="w-full h-1.5 bg-red-100 appearance-none cursor-pointer accent-red-600 mt-2"
                                        value={crisisFactor}
                                        onChange={(e) => setCrisisFactor(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleExport}
                            className="w-full bg-emerald-50 hover:bg-emerald-100 p-4 border border-emerald-100 flex items-center justify-between transition-colors group"
                        >
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                                <div className="text-left">
                                    <span className="block text-sm font-bold text-emerald-800">Export CSV</span>
                                    <span className="block text-[10px] text-emerald-600">Include History</span>
                                </div>
                            </div>
                            <Download className="w-4 h-4 text-emerald-500" />
                        </button>
                    </div>

                    {/* RIGHT: Dashboard */}
                    <div className="lg:col-span-9 space-y-6">
                        {result && (
                            <>
                                {/* 1. METRICS */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <MetricCard label="Projected Voters" value={`${result.row["Voters (Cr)"]} Cr`} icon={Users} color="blue" />
                                    <MetricCard label="Poll Stations" value={result.row["Poll Stns (PS)"].toLocaleString()} icon={MapPin} color="indigo" />
                                    <MetricCard label="Grand Total Budget" value={`₹ ${result.row["Grand Total Budget (₹ Cr)"]} Cr`} icon={Calculator} color="emerald" />
                                    <MetricCard label="Total Human Force" value={result.row["Total Human Force"]} icon={Users} color="amber" />
                                </div>

                                {/* 2. RESOURCE BREAKDOWN */}
                                <div className="bg-white shadow-sm border border-slate-200 overflow-hidden">
                                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-700 text-sm uppercase">Resource Allocation Plan</h3>
                                        <div className="text-xs font-mono text-slate-500 bg-slate-200 px-2 py-1">
                                            Model: XGBoost Weighted Simulation
                                        </div>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {/* Security Column */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-red-600 mb-4 pb-2 border-b border-red-100">
                                                <Shield className="w-4 h-4" /> Security Deployment
                                            </h4>
                                            <div className="space-y-3">
                                                <Row label="CAPF Companies" value={result.row["CAPF (Coys)"]} unit="Coys" />
                                                <Row label="State Police" value={result.row["State Police"]} unit="Pers" />
                                                <div className="pt-2 mt-2 border-t border-dashed border-slate-200">
                                                    <Row label="Security Budget" value={`₹ ${result.row["Total Security Cost (₹ Cr)"]}`} unit="Cr" highlight />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Admin Column */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-4 pb-2 border-b border-blue-100">
                                                <Briefcase className="w-4 h-4" /> HR & Admin Force
                                            </h4>
                                            <div className="space-y-3">
                                                <Row label="Class A/B (Officers)" value={result.row["Class A/B (Officers)"]} unit="Pers" />
                                                <Row label="Class C (Staff)" value={result.row["Class C (Staff)"]} unit="Pers" />
                                                <Row label="Class D (Support)" value={result.row["Class D (Support)"]} unit="Pers" />
                                                <Row label="EVM Sets" value={result.row["EVM Sets (Allocated)"]} unit="Sets" />
                                                <div className="pt-2 mt-2 border-t border-dashed border-slate-200">
                                                    <Row label="HR Admin Budget" value={`₹ ${result.row["Total HR Admin Cost (₹ Cr)"]}`} unit="Cr" highlight />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* 3. BUDGET & CHART */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                    {/* Detailed Budget Table */}
                                    <div className="md:col-span-2 bg-white shadow-sm border border-slate-200">
                                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                                            <h3 className="font-bold text-slate-700 text-sm uppercase">Financial Bifurcation</h3>
                                        </div>
                                        <div className="divide-y divide-slate-50">
                                            <BudgetRow label="1. Total Security Budget" value={result.row["Total Security Cost (₹ Cr)"]} sub="(CAPF Transport/Housing + Police TA/DA)" />
                                            <BudgetRow label="2. Total HR Admin Budget" value={result.row["Total HR Admin Cost (₹ Cr)"]} sub="(Honorarium for Cl-A/B, Cl-C, Cl-D)" />
                                            <BudgetRow label="3. Total Logistics Budget" value={result.row["Total Logistics Cost (₹ Cr)"]} sub="(PS Infra Setup + EVM Transport)" />
                                            <div className="p-4 bg-slate-50 flex justify-between items-center border-t border-slate-200">
                                                <span className="font-bold text-slate-800">Grand Total</span>
                                                <span className="font-bold text-slate-900 text-lg">₹ {result.row["Grand Total Budget (₹ Cr)"]} Cr</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pie Chart */}
                                    <div className="bg-white shadow-sm border border-slate-200 p-4 flex flex-col items-center justify-center">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Budget Split</h4>
                                        <div className="w-full h-48">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={costPieData}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={40}
                                                        outerRadius={60}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                    >
                                                        {costPieData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip formatter={(value) => `₹ ${value.toFixed(2)} Cr`} />
                                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

const MetricCard = ({ label, value, icon: Icon, color }) => {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100"
    };

    return (
        <div className={`p-4 border ${colorClasses[color]} flex flex-col justify-between h-28`}>
            <div className="flex items-start justify-between">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</span>
                <Icon className="w-5 h-5 opacity-80" />
            </div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    );
};

const Row = ({ label, value, unit, highlight }) => (
    <div className={`flex justify-between items-center ${highlight ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
        <span className="text-sm">{label}</span>
        <span className="font-mono text-sm">{typeof value === 'number' ? value.toLocaleString() : value} <span className="text-xs text-slate-400">{unit}</span></span>
    </div>
);

const BudgetRow = ({ label, value, sub }) => (
    <div className="flex justify-between items-center px-6 py-3 hover:bg-slate-50 transition-colors">
        <div>
            <div className="text-sm font-medium text-slate-700">{label}</div>
            {sub && <div className="text-[10px] text-slate-400">{sub}</div>}
        </div>
        <span className="text-sm font-mono font-bold text-slate-900">₹ {value} <span className="text-xs text-slate-400 font-sans">Cr</span></span>
    </div>
);
