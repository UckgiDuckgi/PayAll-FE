'use client';

import { ReceiptRow } from './ReceiptRow';

const generateWavePath = () => {
  let path = 'M0,0 ';

  // 380px 너비에 맞춰 10px 간격으로 더 작은 물결 생성
  for (let i = 0; i < 380; i += 10) {
    if (i % 20 === 0) {
      path += `C${i + 5},3 ${i + 10},6 ${i + 15},3 `;
    } else {
      path += `C${i + 5},8 ${i + 10},6 ${i + 15},3 `;
    }
  }

  path += 'L380,160 L0,160 Z';
  return path;
};

interface Item {
  name: string;
  amount: string;
  price: string;
  editing: boolean;
}

const PaperReceipt = ({
  items,
  title,
  bizNum,
  setItems,
}: {
  items: Item[];
  title: string;
  bizNum: string;
  setItems: (items: Item[]) => void;
}) => {
  const saveItems = (idx: number, newValues: Item) => {
    setItems(
      items.map((item, i) => (i === idx ? { ...item, ...newValues } : item))
    );
  };
  return (
    <div className='relative'>
      <div className='bg-white text-black pb-16 min-h-[500px]'>
        <div className='p-4 flex flex-col items-center'>
          <p className='text-center font-bold text-lg mt-3'>{title}</p>
          <p className='text-center text-sm font-semibold text-[#DCDCDC]'>
            {bizNum}
          </p>
          <div className='w-full border-[#5F5F5F] border-dashed border-b my-2' />
          <table className='w-full text-[#5F5F5F] font-semibold text-xs'>
            <colgroup>
              <col className='w-[15%]' />
              <col className='w-[40%]' />
              <col className='w-[15%]' />
              <col className='w-[20%]' />
              <col className='w-[10%]' />
            </colgroup>
            <thead className='font-normal text-left'>
              <tr>
                <th>NO.</th>
                <th className='pl-1'>상품명</th>
                <th>수량</th>
                <th className='pl-1'>금액</th>
                <th className='hidden'></th>
              </tr>
              <tr>
                <td colSpan={5}>
                  <div className='w-full border-[#5F5F5F] border-dashed border-b my-2' />
                </td>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <ReceiptRow
                  item={item}
                  index={index}
                  onSave={saveItems}
                  key={index}
                />
              ))}
            </tbody>
          </table>
          <div className='w-full border-[#5F5F5F] border-dashed border-b my-2' />
          <div className='w-full flex justify-between font-semibold text-[15px] px-2 mt-2 mb-16'>
            <p className='text-[#858585]'>합계</p>
            <p>
              {items
                .reduce(
                  (acc, item) => acc + Number(item.price.replace(/,/g, '')),
                  0
                )
                .toLocaleString()}
              원
            </p>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 right-0'>
        <svg className='w-full' viewBox='0 0 380 60' preserveAspectRatio='none'>
          <path
            d={generateWavePath()}
            className='fill-[#222222]'
            stroke='none'
          />
        </svg>
      </div>
    </div>
  );
};

export default PaperReceipt;
