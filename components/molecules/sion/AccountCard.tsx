import { IconIndicator } from '@/components/ui/IconIndicator';
import { COLORS, GRADIENT_COLORS } from '@/constants/color';

//${GRADIENT_COLORS[index]}
//${COLORS[index]}
type Account = {
  bank_name: string;
  account_name: string;
  account_number: string;
  balance: number;
};
export const AccountCard = ({
  index,
  account,
}: {
  index: number;
  account: Account;
}) => {
  return (
    <button>
      <div
        className='flex flex-col w-full rounded-xl p-4'
        style={{
          background: `linear-gradient(to top right, ${GRADIENT_COLORS[index]}, ${COLORS[index]})`,
        }}
      >
        <div className='flex gap-2'>
          <div className='flex items-center justify-center rounded-full w-8 h-8 bg-white/30'>
            <IconIndicator
              src={`/images/banks/${account.bank_name}.png`}
              height={22}
            />
          </div>
          <div className='flex flex-col'>
            <div className='text-[0.6875rem] w-full text-left'>
              {account.account_name}
            </div>
            <div className='text-lg'>{account.balance.toLocaleString()}원</div>
          </div>
        </div>
        <div className='text-right text-[0.5rem]'>지출내역 상세보기{'>'}</div>
      </div>
    </button>
  );
};
