import { COLORS_MAP } from '@/constants/color';
import { AccountsPayments } from '@/types/paymentType';

export const AccountDetailCard = ({
  account,
}: {
  account: AccountsPayments;
}) => {
  console.log(account);
  return (
    <div
      className='flex flex-col w-full rounded-xl p-5 items-start justify-around'
      style={{
        background: `linear-gradient(60deg, ${
          (COLORS_MAP[account.bankName] ?? COLORS_MAP['통합'])[0]
        } 0%, ${(COLORS_MAP[account.bankName] ?? COLORS_MAP['통합'])[1]} 50%, ${
          (COLORS_MAP[account.bankName] ?? COLORS_MAP['통합'])[0]
        } 100%)`,
      }}
    >
      <div className=''>
        {account.accountName ?? account.userName + '님의 총 자산'}
      </div>
      <div className='text-[0.8125rem] text-white/50'>
        {account.accountNumber ?? 'PayAll 통합 계좌'}
      </div>
      <div className='flex justify-between w-full'>
        <div className=' text-sm flex justify-center items-center'>잔액</div>
        <div className='tracking-wider  text-xl font-bold'>
          {account.totalBalance.toLocaleString()}
          <span className='text-[1rem] font-normal'> 원</span>
        </div>
      </div>
      <div className='flex justify-between w-full'>
        <div className='text-sm flex justify-center items-center'>
          이번달 지출
        </div>
        <div className=' text-xl font-bold tracking-wider '>
          {account.monthPaymentPrice.toLocaleString()}
          <span className='text-[1rem]'> 원</span>
        </div>
      </div>
    </div>
  );
};
