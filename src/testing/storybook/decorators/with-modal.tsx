import type { Decorator } from '@storybook/react-vite';

import { Modal } from '@heroui/react';

export const withModal: Decorator = (Story) => (
  <Modal.Backdrop isOpen>
    <Modal.Container>
      <Story />
    </Modal.Container>
  </Modal.Backdrop>
);
