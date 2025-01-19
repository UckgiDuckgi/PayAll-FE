'use client';

import ProgressBar from '@/components/molecules/GoalProgress';
import { LowestProductList } from '@/components/molecules/LowestProductList';
import { AdCarousel } from '@/components/molecules/sion/AdCarousel';
import { AccentText } from '@/components/ui/AccentText';
import { Triangle } from '@/public/icons/Triangle';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export type Goal = {
  limit_amount: number;
  spent_amount: number;
  saved_amount: number;
  start_date: string;
  end_date: string;
};

type LowestProduct = {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  storeName: string;
  link: string;
  discountRate: number;
};

type UserData = {
  name: string;
  saved_amount: number;
  spent_amount: number;
};

export default function Home() {
  const MOCK_GOAL: Goal = {
    limit_amount: 1500000,
    spent_amount: 1300000,
    saved_amount: 31010,
    start_date: '2025-01-01',
    end_date: '2025-01-31',
  };

  // todo. api 명세서 response 형식 생기면 수정 필요
  const MOCK_USER: UserData = {
    name: '김인선',
    saved_amount: 18320,
    spent_amount: -31710,
  };

  const MOCK_LOWEST_PRODUCT: LowestProduct[] = [
    {
      productId: 12345,
      productName:
        '나드 리프레쉬 퍼퓸드 바디워시 본품, 프레쉬라벤더향, 680ml, 1개입',
      productImage:
        'https://img.danawa.com/prod_img/500000/426/012/img/2012426_1.jpg?shrink=330:*&_v=2024082713372https//img.danawa.com/prod_img/500000/426/012/img/2012426_1.jpg?shrink=330:*&_v=20240827133727',
      price: 8800,
      storeName: '11번가',
      link: 'https://www.11st.co.kr/products/7588965357?service_id=estimatedn&utm_term=&utm_campaign=%B4%D9%B3%AA%BF%CDpc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B4%D9%B3%AA%BF%CD_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3',
      discountRate: 11.0,
    },
    {
      productId: 12345,
      productName:
        '나드 리프레쉬 퍼퓸드 바디워시 본품, 프레쉬라벤더향, 680ml, 1개입',
      productImage:
        'https://img.danawa.com/prod_img/500000/426/012/img/2012426_1.jpg?shrink=330:*&_v=20240827133727',
      price: 8800,
      storeName: '11번가',
      link: 'https://www.11st.co.kr/products/7588965357?service_id=estimatedn&utm_term=&utm_campaign=%B4%D9%B3%AA%BF%CDpc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B4%D9%B3%AA%BF%CD_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3',
      discountRate: 11.0,
    },
    {
      productId: 12345,
      productName:
        '나드 리프레쉬 퍼퓸드 바디워시 본품, 프레쉬라벤더향, 680ml, 1개입',
      productImage:
        'https://img.danawa.com/prod_img/500000/426/012/img/2012426_1.jpg?shrink=330:*&_v=2024082713372https//img.danawa.com/prod_img/500000/426/012/img/2012426_1.jpg?shrink=330:*&_v=20240827133727',
      price: 8800,
      storeName: '11번가',
      link: 'https://www.11st.co.kr/products/7588965357?service_id=estimatedn&utm_term=&utm_campaign=%B4%D9%B3%AA%BF%CDpc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B4%D9%B3%AA%BF%CD_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3',
      discountRate: 11.0,
    },
    {
      productId: 12345,
      productName:
        '나드 리프레쉬 퍼퓸드 바디워시 본품, 프레쉬라벤더향, 680ml, 1개입',
      productImage:
        'https://img.danawa.com/prod_img/500000/426/012/img/2012426_1.jpg?shrink=330:*&_v=20240827133727',
      price: 8800,
      storeName: '11번가',
      link: 'https://www.11st.co.kr/products/7588965357?service_id=estimatedn&utm_term=&utm_campaign=%B4%D9%B3%AA%BF%CDpc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B4%D9%B3%AA%BF%CD_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3',
      discountRate: 11.0,
    },
  ];

  return (
    <div className='flex justify-center flex-col items-center w-full'>
      <AdCarousel />

      <div className='my-8 flex flex-col gap-2 w-full'>
        <span className='text-[0.8125rem]'>
          <a className='text-lg font-bold border-l-[0.1875rem] pl-[0.5625rem] border-main'>
            {MOCK_USER.name}
          </a>
          님
        </span>
        <AccentText
          prefix='연간'
          accent={Math.abs(MOCK_USER.saved_amount).toLocaleString()}
          suffix='원 절약중'
          accentColor='text-white'
          className='text-[0.8125rem]'
          accentSize='text-[1.375rem]'
        />

        {MOCK_USER.spent_amount < 0 ? (
          <AccentText
            prefix='지난달 대비'
            accent={Math.abs(MOCK_USER.spent_amount).toLocaleString()}
            suffix='원 지출하셨습니다.'
            icon={<Triangle color='#6A8DFF' />}
            className='text-[0.8125rem]'
            accentSize='text-[1.375rem]'
          />
        ) : (
          <AccentText
            prefix='지난달 대비'
            accent={MOCK_USER.spent_amount.toLocaleString()}
            suffix='원 지출하셨습니다.'
            icon={<Triangle className='rotate-180' color='#FF6A6A' />}
            accentColor='text-red'
            className='text-[0.8125rem]'
            accentSize='text-[1.375rem]'
          />
        )}
      </div>

      <ProgressBar
        spentAmount={MOCK_GOAL.spent_amount}
        limitAmount={MOCK_GOAL.limit_amount}
        start_date={MOCK_GOAL.start_date}
        end_date={MOCK_GOAL.end_date}
      />

      <div className='flex flex-col mt-20 w-full'>
        <span className='text-base font-bold text-grey mb-4'>
          최근 지출 품목의 최저가 상품
        </span>
        <LowestProductList products={MOCK_LOWEST_PRODUCT} />
      </div>
    </div>
  );
}
