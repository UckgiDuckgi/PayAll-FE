'use client';

import { Search } from 'lucide-react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClick(inputRef.current?.value ?? '');
  };
  return (
    <form
      className='relative w-full py-2 bg-transparent'
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type='text'
        placeholder={placeholder}
        defaultValue={defaultValue}
        className='w-full rounded-md px-3 py-[0.625rem] text-sm text-black pr-10 outline-none'
      />
      <button
        type='submit'
        className='absolute right-3 top-1/2 -translate-y-1/2 '
      >
        <Search className='h-5 w-5 text-[#AAAAAA]' />
      </button>
    </form>
  );
};
