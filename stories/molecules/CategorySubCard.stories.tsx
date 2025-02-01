import CategorySubCard from '@/components/molecules/CategorySubCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/CategorySubCard',
  component: CategorySubCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    img: { control: 'text' },
    category: { control: 'text' },
    color: { control: 'color' },
    paymentName: { control: 'text' },
    amount: { control: 'number' },
  },
} satisfies Meta<typeof CategorySubCard>;

export default meta;
type Story = StoryObj<typeof CategorySubCard>;

export const Default: Story = {
  args: {
    img: '/images/products/3004.png',
    category: 'CAFE',
    color: '#FF6B6B',
    paymentName: '스타벅스',
    amount: 50000,
  },
};

export const Shopping: Story = {
  args: {
    img: '/images/products/3005.png',
    category: 'SHOPPING',
    color: '#4DABF7',
    paymentName: '쿠팡',
    amount: 150000,
  },
};
