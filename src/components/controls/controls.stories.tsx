import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Controls } from './controls';

const meta = {
  title: 'Controls',
  component: Controls,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Controls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'numbers',
    onModeChange: fn(),
    onRandomImagePress: fn(),
    onPreviousImagePress: fn(),
    onNextImagePress: fn(),
    onPreviewImagePressStart: fn(),
    onPreviewImagePressEnd: fn(),
    isPreviousImageButtonDisabled: false,
    isNextImageButtonDisabled: false,
    isPreviewImageButtonDisabled: false,
    isImagePreviewing: false,
  },
};
