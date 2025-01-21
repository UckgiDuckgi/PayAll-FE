'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export const SearchInput = ({
  placeholder,
  defaultValue,
  onClick,
}: {
  placeholder: string;
  defaultValue?: string;
  onClick: (keyword: string) => void;
}) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className='relative w-full py-2 bg-transparent'>
      <input
        ref={inputRef}
        type='text'
        placeholder={placeholder}
        defaultValue={defaultValue}
        className='w-full rounded-md px-3 py-[0.625rem] text-sm text-black pr-10 outline-none'
      />
      <button
        onClick={() => onClick(inputRef.current?.value ?? '')}
        className='absolute right-3 top-1/2 -translate-y-1/2 '
      >
        <Search className='h-5 w-5 text-[#AAAAAA]' />
      </button>
    </div>
  );
};
