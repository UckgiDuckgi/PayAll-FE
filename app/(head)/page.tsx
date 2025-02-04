'use client';

import Loading from '@/components/Loading';
import ProgressBar from '@/components/molecules/GoalProgress';
import { LowestProductList } from '@/components/molecules/LowestProductList';
import { AdCarousel } from '@/components/molecules/sion/AdCarousel';
import { AccentText } from '@/components/ui/AccentText';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { Triangle } from '@/public/icons/Triangle';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { cubicBezier, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  getLimit,
  getRecommendationsProduct,
  getStatisticsDiff,
} from '@/lib/api';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const router = useRouter();
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

  const easeCustom = cubicBezier(0.4, 0, 0.2, 1);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: easeCustom,
      },
    },
  };

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
    <>
      {statisticsDiffLoading ||
      recommendationsProductLoading ||
      limitLoading ? (
        <Loading />
      ) : (
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='flex justify-center flex-col items-center w-full'
        >
          <AdCarousel />

          <motion.div
            variants={item}
            className='my-6 flex flex-col gap-1 w-full'
          >
            <span className='text-[0.8125rem]'>
              <a className='text-lg font-bold border-l-[0.1875rem] pl-[0.5625rem] border-main'>
                {statisticsDiff?.data?.userName ?? ''}
              </a>
              님
            </span>
            <AccentText
              prefix='연간'
              accent={Math.abs(
                statisticsDiff?.data?.yearlySavingAmount ?? 0
              ).toLocaleString()}
              suffix='원 절약중이에요.'
              accentColor='text-white'
              className='text-[0.8125rem]'
              accentSize='text-[1.375rem]'
            />

            <AccentText
              prefix='지난달 대비'
              accent={
                (
                  Math.abs(statisticsDiff?.data?.monthlyPaymentDifference) ?? 0
                )?.toLocaleString() ?? 0
              }
              suffix='원 지출했어요.'
              icon={
                statisticsDiff?.data?.monthlyPaymentDifference > 0 ? (
                  <Triangle className='rotate-180' color='#FF6F6F' />
                ) : (
                  <Triangle color='#6A8DFF' />
                )
              }
              accentColor={
                statisticsDiff?.data?.monthlyPaymentDifference > 0
                  ? 'text-red'
                  : 'text-main'
              }
              className='text-[0.8125rem]'
              accentSize='text-[1.375rem]'
            />
          </motion.div>

          <motion.div
            variants={item}
            className='w-full'
            onClick={() => router.push('/statistics/goal')}
          >
            <div className='w-full flex justify-between items-center gap-2'>
              <span
                className='w-full h-[1.5px]'
                style={{
                  background: 'linear-gradient(-90deg, #D9D9D9 0%, #222 95%)',
                }}
              />
              <span className='w-fit text-[1rem] font-bold whitespace-nowrap'>
                이번달 소비 목표
              </span>
              <span
                className='w-full h-[1.5px]'
                style={{
                  background: 'linear-gradient(90deg, #D9D9D9 0%, #222 95%)',
                }}
              />
            </div>
            {limit?.data?.limitPrice ? (
              <ProgressBar
                spentAmount={limit?.data?.spentAmount ?? 0}
                limitAmount={limit?.data?.limitPrice ?? 0}
                start_date={limit?.data?.startDate ?? 0}
                end_date={limit?.data?.endDate ?? 0}
              />
            ) : (
              <Link
                className='mt-5 w-full rounded-[20px] bg-deepDarkGrey h-24 px-4 py-2 flex items-center justify-around'
                href='/statistics/goal'
              >
                <div>
                  <Image
                    src='/images/flag.svg'
                    alt='flag'
                    width={65}
                    height={65}
                  />
                </div>
                <div className='flex flex-col items-start justify-center gap-1'>
                  <span className='text-[.9375rem] font-bold tracking-wide'>
                    등록된 소비목표가 없어요
                  </span>
                  <span className='text-[.625rem] tracking-wide'>
                    PayAll로 소비습관을 만들어보세요
                  </span>
                </div>
              </Link>
            )}
          </motion.div>

          <motion.div variants={item} className='flex flex-col mt-16 w-full'>
            <span className='text-base font-bold text-grey mb-4'>
              최근 지출 품목의 최저가 상품
            </span>
            <LowestProductList products={recommendationsProduct?.data} />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
