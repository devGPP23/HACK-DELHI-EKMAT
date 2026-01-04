import React from 'react';
import { Settings2, RefreshCcw } from 'lucide-react';

export default function ScenarioPanel({ scenario, updateScenario, resetScenario }) {

    const handleSliderChange = (key, value) => {
        updateScenario({ [key]: parseFloat(value) });
    };

    const handleToggleChange = (key, checked) => {
        updateScenario({ [key]: checked });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-indigo-600" />
                    Simulation Parameters
                </h2>
                <button
                    onClick={resetScenario}
                    className="text-xs font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                >
                    <RefreshCcw className="w-3 h-3" /> Reset
                </button>
            </div>

            <div className="space-y-6">

                {/* Government Collapse Probability */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-slate-700">Govt. Collapse Probability</label>
                        <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {(scenario.governmentCollapseProbability * 100).toFixed(0)}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={scenario.governmentCollapseProbability}
                        onChange={(e) => handleSliderChange('governmentCollapseProbability', e.target.value)}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <p className="text-xs text-slate-500">Likelihood of mid-term assembly dissolutions affecting sync.</p>
                </div>

                {/* Security Phases */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-slate-700">Security Phases</label>
                        <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {scenario.securityPhaseCount} Phase(s)
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="7"
                        step="1"
                        value={scenario.securityPhaseCount}
                        onChange={(e) => handleSliderChange('securityPhaseCount', e.target.value)}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <p className="text-xs text-slate-500">Number of election phases (affects security density).</p>
                </div>

                {/* EVM Unit Count */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-slate-700">EVM Units (Millions)</label>
                        <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {(scenario.evmUnitCount / 1000000).toFixed(1)}M
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1000000"
                        max="5000000"
                        step="100000"
                        value={scenario.evmUnitCount}
                        onChange={(e) => handleSliderChange('evmUnitCount', e.target.value)}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>

                {/* Include Local Bodies - Native Checkbox */}
                <div className="flex items-center justify-between py-2 border-t border-slate-100">
                    <span className="text-sm font-medium text-slate-700">Include Local Bodies</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={scenario.includeLocalBodies}
                            onChange={(e) => handleToggleChange('includeLocalBodies', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                        <h4 className="text-xs font-bold text-indigo-700 uppercase mb-1">Scenario Impact</h4>
                        <p className="text-xs text-indigo-800 leading-relaxed">
                            Adjusting probabilities dynamically recalculates the 15-year projection model using Monte Carlo estimations for cost and security load.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
