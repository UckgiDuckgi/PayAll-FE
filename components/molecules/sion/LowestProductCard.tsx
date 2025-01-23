'use client';

import { AccentText } from '@/components/ui/AccentText';
import { SquareImage } from '@/components/ui/SquareImage';
import { RecommendationsProductType } from '@/types/productType';
import { useRouter } from 'next/navigation';

export const LowestProductCard = (
  recommendationsProduct: RecommendationsProductType
) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search?keyword=${recommendationsProduct.productName}`);
  };

  return (
    <button className='flex flex-col w-[8.5rem]' onClick={handleClick}>
      <SquareImage
        src={recommendationsProduct.productImage}
        alt={recommendationsProduct.productName}
        size={136}
      />
      <div className='text-[0.6875rem] text-left text-white truncate w-full pt-1'>
        {recommendationsProduct.productName}
      </div>
      {recommendationsProduct.discountRate > 0 && (
        <AccentText
          prefix={`지난 구매보다 `}
          accent={`${recommendationsProduct.discountRate.toFixed(0)}%`}
          suffix='저렴'
          accentColor='text-red'
          accentSize='text-sm'
          className='text-xs font-bold text-right'
        />
      )}
      <div className='text-sm text-white font-bold text-right pr-2 w-full'>
        {recommendationsProduct.price.toLocaleString()}원
      </div>
    </button>
  );
};
