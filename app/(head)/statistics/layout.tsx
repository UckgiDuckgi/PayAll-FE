import Tabs from '@/components/molecules/ui/Tabs';
import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='w-full pt-14'>
      <Tabs />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
