import {
  TargetPlanningState,
  TargetCalculationResult,
  CapacityPlanningState,
  CapacityCalculationResult,
} from '../types/financial';

/**
 * Calculates number of inclusive months between two "YYYY-MM" dates.
 * Example: "2027-01" to "2029-12" returns 36.
 */
export function calculateMonthDifference(startDate: string, targetDate: string): number {
  if (!startDate || !targetDate) return 36;
  const [sYear, sMonth] = startDate.split('-').map(Number);
  const [tYear, tMonth] = targetDate.split('-').map(Number);

  if (isNaN(sYear) || isNaN(sMonth) || isNaN(tYear) || isNaN(tMonth)) return 36;

  const diff = (tYear - sYear) * 12 + (tMonth - sMonth) + 1;
  return diff > 0 ? diff : 1;
}

/**
 * Generates an array of month/year timeline points for Recharts visualization.
 */
function generateProjectionTimeline(
  startDateStr: string,
  durationMonths: number,
  initialSavings: number,
  raihanMonthly: number,
  arumMonthly: number,
  targetAmount: number
) {
  const points = [];
  const [startYear, startMonth] = (startDateStr || '2027-01').split('-').map(Number);

  // Month 0 (Starting point)
  points.push({
    year: startYear,
    monthIndex: 0,
    label: 'Mulai',
    raihanAccumulated: 0,
    arumAccumulated: 0,
    totalAccumulated: Math.round(initialSavings),
    target: Math.round(targetAmount),
  });

  // Calculate sampling interval for readable charts (every 3 or 6 months if long, or every month if short)
  const step = durationMonths <= 12 ? 1 : durationMonths <= 36 ? 3 : 6;

  for (let m = 1; m <= durationMonths; m++) {
    // Check if milestone or end of period
    if (m % step === 0 || m === durationMonths) {
      const currentMonthIndex = (startMonth - 1 + m) % 12 + 1;
      const currentYear = startYear + Math.floor((startMonth - 1 + m) / 12);
      
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const monthLabel = `${monthNames[currentMonthIndex - 1]} '${String(currentYear).slice(2)}`;

      const raihanAcc = Math.round(raihanMonthly * m);
      const arumAcc = Math.round(arumMonthly * m);
      const totalAcc = Math.round(initialSavings + (raihanMonthly + arumMonthly) * m);

      points.push({
        year: currentYear,
        monthIndex: m,
        label: monthLabel,
        raihanAccumulated: raihanAcc,
        arumAccumulated: arumAcc,
        totalAccumulated: totalAcc,
        target: Math.round(targetAmount),
      });
    }
  }

  return points;
}

/**
 * Mode A: Calculate Target-Based Financial Plan
 */
export function calculateTargetPlan(input: TargetPlanningState): TargetCalculationResult {
  const targetAmount = Math.max(0, input.targetAmount || 0);
  const initialSavings = Math.max(0, input.initialSavings || 0);
  const durationMonths = Math.max(1, calculateMonthDifference(input.startDate, input.targetDate));

  // Net required savings
  const netRequired = Math.max(0, targetAmount - initialSavings);

  // Monthly required
  const monthlyTotal = Math.round(netRequired / durationMonths);

  // Split percentages (ensure total 100%)
  const safeRaihanPercent = Math.max(0, Math.min(100, input.raihanPercent));
  const safeArumPercent = 100 - safeRaihanPercent;

  const raihanMonthly = Math.round((monthlyTotal * safeRaihanPercent) / 100);
  const arumMonthly = Math.round((monthlyTotal * safeArumPercent) / 100);

  const projectedTotal = initialSavings + monthlyTotal * durationMonths;
  const progressPercent = targetAmount > 0 
    ? Math.min(100, Math.round((initialSavings / targetAmount) * 1000) / 10) 
    : 100;

  const yearlyProjection = generateProjectionTimeline(
    input.startDate,
    durationMonths,
    initialSavings,
    raihanMonthly,
    arumMonthly,
    targetAmount
  );

  return {
    durationMonths,
    targetAmount,
    initialSavings,
    netRequired,
    monthlyTotal,
    raihanMonthly,
    arumMonthly,
    projectedTotal,
    progressPercent,
    yearlyProjection,
  };
}

/**
 * Mode B: Calculate Capacity-Based Financial Plan
 */
export function calculateCapacityPlan(input: CapacityPlanningState): CapacityCalculationResult {
  const raihanMonthly = Math.max(0, input.raihanMonthly || 0);
  const arumMonthly = Math.max(0, input.arumMonthly || 0);
  const durationMonths = Math.max(1, input.durationMonths || 36);
  const initialSavings = Math.max(0, input.initialSavings || 0);
  const targetAmount = Math.max(0, input.targetAmount || 0);

  const monthlyTotal = raihanMonthly + arumMonthly;
  const projectedTotal = initialSavings + monthlyTotal * durationMonths;

  const deficit = Math.max(0, targetAmount - projectedTotal);
  const progressPercent = targetAmount > 0
    ? Math.min(100, Math.round((projectedTotal / targetAmount) * 1000) / 10)
    : 100;

  let estimatedMonthsToTarget: number | null = null;
  if (monthlyTotal > 0 && targetAmount > initialSavings) {
    estimatedMonthsToTarget = Math.ceil((targetAmount - initialSavings) / monthlyTotal);
  }

  const yearlyProjection = generateProjectionTimeline(
    '2027-01',
    durationMonths,
    initialSavings,
    raihanMonthly,
    arumMonthly,
    targetAmount
  );

  return {
    durationMonths,
    targetAmount,
    initialSavings,
    raihanMonthly,
    arumMonthly,
    monthlyTotal,
    projectedTotal,
    progressPercent,
    deficit,
    estimatedMonthsToTarget,
    yearlyProjection,
  };
}
