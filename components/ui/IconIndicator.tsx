'use client';

import Image from 'next/image';

interface IconIndicatorProps {
  src: string;
  width?: number;
  height: number;
  opacity?: number;
  alt?: string;
}

export const IconIndicator = ({
  src,
  width,
  height,
  opacity,
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
          width: width ? width : 'auto',
          objectFit: 'contain',
          opacity: opacity,
        }}
      />
    </div>
  );
};
