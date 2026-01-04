import React from 'react';
import { TrendingUp, Zap, ShieldAlert, Activity } from 'lucide-react';

const MetricCard = ({ label, value, unit, icon: Icon, color }) => {
    const colorMap = {
        emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
        amber: 'bg-amber-500/10 text-amber-600 border-amber-200',
        blue: 'bg-blue-500/10 text-blue-600 border-blue-200',
        red: 'bg-red-500/10 text-red-600 border-red-200'
    };

    const iconColorMap = {
        emerald: 'text-emerald-500',
        amber: 'text-amber-500',
        blue: 'text-blue-500',
        red: 'text-red-500'
    };

    return (
        <div className={`p-4 rounded-xl border ${colorMap[color]} backdrop-blur-sm transition-all hover:scale-[1.02] duration-200`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium opacity-80">{label}</span>
                <Icon className={`w-5 h-5 ${iconColorMap[color]}`} />
            </div>
            <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold">{value}</h3>
                <span className="text-xs font-semibold opacity-70">{unit}</span>
            </div>
        </div>
    );
};

export default function MetricsCards({ currentYearResult }) {
    if (!currentYearResult) return null;

    const metrics = [
        {
            label: 'Governance Days',
            value: currentYearResult.totalGovernanceDaysGained.toLocaleString(),
            unit: 'days gained',
            icon: TrendingUp,
            color: 'emerald',
        },
        {
            label: 'Est. Cost Savings',
            value: `₹${(Math.abs(currentYearResult.cumulativeCostSavings) / 1000).toFixed(1)}K`,
            unit: 'crores',
            icon: Zap,
            color: currentYearResult.cumulativeCostSavings >= 0 ? 'amber' : 'red',
        },
        {
            label: 'Security Peak',
            value: `${(currentYearResult.securityPeakDemand / 100000).toFixed(1)}L`,
            unit: 'personnel',
            icon: ShieldAlert,
            color: currentYearResult.securityPeakDemand > 600000 ? 'red' : 'blue',
        },
        {
            label: 'Cycle Alignment',
            value: currentYearResult.synchronizedStates || 0,
            unit: '/ 30 States',
            icon: Activity,
            color: 'blue',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, idx) => (
                <MetricCard key={idx} {...metric} />
            ))}
        </div>
    );
}
