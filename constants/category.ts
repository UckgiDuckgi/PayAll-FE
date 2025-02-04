import { Category } from '@/types/table';

export const CATEGORY: Record<Category, string> = {
  TOTAL: '전체',
  SHOPPING: '쇼핑',
  EDUCATION: '교육',
  LIVING: '생활',
  TRANSPORT: '교통',
  CULTURE: '문화,여가',
  RESTAURANT: '음식점',
  CAFE: '카페',
  HEALTH: '병원',
  OTHERS: '기타',
};

export const PLATFORMS = ['쿠팡', '11번가', '네이버페이'];

export const platformMap: Record<string, string> = {
  COUPANG: '쿠팡',
  '11ST': '11번가',
  NAVER: '네이버페이',
  쿠팡: 'COUPANG',
  '11번가': '11ST',
  네이버페이: 'NAVER',
};
