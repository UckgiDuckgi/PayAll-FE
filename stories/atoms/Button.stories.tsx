import { Button } from '@/components/ui/button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'back', 'util'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: '동의',
    variant: 'basic',
  },
};

export const Back: Story = {
  args: {
    children: '홈으로',
    variant: 'back',
  },
};

export const Util: Story = {
  args: {
    children: '담기',
    variant: 'util',
  },
};

export const SmallUtil: Story = {
  args: {
    children: '연동하기',
    variant: 'util',
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    variant: 'basic',
    disabled: true,
  },
};
