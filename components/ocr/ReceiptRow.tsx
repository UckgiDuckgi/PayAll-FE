'use client';

import { LucideCheck, LucidePencil } from 'lucide-react';
import { useRef } from 'react';

interface Item {
  name: string;
  amount: string;
  price: string;
  editing: boolean;
}

interface ReceiptRowProps {
  item: Item;
  index: number;
  onSave: (index: number, newValues: Item) => void;
}

export const ReceiptRow = ({ item, index, onSave }: ReceiptRowProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (nameRef.current && amountRef.current && priceRef.current) {
      const newValues = {
        name: nameRef.current.value,
        amount: amountRef.current.value,
        price: priceRef.current.value,
        editing: false,
      };
      onSave(index, newValues);
    }
  };

  const setEditing = () => {
    onSave(index, { ...item, editing: true });
  };

  return (
    <tr className='h-12'>
      <td>{String(index + 1).padStart(3, '0')}</td>
      <td>
        {item.editing ? (
          <input
            ref={nameRef}
            type='text'
            defaultValue={item.name}
            className='w-[90%] h-7 border rounded px-2'
            onBlur={(e) => {
              if (e.target.value === '') e.target.value = '상품명';
            }}
          />
        ) : (
          <p className='pl-1'>{item.name}</p>
        )}
      </td>
      <td>
        {item.editing ? (
          <input
            ref={amountRef}
            type='text'
            defaultValue={item.amount}
            className='w-[80%] border rounded p-1'
            onBlur={(e) => {
              if (e.target.value === '') e.target.value = '0';
            }}
          />
        ) : (
          <p className='pl-1'>{item.amount}</p>
        )}
      </td>
      <td>
        {item.editing ? (
          <input
            ref={priceRef}
            type='text'
            defaultValue={item.price}
            className='w-[80%] border rounded p-1'
            onBlur={(e) => {
              if (e.target.value === '') e.target.value = '0';
            }}
          />
        ) : (
          <p className='pl-1'>{item.price}</p>
        )}
      </td>
      <td>
        {item.editing ? (
          <div
            className='w-6 h-6 bg-green-400 rounded-full flex items-center justify-center cursor-pointer'
            onClick={handleSave}
          >
            <LucideCheck className='w-3 h-3 text-white' strokeWidth={3} />
          </div>
        ) : (
          <div
            className='w-6 h-6 bg-darkGrey rounded-full flex items-center justify-center cursor-pointer'
            onClick={setEditing}
          >
            <LucidePencil className='w-3 h-3 text-white' strokeWidth={3} />
          </div>
        )}
      </td>
    </tr>
  );
};
