export type StoreDetailType = {
  category: string;
  storeName: string;
  discountAmount: number;
  visitCount: number;
};

export type ProductDetailType = {
  productName: string;
  benefitDescription: string;
  storeDetails: StoreDetailType[];
};

export type ProductType = {
  productId: number;
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
