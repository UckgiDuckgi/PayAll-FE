import { AccentText } from '@/components/ui/AccentText';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AccentText> = {
  title: 'Components/AccentText',
  component: AccentText,
  tags: ['autodocs'],
  argTypes: {
    prefix: { control: 'text' },
    accent: { control: 'text' },
    suffix: { control: 'text' },
    accentColor: { control: 'text' },
    accentSize: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AccentText>;

export const Default: Story = {
  args: {
    prefix: '목표 달성을 위해서는 하루 평균 ',
    accent: '10,000원',
    suffix: '을 아껴야해요.',
  },
};

export const CustomColor: Story = {
  args: {
    prefix: '지난달 대비 ',
    accent: '▲ 53,400',
    suffix: '원 지출했어요.',
    accentColor: 'text-red',
  },
};
