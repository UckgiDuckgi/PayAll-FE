import { AccountCard } from '@/components/molecules/sion/AccountCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/AccountCard',
  component: AccountCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4 max-w-md'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    account: { control: 'object' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof AccountCard>;

export default meta;
type Story = StoryObj<typeof AccountCard>;

export const Default: Story = {
  args: {
    account: {
      accountId: 1,
      userId: 1,
      accountNumber: 1234567890,
      bankName: '하나은행',
      accountName: '일상통장',
      balance: 1500000,
    },
  },
};

export const HighBalance: Story = {
  args: {
    account: {
      accountId: 2,
      userId: 1,
      accountNumber: 1234567890,
      bankName: '국민은행',
      accountName: '급여통장',
      balance: 5000000,
    },
  },
};

export const LowBalance: Story = {
  args: {
    account: {
      accountId: 3,
      userId: 1,
      accountNumber: 1234567890,
      bankName: '카카오뱅크',
      accountName: '비상금통장',
      balance: 100000,
    },
  },
};
