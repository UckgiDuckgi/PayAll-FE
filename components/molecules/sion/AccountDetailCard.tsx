import { COLORS, GRADIENT_COLORS } from '@/constants/color';

type Account = {
  bank_name: string;
  account_name: string;
  account_number: string;
  balance: number;
};

type AccountDetailCardProps = {
  index: number;
  account: Account;
  expense: number;
};
export const AccountDetailCard = ({
  index,
  account,
  expense,
}: AccountDetailCardProps) => {
  return (
    <div
      className='flex flex-col w-full rounded-xl p-5 items-start justify-around'
      style={{
        background: `linear-gradient(60deg, ${COLORS[index]} 0%, ${GRADIENT_COLORS[index]} 50%, ${COLORS[index]} 100%)`,
      }}
    >
      <div className=''>{account.account_name}</div>
      <div className='text-[0.8125rem] text-white/50'>
        {account.account_number}
      </div>
      <div className='flex justify-between w-full'>
        <div className=' text-sm flex justify-center items-center'>잔액</div>
        <div className=' text-xl font-bold'>
          {account.balance.toLocaleString()}
          <span className='text-[1rem]'> 원</span>
        </div>
      </div>
      <div className='flex justify-between w-full'>
        <div className='text-sm flex justify-center items-center'>
          이번달 지출
        </div>
        <div className=' text-xl font-bold'>
          {expense.toLocaleString()}
          <span className='text-[1rem]'> 원</span>
        </div>
      </div>
    </div>
  );
};
