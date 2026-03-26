import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const ChartCard = ({ title, children, className }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white shadow-sm border border-slate-200 p-4 flex flex-col h-[300px] ${className || ''}`}
    >
        <h3 className="text-sm font-semibold text-slate-500 mb-4">{title}</h3>
        <div className="flex-1 w-full min-h-0">
            {children}
        </div>
    </motion.div>
);

export default function AnalyticsCharts({ results }) {
    const { t } = useLanguage();

    if (!results || results.length === 0) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Projected Cost Analysis - FULL WIDTH */}
            <ChartCard title={t('projectedCost')} className="lg:col-span-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results}>
                        <defs>
                            <linearGradient id="colorOnoe" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#64748b" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="cumulativeBaselineCost" stackId="1" stroke="#94a3b8" fill="url(#colorBase)" name={t('baselineCost')} />
                        <Area type="monotone" dataKey="cumulativeActualCost" stackId="2" stroke="#10b981" fill="url(#colorOnoe)" name={t('onoeCost')} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Governance Days Gained - GREEN */}
            <ChartCard title={t('cumulativeGovDays')}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="totalGovernanceDaysGained" stroke="#10b981" fill="#ecfdf5" name={t('daysGained')} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* EVM Units */}
            <ChartCard title={t('evmRequirement')}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip cursor={{ fill: '#f1f5f9' }} />
                        <Bar dataKey="evmUnits" fill="#3b82f6" radius={[4, 4, 0, 0]} name="EVM Units" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Election Staff - LINE STEP - ROW START */}
            <ChartCard title={t('electionStaff')}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip />
                        <Line type="stepAfter" dataKey="pollStaff" stroke="#8b5cf6" strokeWidth={2} dot={false} name={t('civilStaff')} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Security Demand - LINE STEP - ROW END */}
            <ChartCard title={t('securityDemand')}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip />
                        <ReferenceLine y={600000} label="Cap" stroke="#ef4444" strokeDasharray="3 3" />
                        <Line type="stepAfter" dataKey="securityPeakDemand" stroke="#6366f1" strokeWidth={2} dot={false} name={t('activeSecurity')} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

        </div>
    );
}
