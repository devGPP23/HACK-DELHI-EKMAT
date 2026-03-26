import React, { useState, useRef } from 'react';
import Home from './pages/Home';
import LandingPage from './pages/Landing';
import ImpactAnalysis from './pages/ImpactAnalysis';
import SimulationLogic from './pages/SimulationLogic'; /* Import New Page */
import DemoSection from './components/DemoSection';
import ScrollReveal from './components/ScrollReveal';
import Footer from './components/Footer';

import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [view, setView] = useState('main');

  const scrollToSimulation = () => {
    const element = document.getElementById('simulation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="font-sans antialiased bg-slate-50">

        {view === 'impact' ? (
          <ImpactAnalysis onBack={() => setView('main')} />
        ) : view === 'logic' ? (
          <SimulationLogic onBack={() => setView('main')} />
        ) : (
          <>
            <LandingPage
              onStart={scrollToSimulation}
              onImpact={() => setView('impact')}
            />

            <ScrollReveal>
              <DemoSection />
            </ScrollReveal>

            <ScrollReveal>
              <div id="simulation">
                <Home />
              </div>
            </ScrollReveal>

            <Footer onNavigate={setView} />
          </>
        )}

      </div>
    </LanguageProvider>
  );
}

export default App;
