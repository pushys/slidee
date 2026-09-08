import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@heroui/react';
import React, { useId } from 'react';
import { fn } from 'storybook/test';

import { images } from '@/assets/images';

import { ChallengeSettingsForm } from './challenge-settings-form';

const meta = {
  title: 'Forms/ChallengeSettingsForm',
  component: ChallengeSettingsForm,
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    const formId = useId();

    return (
      <React.Fragment>
        <ChallengeSettingsForm {...args} id={formId} />
        <Button type="submit" form={formId} className="mt-4 w-100">
          Submit
        </Button>
      </React.Fragment>
    );
  },
} satisfies Meta<typeof ChallengeSettingsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { images, onSubmit: fn() },
};
