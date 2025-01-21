export type LowPriceStore = {
  shopName: string;
  price: number;
  shopUrl: string;
};

export type Search = {
  pcode: number;
  productName: string;
  productImage: string;
  storeList: LowPriceStore[];
};
