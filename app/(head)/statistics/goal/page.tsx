'use client';

import { Goal } from '@/app/page';
import ProgressBar from '@/components/molecules/GoalProgress';
import { BenefitCard } from '@/components/molecules/sion/BenefitCard';
import { AccentText } from '@/components/ui/AccentText';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

const EmotionBox = ({ differ }: { differ: number }) => {
  if (differ < 0) {
    return (
      <div className='w-fit flex items-center justify-center gap-3 py-2 px-5 rounded-[20px] bg-deepDarkGrey'>
        <Image src='/icons/good.svg' alt='good' width={45} height={45} />
        <span className='text-[.875rem] text-[#AAAAAA]'>
          잘하고 있어요! 이대로만 해봐요
        </span>
      </div>
    );
  }

  return (
    <div className='mx-auto w-fit flex items-center justify-center gap-3 py-2 px-8 rounded-[20px] bg-deepDarkGrey'>
      <Image src='/icons/bad.svg' alt='bad' width={40} height={40} />
      <span className='text-[.875rem] text-[#AAAAAA]'>
        위험해요! 목표를 위해 힘내봐요
      </span>
    </div>
  );
};

function page() {
  const MOCK_GOAL: Goal = {
    limit_amount: 1500000,
    spent_amount: 1300000,
    saved_amount: 31010,
    start_date: '2025-01-01',
    end_date: '2025-01-31',
  };

  const did = (MOCK_GOAL.spent_amount / +dayjs().get('D')).toFixed(0);
  const willDo = (
    (MOCK_GOAL.limit_amount - MOCK_GOAL.spent_amount) /
    +(dayjs().daysInMonth() - dayjs().date())
  ).toFixed(0);

  return (
    <>
      <ProgressBar
        spentAmount={MOCK_GOAL.spent_amount}
        limitAmount={MOCK_GOAL.limit_amount}
        start_date={MOCK_GOAL.start_date}
        end_date={MOCK_GOAL.end_date}
      />

      <div className='mt-16 space-y-6'>
        <EmotionBox differ={+did - +willDo} />

        <div className='flex items-center w-full justify-between'>
          <div className='w-full flex flex-col gap-2 items-center justify-center'>
            <span className='text-grey font-bold text-[.75rem]'>
              하루 평균 <span className='text-[1rem]'>쓴 돈</span>
            </span>
            <span className='font-bold text-[1.125rem] text-white'>
              {(+did).toLocaleString()}원
            </span>
          </div>
          <Separator orientation='vertical' className='h-[2.125rem] bg-grey' />
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
            accent={`${(+did - +willDo).toLocaleString()}원`}
            suffix='을 아껴야해요.'
            accentColor='text-main'
            accentSize='text-[1.125rem]'
          />
        </div>

        <Separator className='w-full bg-darkGrey' />

        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-center gap-2'>
            <Image src='/images/Logo.png' alt='logo' width={61} height={30} />
            <span className='text-[1.125rem]'>로 절약한 금액</span>
          </div>
          <span className='font-bold'>
            {MOCK_GOAL.saved_amount.toLocaleString()}원
          </span>
        </div>

        <span className='text-[.75rem] text-darkGrey'>
          PayAll 이용으로 혜택받은 금액이에요
        </span>

        <BenefitCard />
      </div>

      <Button className='w-full bg-main'>
        <Link href='/statistics/goal/register'>목표 설정하기</Link>
      </Button>
    </>
  );
}

export default page;
