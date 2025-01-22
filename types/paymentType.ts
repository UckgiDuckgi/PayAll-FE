import { Category, PaymentType } from './table';

export type AccountsPaymentsDetail = {
  paymentId: number;
  paymentPlace: string;
  category: Category;
  paymentPrice: number;
  paymentType: PaymentType;
  paymentTime: string;
  bankName: string;
  accountName: string;
};

export type AccountsPayment = {
  dayPaymentPrice: number;
  paymentDate: string;
  paymentDetail: AccountsPaymentsDetail[];
};

export type AccountsPayments = {
  userName: string;
  totalBalance: number;
  monthPaymentPrice: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  paymentCount: number;
  category: string;
  paymentList: AccountsPayment[];
};

export type PaymentDetail = {
  paymentDetailId: number;
  productName: string;
  price: number;
  amount: number;
  lowestPrice: number;
  lowestPricePlace: string;
  link: string;
};

export type PaymentDetailList = {
  accountName: string;
  price: number;
  category: Category;
  paymentTime: string;
  paymentPlace: string;
  paymentType: PaymentType;
  bankName: string;
  paymentDetail: PaymentDetail[];
};

// - `account_name` String, 계좌명
// - `price`Long, 총 결제금액
// - `category`String, 결제카테고리
// - `payment_time`datetime, 결제시간
// - `payment_place`String, 결제처
// - `payment_type`String, 결제타입(온라인/오프라인)
// - `payment_detail`결제상세물품배열
//     - `product_name`String, 상품명
//     - `price`Long, 상품 가격
//     - `amount`Int, 수량
//     - `lowest_price_place`String, 최저가격 쇼핑몰
//     - `lowest_price`Long, 최저가격
//     - `link`String, 최저가격 상품 구매링크
