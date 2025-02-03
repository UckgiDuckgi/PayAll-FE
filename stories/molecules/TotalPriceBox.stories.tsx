import { TotalPriceBox } from '@/components/molecules/sion/TotalPriceBox';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/TotalPriceBox',
  component: TotalPriceBox,
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
} satisfies Meta<typeof TotalPriceBox>;

export default meta;
type Story = StoryObj<typeof TotalPriceBox>;

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
