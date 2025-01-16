import { ReactNode } from 'react';

function CartContainer({
  title,
  bgColor,
  children,
}: {
  title: string;
  bgColor: string;
  children?: ReactNode;
}) {
  return (
    <div
      className='mb-20 absolute left-1/2 transform -translate-x-1/2 w-screen max-w-[512px]'
      style={{ backgroundColor: bgColor }}
    >
      <div className='w-[90%] mx-auto py-3 space-y-3 mb-24'>
        <div className='text-[.9375rem] font-bold'>{title}</div>
        {children}
      </div>
    </div>
  );
}

export default CartContainer;
