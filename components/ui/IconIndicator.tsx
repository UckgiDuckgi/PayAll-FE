'use client';

import Image from 'next/image';

interface IconIndicatorProps {
  src: string;
  height: number;
  alt?: string;
}

export const IconIndicator = ({
  src,
  height,
  alt = '',
}: IconIndicatorProps) => {
  return (
    <div className='flex items-center '>
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        priority
        className='w-auto'
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
