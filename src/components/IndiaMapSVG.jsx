import React from "react";
import { Chart } from "react-google-charts";
import { INDIAN_STATES, isStateSynchronized } from "../lib/simulationEngine";

export default function IndiaMapSVG({ year, baseYear, scheduledStates = [], onStateHover }) {

    // Format data for Google Charts
    // Header
    const data = [["State", "StatusValue", { role: "tooltip", type: "string", p: { html: true } }]];

    // FIX: ISO Code Mapping for Google Charts compatibility
    // Internal Code -> Google/ISO 3166-2 Code
    const ISO_FIXES = {
        "OD": "OR", // Odisha (Legacy ISO often OR)
        "CG": "CT", // Chhattisgarh
        "UK": "UT", // Uttarakhand
        "DD": "DN", // Dadra & Nagar Haveli and Daman & Diu (Merged) - if applicable
        // Telangana (TG) usually works, but sometimes requires specific handling if map data is old.
    };

    INDIAN_STATES.forEach(state => {
        // Determine status
        const isSynced = isStateSynchronized(state, year, baseYear);
        const isElecting = scheduledStates.includes(state.code);

        // Value mapping for coloring
        // 0: Unsynchronized (Slate)
        // 1: Synchronized (Green)
        // 2: Election Active (Amber/Red)
        let statusVal = 0;
        let statusText = "Unsynchronized Term";

        if (isSynced) {
            statusVal = 1;
            statusText = "Synchronized Term";
        }
        if (isElecting) {
            statusVal = 2;
            statusText = "ELECTION ACTIVE THIS YEAR";
        }

        // Apply ISO Fix if exists, else use standard code
        const codeSuffix = ISO_FIXES[state.code] || state.code;
        const isoCode = `IN-${codeSuffix}`;

        const tooltip = `
        <div style="padding: 10px; font-family: sans-serif;">
            <strong>${state.name}</strong><br/>
            <span style="color: ${isElecting ? '#d97706' : (isSynced ? '#059669' : '#64748b')}">
                ${statusText}
            </span>
        </div>`;

        data.push([isoCode, statusVal, tooltip]);
    });

    const options = {
        region: "IN", // India
        domain: "IN",
        displayMode: "regions",
        resolution: "provinces",
        colorAxis: {
            values: [0, 1, 2],
            colors: ["#cbd5e1", "#10b981", "#f59e0b"], // Slate, Emerald, Amber
        },
        backgroundColor: "#f8fafc",
        datalessRegionColor: "#f1f5f9",
        defaultColor: "#f5f5f5",
        legend: "none",
        tooltip: { textStyle: { color: "#334155" }, showColorCode: true },
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
                            // Handle click if needed
                        },
                    },
                ]}
            />

            {/* Overlay Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm border border-slate-200 text-xs flex flex-col gap-2 z-10 pointer-events-none">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span>Synchronized Term</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>Election This Year</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                    <span>Off-Cycle / Misaligned</span>
                </div>
            </div>
        </div>
    );
}
