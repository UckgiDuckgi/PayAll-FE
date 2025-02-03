import ProgressBar from '@/components/molecules/GoalProgress';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/GoalProgress',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    spentAmount: { control: 'number' },
    limitAmount: { control: 'number' },
    start_date: { control: 'text' },
    end_date: { control: 'text' },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    spentAmount: 300000,
    limitAmount: 500000,
    start_date: '2024.01.01',
    end_date: '2024.01.31',
  },
};

export const Exceeded: Story = {
  args: {
    spentAmount: 600000,
    limitAmount: 500000,
    start_date: '2024.01.01',
    end_date: '2024.01.31',
  },
};

export const LowProgress: Story = {
  args: {
    spentAmount: 100000,
    limitAmount: 500000,
    start_date: '2024.01.01',
    end_date: '2024.01.31',
  },
};
