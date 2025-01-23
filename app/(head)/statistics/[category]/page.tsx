'use client';

import PaymentCard from '@/components/molecules/PaymentCard';
import { BenefitCard } from '@/components/molecules/sion/BenefitCard';
import TitleBottomLine from '@/components/ui/TitleBottomLine';
import { Badge } from '@/components/ui/badge';
import { CATEGORY } from '@/constants/category';
import { COLORS } from '@/constants/color';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { AccountsPayment, AccountsPayments } from '@/types/paymentType';
import { Category } from '@/types/table';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { getPaymentsCategory } from '@/lib/api';

dayjs.locale('ko');

function PaymentCategoryContent({ category }: { category: Category }) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  const { resData: paymentsData, isLoading } =
    useGenericQuery<AccountsPayments>(
      [QUERY_KEYS.STATISTICS_CATEGORY, category],
      () => getPaymentsCategory({ category })
    );

  if (!paymentsData || !paymentsData.data || isLoading) return <>Loading...</>;

  const {
    paymentCount,
    monthPaymentPrice,
    paymentList: payments,
  } = paymentsData.data;

  const paymentList = payments.filter(
    ({ paymentDate }) => dayjs(paymentDate).format('YYYY-MM') === date
  );

  return (
    <div className='space-y-6 mt-3'>
      <div className='space-y-2'>
        <div className='flex items-center justify-start gap-2'>
          <span
            className='box-border z-10 flex items-center justify-center w-[1.875rem] h-[1.875rem] rounded-full'
            style={{ background: COLORS[0] }}
          >
            <Image
              src={`/icons/Category/${category}.svg`}
              alt='category'
              width={14}
              height={14}
            />
          </span>
          <span className='text-[.875rem] text-grey'>
            {dayjs(date).format('YYYY년 M월')}
            <span
              className='ml-1 text-[1.0625rem] font-bold'
              style={{ color: COLORS[0] }}
            >
              {CATEGORY[category as Category]}
            </span>{' '}
            지출액
          </span>
        </div>
        <div className='space-x-2'>
          <span className='font-bold text-[1.5rem]'>
            {monthPaymentPrice.toLocaleString()}원
          </span>
          <Badge className='bg-deepDarkGrey px-2 py-1 rounded-full text-grey font-medium text-[.6875rem]'>
            총 {paymentCount}회
          </Badge>
        </div>
      </div>

      {paymentList?.map(
        ({ dayPaymentPrice, paymentDate, paymentDetail }: AccountsPayment) => (
          <div className='mt-4 w-full' key={`${paymentDate}${dayPaymentPrice}`}>
            <TitleBottomLine
              left={`${dayjs(paymentDate).format('MM월 DD일 (ddd)')}`}
              right={`${dayPaymentPrice?.toLocaleString() ?? 0}원`}
            >
              {paymentDetail?.map((pd) => (
                <div key={pd.paymentId}>
                  <PaymentCard showAccount={true} paymentInfo={pd} />
                </div>
              ))}
            </TitleBottomLine>
          </div>
        )
      )}

      <BenefitCard />
    </div>
  );
}

export default function Page({
  params,
}: {
  params: {
    category: Category;
  };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCategoryContent category={params.category} />
    </Suspense>
  );
}
