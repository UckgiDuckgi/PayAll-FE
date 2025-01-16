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
