import { LinkedMembershipCard } from '@/components/molecules/LinkedMembershipCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/LinkedAccount',
  component: LinkedMembershipCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    shop: { control: 'text' },
    isLinked: { control: 'boolean' },
    id: { control: 'text' },
    onLinkClick: { action: 'clicked' },
  },
} satisfies Meta<typeof LinkedMembershipCard>;

export default meta;
type Story = StoryObj<typeof LinkedMembershipCard>;

export const Linked: Story = {
  args: {
    shop: 'coupang',
    isLinked: true,
    id: 'example@email.com',
  },
};

export const Unlinked: Story = {
  args: {
    shop: 'coupang',
    isLinked: false,
  },
};
