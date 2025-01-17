'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Counter({
  pid,
  initialCount = 1,
  onCountChange,
  className,
}: {
  pid: number;
  initialCount?: number;
  onCountChange: (pid: number, count: number) => void;
  className?: string;
}) {
  const [count, setCount] = useState(initialCount);

  const plusCounter = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(pid, newCount);
  };

  const minusCounter = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(pid, newCount);
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
