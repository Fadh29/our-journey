import React, { useState } from 'react';
import { AccessPage } from './components/sections/AccessPage';
import { Navbar } from './components/layout/Navbar';
import { AudioPlayer } from './components/layout/AudioPlayer';
import { LandingSection } from './components/sections/LandingSection';
import { AboutRaihanSection } from './components/sections/AboutRaihanSection';
import { OurStorySection } from './components/sections/OurStorySection';
import { OurFutureSection } from './components/sections/OurFutureSection';
import { FinancialPlannerSection } from './components/financial/FinancialPlannerSection';
import { WeddingBudgetPlanner } from './components/financial/WeddingBudgetPlanner';
import { OurMemoriesSection } from './components/sections/OurMemoriesSection';
import { LetterSection } from './components/sections/LetterSection';
import { ClosingSection } from './components/sections/ClosingSection';
import { Footer } from './components/layout/Footer';
import { initialBudgetCategories, defaultTotalBudget } from './data/budget';
import { BudgetItem } from './types/budget';

export const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('our_journey_unlocked') === 'true';
  });

  // Shared Wedding Budget State
  const [totalWeddingBudget, setTotalWeddingBudget] = useState<number>(defaultTotalBudget);
  const [budgetCategories, setBudgetCategories] = useState<BudgetItem[]>(initialBudgetCategories);

  const handleUnlock = () => {
    sessionStorage.setItem('our_journey_unlocked', 'true');
    setIsUnlocked(true);
  };

  const handleLock = () => {
    sessionStorage.removeItem('our_journey_unlocked');
    setIsUnlocked(false);
  };

  const handleStartJourney = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    const el = document.getElementById('landing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isUnlocked) {
    return <AccessPage onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-[#fdfcfc] text-gray-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      <Navbar onLock={handleLock} />
      
      <main>
        <LandingSection onStartJourney={handleStartJourney} />
        <AboutRaihanSection />
        <OurStorySection />
        <OurFutureSection />
        <FinancialPlannerSection
          budgetCategories={budgetCategories}
          totalWeddingBudget={totalWeddingBudget}
        />
        <WeddingBudgetPlanner
          categories={budgetCategories}
          setCategories={setBudgetCategories}
          totalBudget={totalWeddingBudget}
          setTotalBudget={setTotalWeddingBudget}
        />
        <OurMemoriesSection />
        <LetterSection />
        <ClosingSection onRestart={handleRestart} />
      </main>

      <Footer />
      <AudioPlayer />
    </div>
  );
};

export default App;
