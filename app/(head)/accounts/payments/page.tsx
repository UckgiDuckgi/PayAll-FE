'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Payments() {
  return (
    <div className='w-[90%] mx-auto'>
      <div className='mx-auto text-4xl pt-10 text-center'>
        거래 내역 업로드 페이지
      </div>
      <Badge variant='secondary' className=''>
        <form id='uploadForm'>
          <input type='file' id='fileInput' />
          <Button type='submit'>업로드</Button>
        </form>
      </Badge>
    </div>
  );
}
