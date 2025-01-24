import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-8'>
      <span className='text-[60px] font-bold'>404</span>
      <Image src='/images/trash.svg' width={200} height={200} alt='trash' />
      <span className='text-[20px] font-bold'>페이지를 찾을 수 없습니다.</span>
      <Link href='/' className='w-[50%]'>
        <Button variant='basic'>홈으로</Button>
      </Link>
    </div>
  );
}

export default NotFound;
