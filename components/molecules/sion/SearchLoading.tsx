import { motion } from 'framer-motion';

export const SearchLoading = () => {
  return (
    <div className='pt-14'>
      <div className='flex flex-col gap-6'>
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className='bg-black p-4 w-full relative overflow-hidden'
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.1,
            }}
          >
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent'
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.1,
              }}
            />
            <div className='flex gap-4'>
              <div className='w-[120px] h-[120px] bg-darkGrey rounded-md'></div>
              <div className='flex flex-col gap-2 flex-1'>
                <div className='h-4 bg-darkGrey rounded w-full'></div>
                <div className='h-6 bg-darkGrey rounded w-1/3'></div>
                <div className='flex items-center gap-2 mt-1'>
                  <div className='h-6 w-24 bg-darkGrey rounded'></div>
                  <div className='h-5 w-5 bg-darkGrey rounded'></div>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <div className='flex gap-2'>
                <div className='h-10 w-32 bg-darkGrey rounded'></div>
                <div className='h-10 w-32 bg-darkGrey rounded'></div>
                <div className='h-10 w-32 bg-darkGrey rounded'></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
