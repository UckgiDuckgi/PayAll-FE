import { LinkedAccount } from '@/components/molecules/LinkedMembership';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/LinkedAccount',
  component: LinkedAccount,
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
} satisfies Meta<typeof LinkedAccount>;

export default meta;
type Story = StoryObj<typeof LinkedAccount>;

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
