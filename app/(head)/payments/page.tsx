'use client';

import { PaymentMebershipCard } from '@/components/molecules/PaymentMebershipCard';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants/queryKey';
import { API_ROUTE } from '@/constants/route';
import { useGenericMutation, useGenericQuery } from '@/hooks/query/globalQuery';
import { purchaseAtom, shopCartAtom } from '@/stores/atom';
import { Platform, Purchase } from '@/types';
import { PlatformType } from '@/types/authType';
import {
  CoupangPostResponse,
  ElevenStreetResponse,
  Item,
} from '@/types/payment';
import { useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPlatform, postPurchase } from '@/lib/api';

export type OnClick = ({
  coupangItemList,
  elevenStreetItemList,
  pincode,
  password,
  selectedTileList,
  isReCaptchaEnd,
}: {
  coupangItemList?: Item[];
  elevenStreetItemList?: Item[];
  pincode?: string;
  password?: string;
  selectedTileList?: string;
  isReCaptchaEnd?: boolean;
}) => Promise<void>;

export default function PaymentMembership() {
  const router = useRouter();

  const cartItems = useAtomValue(shopCartAtom);
  const purcahse = useAtomValue(purchaseAtom);

  const [isClicked, setIsClicked] = useState(false);
  const [coupangResponse, setCoupangResponse] =
    useState<CoupangPostResponse | null>(null);
  const [isCoupangLoading, setIsCoupangLoading] = useState(false);

  const [elevenStreetResponse, setElevenStreetResponse] =
    useState<ElevenStreetResponse | null>(null);
  const [isElevenStreetLoading, setIsElevenStreetLoading] = useState(false);

  const { resData: platformData, isLoading } = useGenericQuery<PlatformType>(
    [QUERY_KEYS.PLATFORM],
    () => getPlatform()
  );

  const queryClient = useQueryClient();

  const { mutate: postPurchaseMutate } = useGenericMutation(
    [QUERY_KEYS.PURCHASE],
    (data: Purchase) => postPurchase(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.CART_LIST],
        });
      },
    }
  );

  // const coupangItemList: Item[] = [
  //   {
  //     productId: '7666070794',
  //     itemId: '90437044721',
  //     quantity: 1,
  //   },
  //   // {
  //   //   productId: '7958974',
  //   //   itemId: '91118401786',
  //   //   quantity: 2,
  //   // },
  //   // {
  //   //   productId: '2042132',
  //   //   itemId: '86533230299',
  //   //   quantity: 2,
  //   // },
  //   // {
  //   //   productId: '7591951475',
  //   //   quantity: 1,
  //   // },
  // ];
  const coupangItemList: Item[] = cartItems['coupang'];

  // const elevenStreetItemList: Item[] = [
  //   {
  //     productId: '7864138029',
  //     quantity: 1,
  //   },
  // ];
  const elevenStreetItemList: Item[] = cartItems['11st'];

  useEffect(() => {
    if (coupangItemList.length === 0 && elevenStreetItemList.length === 0) {
      // TODO: TOAST로 고쳐야함. 근데 바꾸니까 에러뜸 일단 PASS
      console.log('결제 정보가 없습니다.');
      router.push('/cart');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupangItemList.length, elevenStreetItemList.length]);

  const coupangPromise = async ({
    id,
    pw,
    itemList,
    pincode = '',
    password = '',
    init = false,
  }: {
    id: string;
    pw: string;
    itemList?: Item[];
    pincode?: string;
    password?: string;
    init?: boolean;
  }) => {
    try {
      setIsCoupangLoading(true);
      const response = await fetch(API_ROUTE.payments.coupang, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          pw,
          pincode,
          password,
          itemList,
          init,
        }),
      });

      const res = (await response.json()) as CoupangPostResponse;
      setCoupangResponse(res ?? null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsCoupangLoading(false);
    }
  };

  const elevnStreetPromise = async ({
    id,
    pw,
    itemList,
    pincode = '',
    selectedTileList = '',
    isReCaptchaEnd = false,
  }: {
    id: string;
    pw: string;
    itemList?: Item[];
    pincode?: string;
    selectedTileList?: string;
    isReCaptchaEnd?: boolean;
  }) => {
    try {
      setIsElevenStreetLoading(true);
      const response = await fetch(API_ROUTE.payments.elevenstreet, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          pw,
          selectedTileList,
          isReCaptchaEnd,
          pincode,
          itemList,
        }),
      });

      const res = (await response.json()) as ElevenStreetResponse;
      setElevenStreetResponse(res ?? null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsElevenStreetLoading(false);
    }
  };

  const getHandleBothClick =
    ({
      coupangId,
      coupangPw,
      elevenStreetId,
      elevenStreetPw,
    }: {
      coupangId: string;
      coupangPw: string;
      elevenStreetId: string;
      elevenStreetPw: string;
    }) =>
    async ({
      coupangItemList,
      elevenStreetItemList,
      pincode = '',
      password = '',
      selectedTileList = '',
      isReCaptchaEnd = false,
      init = false,
    }: {
      coupangItemList?: Item[];
      elevenStreetItemList?: Item[];
      pincode?: string;
      password?: string;
      selectedTileList?: string;
      isReCaptchaEnd?: boolean;
      init?: boolean;
    }) => {
      await Promise.all([
        coupangPromise({
          id: coupangId,
          pw: coupangPw,
          itemList: coupangItemList,
          pincode,
          password,
          init,
        }),
        elevnStreetPromise({
          id: elevenStreetId,
          pw: elevenStreetPw,
          itemList: elevenStreetItemList,
          selectedTileList,
          isReCaptchaEnd,
        }),
      ]);
    };

  const getHandleCoupangClick =
    ({ id, pw }: { id: string; pw: string }) =>
    async ({
      coupangItemList,
      pincode = '',
      password = '',
      init = false,
    }: {
      coupangItemList?: Item[];
      pincode?: string;
      password?: string;
      init?: boolean;
    }) => {
      await coupangPromise({
        id,
        pw,
        itemList: coupangItemList,
        pincode,
        password,
        init,
      });
    };

  const getHandleElevenStreetClick =
    ({ id, pw }: { id: string; pw: string }) =>
    async ({
      elevenStreetItemList,
      selectedTileList = '',
      isReCaptchaEnd = false,
    }: {
      elevenStreetItemList?: Item[];
      selectedTileList?: string;
      isReCaptchaEnd?: boolean;
    }) => {
      await elevnStreetPromise({
        id,
        pw,
        itemList: elevenStreetItemList,
        selectedTileList,
        isReCaptchaEnd,
      });
    };

  // const platformData = {
  //   code: 200,
  //   status: 'OK',
  //   message: '플랫폼 계정 조회 성공',
  //   data: {
  //     platformInfos: [
  //       {
  //         platformName: 'COUPANG',
  //         id: 'hanaro@hanaro.com',
  //         pw: 'test1234',
  //       },
  //       {
  //         platformName: 'COUPANG',
  //         id: 'hanaro@hanaro.com',
  //         pw: 'test1234',
  //       },
  //     ],
  //   },
  // };

  // const isLoading = false;

  if (!platformData || !platformData.data || isLoading) return <></>;

  const PLATFORM_LIST: Platform[] = ['COUPANG', '11ST'];

  // TODO: 수정 필요 : 3개 등록되어있을 수 있음.
  const isActive =
    platformData.data.platformInfos.length === PLATFORM_LIST.length
      ? true
      : false;

  const getPlatformInfo = (pName: Platform) =>
    platformData.data?.platformInfos.find(
      ({ platformName }) => platformName === pName
    );

  const platformInfos = PLATFORM_LIST.map(getPlatformInfo);

  const handleBothClick = getHandleBothClick({
    coupangId: platformInfos[0]?.id ?? '',
    coupangPw: platformInfos[0]?.password ?? '',
    elevenStreetId: platformInfos[1]?.id ?? '',
    elevenStreetPw: platformInfos[1]?.password ?? '',
  });

  const handleCoupangClick = getHandleCoupangClick({
    id: platformInfos[0]?.id ?? '',
    pw: platformInfos[0]?.password ?? '',
  });

  const handleElevenStreetClick = getHandleElevenStreetClick({
    id: platformInfos[1]?.id ?? '',
    pw: platformInfos[1]?.password ?? '',
  });

  const handleLinking = (shop: string) => {
    router.push(`/mypage/membership/${shop}?from=payments`);
  };

  if (coupangResponse && elevenStreetResponse) {
    if (
      coupangResponse.status === 'C_COMPLETED' &&
      elevenStreetResponse.status === '11_COMPLETED'
    ) {
      console.log('결제 완료');
      postPurchaseMutate(purcahse);
      router.push('/');
    }
  }

  return (
    <div className='mt-[1.625rem] pb-10 w-full'>
      {PLATFORM_LIST.map((platform, idx) => {
        const isContain =
          platformData.data?.platformInfos?.some(
            ({ platformName }) => platformName === platform
          ) ?? false;
        return (
          <PaymentMebershipCard
            key={idx}
            shop={platform}
            isLinked={isContain}
            id={
              platformData.data?.platformInfos?.find(
                ({ platformName }) => platformName === platform
              )?.id
            }
            onLinkClick={() => handleLinking(platform)}
            response={
              platform === 'COUPANG' ? coupangResponse : elevenStreetResponse
            }
            isLoading={
              platform === 'COUPANG' ? isCoupangLoading : isElevenStreetLoading
            }
            onButtonClick={
              platform === 'COUPANG'
                ? handleCoupangClick
                : handleElevenStreetClick
            }
            itemList={
              platform === 'COUPANG' ? coupangItemList : elevenStreetItemList
            }
          />
        );
      })}

      {!isClicked && (
        <Button
          variant={'basic'}
          disabled={!isActive}
          className='fixed bottom-[100px] z-10 w-[90%] max-w-[460.8px]'
          onClick={() => {
            setIsClicked(true);
            handleBothClick({ coupangItemList, elevenStreetItemList });
          }}
        >
          결제하기
        </Button>
      )}
    </div>
  );
}
