import CardBenefitInfo from '@/components/molecules/CardBenefitInfo';
import {
  CardCarousel,
  payment_detail,
} from '@/components/molecules/CardCarousel';
import CategorySubCard from '@/components/molecules/CategorySubCard';
import SimpleBottomSheet from '@/components/molecules/ui/SimpleBottomSheet';
import Link from 'next/link';

function page() {
  return (
    <div className='relative'>
      <div className='pt-3'>
        <div className='flex items-center justify-between'>
          <span className='text-[1.125rem] font-bold text-grey'>
            내 소비를 아는 카드
          </span>
        </div>
        <div className='h-[270px]'>
          <CardCarousel />
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
        <SimpleBottomSheet
          content={
            <CardBenefitInfo
              index={0}
              cardName='샵 마이웨이 카드'
              paymentDetails={payment_detail}
            />
          }
        >
          <CategorySubCard
            img={'/images/subscribes/T.svg'}
            category='외식'
            color='#B77DF1'
            paymentName='롯데리아'
            amount={23870}
          />
        </SimpleBottomSheet>

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

export default page;
