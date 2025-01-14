import Image from 'next/image';

function CategoryCarousel({
  color,
  categoryName,
  categoryIconName,
  amount,
}: {
  color: string;
  categoryName: string;
  categoryIconName: string;
  amount: number;
}) {
  return (
    <div className='box-border w-[6.25rem] h-[4.5625rem] relative flex flex-col items-center justify-center'>
      <span
        className='box-border z-10 flex items-center justify-center absolute top-0 w-[2.375rem] h-[2.375rem] rounded-full'
        style={{ background: color }}
      >
        <Image
          src={`/icons/Category/${categoryIconName}.svg`}
          alt='category'
          width={18}
          height={18}
        />
      </span>
      <div className='box-border w-fit absolute top-[1.18925rem] flex flex-col items-centerspace-y-1 py-2 px-4 pt-6 rounded-[20px] bg-deepDarkGrey whitespace-nowrap'>
        <span className='text-darkGrey text-[.8125rem] font-bold'>
          {categoryName}
        </span>
        <span className='text-[.9325rem] font-bold'>
          {amount.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}

export default CategoryCarousel;
