import { CardCarousel } from '@/components/molecules/CardCarousel';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/CardCarousel',
  component: CardCarousel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4 max-w-md'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    cards: { control: 'object' },
  },
} satisfies Meta<typeof CardCarousel>;

export default meta;
type Story = StoryObj<typeof CardCarousel>;

export const Default: Story = {
  args: {
    cards: [
      {
        category: 'CAFE',
        storeName: '스타벅스',
        discountAmount: 3000,
        productId: 1,
        productName: '하나',
        productType: 'CARD',
      },
      {
        category: 'SHOPPING',
        storeName: '쿠팡',
        discountAmount: 5000,
        productId: 2,
        productName: 'hana',
        productType: 'CARD',
      },
      {
        category: 'TRANSPORT',
        storeName: '카카오T',
        discountAmount: 2000,
        productId: 3,
        productName: '카카오T',
        productType: 'CARD',
      },
    ],
  },
};

export const SingleCard: Story = {
  args: {
    cards: [
      {
        category: 'CAFE',
        storeName: '스타벅스',
        discountAmount: 3000,
        productId: 1,
        productName: '아메리카노',
        productType: 'CARD',
      },
    ],
  },
};
