'use client';

import { IconIndicator } from '@/components/ui/IconIndicator';
import { cn } from '@/lib/utils';

export const VenderCard = ({
  shop,
  price,
  selected = false,
  onClick,
}: {
  shop: string;
  price: number;
  selected?: boolean;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick}>
      <div
        className={cn(
          'flex flex-col bg-[#414141] p-2 h-12 w-[6.5rem] justify-between rounded-md relative text-left',
          selected && [
            'after:absolute after:inset-[-1px] after:border-2 after:border-[#8c8c8c] after:rounded-md',
            'bg-gradient-to-br from-[#2e2e2e] to-[#5f5f5f]',
          ]
        )}
      >
        <IconIndicator src={`/images/${shop}.png`} height={13} />
        <div className='text-white text-xs font-bold text-right'>
          {price.toLocaleString()}원
        </div>
        {selected && (
          <div className='absolute top-0 right-0 w-[1.625rem] h-[0.8125rem] bg-[#8c8c8c] text-[0.5rem] text-white font-bold text-center rounded-tr-md rounded-bl-md'>
            선택
          </div>
        )}
      </div>
    </button>
  );
};
