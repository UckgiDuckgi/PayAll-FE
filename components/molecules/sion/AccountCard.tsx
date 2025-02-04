import { IconIndicator } from '@/components/ui/IconIndicator';
import { COLORS_MAP } from '@/constants/color';
import { Account } from '@/types';
import Image from 'next/image';

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
          background: `linear-gradient(to right, ${
            (COLORS_MAP[account.bankName] ?? COLORS_MAP['통합'])[0]
          }, ${(COLORS_MAP[account.bankName] ?? COLORS_MAP['통합'])[1]})`,
        }}
      >
        <div className='flex gap-2'>
          <div className='flex flex-col'>
            <div className='tracking-wider text-[0.9rem] w-full text-left font-bold pt-1'>
              {account.accountName}
            </div>
            <div className='tracking-wider text-[1.2rem] font-bold'>
              {account.balance.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className='flex self-end items-center text-right font-bold'>
          <span className='text-[0.75rem]'>지출내역 상세보기</span>
          <Image
            src='/icons/RightBracket.svg'
            width={15}
            height={15}
            alt='Right'
          />
        </div>
        <div className='absolute -top-2 right-10 overflow-hidden'>
          <IconIndicator
            src={`/images/banks/${account.bankName}.svg`}
            width={180}
            opacity={0.8}
          />
        </div>
      </div>
    </button>
  );
};
