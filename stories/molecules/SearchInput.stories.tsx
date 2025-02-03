import { SearchInput } from '@/components/molecules/sion/SearchInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4 max-w-md'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
  },
};

export const WithDefaultValue: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    defaultValue: '오렌지',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: '상품명을 입력해주세요',
  },
};
