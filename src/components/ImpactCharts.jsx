import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
    ReferenceLine,
    LineChart,
    Line,
    ComposedChart
} from 'recharts';

// --- DATASETS (Refined for Professional Look) ---

const gdpData = [
    { year: 'Year 1', nonSync: 6.5, onoe: 6.5, diff: 0 },
    { year: 'Year 2', nonSync: 6.8, onoe: 7.0, diff: 0.2 },
    { year: 'Year 3', nonSync: 7.0, onoe: 7.5, diff: 0.5 },
    { year: 'Year 4', nonSync: 5.6, onoe: 7.8, diff: 2.2 }, // Instability
    { year: 'Year 5', nonSync: 5.2, onoe: 8.0, diff: 2.8 }, // Policy Paralysis
    { year: 'Elec Yr', nonSync: 6.0, onoe: 8.2, diff: 2.2 },
];

const inflationData = [
    { year: '2019', actual: 4.8, ideal: 4.0 },
    { year: '2020', actual: 6.2, ideal: 4.0 },
    { year: '2021', actual: 5.5, ideal: 4.0 },
    { year: '2022', actual: 6.7, ideal: 4.0 },
    { year: '2023', actual: 5.4, ideal: 4.0 },
    { year: '2024 (E)', actual: 5.1, ideal: 4.0 },
];

// Investment: Comparative Capital Formation
const investmentComparison = [
    { phase: 'Year 1', Current: 82, ONOE: 84 },
    { phase: 'Year 2', Current: 85, ONOE: 89 },
    { phase: 'Year 3', Current: 88, ONOE: 94 },
    { phase: 'Year 4', Current: 65, ONOE: 96 }, // Pre-election strictness
    { phase: 'Year 5', Current: 60, ONOE: 98 }, // Election uncertainty
];

const crimeData = [
    { year: '2016', val: 92 },
    { year: '2017 (Elec)', val: 125 },
    { year: '2018', val: 94 },
    { year: '2019 (Elec)', val: 140 },
    { year: '2020', val: 96 },
    { year: '2021', val: 99 },
    { year: '2022 (Elec)', val: 130 },
];

const deficitData = [
    { year: 'Y1', current: 3.5, onoe: 3.5 },
    { year: 'Y2', current: 3.8, onoe: 3.4 },
    { year: 'Y3', current: 4.2, onoe: 3.3 },
    { year: 'Y4', current: 5.0, onoe: 3.2 }, // Populism
    { year: 'Y5', current: 6.8, onoe: 3.0 }, // Election spending
];

// --- CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload, label, unit = '' }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg">
                <p className="text-xs font-bold text-slate-500 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-slate-600 font-medium">{entry.name}:</span>
                        <span className="font-bold text-slate-800">
                            {entry.value}{unit}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// --- CHARTS ---

