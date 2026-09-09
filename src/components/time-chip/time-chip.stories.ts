import type { Meta, StoryObj } from '@storybook/react-vite';

import { TimeChip } from './time-chip';

const meta = {
  title: 'TimeChip',
  component: TimeChip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TimeChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: 0,
  },
};
