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
  shootNeed: boolean;
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

export type PaymentDetailList = {
  paymentDetailId: number;
  productName: string;
  productId: number;
  price: number;
  amount: number;
  lowestPrice: number;
  lowestPricePlace: string;
  link: string;
};

export type PaymentDetail = {
  accountName: string;
  paymentPrice: number;
  category: Category;
  paymentTime: string;
  paymentPlace: string;
  paymentType: PaymentType;
  bankName: string;
  paymentDetailList: PaymentDetailList[];
};

export type ProductReceipt = {
  productName: string;
  quantity: number;
  price: number;
};

export type ReceiptList = {
  paymentId: number;
  productList: ProductReceipt[];
};
