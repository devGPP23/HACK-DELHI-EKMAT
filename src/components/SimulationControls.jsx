import React, { useState } from 'react';
import { Play, Settings, AlertCircle } from 'lucide-react';

const SimulationControls = ({ params, setParams, onRun, loading }) => {

    const [localCapf, setLocalCapf] = useState(params.capf);

    const handleChange = (e) => {
        const val = parseInt(e.target.value);
        setLocalCapf(val);
        setParams({ ...params, capf: val });
    };

    const handlePhaseChange = (p) => {
        setParams({ ...params, phases: p });
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Settings size={20} /> What-If Scenario Sandbox
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Adjust available security forces and election schedule to test feasibility.
                </p>
            </div>

            {/* Slider: CAPF */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">CAPF Companies Available</label>
                    <span className="text-sm font-bold text-eci-blue">{localCapf} Coys</span>
                </div>
                <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={localCapf}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-eci-blue"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Critical Deficit (100)</span>
                    <span>Surplus (5000)</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    <AlertCircle size={12} className="inline mr-1" />
                    Real-world availability for poll duty is approx 3000-4000 companies.
                </p>
            </div>

            {/* Toggles: Phases */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <label className="text-sm font-semibold text-gray-700 mb-3 block">Election Schedule Mode</label>
                <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 5, 7].map(ph => (
                        <button
                            key={ph}
                            onClick={() => handlePhaseChange(ph)}
                            className={`py-2 rounded-md text-sm font-medium transition-colors border
                                ${params.phases === ph
                                    ? 'bg-eci-orange text-white border-eci-orange shadow-md'
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-orange-50'}`}
                        >
                            {ph === 1 ? 'ONOE (1 Day)' : `${ph} Phases`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={onRun}
                disabled={loading}
                className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-white shadow-lg transition-transform active:scale-95
                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-eci-green hover:bg-green-700'}`}
            >
                {loading ? (
                    'Processing Simulation...'
                ) : (
                    <> <Play size={20} /> RUN SIMULATION </>
                )}
            </button>
        </div>
    );
};

export default SimulationControls;
