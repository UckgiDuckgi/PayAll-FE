import { IconIndicator } from '@/components/ui/IconIndicator';
import { COLORS_MAP } from '@/constants/color';

//${GRADIENT_COLORS[index]}
//${COLORS[index]}

export type Bank = 'hana' | 'kb' | 'sinhan' | 'kakao' | 'woori';
type Account = {
  bank_name: Bank;
  account_name: string;
  account_number: string;
  balance: number;
};
export const AccountCard = ({
  account,
}: {
  index: number;
  account: Account;
}) => {
  if (!account) return;
  console.log(COLORS_MAP[account.bank_name]);
  return (
    <button>
      <div
        className='overflow-hidden relative flex flex-col w-full justify-between rounded-[15px] py-5 px-6 h-28'
        style={{
          background: `linear-gradient(to right, ${COLORS_MAP[account.bank_name][0]}, ${COLORS_MAP[account.bank_name][1]})`,
        }}
      >
        <div className='flex gap-2'>
          <div className='flex flex-col'>
            <div className='tracking-wider text-[0.6875rem] w-full text-left font-bold'>
              {account.account_name}
            </div>
            <div className='tracking-wider text-[1.125rem] font-bold'>
              {account.balance.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className='text-right text-[0.5rem]'>
          지출내역 상세보기<span className='ml-1'>{'>'}</span>
        </div>
        <div className='absolute -top-5 right-10 overflow-hidden'>
          <IconIndicator
            src={`/images/banks/${account.bank_name}.png`}
            height={180}
            opacity={0.4}
          />
        </div>
      </div>
    </button>
  );
};
