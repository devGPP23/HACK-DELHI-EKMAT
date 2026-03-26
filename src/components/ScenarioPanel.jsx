import React from 'react';
import { Settings2, RefreshCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ScenarioPanel({ scenario, updateScenario, resetScenario }) {
    const { t } = useLanguage();

    const handleSliderChange = (key, value) => {
        updateScenario({ [key]: parseFloat(value) });
    };

    const handleToggleChange = (key, checked) => {
        updateScenario({ [key]: checked });
    };

    return (
        <div className="bg-slate-50 border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-indigo-600" />
                    {t('simParams')}
                </h2>
                <button
                    onClick={resetScenario}
                    className="text-xs font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                >
                    <RefreshCcw className="w-3 h-3" /> {t('reset')}
                </button>
            </div>

            {/* QUICK PRESETS */}
            <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Quick Scenario Presets
                </div>
                <div className="p-2 grid grid-cols-3 gap-2">
                    <button
                        onClick={() => updateScenario({ governmentCollapseProbability: 0, securityPhaseCount: 5, includeLocalBodies: true })}
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all border border-emerald-100 flex flex-col items-center gap-1 group"
                    >
                        <span className="text-[10px] font-black leading-none uppercase group-hover:scale-110 transition-transform">Ideal</span>
                        <span className="text-[8px] opacity-60 font-bold uppercase">Stable</span>
                    </button>
                    <button
                        onClick={() => updateScenario({ governmentCollapseProbability: 0.1, securityPhaseCount: 3, includeLocalBodies: false })}
                        className="p-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all border border-indigo-100 flex flex-col items-center gap-1 group"
                    >
                        <span className="text-[10px] font-black leading-none uppercase group-hover:scale-110 transition-transform">Real</span>
                        <span className="text-[8px] opacity-60 font-bold uppercase">Friction</span>
                    </button>
                    <button
                        onClick={() => updateScenario({ governmentCollapseProbability: 0.4, securityPhaseCount: 1, includeLocalBodies: true })}
                        className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-all border border-red-100 flex flex-col items-center gap-1 group"
                    >
                        <span className="text-[10px] font-black leading-none uppercase group-hover:scale-110 transition-transform">Chaos</span>
                        <span className="text-[8px] opacity-60 font-bold uppercase">Critical</span>
                    </button>
                </div>
            </div>

            <div className="space-y-6">

                {/* Re-election Strategy Mode */}
                <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-semibold mb-6">
                    <button
                        onClick={() => updateScenario({ reelectionMode: 'random' })}
                        className={`flex-1 py-2 rounded-md transition-colors ${scenario.reelectionMode !== 'custom' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {t('randomChaos')}
                    </button>
                    <button
                        onClick={() => updateScenario({ reelectionMode: 'custom' })}
                        className={`flex-1 py-2 rounded-md transition-colors ${scenario.reelectionMode === 'custom' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {t('customManual')}
                    </button>
                </div>

                {/* Government Collapse Probability (Visible only in Random Mode) */}
                <div className={`space-y-3 ${scenario.reelectionMode === 'custom' ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-slate-700">{t('govtCollapseProb')}</label>
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
                    <p className="text-xs text-slate-500">{t('probDesc')}</p>
                </div>

                {/* Manual Mode Helper (Visible only in Custom Mode) */}
                {scenario.reelectionMode === 'custom' && (
                    <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
                        <strong>{t('manualModeActive')}</strong> {t('manualModeDesc')}
                    </div>
                )}

                {/* Security Phases */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-slate-700">{t('securityPhases')}</label>
                        <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {scenario.securityPhaseCount} {t('phases')}
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
                    <p className="text-xs text-slate-500">{t('phaseDesc')}</p>
                </div>

                {/* EVM Unit Count */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-slate-700">{t('evmUnits')}</label>
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
                    <span className="text-sm font-medium text-slate-700">{t('includeLocalBodies')}</span>
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

                <div className="pt-4 border-t border-slate-100 mt-6">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                        <span>{t('stressTest')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={scenario.testSimulation.active}
                                onChange={(e) => updateScenario({ testSimulation: { ...scenario.testSimulation, active: e.target.checked } })}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
                        </label>
                    </h4>

                    {scenario.testSimulation.active && (
                        <div className="space-y-4 animate-in slide-in-from-top-2">
                            {/* Budget Cap */}
                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-xs font-medium text-slate-600">{t('budgetCap')}</label>
                                    <span className="text-xs font-mono">{scenario.testSimulation.budgetCap.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="5000"
                                    max="100000"
                                    step="1000"
                                    value={scenario.testSimulation.budgetCap}
                                    onChange={(e) => updateScenario({ testSimulation: { ...scenario.testSimulation, budgetCap: parseFloat(e.target.value) } })}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                />
                            </div>

                            {/* Security Cap */}
                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-xs font-medium text-slate-600">{t('securityLimit')}</label>
                                    <span className="text-xs font-mono">{(scenario.testSimulation.securityCap / 100000).toFixed(1)}L</span>
                                </div>
                                <input
                                    type="range"
                                    min="100000"
                                    max="5000000"
                                    step="50000"
                                    value={scenario.testSimulation.securityCap}
                                    onChange={(e) => updateScenario({ testSimulation: { ...scenario.testSimulation, securityCap: parseFloat(e.target.value) } })}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                />
                            </div>

                            {/* Staff Cap */}
                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-xs font-medium text-slate-600">{t('civilStaffLimit')}</label>
                                    <span className="text-xs font-mono">{(scenario.testSimulation.staffCap / 100000).toFixed(1)}L</span>
                                </div>
                                <input
                                    type="range"
                                    min="500000"
                                    max="10000000"
                                    step="100000"
                                    value={scenario.testSimulation.staffCap}
                                    onChange={(e) => updateScenario({ testSimulation: { ...scenario.testSimulation, staffCap: parseFloat(e.target.value) } })}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                />
                            </div>

                            <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded">
                                {t('stressTestDesc')}
                            </p>
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                        <h4 className="text-xs font-bold text-indigo-700 uppercase mb-1">{t('scenarioImpact')}</h4>
                        <p className="text-xs text-indigo-800 leading-relaxed">
                            {t('impactDesc')}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
