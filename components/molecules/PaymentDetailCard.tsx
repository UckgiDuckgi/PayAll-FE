import Image from 'next/image';
import { Counter } from '../ui/Counter';
import { IconIndicator } from '../ui/IconIndicator';
import BottomSheet from './ui/BottomSheet';

function PaymentDetailCard({
  productName,
  price,
  lowestPrice,
  vendorName,
}: {
  productName: string;
  price: number;
  lowestPrice: number;
  vendorName: string;
}) {
  return (
    <div className='w-full px-2 py-4 space-y-1 border-b-[1px] border-darkGrey'>
      <div className='flex items-center justify-between'>
        <span className='text-[.875rem] font-medium'>{productName}</span>
        <span className='tracking-wider text-[.9375rem] font-bold'>
          -{price.toLocaleString()}원
        </span>
      </div>
      <div className='flex items-center justify-between px-3 py-1 rounded-[5px] bg-deepDarkGrey'>
        <div className='py-1 flex flex-col items-start justify-center gap-1'>
          <span className='font-bold text-[.625rem] text-darkGrey'>
            같은 상품의 최저가
          </span>
          <div className='flex items-center justify-between gap-2'>
            <IconIndicator src={`/images/${vendorName}.png`} height={13} />
            <span className='text-[.75rem] font-medium'>
              {lowestPrice.toLocaleString()}원
            </span>
            <span className='text-[.625rem] text-main font-medium'>
              {(((price - lowestPrice) / price) * 100).toFixed(0)}% 절약
            </span>
          </div>
        </div>
        <BottomSheet
          title='해당 상품을 장바구니에 담으시겠습니까?'
          description={productName}
          desciptionFooter={
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-between gap-2'>
                <span className='text-white font-bold'>
                  {lowestPrice.toLocaleString()}원
                </span>
                <IconIndicator src={`/images/${vendorName}.png`} height={13} />
              </div>
              <Counter />
            </div>
          }
          btnTexts={['취소', '담기']}
        >
          <div className='relative cursor-pointer'>
            <button
              className='w-9 h-9 rounded-full bg-darkGrey flex items-center justify-center'
              onClick={() => {
                console.log('장바구니 모달 열기');
              }}
            >
              <Image
                src='/icons/HeaderCart.svg'
                alt='cart'
                width={20}
                height={20}
              />
            </button>
            <div className='absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#D9D9D9] flex items-center justify-center text-xs font-bold text-darkGrey'>
              +
            </div>
          </div>
        </BottomSheet>
      </div>
    </div>
  );
}

export default PaymentDetailCard;
