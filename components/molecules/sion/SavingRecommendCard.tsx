import { IconIndicator } from '@/components/ui/IconIndicator';
import Link from 'next/link';

export const SavingRecommendCard = () => {
  return (
    <Link
      className='flex justify-between items-center bg-gradient-to-r from-[#08A9AA] to-[#94CED1] px-5 rounded-lg'
      href='/'
    >
      <div>
        <div className='font-dohyeon text-[.875rem]'>
          절약한 금액으로 목돈 마련하기
        </div>
        <div className='text-[.5625rem]'>하나원큐 추천 예적금 둘러보기</div>
      </div>
      <IconIndicator src='/images/OneQ.png' height={65} />
    </Link>
  );
};
