import { Counter } from '@/components/ui/Counter';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { SquareImage } from '@/components/ui/SquareImage';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

export const CartProductCard = ({
  imageUrl,
  pid,
  title,
  price,
  shop,
  quantity,
  isChecked,
  onCheckChange,
  onQuantityChange,
}: {
  imageUrl: string;
  pid: number;
  title: string;
  price: number;
  shop: string;
  quantity: number;
  isChecked: boolean;
  onCheckChange: (pid: number, checked: boolean) => void;
  onQuantityChange: (pid: number, count: number) => void;
}) => {
  return (
    <div className='flex gap-2 p-4 bg-black'>
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked) => onCheckChange(pid, checked as boolean)}
      />
      <SquareImage src={imageUrl} alt={title} size={78} />

      <div className='flex flex-col w-2/3 gap-2'>
        <div className='flex justify-between gap-8'>
          <div className='text-white text-xs text-left'>{title}</div>
          <button>
            <X />
          </button>
        </div>
        <IconIndicator src={`/images/${shop}.png`} height={12} />
        <div className='flex justify-between'>
          <Counter
            pid={pid}
            initialCount={quantity}
            onCountChange={onQuantityChange}
          />
          <span className='font-bold'>
            {(price * quantity).toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};
