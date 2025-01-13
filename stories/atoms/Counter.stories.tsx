import { Counter } from '@/components/ui/Counter';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
  argTypes: {
    pid: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  args: {
    pid: 1,
  },
};

export const WithCustomClass: Story = {
  args: {
    pid: 2,
    className: 'mt-4',
  },
};
