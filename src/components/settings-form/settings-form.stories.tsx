import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@heroui/react';
import { fn } from 'storybook/test';

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
        <Button type="submit" form="settings-form" className="w-100 mt-4">
          Save
        </Button>
      </>
    );
  },
} satisfies Meta<typeof SettingsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onSubmit: fn() },
};
