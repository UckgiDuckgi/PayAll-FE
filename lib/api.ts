import { API_ROUTE } from '@/constants/route';
import apiCall from '@/hooks/useFetch';
import { User } from '@/types/table';

const BASE_URL = API_ROUTE.api;

// auth
export const postSignIn = async ({ authId, password }: Partial<User>) => {
  return (await apiCall.post(BASE_URL + '/auth/sign-in', {
    authId,
    password,
  })) as Partial<User>;
};

export const postSignUp = async (postSignUpRequest: Partial<User>) => {
  return (await apiCall.post(
    BASE_URL + '/auth/sign-up',
    postSignUpRequest
  )) as Partial<User>;
};
