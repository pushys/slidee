import type { Meta, StoryObj } from '@storybook/react-vite';

import { withModal } from '@/testing/storybook/decorators/with-modal';

import { HelpDialog } from './help-dialog';

const meta = {
  title: 'Dialogs/HelpDialog',
  component: HelpDialog,
  parameters: {
    layout: 'centered',
  },
  decorators: [withModal],
} satisfies Meta<typeof HelpDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
