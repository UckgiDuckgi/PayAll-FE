'use client';

import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { Button } from '@/components/ui/button';
import { usePostSignUp } from '@/hooks/query/auth';
import { FormEvent, useEffect, useState } from 'react';

const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/[^0-9]/g, '');
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  }
};

export default function RegisterPage() {
  const { mutate } = usePostSignUp();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [warningMessage, setWarningMessage] =
    useState('모든 항목을 입력해주세요');

  const handlePhoneChange = (value: string) => {
    const formattedNumber = formatPhoneNumber(value);
    setPhone(formattedNumber);
  };

  useEffect(() => {
    // 1. 빈 입력값 체크
    if (!id || !password || !passwordCheck || !name || !phone || !address) {
      setWarningMessage('모든 항목을 입력해주세요');
      return;
    }

    // 2. 비밀번호 길이 체크
    if (password.length < 6 || password.length > 12) {
      setWarningMessage('비밀번호는 6-12자리로 입력해주세요');
      return;
    }

    // 3. 비밀번호 일치 체크
    if (password !== passwordCheck) {
      setWarningMessage('비밀번호가 일치하지 않습니다');
      return;
    }

    // 4. 전화번호 숫자 체크
    if (!/^010-\d{4}-\d{4}$/.test(phone)) {
      setWarningMessage('올바른 전화번호 형식이 아닙니다');
      return;
    }

    setWarningMessage('');
  }, [id, password, passwordCheck, name, phone, address]);

  const registerSignUp = (e: FormEvent) => {
    e.preventDefault();
    if (warningMessage !== '') return;
    mutate({ name, authId: id, password, phone, address });
  };

  return (
    <div className='pb-40'>
      <form className='flex flex-col items-center gap-9 pt-16 w-full'>
        <LoginInput title='아이디' onChange={setId} />
        <LoginInput
          title='비밀번호'
          onChange={setPassword}
          type='password'
          placeholder='6~12자 사이의 비밀번호를 입력해주세요'
        />
        <LoginInput
          title='비밀번호 확인'
          onChange={setPasswordCheck}
          type='password'
        />
        <LoginInput title='이름' onChange={setName} />
        <LoginInput
          title='전화번호'
          onChange={handlePhoneChange}
          type='tel'
          value={phone}
          placeholder='숫자만 입력해주세요'
        />
        <LoginInput title='주소' onChange={setAddress} />

        <div className='fixed left-0 bottom-14 w-full px-6 items-center'>
          {warningMessage && (
            <div className='text-red text-sm text-center'>{warningMessage}</div>
          )}
          <div className='w-[90%] max-w-[460px] mx-auto pt-2'>
            <Button
              className='w-full bg-[#6A8DFF] rounded-xl text-white hover:none'
              type='submit'
              disabled={warningMessage !== ''}
              onClick={registerSignUp}
            >
              확인
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
