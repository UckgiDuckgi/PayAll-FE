import DeliveryFeeProgress from '@/components/molecules/DeliveryFeeProgress';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/DeliveryFeeProgress',
  component: DeliveryFeeProgress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    fee: { control: 'number' },
    totalFee: { control: 'number' },
  },
} satisfies Meta<typeof DeliveryFeeProgress>;

export default meta;
type Story = StoryObj<typeof DeliveryFeeProgress>;

export const Default: Story = {
  args: {
    fee: 15000,
    totalFee: 30000,
  },
};

export const FreeFee: Story = {
  args: {
    fee: 30000,
    totalFee: 30000,
  },
};

export const LowProgress: Story = {
  args: {
    fee: 5000,
    totalFee: 30000,
  },
};
