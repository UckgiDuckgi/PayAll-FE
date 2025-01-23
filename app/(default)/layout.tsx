import { ReactNode } from 'react';

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='w-[90%] mx-auto'>{children}</div>
    </>
  );
}

export default layout;
