import { RecommendationsProductType } from '@/types/productType';
import { LowestProductCard } from './sion/LowestProductCard';

type LowestProductListProps = {
  products: RecommendationsProductType[];
};

export const LowestProductList = ({ products }: LowestProductListProps) => {
  return (
    <div className='flex space-x-4 overflow-x-scroll'>
      {products.map((product, index) => (
        <LowestProductCard key={index} {...product} />
      ))}
    </div>
  );
};
