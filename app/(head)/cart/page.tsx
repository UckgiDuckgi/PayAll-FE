'use client';

import Loading from '@/components/Loading';
import DeliveryFeeProgress from '@/components/molecules/DeliveryFeeProgress';
import CardSlide from '@/components/molecules/sion/CardSlide';
import { CartProductCard } from '@/components/molecules/sion/CartProductCard';
import { PriceBox } from '@/components/molecules/sion/PriceBox';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation, useGenericQuery } from '@/hooks/query/globalQuery';
import { purchaseAtom, shopCartAtom } from '@/stores/atom';
import { ApiResponse, Cart, Purchase, shopCartItem } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  deleteCart,
  getCart,
  getUserInfo,
  postPurchase,
  updateCart,
} from '@/lib/api';
import { parseURL } from '@/lib/utils';

type CartItemState = {
  isChecked: boolean;
  quantity: number;
};

const MOCK_CARDS = [
  {
    id: 1,
    bankName: '신한카드',
    cardNumber: '1234-****-****-5678',
    imageUrl: 'sinhan.png',
  },
  {
    id: 2,
    bankName: '현대카드',
    cardNumber: '5678-****-****-1234',
    imageUrl: 'hyundai.png',
  },
  {
    id: 3,
    bankName: '국민카드',
    cardNumber: '9012-****-****-3456',
    imageUrl: 'kookmin.png',
  },
  {
    id: 4,
    bankName: '하나카드',
    cardNumber: '9012-****-****-3456',
    imageUrl: 'hana.png',
  },
];

const DELIVERY_FEE = 2000;

export default function CartPage() {
  const [, setShopCart] = useAtom(shopCartAtom);
  const [, setPurchase] = useAtom(purchaseAtom);
  const { resData: userInfo, isLoading: userInfoLoading } = useGenericQuery(
    [QUERY_KEYS.USER_INFO],
    () => getUserInfo()
  );

  const { resData: cartList, isLoading: cartListLoading } = useGenericQuery<
    Cart[]
  >([QUERY_KEYS.CART_LIST], () => getCart());
  const queryClient = useQueryClient();

  const { mutate } = useGenericMutation(
    [QUERY_KEYS.DELETE_CART],
    (cartId: number) => deleteCart({ cartId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.CART_LIST],
        });
      },
    }
  );

  const { mutate: updateCartMutate } = useGenericMutation(
    [QUERY_KEYS.UPDATE_CART],
    (data: { cartId: number; quantity: number }) => updateCart(data)
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
    () => new Map()
  );

  useEffect(() => {
    if (cartList?.data) {
      const initialMap = new Map();
      cartList.data.forEach((item) => {
        initialMap.set(item.productId, {
          isChecked: true,
          quantity: item.quantity,
        });
      });
      setItemStates(initialMap);
    }
  }, [cartList?.data]);

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
    console.log(queryClient.getQueryData([QUERY_KEYS.CART_LIST]));
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
    const selectedItems =
      cartList?.data?.filter(
        (item) => itemStates.get(item.productId)?.isChecked
      ) ?? [];

    const groupedItems = selectedItems.reduce(
      (acc, item) => {
        const productId = parseURL(item.link, 'productId');
        const itemId = parseURL(item.link, 'itemId');
        const quantity = itemStates.get(item.productId)?.quantity || 1;

        if (productId) {
          const cartItem = {
            productId,
            ...(itemId && { itemId }),
            quantity,
          };

          if (item.storeName === 'Coupang') {
            acc.coupang.push(cartItem);
          } else if (item.storeName === '11st') {
            acc['11st'].push(cartItem);
          }
        }
        return acc;
      },
      {
        coupang: [],
        '11st': [],
      } as shopCartItem
    );

    setShopCart(groupedItems);
    setPurchase({
      purchaseList: selectedItems,
      totalPrice: calculateTotalPrice() + calculateDeliveryFee(),
      totalDiscountPrice: calculateTotalSavings(),
    });

    postPurchaseMutate({
      purchaseList: selectedItems,
      totalPrice: calculateTotalPrice() + calculateDeliveryFee(),
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
      {userInfoLoading || cartListLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-[0.625rem] pb-24'>
          {(cartList?.data?.length ?? 0 > 0) ? (
            <>
              <DeliveryFeeProgress
                fee={calculateTotalPrice()}
                totalFee={19900}
              />
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
                    <span className=''>{userInfo?.data.name}</span>
                    <span className='mx-2'>·</span>
                    <span className=''>{userInfo?.data.phone}</span>
                  </div>
                  <div className='text-white text-xs'>
                    {userInfo?.data.address}
                  </div>
                </div>
              </div>
              <div className='w-[111.2%] bg-black -mx-[5.6%]'>
                <div className='flex flex-col gap-2 w-[90%] mx-auto py-[0.875rem]'>
                  <div className='font-bold text-[0.9375rem]'>결제 수단</div>
                  <CardSlide cards={MOCK_CARDS} />
                </div>
              </div>
              <div className='w-[111.2%] bg-black -mx-[5.6%]'>
                <PriceBox
                  totalPrice={calculateTotalPrice()}
                  deliveryFee={calculateDeliveryFee()}
                />
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
            </>
          ) : (
            <div className='flex flex-col gap-8 items-center justify-center min-h-[calc(100vh-15rem)]'>
              <div className='mx-auto w-[150px] sm:w-[200px] h-auto'>
                <Image
                  src='/images/bucket.svg'
                  alt='documentList'
                  width={200}
                  height={200}
                  className='float-animation'
                />
              </div>
              <div className='text-[1.25rem] font-bold'>
                장바구니가 비었습니다.
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
