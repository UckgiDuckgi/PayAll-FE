import { CartProductCard } from '@/components/molecules/sion/CartProductCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/CartProductCard',
  component: CartProductCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4 max-w-md'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    cartId: { control: 'number' },
    imageUrl: { control: 'text' },
    productId: { control: 'number' },
    title: { control: 'text' },
    price: { control: 'number' },
    shop: { control: 'text' },
    quantity: { control: 'number' },
    isChecked: { control: 'boolean' },
    onCheckChange: { action: 'checked' },
    onQuantityChange: { action: 'quantity changed' },
    onDelete: { action: 'deleted' },
  },
} satisfies Meta<typeof CartProductCard>;

export default meta;
type Story = StoryObj<typeof CartProductCard>;

export const Default: Story = {
  args: {
    cartId: 1,
    imageUrl: '/images/Logo.png',
    productId: 1,
    title: '신라면',
    price: 4500,
    shop: 'Coupang',
    quantity: 1,
    isChecked: false,
  },
};

export const Checked: Story = {
  args: {
    cartId: 2,
    imageUrl: '/images/Logo.png',
    productId: 2,
    title: '물티슈',
    price: 5000,
    shop: '11st',
    quantity: 2,
    isChecked: true,
  },
};
