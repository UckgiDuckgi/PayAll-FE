import TitleBottomLine from '@/components/ui/TitleBottomLine';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TitleBottomLine> = {
  title: 'Atoms/TitleBottomLine',
  component: TitleBottomLine,
  tags: ['autodocs'],
  argTypes: {
    left: { control: 'text' },
    right: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleBottomLine>;

export const Default: Story = {
  args: {
    left: '왼쪽 텍스트',
    right: '오른쪽 텍스트',
    children: '내용',
  },
};

export const WithLongText: Story = {
  args: {
    left: '긴 왼쪽 텍스트입니다',
    right: '긴 오른쪽 텍스트입니다',
    children: '여기에 들어갈 내용입니다',
  },
};
