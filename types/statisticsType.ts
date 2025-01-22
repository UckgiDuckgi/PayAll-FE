import { Category } from './table';

// 소비 분석 탭
export type CategoryExpensesType = {
  id: number;
  categoryName: Category;
  amount: number;
};

export type FixedExpensesType = {
  id: number;
  fixedName: string;
  amount: number;
  dueDate: string;
};

export type StatisticsType = {
  name: string;
  totalSpent: number;
  dateAverage: number;
  difference: number;
  categoryExpenses: CategoryExpensesType[];
  fixedExpenses: FixedExpensesType[];
};

// 소비 목표 탭
export type StatisticsLimitType = {
  limitPrice?: number;
  spentAmount: number;
  savedAmount: number;
  averageSpent: number;
  lastMonthLimit?: number;
  startDate?: string;
  endDate?: string;
};
