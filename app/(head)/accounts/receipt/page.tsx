'use client';

import PaperReceipt from '@/components/ocr/PaperReceipt';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation } from '@/hooks/query/globalQuery';
import { fileAtom } from '@/stores/atom';
import { ReceiptList } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { postReceipt } from '@/lib/api';
import { requestWithFile } from '@/lib/ocrRequest';

interface Item {
  name: string;
  amount: string;
  price: string;
  editing: boolean;
}

interface OCRItem {
  name: { text: string };
  count: { text: string };
  price: { price: { text: string } };
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ReceiptContent />
    </Suspense>
  );
}

function ReceiptContent() {
  const [items, setItems] = useState<Item[]>([]);
  const [file] = useAtom(fileAtom);
  const [isLoading, setIsLoading] = useState(true);
  const paymentId = useSearchParams().get('paymentId');
  const queryClient = useQueryClient();
  const { mutate } = useGenericMutation(
    [QUERY_KEYS.PRODUCT_RECEIPT],
    (receipt: ReceiptList) => postReceipt(receipt),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.ACCOUNTS_DETAIL, paymentId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.ACCOUNTS_DETAIL],
        });
        router.back();
      },
    }
  );
  const router = useRouter();
  const titleRef = useRef('');
  const bizNumRef = useRef('');
  useEffect(() => {
    if (file) {
      requestWithFile(file)
        .then((result) => {
          setItems(
            result?.images?.[0]?.receipt?.result?.subResults?.[0]?.items.map(
              (item: OCRItem) => ({
                name: item.name.text,
                amount: item.count.text,
                price: item.price.price.text,
                editing: false,
              })
            )
          );
          titleRef.current =
            result?.images?.[0]?.receipt?.result?.storeInfo.name.text;
          bizNumRef.current =
            result?.images?.[0]?.receipt?.result?.storeInfo.bizNum.text;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [file]);

  const clickHandler = () => {
    if (items.some((item) => item.editing)) {
      alert('수정중인 상품이 있습니다.');
      return;
    }
    mutate({
      paymentId: Number(paymentId),
      productList: items.map((item) => ({
        productName: item.name,
        quantity: Number(item.amount),
        price: Number(item.price.replace(/,/g, '')),
      })),
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='pt-4'>
          <div className='text-white mb-5'>
            <p>영수증을 확인하시고,</p>
            <p>잘못된 부분은 수정해주세요</p>
          </div>
          <div className='w-full mb-3'>
            <PaperReceipt
              items={items}
              title={titleRef.current}
              bizNum={bizNumRef.current}
              setItems={setItems}
            />
          </div>

          <div className='fixed bottom-24 w-[90%] max-w-[460px] mx-auto'>
            <Button
              className='w-full bg-[#6A8DFF] rounded-xl text-white hover:bg-[#6A8DFF]'
              onClick={clickHandler}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

const Loading = () => {
  return (
    <div className='w-full min-h-[calc(100vh-100px)] flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <Image
          src='/images/ReceiptLoading.gif'
          alt='loading'
          width={250}
          height={250}
          priority
        />
        <p className='mt-10 text-xl font-bold'>영수증을 분석중이에요</p>
      </div>
    </div>
  );
};
