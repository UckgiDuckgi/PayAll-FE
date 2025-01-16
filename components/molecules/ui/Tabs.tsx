import { Tab } from '@/app/statistics/layout';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function Tabs({
  tabs,
  url,
  selectedIdx,
  handleSelectedIdx,
}: {
  tabs: Tab[];
  url: string[];
  selectedIdx: number;
  handleSelectedIdx: (idx: number) => void;
}) {
  return (
    <div className='z-50 bg-background fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center font-bold justify-center w-screen max-w-[512px] border-b-[1px] border-darkGrey'>
      {tabs.map((tab: Tab, idx: number) => (
        <Link
          href={url[idx]}
          key={idx}
          className={cn(
            'w-[30%] pb-3 pt-4 cursor-pointer text-center transition-all duration-300 ease-in-out',
            selectedIdx === idx
              ? 'text-white border-b-[2px] border-white scale-105'
              : 'text-darkGrey border-none scale-100'
          )}
          onClick={() => handleSelectedIdx(idx)}
        >
          {tab}
        </Link>
      ))}
    </div>
  );
}

export default Tabs;
