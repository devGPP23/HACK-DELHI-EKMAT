import { useState, useMemo } from 'react';
import { runFullSimulation } from '../lib/simulationEngine';

export function useSimulation() {
    // Default scenario based on doc
    const DEFAULT_SCENARIO = {
        baseYear: 2029,
        governmentCollapseProbability: 0.2,
        securityPhaseCount: 1,
        includeLocalBodies: true,
        evmUnitCount: 3000000,
        evmReplacementCycleYears: 15,
        evmReplacementCost: 10000,
    };

    // State
    const [scenario, setScenario] = useState(DEFAULT_SCENARIO);

    // Memoized results (recalculated only when scenario changes)
    const results = useMemo(() => {
        return runFullSimulation(scenario);
    }, [scenario]);

    // Update scenario
    const updateScenario = (updates) => {
        setScenario(prev => ({ ...prev, ...updates }));
    };

    // Reset to defaults
    const resetScenario = () => {
        setScenario(DEFAULT_SCENARIO);
    };

    return {
        scenario,
        results,
        updateScenario,
        resetScenario,
    };
}
