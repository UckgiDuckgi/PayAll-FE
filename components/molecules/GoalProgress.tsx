import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

function ProgressBar({
  spentAmount,
  limitAmount,
  start_date,
  end_date,
}: {
  spentAmount: number;
  limitAmount: number;
  start_date: string;
  end_date: string;
}) {
  const [progressWidth, setProgressWidth] = useState(0);
  const percent = ((spentAmount / limitAmount) * 100).toFixed(0);

  useEffect(() => {
    const targetWidth =
      spentAmount > limitAmount
        ? 100
        : ((spentAmount / limitAmount) * 100).toFixed(0);

    const timeout = setTimeout(() => {
      setProgressWidth(+targetWidth);
    }, 100);

    return () => clearTimeout(timeout);
  }, [spentAmount, limitAmount]);

  return (
    <div className='space-y-1'>
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
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Image src='/icons/WonIcon.svg' alt='won' width={18} height={18} />
          <span className='text-[1.125rem] font-bold'>
            {limitAmount.toLocaleString()}원
          </span>
        </div>
        <div className='flex items-center font-regular gap-1 text-[.6875rem] text-grey'>
          <span>{start_date}</span>
          <span className='font-bold'>~</span>
          <span>{end_date}</span>
        </div>
      </div>
      <div className='mx-auto relative h-[1.5625rem]'>
        <div className='absolute top-0 right-0'>
          <GoalBadge percent={+percent} />
        </div>
        <div className='absolute left-0 w-full h-full bg-white rounded-[0.625rem] top-6'>
          <div
            className={cn(
              'absolute left-0 h-full rounded-[0.625rem] transition-all duration-700 ease-in-out',
              +percent < 100 ? 'bg-main' : 'bg-red',
              +percent < 100 ? 'text-right' : 'text-left'
            )}
            style={{ width: `${progressWidth}%` }}
          >
            <span className='text-[.75rem] px-4 z-50'>
              {percent.toLocaleString()}%
            </span>
          </div>
        </div>
        <div className='absolute w-full top-14 flex items-start justify-between h-full'>
          <span
            className={cn(
              'text-[.75rem] text-main',
              +percent < 100 ? 'text-main' : 'text-red'
            )}
          >
            {spentAmount.toLocaleString()}
          </span>
          <span className='text-[.75rem] text-white'>
            {(limitAmount - spentAmount).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

const GoalBadge = ({ percent }: { percent: number }) => {
  return (
    <>
      <span
        className='px-2 py-[1px] whitespace-nowrap w-fit rounded-[5px] text-[.625rem] font-bold text-darkGrey bg-white absolute top-0'
        style={{
          right:
            percent < 100
              ? '-18px'
              : `calc(clamp(0px, 100vw, 512px) * 0.9 * (1 - 100 / ${percent}))`,
          transform: percent < 100 ? 'translateX(0)' : 'translateX(50%)',
        }}
      >
        목표
      </span>
      <span
        className='px-2 py-[1px] rounded-[5px] text-[.625rem] absolute top-3'
        style={{
          right:
            percent < 100
              ? '-18px'
              : `calc(clamp(0px, 100vw, 512px) * 0.9 * (1 - 100 / ${percent}))`,
          transform: percent < 100 ? 'translateX(0)' : 'translateX(50%)',
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
        >
          <polygon points='20,0 0,0 10,10' fill='white' />
        </svg>
      </span>
      <span
        className={'absolute h-[1.5625rem] w-[4px] bg-background top-6 z-10'}
        style={{
          right:
            percent < 100
              ? '-5px'
              : `calc(clamp(0px, 100vw, 512px) * 0.9 * (1 - 100 / ${percent}))`,
          transform: percent < 100 ? 'translateX(0)' : 'translateX(50%)',
        }}
      ></span>
    </>
  );
};

export default ProgressBar;
