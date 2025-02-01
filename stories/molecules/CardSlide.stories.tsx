import CardSlide from '@/components/molecules/sion/CardSlide';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/CardSlide',
  component: CardSlide,
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
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof CardSlide>;

export default meta;
type Story = StoryObj<typeof CardSlide>;

export const Default: Story = {
  args: {
    cards: [
      {
        id: 1,
        bankName: '하나카드',
        cardNumber: '1234-****-****-5678',
        imageUrl: 'hana.png',
      },
      {
        id: 2,
        bankName: '현대카드',
        cardNumber: '5678-****-****-1234',
        imageUrl: 'hyundai.png',
      },
      {
        id: 3,
        bankName: '신한카드',
        cardNumber: '9012-****-****-3456',
        imageUrl: 'sinhan.png',
      },
    ],
  },
};

export const SingleCard: Story = {
  args: {
    cards: [
      {
        id: 1,
        bankName: '하나카드',
        cardNumber: '1234-****-****-5678',
        imageUrl: 'hana.png',
      },
    ],
  },
};
