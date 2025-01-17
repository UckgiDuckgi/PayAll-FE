import Header from '@/components/Header';
import Nav from '@/components/Nav';
import { ReactNode } from 'react';

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className='w-[90%] mx-auto pt-16 pb-24'>{children}</div>
      <Nav />
    </>
  );
}

export default layout;
