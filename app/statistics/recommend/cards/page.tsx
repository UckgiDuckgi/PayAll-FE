import CardInfoCard from '@/components/molecules/CardInfoCard';

function page() {
  return (
    <div className='space-y-3 my-2'>
      <span className='font-bold text-[1.125rem]'>카드 둘러보기</span>
      <div className='space-y-4'>
        <CardInfoCard
          cardImg='/images/cards/samsung.svg'
          cardName='card name'
          cardDescription='card description'
        />
        <CardInfoCard
          cardImg='/images/cards/hana.svg'
          cardName='card name'
          cardDescription='card description'
        />
        <CardInfoCard
          cardImg='/images/cards/sinhan.svg'
          cardName='card name'
          cardDescription='card description'
        />
      </div>
    </div>
  );
}

export default page;
