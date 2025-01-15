import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center justify-center mt-40'>
        <IconIndicator src='/images/Logo.png' width={130} />
      </div>
      <LoginInput type='아이디' />
      <div className='w-full mt-11 bg-white'></div>
      <LoginInput type='비밀번호' />
      <div className='w-full mt-7 bg-white'></div>
      <Button variant='basic'>로그인</Button>
      <div className='mt-[1.375rem] text-right w-full text-sm'>
        <a href='/signup'>회원가입</a>
      </div>
    </div>
  );
}
