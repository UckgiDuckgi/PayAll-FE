'use client';

import CardInfoCard from '@/components/molecules/CardInfoCard';
import SimpleBottomSheet from '@/components/molecules/ui/SimpleBottomSheet';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { ProductType } from '@/types/productType';
import { Suspense, useState } from 'react';
import { getProductSubscribs } from '@/lib/api';
import { CardBenefitContent } from '../page';

function RecommendationSubContent() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { resData: subscriptionsData, isLoading } = useGenericQuery<
    ProductType[]
  >([QUERY_KEYS.PRODUCT_SUBSCRIPTIONS], () => getProductSubscribs());

  if (!subscriptionsData || !subscriptionsData.data || isLoading) return <></>;

  return (
    <div className='space-y-3 my-2'>
      <span className='font-bold text-[1.125rem]'>구독 서비스 둘러보기</span>
      <ul className='space-y-4 w-full'>
        {subscriptionsData?.data?.map(
          ({ productId, productName, productDescription }: ProductType) => (
            <li key={productId}>
              <SimpleBottomSheet
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                content={<CardBenefitContent selectedIdx={selectedIdx} />}
              >
                <div onClick={() => setSelectedIdx(productId)}>
                  <CardInfoCard
                    cardImg='/images/cards/samsung.svg'
                    cardName={productName}
                    cardDescription={productDescription}
                  />
                </div>
              </SimpleBottomSheet>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecommendationSubContent />
    </Suspense>
  );
}
