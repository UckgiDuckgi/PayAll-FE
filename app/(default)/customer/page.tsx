import { RotatingTextLogo } from '@/components/molecules/RotatingTextLogo';

type Team = {
  name: string;
  tel: string;
};
const teammate: Team[] = [
  { name: '김민서', tel: '010-4193-0547' },
  { name: '김인선', tel: '010-4193-0547' },
  { name: '남승혁', tel: '010-4193-0547' },
  { name: '문규빈', tel: '010-4193-0547' },
  { name: '문해빈', tel: '010-4193-0547' },
  { name: '박시온', tel: '010-4193-0547' },
  { name: '이규호', tel: '010-4193-0547' },
];
export default function CustomerPage() {
  return (
    <div className='flex justify-center items-center w-full min-h-screen'>
      <RotatingTextLogo team={teammate} />
    </div>
  );
}
