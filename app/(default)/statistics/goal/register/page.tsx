'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation } from '@/hooks/query/globalQuery';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';
import { postLimit } from '@/lib/api';

function formatNumber(value: string | null): string {
  if (!value) return '';
  const numericValue = value.replace(/\D/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function GoalRegisterContent() {
  const searchParams = useSearchParams();
  const avgSpent = searchParams.get('avgSpent');
  const complete = searchParams.get('complete');
  const [goal, setGoal] = useState<string>(avgSpent?.toString() ?? '0');
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useGenericMutation(
    [QUERY_KEYS.POST_LIMIT],
    (limitPrice: number) => postLimit({ limitPrice }),
    {
      onSuccess: (data) => {
        if (data.code === 200) {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIMIT] });
          router.push(
            `/statistics/goal/register?avgSpent=${avgSpent}&complete=${true}`
          );
        }
      },
    }
  );

  const handleInput = () => {
    setGoal(formatNumber(goal.toString()));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (goal) {
      mutate(+goal.replace(/\D/g, ''));
      console.log(goal);
      router.push(
        `/statistics/goal/register?avgSpent=${avgSpent}&complete=${true}`
      );
    } else {
      console.error('Goal input is empty!');
    }
  };

  if (!complete) {
    return (
      <div className='w-[90%] mx-auto z-50 flex flex-col justify-start items-start gap-10'>
        <form
          className='w-full flex flex-col items-start justify-start gap-4 pt-40 sm:pt-24'
          onSubmit={handleSubmit}
        >
          <span className='text-[1.25rem] font-bold'>
            이번 달 목표 금액을 설정해주세요.
          </span>
          <div className='mx-auto w-[150px] sm:w-[200px] h-auto'>
            <Image
              src='/images/money.svg'
              alt='documentList'
              width={200}
              height={200}
              className='float-animation'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-[1.625rem] font-bold'>
              {formatNumber(avgSpent)}
              <span className='font-medium text-[1rem] ml-1'>원</span>
            </span>
            <span>최근 3개월 간 평균 지출액이에요</span>
          </div>
          <div className='flex items-end gap-2'>
            <Input
              value={formatNumber(goal)}
              onChange={(e) => setGoal(e.target.value)}
              onInput={handleInput}
              type='text'
              className='bg-darkGrey border-none outline-none focus:outline-none focus:bg-[#515151]'
            />
            <span className='font-medium'>원</span>
          </div>
          <Button
            type='submit'
            className='absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[460px] bg-main hover:bg-[#476BE3]'
          >
            등록
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className='w-full mx-auto z-50 flex flex-col justify-center items-center gap-10 pb-12 pt-48 sm:pt-24'>
      <div className='mx-auto w-[150px] sm:w-[200px] h-auto'>
        <Image
          src='/images/glasses.svg'
          alt='glasses'
          width={200}
          height={200}
          className='float-animation'
        />
      </div>
      <div className='flex flex-col gap-3 text-[1rem] font-semibold'>
        <span>목표 설정이 완료되었어요.</span>
        <span>목표를 달성하러 가볼까요?</span>
      </div>
      <Link href='/statistics/goal' className='w-full'>
        <Button
          type='submit'
          className='absolute bottom-8 w-[90%] max-w-[460px] bg-main hover:bg-[#476BE3]'
        >
          목표 달성하러 가기
        </Button>
      </Link>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoalRegisterContent />
    </Suspense>
  );
}
