import { IconIndicator } from '@/components/ui/IconIndicator';
import { COLORS_MAP } from '@/constants/color';
import { Account } from '@/types';

export const AccountCard = ({
  account,
  onClick,
}: {
  account: Account;
  onClick: () => void;
}) => {
  if (!account) return;
  return (
    <button className='w-full' onClick={onClick}>
      <div
        className='overflow-hidden relative flex flex-col w-full justify-between rounded-[15px] py-5 px-6 h-28'
        style={{
          background: `linear-gradient(to right, ${COLORS_MAP[account.bankName][0]}, ${COLORS_MAP[account.bankName][1]})`,
        }}
      >
        <div className='flex gap-2'>
          <div className='flex flex-col'>
            <div className='tracking-wider text-[0.6875rem] w-full text-left'>
              {account.accountName}
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
            src={`/images/banks/${account.bankName}.png`}
            height={180}
            opacity={0.4}
          />
        </div>
      </div>
    </button>
  );
};
