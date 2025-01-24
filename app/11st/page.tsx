'use client';

import { Item } from '@/app/api/payments/coupang/route';
import { PaymentInputForm } from '@/components/11st/paymentInputForm';
import ReCaptchaInputForm from '@/components/11st/reCaptchaInputForm';
import PincodeInputForm from '@/components/coupang/pincodeInputForm';
import { Button } from '@/components/ui/button';
import { API_ROUTE } from '@/constants/route';
import { useState } from 'react';
import { ElevenStreetResponse } from '../api/payments/11st/route';

export type OnClick = ({
  itemList,
  pincode,
  selectedTileList,
  isReCaptchaEnd,
}: {
  itemList: Item[];
  pincode?: string;
  selectedTileList?: string;
  isReCaptchaEnd?: boolean;
}) => Promise<void>;

export default function ElevenStreet() {
  const [response, setResponse] = useState<ElevenStreetResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const itemList: Item[] = [
    {
      productId: '7864138029',
      quantity: 1,
    },
  ];

  const handleOnClick = async ({
    itemList,
    pincode = '',
    selectedTileList = '',
    isReCaptchaEnd = false,
  }: {
    itemList: Item[];
    pincode?: string;
    selectedTileList?: string;
    isReCaptchaEnd?: boolean;
  }) => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ROUTE.payments.elevenstreet, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedTileList,
          isReCaptchaEnd,
          pincode,
          itemList,
        }),
      });

      const res = (await response.json()) as ElevenStreetResponse;
      setResponse(res ?? null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className='flex justify-center pt-10 text-3xl'>Loading...</div>;
  }

  if (!response) {
    return (
      <div className='flex justify-center pt-10'>
        <Button
          variant={'secondary'}
          onClick={() => handleOnClick({ itemList })}
        >
          11번가
        </Button>
      </div>
    );
  }

  const { status, result } = response;
  const { base64Image, tableSize } = result;
  console.log('🚀 ~ ElevenStreet ~ status:', status);

  return (
    <>
      {status === '11_PINCODE' ? (
        <PincodeInputForm onClick={handleOnClick} itemList={itemList} />
      ) : status === '11_RECAPTCHA' ? (
        <ReCaptchaInputForm
          base64Image={base64Image}
          tableSize={tableSize}
          onClick={handleOnClick}
          itemList={itemList}
        />
      ) : status === '11_PAYMENT' ? (
        <PaymentInputForm
          base64Image={base64Image}
          onClick={handleOnClick}
          itemList={itemList}
        />
      ) : status === '11_ERROR' ? (
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
