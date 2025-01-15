import { Progress } from '../ui/progress';

function DeliveryFeeProgress({
  fee,
  totalFee,
}: {
  fee: number;
  totalFee: number;
}) {
  return (
    <div className='w-full space-y-3 text-left'>
      <span className='text-[.875rem] font-bold'>
        {fee.toLocaleString()}원 추가 구매 시 배송비 무료
      </span>
      <div className='space-y-1'>
        <Progress value={+((fee / totalFee) * 100).toFixed(0)} />
        <div className='flex items-center justify-between'>
          <span className='text-main text-[.625rem] font-bold tracking-wider'>
            {fee.toLocaleString()}원
          </span>
          <span className='text-[.625rem] font-bold tracking-wider'>
            {totalFee.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}

export default DeliveryFeeProgress;
