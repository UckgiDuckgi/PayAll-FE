'use client';

import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function RegisterPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [warningMessage, setWarningMessage] =
    useState('모든 항목을 입력해주세요');

  useEffect(() => {
    // 1. 빈 입력값 체크
    if (!id || !password || !passwordCheck || !name || !phone || !address) {
      setWarningMessage('모든 항목을 입력해주세요');
      return;
    }

    // 2. 비밀번호 길이 체크
    if (password.length < 4 || password.length > 12) {
      setWarningMessage('비밀번호는 4-12자리로 입력해주세요');
      return;
    }

    // 3. 비밀번호 일치 체크
    if (password !== passwordCheck) {
      setWarningMessage('비밀번호가 일치하지 않습니다');
      return;
    }

    // 4. 전화번호 숫자 체크
    if (!/^\d+$/.test(phone)) {
      setWarningMessage('전화번호는 숫자만 입력해주세요');
      return;
    }

    setWarningMessage('');
  }, [id, password, passwordCheck, name, phone, address]);

  return (
    <div>
      <form className='flex flex-col items-center gap-9 mt-21'>
        <LoginInput title='아이디' onChange={setId} />
        <LoginInput
          title='비밀번호'
          onChange={setPassword}
          type='password'
          placeholder='4~12자 사이의 비밀번호를 입력해주세요'
        />
        <LoginInput
          title='비밀번호 확인'
          onChange={setPasswordCheck}
          type='password'
        />
        <LoginInput title='이름' onChange={setName} />
        <LoginInput
          title='전화번호'
          onChange={setPhone}
          type='tel'
          placeholder='숫자만 입력해주세요'
        />
        <LoginInput title='주소' onChange={setAddress} />

        <div className='fixed left-0 bottom-14 w-full px-6 items-center'>
          {warningMessage && (
            <div className='text-red text-sm text-center'>{warningMessage}</div>
          )}
          <Button
            className='w-full bg-[#6A8DFF] rounded-xl text-white hover:none'
            type='submit'
            disabled={warningMessage !== ''}
          >
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}
