'use client';

import PaperReceipt from '@/components/ocr/PaperReceipt';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Item {
  name: string;
  amount: string;
  price: string;
  editing: boolean;
}

const tempItems: Item[] = [
  { name: '포도알맹이', amount: '1', price: '3200', editing: false },
  { name: '버터와플', amount: '1', price: '3800', editing: false },
  { name: '촉촉한초코칩', amount: '1', price: '3700', editing: false },
  { name: '마가렛트', amount: '1', price: '6980', editing: false },
];

export default function Receipt() {
  const [items, setItems] = useState<Item[]>(tempItems);
  const router = useRouter();

  const clickHandler = () => {
    if (items.some((item) => item.editing)) {
      alert('수정중인 상품이 있습니다.');
      return;
    }
    console.log(items);
    router.push('/details');
  };

  return (
    <div className='p-4'>
      <div className='pt-20 w-full'></div>
      <div className='w-full mb-3'>
        <PaperReceipt items={items} setItems={setItems} />
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
  );
}
