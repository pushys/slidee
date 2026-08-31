import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@heroui/react';
import { fn } from 'storybook/test';

import { images } from '@/assets/images';

import { SettingsForm } from './settings-form';

const meta = {
  title: 'SettingsForm',
  component: SettingsForm,
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    return (
      <>
        <SettingsForm {...args} id="settings-form" />
        <Button type="submit" form="settings-form" className="mt-4 w-100">
          Save
        </Button>
      </>
    );
  },
} satisfies Meta<typeof SettingsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { images, onSubmit: fn() },
};
