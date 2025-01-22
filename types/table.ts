export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data?: T;
};

type Category =
  | 'TOTAL'
  | 'SHOPPING'
  | 'EDUCATION'
  | 'LIVING'
  | 'TRANSPORT'
  | 'CULTURE'
  | 'RESTAURANT'
  | 'CAFE'
  | 'HEALTH'
  | 'OTHERS';

type ProductType = 'CARD' | 'SUBSCRIBE';

type PaymentType = 'ONLINE' | 'OFFLINE';

type Store = {
  storeId: number;
  storeName: string;
  category: Category;
};

type Benefit = {
  benefitId: number;
  storeId: number;
  productId: number;
  benefitValue: number;
};

type Product = {
  productId: number;
  productName: string;
  productDescription: string;
  benefitDescription: string;
  productType: ProductType;
};

type Recommendation = {
  recommendationId: number;
  userId: number;
  productId: number;
  storeName: number;
  visitCount: number;
  discountAmount: number;
  category: Category;
  productType: ProductType;
};

type Limits = {
  limitId: number;
  userId: number;
  limitPrice: number;
  limitDate: string;
};

type Statistics = {
  statsticsId: number;
  userId: number;
  category: Category;
  statisticsAmount: number;
  statisticsDate: string;
};

type Cart = {
  cartId: number;
  userId: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  storeName: string;
  link: string;
  image: string;
};

type Payment_Detail = {
  paymentDetailId: number;
  paymentId: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
};

type Payment = {
  paymentId: number;
  accountId: number;
  paymentPlace: string;
  price: number;
  paymentTime: string;
  paymentType: PaymentType;
  category: Category;
};

type Account = {
  accountId: number;
  userId: number;
  bankName: string;
  accountName: string;
  accountNumber: number;
  balance: number;
};

type User = {
  userId: number;
  authId: string;
  name: string;
  password: string;
  phone: string;
  address: string;
};

export type {
  Account,
  Benefit,
  Cart,
  Category,
  Limits,
  Payment,
  Payment_Detail,
  PaymentType,
  Product,
  ProductType,
  Recommendation,
  Statistics,
  Store,
  User,
};
