'use client';

import { ProductDetailType } from '@/types/productType';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { cardImgs } from './CardCarousel';

function CardBenefitInfo({
  index,
  productName,
  benefitDescription,
  storeDetails,
}: ProductDetailType & { index: number }) {
  return (
    <div className='w-[90%] mx-auto flex flex-col items-start justify-start gap-5'>
      <div className='w-full'>
        <span className='w-full text-center text-[1.25rem] font-bold'>
          {productName}
        </span>
        <div className='my-3 flex items-center justify-evenly gap-6 w-full'>
          <div className='w-[100px] sm:2-[120px] h-auto'>
            <Image
              src={cardImgs[index % 3]}
              alt='card'
              width={120}
              height={120}
            />
          </div>
          <div className='text-[.8125rem] text-grey font-medium '>
            <p>
              {benefitDescription}
              <span className='text-[.875rem] text-main font-bold'>30%</span>
            </p>
          </div>
        </div>
      </div>
      <Separator className='bg-darkGrey h-[1px] w-full' />
      <div className='pt-5 w-full'>
        <p className='font-bold'>지난 달 기준 예상 혜택</p>
        <p className='font-medium text-[.5rem] text-darkGrey'>
          PayAll 예상 혜택 내역이므로 실제와 다를 수 있습니다
        </p>
        <span className='text-[1.125rem] text-grey font-medium'>
          총{' '}
          <span className='text-[1.5rem] text-main font-semibold'>
            {storeDetails
              .reduce((acc, { discountAmount }) => acc + discountAmount, 0)
              .toLocaleString()}
            원
          </span>{' '}
          혜택 받을 수 있어요
        </span>
        <div className='space-y-4 my-8'>
          {storeDetails.map(
            ({ storeName, visitCount, discountAmount }, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='space-x-2'>
                  <span className='text-[.875rem] text-grey font-bold'>
                    {storeName}
                  </span>
                  <Badge className='bg-deepDarkGrey px-2 rounded-full text-[.875rem] font-bold text-red'>
                    {visitCount}번{' '}
                    <span className='font-medium ml-1 text-[.6875rem] text-[#AAAAAA]'>
                      방문
                    </span>
                  </Badge>
                </div>
                <span className='text-[1.125rem] font-semibold text-grey'>
                  {discountAmount.toLocaleString()}원
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CardBenefitInfo;
