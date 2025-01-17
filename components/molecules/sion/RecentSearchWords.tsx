'use client';

import { WordChip } from './WordChip';

export default function RecentSearchWords({
  recentSearch,
}: {
  recentSearch: string[];
}) {
  return (
    <div className='py-2'>
      <div className='flex items-center justify-between w-full'>
        <div className='font-bold'>최근 검색어</div>
        <div className='text-[0.625rem] underline'>
          <a onClick={() => console.log('모두 삭제')}>모두 삭제</a>
        </div>
      </div>
      <div className='overflow-x-scroll flex gap-[0.5625rem] mt-[0.875rem] pb-2'>
        {recentSearch.map((word, idx) => (
          <div key={word + idx} className='flex-shrink-0'>
            <WordChip word={word} />
          </div>
        ))}
      </div>
    </div>
  );
}
