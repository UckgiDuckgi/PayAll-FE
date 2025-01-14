import { AccentText } from '@/components/ui/AccentText';
import { SquareImage } from '@/components/ui/SquareImage';

export const LowestProductCard = ({
  imageUrl,
  title,
  discount,
  price,
}: {
  imageUrl: string;
  title: string;
  discount: number;
  price: number;
}) => {
  return (
    <div className='flex flex-col w-[8.5rem]'>
      <SquareImage src={imageUrl} alt={title} size={136} />
      <div className='text-[0.6875rem] text-white truncate w-full pt-1'>
        {title}
      </div>
      <AccentText
        prefix={`지난 구매보다 `}
        accent={`${discount}%`}
        suffix='저렴'
        accentColor='text-red'
        accentSize='text-sm'
        className='text-xs font-bold text-right'
      />
      <div className='text-sm text-white font-bold text-right pr-2'>
        {price.toLocaleString()}원
      </div>
    </div>
  );
};
