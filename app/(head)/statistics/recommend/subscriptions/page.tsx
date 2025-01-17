import CardBenefitInfo from '@/components/molecules/CardBenefitInfo';
import { payment_detail } from '@/components/molecules/CardCarousel';
import CardInfoCard from '@/components/molecules/CardInfoCard';
import SimpleBottomSheet from '@/components/molecules/ui/SimpleBottomSheet';

function page() {
  return (
    <div className='space-y-3 my-2'>
      <span className='font-bold text-[1.125rem]'>구독 서비스 둘러보기</span>
      <div className='space-y-4'>
        <SimpleBottomSheet
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
      </div>
    </div>
  );
}

export default page;
