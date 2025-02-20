'use client';

import Loading from '@/components/Loading';
import PaymentDetailCard from '@/components/molecules/PaymentDetailCard';
import PaymentInfoCard from '@/components/molecules/sion/PaymentInfoCard';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { PaymentDetailList } from '@/types';
import { getPaymentDetail } from '@/lib/api';

export default function PaymentDetailPage({
  params,
}: {
  params: { paymentId: string };
}) {
  const { resData: paymentDetailRes, isLoading } = useGenericQuery(
    [QUERY_KEYS.PAYMENT_DETAIL, params.paymentId],
    () =>
      getPaymentDetail({
        paymentId: Number(params.paymentId),
      })
  );
  return (
    <>
      {isLoading || !paymentDetailRes ? (
        <Loading />
      ) : (
        <div>
          <PaymentInfoCard paymentInfo={paymentDetailRes.data} />
          <div className='flex flex-col items-center justify-between mt-5'>
            <div className='font-bold w-full text-left border-b-[1px] border-[#D9D9D9] py-[0.875rem]'>
              상세내역
            </div>
            {paymentDetailRes.data.paymentDetailList.map(
              (detail: PaymentDetailList, index: number) => (
                <PaymentDetailCard key={index} {...detail} />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
