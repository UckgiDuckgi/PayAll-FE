import { IconIndicator } from '@/components/ui/IconIndicator';

export const BenefitCard = () => {
  return (
    <div className='flex justify-between items-center bg-gradient-to-r from-[#8C8FC0] to-[#4A4D7C] px-5 rounded-lg'>
      <div className=''>놓치고 있던 혜택 받으러 가기</div>
      <IconIndicator src='/images/benefit.png' height={56} />
    </div>
  );
};
