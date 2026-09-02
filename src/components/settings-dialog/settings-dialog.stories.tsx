import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { images } from '@/assets/images';
import { withModal } from '@/testing/storybook/decorators/with-modal';

import { SettingsDialog } from './settings-dialog';

const meta = {
  title: 'SettingsDialog',
  component: SettingsDialog,
  parameters: {
    layout: 'centered',
  },
  decorators: [withModal],
} satisfies Meta<typeof SettingsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images,
    onSettingsSave: fn(),
  },
};
