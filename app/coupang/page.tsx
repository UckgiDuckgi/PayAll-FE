'use client';

import { CoupangResponse, Item } from '@/app/api/payments/coupang/route';
import PasswordInputForm from '@/components/coupang/passwordInputForm';
import PincodeInputForm from '@/components/coupang/pincodeInputForm';
import { Button } from '@/components/ui/button';
import { API_ROUTE } from '@/constants/route';
import { useState } from 'react';

export type OnClick = ({
  itemList,
  pincode,
  password,
}: {
  itemList: Item[];
  pincode?: string;
  password?: string;
}) => Promise<void>;

export default function Coupang() {
  const [coupangResponse, setCoupangResponse] =
    useState<CoupangResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const itemList: Item[] = [
    {
      productId: '7666070794',
      itemId: '90437044721',
      quantity: 1,
    },
    {
      productId: '7958974',
      itemId: '91118401786',
      quantity: 2,
    },
    {
      productId: '2042132',
      itemId: '86533230299',
      quantity: 2,
    },
    {
      productId: '7591951475',
      quantity: 1,
    },
  ];

  const handleOnClick = async ({
    itemList,
    pincode = '',
    password = '',
    init = false,
  }: {
    itemList: Item[];
    pincode?: string;
    password?: string;
    init?: boolean;
  }) => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ROUTE.payments.coupang, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pincode,
          password,
          itemList,
          init,
        }),
      });

      const res = (await response.json()) as CoupangResponse;
      setCoupangResponse(res ?? null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className='flex justify-center pt-10 text-3xl'>Loading...</div>;
  }

  if (!coupangResponse) {
    return (
      <div className='flex justify-center pt-10'>
        <Button
          variant={'secondary'}
          onClick={() => handleOnClick({ itemList, init: true })}
        >
          쿠팡
        </Button>
      </div>
    );
  }

  const { status, result } = coupangResponse;

  return (
    <>
      {status === 'C_PINCODE' ? (
        <PincodeInputForm onClick={handleOnClick} itemList={itemList} />
      ) : status === 'C_PASSWORD' ? (
        <PasswordInputForm
          base64Image={result}
          onClick={handleOnClick}
          itemList={itemList}
        />
      ) : status === 'C_ERROR' ? (
        <div className='flex justify-center pt-10 text-3xl'>
          에러가 발생했습니다. 새로고침해주세요.
        </div>
      ) : (
        <div className='flex justify-center pt-10 text-3xl'>
          Payment Success!
        </div>
      )}
    </>
  );
}
