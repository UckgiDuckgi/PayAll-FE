'use client';

import { CoupangResponse, Item } from '@/app/api/coupang/route';
import PasswordInputForm from '@/components/coupang/passwordInputForm';
import PincodeInputForm from '@/components/coupang/pincodeInputForm';
import { Button } from '@/components/ui/button';
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
  }: {
    itemList: Item[];
    pincode?: string;
    password?: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/coupang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pincode,
          password,
          itemList,
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
          onClick={() => handleOnClick({ itemList })}
        >
          쿠팡
        </Button>
      </div>
    );
  }

  const { status, result } = coupangResponse;

  return (
    <>
      {status === 'PINCODE' ? (
        <PincodeInputForm onClick={handleOnClick} itemList={itemList} />
      ) : status === 'PASSWORD' ? (
        <PasswordInputForm
          base64Image={result}
          onClick={handleOnClick}
          itemList={itemList}
        />
      ) : (
        <div className='flex justify-center pt-10 text-3xl'>
          Payment Success!
        </div>
      )}
    </>
  );
}
