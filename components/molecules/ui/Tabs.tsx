import { cn } from '@/lib/utils';

function Tabs({
  tabs,
  selectedIdx,
  handleSelectedIdx,
}: {
  tabs: string[];
  selectedIdx: number;
  handleSelectedIdx: (idx: number) => void;
}) {
  return (
    <div className='z-50 bg-background fixed top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center font-bold justify-center w-screen max-w-[512px] border-b-[1px] border-darkGrey'>
      {tabs.map((tab, idx) => (
        <span
          key={idx}
          className={cn(
            'w-[30%] py-3 cursor-pointer text-center transition-all duration-300 ease-in-out',
            selectedIdx === idx
              ? 'text-white border-b-[2px] border-white scale-105'
              : 'text-darkGrey border-none scale-100'
          )}
          onClick={() => handleSelectedIdx(idx)}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

export default Tabs;
