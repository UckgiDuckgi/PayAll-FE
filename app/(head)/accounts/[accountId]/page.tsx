import PaymentCard from '@/components/molecules/PaymentCard';
import { Bank } from '@/components/molecules/sion/AccountCard';
import { AccountDetailCard } from '@/components/molecules/sion/AccountDetailCard';
import TitleBottomLine from '@/components/ui/TitleBottomLine';
import { AccountsPaymentsDetail } from '@/types/paymentType';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export type PaymentData = {
  payment_id: number;
  payment_place: string;
  category: string;
  payment_price: number;
  payment_type: '오프라인' | '온라인';
  payment_time: string;
  bank_name: Bank;
  account_name: string;
};

const accounts: {
  bank_name: Bank;
  account_id: number;
  account_name: string;
  account_number: string;
  balance: number;
}[] = [
  {
    bank_name: 'union',
    account_id: 0,
    account_name: '김덕지님의 총 자산',
    account_number: '',
    balance: 1000000,
  },
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

const MOCK_PAYMENT: AccountsPaymentsDetail[] = [
  {
    paymentId: 1,
    paymentPlace: '성수정찬',
    category: 'RESTAURANT',
    paymentPrice: 8000,
    paymentType: 'OFFLINE',
    paymentTime: '2025-01-06T19:48:12',
    bankName: 'hana',
    accountName: '하나 달달 통장',
  },
  {
    paymentId: 2,
    paymentPlace: '밥플러스 성수에이팩센터점',
    category: 'RESTAURANT',
    paymentPrice: 8000,
    paymentType: 'OFFLINE',
    paymentTime: '2025-01-07T19:48:12',
    bankName: 'hana',
    accountName: '하나 달달 통장',
  },
  {
    paymentId: 3,
    paymentPlace: '쿠팡',
    category: 'SHOPPING',
    paymentPrice: 104000,
    paymentType: 'ONLINE',
    paymentTime: '2025-01-07T22:48:12',
    bankName: 'hana',
    accountName: '하나 달달 통장',
  },
];

export default function AccountDetail({
  params,
}: {
  params: { accountId: string };
}) {
  const listPerDate = MOCK_PAYMENT.reduce(
    (acc, payment) => {
      const date = dayjs(payment.paymentTime).format('MM.DD (ddd)');

      const existingGroup = acc.find((group) => group.date === date);

      if (existingGroup) {
        existingGroup.payments.push(payment);
        existingGroup.totalPayment += payment.paymentPrice;
      } else {
        acc.push({
          date,
          totalPayment: payment.paymentPrice,
          payments: [payment],
        });
      }

      return acc;
    },
    [] as {
      date: string;
      totalPayment: number;
      payments: AccountsPaymentsDetail[];
    }[]
  );
  return (
    <div className='overflow-y-scroll min-h-full'>
      <div className='mt-3'>
        <AccountDetailCard
          account={accounts[Number(params.accountId)]}
          expense={100000}
        />
      </div>
      <div className='mt-7 font-bold'>지출내역</div>
      <div className='mt-[1.125rem] flex flex-col gap-[1.875rem]'>
        {listPerDate.map((item) => (
          <div key={item.date}>
            <TitleBottomLine
              left={item.date}
              right={'-' + item.totalPayment.toLocaleString() + '원'}
            >
              {item.payments.map((payment) => (
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
  );
}
