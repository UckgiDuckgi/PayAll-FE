import { X } from 'lucide-react';

export const WordChip = ({ word }: { word: string }) => {
  return (
    <button className='bg-black text-[0.6875rem] rounded-lg px-2 py-1 flex items-center gap-1 border border-grey'>
      {word} <X size={11} />
    </button>
  );
};
