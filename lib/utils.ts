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
  return '통합';
};

export const parseURL = (url: string, key: string) => {
  if (key === 'productId') {
    const match = url.match(/products\/(\d+)/);
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
