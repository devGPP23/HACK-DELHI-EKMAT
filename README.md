# EKMAT - The One Nation One Election (ONOE) Simulator 🇮🇳

**EKMAT** ("Unity" in Sanskrit) is a sophisticated simulation engine designed to stress-test the "One Nation, One Election" policy framework. It allows policymakers, researchers, and citizens to visualize the long-term impact of simultaneous elections across India from 2029 to 2044.

![Project Status](https://img.shields.io/badge/Status-Beta-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node%20%7C%20Tailwind-purple)

## 🎯 Problem Statement
Implementing simultaneous elections in a democracy as complex as India involves massive constitutional and logistical challenges. Static reports cannot capture the dynamic nature of government collapses, mid-term dissolutions, and security deployments. EKMAT enables **"Virtual Time Travel"** to test these scenarios before actual implementation.

## 🚀 Key Features

*   **⚡ Quantum Simulation Engine**: Instantly fast-forward through 15 years (3 election cycles) to see long-term synchronization effects.
*   **📜 Constitutional Logic**: Hardcoded implementation of complex legal rules like "Unexpired Term" and "Appointed Date" (per Ithe Justice Kovind Panel Report).
*   **🗺️ Live Geospatial Analytics**: Dynamic, color-coded map of India powered by Google GeoCharts that updates in real-time.
*   **📉 Financial Forecasting**: Quantify cost savings (in ₹ Crores) based on historic ECI expenditure data.
*   **🎲 Chaos Engineering**: Intentionally inject random "Government Collapse" events to test the system's resilience.
*   **👮 Security Logistics**: Calculate peak security personnel (CAPF) deployment loads for synchronized vs. non-synchronized years.

## 🛠️ Technology Stack

| Component | Tech | Usage |
| :--- | :--- | :--- |
| **Frontend** | React.js + Vite | High-performance, reactive UI |
| **Styling** | Tailwind CSS | Modern, responsive design system |
| **Mapping** | Google GeoCharts | Geospatial visualization of 36 States/UTs |
| **Analytics** | Recharts | Dynamic financial and governance charts |
| **Backend** | Node.js | Server-side logic and API handling |
| **Icons** | Lucide React | Clean, consistent iconography |
| **Motion** | Framer Motion | Smooth transitions and state animations |

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/devGP7/HACK-DELHI-EKMAT.git
    cd HACK-DELHI-EKMAT
    ```

2.  **Install Frontend Dependencies**
    ```bash
    cd client
    npm install
    ```

3.  **Install Backend Dependencies** (Optional for local sim)
    ```bash
    cd ../server
    npm install
    ```

4.  **Run the Application**
    Open two terminals:
    *   *Terminal 1 (Client):* `cd client && npm run dev`
    *   *Terminal 2 (Server):* `cd server && node index.js`

5.  **Access the Dashboard**
    Open your browser and navigate to `http://localhost:5173`

## 📊 How It Works

1.  **Set Parameters**: Use the "Chaos Sliders" to define the probability of government collapse (Stability Index).
2.  **Run Simulation**: The algorithm executes the simulation from 2029 to 2044, applying ONOE rules.
3.  **Visualize**: Watch the map of India change colors as states fall out of sync or realign.
4.  **Analyze**: Review the calculated Savings, Governance Days Gained, and Security Load.

## 📚 References & Data Sources

*   **Logic Framework**: Report of the High-Level Committee on One Nation, One Election (2024).
*   **Financial Baseline**: Centre for Media Studies (CMS) Report (2019 General Elections).
*   **Election Data**: Official data from the Election Commission of India (ECI).

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request for any enhancements or bug fixes.

---
*Built with ❤️ for a stronger democracy.*
