import PaymentCard from '@/components/molecules/PaymentCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/PaymentCard',
  component: PaymentCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    showAccount: { control: 'boolean' },
    paymentInfo: { control: 'object' },
  },
} satisfies Meta<typeof PaymentCard>;

export default meta;
type Story = StoryObj<typeof PaymentCard>;

export const Default: Story = {
  args: {
    showAccount: true,
    paymentInfo: {
      paymentId: 123,
      paymentPlace: '스타벅스',
      category: 'CAFE',
      paymentPrice: 5600,
      paymentType: 'OFFLINE',
      paymentTime: '2024-03-19T15:30:00',
      bankName: '신한',
      accountName: '체크카드',
      shootNeed: false,
    },
  },
};

export const WithoutAccount: Story = {
  args: {
    showAccount: false,
    paymentInfo: {
      paymentId: 124,
      paymentPlace: '쿠팡',
      category: 'SHOPPING',
      paymentPrice: 32000,
      paymentType: 'ONLINE',
      paymentTime: '2024-03-19T14:20:00',
      bankName: '국민',
      accountName: '신용카드',
      shootNeed: false,
    },
  },
};
