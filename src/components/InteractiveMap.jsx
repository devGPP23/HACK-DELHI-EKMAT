
import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { INDIAN_STATES } from "../lib/simulationEngine";

const ISO_FIXES = {
    "OD": "OR", "CG": "CT", "UK": "UT", "DD": "DN",
    "JK": "JK", "LA": "LA", "TG": "TG",
    "AN": "AN", "LD": "LD"
};

export default function InteractiveMap() {
    const [region, setRegion] = useState("IN"); // 'IN' or 'IN-MH', etc.
    const [selectedStateData, setSelectedStateData] = useState(null);

    // Prepare data with custom HTML tooltips for the hover effect
    const data = [["State", "Value", { role: "tooltip", type: "string", p: { html: true } }]];

    INDIAN_STATES.forEach(state => {
        const codeSuffix = ISO_FIXES[state.code] || state.code;
        const isoCode = `IN-${codeSuffix}`;

        // Custom Tooltip Design - Minimalist "Inside Boundary" feel
        const tooltipContent = `
            <div style="font-family:sans-serif; background:none; border:none; box-shadow:none; padding:0; pointer-events:none;">
                <div style="
                    background: rgba(255, 255, 255, 0.95); 
                    border: 1px solid rgba(59, 130, 246, 0.5);
                    color: #1e3a8a;
                    padding: 8px 12px;
                    border-radius: 0px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    text-align: center;
                    min-width: 120px;
                ">
                    <strong style="font-size:14px; display:block; margin-bottom:2px;">${state.name}</strong>
                    <span style="font-size:10px; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Click to View Details</span>
                </div>
            </div>
        `;

        data.push([isoCode, 0, tooltipContent]);
    });

    const options = {
        region: "IN",
        domain: "IN",
        displayMode: "regions",
        resolution: "provinces",
        colorAxis: { colors: ["#dbeafe", "#3b82f6"] },
        backgroundColor: { fill: 'transparent' },
        datalessRegionColor: 'transparent',
        defaultColor: "#f8fafc",
        legend: "none",
        // Enable HTML tooltips but remove default browser styles
        tooltip: { isHtml: true, showColorCode: false, trigger: 'focus' },
        enableRegionInteractivity: true,
        keepAspectRatio: true,
    };

    const handleChartSelect = ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length === 0) return;

        const regionIdx = selection[0].row;
        const stateCode = data[regionIdx + 1][0]; // "IN-MH"

        // Clear selection to prevent jumping
        chart.setSelection([]);

        if (region === "IN") {
            setRegion(stateCode); // Trigger overlay

            // Find state data
            const suffix = stateCode.split("-")[1];
            const found = INDIAN_STATES.find(s => {
                const realSuffix = ISO_FIXES[s.code] || s.code;
                return realSuffix === suffix;
            });
            setSelectedStateData(found || { name: "Region Details", population: 0, seats: 0, avgElectionCost: 0 });
        }
    };

    return (
        <div id="interactive-map-container" className="relative w-full h-[400px] md:h-[500px] flex flex-col items-center justify-center p-4">
            <style>{`
                #interactive-map-container svg {
                    filter: drop-shadow(0 10px 20px rgba(59, 130, 246, 0.15)); /* Premium Floating Effect */
                    transform: scale(1.1);
                }
                #interactive-map-container svg path {
                    stroke: #ffffff !important; 
                    stroke-width: 0.8px !important;
                    transition: fill 0.1s ease;
                }
                /* Only hover on valid state paths - This is a best-effort filtering */
                #interactive-map-container svg path:not([fill='transparent']):not([fill='none']):hover {
                    fill: #1e3a8a !important; 
                    cursor: pointer;
                }
                /* COMPLETELY HIDE invisible/background regions (Pakistan, Ocean, etc.) */
                #interactive-map-container svg path[fill='transparent'],
                #interactive-map-container svg path[fill='none'] {
                    display: none !important;
                    pointer-events: none !important;
                }
                
                .google-visualization-tooltip {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                    pointer-events: none !important;
                }
            `}</style>

            <Chart
                chartType="GeoChart"
                width="100%"
                height="100%"
                data={data}
                options={{ ...options, region: "IN" }}
                chartEvents={[{ eventName: "select", callback: handleChartSelect }]}
            />

            {/* Centered Data Overlay */}
            {region !== "IN" && selectedStateData && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="bg-white/95 backdrop-blur-md text-slate-900 p-6 shadow-2xl border border-indigo-100 max-w-sm w-full text-center animate-[zoomIn_0.4s_cubic-bezier(0.16,1,0.3,1)] pointer-events-auto transform transition-all hover:scale-105">
                        <style>{`@keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`}</style>

                        <h3 className="font-bold text-2xl text-indigo-700 mb-4">{selectedStateData.name}</h3>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-left mb-6">
                            <div className="bg-slate-50 p-2">
                                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Population</div>
                                <div className="font-mono font-bold text-lg text-slate-800">{(selectedStateData.population / 1000000).toFixed(1)}M</div>
                            </div>
                            <div className="bg-emerald-50 p-2 border border-emerald-100">
                                <div className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider mb-1">Est. Cost</div>
                                <div className="font-mono font-bold text-lg text-emerald-700">₹{selectedStateData.avgElectionCost} Cr</div>
                            </div>
                            <div className="bg-slate-50 p-2">
                                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">MLA Seats</div>
                                <div className="font-mono font-bold text-lg text-slate-800">{selectedStateData.seats}</div>
                            </div>
                            <div className="bg-slate-50 p-2">
                                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">MP Seats (Est)</div>
                                <div className="font-mono font-bold text-lg text-slate-800">{Math.max(1, Math.round(selectedStateData.seats / 7))}</div>
                            </div>
                        </div>

                        <button
                            onClick={() => { setRegion("IN"); setSelectedStateData(null); }}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold tracking-wide transition shadow-lg shadow-indigo-200"
                        >
                            RETURN TO NATIONAL MAP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
