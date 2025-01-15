'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import CardCarouselItem from './CardCarouselItem';

export const CardCarousel = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      setShowCard(false);
    };
  }, [selectedIdx]);

  const cardImgs = [
    '/images/cards/hana.svg',
    '/images/cards/sinhan.svg',
    '/images/cards/samsung.svg',
  ];
  return (
    <div className='relative top-32'>
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
        <CarouselContent className='flex -ml-1 w-full'>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className={cn(
                'flex-shrink-0 basis-2/3 md:basis-1/3 lg:basis-3/4'
              )}
            >
              <div className='flex flex-col items-center justify-center'>
                <Image
                  ref={imageRef}
                  src={cardImgs[index % 3]}
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
                    showCard
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                  }}
                >
                  {showCard && index === selectedIdx && (
                    <CardCarouselItem
                      category='외식'
                      paymentName='아웃백 스테이크 하우스'
                      amount={23870}
                      color='#B77DF1'
                    />
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden' />
        <CarouselNext className='hidden' />
      </Carousel>
    </div>
  );
};
