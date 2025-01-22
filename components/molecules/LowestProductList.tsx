import { LowestProductCard } from './sion/LowestProductCard';

type LowestProduct = {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  storeName: string;
  link: string;
  discountRate: number;
};

type LowestProductListProps = {
  products: LowestProduct[];
};

export const LowestProductList = ({ products }: LowestProductListProps) => {
  return (
    <div className='flex space-x-4 overflow-x-scroll'>
      {products.map((product, index) => (
        <LowestProductCard
          key={index}
          imageUrl={product.productImage}
          title={product.productName}
          discount={product.discountRate.toFixed(0)}
          price={product.price}
        />
      ))}
    </div>
  );
};
