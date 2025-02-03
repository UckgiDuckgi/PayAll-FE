import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { ProductDetailType } from '@/types/productType';
import { UseQueryOptions } from '@tanstack/react-query';
import Image from 'next/image';
import { getProductDetail } from '@/lib/api';
import Loading from '../Loading';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

function CardBenefitContent({
  selectedIdx,
  productId,
}: {
  selectedIdx: number;
  productId: number;
}) {
  console.log(selectedIdx, productId);
  const { resData: productData, isLoading } =
    useGenericQuery<ProductDetailType>(
      [QUERY_KEYS.PRODUCT_DETAIL, selectedIdx],
      () => getProductDetail({ productId: selectedIdx }),
      {
        enabled: productId === selectedIdx,
      } as UseQueryOptions<
        ProductDetailType,
        Error,
        ProductDetailType,
        readonly unknown[]
      >
    );

  if (!productData || !productData.data || isLoading) return <Loading />;

  const { productName, benefitDescription, storeDetails } = productData.data;

  return (
    <div className='w-full mx-auto flex flex-col items-start justify-start gap-5'>
      <div className='w-full'>
        <span className='w-full text-center text-[1.25rem] font-bold'>
          {productName}
        </span>
        <div className=' my-3 flex items-center justify-around gap-3 w-full'>
          <div className='w-[100px] sm:2-[120px] h-auto'>
            <Image
              src={`/images/products/${selectedIdx}.png`}
              alt='card'
              width={120}
              height={120}
            />
          </div>
          <div className='text-[.8125rem] text-grey font-medium '>
            <p className='flex items-center justify-start gap-3 flex-wrap'>
              {benefitDescription?.split(',')?.map((des, idx) => (
                <div
                  key={idx}
                  className='flex items-center justify-start gap-1'
                >
                  <span className='text-[.875rem] whitespace-nowrap'>
                    {des.split('-')[0] ?? ''}
                  </span>
                  <span className='text-[.875rem] text-main font-bold'>
                    {des.split('-')[1] ?? ''}
                  </span>
                </div>
              ))}
            </p>
          </div>
        </div>
      </div>
      <Separator className='bg-darkGrey h-[1px] w-full' />
      {storeDetails?.length > 0 && (
        <div className='pt-5 w-full text-start'>
          <p className='font-bold'>지난 달 기준 예상 혜택</p>
          <p className='font-medium text-[.5rem] text-darkGrey'>
            PayAll 예상 혜택 내역이므로 실제와 다를 수 있습니다
          </p>
          <span className='text-[1.125rem] text-grey font-medium'>
            총{' '}
            <span className='text-[1.5rem] text-main font-semibold'>
              {storeDetails
                .reduce((acc, { discountAmount }) => acc + discountAmount, 0)
                .toLocaleString()}
              원
            </span>{' '}
            혜택 받을 수 있어요
          </span>
          <div className='space-y-4 my-8'>
            {storeDetails.map(
              ({ storeName, visitCount, discountAmount }, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='space-x-2'>
                    <span className='text-[.875rem] text-grey font-bold'>
                      {storeName}
                    </span>
                    <Badge className='bg-deepDarkGrey px-2 rounded-full text-[.875rem] font-bold text-red'>
                      {visitCount}번{' '}
                      <span className='font-medium ml-1 text-[.6875rem] text-[#AAAAAA]'>
                        방문
                      </span>
                    </Badge>
                  </div>
                  <span className='text-[1.125rem] font-semibold text-grey'>
                    {discountAmount.toLocaleString()}원
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardBenefitContent;
