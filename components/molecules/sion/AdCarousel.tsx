import { IconIndicator } from '@/components/ui/IconIndicator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { AdCarouselItem } from './AdCarouselItem';

export const AdCarousel = ({ userName }: { userName: string }) => {
  return (
    <div className='relative'>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className='w-full'
      >
        <CarouselContent>
          <CarouselItem>
            <AdCarouselItem
              title1='나를'
              title2='아는 소비생활'
              index={0}
              subItem={<IconIndicator src='/images/Logo.png' height={32} />}
            />
          </CarouselItem>
          <CarouselItem>
            <AdCarouselItem
              title1='특별한 날,'
              title2='특별한 사람에게'
              index={1}
              subItem={<div>오늘의 추천 상품</div>}
            />
          </CarouselItem>
          <CarouselItem>
            <AdCarouselItem
              title1={
                <div className='text-[1rem]'>
                  최근 <span className='text-main text-[1.375rem]'>병원비</span>{' '}
                  지출 증가
                </div>
              }
              title2=''
              index={2}
              subItem={
                <div className='font-sans text-[.8375rem] pt-3'>
                  <p>
                    <span className=''>하나원큐</span>가 {userName}님
                  </p>
                  <p>맞춤 의료보험을 추천해드려요</p>
                </div>
              }
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='hidden' />
        <CarouselNext className='hidden' />
      </Carousel>
    </div>
  );
};
