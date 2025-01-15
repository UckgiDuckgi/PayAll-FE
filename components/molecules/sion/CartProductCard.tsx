import { Counter } from '@/components/ui/Counter';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { SquareImage } from '@/components/ui/SquareImage';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

export const CartProductCard = ({
  imageUrl,
  title,
  price,
  shop,
}: {
  imageUrl: string;
  pid: number;
  title: string;
  price: number;
  shop: string;
}) => {
  return (
    <div className='flex gap-2 p-4 bg-black'>
      <Checkbox />
      <SquareImage src={imageUrl} alt={title} size={78} />

      <div className='flex flex-col w-2/3 gap-1'>
        <div className='flex justify-between'>
          <div className='text-white w-3/4 text-xs font-medium text-left'>
            {title}
          </div>
          <button>
            <X />
          </button>
        </div>
        <IconIndicator src={`/images/${shop}.png`} height={12} />
        <div className='flex justify-between'>
          <Counter />
          {price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
};
