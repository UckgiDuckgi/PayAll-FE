function FixedExpensesCard({
  date,
  expensesName,
  expensesPrice,
}: {
  date: string;
  expensesName: string;
  expensesPrice: number;
}) {
  const day = date.split('-')[2];
  return (
    <div className='py-3 px-4 bg-deepDarkGrey rounded-[10px] flex items-center justify-between'>
      <div className='flex items-center justify-center gap-2'>
        <span className='w-fit text-[.625rem] text-darkGrey font-bold flex items-center justify-center bg-grey px-2 py-1 rounded-full'>
          {day[0] === '0' ? day.slice(1) : day}일
        </span>
        <span className='text-[.9375rem] font-bold'>{expensesName}</span>
      </div>
      <span className='text-[.875rem] text-[#AAAAAA] font-bold'>
        {expensesPrice.toLocaleString()}원
      </span>
    </div>
  );
}

export default FixedExpensesCard;
