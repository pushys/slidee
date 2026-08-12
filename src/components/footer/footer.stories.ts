import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Footer } from './footer';

const meta = {
  title: 'Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    soundEnabled: true,
    onSoundEnablePress: fn(),
    onSoundDisablePress: fn(),
    onStatsPress: fn(),
    onHelpPress: fn(),
    onSettingsPress: fn(),
    className: 'border-1 rounded-md p-2 w-lg',
  },
};
