export interface BudgetItem {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  color?: string;
  isCustom?: boolean;
}

export interface BudgetSummary {
  totalBudget: number;
  allocatedAmount: number;
  allocatedPercentage: number;
  remainingAmount: number;
  remainingPercentage: number;
  isValid: boolean; // exactly 100%
}
