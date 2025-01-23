'use client';

import { AccountCardList } from '@/components/molecules/sion/AccountCardList';
import AccountUnionCard from '@/components/molecules/sion/AccountUnionCard';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import dayjs from 'dayjs';
import { getAccounts } from '@/lib/api';

export default function Accounts() {
  const { resData: accounts, isLoading } = useGenericQuery(
    [QUERY_KEYS.ACCOUNTS],
    () => getAccounts()
  );

  const lastMonth = dayjs().subtract(1, 'month');
  const daysInLastMonth = lastMonth.daysInMonth();
  const currentDay = dayjs().date();
  const lastMonthDate = lastMonth.date(Math.min(currentDay, daysInLastMonth));
  const formattedLastMonthDate = lastMonthDate.format('MM월 DD일');

  return (
    <div>
      {isLoading || !accounts ? (
        <>Loading</>
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
