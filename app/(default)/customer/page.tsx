import { RotatingTextLogo } from '@/components/molecules/RotatingTextLogo';

const teammate = [
  '김민서',
  '김인선',
  '남승혁',
  '문규빈',
  '문해빈',
  '박시온',
  '이규호',
];
export default function CustomerPage() {
  return (
    <div className='flex justify-center items-center w-full min-h-screen'>
      <RotatingTextLogo text={teammate.join(' ')} />
    </div>
  );
}
