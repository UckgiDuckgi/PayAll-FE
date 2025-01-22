'use client';

import Tabs from '@/components/molecules/ui/Tabs';
import { ReactNode } from 'react';

export type Tab = '소비 분석' | '소비 목표' | '추천 혜택';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='w-full pt-14'>
      <Tabs />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
