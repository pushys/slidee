import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { LanguageSelect } from './language-select';

const meta = {
  title: 'LanguageSelect',
  component: LanguageSelect,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LanguageSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onLanguageChangeSettle: fn(),
    className: 'w-100 p-2 border-1 rounded-xl',
  },
};
