'use client';

import Loading from '@/components/Loading';
import PaymentCard from '@/components/molecules/PaymentCard';
import { AccountDetailCard } from '@/components/molecules/sion/AccountDetailCard';
import TitleBottomLine from '@/components/ui/TitleBottomLine';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { AccountsPayment } from '@/types';
import { PlatformType } from '@/types/authType';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { getAccountsDetail, getPlatform } from '@/lib/api';

dayjs.locale('ko');

export const PLATFORMS = ['쿠팡', '11번가', '네이버페이'];
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

  const { resData: platformData, isLoading: platformLoading } =
    useGenericQuery<PlatformType>([QUERY_KEYS.PLATFORM], () => getPlatform());

  if (isLoading || platformLoading || !platformData || !accountsDetail) {
    return <Loading />;
  }

  const platforms = platformData?.data?.platformInfos
    ?.map(({ platformName }) => {
      const platformMap: Record<string, string> = {
        COUPANG: '쿠팡',
        '11ST': '11번가',
        NAVER: '네이버페이',
      };
      return platformMap[platformName];
    })
    .filter((platform) => !PLATFORMS.includes(platform ?? ''));

  return (
    <>
      <div className='overflow-y-scroll scrollbar-hide min-h-full'>
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
                {item?.paymentDetail?.map((payment) => (
                  <div key={payment.paymentId}>
                    <PaymentCard
                      showAccount={params.accountId === '0'}
                      paymentInfo={payment}
                      isConnect={
                        platforms?.includes(
                          payment?.paymentPlace ?? '11번가'
                        ) ?? false
                      }
                    />
                  </div>
                ))}
              </TitleBottomLine>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
