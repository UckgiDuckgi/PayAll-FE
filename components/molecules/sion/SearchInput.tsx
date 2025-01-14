import { Search } from 'lucide-react';

export const SearchInput = ({
  placeholder,
  submit,
}: {
  placeholder: string;
  submit: () => void;
}) => {
  return (
    <div className='relative w-full'>
      <input
        type='text'
        placeholder={placeholder}
        className='w-full rounded-md px-3 py-[0.625rem] text-sm text-black pr-10 outline-none'
      />
      <button
        onClick={submit}
        className='absolute right-3 top-1/2 -translate-y-1/2 '
      >
        <Search className='h-5 w-5 text-[#AAAAAA]' />
      </button>
    </div>
  );
};
