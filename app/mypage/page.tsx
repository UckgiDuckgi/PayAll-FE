'use client';

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

  return <></>;
}
