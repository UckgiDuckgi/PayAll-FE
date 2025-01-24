import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { ProductDetailType } from '@/types/productType';
import { cubicBezier, motion } from 'framer-motion';
import { getProductDetail } from '@/lib/api';
import Loading from '../Loading';
import CardBenefitInfo from './CardBenefitInfo';

function CardBenefitContent({ selectedIdx }: { selectedIdx: number }) {
  const { resData: productData, isLoading } =
    useGenericQuery<ProductDetailType>(
      [QUERY_KEYS.PRODUCT_DETAIL, selectedIdx],
      () => getProductDetail({ productId: selectedIdx })
    );

  if (!productData || !productData.data || isLoading) return <Loading />;

  console.log(productData.data);
  const { productName, benefitDescription, storeDetails } = productData.data;

  const easeCustom = cubicBezier(0.4, 0, 0.2, 1);

  const item = {
    hidden: { opacity: 0, height: 0, scale: 0.8 },
    show: {
      opacity: [0, 0.5, 1],
      height: 'auto',
      scale: 1,
      transition: {
        duration: 0.7,
        ease: easeCustom,
        opacity: {
          duration: 1,
          ease: easeCustom,
        },
      },
    },
  };
  return (
    <motion.div variants={item} className='w-full'>
      <CardBenefitInfo
        index={selectedIdx}
        productName={productName}
        benefitDescription={benefitDescription}
        storeDetails={storeDetails}
      />
    </motion.div>
  );
}

export default CardBenefitContent;
