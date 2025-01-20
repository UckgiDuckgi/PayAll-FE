import { Category } from './category';

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
  payment_type: '온라인' as const,
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
