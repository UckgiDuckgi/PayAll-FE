import Image from 'next/image';
import { ReactNode } from 'react';

type AdCarouselItemProps = {
  title1: string;
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
      className='w-full min-h-40 flex items-center pl-8 pr-5 justify-stretch rounded-lg'
      style={{
        background: `linear-gradient(to right, #131313 14%, #2C2C2C 50%, #131313 76%)`,
      }}
    >
      <div className='flex flex-col gap-2 '>
        <div className='text-[1.625rem] flex-col flex items-start'>
          <span>{title1}</span>
          <span className='-mt-2'>{title2}</span>
        </div>
        <div className=''>{subItem}</div>
      </div>
      <div className='w-1/2 flex items-center justify-center'>
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
