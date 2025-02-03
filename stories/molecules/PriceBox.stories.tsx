import { PriceBox } from '@/components/molecules/sion/PriceBox';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/PriceBox',
  component: PriceBox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4 max-w-md bg-background'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    totalPrice: { control: 'number' },
    deliveryFee: { control: 'number' },
  },
} satisfies Meta<typeof PriceBox>;

export default meta;
type Story = StoryObj<typeof PriceBox>;

export const Default: Story = {
  args: {
    totalPrice: 25000,
    deliveryFee: 3000,
  },
};

export const HighPrice: Story = {
  args: {
    totalPrice: 150000,
    deliveryFee: 0,
  },
};

export const WithHighDeliveryFee: Story = {
  args: {
    totalPrice: 8000,
    deliveryFee: 5000,
  },
};
