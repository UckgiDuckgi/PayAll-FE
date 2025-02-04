'use client';

import { AccentText } from '@/components/ui/AccentText';
import { Triangle } from '@/public/icons/Triangle';
import { useRouter } from 'next/navigation';

export default function AccountUnionCard({
  username,
  formattedLastMonthDate,
  totalBalance,
  difference,
}: {
  username: string;
  formattedLastMonthDate: string;
  totalBalance: number;
  difference: number;
}) {
  const router = useRouter();

  return (
    <button
      className='w-full h-32 bg-gradient-to-r from-[#333333] to-[#8A8A8A] rounded-2xl p-5 pr-3 pb-3 flex items-center justify-stretch'
      onClick={() => router.push('/accounts/0')}
    >
      <div className='flex flex-col w-full pb-2 text-left'>
        <div className='text-[1rem] font-bold'>
          <span className='text-[1.1rem] font-bold'>{username}</span>님의 총자산
        </div>
        <div className='text-[0.85rem] mt-2'>{formattedLastMonthDate} 대비</div>
        {difference < 0 ? (
          <AccentText
            prefix=''
            accent={`${Math.abs(difference).toLocaleString()}`}
            suffix='원 줄었어요'
            icon={<Triangle color='#6A8DFF' />}
            accentColor='text-main'
            accentSize='text-sm'
            className='text-[0.6875rem]'
          />
        ) : (
          <AccentText
            prefix=''
            accent={`${difference.toLocaleString()}`}
            suffix='원 늘었어요'
            accentColor='text-red'
            icon={<Triangle className='rotate-180' color='#FF6A6A' />}
            accentSize='text-sm'
            className='text-[0.6875rem]'
          />
        )}
        <div className='text-[1.4rem] font-bold'>
          {totalBalance.toLocaleString()}원
        </div>
      </div>
      <div className='flex items-end justify-end h-full'>
        <span className='font-semibold relative before:content-[""] before:absolute before:top-0 before:left-[0.0625rem] before:w-4/5 before:border-t-2 before:border-white pt-[0.125rem]'>
          PayAll
        </span>
      </div>
    </button>
  );
}
