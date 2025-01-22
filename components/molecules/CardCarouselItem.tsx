import { CATEGORY } from '@/constants/category';
import { Category } from '@/types';
import Image from 'next/image';

function CardCarouselItem({
  category,
  paymentName,
  amount,
  color,
}: {
  category: string;
  paymentName: string;
  amount: number;
  color: string;
}) {
  return (
    <div className='flex flex-col items-start justify-between w-full text-center gap-1'>
      <div className='mx-auto text-[.625rem] whitespace-nowrap flex items-center justify-center gap-1 text-grey font-bold'>
        <span
          className='flex items-center justify-center rounded-full w-[1.5rem] h-[1.5rem]'
          style={{ background: color }}
        >
          <Image
            src={`/icons/Category/${category}.svg`}
            alt='category'
            width={10}
            height={10}
          />
        </span>
        <span style={{ color: color }} className='text-[.75rem]'>
          {CATEGORY[category as Category]}
        </span>
        <span>중 최고 소비</span>
        <span className='text-[1rem]'>{paymentName}</span>
      </div>
      <div className='flex items-center gap-1 text-[.625rem] text-grey font-bold'>
        지난 달에만
        <span className='text-[.875rem]'>{amount.toLocaleString()}</span>원 혜택
        받을 수 있었어요.
      </div>
    </div>
  );
}

export default CardCarouselItem;
