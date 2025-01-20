'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useRef, Suspense } from 'react';

function formatNumber(value: string | null): string {
  if (!value) return '';
  const numericValue = value.replace(/\D/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function GoalRegisterContent() {
  const searchParams = useSearchParams();
  const avgSpent = searchParams.get('avgSpent');
  const complete = searchParams.get('complete');
  const goalRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInput = () => {
    if (goalRef.current) {
      const formattedValue = formatNumber(goalRef.current.value);
      goalRef.current.value = formattedValue;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = goalRef.current?.value.replace(/,/g, '');
    if (value) {
      console.log(`Submitted Goal: ${value}`);
      router.push(
        `/statistics/goal/register?avgSpent=${avgSpent}&complete=${true}`
      );
    } else {
      console.error('Goal input is empty!');
    }
  };

  if (!complete) {
    return (
      <div className='h-screen w-[90%] mx-auto z-50 flex flex-col justify-start items-start gap-10'>
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
              ref={goalRef}
              defaultValue={formatNumber(avgSpent)}
              onInput={handleInput}
              type='text'
              className='bg-darkGrey border-none outline-none focus:outline-none focus:bg-[#515151]'
            />
            <span className='font-medium'>원</span>
          </div>
          <Button
            type='submit'
            className='absolute bottom-8 w-[90%] max-w-[460px] bg-main hover:bg-[#476BE3]'
          >
            등록
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className='h-screen w-[90%] mx-auto z-50 flex flex-col justify-center items-center gap-10 pb-12'>
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
      <Button
        type='submit'
        className='absolute bottom-8 w-[90%] max-w-[460px] bg-main hover:bg-[#476BE3]'
      >
        <Link href='/statistics/goal'>목표 달성하러 가기</Link>
      </Button>
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
