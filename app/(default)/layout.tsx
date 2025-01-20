import { ReactNode } from 'react';

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='w-[90%] mx-auto pt-16 pb-24'>{children}</div>
    </>
  );
}

export default layout;
