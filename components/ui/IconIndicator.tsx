'use client';

import Image from 'next/image';

interface IconIndicatorProps {
  src: string;
  width?: number;
  height?: number;
  opacity?: number;
  alt?: string;
  className?: string;
  color?: string;
}

export const IconIndicator = ({
  src,
  width,
  height,
  opacity,
  alt = '',
  className,
  color,
}: IconIndicatorProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        priority
        className='w-auto'
        style={{
          height: height ? `${height}px` : 'auto',
          width: width ? `${width}px` : 'auto',
          objectFit: 'contain',
          opacity: opacity,
        }}
        color={color}
      />
    </div>
  );
};
