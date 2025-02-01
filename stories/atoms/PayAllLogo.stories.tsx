import { PayAllLogo } from '@/components/ui/PayAllLogo';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PayAllLogo> = {
  title: 'Logo/PayAllLogo',
  component: PayAllLogo,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PayAllLogo>;

export const Default: Story = {
  args: {
    width: 120,
    height: 120,
  },
};

export const CustomSize: Story = {
  args: {
    width: 200,
    height: 200,
  },
};
