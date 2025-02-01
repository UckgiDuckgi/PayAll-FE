import { AdCarousel } from '@/components/molecules/sion/AdCarousel';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/AdCarousel',
  component: AdCarousel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4 max-w-md'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AdCarousel>;

export default meta;
type Story = StoryObj<typeof AdCarousel>;

export const Default: Story = {
  args: {},
};

export const WithCustomContent: Story = {
  args: {},
  render: () => <AdCarousel />,
};
