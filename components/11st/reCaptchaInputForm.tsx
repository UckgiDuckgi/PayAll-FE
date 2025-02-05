'use client';

import { OnClick } from '@/app/(head)/payments/page';
import { Item } from '@/app/api/payments/11st/route';
import Image from 'next/image';
import { useState } from 'react';

const START_INDEX = 4;

export type ElevenStreetInputFormProps = {
  onClick: OnClick;
  itemList: Item[];
};

const getSelectedGridList = (inputGrid: boolean[]) => {
  const selectedGridList: number[] = [];
  for (let i = 4; i <= 19; i++) {
    if (inputGrid[i]) {
      selectedGridList.push(i);
    }
  }
  return selectedGridList;
};

export default function ReCaptchaInputForm({
  base64Image,
  tableSize,
  onClick,
  itemList,
}: {
  base64Image: string;
  tableSize: number;
} & ElevenStreetInputFormProps) {
  const [inputGrid, setInputGrid] = useState<boolean[]>([]);

  const tableList = [];
  for (let i = 0; i < tableSize; i++) {
    const table = [];
    for (let j = 0; j < tableSize; j++) {
      table.push(START_INDEX + i * tableSize + j);
    }
    tableList.push(table);
  }

  const handleEnd = () => {
    // URL에 입력값을 추가해 페이지 새로고침
    onClick({
      elevenStreetItemList: itemList,
      selectedTileList: getSelectedGridList(inputGrid).join(','),
      isReCaptchaEnd: true,
    });
  };

  const handleNext = () => {
    onClick({
      elevenStreetItemList: itemList,
      selectedTileList: getSelectedGridList(inputGrid).join(','),
    });
  };

  const handleClick = (numpad: number) => {
    inputGrid[numpad] = !inputGrid[numpad];
    setInputGrid({ ...inputGrid });
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='relative w-[500px] h-[725.67px] mx-auto'>
        <Image
          src={base64Image}
          alt='ReCaptcha'
          width={500}
          height={725.67}
          unoptimized
          className='absolute'
        />

        <div className='absolute bottom-0 w-full h-[570px]  flex flex-col justify-center items-center px-[9px] pb-[85px]'>
          {tableList.map((table, index) => (
            <div className='flex w-full h-full' key={index}>
              {table.map((row) => (
                <button
                  key={row}
                  className={!inputGrid[row] ? 'keypad' : 'keypad-selected'}
                  onClick={() => handleClick(row)}
                ></button>
              ))}
            </div>
          ))}
        </div>

        <div className='absolute bottom-0 right-0 w-[145px] h-[65px]  flex flex-col justify-center items-center px-[9px] pb-[10px]'>
          <div className='flex w-full h-full '>
            <button
              className='w-full h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleNext}
            >
              다음
            </button>
            <button
              className='w-full h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleEnd}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
