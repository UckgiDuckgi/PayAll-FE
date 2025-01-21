'use client';

import CategoryCarouselItem from '@/components/molecules/CategoryCarouselItem';
import FixedExpensesCard from '@/components/molecules/FixedExpensesCard';
import { BenefitCard } from '@/components/molecules/sion/BenefitCard';
import CategoryChart from '@/components/molecules/ui/CategoryChart';
import { AccentText } from '@/components/ui/AccentText';
import { CATEGORY } from '@/constants/category';
import { COLORS } from '@/constants/color';
import { MOCK_STAT } from '@/constants/mockdata';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { StatisticsType } from '@/types/statisticsType';
import { Category } from '@/types/table';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { getStatistics } from '@/lib/api';

const TitleLine = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center justify-center gap-3 w-full'>
      <span className=' whitespace-nowrap font-bold text-[.875rem]'>
        {title}
      </span>
      <span className='h-[2px] bg-grey w-full' />
    </div>
  );
};

function StatisticsContent() {
  const searchParams = useSearchParams();
  const category = useMemo(
    () => searchParams.get('category') as Category,
    [searchParams]
  );
  const date = useMemo(() => searchParams.get('date'), [searchParams]);
  const defaultDate = dayjs().format('YYYY-MM');

  const { resData: statisticsData, isLoading } =
    useGenericQuery<StatisticsType>([QUERY_KEYS.STATISTICS, date], () =>
      getStatistics({ date: date ?? defaultDate })
    );

  if (!statisticsData || !statisticsData.data || isLoading) {
    return <>Loading...</>;
  }

  const {
    totalSpent,
    dateAverage,
    difference,
    categoryExpenses,
    fixedExpenses,
  } = statisticsData.data;

  console.log(statisticsData);
  if (!category) {
    return (
      <div className='w-full mx-auto'>
        <div className='w-full flex items-center justify-center gap-3'>
          <Link
            href={`/statistics?date=${dayjs(date).subtract(1, 'M').format('YYYY-MM')}`}
          >
            <Image
              src='/icons/triangle.svg'
              alt='triangle'
              width={14}
              height={14}
              className='cursor-pointer'
            />
          </Link>
          <span className='text-[1rem] font-bold tracking-wider'>{date}</span>
          <Link
            href={`/statistics?date=${dayjs(date).add(1, 'M').format('YYYY-MM')}`}
          >
            <Image
              src='/icons/triangle.svg'
              alt='triangle'
              width={14}
              height={14}
              style={{ transform: 'rotate(180deg)' }}
              className='cursor-pointer'
            />
          </Link>
        </div>

        <CategoryChart
          categoryExpenses={categoryExpenses}
          totalSpent={totalSpent}
        />

        <div className='mt-6 space-y-2'>
          <AccentText
            prefix='하루 평균'
            accent={`${dateAverage?.toLocaleString() ?? 0}원`}
            suffix='썼어요.'
            accentColor='text-white'
            accentSize='text-[1.25rem]'
            className='text-[#AAAAAA]'
          />
          <AccentText
            prefix='지난달 대비'
            accent={`${difference?.toLocaleString() ?? 0}원`}
            suffix='지출했어요.'
            accentColor='text-main'
            accentSize='text-[1.25rem]'
            className='text-[#AAAAAA]'
          />
        </div>

        <div className='mt-6 space-y-3'>
          <TitleLine title='카테고리 별 지출' />

          <ul className='w-full overflow-x-scroll flex space-x-4 px-2 pb-6 pt-1 scrollbar-hide snap-x'>
            {categoryExpenses?.map(({ id, category, amount }) => (
              <Link
                href={`/statistics?category=${category}`}
                key={id}
                className='flex-shrink-0 snap-center'
              >
                <CategoryCarouselItem
                  percent={+((amount / MOCK_STAT.total_spent) * 100).toFixed(0)}
                  color={COLORS[id]}
                  categoryName={CATEGORY[category as Category]}
                  categoryIconName={category}
                  amount={amount}
                />
              </Link>
            ))}
          </ul>

          <BenefitCard />
        </div>

        <div className='mt-6 space-y-2'>
          <TitleLine title='고정 지출' />

          <ul className='space-y-3 my-5'>
            {fixedExpenses?.map(({ fixedName, amount, dueDate }, idx) => (
              <li key={fixedName + idx}>
                <FixedExpensesCard
                  expensesName={fixedName}
                  expensesPrice={amount}
                  date={dueDate}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatisticsContent />
    </Suspense>
  );
}
