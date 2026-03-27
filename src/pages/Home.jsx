
import React, { useState, useEffect } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import IndiaMapSVG from '../components/IndiaMapSVG';
import AnalyticsCharts from '../components/AnalyticsCharts';
import ScenarioPanel from '../components/ScenarioPanel';
import ConstitutionalImpact from '../components/ConstitutionalImpact';
import MetricsCards from '../components/MetricsCards';
import TimelineSlider from '../components/TimelineSlider';
import LokMitra from '../components/LokMitra';
import VoiceController from '../components/VoiceController';
import DetailedStateAnalysis from '../components/DetailedStateAnalysis';
import { Database, Download, Calendar, X, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { INDIAN_STATES } from '../lib/simulationEngine';

import { useLanguage } from '../contexts/LanguageContext';

import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';
import NewsTicker from '../components/NewsTicker';
import DebaterPanel from '../components/DebaterPanel';

export default function Home() {
    const { scenario, results, updateScenario, resetScenario, triggerReelection } = useSimulation();
    const { t, toggleLanguage, language } = useLanguage();
    const reportRef = useRef(null);
    const [isExporting, setIsExporting] = useState(false);

    // Local state for timeline
    const [currentYear, setCurrentYear] = useState(scenario.baseYear);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedState, setSelectedState] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [mapMode, setMapMode] = useState('sync'); // 'sync' or 'cost'
    const [showGovernanceToast, setShowGovernanceToast] = useState(false);

    // Draggable Panel State
    const [panelPos, setPanelPos] = useState({ x: 1000, y: 100 });

    // Set initial position on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPanelPos({ x: window.innerWidth - 350, y: 100 });
        }
    }, []);

    const handleDragStart = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startPanelX = panelPos.x;
        const startPanelY = panelPos.y;

        const onMouseMove = (moveEvent) => {
            setPanelPos({
                x: startPanelX + (moveEvent.clientX - startX),
                y: startPanelY + (moveEvent.clientY - startY)
            });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const handleExportPDF = async () => {
        if (!reportRef.current) return;
        setIsExporting(true);
        try {
            // STEP 1: Screenshot Dashboard
            const canvas = await html2canvas(reportRef.current, {
                scale: 1.5,
                useCORS: true,
                logging: false,
                windowWidth: 1400
            });
            const imgData = canvas.toDataURL('image/png');

            // STEP 2: PDF Generation
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'pt',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // --- Page 1: Visuals ---
            const imgHeight = (canvas.height * pageWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, Math.min(imgHeight, pageHeight));

            // --- Page 2: Text Data ---
            pdf.addPage();

            // Title
            pdf.setFontSize(16);
            pdf.setTextColor(40);
            pdf.text("Detailed Simulation Data Report", 40, 50);

            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 40, 65);

            // Metrics Table
            const currentRes = results.find(r => r.year === currentYear) || results[0];

            autoTable(pdf, {
                startY: 80,
                head: [['Key Logistical Metric', 'Current Value']],
                body: [
                    ['Simulation Year', currentYear],
                    ['Governance Days Gained', currentRes ? currentRes.totalGovernanceDaysGained : 0],
                    ['Cum. Cost Savings', currentRes ? `Rs ${currentRes.cumulativeCostSavings.toFixed(1)} Cr` : 0],
                    ['Security Peak Demand', currentRes ? `${currentRes.securityPeakDemand.toLocaleString()} Personnel` : 0],
                ],
                theme: 'striped',
                headStyles: { fillColor: [79, 70, 229] }
            });

            // Detailed State Table
            const stateData = INDIAN_STATES.map(s => ([
                s.name,
                s.seats,
                (s.population / 1000000).toFixed(1) + "M",
                `Rs ${((s.population / 1200) * 58500 / 10000000).toFixed(1)} Cr`
            ]));

            pdf.text("Projected State Estimates (2029)", 40, pdf.lastAutoTable.finalY + 30);

            autoTable(pdf, {
                startY: pdf.lastAutoTable.finalY + 40,
                head: [['State', 'Seats', 'Pop', 'Est. Cost']],
                body: stateData,
                styles: { fontSize: 8 },
                headStyles: { fillColor: [50, 50, 50] }
            });

            pdf.save(`EKMAT_Full_Report_${new Date().toISOString().split('T')[0]}.pdf`);

        } catch (error) {
            console.error("Export Failed", error);
            alert("Export error.");
        }
        setIsExporting(false);
    };

    const handleExportCSV = () => {
        const headers = ["Year", "ElectionsCount", "SyncStatus", "GovDaysGained", "CumSavings", "SecurityDemand"];
        const rows = results.map(r => [
            r.year,
            r.electionsScheduled.length,
            r.isSyncYear ? "SYNC" : "OFF-CYCLE",
            r.totalGovernanceDaysGained,
            r.cumulativeCostSavings.toFixed(1),
            r.securityPeakDemand
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `EKMAT_Simulation_Data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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

    // Close overlay when switching modes
    useEffect(() => {
        setSelectedState(null);
    }, [scenario.reelectionMode]);

    // Confetti & Governance Toast Trigger
    useEffect(() => {
        if (currentYearResult.electionsScheduled.length === 0) {
            setShowGovernanceToast(true);
            const timer = setTimeout(() => setShowGovernanceToast(false), 3000);
            return () => clearTimeout(timer);
        } else {
            setShowGovernanceToast(false);
        }
    }, [currentYearResult.electionsScheduled.length]);

    // Handle Map Interaction based on Mode
    const handleStateClick = (state) => {
        if (scenario.reelectionMode === 'custom') {
            // Direct Trigger
            triggerReelection(state.code, currentYear);
        } else {
            // Select for Details (Default behavior)
            setSelectedState(state);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 relative">

            {/* Navbar */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 text-white">
                            <Database size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500 font-serif tracking-tight">
                                {t('title')}
                            </h1>
                            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">{t('tagline')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors border border-slate-200"
                        >
                            <span className={language === 'en' ? "text-indigo-600" : "text-slate-400"}>Eng</span>
                            <span className="text-slate-300">|</span>
                            <span className={language === 'hi' ? "text-indigo-600" : "text-slate-400"}>हिन्दी</span>
                        </button>


                        <button
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-2 disabled:opacity-50"
                        >
                            {isExporting ? <RotateCcw className="animate-spin" size={16} /> : <Download size={16} />}
                            {isExporting ? "Generating..." : t('exportReport')}
                        </button>
                        <button
                            onClick={handleExportCSV}
                            className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors border border-slate-200 px-2 py-1 rounded"
                        >
                            <Calendar size={12} />
                            CSV
                        </button>
                    </div>
                </div>
            </header>

            {/* Governance Toast */}
            <AnimatePresence>
                {showGovernanceToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-emerald-600 text-white px-6 py-2 rounded-full shadow-2xl font-bold flex items-center gap-2 border-2 border-white"
                    >
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        GOVERNANCE YEAR: 0 ELECTIONS ACTIVE
                    </motion.div>
                )}
            </AnimatePresence>



            {/* SIMULATION SECTION: Timeline Sticks only within this block */}
            {/* SIMULATION SECTION: Timeline Sticks only within this block */}
            <div className="relative pb-12" ref={reportRef}>
                <div className="relative">

                    {/* 1. Timeline Control (Full Width, Sticky) */}
                    <div className="sticky top-16 z-40 w-full">
                        <TimelineSlider
                            year={currentYear}
                            minYear={scenario.baseYear}
                            maxYear={scenario.baseYear + 15}
                            onChange={setCurrentYear}
                            isPlaying={isPlaying}
                            onTogglePlay={() => setIsPlaying(!isPlaying)}
                            onOpenSettings={() => setIsSettingsOpen(!isSettingsOpen)}
                        />
                    </div>

                    <div className="max-w-[1400px] mx-auto p-4 lg:p-6 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                            {/* LEFT COLUMN: Map (60%) */}
                            <div className="lg:col-span-7 space-y-6">
                                {/* Map Container */}
                                <div className="bg-white shadow-lg border border-slate-200 overflow-hidden h-full flex flex-col">
                                    <div className="p-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                                        <div className="flex items-center gap-4">
                                            <h2 className="font-serif font-bold text-slate-800">{t('geoSync')}</h2>
                                            <div className="flex bg-slate-100 p-1 rounded-lg text-[10px] font-bold">
                                                <button
                                                    onClick={() => setMapMode('sync')}
                                                    className={clsx("px-2 py-1 rounded", mapMode === 'sync' ? "bg-white shadow text-indigo-600" : "text-slate-400")}
                                                >
                                                    SYNC
                                                </button>
                                                <button
                                                    onClick={() => setMapMode('cost')}
                                                    className={clsx("px-2 py-1 rounded", mapMode === 'cost' ? "bg-white shadow text-indigo-600" : "text-slate-400")}
                                                >
                                                    COST
                                                </button>
                                            </div>
                                        </div>
                                        <span className={clsx(
                                            "px-2 py-0.5 text-xs font-bold uppercase",
                                            currentYearResult.isSyncYear ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                        )}>
                                            {currentYearResult.isSyncYear ? t('genElectionYear') : t('offCycleYear')}
                                        </span>
                                    </div>
                                    <div className="p-2 flex-1 relative min-h-[400px]">
                                        <IndiaMapSVG
                                            year={currentYear}
                                            baseYear={scenario.baseYear}
                                            scheduledStates={currentYearResult.electionsScheduled}
                                            failedStates={currentYearResult.failedElections || []}
                                            onStateClick={handleStateClick}
                                            mode={mapMode}
                                        />
                                        {/* Overlay for Selected State */}
                                        {selectedState && (
                                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur border border-slate-200 p-4 shadow-xl max-w-xs animate-in slide-in-from-bottom-2 z-20">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="text-[10px] text-indigo-500 uppercase tracking-wide font-bold">{t('interactiveFocus')}</p>
                                                        <h3 className="text-xl font-bold text-slate-800 leading-tight">
                                                            {selectedState.name}
                                                        </h3>
                                                    </div>
                                                    <button onClick={() => setSelectedState(null)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                                                </div>

                                                <div className="space-y-2 mt-3">
                                                    <div className="p-2 bg-slate-50 text-[10px] text-slate-500 rounded border border-slate-100">
                                                        {t('status')}: {currentYearResult.electionsScheduled.includes(selectedState.code) ? t('electionActive') : t('termActive')}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>


                            </div>

                            {/* RIGHT COLUMN: Metrics Grid (40%) */}
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                <div className="bg-slate-50 border border-slate-200 p-4 h-full">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Live Metrics</h3>
                                    <MetricsCards currentYearResult={currentYearResult} />
                                </div>

                                {/* Warnings Area (Moved here to fill sidebar) */}
                                {/* Warnings Area (Permanent) */}
                                <div className="bg-red-50 border border-red-200 p-4 shadow-sm flex-1 flex flex-col min-h-[150px]">
                                    <h3 className="text-sm font-bold text-red-800 uppercase mb-2 flex items-center gap-2 shrink-0">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-blue-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-none h-2 w-2 bg-blue-500"></span>
                                        </span>
                                        Simulation Events
                                    </h3>
                                    <div className="flex-1 overflow-y-auto pr-1">
                                        {currentYearResult.warnings.length > 0 ? (
                                            <ul className="space-y-1">
                                                {currentYearResult.warnings.map((w, i) => (
                                                    <li key={i} className="text-red-700 text-[10px] font-medium flex items-start gap-2">
                                                        <span>•</span> {w}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-[10px] text-red-300 italic">
                                                System Nominal. No Critical Events.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM ROW: Analytics Charts */}
                            <div className="lg:col-span-12 pt-6 border-t border-slate-200">
                                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-widest">Financial & Logistical Projections</h3>
                                <AnalyticsCharts results={results} />
                            </div>

                        </div>
                    </div>
                </div>
                {/* 4. Detailed State Budget Simulation (New Section) */}
                <div className="max-w-[1400px] mx-auto p-4 lg:p-6 border-t border-slate-200 mt-8">
                    <DetailedStateAnalysis />
                </div>
            </div>


            {/* SETTINGS FLOATING PANEL (Draggable) */}
            {
                isSettingsOpen && (
                    <div
                        className="fixed z-[100] w-80 max-h-[80vh] bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in-95 duration-200"
                        style={{ left: panelPos.x, top: panelPos.y }}
                    >
                        {/* Draggable Header */}
                        <div
                            onMouseDown={handleDragStart}
                            className="p-3 border-b border-slate-200 flex justify-between items-center bg-slate-100/50 cursor-move select-none"
                        >
                            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                                <Database size={12} className="text-indigo-600" /> Live Calibration
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Drag Me</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsSettingsOpen(false); }}
                                    className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2">
                            <ScenarioPanel
                                scenario={scenario}
                                updateScenario={updateScenario}
                                resetScenario={resetScenario}
                            />
                        </div>

                        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                            Position: {Math.round(panelPos.x)}, {Math.round(panelPos.y)}
                        </div>
                    </div>
                )
            }

            {/* AI Assistants */}
            <LokMitra currentYearResult={currentYearResult} scenario={scenario} />
            <VoiceController
                scenario={scenario}
                currentYearResult={currentYearResult}
                setCurrentYear={setCurrentYear}
                updateScenario={updateScenario}
                triggerReelection={triggerReelection}
                resetScenario={resetScenario}
            />

            {/* AI News Ticker */}
            <NewsTicker currentYearResult={currentYearResult} />

        </div >
    );
}
