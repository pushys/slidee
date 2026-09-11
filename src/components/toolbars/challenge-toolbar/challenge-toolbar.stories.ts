import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { ChallengeStatus } from '@/shared/lib/challenge/challenge.schema';

import { ChallengeToolbar } from './challenge-toolbar';

const meta = {
  title: 'Toolbars/ChallengeToolbar',
  component: ChallengeToolbar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    challengeStatus: {
      control: 'select',
      options: Object.values(ChallengeStatus),
    },
  },
} satisfies Meta<typeof ChallengeToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    score: 0,
    bestScore: 0,
    timeLeft: 0,
    challengeStatus: undefined,
    onShufflePress: fn(),
    onQuitPress: fn(),
    className: 'border-1 rounded-md p-2 w-lg',
  },
};
