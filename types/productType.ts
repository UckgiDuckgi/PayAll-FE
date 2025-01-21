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

export type ProductCardsType = {
  cards: ProductType[];
};

export type ProductSubscriptionsType = {
  subscribes: ProductType[];
};
