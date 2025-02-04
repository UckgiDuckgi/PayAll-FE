import Image from 'next/image';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AdCarouselItemProps = {
  title1: string | ReactNode;
  title2: string;
  index: number;
  subItem: ReactNode;
};

export const AdCarouselItem = ({
  title1,
  title2,
  index,
  subItem,
}: AdCarouselItemProps) => {
  return (
    <div
      className='w-full min-h-40 flex items-center pl-8 pr-3 justify-between rounded-lg font-dohyeon'
      style={{
        background: `linear-gradient(to right, #131313 14%, #2C2C2C 50%, #131313 76%)`,
      }}
    >
      <div className='flex flex-col gap-2 '>
        <div className='text-[1.25rem] space-y-[1px] flex-col flex items-start'>
          <span>{title1}</span>
          <span className='-mt-2'>{title2}</span>
        </div>
        <div className='font-sans'>{subItem}</div>
      </div>
      <div
        className={cn(
          'flex items-center justify-center',
          index === 2 ? 'w-1/3' : 'w-1/2'
        )}
      >
        <Image
          src={`/images/ads/ad${index}.png`}
          alt='ad'
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};
