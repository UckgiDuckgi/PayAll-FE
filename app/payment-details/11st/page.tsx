'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QUERY_KEYS } from '@/constants/queryKey';
import { API_ROUTE } from '@/constants/route';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { Platform } from '@/types';
import { PlatformType } from '@/types/authType';
import { GetCookieResponse, TransformedOrder } from '@/types/payment';
import { useState } from 'react';
import { getPlatform } from '@/lib/api';
import { formatCookies } from '@/lib/utils';

export default function ElevenStreetPayments() {
  const [serverData, setServerData] = useState<TransformedOrder[] | null>(null);

  const [naverPayResponse, setNaverPayResponse] =
    useState<GetCookieResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { resData: platformData, isLoading: isPlatformLoading } =
    useGenericQuery<PlatformType>([QUERY_KEYS.PLATFORM], () => getPlatform());

  if (isPlatformLoading) {
    return <>Loading...</>;
  }

  const getPlatformInfo = (pName: Platform) =>
    platformData.data?.platformInfos.find(
      ({ platformName }) => platformName === pName
    );

  const platformInfo = getPlatformInfo('11ST');

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ROUTE.cookies.elevenstreet, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = (await response.json()) as GetCookieResponse;
      setNaverPayResponse(res ?? null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const openWindows = (urls: string[]) => {
  //     urls.forEach((url) => openWindow(url));
  //   };

  const handleInput = async () => {
    try {
      const response = await fetch(API_ROUTE.payment_details.elevenstreet, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://buy.11st.co.kr/my11st/order/BuyManager.tmall',
          shDateFrom: '20200701',
          shDateTo: '20250119',
          pageNumber: 1,
          rows: 10,
          id: platformInfo?.id,
          pw: platformInfo?.password,
        }),
      });
      const { result } = await response.json();
      setServerData(result ?? null);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='w-[90%] mx-auto'>
      <div className='mx-auto text-4xl pt-10 text-center'>
        거래 내역 테스트 짬통
      </div>

      <p className='pt-10'>쿠키 가져오기 테스트</p>
      {isLoading ? (
        <>Loading...</>
      ) : naverPayResponse ? (
        <article className='text-wrap bg-white text-black p-[10px] rounded-[5px] overflow-auto max-h-[300px] border border-gray-300'>
          <p className='break-words whitespace-pre-wrap'>
            {formatCookies(naverPayResponse.result)}
          </p>
        </article>
      ) : (
        <Button
          className='font-extrabold mt-3 bg-blue-500 hover:bg-blue-400'
          onClick={handleOnClick}
        >
          11번가 쿠키 가져오기
        </Button>
      )}

      <p className='pt-10 pb-2'>주문내역 불러오기 테스트</p>
      <Button className='bg-blue-500 hover:bg-blue-400' onClick={handleInput}>
        11번가 주문내역 불러오기
      </Button>
      <div>
        {serverData ? (
          <div className='pt-2'>
            <div className='flex justify-between'>
              <span className='w-1/3'>구매일자</span>
              <span className='w-1/3'>총가격</span>
            </div>
            <Separator />
            {serverData.map(({ paymentTime, purchaseProductList }, idx) => (
              <>
                <Separator />

                <div className='flex flex-col' key={idx}>
                  <div className='flex'>
                    <span className='w-1/3'>
                      {new Date(paymentTime).toLocaleDateString()}
                    </span>
                  </div>
                  <Separator />
                  {purchaseProductList.map(
                    ({ productName, price, quantity }, idx) => {
                      return (
                        <>
                          <Separator />

                          <div className='flex' key={idx + 100}>
                            <span className='w-1/3'>{productName}</span>
                            <span className='w-1/3'>{quantity}</span>
                            <span className='w-1/3'>{price}</span>
                          </div>
                          <Separator />
                        </>
                      );
                    }
                  )}
                </div>
              </>
            ))}
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
}
