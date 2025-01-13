'use client';

import { Button } from '@/components/ui/button';
import { fileAtom } from '@/stores/atom';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Details() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setFile] = useAtom(fileAtom);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/tiff',
        'application/pdf',
      ];
      if (!validTypes.includes(file.type)) {
        alert('지원되는 파일 형식: JPG, JPEG, PNG, TIF, TIFF, PDF');
        return;
      }
      setFile(file);
      router.push('/details/receipt');
    }
  };

  return (
    <div className='w-full flex items-center justify-center pt-10'>
      <div className='mx-3 flex flex-col gap-2'>
        <label className='text-sm font-bold'>
          상품 세부 정보 하나둘둘세셋네네넷
        </label>
        <input
          type='file'
          onChange={handleFileChange}
          accept='.jpg,.jpeg,.png,.tif,.tiff,.pdf'
          className='hidden'
          ref={fileInputRef}
        />
        <Button onClick={() => fileInputRef.current?.click()}>
          영수증 입력
        </Button>
      </div>
    </div>
  );
}
