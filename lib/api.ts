import { API_ROUTE } from '@/constants/route';
import apiCall from '@/hooks/useFetch';
import { Cart, Category, Purchase, User } from '@/types';
import { PlatformDetailType } from '@/types/authType';

const BASE_URL = API_ROUTE.api;

// auth
export const postSignIn = async ({ authId, password }: Partial<User>) => {
  // 로그인
  return await apiCall.post(BASE_URL + '/auth/sign-in', {
    authId,
    password,
  });
};

export const postSignUp = async (postSignUpRequest: Partial<User>) => {
  // 회원가입
  return await apiCall.post(BASE_URL + '/auth/sign-up', postSignUpRequest);
};

export const postPlatform = async ({
  platformName,
  id,
  password,
}: PlatformDetailType) => {
  // 외부플랫폼 계정 등록
  return await apiCall.post(BASE_URL + '/auth/platform', {
    platformName,
    id,
    password,
  });
};

export const getPlatform = async () => {
  // 외부플랫폼 계정 조회
  return await apiCall.get(BASE_URL + '/auth/platform');
};

// accounts
export const getPaymentsCategory = async ({
  category,
}: {
  category: Category;
}) => {
  // 카테고리 별 소비내역
  return await apiCall.get(BASE_URL + `/accounts/payments`, {
    category,
  });
};

// statistics
export const getStatistics = async ({ date }: { date: string }) => {
  // 소비분석
  return await apiCall.get(BASE_URL + '/statistics', {
    date,
  });
};

// limit
export const getLimit = async () => {
  // 목표 조회
  return await apiCall.get(BASE_URL + '/limit');
};

// search
export const getSearch = async ({ keyword }: { keyword: string }) => {
  return await apiCall.get(BASE_URL + '/search', {
    query: keyword,
  });
};

// cart
export const postCart = async ({
  productId,
  quantity = 1,
  prevPrice,
}: Partial<Cart>) => {
  return await apiCall.post(BASE_URL + '/cart', {
    productId,
    quantity,
    prevPrice,
  });
};

export const getCart = async () => {
  return await apiCall.get(BASE_URL + '/cart');
};

export const deleteCart = async ({ cartId }: { cartId: number }) => {
  return await apiCall.delete(BASE_URL + '/cart/' + cartId);
};

export const updateCart = async ({
  cartId,
  quantity,
}: {
  cartId: number;
  quantity: number;
}) => {
  return await apiCall.patch(BASE_URL + '/cart/' + cartId, {
    quantity,
  });
};

export const postPurchase = async (purchase: Purchase) => {
  return await apiCall.post(BASE_URL + '/purchase', purchase);
};

export const postLimit = async ({ limitPrice }: { limitPrice: number }) => {
  // 목표 등록
  return await apiCall.post(BASE_URL + '/limit', {
    limitPrice,
  });
};

export const getAccounts = async () => {
  return await apiCall.get(BASE_URL + '/accounts');
};

export const getAccountsDetail = async ({
  accountId,
}: {
  accountId?: number;
}) => {
  return await apiCall.get(BASE_URL + '/accounts/payments', {
    accountId: accountId ?? '',
  });
};

// recommendations
export const getRecommendations = async () => {
  return await apiCall.get(BASE_URL + '/recommendations');
};

// product
export const getProductDetail = async ({
  productId,
}: {
  productId: number;
}) => {
  return await apiCall.get(BASE_URL + '/product/' + productId);
};

export const getProductCards = async () => {
  return await apiCall.get(BASE_URL + '/product/cards');
};

export const getProductSubscribs = async () => {
  return await apiCall.get(BASE_URL + '/product/subscribes');
};

export const getPaymentDetail = async ({
  paymentId,
}: {
  paymentId: number;
}) => {
  return await apiCall.get(BASE_URL + '/accounts/payments/' + paymentId);
};

export const postReceipt = async ({
  paymentId,
  productList,
}: {
  paymentId: number;
  productList: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
}) => {
  return await apiCall.post(BASE_URL + '/receipt', {
    paymentId,
    productList,
  });
};

export const getRecommendationsProduct = async () => {
  return await apiCall.get(BASE_URL + '/recommendations/products');
};

// mypage
export const getUserInfo = async () => {
  return await apiCall.get(BASE_URL + '/user');
};
