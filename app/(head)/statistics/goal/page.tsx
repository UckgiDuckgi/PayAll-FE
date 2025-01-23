'use client';

import ProgressBar from '@/components/molecules/GoalProgress';
import { BenefitCard } from '@/components/molecules/sion/BenefitCard';
import { AccentText } from '@/components/ui/AccentText';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation, useGenericQuery } from '@/hooks/query/globalQuery';
import { StatisticsLimitType } from '@/types/statisticsType';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { getLimit, postLimit } from '@/lib/api';

const EmotionBox = ({
  spentAmount,
  limitPrice,
}: {
  spentAmount: number;
  limitPrice: number;
}) => {
  const percent = ((spentAmount / limitPrice) * 100).toFixed(0);
  if (+percent < 80) {
    return (
      <div className='w-fit flex items-center justify-center gap-3 py-2 px-5 rounded-[20px] bg-deepDarkGrey'>
        <Image src='/icons/good.svg' alt='good' width={45} height={45} />
        <div className='text-[.875rem] text-[#AAAAAA] flex items-center justify-center gap-2'>
          <p>잘하고 있어요!</p>
          <p>이대로만 해봐요</p>
        </div>
      </div>
    );
  }

  if (+percent < 100)
    return (
      <div className='mx-auto w-fit flex items-center justify-center gap-3 py-2 px-8 rounded-[20px] bg-deepDarkGrey'>
        <Image src='/icons/bad.svg' alt='bad' width={40} height={40} />
        <div className='text-[.875rem] text-[#AAAAAA] flex items-center justify-center gap-2'>
          <p>위험해요!</p>
          <p>목표를 위해 힘내봐요</p>
        </div>
      </div>
    );

  return (
    <div className='mx-auto w-fit flex items-center justify-center gap-3 py-4 px-8 rounded-[20px] bg-deepDarkGrey'>
      <Image src='/icons/bad.svg' alt='bad' width={40} height={40} />
      <div className='text-[.875rem] text-[#AAAAAA]'>
        <p>목표를 넘었어요!</p>
        <p>절약을 위해 노력해봐요</p>
      </div>
    </div>
  );
};

function StatisticsGoalContent() {
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(false);
  const toggleChecked = () => setIsChecked((prev) => !prev);

  // 소비 목표 조회
  const { resData: goalData, isLoading } = useGenericQuery<StatisticsLimitType>(
    [QUERY_KEYS.LIMIT],
    () => getLimit()
  );

  // 소비 목표 등록
  const { mutate } = useGenericMutation(
    [QUERY_KEYS.POST_LIMIT],
    (limitPrice: number) => postLimit({ limitPrice }),
    {
      onSuccess: (data) => {
        if (data.code === 200) {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIMIT] });
        }
      },
    }
  );

  const submitGoal = () => {
    if (!lastMonthLimit) return;
    mutate(lastMonthLimit);
  };

  if (!goalData || !goalData.data || isLoading) return <></>;

  const {
    limitPrice,
    spentAmount,
    savedAmount,
    averageSpent,
    lastMonthLimit,
    startDate,
    endDate,
  } = goalData.data;

  if (limitPrice) {
    const did = (spentAmount / +dayjs().get('D')).toFixed(0);
    const willDo = (
      (limitPrice - spentAmount) /
      +(dayjs().daysInMonth() - dayjs().date())
    ).toFixed(0);

    const dayAvg = +did - (+willDo < 0 ? -1 * +willDo : +willDo);
    return (
      <>
        <div className='space-y-2 my-4'>
          <span className='text-[1.125rem] font-bold'>이번달 소비 목표</span>
          <ProgressBar
            spentAmount={spentAmount}
            limitAmount={limitPrice}
            start_date={startDate ?? dayjs().toString()}
            end_date={endDate ?? dayjs().toString()}
          />
        </div>

        <div className='mt-16 space-y-6'>
          <EmotionBox spentAmount={spentAmount} limitPrice={limitPrice} />

          {dayAvg > 0 && spentAmount <= limitPrice ? (
            <>
              <div className='flex items-center w-full justify-between'>
                <div className='w-full flex flex-col gap-2 items-center justify-center'>
                  <span className='text-grey font-bold text-[.75rem]'>
                    하루 평균 <span className='text-[1rem]'>쓴 돈</span>
                  </span>
                  <span className='font-bold text-[1.125rem] text-white'>
                    {(+did).toLocaleString()}원
                  </span>
                </div>
                <Separator
                  orientation='vertical'
                  className='h-[2.125rem] bg-grey'
                />
                <div className='w-full flex flex-col gap-2 items-center justify-center'>
                  <span className='text-grey font-bold text-[.75rem]'>
                    하루 평균 <span className='text-[1rem]'>쓸 돈</span>
                  </span>
                  <span className='font-bold text-[1.125rem] text-white'>
                    {(+willDo).toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className='py-3'>
                <AccentText
                  prefix='목표 달성을 위해서는 하루 평균'
                  accent={`${dayAvg.toLocaleString()}원`}
                  suffix='을 아껴야해요.'
                  accentColor='text-main'
                  accentSize='text-[1.125rem]'
                />
              </div>
            </>
          ) : null}

          <Separator className='w-full bg-darkGrey' />

          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-center gap-2'>
              <Image src='/images/Logo.png' alt='logo' width={61} height={30} />
              <span className='text-[1.125rem]'>로 절약한 금액</span>
            </div>
            <span className='font-bold'>
              {(savedAmount ?? 0).toLocaleString()}원
            </span>
          </div>

          <span className='text-[.75rem] text-darkGrey'>
            PayAll 이용으로 혜택받은 금액이에요
          </span>

          <BenefitCard />
        </div>
      </>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center gap-10 pt-28 sm:pt-8 w-[90%] mx-auto'>
      <div className='mx-auto w-[150px] sm:w-[200px] h-auto'>
        <Image
          src='/images/glasses.svg'
          alt='glasses'
          width={200}
          height={200}
          className='float-animation'
        />
      </div>
      <div className='flex flex-col gap-1 text-[1rem] items-center font-semibold'>
        {lastMonthLimit ? (
          <span>이번 달 목표를 새로 설정해야해요</span>
        ) : (
          <span>아직 설정된 소비 목표가 없어요</span>
        )}
        <span>목표를 설정하러 갈까요?</span>
      </div>
      {lastMonthLimit && (
        <div className='w-[90%] max-w-[512px] flex items-center justify-start gap-2 absolute bottom-40'>
          <Checkbox
            className='rounded-full'
            checked={isChecked}
            onClick={toggleChecked}
          />
          <span className='text-[.875rem] font-light'>
            지난달 목표와 동일하게 설정하기
          </span>
        </div>
      )}
      <Link
        href={`/statistics/goal/register?avgSpent=${averageSpent}`}
        className='absolute bottom-24 w-[90%] max-w-[460px]'
      >
        <Button type='submit' className='w-full bg-main hover:bg-[#476BE3]'>
          {isChecked ? (
            <span onClick={submitGoal}>목표 설정하기</span>
          ) : (
            <span>목표 설정하기</span>
          )}
        </Button>
      </Link>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatisticsGoalContent />
    </Suspense>
  );
}
