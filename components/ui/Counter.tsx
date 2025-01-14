'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Counter({
  // pid,
  className,
}: {
  // pid: number; //상품id
  className?: string;
}) {
  const [count, setCount] = useState(1);
  const plusCounter = () => {
    setCount(count + 1);
  };
  const minusCounter = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <div
      className={cn(
        'flex items-center justify-around w-fit h-6 bg-deepDarkGrey rounded-full px-1',
        className
      )}
    >
      <button
        className='w-4 h-4 bg-darkGrey text-white text-sm rounded-full flex items-center justify-center'
        onClick={minusCounter}
      >
        -
      </button>
      <div className='text-white text-sm w-6 text-center'>{count}</div>
      <button
        className='w-4 h-4 bg-darkGrey text-white text-sm rounded-full flex items-center justify-center'
        onClick={plusCounter}
      >
        +
      </button>
    </div>
  );
}
