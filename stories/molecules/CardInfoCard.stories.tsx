import CardInfoCard from '@/components/molecules/CardInfoCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/CardInfoCard',
  component: CardInfoCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    cardImg: { control: 'text' },
    cardName: { control: 'text' },
    cardDescription: { control: 'text' },
  },
} satisfies Meta<typeof CardInfoCard>;

export default meta;
type Story = StoryObj<typeof CardInfoCard>;

export const Default: Story = {
  args: {
    cardImg: '/images/products/1004.png',
    cardName: '카드 이름',
    cardDescription: '카드 설명',
  },
};

export const LongDescription: Story = {
  args: {
    cardImg: '/images/products/1004.png',
    cardName: '하나카드',
    cardDescription: '하나카드 설명설명',
  },
};
