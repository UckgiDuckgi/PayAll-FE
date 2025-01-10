'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Details() {
  const router = useRouter();

  return (
    <div className='w-full flex items-center justify-center pt-10'>
      <div className='mx-3 flex flex-col gap-2'>
        <label className='text-sm font-bold'>
          상품 세부 정보 하나둘둘세셋네네넷
        </label>
        <Button onClick={() => router.push('/details/receipt')}>
          영수증 입력
        </Button>
      </div>
    </div>
  );
}
