'use client';

import { motion, cubicBezier } from 'framer-motion';
import { AccountCard, Bank } from './AccountCard';

type Account = {
  bank_name: Bank;
  account_name: string;
  account_number: string;
  balance: number;
};

interface AccountCardListProps {
  accounts: Account[];
  className?: string;
}

export const AccountCardList = ({
  accounts,
  className,
}: AccountCardListProps) => {
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
          key={account.account_number}
          variants={item}
          className='w-full overflow-hidden'
        >
          <AccountCard index={index} account={account} />
        </motion.div>
      ))}
    </motion.div>
  );
};
