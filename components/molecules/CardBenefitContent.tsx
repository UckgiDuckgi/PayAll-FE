import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { ProductDetailType } from '@/types/productType';
import { getProductDetail } from '@/lib/api';
import CardBenefitInfo from './CardBenefitInfo';

function CardBenefitContent({ selectedIdx }: { selectedIdx: number }) {
  const { resData: productData, isLoading } =
    useGenericQuery<ProductDetailType>(
      [QUERY_KEYS.PRODUCT_DETAIL, selectedIdx],
      () => getProductDetail({ productId: selectedIdx })
    );

  if (!productData || !productData.data || isLoading) return <></>;

  console.log(productData.data);
  const { productName, benefitDescription, storeDetails } = productData.data;
  return (
    <>
      <CardBenefitInfo
        index={selectedIdx}
        productName={productName}
        benefitDescription={benefitDescription}
        storeDetails={storeDetails}
      />
    </>
  );
}

export default CardBenefitContent;
