'use client';

import Tabs from '@/components/molecules/ui/Tabs';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export type Tab = '소비 분석' | '소비 목표' | '추천 혜택';

function Layout({ children }: { children: ReactNode }) {
  const date = '2025-01';
  const tabs: Tab[] = ['소비 분석', '소비 목표', '추천 혜택'];
  const url = [
    `/statistics?date=${date}`,
    '/statistics/goal',
    '/statistics/recommend',
  ];

  const routeUrl = usePathname();
  console.log(routeUrl);
  const urlIdx = url.findIndex((u) => u.startsWith(routeUrl)) ?? 0;

  return (
    <div className='w-full pt-14'>
      <Tabs tabs={tabs} url={url} selectedIdx={urlIdx} />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
