'use client';

import PaymentCard from '@/components/molcules/PaymentCard';
import CategoryChart from '@/components/molcules/ui/CategoryChart';

export type CategoryExpense = {
  category_id: number;
  category: string;
  amount: number;
};

type FixedExpense = {
  fixed_name: string;
  amount: number;
  due_date: string;
};

type Stat = {
  date: string;
  total_spent: number;
  date_average: number;
  difference: number;
  category_expenses: CategoryExpense[];
  fixed_expenses: FixedExpense[];
};

function page() {
  const MOCK_STAT: Stat = {
    date: '2025-01',
    total_spent: 832000,
    date_average: 63500,
    difference: -18230,
    category_expenses: [
      { category_id: 1, category: '식비', amount: 300000 },
      { category_id: 2, category: '숙소비', amount: 200000 },
      { category_id: 3, category: '생활,가정', amount: 100000 },
    ],
    fixed_expenses: [
      { fixed_name: '쿠팡 와우', amount: 24000, due_date: '2025-01-06' },
      { fixed_name: '쿠팡 와우', amount: 400000, due_date: '2025-01-08' },
      { fixed_name: '쿠팡 와우', amount: 24000, due_date: '2025-01-11' },
    ],
  };

  return (
    <>
      <CategoryChart
        categoryExpenses={MOCK_STAT.category_expenses}
        totalSpent={MOCK_STAT.total_spent}
      />

      <PaymentCard showAccount={true} />
    </>
  );
}

export default page;
