import { Bank } from '@/components/molecules/sion/AccountCard';
import { AccountCardList } from '@/components/molecules/sion/AccountCardList';
import AccountUnionCard from '@/components/molecules/sion/AccountUnionCard';
import dayjs from 'dayjs';

const accounts: {
  bank_name: Bank;
  account_id: number;
  account_name: string;
  account_number: string;
  balance: number;
}[] = [
  {
    bank_name: 'sinhan',
    account_id: 1,
    account_name: '신한 쌀쌀 통장',
    account_number: '123-12-1234567',
    balance: 1000000,
  },
  {
    bank_name: 'hana',
    account_id: 2,
    account_name: '하나 달달 통장',
    account_number: '123-12-1234567',
    balance: 1000000,
  },
  {
    bank_name: 'woori',
    account_id: 3,
    account_name: '우리 칼칼 통장',
    account_number: '123-12-1234567',
    balance: 1000000,
  },
  {
    bank_name: 'kb',
    account_id: 4,
    account_name: '국민 깔깔 통장',
    account_number: '123-12-1234567',
    balance: 1000000,
  },
  {
    bank_name: 'kakao',
    account_id: 5,
    account_name: '카카오 팔팔 통장',
    account_number: '123-12-1234567',
    balance: 1000000,
  },
];

export default function Accounts() {
  const lastMonth = dayjs().subtract(1, 'month');
  const daysInLastMonth = lastMonth.daysInMonth();
  const currentDay = dayjs().date();

  const lastMonthDate = lastMonth.date(Math.min(currentDay, daysInLastMonth));
  const formattedLastMonthDate = lastMonthDate.format('MM월 DD일');

  return (
    <div className='py-8 flex flex-col items-center justify-center'>
      <AccountUnionCard
        username='김덕지'
        formattedLastMonthDate={formattedLastMonthDate}
        totalBalance={123456}
        difference={123456}
      />
      <AccountCardList accounts={accounts} className='mt-4' />
    </div>
  );
}
