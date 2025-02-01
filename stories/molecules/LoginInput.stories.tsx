import { LoginInput } from '@/components/molecules/sion/LoginInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='py-4 max-w-md bg-background'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    type: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof LoginInput>;

export default meta;
type Story = StoryObj<typeof LoginInput>;

export const Default: Story = {
  args: {
    title: '아이디',
    placeholder: '아이디를 입력해주세요',
    type: 'text',
  },
};

export const Password: Story = {
  args: {
    title: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
    type: 'password',
  },
};

export const WithValue: Story = {
  args: {
    title: '아이디',
    placeholder: '아이디를 입력해주세요',
    type: 'text',
    value: 'example@email.com',
  },
};
