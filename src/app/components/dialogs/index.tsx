import { Modal, Spinner } from '@heroui/react';
import { Suspense } from 'react';

import { lazyNamed } from '@/shared/utils/lazy-named';

import { useAppContext } from '../../app-context';

const StatsDialog = lazyNamed(() => import('./stats-dialog'), 'StatsDialog');
const HelpDialog = lazyNamed(() => import('./help-dialog'), 'HelpDialog');
const SettingsDialog = lazyNamed(
  () => import('./settings-dialog'),
  'SettingsDialog',
);

export const Dialogs = () => {
  const { dialog, isDialogOpen, closeDialog } = useAppContext();

  return (
    <Modal.Backdrop
      variant="blur"
      isOpen={isDialogOpen}
      onOpenChange={closeDialog}
    >
      <Suspense fallback={<Spinner className="text-white" />}>
        <Modal.Container>
          {dialog === 'stats' && <StatsDialog />}
          {dialog === 'help' && <HelpDialog />}
          {dialog === 'settings' && <SettingsDialog />}
        </Modal.Container>
      </Suspense>
    </Modal.Backdrop>
  );
};
