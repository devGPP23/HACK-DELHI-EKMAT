/**
 * ESFIS Technical Architecture - Simulation Engine (Revised for ONOE Logic)
 */

export const INDIAN_STATES = [
    // --- SOUTH ---
    { name: "Andhra Pradesh", code: "AP", id: "AP", seats: 175, currentTermEnd: 2029, avgElectionCost: 450, securitySensitivityIndex: 0.6, population: 49577103 }, // Est. 2024
    { name: "Karnataka", code: "KA", id: "KA", seats: 224, currentTermEnd: 2028, avgElectionCost: 511, securitySensitivityIndex: 0.5, population: 61095297 }, // Actual 2023 (ECI)
    { name: "Kerala", code: "KL", id: "KL", seats: 140, currentTermEnd: 2026, avgElectionCost: 376, securitySensitivityIndex: 0.6, population: 33406061 }, // Est. 2021
    { name: "Tamil Nadu", code: "TN", id: "TN", seats: 234, currentTermEnd: 2026, avgElectionCost: 390, securitySensitivityIndex: 0.4, population: 72147030 },
    { name: "Telangana", code: "TG", id: "TG", seats: 119, currentTermEnd: 2028, avgElectionCost: 295, securitySensitivityIndex: 0.5, population: 35003674 },

    // --- WEST ---
    { name: "Goa", code: "GA", id: "GA", seats: 40, currentTermEnd: 2027, avgElectionCost: 27, securitySensitivityIndex: 0.3, population: 1458545 },
    { name: "Gujarat", code: "GJ", id: "GJ", seats: 182, currentTermEnd: 2027, avgElectionCost: 286, securitySensitivityIndex: 0.4, population: 60439692 },
    { name: "Maharashtra", code: "MH", id: "MH", seats: 288, currentTermEnd: 2029, avgElectionCost: 702, securitySensitivityIndex: 0.5, population: 112374333 },
    { name: "Rajasthan", code: "RJ", id: "RJ", seats: 200, currentTermEnd: 2028, avgElectionCost: 507, securitySensitivityIndex: 0.6, population: 68548437 },

    // --- NORTH ---
    { name: "Delhi", code: "DL", id: "DL", seats: 70, currentTermEnd: 2025, avgElectionCost: 200, securitySensitivityIndex: 0.5, population: 16787941 },
    { name: "Haryana", code: "HR", id: "HR", seats: 90, currentTermEnd: 2029, avgElectionCost: 256, securitySensitivityIndex: 0.6, population: 25351462 },
    { name: "Himachal Pradesh", code: "HP", id: "HP", seats: 68, currentTermEnd: 2027, avgElectionCost: 93, securitySensitivityIndex: 0.4, population: 6864602 },
    { name: "Jammu and Kashmir", code: "JK", id: "JK", seats: 90, currentTermEnd: 2029, avgElectionCost: 350, securitySensitivityIndex: 0.95, population: 12267013 }, // High Security Est
    { name: "Ladakh", code: "LA", id: "LA", seats: 0, currentTermEnd: 2029, avgElectionCost: 15, securitySensitivityIndex: 0.6, population: 274289 },
    { name: "Punjab", code: "PB", id: "PB", seats: 117, currentTermEnd: 2027, avgElectionCost: 280, securitySensitivityIndex: 0.6, population: 27743338 },
    { name: "Uttar Pradesh", code: "UP", id: "UP", seats: 403, currentTermEnd: 2027, avgElectionCost: 1050, securitySensitivityIndex: 0.8, population: 199812341 },
    { name: "Uttarakhand", code: "UK", id: "UK", seats: 70, currentTermEnd: 2027, avgElectionCost: 135, securitySensitivityIndex: 0.5, population: 10086292 },

    // --- EAST ---
    { name: "Bihar", code: "BR", id: "BR", seats: 243, currentTermEnd: 2025, avgElectionCost: 450, securitySensitivityIndex: 0.85, population: 104099452 },
    { name: "Chhattisgarh", code: "CG", id: "CG", seats: 90, currentTermEnd: 2028, avgElectionCost: 360, securitySensitivityIndex: 0.85, population: 25545198 },
    { name: "Jharkhand", code: "JH", id: "JH", seats: 81, currentTermEnd: 2029, avgElectionCost: 312, securitySensitivityIndex: 0.8, population: 32988134 },
    { name: "Odisha", code: "OD", id: "OD", seats: 147, currentTermEnd: 2029, avgElectionCost: 223, securitySensitivityIndex: 0.5, population: 41974218 },
    { name: "West Bengal", code: "WB", id: "WB", seats: 294, currentTermEnd: 2026, avgElectionCost: 755, securitySensitivityIndex: 0.85, population: 91276115 },
    { name: "Sikkim", code: "SK", id: "SK", seats: 32, currentTermEnd: 2029, avgElectionCost: 14, securitySensitivityIndex: 0.3, population: 610577 },

    // --- CENTRAL ---
    { name: "Madhya Pradesh", code: "MP", id: "MP", seats: 230, currentTermEnd: 2028, avgElectionCost: 495, securitySensitivityIndex: 0.6, population: 72626809 },

    // --- NORTH EAST ---
    { name: "Arunachal Pradesh", code: "AR", id: "AR", seats: 60, currentTermEnd: 2029, avgElectionCost: 44, securitySensitivityIndex: 0.7, population: 1383727 }, // CSV: ~43.8 Cr
    { name: "Assam", code: "AS", id: "AS", seats: 126, currentTermEnd: 2026, avgElectionCost: 255, securitySensitivityIndex: 0.7, population: 31205576 }, // CSV: ~254 Cr
    { name: "Manipur", code: "MN", id: "MN", seats: 60, currentTermEnd: 2027, avgElectionCost: 142, securitySensitivityIndex: 0.95, population: 2570390 }, // CSV: ~141 Cr, Very High Sec Ratio
    { name: "Meghalaya", code: "ML", id: "ML", seats: 60, currentTermEnd: 2028, avgElectionCost: 60, securitySensitivityIndex: 0.6, population: 2966889 }, // CSV: ~59.8 Cr
    { name: "Mizoram", code: "MZ", id: "MZ", seats: 40, currentTermEnd: 2028, avgElectionCost: 25, securitySensitivityIndex: 0.5, population: 1097206 }, // CSV: ~24.3 Cr
    { name: "Nagaland", code: "NL", id: "NL", seats: 60, currentTermEnd: 2028, avgElectionCost: 125, securitySensitivityIndex: 0.9, population: 1978502 }, // CSV: ~125 Cr
    { name: "Tripura", code: "TR", id: "TR", seats: 60, currentTermEnd: 2028, avgElectionCost: 159, securitySensitivityIndex: 0.8, population: 3673917 }, // CSV: ~158.7 Cr

    // --- UTs ---
    { name: "Andaman and Nicobar Islands", code: "AN", id: "AN", seats: 0, currentTermEnd: 2029, avgElectionCost: 10, securitySensitivityIndex: 0.3, population: 380581 },
    { name: "Lakshadweep", code: "LD", id: "LD", seats: 0, currentTermEnd: 2029, avgElectionCost: 5, securitySensitivityIndex: 0.2, population: 64473 },
    { name: "Puducherry", code: "PY", id: "PY", seats: 30, currentTermEnd: 2026, avgElectionCost: 35, securitySensitivityIndex: 0.3, population: 1247953 },
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
            const { customReelections, reelectionMode } = scenario;

            // Mode-specific Logic
            if (reelectionMode === 'custom') {
                // 1. Process Custom Manual Triggers ONLY
                if (customReelections && customReelections.length > 0) {
                    const manualTriggers = customReelections.filter(r => r.year === currentYear);
                    manualTriggers.forEach(r => {
                        if (stateElectionSchedule[r.stateCode] !== currentYear) {
                            const s = INDIAN_STATES.find(st => st.code === r.stateCode);
                            if (s) {
                                collapsedStates.push(s);
                                warnings.push(`MANUAL INTERVENTION: Re-election triggered in ${s.name}`);
                            }
                        }
                    });
                }
            } else {
                // 2. Random Chaos ONLY (Default)
                const targetCollapses = Math.round(scenario.governmentCollapseProbability * 4);

                if (targetCollapses > 0 && potentialCollapseCandidates.length > 0) {
                    // Shuffle and pick random states based on target count
                    const shuffled = [...potentialCollapseCandidates].sort(() => 0.5 - Math.random());
                    const victims = shuffled.slice(0, targetCollapses);

                    victims.forEach(state => {
                        collapsedStates.push(state);
                        warnings.push(`Scenario Injection: Mid-term dissolution simulated in ${state.name}.`);
                    });
                }
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

        // --- LOGIC STEP 2: Calculate Metrics (Based on Kovind HLC Formulas) ---

        // Governance Days Gained
        const isElectionYear = scheduledStates.length > 0;
        const isSyncYear = (currentYear - baseYear) % 5 === 0;

        let daysGained = 0;
        if (isSyncYear) {
            daysGained = 90; // Sync: 90 days lost. Gain: 90 (vs 180).
        } else {
            if (scheduledStates.length === 0) {
                daysGained = 180; // No elections! Gain: 180.
            } else {
                daysGained = 180 - (scheduledStates.length * 15); // Penalty for mini elections
            }
        }

        // --- HLC COST MODEL IMPLEMENTATION ---

        let calculatedOpsCost = 0;
        let simYearPollingStations = 0;

        scheduledStates.forEach(code => {
            const s = INDIAN_STATES.find(st => st.code === code);
            if (s) {
                // 1. Polling Stations Needed (Cap 1200 voters per ECI 2024 rule)
                // Using Population as approx for Electorate (conservative estimate)
                const stations = Math.ceil(s.population / 1200);
                simYearPollingStations += stations;

                // 2. Operational Cost Per Station
                // Derived from ECI Estimate of ₹7,951 Cr for 13.6L Stations
                // Avg Ops Cost = ₹58,500 per station
                calculatedOpsCost += (stations * 58500);
            }
        });

        // Convert to Crores
        let actualYearCost = calculatedOpsCost / 10000000;

        if (offset === 0) {
            // INITIAL SETUP SPIKE: ECI 2029 Estimate
            // "Rs 10,000 crore every 15 years for new EVMs"
            const evmProcurementCost = 10000;
            actualYearCost += evmProcurementCost;
        }
        else if (isSyncYear) {
            // In recurring Sync years, we save on Logistics Synergy
            // Law Commission: 30% reduction in recurring expenditure
            actualYearCost = actualYearCost * 0.7;
            // Plus annual maintenance 10% of CapEx
            actualYearCost += (10000 * 0.1);
        }

        // --- SECURITY DEMAND (Refined Per-Booth Model) ---
        // Based on Feedback: "11M is too high".
        // New Logic: Population -> Booths -> (Critical vs Normal) -> Personnel
        let requiredPersonnel = 0;

        scheduledStates.forEach(code => {
            const s = INDIAN_STATES.find(st => st.code === code);

            // 1. Dynamic Population Growth
            // Assume 1.5% growth per year from base
            const growthFactor = Math.pow(1.015, offset);
            const projectedPop = s.population * growthFactor;

            // 2. Booths (1000 voters per booth - Conservative Peak)
            const stations = Math.ceil(projectedPop / 1000);

            // 3. Classification
            // Treat Sensitivity Index (0.2 to 0.95) as "Ratio of Critical Stations"
            // Cap Critical Ratio at 50% for realism (Even in heavy LWE, not every booth is hyper-critical)
            // But let's map Index 0.0->1.0 to Ratio 0.0->0.6
            const criticalRatio = Math.min(0.6, s.securitySensitivityIndex * 0.6);
            const normalRatio = 1 - criticalRatio;

            // 4. Manpower Norms (Tighter Realism)
            // Critical: Avg 6 pax (2 Police + 4 CPF Half-Section).
            // Normal: Avg 2 pax (1 Constable + 1 Home Guard).
            const criticalForce = stations * criticalRatio * 6;
            const normalForce = stations * normalRatio * 2;

            requiredPersonnel += (criticalForce + normalForce);
        });

        // --- CALIBRATING TOTAL ECONOMIC COST FOR STRESS TEST ---
        // Ops Cost (above) covers Infra/Logistics. 
        // We need to add Security Deployment + Civil Staff Pay to get the "30-35k Cr" Reality.

        // Security Cost Estimate:
        // ~25 Lakh Personnel * ~₹20,000 avg deployment cost (Travel + DA + Accomm for election period)
        // 25,00,000 * 20,000 = ₹5,000 Cr.
        const estimatedSecurityCost = (requiredPersonnel || 2500000) * 20000 / 10000000;

        // Staff Cost Estimate:
        // ~1.1 Cr Staff * ~₹10,000 avg honorarium/training/travel
        // 1,10,00,000 * 10,000 = ₹11,000 Cr.
        // Wait, activeStaff calc is below. Let's approx based on stations.
        // Stations ~ 14 Lakh. Staff ~ 70 Lakh. 
        // 70,00,000 * ₹5,000 = ₹3,500 Cr.
        const estimatedStaffCost = (simYearPollingStations * 5) * 5000 / 10000000;

        // Total Budget Requirement (Stress Test Metric)
        // = Ops (7951) + EVM (10000) + Security (5000) + Staff (3500) = ~26.5k Cr.
        // + Buffer/Contingency (15%) = ~30.5k Cr.
        const totalEconomicCost = actualYearCost + estimatedSecurityCost + estimatedStaffCost;

        // Baseline: "Official Exchequer Cost" (HLC Report Data)
        // Separate Elections Cycle (5 Years): ~₹8,000 Cr (LS) + ~₹15,000 Cr (States) = ₹23,000 Cr.
        // Annualized Baseline: ₹23,000 / 5 = ₹4,600 Cr / Year.
        const baselineAnnualCost = 4600;

        costSavings = baselineAnnualCost - actualYearCost;




        // Bifurcation for Display (User Request: Remove State Police)
        // Assume 60% State Police, 40% Central (CAPF)
        securityLoad = requiredPersonnel * 0.40; // Only CAPF counts for display


        // --- LOGISTICS METRICS ---
        let activePopulation = 0;
        scheduledStates.forEach(code => {
            const s = INDIAN_STATES.find(st => st.code === code);
            if (s) activePopulation += s.population;
        });
        const activePollingStations = Math.ceil(activePopulation / 1000);
        const activeEVMs = Math.ceil(activePollingStations * 1.5); // 1.5 units per station (CU+BU+Spare)
        const activeStaff = activePollingStations * 5; // 5 personnel per station

        // --- STRESS TEST SIMULATION (NEW) ---
        let failedStateCodes = [];
        const { testSimulation } = scenario;

        if (testSimulation && testSimulation.active) {
            // 1. Calculate Demands Per State
            const stateDemands = scheduledStates.map(code => {
                const s = INDIAN_STATES.find(st => st.code === code);
                if (!s) return null;

                // Security
                // Security (Updated to new logic)
                const growthFactor = Math.pow(1.015, offset);
                const projectedPop = s.population * growthFactor;
                const stations = Math.ceil(projectedPop / 1000);
                const criticalRatio = Math.min(0.6, s.securitySensitivityIndex * 0.6);
                const secDemand = (stations * criticalRatio * 6) + (stations * (1 - criticalRatio) * 2);

                // Staff
                const staffDemand = stations * 5; // 5 per station
                // Cost
                // Cost Demand (Proportional share of Total Economic Cost)
                // We allocate the ~30k Cr total based on population ratio
                const ratio = s.population / activePopulation;
                let costDemand = totalEconomicCost * ratio;

                return { code, secDemand, staffDemand, costDemand, sensitivity: s.securitySensitivityIndex };
            }).filter(Boolean);

            // 2. Aggregate & Check vs Caps
            let currentSec = securityLoad; // Use the main calculation
            let currentStaff = stateDemands.reduce((sum, s) => sum + s.staffDemand, 0);
            let currentCost = totalEconomicCost; // Use calculated Total Economic Cost (~30k Cr)

            // 3. Failure Logic: If Demands > Caps
            const isSecFail = currentSec > testSimulation.securityCap;
            const isStaffFail = currentStaff > testSimulation.staffCap;
            const isCostFail = currentCost > testSimulation.budgetCap;

            if (isSecFail || isStaffFail || isCostFail) {
                // Strategy: Fail the "Most Expensive/Risky" states first to save resources for the rest?
                // Or Fail Randomly? 
                // "Sort by Sensitivity Descending" -> Fail the hardest ones first.
                stateDemands.sort((a, b) => b.sensitivity - a.sensitivity);

                stateDemands.forEach(sd => {
                    let fail = false;
                    // Check if *removing* this state helps? 
                    // Simple heuristic: If we are in deficit, this state fails.
                    // We assume we allocate to "Easiest" first. So "Hardest" are at end of allocation queue?
                    // Actually, sorting by sensitivity Descending puts Hardest at 0.
                    // If we allocate to [Last...First], satisfied.
                    // If we allocate to [First...Last], satisfied?
                    // Let's say we prioritize SAFETY. We secure Highly Sensitive first? 
                    // If we secure Sensitive first, we run out for Safe states. 
                    // Visual Result: Safe states fail.
                    // If we prioritize SUCCESS COUNT. We secure Safe first. Sensitive fail.
                    // I will prioritize SUCCESS COUNT (Fail High Risk).

                    if (currentSec > testSimulation.securityCap) {
                        currentSec -= sd.secDemand;
                        fail = true;
                        warnings.push(`FAILURE: ${sd.code} election failed due to Security shortage.`);
                    }
                    // Independent checks, can fail for multiple reasons
                    if (currentStaff > testSimulation.staffCap) {
                        currentStaff -= sd.staffDemand;
                        fail = true;
                        if (!failedStateCodes.includes(sd.code)) warnings.push(`FAILURE: ${sd.code} election failed due to Staff shortage.`);
                    }
                    // For Budget, it's global, but we attribute failure to states sequentially
                    // Use 'totalEconomicCost' (Ops + Sec + Staff) for comparison vs Cap
                    // We need to estimate 'currentCost' accumulating
                    // Let's retry: currentCost sums up 'costDemand' which needs to be calculated
                    if (currentCost > testSimulation.budgetCap) {
                        currentCost -= sd.costDemand;
                        fail = true;
                        if (!failedStateCodes.includes(sd.code)) warnings.push(`FAILURE: ${sd.code} election failed due to Budget shortage.`);
                    }

                    if (fail) failedStateCodes.push(sd.code);
                });
            }
        }

        // --- OUTPUT ---
        results.push({
            year: currentYear,
            totalGovernanceDaysGained: Math.max(0, Math.round(daysGained)),
            cumulativeCostSavings: Math.round(costSavings), // This is annual delta in this loop
            securityPeakDemand: Math.round(securityLoad),
            synchronizedStates: syncedStateCount,
            electionsScheduled: scheduledStates, // List of codes
            warnings,
            isSyncYear,
            // New Metrics
            annualActualCost: Math.round(actualYearCost),
            annualBaselineCost: Math.round(baselineAnnualCost),
            evmUnits: activeEVMs,
            pollStaff: activeStaff,
            failedElections: failedStateCodes,
            totalEconomicCost: Math.round(totalEconomicCost) // Export for UI // NEW: List of failed state codes
        });
    }

    // Post-process for cumulative totals
    let cumDays = 0;
    let cumSavings = 0;
    let cumActualCost = 0;
    let cumBaselineCost = 0;

    const finalResults = results.map(r => {
        cumDays += r.totalGovernanceDaysGained;
        cumSavings += r.cumulativeCostSavings; // r.cumulativeCostSavings was actually annual delta above
        cumActualCost += r.annualActualCost;
        cumBaselineCost += r.annualBaselineCost;

        return {
            ...r,
            totalGovernanceDaysGained: cumDays,
            cumulativeCostSavings: cumSavings,
            cumulativeActualCost: cumActualCost,
            cumulativeBaselineCost: cumBaselineCost
        };
    });

    return finalResults;
}
