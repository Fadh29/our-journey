import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { TargetModePlanner } from './TargetModePlanner';
import { CapacityModePlanner } from './CapacityModePlanner';
import { FinancialCharts } from './FinancialCharts';
import {
  TargetPlanningState,
  CapacityPlanningState,
} from '../../types/financial';
import {
  calculateTargetPlan,
  calculateCapacityPlan,
} from '../../utils/financialCalculator';
import { Target, Zap, FileDown, Info } from 'lucide-react';
import { generateFinancialPlanPDF } from '../../utils/pdfGenerator';
import { BudgetItem } from '../../types/budget';

interface FinancialPlannerSectionProps {
  budgetCategories: BudgetItem[];
  totalWeddingBudget: number;
}

export const FinancialPlannerSection: React.FC<FinancialPlannerSectionProps> = ({
  budgetCategories,
  totalWeddingBudget,
}) => {
  const [activeMode, setActiveMode] = useState<'target' | 'capacity'>('target');

  // Mode A State (Target-based)
  const [targetState, setTargetState] = useState<TargetPlanningState>({
    targetAmount: 60000000,
    startDate: '2027-01',
    targetDate: '2029-12',
    initialSavings: 0,
    raihanPercent: 70,
    arumPercent: 30,
  });

  // Mode B State (Capacity-based)
  const [capacityState, setCapacityState] = useState<CapacityPlanningState>({
    raihanMonthly: 1200000,
    arumMonthly: 500000,
    durationMonths: 36,
    initialSavings: 0,
    targetAmount: 60000000,
  });

  // Real-time calculation results
  const targetResult = useMemo(
    () => calculateTargetPlan(targetState),
    [targetState]
  );

  const capacityResult = useMemo(
    () => calculateCapacityPlan(capacityState),
    [capacityState]
  );

  const handleExportPDF = () => {
    generateFinancialPlanPDF({
      mode: activeMode,
      targetResult: activeMode === 'target' ? targetResult : undefined,
      capacityResult: activeMode === 'capacity' ? capacityResult : undefined,
      budgetCategories,
      totalWeddingBudget,
      startDate: activeMode === 'target' ? targetState.startDate : undefined,
      targetDate: activeMode === 'target' ? targetState.targetDate : undefined,
    });
  };

  return (
    <section id="financial" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        subtitle="Mempersiapkan Masa Depan dengan Rencana Nyata"
        title="Interactive Financial Planner"
        description="Simulasi kalkulasi tabungan bersama yang fleksibel, realistis, dan transparan untuk menyongsong hari pernikahan dan masa depan kita."
      />

      {/* Mode Switcher Tabs & PDF Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-rose-50/70 p-2 rounded-2xl border border-rose-100">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveMode('target')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'target'
                ? 'bg-white text-blush-600 shadow-soft font-semibold'
                : 'text-gray-600 hover:text-blush-600'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Mode A — Target-Based</span>
          </button>

          <button
            onClick={() => setActiveMode('capacity')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'capacity'
                ? 'bg-white text-blush-600 shadow-soft font-semibold'
                : 'text-gray-600 hover:text-blush-600'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Mode B — Capacity-Based</span>
          </button>
        </div>

        {/* Download PDF Button */}
        <button
          onClick={handleExportPDF}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blush-500 to-rose-500 hover:from-blush-600 hover:to-rose-600 text-white font-medium text-xs sm:text-sm shadow-soft flex items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          <span>Unduh Rencana Finansial (PDF)</span>
        </button>
      </div>

      {/* Active Mode Form */}
      {activeMode === 'target' ? (
        <TargetModePlanner
          state={targetState}
          onChange={setTargetState}
          result={targetResult}
        />
      ) : (
        <CapacityModePlanner
          state={capacityState}
          onChange={setCapacityState}
          result={capacityResult}
        />
      )}

      {/* Recharts Visualization */}
      <FinancialCharts
        timelineData={
          activeMode === 'target'
            ? targetResult.yearlyProjection
            : capacityResult.yearlyProjection
        }
        raihanMonthly={
          activeMode === 'target'
            ? targetResult.raihanMonthly
            : capacityResult.raihanMonthly
        }
        arumMonthly={
          activeMode === 'target'
            ? targetResult.arumMonthly
            : capacityResult.arumMonthly
        }
      />

      {/* Simulation Notice */}
      <div className="mt-8 p-4 rounded-2xl bg-white border border-rose-100 flex items-start gap-3 text-xs text-gray-500 shadow-xs">
        <Info className="w-4 h-4 text-blush-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-gray-700">Catatan Simulasi:</strong> Seluruh angka dihitung langsung di peramban browser Anda tanpa bunga, investasi, atau inflasi. Perhitungan ini dirancang sebagai acuan disiplin menabung bersama yang fleksibel dan dapat diubah kapan pun sesuai kesepakatan berdua.
        </p>
      </div>
    </section>
  );
};
