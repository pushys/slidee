import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Game } from '@/game/game';

import { Toolbar } from './toolbar';

const meta = {
  title: 'Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    gameStatus: {
      control: { type: 'select' },
      options: Object.values(Game.Status),
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    gameStatus: Game.Status.Idle,
    moves: 0,
    elapsedTime: 0,
    personalBestTime: undefined,
    isAutoSolved: false,
    onNewGamePress: fn(),
    onPausePress: fn(),
    onResumePress: fn(),
    onSolvePress: fn(),
    className: 'border-1 rounded-md p-2 w-lg',
  },
};
