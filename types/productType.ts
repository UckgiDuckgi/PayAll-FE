export type ProductDetailType = {
  productName: string;
  benefitDescription: string;
  category: string;
  storeName: string;
  discountAmount: number;
  visitCount: number;
};

export type ProductType = {
  productName: string;
  productDescription: string;
  benefitDescription: string;
};

export type RecommendationsProductType = {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  storeName: string;
  link: string;
  discountRate: number;
};
