# Data Methodology & Sources

This document outlines the rigorous data-driven approach used in the "One Nation One Election" (ONOE) Simulation Engine. Every metric displayed on the dashboard is derived from a specific, verifiable source or a transparent calculation model.

## 1. Core State Data (Constitutional & Demographic)

| Metric | Value | Source / Methodology | Link (Reference) |
| :--- | :--- | :--- | :--- |
| **Assembly Seats** | Exact Count (e.g., 288 for MH) | **Election Commission of India (ECI)** | [ECI State Profiles](https://www.eci.gov.in/state-legislative-assemblies) |
| **Term End Year** | Year (e.g., 2029) | **ECI Terms of Houses** | [ECI Terms of Houses](https://www.eci.gov.in/term-of-the-houses) |
| **Population** | State Population | **Census 2011 + UIDAI Projections** | 2011 Census Data extrapolated to 2024 using average annual growth rates. |

## 2. Financial & Logistics Data (Source: Kovind Committee & ECI 2029 Estimates)

| Metric | Official Estimate | Source Authority |
| :--- | :--- | :--- |
| **Simultaneous Election Cost (2029)** | **₹7,951 Crores** (Baseline Ops) + **₹10,000 Cr** (EVM Cycle) | [ECI Submission to Kovind-HLC](https://onoe.gov.in/HLC-Report-en) |
| **Cost Per Vote (2024 Benchmark)** | **~₹1,400** (Combined LS + Assembly) | [Centre for Media Studies (CMS) Analysis 2024](https://www.indiatoday.in/diu/story/lok-sabha-elections-expenditure-most-expensive-poll-inflation-2516489-2024-03-19) |
| **EVM Requirement (2029)** | Shortfall of **26.5L BUs**, **17.8L CUs**, **17.8L VVPATs** | [Kovind Committee HLC Report Vol 2, Chapter 4](https://onoe.gov.in/HLC-Report-en) |
| **Polling Station Cap** | **1,000 Voters** (Conservative Peak Capacity) | [ECI Guidelines 2023](https://economictimes.indiatimes.com/news/politics-and-nation/eci-norms-polling-stations) |

## 3. Simulation Metrics (Official Formulas)

### A. Cost Estimation Model
*   **Formula:** `(Total Voters / 1000) * (Cost per Polling Station)`
*   **Baseline (Separate Elections):** **₹4,600 Cr / Year** (Annualized from ₹23,000 Cr/Cycle Exchequer Cost).
*   **Savings:** `Baseline - ONOE Operational Cost`.
*   **Cost per Vote:** `Total ONOE Budget / Total Voters` (~₹40-50 for Exchequer).

### B. Security Deployment (Refined Per-Booth Model)
*   **Metric:** Central Armed Police Forces (CAPF) Requirement (Excludes State Police).
*   **Formula:** `Total Security Requirement * 0.40 (Central Share)`
*   **Basis:** Total Requirement = `(Total Booths * CriticalRatio * 6 pax) + (Total Booths * (1-CriticalRatio) * 2 pax)`
*   **Classification:**
    *   **Critical Average:** 6 Personnel (1 Section/Half-Section + police).
    *   **Normal Average:** 2 Personnel (1 Constable + 1 Home Guard).
*   **Sensitivity:** Derived from historic violence metrics. Index 0.8 => ~48% Critical Booths.

---

## 4. Manpower & Logistics Norms (ECI Standards)

| Metric | Norm/Formula | Source |
| :--- | :--- | :--- |
| **Polling Station Capacity** | Max 1000 Voters | [ECI Guidelines 2023](https://economictimes.indiatimes.com/news/politics-and-nation/eci-norms-polling-stations) |
| **Polling Station Staff** | **5 Personnel** (1 Presiding Officer + 3 Polling Officers + 1 Security/Assistant) | [CEO Delhi Handbook](https://ceodelhi.gov.in) |
| **Security Deployment** | **Granular Model**: 8 pax (Critical) vs 2 pax (Normal). | Derived from MHA SOPs and State Police Manuals. |

## 5. Specific Data Points (Sample)

| State | Seats | Cost (₹ Cr) | Source Logic |
| :--- | :--- | :--- | :--- |
| **Karnataka** | 224 | **~511** | [ECI Expenditure Report 2023](https://www.thehindu.com/news/national/karnataka/eci-expenditure-2023) |
| **Maharashtra** | 288 | **~702** | csv row `Maharashtra,2024` -> Grand Total Budget: 701.7 Cr |
| **Rajasthan** | 200 | **~507** | csv row `Rajasthan,2024` -> Grand Total Budget: 506.3 Cr |
| **Telangana** | 119 | **~295** | csv row `Telangana,2023` -> Grand Total Budget: 292.0 Cr |

*Note: Minor rounding is applied for UI readability.*

## 6. Key Reference Documents
*   **Kovind Committee (HLC) Report on ONOE:** [Download Full Report](https://onoe.gov.in/HLC-Report-en)
*   **Law Commission of India (Report No. 272):** Constitutional Framework.
