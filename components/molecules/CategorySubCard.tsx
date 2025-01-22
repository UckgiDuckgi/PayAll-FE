import { CATEGORY } from '@/constants/category';
import { Category } from '@/types';
import Image from 'next/image';

function CategorySubCard({
  img,
  category,
  color,
  paymentName,
  amount,
}: {
  img: string;
  category: string;
  color: string;
  paymentName: string;
  amount: number;
}) {
  return (
    <div className='my-4 w-full flex items-center justify-start gap-3'>
      <Image
        src={img}
        alt='sub'
        width={54}
        height={54}
        className='rounded-[5px]'
      />
      <div className='flex flex-col items-start justify-between'>
        <div className='text-[.625rem] flex items-end gap-1 text-grey font-bold'>
          <span style={{ color: color }}>{CATEGORY[category as Category]}</span>
          중 최고 소비
          <span className='text-[.875rem]'>{paymentName}</span>
        </div>
        <div className='flex items-center gap-1 text-[.625rem] text-grey font-bold'>
          지난 달에만
          <span className='text-[.875rem]'>{amount.toLocaleString()}</span>원
          혜택 받을 수 있었어요.
        </div>
      </div>
    </div>
  );
}

export default CategorySubCard;
