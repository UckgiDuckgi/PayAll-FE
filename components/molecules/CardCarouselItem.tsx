function CardCarouselItem({
  category,
  paymentName,
  amount,
  color,
}: {
  category: string;
  paymentName: string;
  amount: number;
  color: string;
}) {
  return (
    <div className='flex flex-col items-start justify-between'>
      <div className='text-[.625rem] whitespace-nowrap flex items-end gap-1 text-grey font-bold'>
        <span style={{ color: color }}>{category}</span>중 최고 소비
        <span className='text-[.875rem]'>{paymentName}</span>
      </div>
      <div className='flex items-center gap-1 text-[.625rem] text-grey font-bold'>
        지난 달에만
        <span className='text-[.875rem]'>{amount.toLocaleString()}</span>원 혜택
        받을 수 있었어요.
      </div>
    </div>
  );
}

export default CardCarouselItem;
