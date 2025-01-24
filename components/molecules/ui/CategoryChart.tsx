import { COLORS } from '@/constants/color';
import { CategoryExpensesType } from '@/types/statisticsType';
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { cubicBezier, motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({
  categoryExpenses,
  totalSpent,
}: {
  categoryExpenses: CategoryExpensesType[];
  totalSpent: number;
}) {
  const data = {
    // labels: categoryExpenses.map((category) => category.category),
    datasets: [
      {
        data: categoryExpenses?.map((category) => category.amount),
        backgroundColor: COLORS.slice(0, categoryExpenses?.length ?? 0),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end',
        color: '#000',
        font: {
          size: 12,
        },
        formatter: (value: number) => {
          return `${value?.toLocaleString() ?? 0}원`;
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'doughnut'>) => {
            const count = tooltipItem.raw as number;
            return `${count?.toLocaleString() ?? 0}원`;
          },
        },
      },
    },
  };
  const easeCustom = cubicBezier(0.4, 0, 0.2, 1);

  const item = {
    hidden: { opacity: 0, height: 0, scale: 0.8 },
    show: {
      opacity: [0, 0.5, 1],
      height: 'auto',
      scale: 1,
      transition: {
        duration: 0.7,
        ease: easeCustom,
        opacity: {
          duration: 1,
          ease: easeCustom,
        },
      },
    },
  };
  return (
    <motion.div
      variants={item}
      className='overflow-hidden z-10 relative w-[80%] h-[80%] max-w-[420px] max-h-[420px] mx-auto'
    >
      {/* <div className='mx-auto w-full h-full max-w-[460px]'> */}
      <Doughnut data={data} options={options} />
      {/* </div> */}
      <div className='flex flex-col items-center justify-center gap-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center'>
        <span className='text-[0.75rem]'>이번달 총 지출</span>
        <span className='text-[1.125rem]'>
          {totalSpent?.toLocaleString() ?? 0}원
        </span>
      </div>
    </motion.div>
  );
}

export default CategoryChart;
