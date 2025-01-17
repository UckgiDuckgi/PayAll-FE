'use client';

import DeliveryFeeProgress from '@/components/molecules/DeliveryFeeProgress';
import { CartProductCard } from '@/components/molecules/sion/CartProductCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

type CartItem = {
  pid: number;
  imageUrl: string;
  title: string;
  price: number;
  shop: string;
};

type CartItemState = {
  isChecked: boolean;
  quantity: number;
};

const MOCK_CART_ITEMS: CartItem[] = [
  {
    pid: 1,
    imageUrl: '/images/Logo.png',
    title: '나드 리프레쉬 퍼퓸드 바디워시 본품,프레쉬라벤더향, 680ml, 1개입 ',
    price: 8900,
    shop: '11st',
  },
  {
    pid: 2,
    imageUrl: '/images/Logo.png',
    title: '나드 리프레쉬 퍼퓸드 바디워시 본품,프레쉬라벤더향, 680ml, 1개입 ',
    price: 8900,
    shop: '11st',
  },
  {
    pid: 3,
    imageUrl: '/images/Logo.png',
    title: '나드 리프레쉬 퍼퓸드 바디워시 본품,프레쉬라벤더향, 680ml, 1개입 ',
    price: 8900,
    shop: '11st',
  },
];

const USER_INFO = {
  name: '문해빈',
  phone: '010-7330-9731',
  address:
    '서울 성동구 뚝섬로1가길 17 (성수동1가, 얼리브홈 서울숲), 503호 [04779]',
};

const DELIVERY_FEE = 2000;

export default function CartPage() {
  const [cartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);
  const [itemStates, setItemStates] = useState<Map<number, CartItemState>>(
    () => {
      const initialMap = new Map();
      MOCK_CART_ITEMS.forEach((item) => {
        initialMap.set(item.pid, { isChecked: false, quantity: 1 });
      });
      return initialMap;
    }
  );

  const handleCheckChange = (pid: number, checked: boolean) => {
    setItemStates((prev) => {
      const newMap = new Map(prev);
      const currentState = newMap.get(pid) || { quantity: 1 };
      newMap.set(pid, { ...currentState, isChecked: checked });
      return newMap;
    });
  };

  const handleQuantityChange = (pid: number, count: number) => {
    setItemStates((prev) => {
      const newMap = new Map(prev);
      const currentState = newMap.get(pid) || { isChecked: false };
      newMap.set(pid, { ...currentState, quantity: count });
      return newMap;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setItemStates((prev) => {
      const newMap = new Map(prev);
      cartItems.forEach((item) => {
        const currentState = newMap.get(item.pid) || { quantity: 1 };
        newMap.set(item.pid, { ...currentState, isChecked: checked });
      });
      return newMap;
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((sum, item) => {
      const state = itemStates.get(item.pid);
      if (state?.isChecked) {
        return sum + item.price * (state.quantity || 1);
      }
      return sum;
    }, 0);
  };

  const calculateDeliveryFee = () => {
    return calculateTotalPrice() >= 19900 || calculateTotalPrice() === 0
      ? 0
      : DELIVERY_FEE;
  };

  const calculateSelectedItemsCount = () => {
    return Array.from(itemStates.entries()).reduce((sum, [, state]) => {
      if (state.isChecked) {
        return sum + state.quantity;
      }
      return sum;
    }, 0);
  };

  return (
    <div className='flex flex-col gap-[0.625rem] pb-24'>
      <DeliveryFeeProgress fee={calculateTotalPrice()} totalFee={19900} />
      <div className='flex items-center gap-2 my-3'>
        <Checkbox
          checked={cartItems.every(
            (item) => itemStates.get(item.pid)?.isChecked
          )}
          onCheckedChange={handleSelectAll}
        />
        <span className='text-white text-[0.6875rem]'>전체 선택</span>
      </div>

      {cartItems.map((item) => {
        const state = itemStates.get(item.pid) || {
          isChecked: false,
          quantity: 1,
        };
        return (
          <CartProductCard
            key={item.pid}
            {...item}
            isChecked={state.isChecked}
            quantity={state.quantity}
            onCheckChange={handleCheckChange}
            onQuantityChange={handleQuantityChange}
          />
        );
      })}
      <div className='w-[111.2%] bg-black -mx-[5.6%]'>
        <div className='flex flex-col gap-2 w-[90%] mx-auto py-[0.875rem]'>
          <div className='font-bold text-[0.9375rem]'>배송 정보</div>
          <div className='text-grey  text-xs'>
            <span className=''>{USER_INFO.name}</span>
            <span className='mx-2'>·</span>
            <span className=''>{USER_INFO.phone}</span>
          </div>
          <div className='text-white text-xs'>{USER_INFO.address}</div>
        </div>
      </div>
      <div className='w-[111.2%] bg-black -mx-[5.6%]'>
        <div className='flex flex-col gap-2 w-[90%] mx-auto py-[0.875rem]'>
          <div className='font-bold text-[0.9375rem]'>결제 수단</div>
        </div>
      </div>
      <div className='w-[111.2%] bg-black -mx-[5.6%]'>
        <div className='flex flex-col gap-2 w-[90%] mx-auto py-[0.875rem]'>
          <div className='font-bold text-[0.9375rem]'>결제 예상 금액</div>
          <div className='flex flex-col gap-1 mt-1 border-b border-[#D9D9D9] pb-3'>
            <div className='text-grey text-xs w-full flex justify-between '>
              <span>상품 금액</span>
              <span className=''>
                {calculateTotalPrice().toLocaleString()}원
              </span>
            </div>
            <div className='text-grey text-xs w-full flex justify-between '>
              <span>배송비</span>
              <span className=''>
                {calculateDeliveryFee().toLocaleString()}원
              </span>
            </div>
          </div>
          <div className='text-white font-bold flex justify-between w-full'>
            <span className='text-sm'>총 금액</span>
            <span className='text-main'>
              {(
                calculateTotalPrice() + calculateDeliveryFee()
              ).toLocaleString()}
              원
            </span>
          </div>
        </div>
      </div>
      <div className='fixed left-0 bottom-24 w-full px-6 items-center'>
        <Button
          className='w-full bg-[#6A8DFF] rounded-xl hover:none'
          onClick={() => {}}
        >
          <div className='flex items-center justify-between'>
            <span className='text-main font-bold text-[0.9375rem] rounded-full bg-white w-6 h-6 flex items-center justify-center mr-1'>
              {calculateSelectedItemsCount()}
            </span>
            <span>
              {' 개 '}
              {(
                calculateTotalPrice() + calculateDeliveryFee()
              ).toLocaleString()}
              원 구매하기
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
}
