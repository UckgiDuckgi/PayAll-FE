'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const WordChip = ({
  word,
  deleteWord,
}: {
  word: string;
  deleteWord: (word: string) => void;
}) => {
  const router = useRouter();
  return (
    <button
      className='bg-black text-[0.6875rem] rounded-lg px-2 py-1 flex items-center gap-1 border border-grey whitespace-nowrap'
      onClick={() => router.push(`/search?keyword=${word}`)}
    >
      {word}{' '}
      <a
        onClick={(e) => {
          e.stopPropagation();
          deleteWord(word);
        }}
      >
        <X size={11} />
      </a>
    </button>
  );
};
