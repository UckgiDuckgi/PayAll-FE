export const PriceBox = ({
  totalPrice,
  deliveryFee,
}: {
  totalPrice: number;
  deliveryFee: number;
}) => {
  return (
    <div className='flex flex-col gap-2 w-[90%] mx-auto py-[0.875rem]'>
      <div className='font-bold text-[0.9375rem]'>결제 예상 금액</div>
      <div className='flex flex-col gap-1 mt-1 border-b border-[#D9D9D9] pb-3'>
        <div className='text-grey text-xs w-full flex justify-between '>
          <span>상품 금액</span>
          <span className=''>{totalPrice.toLocaleString()}원</span>
        </div>
        <div className='text-grey text-xs w-full flex justify-between '>
          <span>배송비</span>
          <span className=''>{deliveryFee.toLocaleString()}원</span>
        </div>
      </div>
      <div className='text-white font-bold flex justify-between w-full'>
        <span className='text-sm'>총 금액</span>
        <span className='text-main'>
          {(totalPrice + deliveryFee).toLocaleString()}원
        </span>
      </div>
    </div>
  );
};
