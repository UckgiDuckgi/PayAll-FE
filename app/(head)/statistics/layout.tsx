'use client';

import Tabs from '@/components/molecules/ui/Tabs';
import { ReactNode, useState } from 'react';

export type Tab = '소비 분석' | '소비 목표' | '추천 혜택';

function Layout({ children }: { children: ReactNode }) {
  const date = '2025-01';
  const tabs: Tab[] = ['소비 분석', '소비 목표', '추천 혜택'];
  const url = [
    `/statistics?date=${date}`,
    '/statistics/goal',
    '/statistics/recommend',
  ];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const handleSelectedIdx = (idx: number) => setSelectedIdx(idx);

  return (
    <div className='w-full pt-14'>
      <Tabs
        tabs={tabs}
        url={url}
        selectedIdx={selectedIdx}
        handleSelectedIdx={handleSelectedIdx}
      />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
