export type Category =
  | 'SHOPPING'
  | 'EDUCATION'
  | 'LIVING'
  | 'TRANSPORT'
  | 'CULTURE'
  | 'RESTAURANT'
  | 'CAFE'
  | 'HEALTH'
  | 'OTHERS';

export const CATEGORY: Record<Category, string[]> = {
  SHOPPING: ['대형마트', '편의점'],
  EDUCATION: ['학교', '학원', '어린이집', '유치원'],
  LIVING: ['전기', '수도', '가스', '숙박'],
  TRANSPORT: ['주차', '대중교통'],
  CULTURE: ['문화', '여가'],
  RESTAURANT: ['음식점'],
  CAFE: ['카페'],
  HEALTH: ['병원비', '약국'],
  OTHERS: ['기타'],
};
