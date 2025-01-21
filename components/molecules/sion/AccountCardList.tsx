'use client';

import { Account } from '@/types';
import { motion, cubicBezier } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AccountCard } from './AccountCard';

interface AccountCardListProps {
  accounts: Account[];
  className?: string;
}

export const AccountCardList = ({
  accounts,
  className,
}: AccountCardListProps) => {
  const router = useRouter();
  if (!accounts || accounts.length === 0) return null;

  const easeCustom = cubicBezier(0.4, 0, 0.2, 1);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: easeCustom,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, height: 0, scale: 0.8 },
    show: {
      opacity: [0, 0.5, 1],
      height: 'auto',
      scale: 1,
      transition: {
        duration: 0.7,
        ease: easeCustom,
        opacity: {
          duration: 1,
          ease: easeCustom,
        },
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-col gap-4 w-full ${className}`}
      variants={container}
      initial='hidden'
      animate='show'
    >
      {accounts.map((account, index) => (
        <motion.div
          key={index}
          variants={item}
          className='w-full overflow-hidden'
        >
          <AccountCard
            account={account}
            onClick={() => router.push(`/accounts/${account.accountId}`)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
