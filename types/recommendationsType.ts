import { Category, ProductType } from './table';

export type RecommendationsType = {
  storeName: string;
  discountAmount: number;
  category: Category;
  productName: string;
  productType: ProductType;
  productId: number;
};
