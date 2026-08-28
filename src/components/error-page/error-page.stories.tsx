import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { ErrorPage } from './error-page';

const meta = {
  title: 'ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onRetryPress: fn(),
  },
};

export const WithClearStoragePress: Story = {
  args: {
    ...Default.args,
    onClearStoragePress: fn(),
  },
};
