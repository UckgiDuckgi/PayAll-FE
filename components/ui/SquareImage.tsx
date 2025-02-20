import Image from 'next/image';
import { cn } from '@/lib/utils';

export function SquareImage({
  className,
  size = 120,
  src,
  alt,
}: {
  className?: string;
  size?: number;
  src: string;
  alt: string;
}) {
  return (
    <div
      className={cn('rounded-lg bg-white p-1', className)}
      style={{ width: size, height: size }}
    >
      <a>
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className='rounded-lg'
          unoptimized
          priority
        />
      </a>
    </div>
  );
}
