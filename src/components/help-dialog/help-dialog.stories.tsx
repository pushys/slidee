import type { Meta, StoryObj } from '@storybook/react-vite';

import { useArgs } from 'storybook/preview-api';

import { HelpDialog } from './help-dialog';

const meta = {
  title: 'HelpDialog',
  component: HelpDialog,
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <HelpDialog
        {...args}
        isOpen={args.isOpen}
        onOpenChange={(isOpen) => updateArgs({ isOpen })}
      />
    );
  },
} satisfies Meta<typeof HelpDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isOpen: true },
};
