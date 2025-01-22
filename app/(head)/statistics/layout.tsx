'use client';

import Tabs from '@/components/molecules/ui/Tabs';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

export type Tab = '소비 분석' | '소비 목표' | '추천 혜택';

function Layout({ children }: { children: ReactNode }) {
  const tabs: Tab[] = ['소비 분석', '소비 목표', '추천 혜택'];
  const url = [`/statistics?`, '/statistics/goal', '/statistics/recommend'];

  const routeUrl = usePathname();
  const query = useSearchParams();
  const urlIdx =
    query.size !== 0 ? 0 : (url.findIndex((u) => routeUrl.startsWith(u)) ?? 0);

  return (
    <div className='w-full pt-14'>
      <Tabs tabs={tabs} url={url} selectedIdx={urlIdx} />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
