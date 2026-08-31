import type { Meta, StoryObj } from '@storybook/react-vite';

import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { images } from '@/assets/images';

import { SettingsDialog } from './settings-dialog';

const meta = {
  title: 'SettingsDialog',
  component: SettingsDialog,
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <SettingsDialog
        {...args}
        isOpen={args.isOpen}
        onOpenChange={(isOpen) => updateArgs({ isOpen })}
      />
    );
  },
} satisfies Meta<typeof SettingsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images,
    isOpen: true,
    onSettingsSave: fn(),
  },
};
