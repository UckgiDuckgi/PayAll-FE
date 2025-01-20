'use client';

import CategoryCarouselItem from '@/components/molecules/CategoryCarouselItem';
import FixedExpensesCard from '@/components/molecules/FixedExpensesCard';
import PaymentCard from '@/components/molecules/PaymentCard';
import { BenefitCard } from '@/components/molecules/sion/BenefitCard';
import CategoryChart from '@/components/molecules/ui/CategoryChart';
import { AccentText } from '@/components/ui/AccentText';
import TitleBottomLine from '@/components/ui/TitleBottomLine';
import { Badge } from '@/components/ui/badge';
import { CATEGORY } from '@/constants/category';
import { COLORS } from '@/constants/color';
import { MOCK_PAYMENT, MOCK_STAT } from '@/constants/mockdata';
import { Category } from '@/types/table';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

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
  const category = searchParams.get('category') as Category;

  const date = '2025년 1월';

  if (!category) {
    return (
      <div className='w-full mx-auto'>
        <div className='w-full flex items-center justify-center gap-3'>
          <Link href={`?date=${date}`}>
            <Image
              src='/icons/triangle.svg'
              alt='triangle'
              width={14}
              height={14}
              className='cursor-pointer'
            />
          </Link>
          <span className='text-[1rem] font-bold tracking-wider'>{date}</span>
          <Image
            src='/icons/triangle.svg'
            alt='triangle'
            width={14}
            height={14}
            style={{ transform: 'rotate(180deg)' }}
            className='cursor-pointer'
          />
        </div>

        <CategoryChart
          categoryExpenses={MOCK_STAT.category_expenses}
          totalSpent={MOCK_STAT.total_spent}
        />

        <div className='mt-6 space-y-2'>
          <AccentText
            prefix='하루 평균'
            accent='63,500원'
            suffix='썼어요.'
            accentColor='text-white'
            accentSize='text-[1.25rem]'
            className='text-[#AAAAAA]'
          />
          <AccentText
            prefix='지난달 대비'
            accent='18,230원'
            suffix='지출했어요.'
            accentColor='text-main'
            accentSize='text-[1.25rem]'
            className='text-[#AAAAAA]'
          />
        </div>

        <div className='mt-6 space-y-3'>
          <TitleLine title='카테고리 별 지출' />

          <ul className='w-full overflow-x-scroll flex space-x-4 px-2 pb-6 pt-1 scrollbar-hide snap-x'>
            {MOCK_STAT.category_expenses.map(({ category, amount }, idx) => (
              <Link
                href={`/statistics?category=${category}`}
                key={idx}
                className='flex-shrink-0 snap-center'
              >
                <CategoryCarouselItem
                  percent={+((amount / MOCK_STAT.total_spent) * 100).toFixed(0)}
                  color={COLORS[idx]}
                  categoryName={CATEGORY[category as Category][0]}
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
            {MOCK_STAT.fixed_expenses.map(
              ({ fixed_name, amount, due_date }) => (
                <li key={fixed_name}>
                  <FixedExpensesCard
                    expensesName={fixed_name}
                    expensesPrice={amount}
                    date={due_date}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }

  const MOCK_CATEGORY_INFO = {
    category_id: 1,
    category_name: '외식',
    total_spent: 103200,
    count: 6,
  };

  return (
    <div className='space-y-6 mt-3'>
      <div className='space-y-2'>
        <div className='flex items-center justify-start gap-2'>
          <span
            className='box-border z-10 flex items-center justify-center w-[1.875rem] h-[1.875rem] rounded-full'
            style={{ background: COLORS[0] }}
          >
            <Image
              src={`/icons/Category/${category}.svg`}
              alt='category'
              width={14}
              height={14}
            />
          </span>
          <span className='text-[.875rem] text-grey'>
            이번달
            <span
              className='ml-1 text-[1.0625rem] font-bold'
              style={{ color: COLORS[0] }}
            >
              {CATEGORY[category][0]}
            </span>{' '}
            지출액
          </span>
        </div>
        <div className='space-x-2'>
          <span className='font-bold text-[1.5rem]'>
            {MOCK_CATEGORY_INFO.total_spent.toLocaleString()}원
          </span>
          <Badge className='bg-deepDarkGrey px-2 py-1 rounded-full text-grey font-medium text-[.6875rem]'>
            총 {MOCK_CATEGORY_INFO.count}회
          </Badge>
        </div>
      </div>

      <div className='mt-4 w-full'>
        <TitleBottomLine left='01.07 (화)' right='- 91,200원'>
          <PaymentCard showAccount={true} paymentInfo={MOCK_PAYMENT} />
          <PaymentCard showAccount={true} paymentInfo={MOCK_PAYMENT} />
          <PaymentCard showAccount={true} paymentInfo={MOCK_PAYMENT} />
        </TitleBottomLine>
      </div>

      <div className='mt-4 w-full'>
        <TitleBottomLine left='01.08 (수)' right='- 91,200원'>
          <PaymentCard showAccount={true} paymentInfo={MOCK_PAYMENT} />
          <PaymentCard showAccount={true} paymentInfo={MOCK_PAYMENT} />
          <PaymentCard showAccount={true} paymentInfo={MOCK_PAYMENT} />
        </TitleBottomLine>
      </div>

      <BenefitCard />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatisticsContent />
    </Suspense>
  );
}
