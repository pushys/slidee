import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Game } from '@/shared/lib/game/game';

import { MainToolbar } from './main-toolbar';

const meta = {
  title: 'Toolbars/MainToolbar',
  component: MainToolbar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    gameStatus: {
      control: { type: 'select' },
      options: Object.values(Game.Status),
    },
  },
} satisfies Meta<typeof MainToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    gameStatus: Game.Status.Idle,
    moves: 0,
    elapsedTime: 0,
    personalBestTime: undefined,
    isAutoSolved: false,
    onShufflePress: fn(),
    onPausePress: fn(),
    onResumePress: fn(),
    onSolvePress: fn(),
    className: 'border-1 rounded-md p-2 w-lg',
  },
};
