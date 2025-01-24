import { QUERY_KEYS } from '@/constants/queryKey';
import { ROUTE } from '@/constants/route';
import { useRouter } from 'next/navigation';
import { postSignIn, postSignUp } from '@/lib/api';
import { showToast } from '@/lib/utils';
import { useToast } from '../use-toast';
import { useGenericMutation } from './globalQuery';

type SignIn = {
  authId: string;
  password: string;
};

type SignUp = {
  name: string;
  authId: string;
  password: string;
  phone: string;
  address: string;
};

export const usePostSignIn = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useGenericMutation<SignIn>(
    [QUERY_KEYS.SIGN_IN],
    async ({ authId, password }: SignIn) => {
      return postSignIn({ authId, password });
    },
    {
      onSuccess: (data) => {
        console.log(data.code);
        if (data.code === 200) showToast(toast, '로그인에 성공하였습니다.');
        if (data.status === 'OK') router.push(ROUTE.mydata);
        if (data.status === 'Already Exists') router.push(ROUTE.home);
      },
      onError: (error) => {
        showToast(toast, error.message || '로그인 중 에러가 발생했습니다.');
      },
    }
  );
};

export const usePostSignUp = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useGenericMutation<SignUp>(
    [QUERY_KEYS.SIGN_UP],
    async ({ name, authId, password, phone, address }) => {
      return postSignUp({ name, authId, password, phone, address });
    },
    {
      onSuccess: () => {
        showToast(toast, '회원가입에 성공하였습니다!');
        router.push(ROUTE.signin);
      },
      onError: (error) => {
        showToast(toast, error.message || '회원가입 중 에러가 발생했습니다.');
      },
    }
  );
};
