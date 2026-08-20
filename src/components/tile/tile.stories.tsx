import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Tile } from './tile';

const meta = {
  title: 'Tile',
  component: Tile,
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <ul>
      <Tile {...args} />
    </ul>
  ),
} satisfies Meta<typeof Tile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    isSolved: false,
    isPressable: false,
    isViewTransitionDisabled: false,
    onPress: fn(),
    style: { width: 100, height: 100 },
  },
};
