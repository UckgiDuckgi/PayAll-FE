import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckboxIndicator } from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

export default function Sion() {
  return (
    <div>
      <Button variant='basic' className=''>
        동의
      </Button>
      <Button variant='back' className='mt-4'>
        홈으로
      </Button>
      <Button variant='util' className='mt-4'>
        담기
      </Button>
      <Button variant='util' className='mt-4' size='sm'>
        연동하기
      </Button>
      <div className='flex items-center justify-center gap-2 mt-4 bg-white'>
        <Checkbox className=''></Checkbox>
      </div>
    </div>
  );
}
