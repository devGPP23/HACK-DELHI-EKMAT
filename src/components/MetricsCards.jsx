import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Zap, ShieldAlert, Activity, Cpu, Users, MapPin } from 'lucide-react';
import { INDIAN_STATES } from '../lib/simulationEngine';
import { useLanguage } from '../contexts/LanguageContext';

const CountUp = ({ to, duration = 800 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = count;
        const end = typeof to === 'string' ? parseFloat(to.replace(/[^0-9.-]/g, '')) : to;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = start + (end - start) * easeOutQuart;

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [to]);

    // Re-format based on original input type
    let displayValue = count;
    const toString = to?.toString() || "";

    if (toString.includes('₹')) {
        const isNegative = toString.startsWith('-');
        const unit = toString.endsWith('k') ? 'k' : '';
        displayValue = `${isNegative ? '-' : ''}₹${count.toFixed(1)}${unit}`;
    } else if (toString.endsWith(' L') || toString.endsWith('L')) {
        displayValue = `${count.toFixed(1)}L`;
    } else if (toString.includes(' personnel') || toString.includes(' officials') || toString.includes(' states')) {
        displayValue = Math.floor(count).toLocaleString();
    } else {
        displayValue = Math.floor(count).toLocaleString();
    }

    return <span>{displayValue}</span>;
};

