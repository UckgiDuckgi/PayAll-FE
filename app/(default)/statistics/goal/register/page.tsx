'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation } from '@/hooks/query/globalQuery';
import { useQueryClient } from '@tanstack/react-query';
import { cubicBezier, motion } from 'framer-motion';
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
      router.push(
        `/statistics/goal/register?avgSpent=${avgSpent}&complete=${true}`
      );
    } else {
      console.error('Goal input is empty!');
    }
  };

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

  if (!complete) {
    return (
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='min-h-screen w-[90%] mx-auto z-50 flex flex-col justify-start items-start gap-10'
      >
        <form
          className='w-full flex flex-col items-start justify-start gap-4 pt-40 sm:pt-24'
          onSubmit={handleSubmit}
        >
          <motion.div variants={item} className='text-[1.25rem] font-bold'>
            이번 달 목표 금액을 설정해주세요.
          </motion.div>
          <motion.div
            variants={item}
            className='mx-auto w-[150px] sm:w-[200px] h-auto'
          >
            <Image
              src='/images/money.svg'
              alt='documentList'
              width={200}
              height={200}
              className='float-animation'
            />
          </motion.div>
          <motion.div variants={item} className='flex flex-col gap-1'>
            <span className='text-[1.625rem] font-bold'>
              {formatNumber(avgSpent)}
              <span className='font-medium text-[1rem] ml-1'>원</span>
            </span>
            <span>최근 3개월 간 평균 지출액이에요</span>
          </motion.div>
          <motion.div variants={item} className='flex items-end gap-2'>
            <Input
              value={formatNumber(goal)}
              onChange={(e) => setGoal(e.target.value)}
              onInput={handleInput}
              type='text'
              className='bg-darkGrey border-none outline-none focus:outline-none focus:bg-[#515151]'
            />
            <span className='font-medium'>원</span>
          </motion.div>
          <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[460px] flex items-center justify-between'>
            <Button
              type='button'
              className='w-[35%] bg-white hover:bg-grey text-deepDarkGrey'
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button
              type='submit'
              className='w-[60%] bg-main hover:bg-[#476BE3]'
            >
              등록
            </Button>
          </div>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='show'
      className='relative h-[100dvh] mx-auto z-50 flex flex-col justify-center items-center gap-10 pb-12 pt-40 sm:pt-20'
    >
      <div className='mx-auto w-[300px] sm:w-[350px] h-auto'>
        <video
          src='/images/complete.mp4'
          width='350px'
          height='250px'
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <motion.div
        variants={item}
        className='flex flex-col gap-3 text-[1.25rem] font-semibold'
      >
        <span>목표 설정이 완료되었어요.</span>
        <span>목표를 달성하러 가볼까요?</span>
      </motion.div>
      <Link href='/statistics/goal' className='w-full'>
        <Button
          type='submit'
          className='mx-auto absolute bottom-8 w-[90vw] max-w-[460px] bg-main hover:bg-[#476BE3]'
        >
          목표 달성하러 가기
        </Button>
      </Link>
    </motion.div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoalRegisterContent />
    </Suspense>
  );
}
