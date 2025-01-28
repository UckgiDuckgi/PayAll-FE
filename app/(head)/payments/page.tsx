'use client';

import { PaymentMebershipCard } from '@/components/molecules/PaymentMebershipCard';
import { Button } from '@/components/ui/button';
import { API_ROUTE } from '@/constants/route';
import {
  CoupangPostResponse,
  ElevenStreetResponse,
  Item,
} from '@/types/payment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

  const [isClicked, setIsClicked] = useState(false);
  const [coupangResponse, setCoupangResponse] =
    useState<CoupangPostResponse | null>(null);
  const [isCoupangLoading, setIsCoupangLoading] = useState(false);

  const [elevenStreetResponse, setElevenStreetResponse] =
    useState<ElevenStreetResponse | null>(null);
  const [isElevenStreetLoading, setIsElevenStreetLoading] = useState(false);

  // const { resData: platformData, isLoading } = useGenericQuery<PlatformType>(
  //   [QUERY_KEYS.PLATFORM],
  //   () => getPlatform()
  // );

  const coupangItemList: Item[] = [
    {
      productId: '7666070794',
      itemId: '90437044721',
      quantity: 1,
    },
    // {
    //   productId: '7958974',
    //   itemId: '91118401786',
    //   quantity: 2,
    // },
    // {
    //   productId: '2042132',
    //   itemId: '86533230299',
    //   quantity: 2,
    // },
    // {
    //   productId: '7591951475',
    //   quantity: 1,
    // },
  ];

  const elevenStreetItemList: Item[] = [
    {
      productId: '7864138029',
      quantity: 1,
    },
  ];

  const coupangPromise = async ({
    itemList,
    pincode = '',
    password = '',
    init = false,
  }: {
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
    itemList,
    pincode = '',
    selectedTileList = '',
    isReCaptchaEnd = false,
  }: {
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

  const handleBothClick = async ({
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
        itemList: coupangItemList,
        pincode,
        password,
        init,
      }),
      elevnStreetPromise({
        itemList: elevenStreetItemList,
        selectedTileList,
        isReCaptchaEnd,
      }),
    ]);
  };

  const handleCoupangClick = async ({
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
      itemList: coupangItemList,
      pincode,
      password,
      init,
    });
  };

  const handleElevenStreetClick = async ({
    elevenStreetItemList,
    selectedTileList = '',
    isReCaptchaEnd = false,
  }: {
    elevenStreetItemList?: Item[];
    selectedTileList?: string;
    isReCaptchaEnd?: boolean;
  }) => {
    await elevnStreetPromise({
      itemList: elevenStreetItemList,
      selectedTileList,
      isReCaptchaEnd,
    });
  };

  const platformData = {
    code: 200,
    status: 'OK',
    message: '플랫폼 계정 조회 성공',
    data: {
      platformInfos: [
        {
          platformName: 'COUPANG',
          id: 'hanaro@hanaro.com',
          pw: 'test1234',
        },
        {
          platformName: 'COUPANG',
          id: 'hanaro@hanaro.com',
          pw: 'test1234',
        },
      ],
    },
  };

  const isLoading = false;

  if (!platformData || !platformData.data || isLoading) return <></>;

  const PLATFORM_LIST = ['COUPANG', '11ST'];

  // TODO: 수정 필요
  const isActive =
    platformData.data.platformInfos.length === PLATFORM_LIST.length
      ? true
      : false;

  const handleLinking = (shop: string) => {
    router.push(`/mypage/membership/${shop}?from=payments`);
  };

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
