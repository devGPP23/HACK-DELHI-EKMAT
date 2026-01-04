/**
 * ESFIS Technical Architecture - Simulation Engine (Revised for ONOE Logic)
 */

export const INDIAN_STATES = [
    { name: "Andhra Pradesh", code: "AP", id: "AP", seats: 175, currentTermEnd: 2029, avgElectionCost: 500, securitySensitivityIndex: 0.6, population: 49577103 },
    { name: "Arunachal Pradesh", code: "AR", id: "AR", seats: 60, currentTermEnd: 2029, avgElectionCost: 100, securitySensitivityIndex: 0.4, population: 1383727 },
    { name: "Assam", code: "AS", id: "AS", seats: 126, currentTermEnd: 2026, avgElectionCost: 300, securitySensitivityIndex: 0.7, population: 31205576 },
    { name: "Bihar", code: "BR", id: "BR", seats: 243, currentTermEnd: 2030, avgElectionCost: 600, securitySensitivityIndex: 0.8, population: 104099452 },
    { name: "Chhattisgarh", code: "CG", id: "CG", seats: 90, currentTermEnd: 2028, avgElectionCost: 250, securitySensitivityIndex: 0.9, population: 25545198 },
    { name: "Goa", code: "GA", id: "GA", seats: 40, currentTermEnd: 2027, avgElectionCost: 50, securitySensitivityIndex: 0.2, population: 1458545 },
    { name: "Gujarat", code: "GJ", id: "GJ", seats: 182, currentTermEnd: 2027, avgElectionCost: 450, securitySensitivityIndex: 0.4, population: 60439692 },
    { name: "Haryana", code: "HR", id: "HR", seats: 90, currentTermEnd: 2029, avgElectionCost: 200, securitySensitivityIndex: 0.6, population: 25351462 },
    { name: "Himachal Pradesh", code: "HP", id: "HP", seats: 68, currentTermEnd: 2028, avgElectionCost: 150, securitySensitivityIndex: 0.3, population: 6864602 },
    { name: "Jharkhand", code: "JH", id: "JH", seats: 81, currentTermEnd: 2029, avgElectionCost: 250, securitySensitivityIndex: 0.9, population: 32988134 },
    { name: "Karnataka", code: "KA", id: "KA", seats: 224, currentTermEnd: 2028, avgElectionCost: 550, securitySensitivityIndex: 0.5, population: 61095297 },
    { name: "Kerala", code: "KL", id: "KL", seats: 140, currentTermEnd: 2026, avgElectionCost: 350, securitySensitivityIndex: 0.4, population: 33406061 },
    { name: "Madhya Pradesh", code: "MP", id: "MP", seats: 230, currentTermEnd: 2028, avgElectionCost: 580, securitySensitivityIndex: 0.6, population: 72626809 },
    { name: "Maharashtra", code: "MH", id: "MH", seats: 288, currentTermEnd: 2029, avgElectionCost: 800, securitySensitivityIndex: 0.7, population: 112374333 },
    { name: "Manipur", code: "MN", id: "MN", seats: 60, currentTermEnd: 2027, avgElectionCost: 100, securitySensitivityIndex: 0.9, population: 2570390 },
    { name: "Meghalaya", code: "ML", id: "ML", seats: 60, currentTermEnd: 2028, avgElectionCost: 80, securitySensitivityIndex: 0.5, population: 2966889 },
    { name: "Mizoram", code: "MZ", id: "MZ", seats: 40, currentTermEnd: 2028, avgElectionCost: 60, securitySensitivityIndex: 0.3, population: 1097206 },
    { name: "Nagaland", code: "NL", id: "NL", seats: 60, currentTermEnd: 2028, avgElectionCost: 80, securitySensitivityIndex: 0.8, population: 1978502 },
    { name: "Odisha", code: "OD", id: "OD", seats: 147, currentTermEnd: 2029, avgElectionCost: 300, securitySensitivityIndex: 0.6, population: 41974218 },
    { name: "Punjab", code: "PB", id: "PB", seats: 117, currentTermEnd: 2027, avgElectionCost: 280, securitySensitivityIndex: 0.5, population: 27743338 },
    { name: "Rajasthan", code: "RJ", id: "RJ", seats: 200, currentTermEnd: 2028, avgElectionCost: 500, securitySensitivityIndex: 0.5, population: 68548437 },
    { name: "Sikkim", code: "SK", id: "SK", seats: 32, currentTermEnd: 2029, avgElectionCost: 40, securitySensitivityIndex: 0.2, population: 610577 },
    { name: "Tamil Nadu", code: "TN", id: "TN", seats: 234, currentTermEnd: 2026, avgElectionCost: 600, securitySensitivityIndex: 0.4, population: 72147030 },
    { name: "Telangana", code: "TG", id: "TG", seats: 119, currentTermEnd: 2028, avgElectionCost: 350, securitySensitivityIndex: 0.5, population: 35003674 },
    { name: "Tripura", code: "TR", id: "TR", seats: 60, currentTermEnd: 2028, avgElectionCost: 90, securitySensitivityIndex: 0.6, population: 3673917 },
    { name: "Uttar Pradesh", code: "UP", id: "UP", seats: 403, currentTermEnd: 2027, avgElectionCost: 1200, securitySensitivityIndex: 0.8, population: 199812341 },
    { name: "Uttarakhand", code: "UK", id: "UK", seats: 70, currentTermEnd: 2027, avgElectionCost: 150, securitySensitivityIndex: 0.4, population: 10086292 },
    { name: "West Bengal", code: "WB", id: "WB", seats: 294, currentTermEnd: 2026, avgElectionCost: 700, securitySensitivityIndex: 0.8, population: 91276115 },
    { name: "Delhi", code: "DL", id: "DL", seats: 70, currentTermEnd: 2030, avgElectionCost: 200, securitySensitivityIndex: 0.5, population: 16787941 },
    { name: "Puducherry", code: "PY", id: "PY", seats: 30, currentTermEnd: 2026, avgElectionCost: 30, securitySensitivityIndex: 0.2, population: 1247953 },
];

