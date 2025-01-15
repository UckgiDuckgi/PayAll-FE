'use client';

import CardInfoCard from '@/components/molecules/CardInfoCard';
import CategoryCarousel from '@/components/molecules/CategoryCarousel';
import DeliveryFeeProgress from '@/components/molecules/DeliveryFeeProgress';
import FixedExpensesCard from '@/components/molecules/FixedExpensesCard';
import PaymentCard from '@/components/molecules/PaymentCard';
import PaymentDetailCard from '@/components/molecules/PaymentDetailCard';
import CategoryChart from '@/components/molecules/ui/CategoryChart';
import { Modal } from '@/components/molecules/ui/Modal';
import { COLORS } from '@/constants/color';

export type CategoryExpense = {
  category_id: number;
  category: string;
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

function page() {
  const MOCK_STAT: Stat = {
    date: '2025-01',
    total_spent: 832000,
    date_average: 63500,
    difference: -18230,
    category_expenses: [
      { category_id: 1, category: '식비', amount: 300000 },
      { category_id: 2, category: '숙소비', amount: 200000 },
      { category_id: 3, category: '생활,가정', amount: 100000 },
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

  const MOCK_PAYMENT: PaymentData = {
    payment_id: 1,
    payment_place: '밥플러스 성수에이팩센터점',
    category: '외식',
    payment_price: 8000,
    payment_type: '오프라인',
    payment_time: '2025-01-07T19:48:12',
    bank_name: 'KB국민',
    account_name: 'ONE통장-저축예금',
  };

  const MOCK_PAYMENT_DETAIL = {
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

  return (
    <div className='w-full'>
      <CategoryChart
        categoryExpenses={MOCK_STAT.category_expenses}
        totalSpent={MOCK_STAT.total_spent}
      />

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
        {COLORS.map((color, idx) => (
          <li key={idx} className='flex-shrink-0 snap-center'>
            <CategoryCarousel
              color={color}
              categoryName='식비'
              categoryIconName='food'
              amount={432640}
            />
          </li>
        ))}
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
    </div>
  );
}

export default page;
