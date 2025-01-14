function PaymentDetailCard({
  paymentDetailId,
  productName,
  price,
  lowestPrice,
  vendorName,
  link,
}: {
  paymentDetailId: number;
  productName: string;
  price: number;
  lowestPrice: number;
  vendorName: string;
  link: string;
}) {
  return (
    <div className='w-full px-2 py-4 space-y-1 border-b-[1px] border-darkGrey'>
      <div className='flex items-center justify-between'>
        <span className='text-[.875rem] font-medium'>{productName}</span>
        <span className='tracking-wider text-[.9375rem] font-bold'>
          -{price.toLocaleString()}원
        </span>
      </div>
      <div className='flex items-center justify-between px-2 py-1 rounded-[5px] bg-deepDarkGrey'>
        <div className='space-y-1 text-left'>
          <span className='font-bold text-[.625rem] text-darkGrey font-medium'>
            같은 상품의 최저가
          </span>
          <div className='space-x-2'>
            <span>{vendorName}</span>
            <span className='text-[.75rem] font-medium'>
              {lowestPrice.toLocaleString()}
            </span>
            <span className='text-[.625rem] text-main font-medium'>
              {(((price - lowestPrice) / price) * 100).toFixed(0)}% 절약
            </span>
          </div>
        </div>
        <span>장바구니</span>
      </div>
    </div>
  );
}

export default PaymentDetailCard;
