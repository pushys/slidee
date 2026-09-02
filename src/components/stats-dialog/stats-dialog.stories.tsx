import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { withModal } from '@/testing/storybook/decorators/with-modal';

import { StatsDialog } from './stats-dialog';

const meta = {
  title: 'StatsDialog',
  component: StatsDialog,
  parameters: {
    layout: 'centered',
  },
  decorators: [withModal],
} satisfies Meta<typeof StatsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: {
      3: { best: 109303, average: 112009, games: 39, images: [] },
    },
    onClearStatsPress: fn(),
  },
};
