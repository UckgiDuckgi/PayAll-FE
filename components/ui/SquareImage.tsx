import Image from 'next/image';

export function SquareImage({
  size = 120,
  src,
  alt,
}: {
  size?: number;
  src: string;
  alt: string;
}) {
  return (
    <div
      className='rounded-lg bg-white p-2'
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
}
