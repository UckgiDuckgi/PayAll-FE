'use client';

import Loading from '@/components/Loading';
import CategoryCarouselItem from '@/components/molecules/CategoryCarouselItem';
import FixedExpensesCard from '@/components/molecules/FixedExpensesCard';
import { BenefitCard } from '@/components/molecules/sion/BenefitCard';
import CategoryChart from '@/components/molecules/ui/CategoryChart';
import { AccentText } from '@/components/ui/AccentText';
import { CATEGORY } from '@/constants/category';
import { COLORS } from '@/constants/color';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { Triangle } from '@/public/icons/Triangle';
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

const DateStepper = ({ date }: { date: string }) => {
  const prevDate = dayjs(date).subtract(1, 'M').format('YYYY-MM');
  const nextDate = dayjs(date).add(1, 'M').format('YYYY-MM');

  // 미래인지 확인
  const isOverDate = (date: string) => {
    return dayjs(date).isAfter(dayjs(), 'month');
  };

  return (
    <div className='w-full flex items-center justify-center gap-3'>
      <Link href={`/statistics?date=${prevDate}`}>
        <Image
          src='/icons/triangle.svg'
          alt='triangle'
          width={14}
          height={14}
          className='cursor-pointer'
        />
      </Link>
      <span className='text-[1rem] font-bold tracking-wider'>{date}</span>
      {!isOverDate(nextDate) && (
        <Link
          onClick={() => isOverDate(nextDate)}
          href={`/statistics?date=${nextDate}`}
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
      )}
    </div>
  );
};

function StatisticsContent() {
  const searchParams = useSearchParams();
  const date = useMemo(
    () => searchParams.get('date') as string,
    [searchParams]
  );
  const category = useMemo(
    () => searchParams.get('category') as Category,
    [searchParams]
  );
  const defaultDate = dayjs().format('YYYY-MM');

  const { resData: statisticsData, isLoading } =
    useGenericQuery<StatisticsType>([QUERY_KEYS.STATISTICS, date], () =>
      getStatistics({ date: date ?? defaultDate })
    );

  if (!statisticsData || !statisticsData.data || isLoading) {
    return <Loading />;
  }

  const {
    totalSpent,
    dateAverage,
    difference,
    categoryExpenses: categories,
    fixedExpenses,
  } = statisticsData.data;

  if (totalSpent === 0) {
    return (
      <>
        <DateStepper date={date} />

        <div className='flex flex-col justify-between items-center gap-10 pt-28 sm:pt-8 w-[90%] mx-auto'>
          <div>
            <div className='mx-auto w-[150px] sm:w-[200px] h-auto'>
              <Image
                src='/images/money.svg'
                alt='money'
                width={200}
                height={200}
                className='float-animation'
              />
            </div>
            <div className='flex flex-col gap-1 text-[1.25rem] items-center font-semibold'>
              <span>소비내역이 존재하지 않아요.</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  const categoryExpenses = categories
    ?.filter((c) => c.categoryName !== 'TOTAL')
    .sort((a, b) => b.amount - a.amount);
  if (!category) {
    return (
      <div className='w-full mx-auto'>
        <DateStepper date={date} />

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
            accent={((difference ?? 0 < 0)
              ? Math.abs(difference)
              : difference
            )?.toLocaleString()}
            suffix='원 지출했어요.'
            icon={
              (difference ?? 0 > 0) ? (
                <Triangle className='rotate-180' color='#FF6F6F' />
              ) : (
                <Triangle color='#6A8DFF' />
              )
            }
            accentColor={(difference ?? 0 > 0) ? 'text-red' : 'text-main'}
            className='text-[0.8125rem]'
            accentSize='text-[1.375rem]'
          />
        </div>

        <div className='mt-6 space-y-3'>
          <TitleLine title='카테고리 별 지출' />

          <ul className='w-full overflow-x-scroll flex px-3 pb-6 pt-1 scrollbar-hide snap-x'>
            {categoryExpenses
              ?.filter((c) => c.categoryName !== 'TOTAL')
              .map(({ id, categoryName, amount }, idx) => (
                <Link
                  href={`/statistics/${categoryName}?date=${date}`}
                  key={id}
                  className='flex-shrink-0 snap-center mr-3'
                >
                  <CategoryCarouselItem
                    percent={+((amount / totalSpent) * 100).toFixed(0)}
                    color={COLORS[idx]}
                    categoryName={CATEGORY[categoryName as Category]}
                    categoryIconName={categoryName}
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
            {fixedExpenses?.length > 0 ? (
              fixedExpenses?.map(({ fixedName, amount, dueDate }, idx) => (
                <li key={fixedName + idx}>
                  <FixedExpensesCard
                    expensesName={fixedName}
                    expensesPrice={amount}
                    date={dueDate}
                  />
                </li>
              ))
            ) : (
              <div className='my-3 flex items-center justify-center gap-3'>
                <Image src='/images/pin.svg' alt='pin' width={40} height={40} />
                <span>고정 지출이 없습니다.</span>
              </div>
            )}
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
