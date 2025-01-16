'use client';

import CardInfoCard from '@/components/molecules/CardInfoCard';
import CategoryCarouselItem from '@/components/molecules/CategoryCarouselItem';
import CategorySubCard from '@/components/molecules/CategorySubCard';
import DeliveryFeeProgress from '@/components/molecules/DeliveryFeeProgress';
import FixedExpensesCard from '@/components/molecules/FixedExpensesCard';
import PaymentCard from '@/components/molecules/PaymentCard';
import PaymentDetailCard from '@/components/molecules/PaymentDetailCard';
import { Modal } from '@/components/molecules/ui/Modal';
import CartContainer from '@/components/ui/CartContainer';
import { Category, CATEGORY } from '@/constants/category';
import { COLORS } from '@/constants/color';
import { useState } from 'react';

export type CategoryExpense = {
  category_id: number;
  category: Category;
  amount: number;
};

type FixedExpense = {
  fixed_id: number;
  fixed_name: string;
  amount: number;
  due_date: string;
};

type Stat = {
  date: string;
  total_spent: number;
  date_average: number;
  difference: number;
  category_expenses: CategoryExpense[];
  fixed_expenses: FixedExpense[];
};

export type PaymentData = {
  payment_id: number;
  payment_place: string;
  category: string;
  payment_price: number;
  payment_type: '오프라인' | '온라인';
  payment_time: string;
  bank_name: string;
  account_name: string;
};

export const MOCK_STAT: Stat = {
  date: '2025-01',
  total_spent: 832000,
  date_average: 63500,
  difference: -18230,
  category_expenses: [
    { category_id: 1, category: 'RESTAURANT', amount: 300000 },
    { category_id: 2, category: 'CULTURE', amount: 200000 },
    { category_id: 3, category: 'LIVING', amount: 100000 },
  ],
  fixed_expenses: [
    {
      fixed_id: 1,
      fixed_name: '쿠팡 와우',
      amount: 24000,
      due_date: '2025-01-06',
    },
    {
      fixed_id: 2,
      fixed_name: '쿠팡 와우',
      amount: 400000,
      due_date: '2025-01-08',
    },
    {
      fixed_id: 3,
      fixed_name: '쿠팡 와우',
      amount: 24000,
      due_date: '2025-01-11',
    },
  ],
};

export const MOCK_PAYMENT: PaymentData = {
  payment_id: 1,
  payment_place: '밥플러스 성수에이팩센터점',
  category: '외식',
  payment_price: 8000,
  payment_type: '오프라인',
  payment_time: '2025-01-07T19:48:12',
  bank_name: 'KB국민',
  account_name: 'ONE통장-저축예금',
};

export const MOCK_PAYMENT_DETAIL = {
  payment_place: '쿠팡',
  category: '쇼핑',
  payment_type: '온라인',
  payment_time: '2025-01-07T17:30:12',
  bank_name: 'KB국민',
  account_name: 'ONE통장-저축예금',
  payment_price: 83200,
  payment_detail: [
    {
      payment_detail_id: 1,
      product_name: '나드 리프레쉬 퍼퓸드...',
      price: 8900,
      lowest_price: 8750,
      vendor_name: '11st',
      link: 'www.11st.~~~',
    },
    {
      payment_detail_id: 2,
      product_name: '행복한 나라 휴지롤 30개입',
      price: 8900,
      lowest_price: 8750,
      vendor_name: 'Gmarket',
      link: 'www.gmarket.~~~',
    },
  ],
};
function Page() {
  const tabs = ['소비 분석', '소비 목표', '추천 혜택'];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const handleSelectedIdx = (idx: number) => setSelectedIdx(idx);

  return (
    <div className='w-full'>
      {/* <Tabs
        tabs={tabs}
        selectedIdx={selectedIdx}
        handleSelectedIdx={handleSelectedIdx}
      /> */}

      {/* <div className='mt-10'>
        <CategoryChart
          categoryExpenses={MOCK_STAT.category_expenses}
          totalSpent={MOCK_STAT.total_spent}
        />
      </div> */}

      <div>
        <div className='font-bold'>가나다라마바상앙앙앙</div>
        <div className='font-regular'>가나다라마바상앙앙앙</div>
        <div className='font-medium'>가나다라마바상앙앙앙</div>
      </div>

      <PaymentCard showAccount={true} paymentInfo={MOCK_PAYMENT} />

      <CardInfoCard
        cardImg='/images/Logo.png'
        cardName='card name'
        cardDescription='card description'
      />

      <ul>
        {MOCK_PAYMENT_DETAIL.payment_detail.map(
          ({ product_name, price, lowest_price, vendor_name }) => (
            <li key={product_name}>
              <PaymentDetailCard
                productName={product_name}
                price={price}
                lowestPrice={lowest_price}
                vendorName={vendor_name}
              />
            </li>
          )
        )}
      </ul>

      {/* 가로 스크롤 캐러셀 컴포넌트로 분리 */}
      <ul className='w-full overflow-x-scroll flex space-x-3 px-2 py-6 scrollbar-hide snap-x'>
        {MOCK_STAT.category_expenses.map(
          ({ category_id, category, amount }, idx) => (
            <li key={idx} className='flex-shrink-0 snap-center'>
              <CategoryCarouselItem
                percent={+((amount / MOCK_STAT.total_spent) * 100).toFixed(0)}
                color={COLORS[idx]}
                categoryName={CATEGORY[category][0]}
                categoryIconName={category}
                amount={amount}
              />
            </li>
          )
        )}
      </ul>

      <ul className='space-y-3 my-5'>
        {MOCK_STAT.fixed_expenses.map(({ fixed_name, amount, due_date }) => (
          <li key={fixed_name}>
            <FixedExpensesCard
              expensesName={fixed_name}
              expensesPrice={amount}
              date={due_date}
            />
          </li>
        ))}
      </ul>

      <Modal
        title='배송지 정보'
        description='서울 성동구 뚝섬로1가길 17 (성수동1가, 얼리브홈 서울숲), 503호 [04779]'
        btnText='확인'
      >
        <span>배송지 정보</span>
      </Modal>

      <DeliveryFeeProgress fee={17600} totalFee={19900} />

      <CategorySubCard
        img={'/images/subscribes/T.svg'}
        category='외식'
        color='#B77DF1'
        paymentName='롯데리아'
        amount={23870}
      />

      <CartContainer title='배송 정보' bgColor='#1b1b1b'>
        <div className='flex flex-col items-start justify-center gap-1 mt-1 mb-20'>
          <div className='flex items-center justify-center gap-1 text-[.75rem]'>
            <span className='text-grey'>문해빈</span>
            <span className='w-[2px] h-[2px] rounded-full bg-grey' />
            <span className='text-grey'>010-7330-9731</span>
          </div>
          <div className='font-medium text-[.8125rem]'>
            서울 성동구 뚝섬로1가길 17 (성수동1가, 얼리브홈 서울숲), 503호
            [04779]
          </div>
        </div>
      </CartContainer>

      {/* <Image src='/images/animations/' /> */}
    </div>
  );
}

export default Page;