/**
 * Calculates if a state is synchronized in a given year.
 * Under "Unexpired Term" rule, once synchronized, it stays synchronized unless a collapse happens.
 * But even with collapse, the *term end* is synchronized.
 */
export function isStateSynchronized(state, year, baseYear) {
    // Simple check: Is the current year a multiple of 5 from baseYear?
    // AND is this state actually scheduled for an election this year?
    // We'll rely on the simulation result's scheduled elections map for accuracy.

    // For the visualizer (simple check):
    if (year < baseYear) return false;
    return (year - baseYear) % 5 === 0;
}

/**
 * Core Algorithm: Full Discrete Event Simulation
 * Implements "Appointed Date" and "Unexpired Term" logic.
 */
export function runFullSimulation(scenario) {
    const results = [];

    // 1. Initialize State Terms
    // Map of StateCode -> NextElectionYear
    let stateElectionSchedule = {};

    // Initialize from current data
    INDIAN_STATES.forEach(state => {
        stateElectionSchedule[state.code] = state.currentTermEnd;
    });

    const { baseYear } = scenario;
    const SIMULATION_YEARS = 16; // 2029 to 2044

    for (let offset = 0; offset < SIMULATION_YEARS; offset++) {
        const currentYear = baseYear + offset;
        let scheduledStates = [];
        let syncedStateCount = 0;
        let governanceDaysGained = 0;
        let costSavings = 0;
        let securityLoad = 0;
        let warnings = [];

        // --- LOGIC STEP 1: Determine who has elections this year ---

        // Check 1: The "Appointed Date" Synchronization (The Big Bang)
        if (currentYear === baseYear) {
            // Force ALL states to align.
            // Any state whose term ends in 2029 (naturally) OR later (curtailment) goes to polls.
            // Exception: If a state JUST had an election in 2029 itself before the date? 
            // Simplified: Everyone aligns to the Appointed Date.

            scheduledStates = INDIAN_STATES.map(s => s.code);
            syncedStateCount = INDIAN_STATES.length; // 100% Sync
            warnings.push("CREATE: Appointed Date Triggered - All Assemblies Synchronized");

            // Reset all schedules to BaseYear + 5
            INDIAN_STATES.forEach(s => {
                stateElectionSchedule[s.code] = baseYear + 5;
            });

        } else {
            // Normal Operation or Post-Sync Years

            // Identify states due for election
            const statesDue = INDIAN_STATES.filter(s => stateElectionSchedule[s.code] === currentYear);

            // Check 2: Simulated Scenario Injection (Testing Edge Cases)
            // Logic: Slider Maps directly to count. 25% (0.25) = 1 State/Year. 100% = 4 States/Year.
            const potentialCollapseCandidates = INDIAN_STATES.filter(s =>
                stateElectionSchedule[s.code] > currentYear && // Not due this year
                stateElectionSchedule[s.code] <= baseYear + 15 // Within sim
            );

            const collapsedStates = [];
            const targetCollapses = Math.round(scenario.governmentCollapseProbability * 4);

            if (targetCollapses > 0 && potentialCollapseCandidates.length > 0) {
                // Shuffle and pick random states based on target count
                const shuffled = [...potentialCollapseCandidates].sort(() => 0.5 - Math.random());
                const victims = shuffled.slice(0, targetCollapses);

                victims.forEach(state => {
                    collapsedStates.push(state);
                    warnings.push(`Scenario Injection: Mid-term dissolution simulated in ${state.name}. Testing Unexpired Term logic.`);
                });
            }

            // Merge Due + Collapsed
            const allPolls = [...new Set([...statesDue.map(s => s.code), ...collapsedStates.map(s => s.code)])];
            scheduledStates = allPolls;

            // Update Schedules for these states
            allPolls.forEach(stateCode => {
                // "Unexpired Term" Rule:
                // The new term must end when the *original* term was supposed to end.
                // Wait, if it's a regular election (Due), term is +5 years.
                // If it's a By-election/Mid-term (Collapse), term ends at the sync point.

                // Find the Sync Cycle points: 2029, 2034, 2039, 2044...
                const nextSyncPoint = baseYear + (Math.ceil((currentYear + 1 - baseYear) / 5) * 5);

                stateElectionSchedule[stateCode] = nextSyncPoint;
            });

            // Check Synchronization Status
            // A state is synced if its Next Election aligns with a Sync Point (2034, 2039, etc)
            // AND it didn't just have an "off-cycle" election (unless it was the correction election)

            syncedStateCount = INDIAN_STATES.filter(s => {
                const nextElec = stateElectionSchedule[s.code];
                return (nextElec - baseYear) % 5 === 0;
            }).length;
        }

        // --- LOGIC STEP 2: Calculate Metrics ---

        // Governance Days Gained
        const isElectionYear = scheduledStates.length > 0;
        const isSyncYear = (currentYear - baseYear) % 5 === 0;

        let daysGained = 0;
        if (isSyncYear) {
            // It's a general election year.
            // Staggered: 180 days lost. Sync: 90 days lost. Gain: 90.
            daysGained = 90;
        } else {
            // It's an off-year.
            if (scheduledStates.length === 0) {
                // No elections! 
                // Staggered: 180 days lost. Sync: 0 lost. Gain: 180.
                daysGained = 180;
            } else {
                // Mini elections happened (Collapse).
                // Gain is reduced.
                daysGained = 180 - (scheduledStates.length * 15); // Penalty for mini elections
            }
        }

        // Cost Savings
        // Baseline cost per state election: ~500 Cr? (Varies).
        // Let's use avgElectionCost from data.
        const electionCosts = scheduledStates.reduce((acc, code) => {
            const s = INDIAN_STATES.find(st => st.code === code);
            return acc + (s ? s.avgElectionCost : 0);
        }, 0);

        // Staggered Baseline: Assumes full cost + inflation
        // Sync Savings: Shared logistics (EVMS, Security) reduce cost by ~30-40%.
        // Plus, in off-years, cost is 0.

        // We accumulate "Savings" relative to a baseline of "Traditional Chaos".
        // Traditional Chaos Cost ~ 15,000 Cr / year avg total.
        const baselineAnnualCost = 15000;
        let actualYearCost = electionCosts;

        if (isSyncYear) {
            actualYearCost = actualYearCost * 0.7; // Efficiency savings
            actualYearCost += scenario.evmReplacementCost / 3; // Amortized EVM cost
        }

        costSavings = baselineAnnualCost - actualYearCost;


        // Security Peak Demand
        // Sum of population/sensitivity of states going to polls simultaneously.
        let totalSensitivity = 0;
        scheduledStates.forEach(code => {
            const s = INDIAN_STATES.find(st => st.code === code);
            totalSensitivity += (s.securitySensitivityIndex * s.seats); // Proxy for intensity
        });

        // Convert generic intensity to Personnel
        // 1 Unit of Intensity ~ 500 CAPF personnel
        securityLoad = totalSensitivity * 500 * (scenario.securityPhaseCount === 1 ? 1.5 : 1.0);


        // --- OUTPUT ---
        results.push({
            year: currentYear,
            totalGovernanceDaysGained: Math.max(0, Math.round(daysGained)),
            cumulativeCostSavings: Math.round(costSavings),
            securityPeakDemand: Math.round(securityLoad),
            synchronizedStates: syncedStateCount,
            electionsScheduled: scheduledStates, // List of codes
            warnings,
            isSyncYear
        });
    }

    // Post-process for cumulative totals
    let cumDays = 0;
    let cumSavings = 0;
    const finalResults = results.map(r => {
        cumDays += r.totalGovernanceDaysGained;
        cumSavings += r.cumulativeCostSavings;
        return {
            ...r,
            totalGovernanceDaysGained: cumDays,
            cumulativeCostSavings: cumSavings
        };
    });

    return finalResults;
}
