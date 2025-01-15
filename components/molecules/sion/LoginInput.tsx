export const LoginInput = ({ type }: { type: string }) => {
  return (
    <div className='flex flex-col items-center justify-stretch w-full h-15 border-b border-white'>
      <div className='text-lg font-bold text-left w-full text-[#464646] mb-3'>
        {type}
      </div>
      <input className='w-full h-5 rounded-md p-2 bg-transparent outline-none' />
    </div>
  );
};
