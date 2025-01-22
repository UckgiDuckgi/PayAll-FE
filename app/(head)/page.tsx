'use client';

import ProgressBar from '@/components/molecules/GoalProgress';
import { LowestProductList } from '@/components/molecules/LowestProductList';
import { AdCarousel } from '@/components/molecules/sion/AdCarousel';
import { AccentText } from '@/components/ui/AccentText';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { Triangle } from '@/public/icons/Triangle';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import {
  getLimit,
  getRecommendationsProduct,
  getStatisticsDiff,
} from '@/lib/api';

ChartJS.register(ArcElement, Tooltip, Legend);

export type Goal = {
  limit_amount: number;
  spent_amount: number;
  saved_amount: number;
  start_date: string;
  end_date: string;
};

export default function Home() {
  const {
    resData: recommendationsProduct,
    isLoading: recommendationsProductLoading,
  } = useGenericQuery([QUERY_KEYS.RECOMMENDATIONS_PRODUCT], () =>
    getRecommendationsProduct()
  );

  const { resData: statisticsDiff, isLoading: statisticsDiffLoading } =
    useGenericQuery([QUERY_KEYS.STATISTICS_DIFF], () => getStatisticsDiff());

  const { resData: limit, isLoading: limitLoading } = useGenericQuery(
    [QUERY_KEYS.LIMIT],
    () => getLimit()
  );

  return (
    <>
      {statisticsDiffLoading ||
      recommendationsProductLoading ||
      limitLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex justify-center flex-col items-center w-full'>
          <AdCarousel />

          <div className='my-8 flex flex-col gap-2 w-full'>
            <span className='text-[0.8125rem]'>
              <a className='text-lg font-bold border-l-[0.1875rem] pl-[0.5625rem] border-main'>
                {statisticsDiff?.data.userName}
              </a>
              님
            </span>
            <AccentText
              prefix='연간'
              accent={Math.abs(
                statisticsDiff?.data.yearlySavingAmount
              ).toLocaleString()}
              suffix='원 절약중'
              accentColor='text-white'
              className='text-[0.8125rem]'
              accentSize='text-[1.375rem]'
            />

            {statisticsDiff?.data.monthlyPaymentDifference < 0 ? (
              <AccentText
                prefix='지난달 대비'
                accent={Math.abs(
                  statisticsDiff?.data.monthlyPaymentDifference
                ).toLocaleString()}
                suffix='원 지출하셨습니다.'
                icon={<Triangle color='#6A8DFF' />}
                className='text-[0.8125rem]'
                accentSize='text-[1.375rem]'
              />
            ) : (
              <AccentText
                prefix='지난달 대비'
                accent={statisticsDiff?.data.monthlyPaymentDifference.toLocaleString()}
                suffix='원 지출하셨습니다.'
                icon={<Triangle className='rotate-180' color='#FF6A6A' />}
                accentColor='text-red'
                className='text-[0.8125rem]'
                accentSize='text-[1.375rem]'
              />
            )}
          </div>

          <ProgressBar
            spentAmount={limit?.data.spentAmount}
            limitAmount={limit?.data.limitPrice}
            start_date={limit?.data.startDate}
            end_date={limit?.data.endDate}
          />

          <div className='flex flex-col mt-20 w-full'>
            <span className='text-base font-bold text-grey mb-4'>
              최근 지출 품목의 최저가 상품
            </span>
            <LowestProductList products={recommendationsProduct.data} />
          </div>
        </div>
      )}
    </>
  );
}
