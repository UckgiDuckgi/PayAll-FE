'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';

export type Tab = '소비 분석' | '소비 목표' | '추천 혜택';

function TabsContent() {
  const date = dayjs().format('YYYY-MM');
  const tabs: Tab[] = ['소비 분석', '소비 목표', '추천 혜택'];
  const url = [`/statistics?`, '/statistics/goal', '/statistics/recommend'];

  const currentPath = usePathname();
  const query = useSearchParams();

  const selectedIdx =
    query.size !== 0
      ? 0
      : (url.findIndex((u) => currentPath.startsWith(u)) ?? 0);

  return (
    <div className='z-50 bg-background fixed top-[4.5rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center font-bold justify-center w-screen max-w-[512px] border-b-[1px] border-darkGrey'>
      {tabs.map((tab: Tab, idx: number) => (
        <Link
          href={idx === 0 ? `${url[idx]}date=${date}` : url[idx]}
          key={idx}
          className={cn(
            'w-[30%] pb-3 pt-4 cursor-pointer text-center transition-all duration-300 ease-in-out',
            selectedIdx === idx
              ? 'text-white border-b-[2px] border-white scale-105'
              : 'text-darkGrey border-none scale-100'
          )}
        >
          {tab}
        </Link>
      ))}
    </div>
  );
}

export default function Tabs() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <TabsContent />
    </Suspense>
  );
}
