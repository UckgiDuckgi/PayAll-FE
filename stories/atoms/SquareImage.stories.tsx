import { SquareImage } from '@/components/ui/SquareImage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SquareImage> = {
  title: 'Components/SquareImage',
  component: SquareImage,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number' },
    src: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SquareImage>;

export const Default: Story = {
  args: {
    src: '/images/Logo.png',
    alt: 'Logo image',
    size: 120,
  },
};

export const CustomSize: Story = {
  args: {
    src: '/images/Logo.png',
    alt: 'Logo image',
    size: 200,
  },
};
