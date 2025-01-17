'use client';

import { Item } from '@/app/api/coupang/route';
import { OnClick } from '@/app/coupang/page';
import { useState } from 'react';
import { Button } from '../ui/button';

export type CoupangInputFormProps = {
  onClick: OnClick;
  itemList: Item[];
};

export default function PincodeInputForm({
  onClick,
  itemList,
}: CoupangInputFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClick({ itemList, pincode: input });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex gap-3 justify-center pt-10 items-center'
    >
      <label htmlFor='input'>인증번호</label>
      <input
        type='number'
        id='input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
        placeholder='인증번호를 입력하세요'
        className='px-2 py-1 rounded-md text-black'
      />
      <Button type='submit' variant='secondary'>
        입력
      </Button>
    </form>
  );
}
