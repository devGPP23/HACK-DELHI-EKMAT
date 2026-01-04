import React, { useState, useEffect } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import IndiaMapSVG from '../components/IndiaMapSVG';
import AnalyticsCharts from '../components/AnalyticsCharts';
import ScenarioPanel from '../components/ScenarioPanel';
import MetricsCards from '../components/MetricsCards';
import TimelineSlider from '../components/TimelineSlider';
import { Database, Download, Calendar } from 'lucide-react';
import clsx from 'clsx';
import { INDIAN_STATES } from '../lib/simulationEngine';

export default function Home() {
    const { scenario, results, updateScenario, resetScenario } = useSimulation();

    // Local state for timeline
    const [currentYear, setCurrentYear] = useState(scenario.baseYear);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hoveredState, setHoveredState] = useState(null);

    // Derive current year result
    const currentYearResult = results.find(r => r.year === currentYear) || results[0];

    // Auto-play logic
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentYear(prev => {
                    if (prev >= scenario.baseYear + 15) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000); // 1 sec per year
        }
        return () => clearInterval(interval);
    }, [isPlaying, scenario.baseYear]);

    // Sync year if baseYear changes
    useEffect(() => {
        if (currentYear < scenario.baseYear) setCurrentYear(scenario.baseYear);
    }, [scenario.baseYear]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">

            {/* Navbar */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg text-white">
                            <Database size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500 font-serif tracking-tight">
                                EKMAT Engine
                            </h1>
                            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">EKakrit Matdata Anukaran Taknik</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium px-3 py-1 bg-slate-100 rounded-full text-slate-600">v2.5.0 K-Logic</span>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
                            <Download size={16} /> Export Report
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto p-4 lg:p-6 space-y-6">

                {/* Top Metrics Row */}
                <section>
                    <MetricsCards currentYearResult={currentYearResult} />
                </section>

                {/* Main interactive Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Left: Map Viz (Sticky on Desktop) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="font-serif font-bold text-slate-800">Geospatial Synchronization</h2>
                                <span className={clsx(
                                    "px-2 py-0.5 text-xs font-bold rounded uppercase",
                                    currentYearResult.isSyncYear ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                )}>
                                    {currentYearResult.isSyncYear ? "General Election Year" : "Off-Cycle Year"}
                                </span>
                            </div>
                            <div className="p-2">
                                <IndiaMapSVG
                                    year={currentYear}
                                    baseYear={scenario.baseYear}
                                    scheduledStates={currentYearResult.electionsScheduled}
                                    onStateHover={setHoveredState}
                                />
                            </div>
                            <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Interactive Province Focus</p>
                                <h3 className="text-lg font-bold text-slate-800 h-6">
                                    {hoveredState || "Hover over a state"}
                                </h3>
                            </div>
                        </div>

                        {/* Scheduled Elections List */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                                <Calendar size={16} />
                                Elections Scheduled in {currentYear}
                            </h3>

                            {currentYearResult.electionsScheduled.length === 0 ? (
                                <div className="text-sm text-slate-400 italic text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                    No States going to polls (One Nation status active)
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {currentYearResult.electionsScheduled.map(code => {
                                        const activeState = INDIAN_STATES.find(s => s.code === code);
                                        return (
                                            <span key={code} className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-md shadow-sm">
                                                {activeState?.name || code}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                            <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-100 pt-2">
                                {currentYearResult.electionsScheduled.length} / {INDIAN_STATES.length} States Polling
                            </p>
                        </div>
                    </div>

                    {/* Right: Controls & Analytics */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Timeline Control */}
                        <TimelineSlider
                            year={currentYear}
                            minYear={scenario.baseYear}
                            maxYear={scenario.baseYear + 15}
                            onChange={setCurrentYear}
                            isPlaying={isPlaying}
                            onTogglePlay={() => setIsPlaying(!isPlaying)}
                        />

                        {/* Warnings Area (Top Priority) */}
                        {currentYearResult.warnings.length > 0 && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                                <h3 className="text-sm font-bold text-red-800 uppercase mb-2 flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    Simulation Event Log
                                </h3>
                                <ul className="space-y-1">
                                    {currentYearResult.warnings.map((w, i) => (
                                        <li key={i} className="text-red-700 text-xs font-medium flex items-start gap-2">
                                            <span>•</span> {w}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Charts Grid */}
                        <AnalyticsCharts results={results} />

                        {/* Scenario Configuration */}
                        <ScenarioPanel
                            scenario={scenario}
                            updateScenario={updateScenario}
                            resetScenario={resetScenario}
                        />

                    </div>
                </div>

            </main>

        </div>
    );
}
