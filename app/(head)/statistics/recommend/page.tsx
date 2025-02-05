'use client';

import Loading from '@/components/Loading';
import CardBenefitContent from '@/components/molecules/CardBenefitContent';
import { CardCarousel } from '@/components/molecules/CardCarousel';
import CategorySubCard from '@/components/molecules/CategorySubCard';
import SimpleBottomSheet from '@/components/molecules/ui/SimpleBottomSheet';
import { COLORS } from '@/constants/color';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { ProductType } from '@/types';
import { RecommendationsType } from '@/types/recommendationsType';
import { cubicBezier, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { getRecommendations } from '@/lib/api';

function RecommendationContent() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const { resData: recommendsData, isLoading } = useGenericQuery<
    RecommendationsType[]
  >([QUERY_KEYS.RECOMMENDATIONS], () => getRecommendations());

  if (!recommendsData || !recommendsData.data || isLoading) return <Loading />;

  const uniqueByProductId = (data: RecommendationsType[], pt: ProductType) => {
    const seen = new Map();
    return data.filter(({ productId, productType }) => {
      if (seen.has(productId) || productType !== pt) return false;
      seen.set(productId, true);
      return true;
    });
  };

  const cards = uniqueByProductId(recommendsData.data, 'CARD');
  const subscribes = uniqueByProductId(recommendsData.data, 'SUBSCRIBE');

  const easeCustom = cubicBezier(0.4, 0, 0.2, 1);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: easeCustom,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, height: 0, scale: 0.8 },
    show: {
      opacity: [0, 0.5, 1],
      height: 'auto',
      scale: 1,
      transition: {
        duration: 0.7,
        ease: easeCustom,
        opacity: {
          duration: 1,
          ease: easeCustom,
        },
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='show'
      className='relative'
    >
      <motion.div variants={item} className='w-full pt-3'>
        {cards.length > 0 ? (
          <>
            <div className='flex items-center justify-between'>
              <span className='text-[1.125rem] font-bold text-grey'>
                내 소비를 아는 카드
              </span>
            </div>
            <div className='h-[270px]'>
              <CardCarousel cards={cards} />
            </div>
          </>
        ) : (
          <div className='my-12 flex flex-col items-center justify-center gap-3'>
            <Image
              src='/images/rainbowCard.svg'
              alt='card'
              width={150}
              height={150}
              className='float-animation'
            />
            <span className='tracking-wide text-[1rem] font-bold text-grey'>
              사용자 소비내역에 맞는 카드를 찾지 못했어요
            </span>
          </div>
        )}
      </motion.div>

      <motion.div variants={item} className='relative w-full'>
        <div className='flex items-center justify-end'>
          <Link
            href='/statistics/recommend/cards'
            className='text-right text-[0.75rem]'
          >
            모든 카드와 혜택 보러가기
          </Link>
          <ChevronRight className='text-white' width={20} height={20} />
        </div>
        {subscribes.length > 0 ? (
          <>
            <div className='flex items-end justify-between pt-5'>
              <span className='text-[1.125rem] font-bold text-grey'>
                내 소비를 아는 구독 서비스
              </span>
            </div>
            {
              subscribes.map(
                ({ storeName, discountAmount, category, productId }, idx) => (
                  <div key={idx}>
                    <SimpleBottomSheet
                      isOpen={selectedIdx === productId}
                      onOpenChange={() =>
                        setSelectedIdx((prev) => {
                          if (prev === productId) return 0;
                          return productId;
                        })
                      }
                      content={
                        <CardBenefitContent
                          selectedIdx={selectedIdx}
                          productId={productId}
                        />
                      }
                    >
                      <div>
                        <CategorySubCard
                          img={`/images/products/${productId}.png`}
                          category={category}
                          color={COLORS[idx]}
                          paymentName={storeName}
                          amount={discountAmount}
                        />
                      </div>
                    </SimpleBottomSheet>
                  </div>
                )
              )
              // .slice((_s: any, idx: number) => idx < 3)
            }
          </>
        ) : (
          <div className='my-12 flex flex-col items-center justify-center gap-3'>
            <Image
              src='/images/rainbowBookmark.svg'
              alt='bookmark'
              width={150}
              height={150}
              className='float-animation'
            />
            <span className='tracking-wide text-[1rem] font-bold text-grey'>
              사용자 소비내역에 맞는 구독을 찾지 못했어요
            </span>
          </div>
        )}

        <div className='flex items-center justify-end'>
          <Link
            href='/statistics/recommend/subscriptions'
            className='text-right text-[0.75rem]'
          >
            모든 구독과 혜택 보러가기
          </Link>
          <ChevronRight className='text-white' width={20} height={20} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecommendationContent />
    </Suspense>
  );
}
