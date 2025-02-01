import AccountUnionCard from '@/components/molecules/sion/AccountUnionCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/AccountUnionCard',
  component: AccountUnionCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4 max-w-md'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    username: { control: 'text' },
    formattedLastMonthDate: { control: 'text' },
    totalBalance: { control: 'number' },
    difference: { control: 'number' },
  },
} satisfies Meta<typeof AccountUnionCard>;

export default meta;
type Story = StoryObj<typeof AccountUnionCard>;

export const Default: Story = {
  args: {
    username: '홍길동',
    formattedLastMonthDate: '2024.02',
    totalBalance: 1500000,
    difference: 50000,
  },
};

export const Decreased: Story = {
  args: {
    username: '김철수',
    formattedLastMonthDate: '2024.02',
    totalBalance: 3000000,
    difference: -120000,
  },
};

export const HighBalance: Story = {
  args: {
    username: '이영희',
    formattedLastMonthDate: '2024.02',
    totalBalance: 10000000,
    difference: 500000,
  },
};
