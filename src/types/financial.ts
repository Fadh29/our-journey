export interface TargetPlanningState {
  targetAmount: number;
  startDate: string; // YYYY-MM
  targetDate: string; // YYYY-MM
  initialSavings: number;
  raihanPercent: number; // e.g. 70
  arumPercent: number; // e.g. 30
}

export interface CapacityPlanningState {
  raihanMonthly: number;
  arumMonthly: number;
  durationMonths: number;
  initialSavings: number;
  targetAmount: number;
}

export interface TargetCalculationResult {
  durationMonths: number;
  targetAmount: number;
  initialSavings: number;
  netRequired: number;
  monthlyTotal: number;
  raihanMonthly: number;
  arumMonthly: number;
  projectedTotal: number;
  progressPercent: number;
  yearlyProjection: {
    year: number;
    monthIndex: number;
    label: string;
    raihanAccumulated: number;
    arumAccumulated: number;
    totalAccumulated: number;
    target: number;
  }[];
}

export interface CapacityCalculationResult {
  durationMonths: number;
  targetAmount: number;
  initialSavings: number;
  raihanMonthly: number;
  arumMonthly: number;
  monthlyTotal: number;
  projectedTotal: number;
  progressPercent: number;
  deficit: number;
  estimatedMonthsToTarget: number | null;
  yearlyProjection: {
    year: number;
    monthIndex: number;
    label: string;
    raihanAccumulated: number;
    arumAccumulated: number;
    totalAccumulated: number;
    target: number;
  }[];
}
