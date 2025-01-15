import { CategoryExpense } from '@/app/haebeen/page';
import { COLORS } from '@/constants/color';
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({
  categoryExpenses,
  totalSpent,
}: {
  categoryExpenses: CategoryExpense[];
  totalSpent: number;
}) {
  const data = {
    labels: categoryExpenses.map((category) => category.category),
    datasets: [
      {
        data: categoryExpenses.map((category) => category.amount),
        backgroundColor: COLORS.slice(0, categoryExpenses.length ?? 0),
        borderWidth: 1,
        datalabels: {
          display: true,
          align: 'center',
          font: { size: 14 },
          formatter: (
            value: number,
            context: {
              dataIndex: number;
              chart: { data: { labels: string[] } };
            }
          ) => {
            const idx = context.dataIndex;
            return `${context.chart.data.labels[idx]}: ${value}원`;
          },
        },
      },
    ],
    weight: 100,
  };

  const options = {
    plugins: {
      tooltip: {
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          title: (tooltipItems: TooltipItem<'doughnut'>[]) => {
            return tooltipItems.length > 0 ? tooltipItems[0].label : '';
          },
          label: (tooltipItem: TooltipItem<'doughnut'>) => {
            const count = tooltipItem.raw as number;
            return `${count.toLocaleString()}원`;
          },
        },
      },
    },
  };
  return (
    <div className='z-10 relative w-[80%] h-[80%] max-w-[420px] max-h-[420px] mx-auto'>
      <Doughnut data={data} options={options} />
      <div className='flex flex-col items-center justify-center gap-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center'>
        <span className='text-[0.75rem]'>이번달 총 지출</span>
        <span className='text-[1.125rem]'>{totalSpent.toLocaleString()}원</span>
      </div>
    </div>
  );
}

export default CategoryChart;
