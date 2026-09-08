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
const ChallengeSettingsDialog = lazyNamed(
  () => import('./challenge-settings-dialog'),
  'ChallengeSettingsDialog',
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
          {dialog === 'challenge-settings' && <ChallengeSettingsDialog />}
        </Modal.Container>
      </Suspense>
    </Modal.Backdrop>
  );
};
