import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

const ChartCard = ({ title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col h-[300px]"
    >
        <h3 className="text-sm font-semibold text-slate-500 mb-4">{title}</h3>
        <div className="flex-1 w-full min-h-0">
            {children}
        </div>
    </motion.div>
);

export default function AnalyticsCharts({ results }) {
    if (!results || results.length === 0) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Governance Days Gained */}
            <ChartCard title="Cumulative Governance Days Value">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results}>
                        <defs>
                            <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#10b981' }}
                        />
                        <Area type="monotone" dataKey="totalGovernanceDaysGained" stroke="#10b981" fillOpacity={1} fill="url(#colorDays)" />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Cost Savings */}
            <ChartCard title="Projected Cost Analysis (₹ Crores)">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip />
                        <ReferenceLine y={0} stroke="#94a3b8" />
                        <Line type="monotone" dataKey="cumulativeCostSavings" stroke="#d97706" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Synchronization Progress */}
            <ChartCard title="State Synchronization Status">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis domain={[0, 30]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip cursor={{ fill: '#f1f5f9' }} />
                        <Bar dataKey="synchronizedStates" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Security Demand */}
            <ChartCard title="Security Personnel Demand vs Capacity">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip />
                        <ReferenceLine y={600000} label="National Capacity" stroke="#ef4444" strokeDasharray="3 3" />
                        <Line type="stepAfter" dataKey="securityPeakDemand" stroke="#6366f1" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    );
}
