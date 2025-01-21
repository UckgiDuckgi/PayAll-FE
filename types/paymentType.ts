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
  paymentDatail: AccountsPaymentsDetail[];
};

export type AccountsPayments = {
  totalBalance: number;
  monthPaymentPrice: number;
  bankName: string;
  accountNam: string;
  accountNumber: string;
  paymentCount: number;
  category: string;
  paymentList: AccountsPayment[];
};
