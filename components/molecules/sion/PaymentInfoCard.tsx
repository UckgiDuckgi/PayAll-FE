import { PaymentDetailList } from '@/types';

export default function PaymentInfoCard({
  paymentInfo,
}: {
  paymentInfo: PaymentDetailList;
}) {
  const {
    paymentPlace,
    category,
    price,
    paymentType,
    paymentTime,
    bankName,
    accountName,
  } = paymentInfo;
  return (
    <div>
      <div className='w-full py-5 bg-deepDarkGrey space-y-2 px-[0.875rem] rounded-xl'>
        <div className='flex items-center justify-between'>
          <div className='space-x-2'>
            <span className='text-[.8125rem]'>{paymentPlace}</span>
            <span className='text-[.6875rem] text-[#858585]'>{category}</span>
          </div>
          <span className='text-[.9375rem] font-bold'>
            - {price.toLocaleString()}원
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <div className='flex items-center gap-1'>
              <span className='text-[.6875rem] text-main font-regular'>
                {paymentType} 결제
              </span>
              <span className='text-[.6875rem] text-grey font-regular'>
                {new Date(paymentTime)
                  .toLocaleTimeString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                  .replace(',', '')
                  .replace('/', '.')}
              </span>
            </div>
            <span className='text-[.6875rem] text-[#C1C1C1] font-medium'>
              {bankName} {accountName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
