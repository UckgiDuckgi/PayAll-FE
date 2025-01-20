'use client';

import { GetCookieResponse } from '@/app/api/payment/naverpay/route';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CoupangOrderList } from '@/types/payment';
import { useState } from 'react';
import { formatCookies } from '@/lib/utils';

export default function CoupangPayments() {
  const [serverData, setServerData] = useState<CoupangOrderList[] | null>(null);

  const [naverPayResponse, setNaverPayResponse] =
    useState<GetCookieResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(
    (serverData ?? [
      {
        bundleReceiptList: 'test',
      },
    ])[0].bundleReceiptList
  );

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/payment/coupang', {
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
      const response = await fetch('/api/payment/coupang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://mc.coupang.com/ssr/api/myorders/model',
          cookie: formatCookies(naverPayResponse?.result ?? []),
          requestYear: 2024,
          pageIndex: 1,
          size: 10,
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
          쿠팡 쿠키 가져오기
        </Button>
      )}

      <p className='pt-10 pb-2'>주문내역 불러오기 테스트</p>
      <Button className='bg-blue-500 hover:bg-blue-400' onClick={handleInput}>
        쿠팡 주문내역 불러오기
      </Button>
      <div>
        {serverData ? (
          <div className='pt-2'>
            <div className='flex justify-between'>
              <span className='w-1/3'>구매일자</span>
              <span className='w-1/3'>총가격</span>
            </div>
            <Separator />
            {serverData.map(
              ({
                orderId,
                orderedAt,
                bundleReceiptList,
                totalProductPrice,
              }) => (
                <>
                  <Separator />

                  <div className='flex flex-col' key={orderId}>
                    <div className='flex'>
                      <span className='w-1/3'>
                        {new Date(orderedAt).toLocaleDateString()}
                      </span>
                      <span className='w-1/3'>{totalProductPrice}</span>
                    </div>
                    <Separator />
                    {bundleReceiptList.map(({ vendorItems }) => {
                      const {
                        vendorItemId,
                        vendorItemName,
                        quantity,
                        unitPrice,
                      } = vendorItems[0];
                      return (
                        <>
                          <Separator />

                          <div className='flex' key={vendorItemId}>
                            <span className='w-1/3'>{vendorItemName}</span>
                            <span className='w-1/3'>{quantity}</span>
                            <span className='w-1/3'>{unitPrice}</span>
                          </div>
                          <Separator />
                        </>
                      );
                    })}
                  </div>
                </>
              )
            )}
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
}
