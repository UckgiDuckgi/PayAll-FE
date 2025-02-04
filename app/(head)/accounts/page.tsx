'use client';

import Loading from '@/components/Loading';
import { AccountCardList } from '@/components/molecules/sion/AccountCardList';
import AccountUnionCard from '@/components/molecules/sion/AccountUnionCard';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation, useGenericQuery } from '@/hooks/query/globalQuery';
import { PlatformType } from '@/types/authType';
import { TransformedOrder } from '@/types/payment';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { getAccounts, getPlatform, postPaymentDetail } from '@/lib/api';
import { getBodyByPlatform, getFetchUrlByPlatfrom } from '@/lib/utils';

export default function Accounts() {
  const { resData: accounts, isLoading } = useGenericQuery(
    [QUERY_KEYS.ACCOUNTS],
    () => getAccounts()
  );

  const { resData: platformData, isLoading: isPlatfromLoading } =
    useGenericQuery<PlatformType>([QUERY_KEYS.PLATFORM], () => getPlatform());

  const { mutate: mutatePaymentDetails } = useGenericMutation(
    [QUERY_KEYS.PAYMENT_DETAILS],
    ({ paymentList }: { paymentList: TransformedOrder[] }) =>
      postPaymentDetail({ paymentList })
  );

  const lastMonth = dayjs().subtract(1, 'month');
  const daysInLastMonth = lastMonth.daysInMonth();
  const currentDay = dayjs().date();
  const lastMonthDate = lastMonth.date(Math.min(currentDay, daysInLastMonth));
  const formattedLastMonthDate = lastMonthDate.format('MM월 DD일');

  const getPaymentDetailPromises = () => {
    const promises = [];
    for (const { platformName, id, password } of platformData.data
      ?.platformInfos ?? []) {
      promises.push(async () => {
        const response = await fetch(getFetchUrlByPlatfrom(platformName), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            getBodyByPlatform(platformName, id, password ?? '')
          ),
        });

        const { result } = await response.json();
        return result;
      });
    }
    return promises;
  };

  const handle = async () => {
    const paymentList = await Promise.all(
      getPaymentDetailPromises().map((asyncFunc) => asyncFunc())
    );

    mutatePaymentDetails({ paymentList: paymentList.flat() });
  };

  useEffect(() => {
    if (!platformData || !platformData.data || isPlatfromLoading) return;

    // handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlatfromLoading, platformData]);

  if (!platformData || !platformData.data || isPlatfromLoading) return <></>;

  return (
    <div>
      {isLoading || !accounts ? (
        <Loading />
      ) : (
        <div className='py-8 flex flex-col items-center justify-center'>
          <AccountUnionCard
            username={accounts.data?.userName}
            formattedLastMonthDate={formattedLastMonthDate}
            totalBalance={accounts.data?.totalBalance}
            difference={accounts.data?.paymentDifference}
          />
          <AccountCardList
            accounts={accounts.data?.accountList}
            className='mt-4'
          />
        </div>
      )}
    </div>
  );
}
