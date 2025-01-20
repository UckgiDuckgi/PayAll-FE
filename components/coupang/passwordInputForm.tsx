'use client';

import { Button } from '@/components/ui/button';
import Circle from '@/public/icons/Circle.png';
import Image from 'next/image';
import { useState } from 'react';
import { CoupangInputFormProps } from './pincodeInputForm';

export default function PasswordInputForm({
  base64Image,
  onClick,
  itemList,
}: {
  base64Image: string;
} & CoupangInputFormProps) {
  const [input, setInput] = useState<number[]>([]);

  console.log('🚀 ~ PasswordInputForm ~ input:', input);

  const handleSubmit = () => {
    // URL에 입력값을 추가해 페이지 새로고침
    if (input.length === 6) {
      onClick({ itemList, password: input.join('') });
    }
  };

  const handleClick = (numpad: number) => {
    if (numpad === -1) {
      setInput(input.slice(0, -1));
      return;
    }

    if (input.length < 6) {
      setInput([...input, numpad]);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='relative w-[500px] h-[792px] mx-auto'>
        <Image
          src={base64Image}
          alt='Coupang'
          width={500}
          height={792}
          unoptimized
          className='absolute'
        />

        <div className='absolute top-0 w-full h-[290px]  flex flex-col justify-end items-center'>
          <div className='flex w-full h-[30px] px-[110px] justify-start gap-5'>
            {input.map((_, idx) => (
              <Image key={idx} src={Circle} alt='Circle' width={30}></Image>
            ))}
          </div>
        </div>

        <div className='absolute bottom-0 w-full h-[310px]  flex flex-col justify-center items-center pb-[30px] pt-[20px] px-[25px] '>
          <div className='flex w-full h-full '>
            <button className='keypad' onClick={() => handleClick(0)}></button>
            <button className='keypad' onClick={() => handleClick(1)}></button>
            <button className='keypad' onClick={() => handleClick(2)}></button>
          </div>
          <div className='flex w-full h-full'>
            <button className='keypad' onClick={() => handleClick(3)}></button>
            <button className='keypad' onClick={() => handleClick(4)}></button>
            <button className='keypad' onClick={() => handleClick(5)}></button>
          </div>
          <div className='flex w-full h-full'>
            <button className='keypad' onClick={() => handleClick(6)}></button>
            <button className='keypad' onClick={() => handleClick(7)}></button>
            <button className='keypad' onClick={() => handleClick(8)}></button>
          </div>
          <div className='flex w-full h-full'>
            <button className='keypad not-keypad'></button>
            <button className='keypad' onClick={() => handleClick(9)}></button>
            <button className='keypad' onClick={() => handleClick(-1)}></button>
          </div>
        </div>
      </div>

      <div className='flex gap-3 justify-center pt-10 items-center'>
        <label htmlFor='input'>비밀번호</label>
        <div className='px-2 py-1 rounded-md text-black bg-white w-[100px] h-8 text-center'>
          {input.join('')}
        </div>
        <Button onClick={handleSubmit} variant='secondary'>
          입력
        </Button>
      </div>
    </div>
  );
}
