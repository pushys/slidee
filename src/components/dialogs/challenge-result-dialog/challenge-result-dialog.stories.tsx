import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { withModal } from '@/testing/storybook/decorators/with-modal';

import { ChallengeResultDialog } from './challenge-result-dialog';

const meta = {
  title: 'Dialogs/ChallengeResultDialog',
  component: ChallengeResultDialog,
  parameters: {
    layout: 'centered',
  },
  decorators: [withModal],
} satisfies Meta<typeof ChallengeResultDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onRestartChallengePress: fn(),
    onExitChallengePress: fn(),
  },
};
