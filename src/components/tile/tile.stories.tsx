import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Board } from '../board';
import { Tile } from './tile';

const meta = {
  title: 'Tile',
  component: Tile,
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    return (
      <Board
        size={4}
        tiles={[args.value]}
        renderTile={() => <Tile {...args} value={args.value} />}
        className="w-lg"
      />
    );
  },
} satisfies Meta<typeof Tile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    isSolved: false,
    isMovable: false,
    onPress: fn(),
  },
};
