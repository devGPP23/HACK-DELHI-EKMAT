import React from "react";
import { Chart } from "react-google-charts";
import { INDIAN_STATES, isStateSynchronized } from "../lib/simulationEngine";

export default function IndiaMapSVG({ year, baseYear, scheduledStates = [], failedStates = [], onStateHover, onStateClick, mode = 'sync' }) {

    // Format data for Google Charts
    // Header
    const data = [["State", "StatusValue", { role: "tooltip", type: "string", p: { html: true } }]];

    // FIX: ISO Code Mapping for Google Charts compatibility
    // Internal Code -> Google/ISO 3166-2 Code (IN-XX)
    const ISO_FIXES = {
        "OD": "OR", // Odisha
        "CG": "CT", // Chhattisgarh
        "UK": "UT", // Uttarakhand
        "DD": "DN", // Dadra & Nagar Haveli
        "AN": "AN", // Andaman
        "LD": "LD", // Lakshadweep
        "JK": "JK", // Jammu & Kashmir
        "LA": "LA", // Ladakh !! IMPORTANT
        "TG": "TG", // Telangana
        "AP": "AP",
        "AR": "AR",
        "AS": "AS",
        "BR": "BR",
        "GA": "GA",
        "GJ": "GJ",
        "HR": "HR",
        "HP": "HP",
        "JH": "JH",
        "KA": "KA",
        "KL": "KL",
        "MP": "MP",
        "MH": "MH",
        "MN": "MN",
        "ML": "ML",
        "MZ": "MZ",
        "NL": "NL",
        "PB": "PB",
        "RJ": "RJ",
        "SK": "SK",
        "TN": "TN",
        "TR": "TR",
        "UP": "UP",
        "WB": "WB",
        "DL": "DL",
        "PY": "PY"
    };

    INDIAN_STATES.forEach(state => {
        // Determine status
        const isSynced = isStateSynchronized(state, year, baseYear);
        const isElecting = scheduledStates.includes(state.code);
        const isFailed = failedStates.includes(state.code);

        // Value mapping for coloring
        // --- SYNC MODE ---
        // 0: Unsynchronized (Slate)
        // 1: Synchronized (Green)
        // 2: Election Active (Amber)
        // 3: Election FAILED (Red)

        // --- COST MODE ---
        // 10-100: Gradient of population density (representing relative cost)

        let statusVal = 0;
        let statusText = "Unsynchronized Term";

        if (mode === 'sync') {
            if (isSynced) {
                statusVal = 1;
                statusText = "Synchronized Term";
            }
            if (isElecting) {
                statusVal = 2;
                statusText = "ELECTION ACTIVE THIS YEAR";
            }
            if (isFailed) {
                statusVal = 3;
                statusText = "ELECTION FAILED (Insufficient Resources)";
            }
        } else {
            // Cost Heatmap based on population (which scales cost)
            // Range 10 to 100 based on population relative to UP (highest)
            statusVal = 10 + (state.population / 200000000) * 90;
            statusText = `Estimated Cost: ₹${((state.population / 1200) * 58000 / 10000000).toFixed(1)} Cr`;
        }

        const codeSuffix = ISO_FIXES[state.code] || state.code;
        const isoCode = `IN-${codeSuffix}`;

        const tooltip = `
        <div style="
            padding: 12px; 
            font-family: 'Inter', sans-serif; 
            background: #ffffff; 
            border: 1px solid #e2e8f0; 
            border-radius: 12px; 
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); 
            color: #0f172a;
            font-size: 13px;
        ">
            <div style="font-weight: 800; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; margin-bottom: 6px; color: #4f46e5;">${state.name.toUpperCase()}</div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; gap: 20px;">
                    <span style="color: #64748b; font-size: 10px; font-weight: bold; text-transform: uppercase;">Seats</span>
                    <span style="font-weight: 700;">${state.seats}</span>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 20px;">
                    <span style="color: #64748b; font-size: 10px; font-weight: bold; text-transform: uppercase;">Population</span>
                    <span style="font-weight: 700;">${(state.population / 1000000).toFixed(1)}M</span>
                </div>
                <div style="display: flex; justify-content: space-between; gap: 20px;">
                    <span style="color: #64748b; font-size: 10px; font-weight: bold; text-transform: uppercase;">Status</span>
                    <span style="font-weight: 700; color: ${isSynced ? '#10b981' : isElecting ? '#f59e0b' : '#64748b'}">${statusText}</span>
                </div>
            </div>
            ${isFailed ? '<div style="margin-top: 8px; padding: 4px; background: #fef2f2; color: #ef4444; font-size: 10px; font-weight: 900; text-align: center; border-radius: 4px;">SYSTEM ALERT: RESOURCE SHORTFALL</div>' : ''}
        </div>`;

        data.push([isoCode, statusVal, tooltip]);
    });

    const options = {
        region: "IN", // India
        domain: "IN",
        displayMode: "regions",
        resolution: "provinces",
        colorAxis: mode === 'sync' ? {
            values: [0, 1, 2, 3],
            colors: ["#cbd5e1", "#10b981", "#f59e0b", "#ef4444"], // Slate, Emerald, Amber, Red
        } : {
            values: [10, 100],
            colors: ["#fef2f2", "#991b1b"], // Very light red to dark red
        },
        backgroundColor: "#f8fafc",
        datalessRegionColor: "#f1f5f9",
        defaultColor: "#f5f5f5",
        legend: "none",
        tooltip: { isHtml: true, textStyle: { color: "#334155" }, showColorCode: false, trigger: 'focus' }, // Trigger focus ensures it follows well
        enableRegionInteractivity: true,
    };

    return (
        <div className="w-full h-[500px] bg-slate-50 rounded-xl overflow-hidden relative">
            <Chart
                chartType="GeoChart"
                width="100%"
                height="100%"
                data={data}
                options={options}
                chartEvents={[
                    {
                        eventName: "select",
                        callback: ({ chartWrapper }) => {
                            const chart = chartWrapper.getChart();
                            const selection = chart.getSelection();
                            if (selection.length === 0) return;

                            const regionIdx = selection[0].row;
                            const isoCode = data[regionIdx + 1][0]; // "IN-MH"

                            // Find original state
                            const suffix = isoCode.split("-")[1];
                            const state = INDIAN_STATES.find(s => {
                                const fix = ISO_FIXES[s.code] || s.code;
                                return fix === suffix;
                            });

                            if (state && onStateClick) {
                                onStateClick(state);
                            }

                            // Clear selection to allow re-clicking same state easily
                            chart.setSelection([]);
                        },
                    },
                ]}
            />

            {/* Overlay Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-slate-200 text-[10px] flex flex-col gap-2 z-10 pointer-events-none font-bold">
                {mode === 'sync' ? (
                    <>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-emerald-500 shadow-sm"></div>
                            <span className="text-emerald-700">Synchronized Term</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-amber-500 shadow-sm"></div>
                            <span className="text-amber-700">Election This Year</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-slate-300 shadow-sm"></div>
                            <span className="text-slate-500">Off-Cycle / Misaligned</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-1 text-slate-400 uppercase tracking-widest text-[8px]">Cost Intensity</div>
                        <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-gradient-to-r from-red-50 to-red-800 rounded-full"></div>
                            <span className="text-slate-500 uppercase tracking-tighter">Low → High</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
