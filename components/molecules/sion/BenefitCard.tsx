import { IconIndicator } from '@/components/ui/IconIndicator';
import Link from 'next/link';

export const BenefitCard = () => {
  return (
    <Link
      className='flex justify-between items-center bg-gradient-to-r from-[#8C8FC0] to-[#4A4D7C] px-5 rounded-lg'
      href='/statistics/recommend'
    >
      <div className='font-dohyeon text-[.875rem]'>
        놓치고 있던 혜택 받으러 가기
      </div>
      <IconIndicator src='/images/benefit.png' height={56} />
    </Link>
  );
};
