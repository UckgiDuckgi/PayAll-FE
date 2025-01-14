import { PaymentData } from '@/app/haebeen/page';
import UploadButton from './ui/UploadButton';

// TODO: props에 data 추가
function PaymentCard({
  showAccount = true,
  paymentInfo,
}: {
  showAccount: boolean;
  paymentInfo: PaymentData;
}) {
  if (!paymentInfo) return;

  const {
    payment_id,
    payment_place,
    category,
    payment_price,
    payment_type,
    payment_time,
    bank_name,
    account_name,
  } = paymentInfo;
  return (
    <div className='w-full py-3 border-b-[1px] border-darkGrey space-y-2'>
      <div className='flex items-center justify-between'>
        <div className='space-x-2'>
          <span className='text-[.8125rem]'>{payment_place}</span>
          <span className='text-[.6875rem] text-[#858585]'>{category}</span>
        </div>
        <span className='text-[.9375rem] font-bold'>
          - {payment_price.toLocaleString()}원
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <span className='text-[.6875rem] text-main font-regular'>
              {payment_type} 결제
            </span>
            <span className='text-[.6875rem] text-grey font-regular'>
              {new Date(payment_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </span>
          </div>
          {showAccount ? (
            <span className='text-[.6875rem] text-grey font-regular'>
              {bank_name} {account_name}
            </span>
          ) : null}
        </div>
        {category !== '쇼핑' ? (
          <UploadButton />
        ) : (
          <a href={`/accounts/payments/${payment_id}`}>상세보기</a>
        )}
      </div>
    </div>
  );
}

export default PaymentCard;
