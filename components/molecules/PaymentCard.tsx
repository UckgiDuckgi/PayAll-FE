import { AccountsPaymentsDetail } from '@/types';
import { ChevronRight } from 'lucide-react';
import { parseCategory, parsePaymentType } from '@/lib/utils';
import UploadButton from './ui/UploadButton';

function PaymentCard({
  showAccount = true,
  paymentInfo,
}: {
  showAccount: boolean;
  paymentInfo: AccountsPaymentsDetail;
}) {
  if (!paymentInfo) return;

  const {
    paymentId,
    paymentPlace,
    category,
    paymentPrice,
    paymentType,
    paymentTime,
    bankName,
    accountName,
    shootNeed,
  } = paymentInfo;

  return (
    <div className='w-full py-3 border-b-[1px] border-darkGrey space-y-2'>
      <div className='flex items-center justify-between'>
        <div className='space-x-2'>
          <span className='text-[.8125rem]'>{paymentPlace}</span>
          <span className='text-[.6875rem] text-[#858585]'>
            {parseCategory(category)}
          </span>
        </div>
        <span className='text-[.9375rem] font-bold'>
          - {paymentPrice.toLocaleString()}원
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <span className='text-[.6875rem] text-main font-regular'>
              {parsePaymentType(paymentType)} 결제
            </span>
            <span className='text-[.6875rem] text-grey font-regular'>
              {new Date(paymentTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </span>
          </div>
          {showAccount ? (
            <span className='text-[.6875rem] text-grey font-regular'>
              {bankName} {accountName}
            </span>
          ) : null}
        </div>
        {shootNeed && paymentType === 'OFFLINE' ? (
          <UploadButton paymentId={paymentId} />
        ) : (
          <div>
            {!shootNeed && (
              <a
                href={`/accounts/payments/${paymentId}`}
                className='text-[0.5rem] font-medium flex items-center gap-1'
              >
                상세보기 <ChevronRight className='w-2 h-2' />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentCard;
