import { Counter } from '@/components/ui/Counter';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { SquareImage } from '@/components/ui/SquareImage';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

export const CartProductCard = ({
  cartId,
  imageUrl,
  productId,
  title,
  price,
  shop,
  quantity,
  isChecked,
  onCheckChange,
  onQuantityChange,
  onDelete,
}: {
  cartId: number;
  imageUrl: string;
  productId: number;
  title: string;
  price: number;
  shop: string;
  quantity: number;
  isChecked: boolean;
  onCheckChange: (productId: number, checked: boolean) => void;
  onQuantityChange: (cartId: number, productId: number, count: number) => void;
  onDelete: (cartId: number) => void;
}) => {
  return (
    <div className='flex gap-2 p-4 bg-black'>
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked) =>
          onCheckChange(productId, checked as boolean)
        }
      />
      <SquareImage src={imageUrl} alt={title} size={78} />

      <div className='flex flex-col w-2/3 gap-2'>
        <div className='flex justify-between gap-8'>
          <div className='text-white text-xs text-left'>{title}</div>
          <button onClick={() => onDelete(cartId)}>
            <X />
          </button>
        </div>
        <IconIndicator
          src={`/images/vendors/${shop.toLowerCase()}.png`}
          height={12}
        />
        <div className='flex justify-between'>
          <Counter
            pid={productId}
            initialCount={quantity}
            onCountChange={(pid, count) => onQuantityChange(cartId, pid, count)}
          />
          <span className='font-bold'>
            {(price * quantity).toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};
