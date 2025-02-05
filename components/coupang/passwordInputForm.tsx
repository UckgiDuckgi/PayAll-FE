'use client';

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

  const handleSubmit = (input: number[], cancel = false) => {
    if (cancel) {
      onClick({ coupangItemList: itemList, password: '' });
      return;
    }
    if (input.length === 6) {
      onClick({ coupangItemList: itemList, password: input.join('') });
    }
  };

  const handleClick = (numpad: number) => {
    if (numpad === -1) {
      setInput(input.slice(0, -1));
      return;
    }
    if (input.length === 5) {
      setInput([...input, numpad]);
      handleSubmit([...input, numpad]);
    }
    if (input.length < 6) {
      setInput([...input, numpad]);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='relative w-full h-auto mx-auto'>
        <Image
          src={base64Image}
          alt='Coupang'
          width={500}
          height={792}
          unoptimized
        />

        <div className='absolute bottom-0 w-full h-full'>
          <div className='w-full h-[61%]'>
            <div className='h-[5%]'></div>
            <div className='w-full h-[6%] flex justify-end pr-[5%] z-10'>
              <button
                className='w-[6%]'
                onClick={() => handleSubmit([], true)}
              ></button>
            </div>
            <div className='h-[42%]'></div>
            <div className='w-full flex flex-col justify-end items-center'>
              <div className='flex w-[55%] h-auto justify-start gap-[5.5%]'>
                {input.map((_, idx) => (
                  <div key={idx} className='w-[12%]'>
                    <Image src={Circle} alt='Circle' width={30}></Image>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='w-full h-[39%]'>
            <div className='h-[5%]'></div>
            <div className='w-[90%] h-[85%] flex flex-col justify-center items-center mx-auto'>
              <div className='flex w-full h-full'>
                <button
                  className='keypad'
                  onClick={() => handleClick(0)}
                ></button>
                <button
                  className='keypad'
                  onClick={() => handleClick(1)}
                ></button>
                <button
                  className='keypad'
                  onClick={() => handleClick(2)}
                ></button>
              </div>
              <div className='flex w-full h-full'>
                <button
                  className='keypad'
                  onClick={() => handleClick(3)}
                ></button>
                <button
                  className='keypad'
                  onClick={() => handleClick(4)}
                ></button>
                <button
                  className='keypad'
                  onClick={() => handleClick(5)}
                ></button>
              </div>
              <div className='flex w-full h-full'>
                <button
                  className='keypad'
                  onClick={() => handleClick(6)}
                ></button>
                <button
                  className='keypad'
                  onClick={() => handleClick(7)}
                ></button>
                <button
                  className='keypad'
                  onClick={() => handleClick(8)}
                ></button>
              </div>
              <div className='flex w-full h-full'>
                <button className='keypad not-keypad'></button>
                <button
                  className='keypad'
                  onClick={() => handleClick(9)}
                ></button>
                <button
                  className='keypad'
                  onClick={() => handleClick(-1)}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