const MetricCard = ({ label, value, unit, icon: Icon, color, tooltip }) => {
    const colorMap = {
        emerald: 'bg-emerald-500/5 text-emerald-700 border-emerald-200',
        amber: 'bg-amber-500/5 text-amber-700 border-amber-200',
        blue: 'bg-indigo-500/5 text-indigo-700 border-indigo-200',
        red: 'bg-red-500/5 text-red-700 border-red-200',
        purple: 'bg-purple-500/5 text-purple-700 border-purple-200',
        slate: 'bg-slate-500/5 text-slate-700 border-slate-200',
    };

    const iconColorMap = {
        emerald: 'text-emerald-500',
        amber: 'text-amber-500',
        blue: 'text-indigo-500',
        red: 'text-red-500',
        purple: 'text-purple-500',
        slate: 'text-slate-500',
    };

    return (
        <div className={`p-4 border ${colorMap[color]} backdrop-blur-sm shadow-sm flex flex-col items-center justify-center text-center gap-2 transition-all hover:shadow-md h-32 group relative`}>
            {/* Tooltip on Hover */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-help" title={tooltip}>
                <Activity size={10} className="text-slate-400" />
            </div>

            <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${iconColorMap[color]}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{label}</span>
            </div>
            <h3 className="text-3xl font-black tracking-tight leading-none">
                <CountUp to={value} />
            </h3>
            <span className="text-[10px] font-semibold opacity-60 uppercase">{unit}</span>
        </div>
    );
};

export default function MetricsCards({ currentYearResult }) {
    const { t } = useLanguage();
    if (!currentYearResult) return null;

    // --- Calcs for New Metrics (Source: DATA_SOURCES.md) ---
    const scheduledCodes = currentYearResult.electionsScheduled || [];
    const activeStates = INDIAN_STATES.filter(s => scheduledCodes.includes(s.code));

    // Population in active election states
    const activePopulation = activeStates.reduce((sum, s) => sum + s.population, 0);

    // 1 Polling Station per 1000 people (Conservative Peak)
    const pollingStations = Math.ceil(activePopulation / 1000);

    // EVMs: 1 set per station + 25% Reserve (VVPAT norms)
    const evmsUsed = Math.ceil(pollingStations * 1.25);

    // Civil Staff: 5 per station (Presiding + 3 Polling + 1 Support)
    const civilStaffDeployed = pollingStations * 5;

    // Total Security: From Simulation Engine (Already includes State Police + CAPF)
    const totalSecurity = currentYearResult.securityPeakDemand;

    const govDays = Math.max(0, currentYearResult.totalGovernanceDaysGained);

    const metrics = [
        {
            label: t('metricGovDays'),
            value: currentYearResult.totalGovernanceDaysGained.toLocaleString(),
            unit: t('unitDays'),
            icon: TrendingUp,
            color: 'emerald',
            tooltip: "Total days where the Model Code of Conduct was not active, allowing for uninterrupted governance."
        },
        {
            label: t('metricSavings') || 'Exchequer Savings',
            value: `${currentYearResult.cumulativeCostSavings < 0 ? '-' : ''}₹${(Math.abs(currentYearResult.cumulativeCostSavings) / 1000).toFixed(1)}k`,
            unit: t('unitCrores'),
            icon: Zap,
            color: currentYearResult.cumulativeCostSavings >= 0 ? 'amber' : 'red',
            tooltip: "Estimated net financial impact including reduced logistical repetitions vs initial capital expenditure."
        },
        {
            label: t('metricSecurity'),
            value: (totalSecurity / 100000).toFixed(1) + ' L',
            unit: t('unitPersonnel'),
            icon: ShieldAlert,
            color: totalSecurity > 1000000 ? 'red' : 'blue',
            tooltip: "Peak security force demand (CAPF + State Police) required for the scheduled phases."
        },
        {
            label: t('metricEVMs'),
            value: (evmsUsed / 100000).toFixed(1) + 'L',
            unit: t('unitUnits'),
            icon: Cpu,
            color: 'purple',
            tooltip: "Total Electronic Voting Machines required, including a 25% reserve for technical contingencies."
        },
        {
            label: t('metricStaff'),
            value: (civilStaffDeployed / 100000).toFixed(1) + 'L',
            unit: t('unitOfficials'),
            icon: Users,
            color: 'blue',
            tooltip: "Total civil administration personnel required to man the polling stations."
        },
        {
            label: t('metricActiveStates'),
            value: scheduledCodes.length,
            unit: t('unitStates'),
            icon: MapPin,
            color: scheduledCodes.length > 5 ? 'red' : 'slate',
            tooltip: "Number of states holding elections in the simulated year."
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full content-start text-slate-800">
            {/* Left Column: Governance Impact (Takes up 5 cols) */}
            <div className="md:col-span-5 h-full flex flex-col p-5 border bg-emerald-500/5 text-emerald-800 border-emerald-200 backdrop-blur-sm shadow-sm transition-all hover:shadow-md relative">
                <div className="flex items-center gap-2 mb-2 justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Governance Days (MCC)</span>
                </div>
                <h3 className="text-5xl font-black tracking-tight leading-none text-center text-emerald-600 mt-2">
                    <CountUp to={govDays} />
                </h3>
                <span className="text-[10px] font-semibold opacity-60 uppercase text-center mt-2">Days Available</span>

                <div className="mt-6 pt-4 border-t border-emerald-200/50 flex-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">What work u could have done?</span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3 bg-white/40 p-2 rounded">
                            <div className="p-1.5 bg-emerald-100 rounded text-emerald-600 shrink-0">
                                <Activity size={12} /> {/* Using Activity as a placeholder for Road/Highway */}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-700">{(govDays * 30).toLocaleString()} km <span className="font-normal opacity-70">of 4-lane National Highways</span></h4>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-white/40 p-2 rounded">
                            <div className="p-1.5 bg-blue-100 rounded text-blue-600 shrink-0">
                                <Cpu size={12} /> {/* Using Cpu as placeholder for Train */}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-700">{(govDays * 15).toLocaleString()} km <span className="font-normal opacity-70">of Railway Track (DFC Norms)</span></h4>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-white/40 p-2 rounded">
                            <div className="p-1.5 bg-amber-100 rounded text-amber-600 shrink-0">
                                <Activity size={12} /> {/* Using Activity as placeholder for House */}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-700">{(govDays * 3000).toLocaleString()} <span className="font-normal opacity-70">PM Awas Yojana Housing Units</span></h4>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-4 py-2 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded hover:bg-emerald-100 transition-colors">
                        + Show More
                    </button>

                    <p className="mt-4 text-[9px] text-emerald-600/60 italic">Based on Kovind Committee Report (2024)</p>
                </div>
            </div>

            {/* Right Column: Other Metrics (Takes up 7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-4">
                <MetricCard {...metrics[1]} /> {/* Savings */}
                <MetricCard {...metrics[2]} /> {/* Security */}
                <div className="grid grid-cols-2 gap-4">
                    <MetricCard {...metrics[3]} /> {/* EVM */}
                    <MetricCard {...metrics[4]} /> {/* Staff */}
                </div>
                <MetricCard {...metrics[5]} /> {/* Polls */}
            </div>
        </div>
    );
}
