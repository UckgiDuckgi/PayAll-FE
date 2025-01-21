import { API_ROUTE } from '@/constants/route';
import apiCall from '@/hooks/useFetch';
import { Category, User } from '@/types/table';

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