export const GdpGrowthChart = () => (
    <div className="h-[280px] w-full bg-white rounded-lg p-2">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gdpData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <defs>
                    <linearGradient id="gradOnoe" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradNon" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />

                <Area
                    type="monotone"
                    dataKey="onoe"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#gradOnoe)"
                    name="Synchronized Cycle (Stable)"
                    activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area
                    type="monotone"
                    dataKey="nonSync"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fill="url(#gradNon)"
                    name="Current Cycle (Volatile)"
                    activeDot={{ r: 6, strokeWidth: 0 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

// Data derived from Kovind Committee Report Figure 8.10
const cpiSimultaneous = [
    { year: '-2', rate: 6.4, avg: 7.3 },
    { year: '-1', rate: 8.1, avg: 7.3 },
    { year: '0', rate: 6.5, avg: 6.5 }, // Election Year
    { year: '+1', rate: 3.9, avg: 5.6 }, // Sharp Drop post-election
    { year: '+2', rate: 7.2, avg: 5.6 },
];

const cpiNonSimultaneous = [
    { year: '-2', rate: 7.3, avg: 7.8 },
    { year: '-1', rate: 8.3, avg: 7.8 },
    { year: '0', rate: 7.6, avg: 7.6 },
    { year: '+1', rate: 7.2, avg: 7.3 },
    { year: '+2', rate: 7.4, avg: 7.3 },
];

export const InflationChart = () => (
    <div className="bg-white rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
                <ReportChart data={cpiSimultaneous} title="Simultaneous: CPI Drops Post-Election" />
            </div>
            <div className="hidden md:block w-px bg-slate-100 self-stretch" />
            <div className="flex-1">
                <ReportChart data={cpiNonSimultaneous} title="Non-Simultaneous: Persistent High CPI" />
            </div>
        </div>
        <div className="mt-4 text-[10px] text-slate-500 text-center border-t border-slate-100 pt-2">
            <strong>Figure 8.10:</strong> Consumer Price Inflation (annual %) trends. (Data: IMF 1960-2023). <br />
            <span>Simultaneous elections show a clearer cooling off of inflation (approx 1.7% drop) post-election.</span>
        </div>
    </div>
);

export const InvestmentChart = () => (
    <div className="h-[280px] w-full bg-white rounded-lg p-2">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={investmentComparison} barGap={0} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="phase" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip unit=" Index" />} />
                <Legend iconType="rect" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />

                <Bar dataKey="Current" fill="#ef4444" radius={[4, 4, 0, 0]} name="Current Investment" barSize={20} />
                <Bar dataKey="ONOE" fill="#10b981" radius={[4, 4, 0, 0]} name="ONOE Scenario" barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export const FiscalDeficitChart = () => (
    <div className="h-[280px] w-full bg-white rounded-lg p-2">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={deficitData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <defs>
                    <linearGradient id="gradDeficit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />

                <Area
                    type="monotone"
                    dataKey="current"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fill="url(#gradDeficit)"
                    name="Current Deficit (Overshoot)"
                />
                <Line
                    type="monotone"
                    dataKey="onoe"
                    stroke="#10b981"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="FRBM Target (Disciplined)"
                    dot={false}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

// Data derived from Kovind Committee Report Figure 8.15
const crimeSimultaneous = [
    { year: '-2', rate: 178, avg: 177 },
    { year: '-1', rate: 175, avg: 177 },
    { year: '0', rate: 179, avg: 179 },
    { year: '+1', rate: 181, avg: 181 },
    { year: '+2', rate: 180, avg: 181 },
];

const crimeNonSimultaneous = [
    { year: '-2', rate: 185, avg: 187 },
    { year: '-1', rate: 190, avg: 187 },
    { year: '0', rate: 192, avg: 193 },
    { year: '+1', rate: 200, avg: 198 },
    { year: '+2', rate: 196, avg: 198 },
];

const ReportChart = ({ data, title }) => (
    <div className="flex-1">
        <h4 className="text-center text-xs font-bold text-slate-700 mb-2">{title}</h4>
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[150, 210]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                        labelStyle={{ display: 'none' }}
                        formatter={(value, name) => [value, name === 'rate' ? 'Crime Rate' : '2Y Avg']}
                    />

                    {/* Vertical Election Line */}
                    <ReferenceLine x="0" stroke="#64748b" strokeDasharray="4 4" label={{ value: 'Election', position: 'insideTop', fontSize: 9, fill: '#64748b' }} />

                    {/* Bar for Crime Rate */}
                    <Bar dataKey="rate" fill="transparent" stroke="#3b82f6" strokeWidth={2} barSize={30} radius={[2, 2, 0, 0]} />

                    {/* Line for 2Y-Avg */}
                    <Line type="monotone" dataKey="avg" stroke="#ef4444" strokeWidth={2} dot={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export const CrimeRateChart = () => (
    <div className="bg-white rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-6">
            <ReportChart data={crimeSimultaneous} title="Simultaneous Elections" />
            <div className="hidden md:block w-px bg-slate-100 self-stretch" />
            <ReportChart data={crimeNonSimultaneous} title="Non-Simultaneous Elections" />
        </div>
        <div className="mt-4 text-[10px] text-slate-500 text-center border-t border-slate-100 pt-2">
            <strong>Figure 8.15:</strong> Crime Rates before and after elections (NCRB Data 1981-2021). <br />
            <span className="md:hidden">Scroll right to see comparison.</span>
        </div>
    </div>
);
