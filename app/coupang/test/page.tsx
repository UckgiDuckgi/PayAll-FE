'use client';

import { CoupangInputFormProps } from '@/components/coupang/pincodeInputForm';
import Image from 'next/image';
import { useState } from 'react';
import ReCaptcha from './recaptcha.png';

const firstRow = [4, 5, 6, 7];
const secondRow = [8, 9, 10, 11];
const thirdRow = [12, 13, 14, 15];
const fourthRow = [16, 17, 18, 19];

const getSelectedGridList = (inputGrid: boolean[]) => {
  const selectedGridList: number[] = [];
  for (let i = 4; i <= 19; i++) {
    if (inputGrid[i]) {
      selectedGridList.push(i);
    }
  }
  return selectedGridList;
};

export default function ReCaptchaInputFormTest({
  onClick,
  itemList,
}: {
  base64Image: string;
} & CoupangInputFormProps) {
  const [inputGrid, setInputGrid] = useState<boolean[]>([]);

  console.log('🚀 ~ PasswordInputForm ~ input:', inputGrid);

  const handleSubmit = () => {
    // URL에 입력값을 추가해 페이지 새로고침
    onClick({ itemList, password: getSelectedGridList(inputGrid).join(',') });
  };

  const handleClick = (numpad: number) => {
    inputGrid[numpad] = !inputGrid[numpad];
    setInputGrid({ ...inputGrid });
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='relative w-[500px] h-[725.67px] mx-auto'>
        <Image
          src={ReCaptcha}
          alt='Coupang'
          width={500}
          height={725.67}
          unoptimized
          className='absolute'
        />

        <div className='absolute bottom-0 w-full h-[570px]  flex flex-col justify-center items-center px-[9px] pb-[85px]'>
          <div className='flex w-full h-full'>
            {firstRow.map((row) => (
              <button
                key={row}
                className={!inputGrid[row] ? 'keypad' : 'keypad-selected'}
                onClick={() => handleClick(row)}
              ></button>
            ))}
          </div>
          <div className='flex w-full h-full'>
            {secondRow.map((row) => (
              <button
                key={row}
                className={!inputGrid[row] ? 'keypad' : 'keypad-selected'}
                onClick={() => handleClick(row)}
              ></button>
            ))}
          </div>
          <div className='flex w-full h-full'>
            {thirdRow.map((row) => (
              <button
                key={row}
                className={!inputGrid[row] ? 'keypad' : 'keypad-selected'}
                onClick={() => handleClick(row)}
              ></button>
            ))}
          </div>
          <div className='flex w-full h-full'>
            {fourthRow.map((row) => (
              <button
                key={row}
                className={!inputGrid[row] ? 'keypad' : 'keypad-selected'}
                onClick={() => handleClick(row)}
              ></button>
            ))}
          </div>
        </div>

        <div className='absolute bottom-0 right-0 w-[145px] h-[65px]  flex flex-col justify-center items-center px-[9px] pb-[10px]'>
          <div className='flex w-full h-full '>
            <button
              className='w-full h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleSubmit}
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {/* <div className='flex gap-3 justify-center pt-10 items-center'>
        <label htmlFor='input'>비밀번호</label>
        <div className='px-2 py-1 rounded-md text-black bg-white w-[100px] h-8 text-center'>
          {getSelectedGridList(inputGrid).join(',')}
        </div>
        <Button onClick={handleSubmit} variant='secondary'>
          입력
        </Button>
      </div> */}
    </div>
  );
}
