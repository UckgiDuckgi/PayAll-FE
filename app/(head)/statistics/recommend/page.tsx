'use client';

import CardBenefitInfo from '@/components/molecules/CardBenefitInfo';
import { CardCarousel } from '@/components/molecules/CardCarousel';
import CategorySubCard from '@/components/molecules/CategorySubCard';
import SimpleBottomSheet from '@/components/molecules/ui/SimpleBottomSheet';
import { COLORS } from '@/constants/color';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { ProductDetailType } from '@/types/productType';
import { RecommendationsType } from '@/types/recommendationsType';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { getProductDetail, getRecommendations } from '@/lib/api';

function RecommendationContent() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  const { resData: recommendsData, isLoading } = useGenericQuery<
    RecommendationsType[]
  >([QUERY_KEYS.RECOMMENDATIONS], () => getRecommendations());

  if (!recommendsData || !recommendsData.data || isLoading) return;

  const cards = recommendsData.data.filter(
    ({ productType }) => productType === 'CARD'
  );
  const subscribes = recommendsData.data.filter(
    ({ productType }) => productType === 'SUBSCRIBE'
  );

  return (
    <div className='relative'>
      <div className='pt-3'>
        <div className='flex items-center justify-between'>
          <span className='text-[1.125rem] font-bold text-grey'>
            내 소비를 아는 카드
          </span>
        </div>
        <div className='h-[270px]'>
          <CardCarousel cards={cards} />
        </div>
      </div>

      <div className='relative w-full'>
        <div className='flex items-center justify-end'>
          <Link
            href='/statistics/recommend/cards'
            className='text-right text-[0.75rem]'
          >
            모든 카드와 혜택 보러가기
          </Link>
        </div>
        <div className='flex items-end justify-between pt-5'>
          <span className='text-[1.125rem] font-bold text-grey'>
            내 소비를 아는 구독 서비스
          </span>
        </div>
        {subscribes.map(
          ({ storeName, discountAmount, category, productId }, idx) => (
            <div key={idx}>
              <SimpleBottomSheet
                isOpen={isOpen}
                onOpenChange={toggleDialog}
                content={<CardBenefitContent selectedIdx={selectedIdx} />}
              >
                <div onClick={() => setSelectedIdx(productId)}>
                  <CategorySubCard
                    img={'/images/subscribes/T.svg'}
                    category={category}
                    color={COLORS[idx]}
                    paymentName={storeName}
                    amount={discountAmount}
                  />
                </div>
              </SimpleBottomSheet>
            </div>
          )
        )}

        <div className='flex items-center justify-end'>
          <Link
            href='/statistics/recommend/subscriptions'
            className='text-right text-[0.75rem]'
          >
            모든 구독과 혜택 보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CardBenefitContent({ selectedIdx }: { selectedIdx: number }) {
  const { resData: productData, isLoading } =
    useGenericQuery<ProductDetailType>(
      [QUERY_KEYS.PRODUCT_DETAIL, selectedIdx],
      () => getProductDetail({ productId: selectedIdx })
      // {!!enabled: 0,}
    );

  if (!productData || !productData.data || isLoading) return <></>;

  console.log(productData.data);
  const { productName, benefitDescription, storeDetails } = productData.data;
  return (
    <>
      <CardBenefitInfo
        index={selectedIdx}
        productName={productName}
        benefitDescription={benefitDescription}
        storeDetails={storeDetails}
      />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecommendationContent />
    </Suspense>
  );
}
