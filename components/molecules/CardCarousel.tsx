'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { COLORS } from '@/constants/color';
import { RecommendationsType } from '@/types/recommendationsType';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import CardBenefitContent from './CardBenefitContent';
import CardCarouselItem from './CardCarouselItem';
import SimpleBottomSheet from './ui/SimpleBottomSheet';

export const cardImgs = [
  '/images/cards/hana.png',
  '/images/cards/sinhan.png',
  '/images/cards/hyundai.png',
];

export const payment_detail = [
  {
    payment_place: '아웃벡 스테이크 하우스',
    payment_count: 4,
    benefit: 75380,
  },
  {
    payment_place: '세븐 일레븐',
    payment_count: 7,
    benefit: 4480,
  },
];

export const CardCarousel = ({ cards }: { cards: RecommendationsType[] }) => {
  const [selectedIdx, setSelectedIdx] = useState(0); // 현재 맨 앞에 나와있는 카드
  const [clickIdx, setClickIdx] = useState(0); // 클릭된 카드
  const [showText, setShowText] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      setShowText(false);
    };
  }, [selectedIdx]);

  return (
    <div className='relative top-10'>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        className='w-full'
        onSlideChange={(index) => {
          setSelectedIdx(index);
        }}
      >
        <CarouselContent className='flex -ml-1 w-full mx-auto'>
          {cards?.map(
            ({ category, storeName, discountAmount, productId }, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  'flex-shrink-0 basis-2/3 md:basis-1/3 lg:basis-3/4 mx-auto'
                )}
              >
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
                      selectedIdx={clickIdx}
                      productId={productId}
                    />
                  }
                >
                  <div
                    onClick={() => setClickIdx(productId)}
                    className='flex flex-col items-center justify-center'
                  >
                    <Image
                      ref={imageRef}
                      src={`/images/products/${productId}.png`}
                      alt='card'
                      width={0}
                      height={0}
                      sizes='(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 20vw'
                      style={{
                        width: index === selectedIdx ? '220px' : '180px',
                        height: 'auto',
                        margin: `${index === selectedIdx ? '0' : '12px'} auto 0 auto`,
                        transition: 'width 0.8s ease-in-out',
                        opacity: index === selectedIdx ? '1' : '0.5',
                      }}
                    />
                    <div
                      className={`mt-3 transition-all duration-500 transform ${
                        showText
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-5'
                      }`}
                      style={{
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                      }}
                    >
                      {showText && index === selectedIdx && (
                        <CardCarouselItem
                          category={category}
                          paymentName={storeName}
                          amount={discountAmount}
                          color={COLORS[index]}
                        />
                      )}
                    </div>
                  </div>
                </SimpleBottomSheet>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious className='hidden' />
        <CarouselNext className='hidden' />
      </Carousel>
    </div>
  );
};
