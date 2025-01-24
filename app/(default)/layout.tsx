import { ReactNode } from 'react';

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='w-[90%] mx-auto'>
        <div className='w-[111.2%] bg-[#000000] -mx-[5.6%]'>
          <div className='w-[90%] mx-auto'>{children}</div>
        </div>
      </div>
    </>
  );
}

export default layout;
