import { RecommendationsProductType } from '@/types/productType';
import { LowestProductCard } from './sion/LowestProductCard';

type LowestProductListProps = {
  products: RecommendationsProductType[];
};
const MOCK_PRODUCT = [
  {
    productId: 1026291,
    productName: '농심 신라면 120g (5개)',
    productImage:
      'https://img.danawa.com/prod_img/500000/291/026/img/1026291_1.jpg?shrink=330:*&_v=20220906110726',
    price: 3170,
    storeName: 'Coupang',
    link: 'https://www.coupang.com/vp/products/7958974?itemId=93553&vendorItemId=82652711027&src=1032034&spec=10305199&addtag=400&ctag=7958974&lptag=I93553&itime=20250121140659&pageType=PRODUCT&pageValue=7958974&wPcid=17374317606920554847266&wRef=prod.danawa.com&wTime=20250121140659&redirect=landing&mcid=12f152f169ce4e2b86bb041db3c283b5',
    discountRate: 0,
  },
  {
    productId: 2012426,
    productName: '고려은단 비타민C 1000 600정 (1개)',
    productImage:
      'https://img.danawa.com/prod_img/500000/426/012/img/2012426_1.jpg?shrink=330:*&_v=20240827133727',
    price: 39880,
    storeName: '11st',
    link: 'https://www.11st.co.kr/products/7588965357?service_id=estimatedn&utm_term=&utm_campaign=%B4%D9%B3%AA%BF%CDpc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B4%D9%B3%AA%BF%CD_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3',
    discountRate: 0,
  },
];
export const LowestProductList = ({ products }: LowestProductListProps) => {
  return (
    <div className='flex space-x-4 overflow-x-scroll scrollbar-hide'>
      {(products && products.length > 0 ? products : MOCK_PRODUCT).map(
        (product, index) => (
          <LowestProductCard key={index} {...product} />
        )
      )}
    </div>
  );
};
