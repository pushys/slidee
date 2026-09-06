import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'storybook/preview-api';

import { Game } from '@/game/game';

import { BoardSizePicker } from './board-size-picker';

const meta = {
  title: 'BoardSizePicker',
  component: BoardSizePicker,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BoardSizePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: 'w-100' },
};

export const Controlled: Story = {
  args: {
    ...Default.args,
  },
  render: function Render(args) {
    const [value, setValue] = useState<Game.BoardSize | null>(null);

    return <BoardSizePicker {...args} value={value} onChange={setValue} />;
  },
};
