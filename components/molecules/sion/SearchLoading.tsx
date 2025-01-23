export const SearchLoading = () => {
  return (
    <div className='pt-14'>
      <div className='flex flex-col gap-4'>
        {[...Array(2)].map((_, i) => (
          <div key={i} className='bg-black p-4 w-full h-[224px] animate-pulse'>
            <div className='flex gap-4'>
              <div className='w-[180px] h-[180px] bg-darkGrey rounded-md'></div>
              <div className='flex flex-col gap-3 flex-1'>
                <div className='h-5 bg-darkGrey rounded w-full'></div>
                <div className='h-7 bg-darkGrey rounded w-2/3'></div>
                <div className='flex gap-2 items-center'>
                  <div className='h-4 bg-darkGrey rounded w-16'></div>
                  <div className='h-4 bg-darkGrey rounded w-20'></div>
                </div>
                <div className='flex justify-end mt-auto'>
                  <div className='h-9 w-9 bg-darkGrey rounded-full'></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
