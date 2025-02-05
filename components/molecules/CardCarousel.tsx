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
import Loading from '../Loading';
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
  const [selectedIdx, setSelectedIdx] = useState(-1); // 현재 맨 앞에 나와있는 카드
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    if (cards && selectedIdx === -1) {
      setSelectedIdx(cards[0].productId);
    }
  }, [cards, selectedIdx]);

  if (!cards) return <Loading />;

  return (
    <div className='relative top-10'>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        className='w-full'
        onSlideChange={(index) => {
          setSelectedIdx(cards[index].productId);
          console.log(cards[index].productId);
        }}
      >
        <CarouselContent className='flex -ml-1 w-full mx-auto'>
          {cards?.map(
            ({ category, storeName, discountAmount, productId }, index) => (
              <CarouselItem
                key={productId}
                className={cn(
                  'flex-shrink-0 basis-2/3 md:basis-1/3 lg:basis-3/4 mx-auto'
                )}
              >
                <SimpleBottomSheet
                  isOpen={selectedIdx === productId && isOpen}
                  onOpenChange={() => {
                    if (selectedIdx === productId)
                      return setIsOpen((prev) => !prev);
                  }}
                  content={
                    <CardBenefitContent
                      selectedIdx={selectedIdx}
                      productId={productId}
                    />
                  }
                >
                  <div
                    onClick={() => setSelectedIdx(productId)}
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
                        width: productId === selectedIdx ? '220px' : '180px',
                        height: 'auto',
                        margin: `${productId === selectedIdx ? '0' : '12px'} auto 0 auto`,
                        transition: 'width 0.8s ease-in-out',
                        opacity: productId === selectedIdx ? '1' : '0.5',
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
                      {showText && selectedIdx === productId && (
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
