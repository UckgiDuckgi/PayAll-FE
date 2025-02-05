import { API_ROUTE } from '@/constants/route';
import {
  COUPANG_PAYMENT_DETAIL_URL,
  ELEVENSTREET_PAYMENT_DETAIL_URL,
  NAVERPAY_PAYMENT_DETAIL_URL,
} from '@/constants/url';
import { Category, PaymentType } from '@/types';
import { Cookie } from '@/types/payment';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCookies = (cookies: Cookie[]) => {
  return cookies.reduce((acc, { name, value }) => {
    return acc + (name + '=' + value + '; ');
  }, '');
};

export function convertDateToTimestamp(dateString: string): number {
  const date = new Date(dateString);
  return date.getTime();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showToast = (toast: any, description: string) => {
  toast({
    description,
    duration: 3000,
  });
};

export const parsePaymentType = (paymentType: PaymentType) => {
  if (paymentType === 'ONLINE') return '온라인';
  if (paymentType === 'OFFLINE') return '오프라인';
  if (paymentType === 'PAYALL') return 'PayAll';
  return '통합';
};

export const parseURL = (url: string, key: string) => {
  if (key === 'productId') {
    const match = url.match(/(?:ctag|prdNo)=(\d+)/);
    return match ? match[1] : null;
  } else if (key === 'itemId') {
    const match = url.match(/vendorItemId=(\d+)/);
    return match ? match[1] : null;
  }
};

export const parseCategory = (category: Category) => {
  switch (category) {
    case 'SHOPPING':
      return '쇼핑';
    case 'EDUCATION':
      return '교육';
    case 'LIVING':
      return '생활';
    case 'TRANSPORT':
      return '교통';
    case 'CULTURE':
      return '문화';
    case 'RESTAURANT':
      return '외식';
    case 'CAFE':
      return '카페';
    case 'HEALTH':
      return '건강';
    case 'OTHERS':
      return '기타';
    default:
      return '통합';
  }
};

const getUrlByPlatform = (shop: string) =>
  shop === 'COUPANG'
    ? COUPANG_PAYMENT_DETAIL_URL
    : shop === '11ST'
      ? ELEVENSTREET_PAYMENT_DETAIL_URL
      : NAVERPAY_PAYMENT_DETAIL_URL;

export const getFetchUrlByPlatfrom = (shop: string) =>
  shop === 'COUPANG'
    ? API_ROUTE.payment_details.coupang
    : shop === '11ST'
      ? API_ROUTE.payment_details.elevenstreet
      : API_ROUTE.payment_details.naverpay;

export const getBodyByPlatform = (shop: string, id: string, pw: string) => {
  const commonObj = {
    url: getUrlByPlatform(shop),
    id,
    pw,
  };
  return shop === 'COUPANG'
    ? {
        ...commonObj,
        requestYear: 2025,
        pageIndex: 0,
        size: 10,
      }
    : shop === '11ST'
      ? {
          ...commonObj,
          shDateFrom: '20200701',
          shDateTo: '20250204',
          pageNumber: 1,
          rows: 10,
        }
      : {
          ...commonObj,
        };
};
