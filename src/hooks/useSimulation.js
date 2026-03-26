import { useState, useMemo, useEffect } from 'react';
import { runFullSimulation } from '../lib/simulationEngine';

export function useSimulation() {
    // Default scenario based on doc
    const DEFAULT_SCENARIO = {
        baseYear: 2029,
        governmentCollapseProbability: 0.2,
        securityPhaseCount: 1,
        includeLocalBodies: true,
        evmReplacementCycleYears: 15,
        evmReplacementCost: 10000,
        reelectionMode: 'random', // 'random' | 'custom'
        customReelections: [], // { stateCode: 'MH', year: 2032 }
        testSimulation: {
            active: false,
            budgetCap: 50000, // ₹ Crores
            securityCap: 1000000, // Personnel (10 Lakh)
            staffCap: 5000000, // Personnel (50 Lakh)
        }
    };

    // State initialized from URL if possible
    const [scenario, setScenario] = useState(() => {
        if (typeof window === 'undefined') return DEFAULT_SCENARIO;
        const params = new URLSearchParams(window.location.search);
        const urlScenario = { ...DEFAULT_SCENARIO };

        // Parse params
        if (params.has('baseYear')) urlScenario.baseYear = parseInt(params.get('baseYear'));
        if (params.has('prob')) urlScenario.governmentCollapseProbability = parseFloat(params.get('prob'));
        if (params.has('phases')) urlScenario.securityPhaseCount = parseInt(params.get('phases'));
        if (params.has('local')) urlScenario.includeLocalBodies = params.get('local') === 'true';

        return urlScenario;
    });

    // Sync state to URL
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams();
        params.set('baseYear', scenario.baseYear);
        params.set('prob', scenario.governmentCollapseProbability);
        params.set('phases', scenario.securityPhaseCount);
        params.set('local', scenario.includeLocalBodies);

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }, [scenario.baseYear, scenario.governmentCollapseProbability, scenario.securityPhaseCount, scenario.includeLocalBodies]);

    // Memoized results (recalculated only when scenario changes)
    const results = useMemo(() => {
        return runFullSimulation(scenario);
    }, [scenario]);

    // Update scenario
    const updateScenario = (updates) => {
        setScenario(prev => ({ ...prev, ...updates }));
    };

    // Toggle custom reelection
    const triggerReelection = (stateCode, year) => {
        setScenario(prev => {
            const exists = prev.customReelections.find(r => r.stateCode === stateCode && r.year === year);
            let newReelections;
            if (exists) {
                newReelections = prev.customReelections.filter(r => r !== exists);
            } else {
                newReelections = [...prev.customReelections, { stateCode, year }];
            }
            return { ...prev, customReelections: newReelections };
        });
    };

    // Reset to defaults
    const resetScenario = () => {
        setScenario(DEFAULT_SCENARIO);
    };

    return {
        scenario,
        results,
        updateScenario,
        triggerReelection,
        resetScenario,
    };
}
