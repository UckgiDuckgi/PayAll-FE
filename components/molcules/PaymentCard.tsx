import { Button } from '../ui/button';

type PaymentData = {
  payment_id: number;
  payment_place: string;
  category: string;
  payment_price: number;
  payment_type: '오프라인' | '온라인';
  payment_time: string;
  bank_name: string;
  account_name: string;
};

// TODO: props에 data 추가
function PaymentCard({
  showAccount = true,
  // data
}: {
  showAccount: boolean;
  // data: PaymentData
}) {
  const data: PaymentData = {
    payment_id: 1,
    payment_place: '밥플러스 성수에이팩센터점',
    category: '외식',
    payment_price: 8000,
    payment_type: '오프라인',
    payment_time: '2025-01-07T19:48:12',
    bank_name: 'KB국민',
    account_name: 'ONE통장-저축예금',
  };

  return (
    <div className='w-full py-3 border-b-[1px] border-darkGrey space-y-2'>
      <div className='flex items-center justify-between'>
        <div className='space-x-2'>
          <span className='text-[.8125rem]'>{data.payment_place}</span>
          <span className='text-[.6875rem] text-[#858585]'>
            {data.category}
          </span>
        </div>
        <span className='text-[.9375rem] font-bold'>
          - {data.payment_price.toLocaleString()}원
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <span className='text-[.6875rem] text-main font-regular'>
              {data.payment_type} 결제
            </span>
            <span className='text-[.6875rem] text-grey font-regular'>
              {new Date(data.payment_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </span>
          </div>
          {showAccount ? (
            <span className='text-[.6875rem] text-grey font-regular'>
              {data.bank_name} {data.account_name}
            </span>
          ) : null}
        </div>
        {data?.category !== '쇼핑' ? (
          <Button className='h-fit py-1 px-2 flex items-center gap-1 bg-deepDarkGrey'>
            <span className='text-[.625rem] text-grey'>영수증 촬영</span>
            <span>*</span>
          </Button>
        ) : (
          <a href={`/accounts/payments/${data.payment_id}`}>상세보기</a>
        )}
      </div>
    </div>
  );
}

export default PaymentCard;
