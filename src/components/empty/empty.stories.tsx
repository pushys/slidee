import type { Meta, StoryObj } from '@storybook/react-vite';

import { Person } from '@gravity-ui/icons';

import { Empty } from './empty';

const meta = {
  title: 'Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: <Person className="size-6" />,
    title: 'Nothing',
    description: 'No items to show.',
  },
};
