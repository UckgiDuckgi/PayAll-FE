export type Cookie = {
  domain: string;
  expires: number;
  httpOnly: boolean;
  name: string;
  path: string;
  sameSite: string;
  secure: boolean;
  value: string;
};

export type NaverPayProduct = {
  name: string;
  imgUrl: string;
  infoUrl: string;
  price: number;
  restAmount: number;
  isGift: false;
};

type NaverPayStatus = {
  name: string;
  text: string;
  color: string;
};

export type NaverPayServiceType = 'ORDER' | 'CONTENTS';

type NaverPayItem = {
  id: string;
  serviceType: NaverPayServiceType;
  status: NaverPayStatus;
  merchantName: string;
  product: NaverPayProduct;
  date: number;
  productDetailUrl: string;
  orderDetailUrl: string | null;
};

type NaverPayResult = {
  success: boolean;
  items: NaverPayItem[];
  itemCount: number;
  totalPage: number;
  curPage: number;
};

export type NaverPayResponse = {
  code: number;
  message: string;
  result: NaverPayResult;
};

export type CoupangItem = {
  vendorItemId: number;
  vendorItemName: string;
  quantity: number;
  unitPrice: number;
};

type bundleRecipt = {
  vendorItems: CoupangItem[];
};

export type CoupangOrderList = {
  orderId: number;
  title: string;
  orderedAt: string;
  totalProductPrice: number;
  bundleReceiptList: bundleRecipt[];
};

export type CoupangPostResponse = {
  success: boolean;
  status: 'C_PINCODE' | 'C_PASSWORD' | 'C_COMPLETED' | 'C_ERROR';
  result: string;
};

export type CoupangPaymentResponse = {
  pageIndex: number;
  size: number;
  orderList: CoupangOrderList[];
};

export type Item = {
  productId: string;
  itemId?: string;
  quantity: number;
};

export type ElevenStreetResponse = {
  success: boolean;
  status:
    | '11_PINCODE'
    | '11_RECAPTCHA'
    | '11_PAYMENT'
    | '11_COMPLETED'
    | '11_ERROR';
  result: { base64Image: string; tableSize: number };
};
