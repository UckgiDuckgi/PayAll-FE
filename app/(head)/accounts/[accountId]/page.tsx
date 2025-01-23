'use client';

import Loading from '@/components/Loading';
import PaymentCard from '@/components/molecules/PaymentCard';
import { AccountDetailCard } from '@/components/molecules/sion/AccountDetailCard';
import TitleBottomLine from '@/components/ui/TitleBottomLine';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { AccountsPayment } from '@/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { getAccountsDetail } from '@/lib/api';

dayjs.locale('ko');

export default function AccountDetail({
  params,
}: {
  params: { accountId: string };
}) {
  const { resData: accountsDetail, isLoading } = useGenericQuery(
    [QUERY_KEYS.ACCOUNTS_DETAIL, params.accountId],
    () =>
      getAccountsDetail({
        accountId:
          params.accountId === '0' ? undefined : Number(params.accountId),
      })
  );

  return (
    <>
      {isLoading || !accountsDetail ? (
        <Loading />
      ) : (
        <div className='overflow-y-scroll min-h-full'>
          <div className='mt-3'>
            <AccountDetailCard account={accountsDetail.data} />
          </div>
          <div className='mt-7 font-bold'>지출내역</div>
          <div className='mt-[1.125rem] flex flex-col gap-[1.875rem]'>
            {accountsDetail.data.paymentList.map((item: AccountsPayment) => (
              <div key={item.paymentDate}>
                <TitleBottomLine
                  left={dayjs(item.paymentDate).format('MM.DD (ddd)')}
                  right={'-' + item.dayPaymentPrice.toLocaleString() + '원'}
                >
                  {item.paymentDetail.map((payment) => (
                    <div key={payment.paymentId}>
                      <PaymentCard
                        showAccount={params.accountId === '0'}
                        paymentInfo={payment}
                      />
                    </div>
                  ))}
                </TitleBottomLine>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
