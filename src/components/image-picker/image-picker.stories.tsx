import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'storybook/preview-api';

import { images, type ImageKeys } from '@/assets/images';

import { ImagePicker } from './image-picker';

const meta = {
  title: 'ImagePicker',
  component: ImagePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple'],
    },
  },
} satisfies Meta<typeof ImagePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images,
    disallowEmptySelection: false,
    selectionMode: 'single',
    className: 'size-100',
  },
};

export const Controlled: Story = {
  args: {
    ...Default.args,
  },
  render: function Render(args) {
    const [selection, setSelection] = useState(new Set<ImageKeys>());

    return (
      <ImagePicker
        {...args}
        selectedKeys={selection}
        onSelectionChange={setSelection}
      />
    );
  },
};
