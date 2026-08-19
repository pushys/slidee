import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label, ListBox, Select } from '@heroui/react';
import { useState } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Game } from '@/game/game';

import { Board } from '../board';
import { Tile } from './tile';

const boardSizes: Game.BoardSize[] = [3, 4, 5, 6];

const meta = {
  title: 'Tile',
  component: Tile,
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    const [boardSize, setBoardSize] = useState<Game.BoardSize>(
      Game.DEFAULT_BOARD_SIZE,
    );

    return (
      <div className="flex flex-col gap-4">
        <Select
          className="w-[256px]"
          placeholder="Select one"
          variant="primary"
          value={boardSize}
          onChange={(value) => value && setBoardSize(value as Game.BoardSize)}
        >
          <Label>Board size</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {boardSizes.map((size) => (
                <ListBox.Item
                  key={size}
                  id={size}
                  textValue={`${size}x${size}`}
                >
                  {`${size}x${size}`}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <Board
          size={boardSize}
          tiles={[args.value]}
          renderTile={() => (
            <Tile {...args} value={args.value} className="resize" />
          )}
          className="w-lg"
        />
      </div>
    );
  },
} satisfies Meta<typeof Tile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    isSolved: false,
    isPressable: false,
    onPress: fn(),
  },
};
