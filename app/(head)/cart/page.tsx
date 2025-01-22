'use client';

import DeliveryFeeProgress from '@/components/molecules/DeliveryFeeProgress';
import CardSlide from '@/components/molecules/sion/CardSlide';
import { CartProductCard } from '@/components/molecules/sion/CartProductCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation, useGenericQuery } from '@/hooks/query/globalQuery';
import { ApiResponse, Cart, Purchase } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCart, getCart, postPurchase, updateCart } from '@/lib/api';

type CartItemState = {
  isChecked: boolean;
  quantity: number;
};

const USER_INFO = {
  name: '문해빈',
  phone: '010-7330-9731',
  address:
    '서울 성동구 뚝섬로1가길 17 (성수동1가, 얼리브홈 서울숲), 503호 [04779]',
};

const MOCK_CARDS = [
  {
    id: 1,
    bankName: '신한카드',
    cardNumber: '1234-****-****-5678',
    imageUrl: 'sinhan.svg',
  },
  {
    id: 2,
    bankName: '삼성카드',
    cardNumber: '5678-****-****-1234',
    imageUrl: 'samsung.svg',
  },
  {
    id: 3,
    bankName: '하나카드',
    cardNumber: '9012-****-****-3456',
    imageUrl: 'hana.svg',
  },
  {
    id: 4,
    bankName: '하나카드',
    cardNumber: '9012-****-****-3456',
    imageUrl: 'hana.svg',
  },
];

const DELIVERY_FEE = 2000;

export default function CartPage() {
  const { resData: cartList, isLoading } = useGenericQuery<Cart[]>(
    [QUERY_KEYS.CART_LIST],
    () => getCart()
  );
  const queryClient = useQueryClient();
  const { mutate } = useGenericMutation(
    [QUERY_KEYS.DELETE_CART],
    (cartId: number) => deleteCart({ cartId })
  );

  const { mutate: updateCartMutate } = useGenericMutation(
    [QUERY_KEYS.UPDATE_CART],
    (data: { cartId: number; quantity: number }) => updateCart(data),
    {
      onSuccess: () => {},
    }
  );
  const { mutate: postPurchaseMutate } = useGenericMutation(
    [QUERY_KEYS.PURCHASE],
    (data: Purchase) => postPurchase(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.CART_LIST],
        });
      },
    }
  );

  const [itemStates, setItemStates] = useState<Map<number, CartItemState>>(
    () => {
      const initialMap = new Map();
      cartList?.data?.forEach((item) => {
        initialMap.set(item.productId, {
          isChecked: false,
          quantity: item.quantity,
        });
      });
      return initialMap;
    }
  );
  const router = useRouter();

  const handleCheckChange = (productId: number, checked: boolean) => {
    setItemStates((prev) => {
      const newMap = new Map(prev);
      const currentState = newMap.get(productId) || { quantity: 1 };
      newMap.set(productId, { ...currentState, isChecked: checked });
      return newMap;
    });
  };

  const handleQuantityChange = (
    cartId: number,
    productId: number,
    count: number
  ) => {
    setItemStates((prev) => {
      const newMap = new Map(prev);
      const currentState = newMap.get(productId) || { isChecked: false };
      newMap.set(productId, { ...currentState, quantity: count });
      return newMap;
    });
    updateCartMutate({ cartId: cartId, quantity: count });
    queryClient.setQueryData(
      [QUERY_KEYS.CART_LIST],
      (oldData: ApiResponse<Cart[]>) => {
        return {
          ...oldData,
          data: oldData?.data?.map((item) =>
            item.cartId === cartId ? { ...item, quantity: count } : item
          ),
        };
      }
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setItemStates((prev) => {
      const newMap = new Map(prev);
      cartList?.data?.forEach((item) => {
        const currentState = newMap.get(item.productId) || { quantity: 1 };
        newMap.set(item.productId, { ...currentState, isChecked: checked });
      });
      return newMap;
    });
  };

  const handleDelete = (cartId: number) => {
    mutate(cartId);
  };

  const handlePurchase = () => {
    postPurchaseMutate({
      purchaseList:
        cartList?.data?.filter(
          (item) => itemStates.get(item.productId)?.isChecked
        ) ?? [],
      totalPrice: calculateTotalPrice(),
      totalDiscountPrice: calculateTotalSavings(),
    });
    router.push('/');
  };

  const calculateTotalPrice = () => {
    return (
      cartList?.data?.reduce((sum, item) => {
        const state = itemStates.get(item.productId);
        if (state?.isChecked) {
          return sum + item.productPrice * (state.quantity || 1);
        }
        return sum;
      }, 0) ?? 0
    );
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

  const calculateTotalSavings = () => {
    return (
      cartList?.data?.reduce((sum, item) => {
        const state = itemStates.get(item.productId);
        if (state?.isChecked) {
          const priceDiff =
            item.prevPrice > item.productPrice
              ? (item.prevPrice - item.productPrice) * (state.quantity || 1)
              : 0;
          return sum + priceDiff;
        }
        return sum;
      }, 0) ?? 0
    );
  };

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div className='flex flex-col gap-[0.625rem] pb-24'>
          <DeliveryFeeProgress fee={calculateTotalPrice()} totalFee={19900} />
          <div className='flex items-center gap-2 my-3'>
            <Checkbox
              checked={cartList?.data?.every(
                (item) => itemStates.get(item.productId)?.isChecked
              )}
              onCheckedChange={handleSelectAll}
            />
            <span className='text-white text-[0.6875rem]'>전체 선택</span>
          </div>

          {cartList?.data?.map((item) => {
            const state = itemStates.get(item.productId) || {
              isChecked: false,
              quantity: item.quantity,
            };
            return (
              <CartProductCard
                key={item.productId}
                cartId={item.cartId}
                imageUrl={item.image}
                productId={item.productId}
                title={item.productName}
                price={item.productPrice}
                shop={item.storeName}
                quantity={item.quantity}
                isChecked={state.isChecked}
                onCheckChange={handleCheckChange}
                onQuantityChange={handleQuantityChange}
                onDelete={handleDelete}
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
              <CardSlide cards={MOCK_CARDS} />
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
          <div className='fixed bottom-24 w-[90%] max-w-[460px] mx-auto items-center z-50'>
            <Button
              className='w-full bg-[#6A8DFF] rounded-xl hover:none'
              onClick={handlePurchase}
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
      )}
    </>
  );
}
