'use client';

import CardBenefitInfo from '@/components/molecules/CardBenefitInfo';
import { payment_detail } from '@/components/molecules/CardCarousel';
import CardInfoCard from '@/components/molecules/CardInfoCard';
import SimpleBottomSheet from '@/components/molecules/ui/SimpleBottomSheet';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { ProductCardsType } from '@/types/productType';
import { useState } from 'react';
import { getProductCards } from '@/lib/api';

function page() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  const { resData: cardsData, isLoading } = useGenericQuery<ProductCardsType>(
    [QUERY_KEYS.PRODUCT_CARDS],
    () => getProductCards()
  );

  if (!cardsData || !cardsData.data || isLoading) return <></>;
  return (
    <div className='space-y-3 my-2'>
      <span className='font-bold text-[1.125rem]'>카드 둘러보기</span>
      <div className='space-y-4'>
        {cardsData?.data?.cards && (
          <SimpleBottomSheet
            isOpen={isOpen}
            onOpenChange={toggleDialog}
            content={
              <CardBenefitInfo
                index={0}
                cardName='샵 마이웨이 카드'
                paymentDetails={payment_detail}
              />
            }
          >
            <CardInfoCard
              cardImg='/images/cards/samsung.svg'
              cardName='card name'
              cardDescription='card description'
            />
          </SimpleBottomSheet>
        )}
      </div>
    </div>
  );
}

export default page;
