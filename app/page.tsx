'use client';

import ProgressBar from '@/components/molecules/GoalProgress';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Goal = {
  limit_amount: number;
  spent_amount: number;
  saved_amount: number;
  start_date: string;
  end_date: string;
};

export default function Home() {
  const MOCK_GOAL: Goal = {
    limit_amount: 1500000,
    spent_amount: 1300000,
    saved_amount: 31010,
    start_date: '2025-01-01',
    end_date: '2025-01-31',
  };

  return (
    <>
      <ProgressBar
        spentAmount={MOCK_GOAL.spent_amount}
        limitAmount={MOCK_GOAL.limit_amount}
        start_date={MOCK_GOAL.start_date}
        end_date={MOCK_GOAL.end_date}
      />
    </>
  );
}
