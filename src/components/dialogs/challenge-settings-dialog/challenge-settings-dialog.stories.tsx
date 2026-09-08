import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { images } from '@/assets/images';
import { withModal } from '@/testing/storybook/decorators/with-modal';

import { ChallengeSettingsDialog } from './challenge-settings-dialog';

const meta = {
  title: 'Dialogs/ChallengeSettingsDialog',
  component: ChallengeSettingsDialog,
  parameters: {
    layout: 'centered',
  },
  decorators: [withModal],
} satisfies Meta<typeof ChallengeSettingsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images,
    onChallengeSettingsSave: fn(),
  },
};
