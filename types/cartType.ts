export type CartReq = {
  productId: number;
  quantity: number;
  prevPrice: number;
};

export type PurchaseList = {
  cartId: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
};

export type Purchase = {
  purchaseList: PurchaseList[];
  totalPrice: number;
  totalDiscountPrice: number;
};
