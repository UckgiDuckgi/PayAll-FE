'use client';

import PaperReceipt from '@/components/ocr/PaperReceipt';
import { Button } from '@/components/ui/button';
import { fileAtom } from '@/stores/atom';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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

export default function Receipt() {
  const [items, setItems] = useState<Item[]>([]);
  const [file] = useAtom(fileAtom);
  const [isLoading, setIsLoading] = useState(true);
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
    router.push('/details');
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='p-4'>
          <div className='pt-20 w-full'></div>
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

          <div className='fixed left-0 bottom-24 w-full px-6 items-center'>
            <Button
              className='w-full bg-[#6A8DFF] rounded-xl text-white hover:none'
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
        />
        <p className='mt-10 text-xl font-bold'>영수증을 분석중이에요</p>
      </div>
    </div>
  );
};
