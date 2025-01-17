'use client';

import { Item } from '@/app/api/coupang/route';
import PincodeInputForm from '@/components/coupang/pincodeInputForm';
import ReCaptchaInputForm from '@/components/coupang/reCaptchaInputForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ElevenStreetResponse } from '../api/11st/route';

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
      const response = await fetch('/api/11st', {
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
      {status === 'PINCODE' ? (
        <PincodeInputForm onClick={handleOnClick} itemList={itemList} />
      ) : status === 'RECAPTCHA' ? (
        <ReCaptchaInputForm
          base64Image={base64Image}
          tableSize={tableSize}
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
