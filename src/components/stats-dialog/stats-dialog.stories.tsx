import type { Meta, StoryObj } from '@storybook/react-vite';

import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { StatsDialog } from './stats-dialog';

const meta = {
  title: 'StatsDialog',
  component: StatsDialog,
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StatsDialog
        {...args}
        isOpen={args.isOpen}
        onOpenChange={(isOpen) => updateArgs({ isOpen })}
      />
    );
  },
} satisfies Meta<typeof StatsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    stats: {
      3: { best: 109303, average: 112009, games: 39 },
    },
    onClearStatsPress: fn(),
  },
};
